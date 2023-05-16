import frappe
from frappe.exceptions import DoesNotExistError, ValidationError
from frappe.tests.utils import FrappeTestCase
from frappe.tests.test_patches import check_patch_files
from frappe.modules.patch_handler import get_patches_from_app, run_single

test_records = frappe.get_test_records("Plot")
test_dependencies = []
test_ignore = ["Customer", "Warehouse"]


class TestApi(FrappeTestCase):
    @classmethod
    def setUpClass(cls) -> None:
        templates = frappe.get_list(
            "Address Template",
            filters={"country": "Germany", "is_default": 1},
            pluck="name",
        )
        if len(templates) == 0:
            frappe.get_doc(
                {"doctype": "Address Template", "country": "Germany", "is_default": 1}
            ).insert()

    @classmethod
    def addClassCleanup(cls):
        lst = frappe.get_list("Address Template")
        for tpl in lst:
            frappe.delete_doc("Address Template", tpl)

    def tearDown(self):
        frappe.delete_doc("Customer", "Address Test Customer")

    def test_that_address_line1_must_be_set(self):
        customer = frappe.new_doc("Customer")

        customer.customer_name = "Address Test Customer"
        customer.mobile_no = "123"
        customer.city = "My City"
        customer.pincode = "12345"
        customer.customer_group = "Test CustomerGroup"
        customer.territory = "_Test Territory"
        self.assertRaises(ValidationError, lambda: customer.save())

        customer.address_line1 = "My Street"
        customer.save()

        self.assertFalse(customer.is_new())

    def test_that_city_must_be_set(self):
        customer = frappe.new_doc("Customer")

        customer.customer_name = "Address Test Customer"
        customer.mobile_no = "123"
        customer.address_line1 = "My Street"
        customer.pincode = "12345"
        customer.customer_group = "Test CustomerGroup"
        customer.territory = "_Test Territory"
        self.assertRaises(ValidationError, lambda: customer.save())

        customer.city = "My City"
        customer.save()

        self.assertFalse(customer.is_new())

    def test_that_pincode_must_be_set(self):
        customer = frappe.new_doc("Customer")

        customer.customer_name = "Address Test Customer"
        customer.mobile_no = "123"
        customer.address_line1 = "My Street"
        customer.city = "My City"
        customer.customer_group = "Test CustomerGroup"
        customer.territory = "_Test Territory"
        self.assertRaises(ValidationError, lambda: customer.save())

        customer.pincode = "12345"
        customer.save()

        self.assertFalse(customer.is_new())
