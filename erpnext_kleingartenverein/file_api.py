import frappe
from drive.api.files import create_folder, does_entity_exist


def root_folder_exists(folder_name):
    return does_entity_exist(folder_name)


def ensure_root_folder_exists(folder_name):
    try:
        if root_folder_exists(folder_name):
            return

        folder = create_folder(folder_name)
        return folder.name
    except Exception as error:
        frappe.log_error(error)


def create_folder(folder_name):
    folder = frappe.get_doc(
                {
                    "doctype": "File",
                    "file_name": folder_name,
                    "is_folder": 1,
                }
            )
    folder.insert()
    return folder

def ensure_folder_exists(folder_name):
    try:
        folders = frappe.get_all(
            "File",
            filters={
                "file_name": folder_name,
                "is_folder": 1
            }
        )

        if len(folders) > 1:
            frappe.throw(f"expect to have one folder named '{folder_name}'")

        if len(folders) == 0:
            folder = create_folder(folder_name)
            return folder.name
        
        return folders[0].name
    except Exception as error:
        frappe.log_error(error)
        pass
