# Copyright (c) 2023, Kleingartenverein and Contributors
# See license.txt

import frappe
from frappe.tests.utils import FrappeTestCase

test_records = frappe.get_test_records("Member Letter")
test_dependencies = []
test_ignore = ['Customer', 'Item', 'Opportunity']

class TestMemberLetter(FrappeTestCase):
	pass
