import traceback
from erpnext_kleingartenverein.erpnext_kleingartenverein.doctype.invoice_calculation.invoice_calculator import (
    InvoiceCalculator,
)
from erpnext_kleingartenverein.erpnext_kleingartenverein.doctype.member_letter.letter_shipping import (
    LetterShipping,
)
import frappe
import json
import random
from datetime import datetime
from frappe import _
from frappe.permissions import get_user_permissions


@frappe.whitelist()
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


@frappe.whitelist()
def execute_member_letter_shipping(names, status):
    frappe.throw(_("not supported at the moment"))
    # try:
    #     names = json.loads(names)
    #     shipping = LetterShipping()

    #     if (len(names) > 1):
    #         frappe.throw('you can only select one letter at the moment.')

    #     name = names[0]
    #     letter = frappe.get_doc('Member Letter', name)
    #     if not letter:
    #         frappe.throw(_('cannot find letter: {0}'.format(name)))

    #     customers = shipping.get_matching_customers()
    #     frappe.publish_realtime(_(f'Creating {len(customers)} letters'))
    #     shipping.ship_letter(letter)
    #     for name in names:

    #         if letter:

    # except Exception as e:
    #     frappe.throw(str(e))


def background_create_letters(letter_name):
    try:
        letter = frappe.get_doc("Member Letter", letter_name)
        if not letter:
            frappe.throw(_("cannot find letter: {0}").format(letter_name))

        shipping = LetterShipping()
        customers = shipping.get_matching_customers(letter)

        frappe.publish_realtime(
            "background_create_letters_start",
            {"background_create_letters": len(customers)},
        )

        shipping.create_letters(letter, customers)

        frappe.publish_realtime(
            "background_create_letters_start", {"Done": len(customers)}
        )
    except Exception as error:
        frappe.log_error(error)


@frappe.whitelist()
def execute_create_letters(names, status):
    try:
        names = json.loads(names)
        shipping = LetterShipping()

        if len(names) > 1:
            frappe.throw(_("you can only select one letter at the moment."))

        name = names[0]
        letter = frappe.get_doc("Member Letter", name)
        if not letter:
            frappe.throw(_("cannot find letter: {0}").format(name))

        customers = shipping.get_matching_customers(letter)
        if len(customers) == 1:
            shipping.create_letters(letter, customers)
        else:
            frappe.enqueue(
                background_create_letters,
                letter_name=name,
                queue="long",
                job_name=f"create_letters_for_{name}",
            )

    except Exception as e:
        frappe.throw(str(e))


def get_customers(customer_names):
    result = []
    for customer in customer_names:
        result.append(frappe.get_doc("Customer", customer))
    return result


@frappe.whitelist()
def sent_customer_letter(names, letter, tags=None):
    try:
        names = json.loads(names)
        shipping = LetterShipping(throw_on_error=True)

        letter = frappe.get_doc("Member Letter", letter)
        if not letter:
            frappe.throw(_("cannot find letter: {0}").format(letter))

        customers = get_customers(names)
        if len(customers) == 1:
            shipping.create_letters(letter, customers, tags)
        else:
            frappe.enqueue(
                background_create_letters,
                letter_name=letter,
                queue="long",
                job_name=f"create_letters_for_{letter}",
            )

    except Exception as e:
        frappe.throw(str(e))


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


