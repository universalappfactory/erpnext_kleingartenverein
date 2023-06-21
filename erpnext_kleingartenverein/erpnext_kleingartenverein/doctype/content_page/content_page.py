# Copyright (c) 2023, Kleingartenverein and contributors
# For license information, please see license.txt

# import frappe
from frappe.website.website_generator import WebsiteGenerator
from erpnext_kleingartenverein.api import get_breadcrumbs
from erpnext_kleingartenverein.www.utils import (
    DefaultContextData,
    add_default_context_data,
)


class ContentPage(WebsiteGenerator, DefaultContextData):
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
        super().get_context(context)
        context.breadcrumbs = get_breadcrumbs(context, self.route)


def get_list_context(context=None):
    add_default_context_data(context)
    context.order_by = "date published_at"
    context.breadcrumbs = get_breadcrumbs(context)
