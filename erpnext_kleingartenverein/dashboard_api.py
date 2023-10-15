import frappe
from frappe import _
from erpnext_kleingartenverein.utils.decorators import check_permission

@frappe.whitelist(allow_guest=False)
@check_permission
def get_dashboard_navigation():
    user = frappe.session.user
    if not user or user == "Guest":
        frappe.throw(_("Not permitted"), frappe.PermissionError)

    roles = frappe.get_roles(user)

    if not "MemberDashboard" in roles:
        frappe.throw(_("Not permitted"), frappe.PermissionError)

    
    try:
       club_settings = frappe.get_last_doc("Club Settings")
    

       basic_navigation = [
            {
                "displayTitle": _("My Club"),
                "href": "/",
                "icon": "fa-home",
                "mode": "NavigationMode.Router",
            },
            {
                "displayTitle": _("Zur Homepage"),
                "href": "/",
                "icon": "fa-globe",
                "mode": "NavigationMode.External",
            },
        ]
       
        
    except Exception as e:
        frappe.log_error(e)
        return []
