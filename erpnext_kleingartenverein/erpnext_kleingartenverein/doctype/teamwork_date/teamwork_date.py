# Copyright (c) 2023, Kleingartenverein and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.website.website_generator import WebsiteGenerator
from itertools import groupby


class TeamworkDate(WebsiteGenerator):
    def after_insert(self):
        self.make_validations()

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

    def validate(self):
        self.make_validations()

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
