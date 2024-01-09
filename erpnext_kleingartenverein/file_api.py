from os import path
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


def get_filename_and_folder(path_to_folder):
    (head, tail) = path.split(path_to_folder)
    folder_name = tail if tail != "" else get_filename_and_folder(head)

    return (folder_name if folder_name != "" else None, head.strip(path.sep))


def create_folder(path_to_folder):
    (filename, folder) = get_filename_and_folder(path_to_folder)

    data = {
        "doctype": "File",
        "file_name": filename,
        "is_folder": 1,
    }

    if folder:
        parent = ensure_folder_exists(folder)
        data["folder"] = parent

    folder = frappe.get_doc(data)
    folder.insert()
    return folder


def ensure_folder_exists(path_to_folder):
    try:
        (filename, folder) = get_filename_and_folder(path_to_folder)
        filters = {"file_name": filename, "is_folder": 1}

        if folder:
            filters["folder"] = folder

        print(filters)
        folders = frappe.get_all("File", filters=filters)

        if len(folders) > 1:
            frappe.throw(f"expect to have one folder named '{path_to_folder}'")

        if len(folders) == 0:
            folder = create_folder(path_to_folder)
            return folder.name

        return folders[0].name
    except Exception as error:
        frappe.log_error(error)
        pass


def get_customer_folder(customer_name):
    customer_path = path.join("Home", "Tenants", customer_name)
    customer_folder = ensure_folder_exists(customer_path)
    return customer_folder


def get_temp_folder():
    return ensure_folder_exists(path.join("Home", "Tmp"))

def get_guest_folder():
    return ensure_folder_exists(path.join("Home", "Guest"))

def get_yearly_customer_folder(customer_name):
    now = datetime.now().strftime("%Y")

    customer_folder = get_customer_folder(customer_name)
    yearly_folder = path.join(customer_folder, now)
    return ensure_folder_exists(yearly_folder)


def get_print_preview_folder():
    temp_folder = get_temp_folder()
    return ensure_folder_exists(path.join(temp_folder, "Print Preview"))

def get_bank_statements_folder():
    bank_statements_path = path.join("Home", "Bank Statements")
    bank_statements_folder = ensure_folder_exists(bank_statements_path)
    return bank_statements_folder

def get_yearly_bank_statements_folder():
    now = datetime.now().strftime("%Y")

    bank_statements_folder = get_bank_statements_folder()
    yearly_folder = path.join(bank_statements_folder, now)
    return ensure_folder_exists(yearly_folder)