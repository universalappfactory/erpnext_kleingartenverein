from erpnext_kleingartenverein.erpnext_kleingartenverein.doctype.invoice_calculation.invoice_calculator import (
    InvoiceCalculator,
)
from erpnext_kleingartenverein.erpnext_kleingartenverein.doctype.member_letter.letter_shipping import (
    LetterShipping,
)

from erpnext_kleingartenverein.utils.tenant_search import TenantSearch
from erpnext_kleingartenverein.file_api import ensure_folder_exists


import frappe
import json
import random
import chardet
from datetime import datetime
from frappe import _
import base64
import json
from werkzeug.wrappers import Response
from urllib.parse import unquote

def decode(content) -> str:
    
    try:
        result = chardet.detect(content)
        return content.decode(result['encoding'])
    except Exception as error:
        print(error)

    try:
        return content.decode("utf-8")
    except UnicodeDecodeError as error:
        print(error)

    try:
        return content.decode('ISO-8859-1')
    except Exception as error:
        print(error)
        return content

@frappe.whitelist(allow_guest=False)
def create_print_preview(*args, **kwargs):
    try:
        data = args[1]
        print(data['data'])
        
        content = data['data']
        print(data)
        padding_needed = 4 - (len(content) % 4)
        content += '=' * padding_needed
        print(content)
        decoded = decode(base64.urlsafe_b64decode(content))
        # urldecoded = unquote(decoded)
        data = json.loads(decoded)

        if len(data["recipients"][0]) == 0:
            return

        recipients = data["recipients"][0]
        target_folder = ensure_folder_exists("Preview")

        shipping = LetterShipping(True)
        pdf = shipping.create_preview(
            recipients, data["content"], "Single Member Letter Default", target_folder
        )

        return pdf

    except Exception as e:
        print(e)
        frappe.log_error(e)
        return []


@frappe.whitelist(allow_guest=False)
def get_print_preview(*args, **kwargs):
    try:
        pdf = create_print_preview(args, kwargs)
        if not pdf:
            return ""

        response = Response(pdf, content_type="application/pdf")
        response.headers["Content-Disposition"] = "inline; filename=my_document.pdf"

        return response
    except Exception as error:
        frappe.log_error(error)
        return ""
