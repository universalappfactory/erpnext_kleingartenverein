import frappe


def create_item(
    item_code, company_name, default_warehouse, income_account, is_purchase_item=False
):
    return frappe.get_doc(
        {
            "doctype": "Item",
            "item_code": item_code,
            "item_group": "Dienstleistungen",
            "stock_uom": "Stk",
            "is_purchase_item": is_purchase_item,
            "item_defaults": [
                {
                    "company": company_name,
                    "default_warehouse": default_warehouse,
                    "income_account": income_account,
                }
            ],
        }
    )


def get_or_create_item(
    item_code,
    company_name,
    default_warehouse_name,
    income_account,
    is_purchase_item=False,
):
    try:
        return frappe.get_doc("Item", item_code)
    except frappe.DoesNotExistError:
        try:
            item = create_item(
                item_code,
                company_name,
                default_warehouse_name,
                income_account,
                is_purchase_item,
            )
            item.insert()
            return item
        except frappe.DuplicateEntryError:
            try:
                return frappe.get_doc("Item", item_code)
            except Exception as error:
                frappe.log_error(error)
