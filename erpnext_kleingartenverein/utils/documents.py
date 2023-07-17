import frappe

def try_delete(document_type, name):
    try:
        frappe.delete_doc(document_type, name)
    except frappe.DoesNotExist:
        pass