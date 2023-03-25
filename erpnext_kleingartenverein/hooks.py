from . import __version__ as app_version

app_name = "erpnext_kleingartenverein"
app_title = "Erpnext Kleingartenverein"
app_publisher = "Kleingartenverein"
app_description = "Club management for a german \'Kleingartenverein\'"
app_email = "info@universalappfactory.de"
app_license = "AGPLv3"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/erpnext_kleingartenverein/css/erpnext_kleingartenverein.css"
# app_include_js = "/assets/erpnext_kleingartenverein/js/erpnext_kleingartenverein.js"

# include js, css files in header of web template
# web_include_css = "/assets/erpnext_kleingartenverein/css/erpnext_kleingartenverein.css"
# web_include_js = "/assets/erpnext_kleingartenverein/js/erpnext_kleingartenverein.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "erpnext_kleingartenverein/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
#	"methods": "erpnext_kleingartenverein.utils.jinja_methods",
#	"filters": "erpnext_kleingartenverein.utils.jinja_filters"
# }

# Installation
# ------------

before_install = "erpnext_kleingartenverein.setup.install.before_install"
after_install = "erpnext_kleingartenverein.setup.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "erpnext_kleingartenverein.uninstall.before_uninstall"
# after_uninstall = "erpnext_kleingartenverein.uninstall.after_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "erpnext_kleingartenverein.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
#	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
#	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

override_doctype_class = {
	# "Customer": "erpnext_kleingartenverein.overrides.customerform.CustomerForm"
}

# Document Events
# ---------------
# Hook on document methods and events

doc_events = {
	"Customer": {
		"before_insert": "erpnext_kleingartenverein.api.customer_before_insert",
	}
}

# Scheduled Tasks
# ---------------

# scheduler_events = {
#	"all": [
#		"erpnext_kleingartenverein.tasks.all"
#	],
#	"daily": [
#		"erpnext_kleingartenverein.tasks.daily"
#	],
#	"hourly": [
#		"erpnext_kleingartenverein.tasks.hourly"
#	],
#	"weekly": [
#		"erpnext_kleingartenverein.tasks.weekly"
#	],
#	"monthly": [
#		"erpnext_kleingartenverein.tasks.monthly"
#	],
# }

# Testing
# -------

before_tests = "erpnext_kleingartenverein.setup.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
#	"frappe.desk.doctype.event.event.get_events": "erpnext_kleingartenverein.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
#	"Task": "erpnext_kleingartenverein.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["erpnext_kleingartenverein.utils.before_request"]
# after_request = ["erpnext_kleingartenverein.utils.after_request"]

# Job Events
# ----------
# before_job = ["erpnext_kleingartenverein.utils.before_job"]
# after_job = ["erpnext_kleingartenverein.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
#	{
#		"doctype": "{doctype_1}",
#		"filter_by": "{filter_by}",
#		"redact_fields": ["{field_1}", "{field_2}"],
#		"partial": 1,
#	},
#	{
#		"doctype": "{doctype_2}",
#		"filter_by": "{filter_by}",
#		"partial": 1,
#	},
#	{
#		"doctype": "{doctype_3}",
#		"strict": False,
#	},
#	{
#		"doctype": "{doctype_4}"
#	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
#	"erpnext_kleingartenverein.auth.validate"
# ]
