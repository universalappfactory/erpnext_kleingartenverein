from erpnext_kleingartenverein.erpnext_kleingartenverein.doctype.invoice_calculation.invoice_calculator import (
    InvoiceCalculator,
)


from erpnext_kleingartenverein.utils.tenant_search import TenantSearch
from erpnext_kleingartenverein.file_api import ensure_folder_exists
from erpnext_kleingartenverein.erpnext_kleingartenverein.doctype.member_letter_shipment.shipping import MemberLetterShipping

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
        return content.decode(result["encoding"])
    except Exception as error:
        print(error)

    try:
        return content.decode("utf-8")
    except UnicodeDecodeError as error:
        print(error)

    try:
        return content.decode("ISO-8859-1")
    except Exception as error:
        print(error)
        return content


def parse_input(args, kwargs):
    data = args[1]

    content = data["data"]
    decoded = decode(base64.urlsafe_b64decode(content))
    data = json.loads(decoded)

    if len(data["recipients"][0]) == 0:
        frappe.throw("no recipients provided")

    recipients = data["recipients"][0]

    return (data["content"], recipients)


@frappe.whitelist(allow_guest=False)
def create_print_preview(*args, **kwargs):
    try:
        (content, recipients) = parse_input(args, kwargs)

        target_folder = ensure_folder_exists("Preview")

        shipping = MemberLetterShipping(True)
        pdf = shipping.create_preview(
            recipients, content, "Single Member Letter Default", target_folder
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


@frappe.whitelist(allow_guest=False)
def print_letters(*args, **kwargs):
    try:
        (content, recipients) = parse_input(args, kwargs)

        # pdf = create_print_preview(args, kwargs)
        # if not pdf:
        #     return ""

        # response = Response(pdf, content_type="application/pdf")
        # response.headers["Content-Disposition"] = "inline; filename=my_document.pdf"

        # return response
    except Exception as error:
        frappe.log_error(error)
        return ""
