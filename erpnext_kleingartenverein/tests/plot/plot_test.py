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

from testhelper.bank_transaction_factory import create_bank_transactions
from testhelper.delete_utils import try_delete
from datetime import datetime


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


class PlotTests(TestBase):
    TEST_SITE = "testing.localhost"

    @classmethod
    def setUpClass(cls):
        super().setUpClass()

        cls.company = frappe.get_last_doc("Company")
        test_customer = get_or_create_tenant("Test Tenant", "Tenant")
        cls.customers = [test_customer]
        cls.warehouse = frappe.get_last_doc("Warehouse")

    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()

    def test_plot_water_consumption(self):
        customer = self.customers[0]
        plot = self.plot = create_plot("123", customer.name)
        plot.save()

        expected_consumption = 7
        counter_values = [
            create_counter_entry("2021-12-21", 94, "12/3456", "2018-01-01"),
            create_counter_entry("2022-12-22", 96, "12/3456", "2018-01-01"),
            create_counter_entry("2023-04-08", 0, "112233", "2018-01-01"),
            create_counter_entry("2023-10-29", 7, "112233", "2018-01-01"),
        ]

        for item in counter_values:
            plot.append("water_meter_table", item)
        plot.save()

        plot = frappe.get_doc('Plot', plot.name)
        result = plot.calculate_water_consumption(2023)
        self.assertEqual(result, expected_consumption)
        # plot.delete()
    
    def test_plot_water_consumption_with_multiple_counters_per_year(self):
        customer = self.customers[0]
        plot = self.plot = create_plot("123", customer.name)
        plot.save()

        expected_consumption = 16
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

        plot = frappe.get_doc('Plot', plot.name)
        result = plot.calculate_water_consumption(2023)
        self.assertEqual(result, expected_consumption)
