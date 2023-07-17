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
            return frappe.get_all("Customer")

    def create_drafts(self, invoice_calculation):
        customers = self.get_matching_customers(invoice_calculation)

        result = []
        for customer in customers:
            result.append(self.create_invoice_draft(invoice_calculation, customer))
        return result

    def get_item_price(self, product):
        if len(product.item_defaults) == 0:
            raise frappe.InvalidStatusError(
                f"product {product.item_code} does not have any defaults"
            )

        price_list_name = product.item_defaults[0].default_price_list

        item_price = frappe.db.get_list(
            "Item Price",
            filters={"item_code": product.item_code, "price_list": price_list_name},
        )

        if len(item_price) == 0:
            raise MissingDefaultItemPriceError(
                f"missing item price for product {product.item_code}"
            )

        return frappe.get_doc("Item Price", item_price[0].name)

    def create_product_item(self, invoice, invoice_calculation_item, income_account):
        p = frappe.get_doc("Item", invoice_calculation_item.product)
        if not p:
            raise frappe.DoesNotExistError("product does not exist")

        item = frappe.new_doc("Sales Invoice Item")
        item_price = self.get_item_price(p)
        item.item_name = p.name
        item.qty = 1
        item.uom = p.stock_uom
        item.stock_uom = p.stock_uom
        item.description = p.description
        item.price_list_rate = item_price.price_list_rate
        item.parentfield = "items"
        item.parenttype = "Sales Invoice"
        item.income_account = income_account

        return item

    def create_item_from_plot(self, invoice, invoice_calculation_item, income_account):
        p = frappe.get_doc("Item", invoice_calculation_item.product)
        if not p:
            raise frappe.DoesNotExistError("product does not exist")

        item = frappe.new_doc("Sales Invoice Item")
        
        item_price = self.get_item_price(p)

        customer = frappe.get_doc("Customer", invoice.customer)
        if not customer:
            raise frappe.DoesNotExistError(
                f"Customer does not exist {invoice.customer}"
            )

        if not customer.plot_link:
            raise CustomerWithoutPlot(f"Customer without plot {customer.name}")

        field_value = frappe.db.get_value(
            "Plot", customer.plot_link, invoice_calculation_item.plot_fieldname
        )
        if field_value is None:
            raise MissingDocumentFieldError(
                f"Plot does not have a field called {invoice_calculation_item.plot_fieldname}"
            )

        calculated_quantity = invoice_calculation_item.multiplicator * field_value

        if calculated_quantity <= 0:
            raise InvalidQuantityError(_("calculated_quantity must be greater than 0"))

        item.item_name = p.name
        item.qty = calculated_quantity
        item.uom = p.stock_uom
        item.stock_uom = p.stock_uom
        item.description = p.description
        item.price_list_rate = item_price.price_list_rate
        item.parentfield = "items"
        item.parenttype = "Sales Invoice"
        item.income_account = income_account
        return item

    def add_items(self, invoice_calculation, invoice, income_account):
        for item in invoice_calculation.items:
            match item.source_type:
                case "Plot":
                    invoice.items.append(
                        self.create_item_from_plot(invoice, item, income_account)
                    )
                    break
                case _:
                    invoice.items.append(
                        self.create_product_item(invoice, item, income_account)
                    )

    def create_invoice_draft(self, invoice_calculation, customer):
        invoice = frappe.new_doc("Sales Invoice")
        invoice.title = f"Year {invoice_calculation.year}"
        invoice.description = f"Invoice {invoice_calculation.year}"
        invoice.customer = customer.name

        company_list = frappe.get_list("Company")
        company = frappe.get_doc("Company", company_list[0])
        income_account = company.default_income_account

        invoice.company = company.name
        invoice.debit_to = company.default_receivable_account
        invoice.base_grand_total = 0
        invoice.base_rounded_total = 0
        invoice.grand_total = 0
        invoice.posting_date = datetime.utcnow()  # .strftime('%Y-%m-%d')
        invoice.due_date = datetime(2024, 2, 15)  # .strftime('%Y-%m-%d')

        self.add_items(invoice_calculation, invoice, income_account)
        # invoice.set_against_income_account()
        invoice.save()
        return invoice.name
