from os import path
import frappe
from datetime import datetime


def create_payment_for_received_amount(
    company,
    customer,
    posting_date,
    reference_no,
    invoice_name,
    amount,
    paid_to,
    bank_account,
):
    return frappe.get_doc(
        {
            "doctype": "Payment Entry",
            "payment_type": "Receive",
            "posting_date": posting_date,
            "company": company,
            "paid_from": "",
            "reference_no": reference_no,
            "paid_from_account_currency": "EUR",
            "paid_amount": amount,
            "source_exchange_rate": "1",
            "base_paid_amount": amount,
            "received_amount": amount,
            "base_received_amount": amount,
            "base_total_allocated_amount": amount,
            "target_exchange_rate": "1",
            "party_type": "Customer",
            "party": customer,
            "paid_to": paid_to,
            "bank_account": bank_account,
            "paid_to_account_currency": "EUR",
            "reference_date": posting_date,
            "references": [
                {
                    "reference_doctype": "Sales Invoice",
                    "reference_name": invoice_name,
                    "total_amount": amount,
                    "outstanding_amount": amount,
                    "allocated_amount": amount,
                }
            ],
        }
    )


def create_payment_for_paid_amount(
    company,
    title,
    supplier,
    posting_date,
    reference_no,
    purchase_invoice_name,
    amount,
    paid_from,
    paid_to,
    bank_account,

):
    return frappe.get_doc(
        {
            "doctype": "Payment Entry",
            "payment_type": "Pay",
            "posting_date": posting_date,
            "company": company,
            "title": title,
            "paid_from": paid_from,
            "reference_no": reference_no,
            "paid_from_account_currency": "EUR",
            "paid_amount": amount,
            "source_exchange_rate": "1",
            "base_paid_amount": amount,
            "received_amount": amount,
            "base_received_amount": amount,
            "base_total_allocated_amount": amount,
            "target_exchange_rate": "1",
            "party_type": "Supplier",
            "party": supplier,
            "paid_to": paid_to,
            "bank_account": bank_account,
            "paid_to_account_currency": "EUR",
            "reference_date": posting_date,
            "references": [
                {
                    "reference_doctype": "Purchase Invoice",
                    "reference_name": purchase_invoice_name,
                    "total_amount": amount,
                    "outstanding_amount": amount,
                    "allocated_amount": amount,
                }
            ],
        }
    )
