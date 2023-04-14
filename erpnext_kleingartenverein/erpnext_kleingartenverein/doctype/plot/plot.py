# Copyright (c) 2023, Kleingartenverein and contributors
# For license information, please see license.txt

import frappe
from datetime import datetime, date, timedelta
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
                not self.isEmptyValue(row.seal_number) for row in self.water_meter_table
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

    def clear_obsolete_customer_backlinks(self):
        linked_customers = frappe.get_list("Customer", filters={"plot_link": self.name})
        for customer in filter(
            lambda x: x.name != self.get_value("customer"), linked_customers
        ):
            self.clear_customer_backlink(customer.name)

    def update_customer_backlink(self):
        linked_customer = self.get_value("customer")
        if linked_customer:
            customer = frappe.get_doc("Customer", linked_customer)
            if customer.plot_link != self.name:
                customer.plot_link = self.name
                customer.save()

        self.clear_obsolete_customer_backlinks()

    def validate(self):
        self.validate_counters()
        self.validate_mounting_dates()
        self.apply_new_tenant_assignment()
        self.validate_former_tenant_table()

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

    def apply_new_tenant_assignment(self):
        prev_version = self.get_doc_before_save()
        if (
            prev_version
            and prev_version.customer
            and prev_version.customer != self.customer
        ):
            former_tenant = frappe.get_doc("Customer", prev_version.customer)
            former_tenant.customer_group = "Former Tenant"
            former_tenant.save()
            self.finish_history_for(prev_version.customer)

            if self.customer:
                actual_tenant = frappe.get_doc("Customer", self.customer)
                if actual_tenant.customer_group != "Tenant":
                    actual_tenant.customer_group = "Tenant"
                    actual_tenant.save()

        self.add_new_history_entry()

        if self.customer and self.plot_status == "Not under lease":
            self.plot_status = "Under Lease"

        if not self.customer and self.plot_status == "Under Lease":
            self.plot_status = "Not under lease"

    def finish_history_for(self, customer_name):
        if not customer_name:
            return

        matching = next(
            filter(
                lambda x: x.customer_link == customer_name, self.former_tenants_table
            ),
            None,
        )
        if matching and matching.to_date is None:
            matching.to_date = date.today()

    def add_new_history_entry(self):
        if self.customer:
            matching = next(
                filter(
                    lambda x: x.customer_link == self.customer,
                    self.former_tenants_table,
                ),
                None,
            )
            if not matching:
                new_entry = frappe.new_doc("Former Tenant Table")
                new_entry.from_date = date.today()
                new_entry.customer_link = self.customer
                self.append("former_tenants_table", new_entry)

    def validate_former_tenant_table(self):
        if self.former_tenants_table:
            grouped = groupby(
                sorted(self.former_tenants_table, key=lambda x: x.customer_link),
                lambda x: x.customer_link,
            )

            if any(len(list(grp)) > 1 for key, grp in grouped):
                frappe.throw(
                    _(
                        "Plot '{0}' has multiple entries for one customer in the tenant history"
                    ).format(self.plot_number)
                )
