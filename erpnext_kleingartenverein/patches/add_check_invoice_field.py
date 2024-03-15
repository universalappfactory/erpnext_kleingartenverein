import frappe
from frappe import _
from erpnext_kleingartenverein.setup.install import add_check_invoice_field


def execute():
    try:
        add_check_invoice_field()
    except BaseException:
        pass
