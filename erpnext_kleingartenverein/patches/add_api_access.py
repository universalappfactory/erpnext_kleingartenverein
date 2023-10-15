import frappe
from frappe import _
from erpnext_kleingartenverein.setup.install import add_api_access


def execute():
    try:
        add_api_access()
    except Exception as error:
        frappe.log_error(error)
