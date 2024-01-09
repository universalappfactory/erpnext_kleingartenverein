import frappe
import re


def get_item_for_sales_invoice(transaction):
    (action, product) = get_action(transaction, "SalesInvoice")
    if action == "MapToItem":
        return product


def get_item_for_purchase_invoice(transaction):
    (action, product) = get_action(transaction, "PurchaseInvoice")
    if action == "MapToItem":
        return product


def skip_purchase_invoice_submission(transaction):
    (action, product) = get_action(transaction, "PurchaseInvoice")
    if action == "SkipSubmission":
        return True
    return False


def skip_sales_invoice_submission(transaction):
    (action, product) = get_action(transaction, "SalesInvoice")
    if action == "SkipSubmission":
        return True
    return False


def get_action(transaction, mode):
    club_settings = frappe.get_last_doc("Club Settings")

    search = transaction.reference_number
    for entry in club_settings.tab_payment_mappings:
        if re.match(rf"{entry.regex_pattern}", search):
            return (entry.action, entry.product_link)

    search = transaction.description
    for entry in list(filter(lambda x: x.mode == mode, club_settings.tab_payment_mappings)):
        if re.match(rf"{entry.regex_pattern}", search):
            return (entry.action, entry.product_link)
    
    return (None, None)