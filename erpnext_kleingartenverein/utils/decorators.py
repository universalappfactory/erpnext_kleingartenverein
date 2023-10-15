import frappe
from functools import wraps

def valid_name(name):
    if not name:
        return False
    return name.strip() != ""


def has_permission(user, func_name, func_module):
    try:
        if (
            not valid_name(user)
            or not valid_name(func_name)
            or not valid_name(func_module)
        ):
            return False

        combined = f"{func_module}.{func_name}"
        data = frappe.db.sql(
            """SELECT DISTINCT h.role FROM `tabApiAccess` a
                    JOIN `tabHas Role` h ON a.role = h.role
                    WHERE 
                    ((CURRENT_DATE >= a.from_date) OR (a.from_date IS NULL)) AND
                    ((CURRENT_DATE <= a.to_date) OR (a.to_date IS NULL)) AND
                    h.parent = %s AND h.parenttype = 'User'
                    AND (a.model = %s OR a.model = %s OR a.model = %s)
                """,
            tuple([user, func_name, func_module, combined]),
        )

        return len(data) > 0
    except Exception as e:
        frappe.log_error(e)
        return False


def check_permission(func):
    @wraps(func)
    def inner(*args, **kwargs):
        if not has_permission(frappe.session["user"], func.__name__, func.__module__):
            raise frappe.PermissionError

        return func(*args, **kwargs)

    return inner
