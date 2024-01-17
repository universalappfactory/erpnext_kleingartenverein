# Copyright (c) 2023, Kleingartenverein and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class InvoiceCalculationItem(Document):
    def product_must_be_set(self):
        if self.product is None:
            frappe.throw(f"Product must be set")

    def water_consumption_year_must_be_set(self):
        if not self.water_consumption_year or self.water_consumption_year <= 0:
            frappe.throw("you must set water_consumption_year")

    def validate_actions(self):
        if self.action in [
            "AddFixedProduct",
            "AddProductByFields",
            "AddProductByTemplate",
            "CalculateByServerScript",
            "CalculateWaterConsumption",
        ]:
            self.product_must_be_set()

        if self.action == "CalculateWaterConsumption":
            self.water_consumption_year_must_be_set()

    def validate(self):
        self.validate_actions()
