import frappe


def create_supplier(supplier_name, supplier_type="Individual", supplier_group=None):
    if not supplier_group:
        group = frappe.get_last_doc("Supplier Group")
        if group:
            supplier_group = group.name

    return frappe.get_doc(
        {
            "doctype": "Supplier",
            "supplier_name": supplier_name,
            "supplier_group": supplier_group,
            "supplier_type": supplier_type,
        }
    )
