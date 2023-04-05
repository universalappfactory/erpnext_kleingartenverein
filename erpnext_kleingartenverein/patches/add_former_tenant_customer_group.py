import frappe
from erpnext_kleingartenverein.setup.install import get_or_create_default_pricelist


def add_former_tenant_customer_group():
    price_list = get_or_create_default_pricelist()
    all_customer_groups = frappe.get_list("Customer Group", pluck="name")

    if "Former Tenant" not in all_customer_groups:
        customer_group = frappe.new_doc("Customer Group")
        customer_group.customer_group_name = "Former Tenant"
        customer_group.default_price_list = price_list.name
        customer_group.insert()


def execute():
    try:
        add_former_tenant_customer_group()
    except BaseException:
        pass
