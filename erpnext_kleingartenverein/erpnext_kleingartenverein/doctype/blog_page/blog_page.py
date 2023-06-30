# Copyright (c) 2023, Kleingartenverein and contributors
# For license information, please see license.txt

# import frappe
from datetime import datetime

import frappe
from frappe.exceptions import DoesNotExistError
from frappe.website.website_generator import WebsiteGenerator
from erpnext_kleingartenverein.api import get_breadcrumbs
from erpnext_kleingartenverein.www.utils import (
    DefaultContextData,
    add_default_context_data,
    ensure_login,
    invalidate_caches
)


class BlogPage(WebsiteGenerator, DefaultContextData):
    def validate(self):
        self.set_route()
        invalidate_caches()

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
        if not self.is_published or self.published_at > datetime.now():
            raise DoesNotExistError()

        ensure_login()
        super().get_context(context)
        route = "/".join(self.route.split("/")[:-1])
        context.breadcrumbs = get_breadcrumbs(context, route)


def get_list(doctype, txt, filters, limit_start, limit_page_length=20, order_by="modified"):
    items = frappe.get_list(
        doctype, filters={"is_published": 1, "published_at": ["<", datetime.now()]},
                             order_by="published_at desc",fields="*")
    result = []
    # for itm in items:
    #     result.append(frappe.get_doc('Blog Page', itm.name))

    return items


def get_list_context(context=None):
    ensure_login()
    add_default_context_data(context)

# 
    context.update(
        {
            "order_by": "published_at desc",
            "filters": {"is_published": 1, "published_at": ["<=", datetime.now()]},
            "breadcrumbs": get_breadcrumbs(context),
        }
    )
