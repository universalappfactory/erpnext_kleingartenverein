import frappe
from frappe import _
from erpnext_kleingartenverein.setup.install import add_disagree_invoice_by_mail_field


def execute():
    try:
        add_disagree_invoice_by_mail_field()
    except BaseException:
        pass
