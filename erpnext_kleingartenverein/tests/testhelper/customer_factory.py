import frappe
from datetime import datetime


def create_customer_group(customer_group_name, insert=True):
    result = frappe.get_doc(
        {
            "doctype": "Customer Group",
            "customer_group_name": customer_group_name,
        }
    )
    if insert:
        result.insert()

    return result


def get_or_create_customer_group(customer_group_name):
    try:
        return frappe.get_last_doc(
            "Customer Group", filters={"customer_group_name": customer_group_name}
        )
    except frappe.DoesNotExistError:
        return create_customer_group(customer_group_name)


def create_tenant(customer_name, customer_group_name, insert=True):
    territory = frappe.get_last_doc("Territory")

    customer_group = get_or_create_customer_group(customer_group_name)
    result = frappe.get_doc(
        {
            "doctype": "Customer",
            "customer_name": customer_name,
            "customer_type": "Individual",
            "customer_group": customer_group.name,
            "territory": territory.name,
        }
    )
    if insert:
        result.insert()
    return result


def get_or_create_tenant(customer_name, customer_group_name):
    try:
        return frappe.get_last_doc(
            "Customer",
            filters={
                "customer_name": customer_name,
                "customer_group": customer_group_name,
            },
        )
    except frappe.DoesNotExistError:
        return create_tenant(customer_name, customer_group_name)
