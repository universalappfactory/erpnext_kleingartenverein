import frappe
from erpnext_kleingartenverein.payments.purchase_invoice_factory import (
    create_purchase_invoice,
    create_purchase_invoice_item,
)
from erpnext_kleingartenverein.payments.supplier_factory import (
    create_supplier,
)
from erpnext_kleingartenverein.payments.payment_factory import (
    create_payment_for_paid_amount,
)
from erpnext_kleingartenverein.payments.item_factory import (
    create_item,
)
from erpnext_kleingartenverein.payments.payment_settings import (
    get_item_for_purchase_invoice,
    skip_purchase_invoice_submission,
)


def find_purchase_invoice(ref_no, description, regex_list):
    return None


def create_payment_for_existing_purchase_invoice(transaction, purchase_invoice):
    company = frappe.get_doc("Company", transaction.company)

    payment = create_payment_for_paid_amount(
        transaction.company,
        transaction.reference_number[:140],
        purchase_invoice.supplier,
        purchase_invoice.posting_date,
        purchase_invoice.bill_no,
        purchase_invoice.name,
        purchase_invoice.grand_total,
        company.default_bank_account,
        purchase_invoice.credit_to,
        transaction.bank_account,
    )

    payment.insert()
    return payment


def get_or_create_unkown_supplier(transaction):
    try:
        supplier = frappe.get_doc("Supplier", "Unkown")
        return supplier
    except frappe.DoesNotExistError:
        pass

    supplier = create_supplier("Unkown")
    supplier.insert()
    return supplier


def find_supplier_for_transaction(transaction):
    all_suppliers = frappe.get_list(
        "Supplier", limit_page_length=2000, fields=["name", "supplier_name"]
    )

    for supplier in all_suppliers:
        compare = supplier["supplier_name"].lower()
        if (
            compare in transaction.reference_number.lower()
            or compare in transaction.description.lower()
        ):
            return supplier


def get_item_code(company, transaction):
    item = get_item_for_purchase_invoice(transaction)
    if item:
        return item

    try:
        item = frappe.get_doc("Item", "Eingangsrechnung Freiposition")
        return item.item_code
    except frappe.DoesNotExistError:
        pass

    warehouse = frappe.get_last_doc("Warehouse")

    item = create_item(
        "Eingangsrechnung Freiposition",
        company.name,
        warehouse.name,
        company.default_payable_account,
        True,
    )
    item.insert()
    return item.item_code


def create_new_purchase_invoice(transaction):
    supplier = find_supplier_for_transaction(transaction)
    if not supplier:
        supplier = get_or_create_unkown_supplier(transaction)

    company = frappe.get_doc("Company", transaction.company)

    title = transaction.reference_number[:140]
    purchase_invoice = create_purchase_invoice(
        transaction.company,
        title,
        supplier.name,
        transaction.reference_number,
        company.default_payable_account,
        transaction.date
    )

    item_code = get_item_code(company, transaction)
    entry = create_purchase_invoice_item(item_code, 1, transaction.withdrawal)
    purchase_invoice.append("items", entry)

    purchase_invoice.insert()
    purchase_invoice.submit()
    return purchase_invoice


def create_payment_for_purchase_invoice(transaction, regex_list, submit_payment_entry):
    description = transaction.description
    reference_number = transaction.reference_number

    matching_invoice = find_purchase_invoice(reference_number, description, regex_list)
    if matching_invoice:
        payment = create_payment_for_existing_purchase_invoice(
            transaction, matching_invoice
        )
        if submit_payment_entry and matching_invoice.status in [
            "Submitted",
            "Overdue",
            "Unpaid",
        ]:
            payment.submit()
    else:
        invoice = create_new_purchase_invoice(transaction)
        if invoice:
            payment = create_payment_for_existing_purchase_invoice(transaction, invoice)
            if submit_payment_entry and invoice.status in [
                "Submitted",
                "Overdue",
                "Unpaid",
            ]:
                if not skip_purchase_invoice_submission(transaction):
                    payment.submit()
            return payment
    return None
