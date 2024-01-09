import frappe


def create_folder(folder_name, insert=True):
    result = frappe.get_doc(
        {
            "doctype": "File",
            "file_name": folder_name,
            "is_folder": 1,
        }
    )
    if insert:
        result.insert()

    return result


def get_or_create_folder(folder_name):
    try:
        return frappe.get_last_doc(
            "File", filters={"file_name": folder_name, "is_folder": 1}
        )
    except frappe.DoesNotExistError:
        return create_folder(folder_name)
