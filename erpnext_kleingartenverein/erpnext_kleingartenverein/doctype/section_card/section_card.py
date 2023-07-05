# Copyright (c) 2023, Kleingartenverein and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document
from erpnext_kleingartenverein.www.utils import (
    invalidate_caches
)

class SectionCard(Document):
	
	def validate(self):
		invalidate_caches()
