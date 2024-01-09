import frappe
from datetime import datetime


def create_sales_invoice(customer, title, company, grand_total, debit_to):
    now = datetime.now().strftime("%Y-%m-%d")
    return frappe.get_doc(
        {
            "doctype": "Sales Invoice",
            "customer": customer,
            "title": title,
            "company": company,
            "posting_date": now,
            "due_date": now,
            "currency": "EUR",
            "conversion_rate": 1.0,
            "selling_price_list": "Standard-Vertrieb",
            "price_list_currency": "EUR",
            "plc_conversion_rate": 1.0,
            "base_net_total": grand_total,
            "base_grand_total": grand_total,
            "grand_total": grand_total,
            "debit_to": debit_to,
        }
    )


def create_sales_invoice_item(
    item_name, description, uom, qty, rate, income_account, cost_center
):
    return frappe.get_doc(
        {
            "doctype": "Sales Invoice Item",
            "item_name": item_name,
            "description": description,
            "uom": uom,
            "stock_uom": uom,
            "conversion_factor": 1,
            "qty": qty,
            "stock_qty": qty,
            "rate": rate,
            "amount": qty * rate,
            "base_rate": rate,
            "base_amount": qty * rate,
            "income_account": income_account,
            "cost_center": cost_center,
        }
    )
