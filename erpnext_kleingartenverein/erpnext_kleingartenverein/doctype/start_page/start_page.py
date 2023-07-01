# Copyright (c) 2023, Kleingartenverein and contributors
# For license information, please see license.txt

import datetime
import frappe
from frappe.website.website_generator import WebsiteGenerator
from erpnext_kleingartenverein.www.utils import DefaultContextData, ensure_login


class StartPage(WebsiteGenerator, DefaultContextData):
    
    def get_context(self, context):
        ensure_login()
        super().get_context(context)
        context.bulletins = frappe.get_list(
            "Bulletin", fields="*", order_by="date desc", page_length=2
        )
        context.last_blog_entries = frappe.get_list(
            "Blog Page", fields="*", 
            order_by="published_at desc", 
            page_length=1
        )

        now = datetime.datetime.now()

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
        context.next_events = next_events

        context.next_teamwork_dates = []
        next_teamwork_dates = frappe.get_list(
            "Teamwork Date",
            filters={
                "date": [">=", now],
                "is_published": 1
            },
            order_by="date asc",
            fields="*",
            page_length=1,
        )
        for date in next_teamwork_dates:
            context.next_teamwork_dates.append(frappe.get_doc('Teamwork Date', date.name))
