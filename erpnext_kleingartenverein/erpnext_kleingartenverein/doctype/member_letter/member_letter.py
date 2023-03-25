# Copyright (c) 2023, Kleingartenverein and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.model.document import Document

# ToDo Validate if target_customergroup or customer is set -> allow only one
class MemberLetter(Document):


	def validate(self):
		target_folder = frappe.get_doc('File', self.target_folder)
		if not target_folder:
			frappe.throw(_("Folder '{0}' does not exist").format(self.target_folder))

		if target_folder.is_folder == 0:
			frappe.throw(_("You must select a folder, '{0}' is a file").format(self.target_folder))
