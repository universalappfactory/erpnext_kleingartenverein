# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# License: MIT. See LICENSE

from erpnext_kleingartenverein.www.utils import add_default_context_data

def get_context(context):
	add_default_context_data(context)
	context.http_status_code = 404
