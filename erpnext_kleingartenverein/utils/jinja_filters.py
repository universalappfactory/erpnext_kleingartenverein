import base64
import frappe


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
