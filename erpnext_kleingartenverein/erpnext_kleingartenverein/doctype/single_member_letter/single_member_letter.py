# Copyright (c) 2023, Kleingartenverein and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.model.document import Document
from erpnext_kleingartenverein.erpnext_kleingartenverein.doctype.member_letter_shipment.shipping import (
    MemberLetterShipping,
    STATUS_SUBMITTED,
)


STATUS_SUBMITTED = 1


class SingleMemberLetter(Document):
    def on_submit(self):
        if self.error_message and self.error_message != "":
            frappe.throw(_("cannot submit letter has an error"))

    def before_submit(self):
        if self.docstatus == STATUS_SUBMITTED:
            MemberLetterShipping().create_pdf_for_letter(self)
            # self.save()
