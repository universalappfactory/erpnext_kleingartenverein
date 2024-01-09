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


@frappe.whitelist(allow_guest=True)
# @check_permission
def create_payment_entry(*args, **kwargs):
    try:
        transaction_name = kwargs["name"]
        sales_invoice_regex_list = get_regex_list(kwargs, "re_")
        purchase_invoice_regex_list = get_regex_list(kwargs, "pre_")

        reconcile = bool(kwargs["reconcile"]) if "reconcile" in kwargs else False
        submit_payment_entry = bool(kwargs["submit"]) if "submit" in kwargs else False
        by_total_amount = bool(kwargs["by_total_amount"]) if "by_total_amount" in kwargs else False

        transaction = frappe.get_doc("Bank Transaction", transaction_name)
        if transaction.status == "Pending":
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
