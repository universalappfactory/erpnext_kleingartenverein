import frappe
from frappe.exceptions import DoesNotExistError
from frappe.website.utils import clear_website_cache


def ensure_login():
    if frappe.session.user == "Guest":
        frappe.local.flags.redirect_location = "/login"
        raise frappe.Redirect

def is_guest():
    return frappe.session.user == "Guest"

def add_default_context_data(context):
    csrf_token = frappe.sessions.get_csrf_token()
    frappe.db.commit()
    context.user = frappe.session.user
    context.csrf_token = csrf_token

    try:
        club_settings = frappe.get_last_doc("Club Settings")
        context.club_name = club_settings.club_name
        context.club_city = club_settings.club_city
        context.default_header_image = club_settings.default_header_image
        context.club_mail_contact = club_settings.club_mail_contact
        context.club_phone_contact = club_settings.club_phone_contact
        context.club_contact_message = club_settings.club_contact_message
        context.club_phone_message = club_settings.club_phone_message
        context.club_mail_message = club_settings.club_mail_message
        context.service_section_background = club_settings.service_section_background

    except DoesNotExistError:
        pass


def invalidate_caches():
    try:
        start_pages = frappe.get_list("Start Page", pluck="name")
        for p in start_pages:
            frappe.cache().delete_value(p)

        clear_website_cache()
    except Exception as e:
        frappe.log_error(e)


class DefaultContextData:
    def get_context(self, context):
        add_default_context_data(context)
