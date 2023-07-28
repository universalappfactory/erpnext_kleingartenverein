# Copyright (c) 2023, Kleingartenverein and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils.file_manager import add_attachments
from frappe.utils.weasyprint import PrintFormatGenerator, download_pdf
from erpnext_kleingartenverein.erpnext_kleingartenverein.doctype.member_letter_shipment.shipping import MemberLetterShipping, STATUS_SUBMITTED, create_letters_and_submit

SHIPMENTTYPE_CREATE = 'Create'
SHIPMENTTYPE_DRAFT = 'Create Drafts'



class MemberLetterShipment(Document):

	def validate(self):
		target_folder = frappe.get_doc('File', self.target_folder)
		if not target_folder:
			frappe.throw(_("Folder '{0}' does not exist").format(self.target_folder))

		if target_folder.is_folder == 0:
			frappe.throw(_("You must select a folder, '{0}' is a file").format(self.target_folder))

		if not self.has_valid_recipients():
			frappe.throw(_("You must select a target customergroup or a list of target customers"))

		if self.has_customer_group() and self.has_linked_customers():
			frappe.throw(_("You must select either a target customergroup or a list of target customers"))

	def has_valid_recipients(self):
		if not self.has_linked_customers() and not self.has_customer_group():
			return False
		return True

	def has_customer_group(self):
		return self.target_customergroup != None

	def has_linked_customers(self):
		return len(self.customer_table) > 0

	def on_submit(self):
		if not self.has_valid_recipients():
			frappe.throw(_("Shipment has no valid recipients"))

		if self.docstatus == STATUS_SUBMITTED and self.shipment_type == SHIPMENTTYPE_CREATE:
			create_letters_and_submit(self.name)

		if self.docstatus == STATUS_SUBMITTED and self.shipment_type == SHIPMENTTYPE_DRAFT:
			MemberLetterShipping().create_letters(self)
