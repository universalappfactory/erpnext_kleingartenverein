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
    create_payment_from_account,
)
from erpnext_kleingartenverein.payments.item_factory import (
    create_item,
)
from erpnext_kleingartenverein.payments.payment_settings import (
    get_action,
    PAYMENT_MAPPING_MODE_WITHDRAWAL,
    ACTION_MAP_ITEM_TO_INVOICE,
    ACTION_SKIP_SUBMISSION,
    ACTION_MAP_ITEM_TO_PAYMENT,
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
    return supplier.name


def find_supplier_name_for_transaction(transaction):
    all_suppliers = frappe.get_list(
        "Supplier", limit_page_length=2000, fields=["name", "supplier_name"]
    )

    for supplier in all_suppliers:
        compare = supplier["supplier_name"].lower()
        if (
            compare in transaction.reference_number.lower()
            or compare in transaction.description.lower()
        ):
            return supplier.name


def get_action_parameters(company, transaction):
    (action, item_code, paid_from_account, bank_account, supplier) = get_action(
        transaction, PAYMENT_MAPPING_MODE_WITHDRAWAL
    )
    if item_code:
        return (action, item_code, paid_from_account, bank_account, supplier)

    if action:
        return (action, None, None, None, None)

    try:
        item = frappe.get_doc("Item", "Eingangsrechnung Freiposition")
        return (ACTION_MAP_ITEM_TO_INVOICE, item.item_code, None, None, None)
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
    return (ACTION_MAP_ITEM_TO_INVOICE, item.item_code, None, None, None)


def create_purchase_invoice_for_transaction(transaction, item_code, supplier_name, company):
    title = transaction.reference_number[:140]
    purchase_invoice = create_purchase_invoice(
        transaction.company,
        title,
        supplier_name,
        transaction.reference_number,
        company.default_payable_account,
        transaction.date,
    )

    entry = create_purchase_invoice_item(item_code, 1, transaction.withdrawal)
    purchase_invoice.append("items", entry)

    purchase_invoice.insert()
    purchase_invoice.submit()
    return purchase_invoice


def create_payment(
    transaction, item_code, company, paid_from_account, bank_account, supplier_name
):
    description = transaction.description
    reference_number = transaction.reference_number

    title = f"Zahlung {company.name}, {item_code}"

    payment = create_payment_from_account(
        company.name,
        title,
        description,
        supplier_name,
        transaction.date,
        reference_number,
        transaction.withdrawal,
        bank_account,
        paid_from_account,
    )
    payment.insert()
    return payment


def apply_action_for_transaction(transaction):
    """
    apply an action for a transaction
    this can be:
    - create a purchase invoice
    - create only a payment entry
    """
    company = frappe.get_doc("Company", transaction.company)

    (
        action,
        item_code,
        paid_from_account,
        bank_account,
        supplier_name,
    ) = get_action_parameters(company, transaction)

    if not supplier_name:
        supplier_name = find_supplier_name_for_transaction(transaction)
        if not supplier_name:
            supplier_name = get_or_create_unkown_supplier(transaction)

    if action == ACTION_MAP_ITEM_TO_INVOICE:
        purchase_invoice = create_purchase_invoice_for_transaction(transaction, item_code, supplier_name, company)
        return (action, purchase_invoice)

    if action == ACTION_MAP_ITEM_TO_PAYMENT:
        payment = create_payment(
            transaction, item_code, company, paid_from_account, bank_account, supplier_name
        )
        return (action, payment)

    return (None, None)


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
        (action, result) = apply_action_for_transaction(transaction)
        if action == ACTION_MAP_ITEM_TO_INVOICE and result:
            payment = create_payment_for_existing_purchase_invoice(transaction, result)
            # if submit_payment_entry and invoice.status in [
            #     "Submitted",
            #     "Overdue",
            #     "Unpaid",
            # ]:
            print("NEW ACTION, SKIP SUBMISSION?")
            # if not skip_purchase_invoice_submission(transaction):
            #     payment.submit()
            return payment
        if action == ACTION_MAP_ITEM_TO_PAYMENT and result:
            print("should we submit this payment?")
    return None
