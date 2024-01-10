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

from erpnext_kleingartenverein.payments.payment_creation import (
    create_payment_for_sales_invoice,
)

from erpnext_kleingartenverein.payments.purchase_invoice_payments import (
    create_payment_for_purchase_invoice,
)

class PaymentCreationTests(TestBase):
    # TEST_SITE = "testing.localhost"
    TEST_SITE = "mysite.localhost"

    def test_create_bank_statement_import(self):
        folder = get_or_create_folder("Test")

        pt = os.path.abspath(
            os.path.join(os.path.dirname(__file__), "test_payments.csv")
        )

        company = frappe.get_last_doc("Company")
        bank_account = frappe.get_last_doc("Bank Account")
        transactions = create_bank_transactions(pt, company.name, bank_account.name, "EUR")

        regex_list = [
            "[\s]?(\d{2,3}\-\d{0,6}\-\d{2,3}).*",
            ".*(ACC\-SINV\-\d\d\d\d\-\d\d\d\d\d).*",
            ".*parzelle[\d\s\.]+(\d\d\d).*",
            ".*parzelle[\d\s\.]+(\d\d).*",
            ".*Garten\s(\d?\d\d)\s?.*",
            ".*Garten[\s\-]nr\.?\s+(\d?\d\d).*",
            ".*\d\d\d(\d\d\d).*",
            ".*Gartennummer\s?(\d?\d\d).*"
        ]

        for transaction in transactions:
            try:
                if float(transaction.withdrawal) > 0:
                    create_payment_for_purchase_invoice(transaction, regex_list, True)
            except Exception as error:
                print(error)

    def test_create_sales_invoice(self):
        self.assertEqual(True, False)
