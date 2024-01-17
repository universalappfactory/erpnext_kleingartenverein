import frappe
import os
import sys

pt = os.path.abspath(
    os.path.join(
        os.path.dirname(__file__), "..", "..", "..", "..", "erpnext_kleingartenverein"
    )
)
sys.path.insert(0, pt)

pt = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "testhelper"))
sys.path.insert(0, pt)

from erpnext_kleingartenverein.payments.payment_creation import (
    create_payment_for_sales_invoice,
)

# pyright: ignore[reportMissingImports]
from testhelper.testbase import TestBase
from testhelper.customer_factory import get_or_create_tenant
from testhelper.item_factory import get_or_create_item
from testhelper.sales_invoice_factory import (
    create_sales_invoice,
    create_sales_invoice_item,
)

from testhelper.file_factory import get_or_create_folder
from testhelper.delete_utils import try_delete

from erpnext_kleingartenverein.erpnext_kleingartenverein.doctype.invoice_calculation.invoice_calculator import (
    InvoiceCalculator,
)


def create_invoice_calculation(company, price_list_name):
    calculation = frappe.get_doc(
        {
            "doctype": "Invoice Calculation",
            "description": "Lease Invoice 2024",
            "prefix": "Lease Invoice_",
            "year": 2024,
            "customer_group": "Tenant",
            "currency": "EUR",
            "debit_to": company.default_receivable_account,
            "price_list": price_list_name,
            "company": company.name,
        }
    )

    return calculation


def create_invoice_calculation_item(product, income_account, action="AddFixedProduct"):
    new_entry = frappe.get_doc(
        {
            "doctype": "Invoice Calculation Item",
            "description": "First Item",
            "action": action,
            "product": product,
            "income_account": income_account,
        }
    )
    return new_entry


def create_plot(plot_number, customer_name):
    plot = frappe.get_doc(
        {
            "doctype": "Plot",
            "customer": customer_name,
            "plot_number": plot_number,
            "plot_status": "Under Lease",
        }
    )

    return plot


def create_counter_entry(date, counter_value, counter_number, mounting_date):
    entry = frappe.get_doc(
        {
            "doctype": "Counter Table",
            "date": date,
            "counter_value": counter_value,
            "counter_number": counter_number,
            "mounting_date": mounting_date,
        }
    )

    return entry


