from erpnext_kleingartenverein.erpnext_kleingartenverein.doctype.invoice_calculation.invoice_calculator import (
    InvoiceCalculator,
)


import frappe
import json
import random
from datetime import datetime
from frappe import _


@frappe.whitelist(allow_guest=False)
def execute_invoice_calculation(names, status):
    try:
        names = json.loads(names)
        for name in names:
            calculation = frappe.get_doc("Invoice Calculation", name)
            if calculation:
                calculator = InvoiceCalculator()
                calculator.create_drafts(calculation)
    except Exception as e:
        frappe.throw(str(e))


def get_customers(customer_names):
    result = []
    for customer in customer_names:
        result.append(frappe.get_doc("Customer", customer))
    return result


def customer_before_insert(doc, method=None):
    """
    creates a random membership number when the customer does not have a membership_number
    """
    if doc.customer_group == "Lessee" or doc.customer_group == "Member":
        if not doc.membership_number:
            now = datetime.now()
            number = random.randrange(1, 100)
            doc.membership_number = now.strftime("%Y%m") + str(number)


@frappe.whitelist()
def get_homepage(user):
    if user != "Guest":
        return "dashboard"
    return "index"


def get_breadcrumbs(context, current_route=None):
    result = []
    if not context or not current_route and not context.meta:
        return result

    route = current_route if current_route else context.meta.route
    if context.top_bar_items:
        for itm in context.top_bar_items:
            if itm.url == f"/{route}":
                if itm.parent_label and itm.parent_label != "":
                    result.append(("", itm.parent_label))

                result.append((itm.url, itm.label))

    return result


def get_or_create_read_marker(document_type, document_name):
    markers = frappe.get_list(
        "Read Marker",
        filters={"document_link": document_name},
        pluck="name",
    )

    if len(markers) > 0:
        return frappe.get_doc("Read Marker", markers[0])

    marker = frappe.new_doc("Read Marker")
    marker.document_type = document_type
    marker.document_link = document_name
    marker.insert()
    return marker


def create_read_marker(document, role):
    try:
        marker = get_or_create_read_marker(document.doctype, document.name, role)
    except Exception as e:
        frappe.log_error(e)


def create_read_marker_for_user(document_type, document_name, user):
    try:
        marker = get_or_create_read_marker(document_type, document_name)

        existing = next(
            (
                doc
                for doc in marker.entries
                if doc["document_type"] == document_type
                and doc["name"] == document_name
            ),
            None,
        )
        if not existing:
            new_entry = frappe.new_doc("Read Marker Entry")
            new_entry.user_link = user
            marker.append("entries", new_entry)
            marker.save()

    except Exception as e:
        frappe.log_error(e)


def create_read_marker(document):
    if not document:
        frappe.throw(_("expected a document"), frappe.ValidationError)

    club_settings = frappe.get_last_doc("Club Settings")
    user = frappe.session.user
    if not user or user == "Guest":
        frappe.throw(_("Not permitted"), frappe.PermissionError)

    roles = frappe.get_roles(user)
    readmarker_for_doctype = next(
        (doc for doc in roles if club_settings.has_readmarker_for_role(doc)),
        None,
    )
    if readmarker_for_doctype != None:
        create_read_marker_for_user(document.doctype, document.name, user)


@frappe.whitelist(allow_guest=False)
def submit_by_name(*args, **kwargs):
    try:
        doc = frappe.get_doc(kwargs["doctype"], kwargs["name"])
        doc.submit()
    except Exception as e:
        print(e)
        frappe.log_error(e)
        return []
