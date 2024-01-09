import frappe
import os
import sys

pt = os.path.abspath(
    os.path.join(
        os.path.dirname(__file__), "..", "..", "..", "erpnext_kleingartenverein"
    )
)
sys.path.insert(0, pt)

pt = os.path.abspath(os.path.join(os.path.dirname(__file__), "testhelper"))
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


class SalesInvoiceTests(TestBase):
    TEST_SITE = "testing.localhost"

    def test_create_sales_invoice(self):
        tenant = frappe.get_doc("Customer", "TestCustomer")
        self.assertIsNotNone(tenant)

        company = frappe.get_last_doc("Company")

        sales_invoice = create_sales_invoice(
            tenant.name, "My Invoice", company.name, 100, company.default_receivable_account
        )

        item = frappe.get_doc("Item", "TestProduct")
        entry = create_sales_invoice_item(item.name, "My Entry", "Stk", 1, 100.0, company.default_income_account, company.cost_center)
        sales_invoice.append("items", entry)
        sales_invoice.insert()

        self.assertIsNotNone(sales_invoice)