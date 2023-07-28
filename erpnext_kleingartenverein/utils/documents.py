import frappe

def try_delete(document_type, name):
    try:
        frappe.delete_doc(document_type, name)
    except frappe.DoesNotExistError:
        pass

def get_attachments(dt, dn):
	return frappe.get_all(
		"File",
		fields=["name", "file_name", "file_url", "is_private"],
		filters={"attached_to_name": dn, "attached_to_doctype": dt},
	)
