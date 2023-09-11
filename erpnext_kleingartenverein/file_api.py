from datetime import datetime
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


def create_folder(folder_name, parent_folder=None):
    data = {
        "doctype": "File",
        "file_name": folder_name,
        "is_folder": 1,
    }

    if parent_folder:
        parent = ensure_folder_exists(parent_folder)
        data["folder"] = parent

    folder = frappe.get_doc(data)
    folder.insert()
    return folder


def ensure_folder_exists(folder_name, parent_folder=None):
    try:
        filters = {"file_name": folder_name, "is_folder": 1}

        if parent_folder:
            filters["folder"] = parent_folder

        folders = frappe.get_all("File", filters=filters)

        if len(folders) > 1:
            frappe.throw(f"expect to have one folder named '{folder_name}'")

        if len(folders) == 0:
            folder = create_folder(folder_name, parent_folder)
            return folder.name

        return folders[0].name
    except Exception as error:
        frappe.log_error(error)
        pass


def get_customer_folder(customer_name):
    customer_folder = ensure_folder_exists(customer_name, "Tenants")
    return customer_folder


def get_yearly_customer_folder(customer_name):
    now = datetime.now().strftime("%Y")

    customer_folder = get_customer_folder(customer_name)
    return ensure_folder_exists(now, customer_folder)
