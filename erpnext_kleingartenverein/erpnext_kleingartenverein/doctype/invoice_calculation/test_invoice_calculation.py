"""
Copyright (c) 2023, Kleingartenverein and Contributors
See license.txt
"""

import frappe
from frappe.exceptions import DoesNotExistError
from frappe.test_runner import make_test_objects
from frappe.utils.nestedset import NestedSetChildExistsError
from frappe.model.dynamic_links import get_dynamic_link_map
from frappe.tests.utils import FrappeTestCase
from frappe.utils.data import flt
from erpnext.stock.doctype.item.item import set_item_default

# pylint: disable-next=line-too-long
from erpnext_kleingartenverein.erpnext_kleingartenverein.doctype.invoice_calculation.invoice_calculator import (
    InvoiceCalculator,
)

test_records = frappe.get_test_records("Invoice Calculation")
test_dependencies = []
test_ignore = [
    "Customer",
    "Opportunity",
    "Employee",
    "Account",
    "Item",
    "Customer Group",
]


# ToDo we need to improve the test_record setup (maybe only with testrecords.json)
class TestInvoiceCalculation(FrappeTestCase):
    @classmethod
    def setUpClass(cls):
        frappe.local.test_objects["Opportunity"] = []
        cls.cleanup_all()

        cls.setup_customer()
        cls.setup_products()
        cls.setup_price_list()
        cls.setup_plot()

    @classmethod
    def addClassCleanup(cls):
        cls.cleanup_all()

    @classmethod
    def cleanup_all(cls):
        cls.cleanup_invoice_calculation()
        cls.cleanup_sales_invoice()
        cls.cleanup_price_list()
        cls.cleanup_products()
        cls.cleanup_plot()
        cls.cleanup_customer()

    @classmethod
    def setup_products(cls):
        company_list = frappe.get_list("Company")
        product_groups = frappe.get_list("Item Group")

        product = frappe.new_doc("Item")
        product.item_code = "Lease"
        product.item_group = next(
            filter(
                lambda x: x.name == "Products" or x.name == "Produkte", product_groups
            )
        ).name
        product.stock_uom = "Square Meter"
        product.save()
        set_item_default(
            product.item_code,
            company_list[0].name,
            "default_price_list",
            "Default",
        )

        product_water = frappe.new_doc("Item")
        product_water.item_code = "Water"
        product_water.stock_uom = "Cubic Meter"
        product_water.item_group = next(
            filter(
                lambda x: x.name == "Products" or x.name == "Produkte", product_groups
            )
        ).name
        product_water.save()
        set_item_default(
            product_water.item_code,
            company_list[0].name,
            "default_price_list",
            "Default",
        )

        product_fixed = frappe.new_doc("Item")
        product_fixed.item_code = "Fixed"
        product_fixed.stock_uom = "Unit"
        product_fixed.item_group = next(
            filter(
                lambda x: x.name == "Products" or x.name == "Produkte", product_groups
            )
        ).name
        product_fixed.save()
        set_item_default(
            product_fixed.item_code,
            company_list[0].name,
            "default_price_list",
            "Default",
        )

    @classmethod
    def cleanup_products(cls):
        product_groups = frappe.get_list("Item Group")

        products_to_delete = frappe.get_list(
            "Item",
            {
                "item_group": next(
                    filter(
                        lambda x: x.name == "Products" or x.name == "Produkte",
                        product_groups,
                    )
                ).name
            },
        )

        for product in products_to_delete:
            product_doc = frappe.get_doc("Item", product.name)
            product_doc.delete()

    @classmethod
    def cleanup_price_list(cls):
        item_prices = frappe.get_list(
            "Item Price", filters={"item_code": ["IN", ["Lease", "Water", "Fixed"]]}
        )

        for price in item_prices:
            price_doc = frappe.get_doc("Item Price", price.name)
            price_doc.delete()

    @classmethod
    def setup_price_list(cls):
        lease_price = frappe.new_doc("Item Price")
        lease_price.currency = "EUR"
        lease_price.item_code = "Lease"
        lease_price.price_list = "Default"
        lease_price.price_list_rate = 1.75
        lease_price.save()

        water_price = frappe.new_doc("Item Price")
        water_price.currency = "EUR"
        water_price.item_code = "Water"
        water_price.price_list = "Default"
        water_price.price_list_rate = 0.50
        water_price.save()

        fixed_price = frappe.new_doc("Item Price")
        fixed_price.currency = "EUR"
        fixed_price.item_code = "Fixed"
        fixed_price.price_list = "Default"
        fixed_price.price_list_rate = 10.50
        fixed_price.save()

    @classmethod
    def try_get_doc(cls, doctype, name):
        try:
            return frappe.get_doc(doctype, name)
        except DoesNotExistError:
            return None

    @classmethod
    def setup_customer(cls):
        customer_group = cls.try_get_doc("Customer Group", "Tenant")
        if not customer_group:
            customer_group = frappe.new_doc("Customer Group")
            customer_group.customer_group_name = "Tenant"
            customer_group.save()

        customer = cls.try_get_doc("Customer", "Doe")
        if not customer:
            customer = frappe.new_doc("Customer")
            customer.customer_group = customer_group.name
            customer.customer_name = "Doe"
            customer.territory = "_Test Territory"
            customer.save()

    @classmethod
    def cleanup_customer(cls):
        customers = frappe.get_list("Customer", filters={"customer_group": "Tenant"})

        for customer in customers:
            customer_doc = frappe.get_doc("Customer", customer.name)
            try:
                customer_doc.delete()
            except:
                pass

        try:
            customer_group = frappe.get_doc("Customer Group", "Tenant")

            children = customer_group.get_children()
            for child in children:
                child.delete()

            customer_group.delete()
        except Exception:
            pass

    @classmethod
    def cleanup_invoice_calculation(cls):
        calculation_list = frappe.get_all("Invoice Calculation")
        for calculation in calculation_list:
            calculation_doc = frappe.get_doc(calculation.name)
            calculation_doc.delete()

    @classmethod
    def setup_plot(cls):
        plot = frappe.new_doc("Plot")

        customer_list = frappe.get_all("Customer")
        customer = next(filter(lambda x: x.name == "Doe", customer_list))

        plot.customer = customer.name
        plot.plot_size_sqm = 522.3
        plot.plot_status = "Under Lease"
        plot.plot_number = "122"
        plot.save()

    @classmethod
    def cleanup_plot(cls):
        plots = frappe.get_list("Plot", filters={"plot_number": "122"})

        for plot in plots:
            plot_doc = frappe.get_doc("Plot", plot.name)
            plot_doc.customer = None
            plot_doc.plot_number = "tod"
            plot_doc.plot_status = "Under Lease"
            plot_doc.save()
            plot_doc.delete()

    @classmethod
    def cleanup_sales_invoice(cls):
        invoice_list = frappe.get_list("Sales Invoice", filters={"customer": "Doe"})

        for i in invoice_list:
            invoice = frappe.get_doc("Sales Invoice", i.name)
            invoice.delete()

    def test_invoice_calculation_from_product(self):
        calculation = frappe.new_doc("Invoice Calculation")
        calculation.description = "Test1"
        calculation.year = 2023
        calculation.customer_group = "Tenant"

        item = frappe.new_doc("Invoice Calculation Item")
        item.description = "From product"
        item.product = "Fixed"
        calculation.items = [item]

        calculator = InvoiceCalculator()
        invoices = calculator.create_drafts(calculation)

        self.assertEqual(len(invoices), 1)
        first_invoice = frappe.get_doc("Sales Invoice", invoices[0])

        self.assertEqual(first_invoice.grand_total, 10.5)

    def test_invoice_calculation_from_plot(self):
        calculation = frappe.new_doc("Invoice Calculation")
        calculation.description = "Test1"
        calculation.year = 2023
        calculation.customer_group = "Tenant"

        item = frappe.new_doc("Invoice Calculation Item")
        item.description = "From product"
        item.product = "Lease"
        item.source_type = "Plot"
        item.plot_fieldname = "plot_size_sqm"
        calculation.items = [item]

        calculator = InvoiceCalculator()
        invoices = calculator.create_drafts(calculation)

        self.assertEqual(len(invoices), 1)
        first_invoice = frappe.get_doc("Sales Invoice", invoices[0])

        expected_grand_total = flt(522.3 * 1.75, precision=2)
        self.assertEqual(first_invoice.grand_total, expected_grand_total)
