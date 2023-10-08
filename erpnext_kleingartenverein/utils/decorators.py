import frappe


def check_permission(func):
    def inner():
        print("I got decorated", func.__name__)
        print("I got decorated", func.__module__)

        is_guest = frappe.session["user"] == "Guest"
        # frappe.throw(
        #     "Cannot paste to this folder due to insufficient permissions",
        #     frappe.PermissionError,
        # )

        return func()

    return inner
