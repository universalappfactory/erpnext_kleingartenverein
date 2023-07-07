# Copyright (c) 2023, Kleingartenverein and contributors
# For license information, please see license.txt

from datetime import datetime
from frappe.website.website_generator import WebsiteGenerator
from frappe import _
from erpnext_kleingartenverein.api import get_breadcrumbs
from erpnext_kleingartenverein.www.utils import (
    DefaultContextData,
    add_default_context_data,
    ensure_login,
    is_guest
)


def get_list(
    doctype,
    txt,
    filters,
    limit_start,
    limit_page_length=20,
    ignore_permissions=False,
    fields=None,
    order_by=None,
):
    return []


class Bulletin(WebsiteGenerator, DefaultContextData):
    def validate(self):
        self.set_route()

    def set_route(self):
        if self.is_website_published() and not self.route:
            self.route = self.make_route()

        if self.route:
            self.route = self.route.strip("/.")[:139]

    def make_route(self):
        from_headline = self.scrubbed_headline()
        if self.meta.route:
            return self.meta.route + "/" + from_headline
        else:
            return from_headline

    def scrubbed_headline(self):
        return self.scrub(self.headline)

    def get_context(self, context):
        if self.login_required:
            ensure_login()

        super().get_context(context)
        context.breadcrumbs = get_breadcrumbs(context, self.route)


def get_list_context(context=None):
    add_default_context_data(context)

    filters = {"is_published": 1, "published_at": ["<=", datetime.now()]}

    if is_guest():
        filters['login_required'] = 0

    context.update(
        {
            "order_by": "date desc",
            "filters": filters,
            "breadcrumbs": get_breadcrumbs(context),
        }
    )
