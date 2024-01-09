import unittest
import frappe
import unittest
import os


class TestBase(unittest.TestCase):
    TEST_SITE = "testing.localhost"

    @classmethod
    def setUpClass(cls) -> None:
        sites_path = os.path.join(os.path.dirname(__file__), "..", "sites")
        frappe.init(cls.TEST_SITE, sites_path=sites_path)
        frappe.connect(cls.TEST_SITE)
        super().setUpClass()
