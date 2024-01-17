from datetime import datetime
from erpnext.accounts.doctype.pricing_rule.pricing_rule import apply_pricing_rule
from erpnext.stock.doctype.item.item import get_item_defaults, get_item_details
import frappe
from frappe.exceptions import ValidationError
from frappe.utils.data import flt
from frappe import _
from frappe.utils.weasyprint import PrintFormatGenerator


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
    """

    def get_matching_customers(self, invoice_calculation):
        if invoice_calculation.customer:
            return [invoice_calculation.customer]

        if invoice_calculation.customer_group:
            return frappe.get_list(
                "Customer",
                filters={"customer_group": invoice_calculation.customer_group},
            )
        else:
            return []

    def create_drafts():
        pass

    def calculate_teamwork_hours(self, customer, year):
        result = 0

        by_year = list(
            filter(
                lambda x: x.execution_date.year == year,
                customer.teamwork_table,
            )
        )

        for value in customer.teanant_teamwork_table:
            result = result + value.duration

        for value in by_year:
            result = result + value.execution_duration

        return result

    def get_or_create_sales_invoice_for_customer(
        self, customer, calculation, get_only=False
    ):
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
                return frappe.get_doc("Sales Invoice", existing[0])
            else:
                frappe.throw(
                    f"multiple sales invoices with title: '{sales_invoice_title}'"
                )

        except frappe.DoesNotExistError:
            if get_only:
                raise frappe.DoesNotExistError()

            price_list = frappe.get_doc("Price List", calculation.price_list)

            sales_invoice = frappe.get_doc(
                {
                    "doctype": "Sales Invoice",
                    "customer": customer.name,
                    "title": sales_invoice_title,
                    "company": calculation.company,
                    "posting_date": now,
                    "due_date": calculation.due_date if calculation.due_date else now,
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
                sales_invoice.items[index].description = item.description[:140]
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
        plot = frappe.get_doc("Plot", customer.plot_link)

        consumption = plot.calculate_water_consumption(item.water_consumption_year)

        for index, sales_invoice_item in enumerate(sales_invoice.items):
            if sales_invoice_item.item_code == item.product:
                sales_invoice.items[index].rate = item.amount
                sales_invoice.items[index].amount = item.amount
                sales_invoice.items[index].base_rate = item.amount
                sales_invoice.items[index].base_amount = item.amount
                sales_invoice.items[index].qty = consumption
                sales_invoice.items[index].description = item.description[:140]
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

    def calculate_new_counter(self, sales_invoice, item, customer, calculation):
        plot = frappe.get_doc("Plot", customer.plot_link)

        has_new_counter = plot.has_new_water_meter_in(item.water_consumption_year)
        if not has_new_counter:
            return

        for index, sales_invoice_item in enumerate(sales_invoice.items):
            if sales_invoice_item.item_code == item.product:
                sales_invoice.items[index].rate = item.amount
                sales_invoice.items[index].amount = item.amount
                sales_invoice.items[index].base_rate = item.amount
                sales_invoice.items[index].base_amount = item.amount
                sales_invoice.items[index].qty = 1
                sales_invoice.items[index].description = item.description[:140]
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

    def amount_template_set(self, item):
        return item.amount_template and item.amount_template.strip() != ""

    def quantity_template_set(self, item):
        return item.quantity_template and item.quantity_template.strip() != ""

    def get_template_value(self, template, sales_invoice, customer, item):
        try:
            context = frappe._dict()
            context["customer"] = customer
            context["sales_invoice"] = sales_invoice
            context["item"] = item
            result = frappe.render_template(template, context, False, True)
            return float(result)
        except Exception as error:
            frappe.throw(f"error in get_template_value {item.description}", error)

    def calculate_by_templates(self, sales_invoice, item, customer, calculation):
        amount = item.amount
        quantity = 1

        if not self.amount_template_set(item) and not self.quantity_template_set(item):
            frappe.throw(
                "You must set at least an amount_template or quantity_template"
            )

        if self.amount_template_set(item):
            amount = self.get_template_value(
                item.amount_template, sales_invoice, customer, item
            )

        if self.quantity_template_set(item):
            quantity = self.get_template_value(
                item.quantity_template, sales_invoice, customer, item
            )

        if quantity == 0:
            return

        for index, sales_invoice_item in enumerate(sales_invoice.items):
            if sales_invoice_item.item_code == item.product:
                sales_invoice.items[index].rate = amount
                sales_invoice.items[index].amount = amount
                sales_invoice.items[index].base_rate = amount
                sales_invoice.items[index].base_amount = amount
                sales_invoice.items[index].qty = quantity
                sales_invoice.items[index].description = item.description[:140]
                return

        sales_invoice_item = frappe.get_doc(
            {
                "doctype": "Sales Invoice Item",
                "item_name": item.product,
                "item_code": item.product,
                "description": item.description[:140],
                "conversion_factor": 1,
                "qty": quantity,
                "rate": amount,
                "amount": amount,
                "base_rate": amount,
                "base_amount": amount,
                "income_account": item.income_account,
            }
        )
        sales_invoice.append("items", sales_invoice_item)

    def calculate_teamwork(self, sales_invoice, item, customer, calculation):
        if customer.teamwork_freed == 1:
            return

        hours = self.calculate_teamwork_hours(customer, item.teamwork_year)

        missing = item.required_teamwork_hours - hours
        if missing > 0:
            for index, sales_invoice_item in enumerate(sales_invoice.items):
                if sales_invoice_item.item_code == item.product:
                    sales_invoice.items[index].rate = item.amount
                    sales_invoice.items[index].amount = item.amount
                    sales_invoice.items[index].base_rate = item.amount
                    sales_invoice.items[index].base_amount = item.amount
                    sales_invoice.items[index].qty = consumption
                    sales_invoice.items[index].description = item.description[:140]
                    return

            sales_invoice_item = frappe.get_doc(
                {
                    "doctype": "Sales Invoice Item",
                    "item_name": item.product,
                    "item_code": item.product,
                    "description": item.description[:140],
                    "conversion_factor": 1,
                    "qty": missing,
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
                self.calculate_water_consumption(
                    sales_invoice, item, customer, calculation
                )
            if item.action == "AddProductByTemplates":
                self.calculate_by_templates(sales_invoice, item, customer, calculation)
            if item.action == "CalculateTeamwork":
                self.calculate_teamwork(sales_invoice, item, customer, calculation)
            if item.action == "CalculateNewCounter":
                self.calculate_new_counter(sales_invoice, item, customer, calculation)
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

            customer = None
            for customer_name in customer_names:
                try:
                    customer = frappe.get_doc("Customer", customer_name)
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

    def create_pdf(self, doctype, name, print_format, letterhead):
        doc = frappe.get_doc(doctype, name)
        doc.check_permission("print")
        generator = PrintFormatGenerator(print_format, doc, letterhead)
        pdf = generator.render_pdf()
        return pdf

    def print_invoices(self, invoice_calculation_name):
        calculation = frappe.get_doc("Invoice Calculation", invoice_calculation_name)

        if not calculation.print_format:
            frappe.throw("you must provide a print_format in order to print invoices")

        if not calculation.output_folder:
            frappe.throw("you must provide a output_folder in order to print invoices")

        if not calculation.letter_head:
            frappe.throw("you must provide a letter_head in order to print invoices")

        customer_names = self.get_matching_customers(calculation)
        for customer_name in customer_names:
            try:
                customer = frappe.get_doc("Customer", customer_name)
                invoice = self.get_or_create_sales_invoice_for_customer(
                    customer, calculation, get_only=True
                )
                pdf = self.create_pdf(
                    "Sales Invoice",
                    invoice.name,
                    calculation.print_format,
                    calculation.letter_head,
                )

                frappe.get_doc(
                    {
                        "doctype": "File",
                        "attached_to_doctype": "Single Member Letter",
                        "attached_to_name": customer.name,
                        "attached_to_field": "attachment",
                        "folder": calculation.output_folder,
                        "file_name": f"{invoice.title}.pdf",
                        # "file_url": file_url,
                        "is_private": 1,
                        "content": pdf,
                    }
                ).save()
            except frappe.DoesNotExistError:
                frappe.log_error(f"no sales invoice for {customer.name}")


def execute_invoice_calcuclation(invoice_calculation_name):
    invoice_calculator = InvoiceCalculator()
    invoice_calculator.calculate(invoice_calculation_name)


def execute_invoice_printing(invoice_calculation_name):
    invoice_calculator = InvoiceCalculator()
    invoice_calculator.print_invoices(invoice_calculation_name)
