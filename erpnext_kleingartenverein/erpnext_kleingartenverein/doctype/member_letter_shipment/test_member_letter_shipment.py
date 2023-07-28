# Copyright (c) 2023, Kleingartenverein and Contributors
# See license.txt

import frappe
from frappe.printing.page.print_format_builder.print_format_builder import create_custom_format
from frappe.tests.utils import FrappeTestCase
from erpnext_kleingartenverein.utils.documents import try_delete, get_attachments

test_records = frappe.get_test_records("Member Letter")
test_dependencies = []
test_ignore = [
    "Customer",
    "Opportunity",
    "Employee",
    "Account",
    "Item",
    "Customer Group",
]

FORMAT_DATA = '{"header": "", "sections": []}'

class TestMemberLetter(FrappeTestCase):

    def __init__(self, methodName: str = "runTest") -> None:
        super().__init__(methodName)
        self._folder = None

    def get_or_create_folder(self):
        try:
            return frappe.get_doc('File', 'Home/My Folder')
        except frappe.DoesNotExistError:
            folder = frappe.get_doc(
                {
                    "doctype": "File",
                    "file_name": "My Folder",
                    "is_folder": 1
                }
            )
            folder.save()
            return folder

    def get_or_create_print_format(self):
        try:
            return frappe.get_doc('Print Format', 'My Printformat')
        except frappe.DoesNotExistError:
            print_format = frappe.get_doc(
                {
                    "doctype": "Print Format",
                    "doc_type": "Single Member Letter",
                    "standard": "Yes",
                    "print_format_builder_beta": 1,
                    "format_data": FORMAT_DATA
                }
            )
            print_format.name = "My Printformat"
            print_format.insert()
            return print_format

    def setUp(self):
        self.delete_shipments()

        self._folder = self.get_or_create_folder()
        self._print_format = self.get_or_create_print_format()

        self.delete_customer_attachments()

    def delete_customer_attachments(self):
        customer = frappe.get_last_doc('Customer')
        attachments = frappe.get_list('File', page_length=200, filters={'folder': 'Home/My Folder'}, fields='*')
        for attachment in attachments:
            doc = frappe.get_doc('File', attachment.name)
            doc.delete()
        attachments = frappe.get_list('File', page_length=200, filters={'attached_to_name': customer.name}, fields='*')
        for attachment in attachments:
            doc = frappe.get_doc('File', attachment.name)
            doc.delete()

    def tearDown(self):
        self.delete_customer_attachments()
        self.delete_shipments()
        if self._folder:
            try_delete("File", self._folder.name)
        if self._print_format:
            try_delete("Print Format", self._print_format.name)

    def delete_shipments(self):
        letters = frappe.get_list('Single Member Letter')
        for letter in letters:
            frappe.db.delete('Single Member Letter', filters={'name': letter.name})

        docs = frappe.get_list('Member Letter Shipment')
        for doc in docs:
            frappe.db.delete('Member Letter Shipment', filters={'name': doc.name})

    def get_doc_without_recipients(self):
        return frappe.get_doc(
            {
                "description": "My Shipment",
                "content": "## Content",
                "print_format": self._print_format.name,
                "doctype": "Member Letter Shipment",
                "target_folder": self._folder.name
            }
        )

    def test_that_exception_is_thrown_when_no_valid_recipients_are_set(self):
        doc = self.get_doc_without_recipients()
        self.assertRaises(frappe.ValidationError, doc.save)

    def test_that_shipment_is_saved_when_customers_are_set(self):
        doc = self.get_doc_without_recipients()

        customer = frappe.get_last_doc('Customer')
        customer_link = frappe.new_doc("Customer Link")
        customer_link.customer = customer.name
        doc.append("customer_table", customer_link)

        doc.save()
        self.assertIsNotNone(doc.name)

    def test_that_shipment_is_saved_when_customergroup_is_set(self):
        doc = self.get_doc_without_recipients()

        customer_group = frappe.get_last_doc('Customer Group')
        doc.target_customergroup = customer_group.name

        doc.save()
        self.assertIsNotNone(doc.name)

    def test_that_exception_is_thrown_when_customergroup_and_customerlist_is_set(self):
        doc = self.get_doc_without_recipients()

        customer = frappe.get_last_doc('Customer')
        customer_link = frappe.new_doc("Customer Link")
        customer_link.customer = customer.name
        doc.append("customer_table", customer_link)

        customer_group = frappe.get_last_doc('Customer Group')
        doc.target_customergroup = customer_group.name

        self.assertRaises(frappe.ValidationError, doc.save)

    def test_that_exception_is_thrown_when_folder_does_not_exist(self):
        doc = self.get_doc_without_recipients()
        doc.print_format = None
        self.assertRaises(frappe.ValidationError, doc.save)

    def test_that_letters_and_pdf_are_created_when_document_is_submitted_and_shipmenttype_is_create(self):
        doc = self.get_doc_without_recipients()

        customer = frappe.get_last_doc('Customer')
        customer_link = frappe.new_doc("Customer Link")
        customer_link.customer = customer.name
        doc.append("customer_table", customer_link)
        doc.shipment_type = "Create"

        doc.save()
        self.assertIsNotNone(doc.name)

        doc.submit()

        letters = frappe.get_list('Single Member Letter', fields="*")
        for letter in letters:
            self.assertIsNone(letter.error_message)
            self.assertTrue(letter.success)

        attachments = get_attachments('Customer', customer.name)
        self.assertEqual(len(attachments), 1)

        letters = frappe.get_list('Single Member Letter', filters={
            "customer": customer.name
        }, fields="*")
        self.assertEqual(len(letters), 1)
        self.assertTrue(letters[0].success)

    def test_that_only_letters_are_created_when_document_is_submitted_and_shipmenttype_is_createdraft(self):
        doc = self.get_doc_without_recipients()

        customer = frappe.get_last_doc('Customer')
        customer_link = frappe.new_doc("Customer Link")
        customer_link.customer = customer.name
        doc.append("customer_table", customer_link)
        doc.shipment_type = "Create Drafts"

        doc.save()
        self.assertIsNotNone(doc.name)

        doc.submit()

        letters = frappe.get_list('Single Member Letter', fields="*")
        for letter in letters:
            self.assertIsNone(letter.error_message)
            self.assertFalse(letter.success)

        attachments = get_attachments('Customer', customer.name)
        self.assertEqual(len(attachments), 0)

        letters = frappe.get_list('Single Member Letter', filters={
            "customer": customer.name,
        }, fields="*")
        self.assertEqual(len(letters), 1)
