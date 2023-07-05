# Copyright (c) 2023, Kleingartenverein and contributors
# For license information, please see license.txt

from frappe.model.document import Document


class ClubSettings(Document):
    def has_readmarker_for_role(self, role):
        readmarker_for_role = next(
            (
                doc
                for doc in self.read_marker_mappings
                if doc.role_link == role
            ),
            None,
        )
        return readmarker_for_role != None
