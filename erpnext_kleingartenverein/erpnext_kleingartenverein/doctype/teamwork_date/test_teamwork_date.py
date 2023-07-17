# Copyright (c) 2023, Kleingartenverein and Contributors
# See license.txt

import frappe
from datetime import datetime, date
from frappe.tests.utils import FrappeTestCase
from erpnext_kleingartenverein.utils.documents import try_delete

test_dependencies = []
test_ignore = ["Customer", "Warehouse"]


class TestTeamworkDate(FrappeTestCase):
    def setup(self):
        try_delete("Teamwork Date", "My Date")

    def tearDown(self):
        try_delete("Teamwork Date", "My Date")

    def test_that_event_is_created(self):
        doc = frappe.get_doc(
            {
                "doctype": "Teamwork Date",
                "teamwork_date_name": "My Date",
                "is_published": 1,
                "headline": "My Headline",
                "date": date(2023, 10, 1),
            }
        )
        doc.save()

        loaded = frappe.get_doc("Teamwork Date", doc.name)
        self.assertIsNotNone(loaded.event_link)

        event = frappe.get_doc("Event", loaded.event_link)
        self.assertIsNotNone(event)
        self.assertEqual(event.starts_on, datetime(2023, 10, 1, 0, 0, 0))

    def test_that_event_is_not_created_twice_when_document_is_modified(self):
        doc = frappe.get_doc(
            {
                "doctype": "Teamwork Date",
                "teamwork_date_name": "My Date",
                "is_published": 1,
                "headline": "My Headline",
                "date": date(2023, 10, 1),
            }
        )
        doc.save()

        modifed = frappe.get_doc("Teamwork Date", doc.name)
        modifed.headline = "Modified Headline"
        modifed.save()

        self.assertEqual(modifed.event_link, doc.event_link)

    def test_that_event_date_is_updated_after_modification(self):
        doc = frappe.get_doc(
            {
                "doctype": "Teamwork Date",
                "teamwork_date_name": "My Date",
                "is_published": 1,
                "headline": "My Headline",
                "date": date(2023, 10, 1),
            }
        )
        doc.save()

        modifed = frappe.get_doc("Teamwork Date", doc.name)
        modifed.date = date(2022, 3, 14)
        modifed.save()

        event = frappe.get_doc("Event", doc.event_link)
        self.assertEqual(event.starts_on, datetime(2022, 3, 14, 0, 0, 0))

    def test_that_time_for_applications_is_set_one_week_back_when_not_set(self):
        doc = frappe.get_doc(
            {
                "doctype": "Teamwork Date",
                "teamwork_date_name": "My Date",
                "is_published": 1,
                "headline": "My Headline",
                "date": date(2023, 7, 23),
            }
        )
        doc.save()

        self.assertEqual(doc.time_for_applications, date(2023, 7, 16))
