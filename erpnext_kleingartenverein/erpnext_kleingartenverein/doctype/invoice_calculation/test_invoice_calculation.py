"""
Copyright (c) 2023, Kleingartenverein and Contributors
See license.txt
"""

import unittest
import frappe
from frappe.exceptions import DoesNotExistError
from frappe.tests.utils import FrappeTestCase
from frappe.utils.data import flt

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


class TestInvoiceCalculation(FrappeTestCase):
    @classmethod
    def setUpClass(cls):
        frappe.local.test_objects["Opportunity"] = []
        cls.cleanup_all()
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
        cls.cleanup_plot()

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
        lease_price.price_list = "Standard Selling"
        lease_price.price_list_rate = 1.75
        lease_price.save()

        water_price = frappe.new_doc("Item Price")
        water_price.currency = "EUR"
        water_price.item_code = "Water"
        water_price.price_list = "Standard Selling"
        water_price.price_list_rate = 0.50
        water_price.save()

        fixed_price = frappe.new_doc("Item Price")
        fixed_price.currency = "EUR"
        fixed_price.item_code = "Fixed"
        fixed_price.price_list = "Standard Selling"
        fixed_price.price_list_rate = 10.50
        fixed_price.save()

    @classmethod
    def try_get_doc(cls, doctype, name):
        try:
            return frappe.get_doc(doctype, name)
        except DoesNotExistError:
            return None

    @classmethod
    def cleanup_invoice_calculation(cls):
        calculation_list = frappe.get_all("Invoice Calculation")
        for calculation in calculation_list:
            calculation_doc = frappe.get_doc(calculation.name)
            calculation_doc.delete()

    @classmethod
    def setup_plot(cls):
        plots = frappe.get_list("Plot")
        for p in plots:
            plot_doc = frappe.get_doc("Plot", p.name)
            if not plot_doc.plot_size_sqm or not plot_doc.plot_size_sqm <= 0:
                plot_doc.plot_size_sqm = 10
                plot_doc.save()

        plot = frappe.new_doc("Plot")
        plot.customer = "Test Invoice Calculation Customer"
        plot.plot_size_sqm = 522.3
        plot.plot_status = "Under Lease"
        plot.plot_number = "122"
        plot.save()

    @classmethod
    def cleanup_plot(cls):
        plots = frappe.get_list("Plot", filters={"plot_number": "122"})

        for plot in plots:
            plot_doc = frappe.get_doc("Plot", plot.name)
            prev_customer = plot_doc.customer
            plot_doc.customer = None
            for h in plot_doc.former_tenants_table:
                plot_doc.remove(h)

            plot_doc.plot_status = "Under Lease"
            plot_doc.save()
            plot_doc.delete()

            if prev_customer:
                customer = frappe.get_doc("Customer", prev_customer)
                customer.customer_group = "Tenant"
                customer.save()

    @classmethod
    def cleanup_sales_invoice(cls):
        invoice_list = frappe.get_list(
            "Sales Invoice", filters={"customer": "Test Invoice Calculation Customer"}
        )

        for i in invoice_list:
            invoice = frappe.get_doc("Sales Invoice", i.name)
            invoice.delete()

    @unittest.skip("invoice_calculation is still under development")
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

        invoice_list = list(map(lambda x: frappe.get_doc("Sales Invoice", x), invoices))
        matching_invoice = next(
            filter(
                lambda x: x.customer == "Test Invoice Calculation Customer",
                invoice_list,
            )
        )

        self.assertEqual(matching_invoice.grand_total, 10.5)

    @unittest.skip("invoice_calculation is still under development")
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
        invoice_list = list(map(lambda x: frappe.get_doc("Sales Invoice", x), invoices))

        matching_invoice = next(
            filter(
                lambda x: x.customer == "Test Invoice Calculation Customer",
                invoice_list,
            )
        )
        self.assertIsNotNone(matching_invoice)

        expected_grand_total = flt(522.3 * 1.75, precision=2)
        self.assertEqual(matching_invoice.grand_total, expected_grand_total)
