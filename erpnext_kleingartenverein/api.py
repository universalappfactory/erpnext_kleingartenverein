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
    if user == "Guest":
        return "login"
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
    next_events = frappe.get_list(
            "Event",
            filters={
                "event_type": "Public",
                "status": "Open",
                 "_user_tags": ["like", "%omepage%"],
            },
            order_by="starts_on asc",
            fields="*",
        )
    return next_events


