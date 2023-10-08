import frappe
from erpnext_kleingartenverein.utils.decorators import check_permission

@frappe.whitelist(allow_guest=True)
@check_permission
def upload_counter_value(*args, **kwargs):
    try:
        for x in frappe.request.files:
            print(x)

        file = frappe.request.files["file"]
        print(args)
        print(kwargs)
    except Exception as e:
        print(e)
        frappe.log_error(e)
        return []
    
@frappe.whitelist(allow_guest=True)
@check_permission
def get_plot_list(*args, **kwargs):
    try:
        result = frappe.get_all("Plot", fields=["plot_number"])
        return sorted(filter(lambda x: x.plot_number != "999", result), key=lambda x: x.plot_number)
    except Exception as e:
        print(e)
        frappe.log_error(e)
        return []