# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# License: MIT. See LICENSE
from frappe import _
from erpnext_kleingartenverein.www.utils import add_default_context_data

no_cache = 1


def get_context(context):
	add_default_context_data(context)
	context.no_breadcrumbs = True
	context.parents = [{"name": "me", "title": _("My Account")}]