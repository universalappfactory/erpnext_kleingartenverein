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
from testhelper.delete_utils import try_delete, try_delete_list

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


def create_insurance_entry(insurance_type, insurance_value):
    entry = frappe.get_doc(
        {
            "doctype": "Insurance Table",
            "insurance_type": insurance_type,
            "insurance_description": "",
            "insurance_value": insurance_value,
        }
    )

    return entry


def create_teamwork_entry(execution_date, execution_duration):
    entry = frappe.get_doc(
        {
            "doctype": "Teamwork Execution Table",
            "execution_date": execution_date,
            "execution_duration": execution_duration * 3600,
        }
    )

    return entry


def create_work_task_entry(description, duration):
    entry = frappe.get_doc(
        {
            "doctype": "Work Task",
            "description": description,
            "duration": duration * 3600 if duration is not None else None,
        }
    )

    return entry


def flush_invoice_calculation_errors(invoice_calculation_name):
    try:
        calculation = frappe.get_doc("Invoice Calculation", invoice_calculation_name)
        for errror in calculation.errors:
            calculation.remove(errror)
        calculation.save()
    except frappe.DoesNotExistError:
        pass


class InvoiceCalculatorTests(TestBase):
    TEST_SITE = "testing.localhost"
    invoices = []
    company = None
    warehouse = None

    @classmethod
    def setUpClass(cls):
        super().setUpClass()

        cls.company = frappe.get_last_doc("Company")
        cls.warehouse = frappe.get_last_doc("Warehouse")

    @classmethod
    def tearDownClass(cls):
        for invoice in cls.invoices:
            try_delete(lambda: invoice.delete())

        super().tearDownClass()

    def setUp(self):
        self.plot = None
        self.calculation = None
        self.customer = get_or_create_tenant("Test Tenant", "Tenant")
        self.second_customer = get_or_create_tenant("Second Tenant", "Tenant")
        self.second_plot = create_plot("567", self.second_customer.name)
        self.second_plot.save()

    def tearDown(self):
        customer_invoices = frappe.get_list(
            "Sales Invoice",
            filters={"customer": self.customer.name},
        )
        for invoice in customer_invoices:
            try:
                doc = frappe.get_doc("Sales Invoice", invoice)
                doc.delete()
            except:
                pass

        customer_invoices = frappe.get_list(
            "Sales Invoice",
            filters={"customer": self.second_customer.name},
        )
        for invoice in customer_invoices:
            try:
                doc = frappe.get_doc("Sales Invoice", invoice)
                doc.delete()
            except:
                pass

        if self.calculation:
            self.calculation.delete()

        if self.plot:
            self.plot.clear_customer_backlink(self.customer.name)
            self.plot.customer = None
            self.plot.delete()
            self.plot = None

        if self.customer:
            self.customer.delete()
            self.customer = None

        if self.second_plot:
            self.second_plot.clear_customer_backlink(self.second_customer.name)
            self.second_plot.customer = None
            self.second_plot.delete()
            self.second_plot = None

        if self.second_customer:
            self.second_customer.delete()
            self.second_customer = None

        try_delete_list("Sales Invoice")

    def test_create_invoice_calculator(self):
        calculator = InvoiceCalculator()
        self.assertIsNotNone(calculator)

    def test_create_invoice_with_fixed_product(self):
        price_list = frappe.get_last_doc("Price List")
        calculation = self.calculation = create_invoice_calculation(
            self.company, price_list.name
        )

        product = get_or_create_item(
            "First Product",
            self.company,
            self.warehouse.name,
            self.company.default_income_account,
            False,
        )

        item = create_invoice_calculation_item(
            product, self.company.default_income_account
        )
        item.amount = 100

        calculation.append("items", item)
        calculation.insert()

        calculator = InvoiceCalculator()
        calculator.calculate(calculation.name)

        calculation = frappe.get_doc("Invoice Calculation", calculation.name)
        self.assertEqual(len(calculation.errors), 0)

        customer_invoices = frappe.get_list(
            "Sales Invoice", filters={"customer": self.customer.name}, fields="*"
        )

        self.assertEqual(len(customer_invoices), 1)
        invoice = customer_invoices[0]
        self.assertEqual(invoice["grand_total"], 100)

    def test_that_invoice_item_is_updated(self):
        price_list = frappe.get_last_doc("Price List")
        calculation = self.calculation = create_invoice_calculation(
            self.company, price_list.name
        )

        product = get_or_create_item(
            "First Product",
            self.company,
            self.warehouse.name,
            self.company.default_income_account,
            False,
        )

        item = create_invoice_calculation_item(
            product, self.company.default_income_account
        )
        item.amount = 100

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
            "Sales Invoice", filters={"customer": self.customer.name}, fields="*"
        )

        self.assertEqual(len(customer_invoices), 1)
        invoice = customer_invoices[0]
        doc = frappe.get_doc("Sales Invoice", invoice["name"])
        self.assertEqual(invoice["grand_total"], 50)

    def test_water_consumption(self):
        customer = self.customer
        price_list = frappe.get_last_doc("Price List")
        calculation = self.calculation = create_invoice_calculation(
            self.company, price_list.name
        )

        product = get_or_create_item(
            "Water (Cubic Meter)",
            self.company,
            self.warehouse.name,
            self.company.default_income_account,
            False,
        )

        item = create_invoice_calculation_item(
            product, self.company.default_income_account, "CalculateWaterConsumption"
        )
        item.amount = 2.22
        item.water_consumption_year = 2023

        calculation.append("items", item)
        calculation.insert()

        self.plot = create_plot("123", customer.name)
        self.plot.save()

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
            self.plot.append("water_meter_table", item)
        self.plot.save()

        calculator = InvoiceCalculator()
        calculator.calculate(calculation.name)

        calculation = frappe.get_doc("Invoice Calculation", calculation.name)
        self.assertEqual(len(calculation.errors), 0)

        customer_invoices = frappe.get_list(
            "Sales Invoice", filters={"customer": self.customer.name}, fields="*"
        )

        self.assertEqual(len(customer_invoices), 1)
        invoice = customer_invoices[0]
        self.assertEqual(invoice["grand_total"], expected_amount)

    def test_new_counter(self):
        customer = self.customer
        price_list = frappe.get_last_doc("Price List")
        calculation = self.calculation = create_invoice_calculation(
            self.company, price_list.name
        )

        product = get_or_create_item(
            "New Counter",
            self.company,
            self.warehouse.name,
            self.company.default_income_account,
            False,
        )

        item = create_invoice_calculation_item(
            product, self.company.default_income_account, "CalculateNewCounter"
        )
        item.amount = 40
        item.water_consumption_year = 2023

        calculation.append("items", item)
        calculation.insert()

        self.plot = create_plot("123", customer.name)
        self.plot.save()

        expected_amount = 40
        counter_values = [
            create_counter_entry("2021-12-21", 94, "12/3456", "2018-01-01"),
            create_counter_entry("2022-12-22", 96, "12/3456", "2018-01-01"),
            create_counter_entry("2023-04-08", 0, "112233", "2018-01-01"),
            create_counter_entry("2023-05-29", 7, "112233", "2018-01-01"),
            create_counter_entry("2023-05-29", 0, "4444", "2018-01-01"),
            create_counter_entry("2023-05-29", 9, "4444", "2018-01-01"),
        ]

        for item in counter_values:
            self.plot.append("water_meter_table", item)
        self.plot.save()

        calculator = InvoiceCalculator()
        calculator.calculate(calculation.name)

        calculation = frappe.get_doc("Invoice Calculation", calculation.name)
        self.assertEqual(len(calculation.errors), 0)

        customer_invoices = frappe.get_list(
            "Sales Invoice", filters={"customer": self.customer.name}, fields="*"
        )

        self.assertEqual(len(customer_invoices), 1)
        invoice = customer_invoices[0]
        self.assertEqual(invoice["grand_total"], expected_amount)

    def test_quantity_by_script(self):
        customer = self.customer
        price_list = frappe.get_last_doc("Price List")
        calculation = self.calculation = create_invoice_calculation(
            self.company, price_list.name
        )

        product = get_or_create_item(
            "Plot Lease",
            self.company,
            self.warehouse.name,
            self.company.default_income_account,
            False,
        )

        item = create_invoice_calculation_item(
            product, self.company.default_income_account, "AddProductByTemplates"
        )
        item.quantity_template = """
            {%- set plot_link = customer.plot_link  -%}
            {%- set plot = frappe.get_doc('Plot', plot_link)  -%}
            {{plot.plot_size_sqm}}"""

        item.amount = 0.86

        calculation.append("items", item)
        calculation.insert()

        expected_amount = 152 * 0.86
        self.plot = create_plot("345", customer.name)
        self.plot.plot_size_sqm = 152
        self.plot.save()

        calculator = InvoiceCalculator()
        calculator.calculate(calculation.name)

        calculation = frappe.get_doc("Invoice Calculation", calculation.name)
        self.assertEqual(len(calculation.errors), 0)

        customer_invoices = frappe.get_list(
            "Sales Invoice", filters={"customer": self.customer.name}, fields="*"
        )

        self.assertEqual(len(customer_invoices), 1)
        invoice = customer_invoices[0]
        self.assertEqual(invoice["grand_total"], expected_amount)

    def test_amount_by_script(self):
        customer = self.customer
        price_list = frappe.get_last_doc("Price List")
        calculation = self.calculation = create_invoice_calculation(
            self.company, price_list.name
        )

        old_invoice = create_sales_invoice(
            customer.name,
            "Old Invoice",
            self.company,
            100,
            self.company.default_receivable_account,
        )
        old_invoice.title = "My_old_invoice"
        old_invoice.remarks = "TestValue: 3.45"

        product = get_or_create_item(
            "TestProduct",
            self.company,
            self.warehouse.name,
            self.company.default_receivable_account,
            False,
        )
        old_item = create_sales_invoice_item(
            product.name,
            product.name,
            "stk",
            1,
            10,
            self.company.default_income_account,
            self.company.cost_center,
        )

        old_invoice.append("items", old_item)
        old_invoice.save()

        product = get_or_create_item(
            "Plot Lease",
            self.company,
            self.warehouse.name,
            self.company.default_income_account,
            False,
        )

        item = create_invoice_calculation_item(
            product, self.company.default_income_account, "AddProductByTemplates"
        )

        item.amount_template = """
            {%- set customer_name = customer.name  -%}
            {%- set sales_invoice_list = frappe.get_all('Sales Invoice', filters={'customer': customer_name}, fields=['name', 'title', 'remarks']) -%}
            {%- if sales_invoice_list|length == 0 -%}0{%- endif -%}
            {%- for invoice in sales_invoice_list -%}
            {%- set invoice_title = invoice.title  -%}
            {%- if invoice_title.startswith('My_old_invoice') -%}
            {%- set remarks = invoice.remarks  -%}
            {%- set value = remarks.split(':')  -%}
            {%- set val = value[1] | float -%}
            {{val * 2.74}}
            {%- endif -%}
            {%- endfor -%}"""

        calculation.append("items", item)
        calculation.insert()

        expected_amount = 9.45

        calculator = InvoiceCalculator()
        calculator.calculate(calculation.name)

        calculation = frappe.get_doc("Invoice Calculation", calculation.name)
        self.assertEqual(len(calculation.errors), 0)

        customer_invoices = frappe.get_list(
            "Sales Invoice", filters={"customer": self.customer.name}, fields="*"
        )

        self.assertEqual(len(customer_invoices), 2)
        invoice = customer_invoices[0]
        self.assertEqual(invoice["grand_total"], expected_amount)

    def test_amount_by_script_divide(self):
        price_list = frappe.get_last_doc("Price List")
        calculation = self.calculation = create_invoice_calculation(
            self.company, price_list.name
        )

        product = get_or_create_item(
            "Plot Lease",
            self.company,
            self.warehouse.name,
            self.company.default_income_account,
            False,
        )

        item = create_invoice_calculation_item(
            product, self.company.default_income_account, "AddProductByTemplates"
        )

        item.amount_template = """
{%- set tenant_list = frappe.get_all('Customer', filters={'customer_group': "Tenant"}, fields=['name']) -%}
{%- set len = tenant_list|length -%}
{{ 144 / len }}
            """

        calculation.append("items", item)
        calculation.insert()

        expected_amount = 72

        calculator = InvoiceCalculator()
        calculator.calculate(calculation.name)

        calculation = frappe.get_doc("Invoice Calculation", calculation.name)
        self.assertEqual(len(calculation.errors), 0)

        customer_invoices = frappe.get_list(
            "Sales Invoice", filters={"customer": self.customer.name}, fields="*"
        )

        self.assertEqual(len(customer_invoices), 1)
        invoice = customer_invoices[0]
        self.assertEqual(invoice["grand_total"], expected_amount)

    def test_insurance_table(self):
        price_list = frappe.get_last_doc("Price List")
        calculation = self.calculation = create_invoice_calculation(
            self.company, price_list.name
        )

        product = get_or_create_item(
            "Insurance",
            self.company,
            self.warehouse.name,
            self.company.default_income_account,
            False,
        )

        insurances = [create_insurance_entry("Basic Insurance", 35)]

        for item in insurances:
            self.customer.append("insurance_table", item)
        self.customer.save()

        item = create_invoice_calculation_item(
            product, self.company.default_income_account, "AddProductByTemplates"
        )

        item.quantity_template = """
{%- set customer_name = customer.name  -%}
{%- set insurances = frappe.get_all('Insurance Table', filters={'parent': customer_name}, fields=['insurance_type', 'insurance_value']) -%}
{%- if insurances|length == 0 -%}0{%- endif -%}
{%- for entry in insurances -%}
{%- if entry.insurance_type == 'Basic Insurance' -%}
1
{%- else -%}
0
{%- endif -%}
{%- endfor -%}
            """
        item.amount_template = """
{%- set customer_name = customer.name  -%}
{%- set insurances = frappe.get_all('Insurance Table', filters={'parent': customer_name}, fields=['insurance_type', 'insurance_value']) -%}
{%- for entry in insurances -%}
{%- if entry.insurance_type == 'Basic Insurance' -%}
{{entry.insurance_value}}
{%- else -%}
0
{%- endif -%}
{%- endfor -%}
            """

        calculation.append("items", item)
        calculation.insert()

        expected_amount = 35

        calculator = InvoiceCalculator()
        calculator.calculate(calculation.name)

        calculation = frappe.get_doc("Invoice Calculation", calculation.name)
        self.assertEqual(len(calculation.errors), 0)

        customer_invoices = frappe.get_list(
            "Sales Invoice", filters={"customer": self.customer.name}, fields="*"
        )

        self.assertEqual(len(customer_invoices), 1)
        invoice = customer_invoices[0]
        self.assertEqual(invoice["grand_total"], expected_amount)

    def test_teamwork(self):
        customer = frappe.get_doc("Customer", self.customer.name)
        price_list = frappe.get_last_doc("Price List")
        calculation = self.calculation = create_invoice_calculation(
            self.company, price_list.name
        )

        product = get_or_create_item(
            "Teamwork",
            self.company,
            self.warehouse.name,
            self.company.default_income_account,
            False,
        )

        teamwork = [
            create_teamwork_entry("2023-10-10", 2),
            create_teamwork_entry("2023-5-10", 3),
        ]

        for item in teamwork:
            customer.append("teamwork_table", item)

        work_task = [create_work_task_entry("todo", 2)]

        for item in work_task:
            customer.append("teanant_teamwork_table", item)
        customer.save()

        item = create_invoice_calculation_item(
            product, self.company.default_income_account, "CalculateTeamwork"
        )
        item.required_teamwork_hours = 8
        item.teamwork_year = 2023
        item.amount = 30

        calculation.append("items", item)
        calculation.insert()

        expected_amount = 30

        calculator = InvoiceCalculator()
        calculator.calculate(calculation.name)

        calculation = frappe.get_doc("Invoice Calculation", calculation.name)
        self.assertEqual(len(calculation.errors), 0)

        customer_invoices = frappe.get_list(
            "Sales Invoice", filters={"customer": self.customer.name}, fields="*"
        )

        self.assertEqual(len(customer_invoices), 1)
        invoice = customer_invoices[0]
        self.assertEqual(invoice["grand_total"], expected_amount)
    
    def test_teamwork_with_none_value(self):
        customer = frappe.get_doc("Customer", self.customer.name)
        price_list = frappe.get_last_doc("Price List")
        calculation = self.calculation = create_invoice_calculation(
            self.company, price_list.name
        )

        product = get_or_create_item(
            "Teamwork",
            self.company,
            self.warehouse.name,
            self.company.default_income_account,
            False,
        )

        work_task = [
            create_work_task_entry("todo", 2),
            create_work_task_entry("todo2", None)
        ]

        for item in work_task:
            customer.append("teanant_teamwork_table", item)
        customer.save()

        item = create_invoice_calculation_item(
            product, self.company.default_income_account, "CalculateTeamwork"
        )
        item.required_teamwork_hours = 8
        item.teamwork_year = 2023
        item.amount = 30

        calculation.append("items", item)
        calculation.insert()

        expected_amount = 180

        calculator = InvoiceCalculator()
        calculator.calculate(calculation.name)

        calculation = frappe.get_doc("Invoice Calculation", calculation.name)
        self.assertEqual(len(calculation.errors), 0)

        customer_invoices = frappe.get_list(
            "Sales Invoice", filters={"customer": self.customer.name}, fields="*"
        )

        self.assertEqual(len(customer_invoices), 1)
        invoice = customer_invoices[0]
        self.assertEqual(invoice["grand_total"], expected_amount)
