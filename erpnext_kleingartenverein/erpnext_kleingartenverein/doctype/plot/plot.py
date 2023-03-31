# Copyright (c) 2023, Kleingartenverein and contributors
# For license information, please see license.txt

import frappe
from datetime import datetime, date
from frappe import _
from itertools import groupby
from frappe.model.document import Document
from frappe.utils.data import getdate


def get_date_grouping(counter_item) -> str:
    return f"{getdate(counter_item.date).year}_{counter_item.counter_number.lower()}"


def get_mounting_date_grouping(counter_item) -> str:
    return f'{getdate(counter_item.mounting_date).strftime("%Y-%m-%d")}'


class Plot(Document):
    def after_insert(self):
        self.update_customer_backlink()

    def on_update(self):
        self.update_customer_backlink()
        self.add_has_seal_label()
        self.store_tags()

    def store_tags(self):
        if not hasattr(self, "user_tags") or not self.user_tags:
            return

        existing_tags = self.get_tags()
        for tag in self.user_tags.split(","):
            if tag != "" and not any(t == tag for t in existing_tags):
                self.add_tag(tag)

    def isEmptyValue(self, str=None):
        if isinstance(str, datetime) or isinstance(str, date):
            return False
        return not str or str.isspace()

    def add_has_seal_label(self):
        if self.water_meter_table and len(self.water_meter_table) > 0:
            if not any(
                not self.isEmptyValue(row.seal_number)
                for row in self.water_meter_table
            ):
                return

        existing_tags = self.get_tags()
        tag = _("Has Seal")
        if not any(t == tag for t in existing_tags):
            self.add_tag(tag)

    def clear_customer_backlink(self, customer_name):
        customer = frappe.get_doc("Customer", customer_name)
        if customer and customer.plot_link is not None:
            customer.plot_link = None
            customer.save()

    def update_customer_backlink(self):
        linked_customer = self.get_value("customer")
        if linked_customer:
            customer = frappe.get_doc("Customer", linked_customer)
            if customer.plot_link != self.name:
                customer.plot_link = self.name
                customer.save()
        else:
            linked_customers = frappe.get_list(
                "Customer", filters={"plot_link": self.name}
            )
            for customer in linked_customers:
                self.clear_customer_backlink(customer.name)

    def validate(self):
        self.validate_counters()
        self.validate_mounting_dates()

    def validate_decreasing_counter_values(self, grouped_by_counter):
        sorted_list = sorted(grouped_by_counter, key=lambda x: x.date)
        last = 0
        for x in sorted_list:
            if last > x.counter_value:
                frappe.throw(
                    _("Counter '{0}' has decresing values").format(x.counter_number)
                )
            last = x.counter_value

    def add_missing_water_meter_values(self, row):
        matching = next(
            filter(
                lambda x: not x.is_new() and x.counter_number == row.counter_number,
                self.water_meter_table,
            ),
            None,
        )

        if not matching:
            return

        if self.isEmptyValue(row.mounting_date):
            row.mounting_date = matching.mounting_date

        if self.isEmptyValue(row.seal_number):
            row.seal_number = matching.seal_number

    def validate_counters(self):
        for row in self.water_meter_table:
            if row.is_new():
                self.add_missing_water_meter_values(row)

        if len(self.water_meter_table) > 0:
            for key, group in groupby(
                self.water_meter_table, lambda x: x.counter_number
            ):
                self.validate_decreasing_counter_values(list(group))

    def validate_mounting_dates(self):
        if len(self.water_meter_table) > 0:
            for key, group in groupby(
                self.water_meter_table, lambda x: x.counter_number
            ):
                grouped = list(group)
                first_date = grouped[0].mounting_date
                if not all(itm.mounting_date == first_date for itm in grouped):
                    frappe.throw(
                        _("Counter Number '{0}' has multiple mounting dates.").format(
                            key
                        )
                    )
