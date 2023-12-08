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

def find_purchase_invoice(ref_no, description, regex_list):
    return None


def create_payment_for_existing_purchase_invoice(transaction, purchase_invoice):
    company = frappe.get_doc('Company', transaction.company)
    
    payment = create_payment_for_paid_amount(
        transaction.company,
        purchase_invoice.supplier,
        purchase_invoice.posting_date,
        purchase_invoice.bill_no,
        purchase_invoice.name,
        purchase_invoice.grand_total,
        company.default_bank_account,
        purchase_invoice.credit_to,
        transaction.bank_account
    )

    payment.insert()
    return payment


def get_supplier(transaction):
    try:
        supplier = frappe.get_doc("Supplier", "Unkown")
        return supplier.name
    except frappe.DoesNotExistError:
        pass

    supplier = create_supplier("Unkown")
    supplier.insert()
    return supplier.name



def get_general_item_code(company):
    try:
        item = frappe.get_doc("Item", "Eingangsrechnung Freiposition")
        return item.item_code
    except frappe.DoesNotExistError:
        pass

    warehouse = frappe.get_last_doc('Warehouse')

    item = create_item("Eingangsrechnung Freiposition", company.name, warehouse.name, company.default_payable_account, True)
    item.insert()
    return item.item_code

def create_new_purchase_invoice(transaction):
    supplier = get_supplier(transaction)
    company = frappe.get_doc('Company', transaction.company)

    title = transaction.reference_number[:140]
    purchase_invoice = create_purchase_invoice(
        transaction.company, title, supplier, transaction.reference_number, company.default_payable_account
    )

    item_code = get_general_item_code(company)
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
        if submit_payment_entry and matching_invoice.status in ["Submitted", "Overdue", "Unpaid"]:
            payment.submit()
    else:
        invoice = create_new_purchase_invoice(transaction)
        if invoice:
            payment = create_payment_for_existing_purchase_invoice(transaction, invoice)
            if submit_payment_entry and invoice.status in ["Submitted", "Overdue", "Unpaid"]:
                payment.submit()

    return None
