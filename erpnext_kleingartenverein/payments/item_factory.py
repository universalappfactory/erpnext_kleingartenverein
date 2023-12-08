import frappe


def create_item(item_code, company, default_warehouse, income_account, is_purchase_item=False):
    return frappe.get_doc(
        {
            "doctype": "Item",
            "item_code": item_code,
            "item_group": "Dienstleistungen",
            "stock_uom": "Stk",
            "is_purchase_item": is_purchase_item,
            "item_defaults": [
                {
                    "company": company,
                    "default_warehouse": default_warehouse,
                    "income_account": income_account,
                }
            ],
        }
    )
