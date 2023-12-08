import frappe


def reconcile_transcation_with_payment(transaction_name, payment_name):
    transaction = frappe.get_doc("Bank Transaction", transaction_name)
    payment = frappe.get_doc("Payment Entry", payment_name)

    transaction.append(
        "payment_entries",
        {
            "payment_document": "Payment Entry",
            "payment_entry": payment.name,
            "allocated_amount": payment.paid_amount,
        },
    )
    transaction.save()
