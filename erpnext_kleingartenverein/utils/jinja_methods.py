import frappe
import datetime

def get_open_teamwork_dates():
    now = datetime.datetime.now()
    result = []
    next_teamwork_dates = frappe.get_list(
        "Teamwork Date",
        filters={
            "date": [">=", now],
            "is_published": 1
        },
        order_by="date asc",
        fields="*",
    )
    for date in next_teamwork_dates:
        result.append(frappe.get_doc('Teamwork Date', date.name))
    return result