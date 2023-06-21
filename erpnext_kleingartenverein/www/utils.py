import frappe
from frappe.website.utils import get_home_page


def ensure_login():
    if frappe.session.user == "Guest":
        frappe.local.flags.redirect_location = "login"
        raise frappe.Redirect

    # if frappe.session.user != "Guest":
    # 	if not redirect_to:
    # 		if frappe.session.data.user_type == "Website User":
    # 			redirect_to = get_home_page()
    # 		else:
    # 			redirect_to = "/dashboard"

    # 	if redirect_to != "login":
    # 		frappe.local.flags.redirect_location = redirect_to
    # 		raise frappe.Redirect


def add_default_context_data(context):
    csrf_token = frappe.sessions.get_csrf_token()
    frappe.db.commit()
    context.user = frappe.session.user
    context.csrf_token = csrf_token

    club_settings = frappe.get_last_doc("Club Settings")
    context.club_name = club_settings.club_name
    context.club_city = club_settings.club_city
    context.default_header_image = club_settings.default_header_image



class DefaultContextData:
    def get_context(self, context):
        add_default_context_data(context)
