# Copyright (c) 2023, Kleingartenverein and contributors
# For license information, please see license.txt

from datetime import datetime
import frappe
from frappe.model.document import Document
from erpnext_kleingartenverein.file_api import (
    get_yearly_customer_folder,
    get_guest_folder,
)

STATUS_SUBMITTED = 1


class CounterSubmission(Document):
    def validate(self):
        if self.recent_value <= 0:
            self.is_suspicious = 1

        if self.recent_value > 0 and self.recent_value < self.value:
            self.is_suspicious = 1

    def on_submit(self):
        if self.docstatus == STATUS_SUBMITTED:
            self.apply_to_customer()

    def apply_to_customer(self):
        source_file = frappe.get_last_doc("File", filters={"file_url": self.picture})
        plot = frappe.get_doc("Plot", self.plot)

        file_doc = frappe.new_doc("File")
        file_doc.folder = get_yearly_customer_folder(self.customer)
        file_doc.file_name = source_file.file_name
        file_doc.is_private = 1
        file_doc.content = source_file.get_content()
        file_doc.save()

        counter_row = frappe.new_doc("Counter Table")
        counter_row.date = datetime.now().date()
        counter_row.counter_value = self.value
        counter_row.counter_number = self.counter_number
        counter_row.counter_picture = file_doc.file_url
        plot.append("water_meter_table", counter_row)

        try:
            plot.save()
        except Exception as error:
            frappe.log_error(error)
            raise error

    def update_attached_file(self):
        if self.picture:
            file = frappe.get_last_doc("File", {"file_url": self.picture })
            file.attached_to_name = self.name
            file.attached_to_doctype = "Counter Submission"
            file.attached_to_field = "picture"
            file.save(ignore_permissions=True)

    def on_update(self):
        self.update_attached_file()

    def before_submit(self):
        pass

    # if self.docstatus == STATUS_SUBMITTED:
    #     MemberLetterShipping().create_pdf_for_letter(self)
    #     # self.save()
