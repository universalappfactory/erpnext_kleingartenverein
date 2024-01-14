import traceback
import frappe
from erpnext_kleingartenverein.payments.payment_creation import (
    create_payment_for_sales_invoice,
)
from erpnext_kleingartenverein.payments.bank_reconciliation import (
    reconcile_transcation_with_payment,
)
from erpnext_kleingartenverein.payments.purchase_invoice_payments import (
    create_payment_for_purchase_invoice,
)
import html


def get_regex_list(params, prefix):
    result = []
    for k, v in params.items():
        if k.startswith(prefix):
            result.append(html.unescape(v))
    return result


def enqueue_background_reconcile(transaction_name, payment_name):
    frappe.enqueue(
        method=reconcile_transcation_with_payment,
        transaction_name=transaction_name,
        payment_name=payment_name,
        queue="long",
        job_name=f"reconcile_transcation_with_payment_{transaction_name}{payment_name}",
    )


@frappe.whitelist(allow_guest=False)
# @check_permission
def create_payment_entry(*args, **kwargs):
    """
    try to create a payment entry for a given transaction

    this function can be used within a serverscript "Bank Transaction - After Insert"

    Required Params:
    name - the name of the transaction

    multiple params for regex to determine a sales or purchase invoice like
    
    re_1=".*ACC.*" re_2=".*MyInvoice\d.*"
    pre_1="PCC.*" pre2="\d\d\d"

    and so on

    Then the function will try to determine a matching sales or purchchase invoice and create an according payment

    OR

    You can provide different payment settings within the "Club Settings", this settings will be prefered over the given regex, 
    if we have a match

    """
    try:
    
        transaction_name = kwargs["name"]
        sales_invoice_regex_list = get_regex_list(kwargs, "re_")
        purchase_invoice_regex_list = get_regex_list(kwargs, "pre_")

        reconcile = bool(kwargs["reconcile"]) if "reconcile" in kwargs else False
        submit_payment_entry = bool(kwargs["submit"]) if "submit" in kwargs else False
        by_total_amount = bool(kwargs["by_total_amount"]) if "by_total_amount" in kwargs else False

        transaction = frappe.get_doc("Bank Transaction", transaction_name)

        existing_by_reference = frappe.db.get_list(
                "Bank Transaction",
                filters={
                    "reference_number": transaction.reference_number
                },
            )
        
        if len(existing_by_reference) > 1:
            frappe.log_error(f"transaction '{transaction.name}' with {transaction.reference_number} exists multiple times")
            return
        
        if transaction.status == "Pending" or transaction.status == "Unreconciled":
            if transaction.deposit > 0:
                payment = create_payment_for_sales_invoice(
                    transaction, 
                    sales_invoice_regex_list,
                    submit_payment_entry,
                    by_total_amount
                )

                if payment and reconcile:
                    enqueue_background_reconcile(transaction.name, payment.name)
            if transaction.withdrawal > 0:
                payment = create_payment_for_purchase_invoice(
                    transaction, 
                    purchase_invoice_regex_list,
                    submit_payment_entry,
                )
                
                if payment and reconcile:
                    enqueue_background_reconcile(transaction.name, payment.name)

    except Exception as e:
        frappe.log_error(e)
        return []
