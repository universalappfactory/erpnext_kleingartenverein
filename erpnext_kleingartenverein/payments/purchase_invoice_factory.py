import frappe


def create_purchase_invoice(company, title, supplier, bill_no, credit_to, posting_date):
    return frappe.get_doc(
        {
            "doctype": "Purchase Invoice",
            "company": company,
            "title": title,
            "supplier": supplier,
            "posting_date": posting_date,
            "credit_to": credit_to,
            "bill_no": bill_no[:140],
        }
    )


def create_purchase_invoice_item(item_code, qty, amount):
    return frappe.get_doc(
        {
            "doctype": "Purchase Invoice Item",
            "item_code": item_code,
            "qty": qty,
            "uom": "Stk",
            "stock_qty": qty,
            "rate": amount,
            "amount": amount,
            "base_rate": 1,
            "base_amount": amount,
        }
    )
