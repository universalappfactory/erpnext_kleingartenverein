from datetime import datetime
from erpnext.accounts.doctype.pricing_rule.pricing_rule import apply_pricing_rule
from erpnext.stock.doctype.item.item import get_item_defaults, get_item_details
import frappe
from frappe.exceptions import ValidationError
from frappe.utils.data import flt
from frappe import _


class MissingDefaultItemPriceError(ValidationError):
    pass


class MissingDocumentFieldError(ValidationError):
    pass


class CustomerWithoutPlot(ValidationError):
    pass


class InvalidQuantityError(ValidationError):
    pass


class InvoiceCalculator:
    """
    Basic invoice calculator to calculate yearly invoices

    Still under development
    """

    def get_matching_customers(self, invoice_calculation):
        if invoice_calculation.customer_group:
            return frappe.get_list(
                "Customer",
                filters={"customer_group": invoice_calculation.customer_group},
            )
        else:
            return []

    def create_drafts():
        pass

    def get_or_create_sales_invoice_for_customer(self, customer, calculation):
        now = datetime.now().strftime("%Y-%m-%d")

        sales_invoice_title = f"{calculation.prefix}-{calculation.year}-{customer.name}"
        try:
            existing = frappe.get_list(
                "Sales Invoice",
                filters={"title": sales_invoice_title},
            )
            if len(existing) == 0:
                raise frappe.DoesNotExistError()
            elif len(existing) == 1:
                return frappe.get_doc('Sales Invoice', existing[0])
            else:
                frappe.throw(
                    f"multiple sales invoices with title: '{sales_invoice_title}'"
                )

        except frappe.DoesNotExistError:
            price_list = frappe.get_doc("Price List", calculation.price_list)

            sales_invoice = frappe.get_doc(
                {
                    "doctype": "Sales Invoice",
                    "customer": customer.name,
                    "title": sales_invoice_title,
                    "company": calculation.company,
                    "posting_date": now,
                    "due_date": now,
                    "currency": calculation.currency,
                    "conversion_rate": 1.0,
                    "selling_price_list": price_list.name,
                    "price_list_currency": price_list.currency,
                    "plc_conversion_rate": 1.0,
                    "base_net_total": 0,
                    "base_grand_total": 0,
                    "grand_total": 0,
                    "debit_to": calculation.debit_to,
                }
            )
            return sales_invoice

    def calculate_fixed_product(self, sales_invoice_item, item):
        sales_invoice_item.rate = item.amount
        sales_invoice_item.amount = item.amount
        sales_invoice_item.base_rate = item.amount
        sales_invoice_item.base_amount = item.amount

    def add_fixed_product(self, sales_invoice, item):
        for index, sales_invoice_item in enumerate(sales_invoice.items):
            if sales_invoice_item.item_code == item.product:
                sales_invoice.items[index].rate = item.amount
                sales_invoice.items[index].amount = item.amount
                sales_invoice.items[index].base_rate = item.amount
                sales_invoice.items[index].base_amount = item.amount
                return

        sales_invoice_item = frappe.get_doc(
            {
                "doctype": "Sales Invoice Item",
                "item_name": item.product,
                "item_code": item.product,
                "description": item.description[:140],
                "conversion_factor": 1,
                "qty": 1,
                "rate": item.amount,
                "amount": item.amount,
                "base_rate": item.amount,
                "base_amount": item.amount,
                "income_account": item.income_account,
            }
        )
        sales_invoice.append("items", sales_invoice_item)

    
    def calculate_water_consumption(self, sales_invoice, item, customer, calculation):
        plot = frappe.get_doc('Plot', customer.plot_link)       
        
        consumption = plot.calculate_water_consumption(item.water_consumption_year)
        
        for index, sales_invoice_item in enumerate(sales_invoice.items):
            if sales_invoice_item.item_code == item.product:
                sales_invoice.items[index].rate = item.amount
                sales_invoice.items[index].amount = item.amount
                sales_invoice.items[index].base_rate = item.amount
                sales_invoice.items[index].base_amount = item.amount
                sales_invoice.items[index].consumption = consumption
                return

        sales_invoice_item = frappe.get_doc(
            {
                "doctype": "Sales Invoice Item",
                "item_name": item.product,
                "item_code": item.product,
                "description": item.description[:140],
                "conversion_factor": 1,
                "qty": consumption,
                "rate": item.amount,
                "amount": item.amount,
                "base_rate": item.amount,
                "base_amount": item.amount,
                "income_account": item.income_account,
            }
        )
        sales_invoice.append("items", sales_invoice_item)

    
    def calculate_sales_invoice_items(self, sales_invoice, customer, calculation):
        for item in calculation.items:
            if item.action == "AddFixedProduct":
                self.add_fixed_product(sales_invoice, item)
            if item.action == "CalculateWaterConsumption":
                self.calculate_water_consumption(sales_invoice, item, customer, calculation)

        sales_invoice.save()

    def calculate_invoice_for_customer(self, customer, calculation):
        sales_invoice = self.get_or_create_sales_invoice_for_customer(
            customer, calculation
        )
        if sales_invoice:
            self.calculate_sales_invoice_items(sales_invoice, customer, calculation)

    def create_error_message(self, error, customer=None, plot=None):
        return frappe.get_doc(
            {
                "doctype": "Invoice Calculation Error",
                "title": str(error)[:140],
                "datetime": datetime.now(),
                "message": str(error),
                "customer": customer,
                "plot": plot,
            }
        )

    def calculate(self, invoice_calculation_name):
        try:
            calculation = frappe.get_doc(
                "Invoice Calculation", invoice_calculation_name
            )
            customer_names = self.get_matching_customers(calculation)

            if len(customer_names) == 0:
                msg = self.create_error_message(
                    f"No customers found for invoice calculation '{invoice_calculation_name}'"
                )
                calculation.append("errors", msg)
                calculation.save()
                return

            for customer_name in customer_names:
                try:
                    customer = frappe.get_doc('Customer', customer_name)
                    self.calculate_invoice_for_customer(customer, calculation)
                except Exception as error:
                    frappe.log_error(error)
                    msg = self.create_error_message(error, customer)
                    calculation.append("errors", msg)

            calculation.save()

        except frappe.DoesNotExistError:
            frappe.log_error(
                f"invoice calculation {invoice_calculation_name} does not exist"
            )
