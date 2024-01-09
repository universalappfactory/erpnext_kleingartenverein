import frappe
import unittest
import os
import sys
from frappe.tests.utils import FrappeTestCase
import werkzeug

pt = os.path.abspath(
    os.path.join(
        os.path.dirname(__file__), "..", "..", "..", "erpnext_kleingartenverein"
    )
)
sys.path.insert(0, pt)

from erpnext_kleingartenverein.payments.payment_creation import (
    create_payment_for_sales_invoice,
)


class FrappeTests(FrappeTestCase):
    TEST_SITE = "testing.localhost"

    @classmethod
    def setUpClass(cls) -> None:
        sites_path = os.path.join(os.path.dirname(__file__), "sites")
        frappe.init(cls.TEST_SITE, sites_path=sites_path)
        frappe.connect(cls.TEST_SITE)
        super().setUpClass()

    def test_get_all_customers(self):
        all_customers = frappe.get_list("Customer")

        self.assertIsNotNone(all_customers)
        self.assertEqual("yo", "yo")
