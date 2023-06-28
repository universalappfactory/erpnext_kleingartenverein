# Copyright (c) 2023, Kleingartenverein and contributors
# For license information, please see license.txt

import frappe
from frappe.website.website_generator import WebsiteGenerator
from frappe import _
from erpnext_kleingartenverein.api import get_breadcrumbs
from erpnext_kleingartenverein.www.utils import (
    DefaultContextData,
    ensure_login
)


class MemberDashboard(WebsiteGenerator, DefaultContextData):
    def get_context(self, context):
        ensure_login()
        super().get_context(context)
        context.breadcrumbs = get_breadcrumbs(context, self.route)
