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

from erpnext_kleingartenverein.erpnext_kleingartenverein.doctype.invoice_calculation.invoice_calculation import (
    InvoiceCalculation,
)


class InvoiceCalculationTests(TestBase):
    TEST_SITE = "testing.localhost"
    customers = []

    @classmethod
    def setUpClass(cls):
        super().setUpClass()

        test_customer = get_or_create_tenant("Test Tenant", "Tenant")
        cls.customers = [test_customer]

    @classmethod
    def tearDownClass(cls):
        for customer in cls.customers:
            try_delete(lambda: customer.delete())

        super().tearDownClass()

    def test_create_and_delete_invoice_calculation(self):
        calculation = frappe.get_doc(
            {
                "doctype": "Invoice Calculation",
                "description": "Lease Invoice 2024",
                "prefix": "Invoice_",
                "year": 2024,
            }
        )
        self.assertIsNotNone(calculation)
        calculation.insert()
        calculation.delete()

    def test_product_must_be_set_on_add_fixed_product(self):
        actions = [
            "AddFixedProduct",
            "AddProductByFields",
            "AddProductByTemplate",
            "CalculateByServerScript",
        ]
        for action in actions:
            calculation = frappe.get_doc(
                {
                    "doctype": "Invoice Calculation",
                    "description": "Lease Invoice 2024",
                    "prefix": "Invoice_",
                    "year": 2024,
                }
            )

            new_entry = frappe.get_doc(
                {
                    "doctype": "Invoice Calculation Item",
                    "description": "First Item",
                    "action": action,
                }
            )

            calculation.append("items", new_entry)

            with self.assertRaises(
                Exception, msg="product must be set on action AddFixedProduct"
            ) as error:
                calculation.insert()
            self.assertEqual(str(error.exception), "Product must be set")
