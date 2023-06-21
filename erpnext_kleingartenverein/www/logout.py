# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# License: MIT. See LICENSE

import frappe
import frappe.utils
from frappe import _
from frappe.auth import LoginManager
from frappe.integrations.doctype.ldap_settings.ldap_settings import LDAPSettings
from frappe.integrations.oauth2_logins import decoder_compat
from frappe.utils import cint
from frappe.utils.data import escape_html
from frappe.utils.html_utils import get_icon_html
from frappe.utils.jinja import guess_is_path
from frappe.utils.oauth import (
    get_oauth2_authorize_url,
    get_oauth_keys,
    redirect_post_login,
)
from frappe.utils.password import get_decrypted_password
from frappe.website.utils import get_home_page
from frappe.handler import logout
from erpnext_kleingartenverein.www.utils import add_default_context_data

no_cache = True


def get_context(context):
    logout()
    context.user = None
