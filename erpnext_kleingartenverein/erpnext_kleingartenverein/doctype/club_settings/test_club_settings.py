# Copyright (c) 2023, Kleingartenverein and Contributors
# See license.txt

import frappe
from frappe.tests.utils import FrappeTestCase

# frappe.local.flags.ignore_chart_of_accounts = True
test_records = frappe.get_test_records("Club Settings")
test_dependencies = []
test_ignore = ["Customer"]

class TestClubSettings(FrappeTestCase):
	pass
