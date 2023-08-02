# Copyright (c) 2023, Kleingartenverein and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class ReadMarker(Document):
    def mark_as_read(self, user_id):
        matching = next(
            filter(
                lambda x: x.user_link == user_id,
                self.entries,
            ),
            None,
        )

        if not matching:
            new_entry = frappe.new_doc("Read Marker Entry")
            new_entry.user_link = user_id
            self.append("entries", new_entry)
