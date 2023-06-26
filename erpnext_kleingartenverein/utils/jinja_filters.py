import base64
import frappe
from drive.api.files import list_folder_contents, get_file_content


def get_value(source, fieldname):
    if hasattr(source, fieldname):
        return getattr(source, fieldname)
    return None


def as_base_xx(source, field_name=None):
    """
    returns a base64 encoded string from a document attachment field
    named as_base_xx because as_base_64 (with a number) does not seem to work in a jinja template
    """
    if field_name:
        source = get_value(source, field_name)

    file_path = frappe.utils.get_files_path(source, is_private=True)
    with open(file_path) as f:
        encoded = base64.b64encode(f.readlines())
        return encoded


def get_row_by_value(source, fieldname, matching_value):
    """
    returns a row from a Table field which contains a matching value in the given fieldname
    """
    for row in source:
        value = get_value(row, fieldname)
        return row if value == matching_value else None
    return None


def parse_info(drive_entity):
    try:
        entity = frappe.get_doc("Drive Entity", drive_entity.name)
        file = open(entity.path, "rb")
        lines = file.readlines()

        result = dict()
        result["title"] = "info.txt"
        for line in lines:
            asString = line.decode("utf-8")
            if "|" in asString:
                data = asString.split("|")
                result[data[0]] = data[1]

        return result
    except frappe.DoesNotExist:
        return {}


def get_folder_contents(folder_name):
    if not folder_name:
        return []

    all_folders = frappe.get_list(
        "Drive Entity", fields="*", filters={"is_group": 1, "title": folder_name}
    )
    result = []
    info = None
    for folder in all_folders:
        contents = list_folder_contents(folder.name)
        for item in contents:
            if item.title == "info.txt":
                info = parse_info(item)
            else:
                result.append(item)

    if info:
        result.append(info)
    return result
