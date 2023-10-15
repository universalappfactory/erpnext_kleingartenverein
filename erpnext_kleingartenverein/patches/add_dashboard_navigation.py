import frappe
from frappe import _
from erpnext_kleingartenverein.setup.install import add_dashboard_navigation


def execute():
    try:
        add_dashboard_navigation()
    except Exception as error:
        frappe.log_error(error)
