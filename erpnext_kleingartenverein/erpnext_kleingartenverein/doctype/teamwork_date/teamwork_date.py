# Copyright (c) 2023, Kleingartenverein and contributors
# For license information, please see license.txt

from frappe.desk.doctype.tag.tag import DocTags
import frappe
from frappe import _
from frappe.utils import getdate
from frappe.website.website_generator import WebsiteGenerator
from itertools import groupby
from erpnext_kleingartenverein.www.utils import ensure_login, invalidate_caches

class TeamworkDate(WebsiteGenerator):
    def get_context(self, context):
        if self.login_required:
            ensure_login()
            
        super().get_context(context)

    def after_insert(self):
        self.make_validations()
        self.sync_event()

    def make_validations(self):
        self.validate_participant_count()
        self.validate_unique_customers()
        if len(self.participants) == self.maximum_participants:
            self.is_complete = True
        elif len(self.participants) < self.maximum_participants:
            self.is_complete = False

        if len(self.participants) >= self.minimum_participants:
            self.minimum_reached = True
        else:
            self.minimum_reached = False

    def on_update(self):
        self.make_validations()
        self.sync_event()

    def validate(self):
        self.make_validations()
        self.set_route()

    def validate_unique_customers(self):
        grouped = groupby(
            sorted(self.participants, key=lambda x: x.participant),
            lambda x: x.participant,
        )

        for key, group in grouped:
            if len(list(group)) > 1:
                frappe.throw(_("Customer {0} is assigned multiple times").format(key))

    def validate_participant_count(self):
        participant_count = len(self.participants)

        if participant_count > self.maximum_participants:
            frappe.throw(
                _(
                    "Maximum number of participants has been reached (maximum is {0})"
                ).format(self.maximum_participants)
            )

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

    def create_event(self):
        event = frappe.new_doc('Event')
        event.subject = self.headline
        event.event_type = "Public"
        event.description = self.description
        event.starts_on = self.date
        event.save()
        
        if self.is_published:
            event.add_tag('Homepage')
        return event.name

    def event_exists(self):
        try:
            frappe.get_doc('Event', self.event_link)
            return True
        except frappe.DoesNotExist:
            return False

    def sync_event(self):
        if self.event_link and self.event_exists():
            event = frappe.get_doc('Event', self.event_link)
            save_event = False
            event_date = getdate(self.date)
            if event_date != event.starts_on:
                event.starts_on = event_date
                save_event = True
            
            if self.description != event.description:
                event.description = self.description
                save_event = True

            if self.headline != event.subject:
                event.subject = self.headline
                save_event = True

            tags = event.get_tags()
            # homepage_tag = 
            if self.is_published and not 'Homepage' in (t for t in tags):
                event.add_tag('Homepage')
                save_event = True
            
            if not self.is_published:
                DocTags(event.doctype).remove(event.name, 'Homepage')
                save_event = True

            if save_event:
                event.save()
                invalidate_caches()

        else:
            self.event_link = self.create_event()
            invalidate_caches()