class InvoiceCalculatorTests(TestBase):
    TEST_SITE = "testing.localhost"
    customers = []
    invoices = []
    company = None
    warehouse = None
    items_to_delete = []

    @classmethod
    def setUpClass(cls):
        super().setUpClass()

        cls.company = frappe.get_last_doc("Company")
        test_customer = get_or_create_tenant("Test Tenant", "Tenant")
        cls.customers = [test_customer]
        cls.warehouse = frappe.get_last_doc("Warehouse")

    @classmethod
    def tearDownClass(cls):
        for invoice in cls.customers:
            try_delete(lambda: invoice.delete())
        for invoice in cls.invoices:
            try_delete(lambda: invoice.delete())
        for item in cls.items_to_delete:
            try_delete(lambda: item.delete())

        super().tearDownClass()

    def tearDown(self):
        customer_invoices = frappe.get_list(
            "Sales Invoice",
            filters={"customer": self.customers[0].name},
        )
        for invoice in customer_invoices:
            try:
                doc = frappe.get_doc("Sales Invoice", invoice)
                doc.delete()
            except:
                pass

    def test_create_invoice_calculator(self):
        calculator = InvoiceCalculator()
        self.assertIsNotNone(calculator)

    def test_create_invoice_with_fixed_product(self):
        price_list = frappe.get_last_doc("Price List")
        calculation = create_invoice_calculation(self.company, price_list.name)
        self.items_to_delete.append(calculation)

        product = get_or_create_item(
            "First Product",
            self.company,
            self.warehouse.name,
            self.company.default_income_account,
            False,
        )
        self.items_to_delete.append(product)

        item = create_invoice_calculation_item(
            product, self.company.default_income_account
        )
        item.amount = 100

        self.items_to_delete.append(item)

        calculation.append("items", item)
        calculation.insert()

        calculator = InvoiceCalculator()
        calculator.calculate(calculation.name)

        calculation = frappe.get_doc("Invoice Calculation", calculation.name)
        self.assertEqual(len(calculation.errors), 0)

        customer_invoices = frappe.get_list(
            "Sales Invoice", filters={"customer": self.customers[0].name}, fields="*"
        )

        self.assertEqual(len(customer_invoices), 1)
        invoice = customer_invoices[0]
        self.assertEqual(invoice["grand_total"], 100)

    def test_that_invoice_item_is_updated(self):
        price_list = frappe.get_last_doc("Price List")
        calculation = create_invoice_calculation(self.company, price_list.name)
        self.items_to_delete.append(calculation)

        product = get_or_create_item(
            "First Product",
            self.company,
            self.warehouse.name,
            self.company.default_income_account,
            False,
        )
        self.items_to_delete.append(product)

        item = create_invoice_calculation_item(
            product, self.company.default_income_account
        )
        item.amount = 100

        self.items_to_delete.append(item)

        calculation.append("items", item)
        calculation.insert()

        calculator = InvoiceCalculator()
        calculator.calculate(calculation.name)

        calculation = frappe.get_doc("Invoice Calculation", calculation.name)
        calculation.items[0].amount = 50
        calculation.save()

        calculator = InvoiceCalculator()
        calculator.calculate(calculation.name)

        customer_invoices = frappe.get_list(
            "Sales Invoice", filters={"customer": self.customers[0].name}, fields="*"
        )

        self.assertEqual(len(customer_invoices), 1)
        invoice = customer_invoices[0]
        doc = frappe.get_doc("Sales Invoice", invoice["name"])
        self.assertEqual(invoice["grand_total"], 50)

    def test_water_consumption(self):
        customer = self.customers[0]
        price_list = frappe.get_last_doc("Price List")
        calculation = create_invoice_calculation(self.company, price_list.name)

        self.items_to_delete.append(calculation)

        product = get_or_create_item(
            "Water (Cubic Meter)",
            self.company,
            self.warehouse.name,
            self.company.default_income_account,
            False,
        )
        self.items_to_delete.append(product)

        item = create_invoice_calculation_item(
            product, self.company.default_income_account, "CalculateWaterConsumption"
        )
        item.amount = 2.22
        item.water_consumption_year = 2023
        self.items_to_delete.append(item)

        calculation.append("items", item)
        calculation.insert()

        plot = self.plot = create_plot("123", customer.name)
        plot.save()

        expected_amount = 16 * 2.22
        counter_values = [
            create_counter_entry("2021-12-21", 94, "12/3456", "2018-01-01"),
            create_counter_entry("2022-12-22", 96, "12/3456", "2018-01-01"),
            create_counter_entry("2023-04-08", 0, "112233", "2018-01-01"),
            create_counter_entry("2023-05-29", 7, "112233", "2018-01-01"),
            create_counter_entry("2023-05-29", 0, "4444", "2018-01-01"),
            create_counter_entry("2023-05-29", 9, "4444", "2018-01-01"),
        ]

        for item in counter_values:
            plot.append("water_meter_table", item)
        plot.save()

        calculator = InvoiceCalculator()
        calculator.calculate(calculation.name)

        calculation = frappe.get_doc("Invoice Calculation", calculation.name)
        self.assertEqual(len(calculation.errors), 0)

        customer_invoices = frappe.get_list(
            "Sales Invoice", filters={"customer": self.customers[0].name}, fields="*"
        )

        self.assertEqual(len(customer_invoices), 1)
        invoice = customer_invoices[0]
        self.assertEqual(invoice["grand_total"], expected_amount)
