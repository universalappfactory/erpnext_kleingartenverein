import frappe
import re


ACTION_MAP_ITEM_TO_INVOICE = "MapItemToInvoice"
ACTION_SKIP_SUBMISSION = "SkipSubmission"
ACTION_MAP_ITEM_TO_PAYMENT = "MapItemToPayment"

PAYMENT_MAPPING_MODE_DEPOSIT = "Deposit"
PAYMENT_MAPPING_MODE_WITHDRAWAL = "Withdrawal"

def get_action(transaction, mode):
    club_settings = frappe.get_last_doc("Club Settings")
    
    search = transaction.description
    for entry in list(filter(lambda x: x.mode == mode, club_settings.tab_payment_mappings)):
        if re.match(rf"{entry.regex_pattern}", search):
            return (entry.action, entry.product_link, entry.paid_from_account, entry.bank_account, entry.supplier)
    
    return (None, None, None, None, None)