@frappe.whitelist(allow_guest=True)
def get_public_events():
    try:
        club_settings = frappe.get_last_doc("Club Settings")

        all_events = []

        if club_settings.public_date_tags:
            next_events = frappe.get_all(
                "Event",
                filters={
                    "event_type": "Public",
                    "status": "Open",
                    "_user_tags": ["like", f"%{club_settings.public_date_tags}%"],
                },
                order_by="starts_on asc",
                fields="*",
            )
            all_events = all_events + next_events

        if club_settings.stripped_date_tags:
            next_events = frappe.get_all(
                "Event",
                filters={
                    "event_type": "Public",
                    "status": "Open",
                    "_user_tags": ["like", f"%{club_settings.stripped_date_tags}%"],
                },
                order_by="starts_on asc",
                fields="*",
            )

            for evt in next_events:
                evt.subject = club_settings.stripped_date_tags
                evt.details = ""

            all_events = all_events + next_events

        return map(
            lambda x: {"subject": x.subject, "starts_on": x.starts_on}, all_events
        )
    except Exception as e:
        frappe.log_error(e)
        return []


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
def get_dashboard_navigation():
    user = frappe.session.user
    if not user or user == "Guest":
        frappe.throw(_("Not permitted"), frappe.PermissionError)

    roles = frappe.get_roles(user)

    if not "MemberDashboard" in roles:
        frappe.throw(_("Not permitted"), frappe.PermissionError)

    try:
        basic_navigation = [
            {
                "displayTitle": _("Dashboard"),
                "href": "/",
                "icon": "fa-home",
                "mode": "NavigationMode.Router",
            },
            {
                "displayTitle": _("My Club"),
                "href": "/myclub",
                "icon": "fa-home",
                "mode": "NavigationMode.Router",
            },
            {
                "displayTitle": _("Zur Homepage"),
                "href": "/",
                "icon": "fa-globe",
                "mode": "NavigationMode.External",
            },
        ]

        if not "Vorstand" in roles:
            return basic_navigation

        basic_navigation.append(
            {
                "displayTitle": _("Meeting Minutes"),
                "href": "/meetingminutes",
                "icon": "fa-desktop",
                "mode": "NavigationMode.Router",
            }
        )

        basic_navigation.append(
            {
                "displayTitle": _("Zum Desk"),
                "href": "/app/",
                "icon": "fa-desktop",
                "mode": "NavigationMode.External",
            }
        )

        basic_navigation.append(
            {
                "displayTitle": _("Pächter"),
                "href": "/paechter/",
                "icon": "fa-list",
                "mode": "NavigationMode.Router",
            }
        )

        basic_navigation.append(
            {
                "displayTitle": _("Kalender"),
                "href": "/calendar/",
                "icon": "fa-list",
                "mode": "NavigationMode.Router",
            }
        )

        basic_navigation.append(
            {
                "displayTitle": _("Drive"),
                "href": "/drive/",
                "icon": "fa-list",
                "mode": "NavigationMode.External",
            }
        )

        basic_navigation.append(
            {
                "displayTitle": _("Logout"),
                "href": "/logout/",
                "icon": "fa-sign",
                "mode": "NavigationMode.External",
            }
        )
        return basic_navigation
    except Exception as e:
        frappe.log_error(e)
        return []


@frappe.whitelist(allow_guest=False)
def get_unread_document_count():
    user = frappe.session.user
    if not user or user == "Guest":
        frappe.throw(_("Not permitted"), frappe.PermissionError)

    roles = frappe.get_roles(user)

    try:
        values = {
            "user": user,
            "roles": ",".join(roles), # ToDo this does not build the correct query
        }
        data = frappe.db.sql(
            """
        SELECT DISTINCT(mapping.document_type), COUNT(mapping.document_type) FROM `tabRead Marker Mapping` mapping
            JOIN `tabRead Marker` marker
            ON marker.document_type = mapping.document_type
            LEFT JOIN `tabRead Marker Entry`  entry
            ON entry.user_link = %(user)s
            WHERE  entry.user_link IS NULL AND mapping.role_link IN (roles)
            GROUP BY mapping.document_type
        """,
            values=values,
            as_dict=0,
        )
        return data
    except Exception as e:
        frappe.log_error(e)
        return []


@frappe.whitelist(allow_guest=False)
def get_user_info():
    user = frappe.session.user
    if not user or user == "Guest":
        frappe.throw(_("Not permitted"), frappe.PermissionError)

    roles = frappe.get_roles(user)
    if not "MemberDashboard" in roles:
        frappe.throw(_("Not permitted"), frappe.PermissionError)

    try:
        user = frappe.get_doc("User", frappe.session.user)
        print(user)

        return {
            "user": frappe.session.user,
            "email": user.email
        }
    except Exception as e:
        frappe.log_error(e)
