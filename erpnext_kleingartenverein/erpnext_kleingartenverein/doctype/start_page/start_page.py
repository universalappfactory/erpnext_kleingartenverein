# Copyright (c) 2023, Kleingartenverein and contributors
# For license information, please see license.txt

import datetime
import frappe
from frappe.website.website_generator import WebsiteGenerator
from erpnext_kleingartenverein.www.utils import DefaultContextData


class StartPage(WebsiteGenerator, DefaultContextData):
    def get_context(self, context):
        super().get_context(context)
        context.bulletins = frappe.get_list(
            "Bulletin", fields="*", order_by="date desc", page_length=2
        )
        context.last_blog_entries = frappe.get_list(
            "Blog Page", fields="*", order_by="published_at desc", page_length=1
        )

        now = datetime.datetime.now()

        # "order_by": "published_at desc",
        #             "filters": {"is_published": 1, "published_at": ["<", datetime.now()]},

        next_events = frappe.get_list(
            "Event",
            filters={
                "starts_on": [">=", now],
                "event_type": "Public",
                "status": "Open",
                "_user_tags": ["like", "%homepage%"],
            },
            order_by="starts_on asc",
            fields="*",
            page_length=2,
        )
        print(next_events)
        context.next_events = next_events
