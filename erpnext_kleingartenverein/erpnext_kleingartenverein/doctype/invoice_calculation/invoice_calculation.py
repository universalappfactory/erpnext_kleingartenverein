# Copyright (c) 2023, Kleingartenverein and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class InvoiceCalculation(Document):
    

    def validate_item(self, item):
        pass

    def validate_items(self):
        for item in self.items:
            item.validate()

    def validate(self):
        self.validate_items()
