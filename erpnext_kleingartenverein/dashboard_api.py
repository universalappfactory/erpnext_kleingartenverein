import frappe

@frappe.whitelist(allow_guest=False)
def upload_counter_value(*args, **kwargs):
    try:
        print(args)
        print(kwargs)
    except Exception as e:
        print(e)
        frappe.log_error(e)
        return []