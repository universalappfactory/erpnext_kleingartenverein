import frappe
from frappe.custom.doctype.customize_form.customize_form import CustomizeForm

class CustomerForm(CustomizeForm):

    def validate(self):
        self.validate_address()

    def validate_address(self):
        if self.address_line1 or self.address_line2 or self.pincode or self.city or self.state:
            if not hasattr(self,'country') or not self.country:
                frappe.throw(frappe._('You must provide a country'))
