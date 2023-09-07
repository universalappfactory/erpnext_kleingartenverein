from erpnext_kleingartenverein.erpnext_kleingartenverein.doctype.invoice_calculation.invoice_calculator import (
    InvoiceCalculator,
)
from erpnext_kleingartenverein.erpnext_kleingartenverein.doctype.member_letter.letter_shipping import (
    LetterShipping,
)

from erpnext_kleingartenverein.utils.tenant_search import TenantSearch


import frappe
import json
import random
from datetime import datetime
from frappe import _

@frappe.whitelist(allow_guest=False)
def create_print_preview(*args, **kwargs):
    try:
        # print(kwargs)
        data = kwargs['data']

        print(data['recipients'])
        print(data['content'])
        

    except Exception as e:
        print(e)
        frappe.log_error(e)
        return []