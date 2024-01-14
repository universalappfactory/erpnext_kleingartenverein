import frappe
import re
from datetime import datetime
from erpnext_kleingartenverein.payments.payment_factory import (
    create_payment_for_received_amount,
    create_payment_from_account,
)
from erpnext_kleingartenverein.payments.sales_invoice_factory import (
    create_sales_invoice,
    create_sales_invoice_item,
)
from erpnext_kleingartenverein.payments.item_factory import (
    get_or_create_item,
)
from erpnext_kleingartenverein.payments.payment_settings import (
    get_action,
    PAYMENT_MAPPING_MODE_DEPOSIT,
    ACTION_MAP_ITEM_TO_INVOICE,
    ACTION_SKIP_SUBMISSION,
    ACTION_MAP_ITEM_TO_PAYMENT,
)


def get_first_matching_group(text, regex):
    result = re.search(regex, text, re.IGNORECASE)
    if not result:
        return None

    groups = result.groups()
    if len(groups) == 1:
        return result.groups(1)[0]

    return None


def find_invoice_by_regex(input_text, regex):
    match = get_first_matching_group(input_text, rf"{regex}")
    if match:
        invoice_list = frappe.db.get_list(
            "Sales Invoice", or_filters={"po_no": match, "name": match}, fields="*"
        )
        if len(invoice_list) == 1:
            return invoice_list[0]


def find_invoice_by_plot(input_text, regex, total_amount):
    desc = input_text
    if "IBAN:" in input_text:
        desc = input_text.split("IBAN:")[0]
    match = get_first_matching_group(desc, rf"{regex}")
    if match:
        match = match.rjust(3, "0")
        plot_link = f"Plot-{match}"
        customer_list = frappe.db.get_list(
            "Customer", filters={"plot_link": plot_link}, fields="*"
        )
        if len(customer_list) == 1:
            start = datetime.now().strftime("%Y-01-01")
            end = datetime.now().strftime("%Y-12-31")
            invoice_list = frappe.db.get_list(
                "Sales Invoice",
                filters={
                    "customer": customer_list[0]["name"],
                    "posting_date": [">=", start],
                    "posting_date": ["<=", end],
                    "grand_total": total_amount,
                },
                fields="*",
            )
            invoice_list = list(
                filter(
                    lambda x: x.status in ["Submitted", "Overdue", "Unpaid"],
                    invoice_list,
                )
            )
            if len(invoice_list) == 1:
                return invoice_list[0]


def find_invoice_by_customer_name(ref_no, description, total_amount):
    all_customers = frappe.get_list(
        "Customer", limit_page_length=2000, fields=["name", "customer_name"]
    )

    start = datetime.now().strftime("2023-01-01")
    end = datetime.now().strftime("2023-12-31")
    for customer in all_customers:
        compare = customer["customer_name"].lower()
        if compare in ref_no.lower() or compare in description.lower():
            invoice_list = frappe.db.get_list(
                "Sales Invoice",
                filters={
                    "customer": customer["name"],
                    "posting_date": [">=", start],
                    "posting_date": ["<=", end],
                    "grand_total": total_amount,
                },
                fields="*",
            )
            invoice_list = list(
                filter(
                    lambda x: x.status in ["Submitted", "Overdue", "Unpaid"],
                    invoice_list,
                )
            )
            if len(invoice_list) == 1:
                return invoice_list[0]


def find_invoice(
    ref_no, description, regex_list, total_amount, find_by_total_amount=False
):
    for re in regex_list:
        invoice = find_invoice_by_regex(ref_no, re)
        if invoice and invoice["grand_total"] > 0:
            return invoice

        invoice = find_invoice_by_regex(description, re)
        if invoice and invoice["grand_total"] > 0:
            return invoice

    for re in regex_list:
        invoice = find_invoice_by_plot(description, re, total_amount)
        if invoice and invoice["grand_total"] > 0:
            return invoice

    invoice = find_invoice_by_customer_name(ref_no, description, total_amount)
    if invoice and invoice["grand_total"] > 0:
        return invoice

    if total_amount <= 0:
        return

    if find_by_total_amount:
        invoice_list = frappe.db.get_list(
            "Sales Invoice",
            filters={"grand_total": total_amount},
            fields="*",
        )
        if len(invoice_list) == 1:
            invoice = invoice_list[0]
            if invoice.customer_name in description:
                return invoice_list[0]


def create_payment_for_invoice(transaction, invoice, submit_payment_entry):
    bank_account = frappe.get_doc("Bank Account", transaction.bank_account)

    amount = transaction.deposit
    remaining = 0
    try:
        if amount > invoice["grand_total"]:
            amount = invoice["grand_total"]
    except:
        if amount > invoice.grand_total:
            amount = invoice.grand_total
            remaining = amount - invoice.grand_total

    payment = create_payment_for_received_amount(
        transaction.company,
        invoice.customer,
        transaction.date,
        transaction.reference_number,
        invoice.name,
        amount,
        bank_account.account,
        transaction.bank_account,
    )
    payment.insert()

    if remaining > 0:
        remaining_payment = create_payment_for_received_amount(
            transaction.company,
            invoice.customer,
            transaction.date,
            transaction.reference_number,
            invoice.name,
            transaction.deposit,
            bank_account.account,
            transaction.bank_account,
        )
        remaining_payment.insert()

    if invoice.status in ["Submitted", "Overdue", "Unpaid"] and submit_payment_entry:
        payment.submit()

    return payment


def get_or_create_unkown_customer():
    try:
        return frappe.get_doc("Customer", "Unkown")
    except frappe.DoesNotExistError:
        customer_group = frappe.get_last_doc("Customer Group")

        customer = frappe.get_doc(
            {
                "doctype": "Customer",
                "customer_name": "Unkown",
                "customer_type": "Individual",
                "territory": "Germany",
                "customer_group": customer_group.name,
            }
        )
        customer.insert()
        return customer
    except frappe.DuplicateEntryError:
        try:
            return frappe.get_doc("Customer", "Unkown")
        except Exception as error:
            frappe.log_error(error)


def find_customer_for_transaction(transaction):
    all_customers = frappe.get_list(
        "Customer", limit_page_length=2000, fields=["name", "customer_name"]
    )

    for customer in all_customers:
        compare = customer["customer_name"].lower()
        if (
            compare in transaction.reference_number.lower()
            or compare in transaction.description.lower()
        ):
            return customer


def get_action_for_transaction(company, transaction):
    (
        action,
        item_code,
        paid_from_account,
        bank_account,
        supplier_name,
    ) = get_action(transaction, PAYMENT_MAPPING_MODE_DEPOSIT)

    if action == ACTION_MAP_ITEM_TO_INVOICE and item_code:
        return (action, item_code, None, None, None)

    if action == ACTION_SKIP_SUBMISSION:
        return (None, None, None, None, None)

    if action == ACTION_MAP_ITEM_TO_PAYMENT:
        return (action, item_code, paid_from_account, bank_account, supplier_name)

    warehouse = frappe.get_last_doc("Warehouse")
    item = get_or_create_item(
        "Ausgangsrechnung Freiposition",
        company,
        warehouse.name,
        company.default_income_account,
    )
    return (ACTION_MAP_ITEM_TO_INVOICE, item.item_code, None, None, None)


def create_payment_for_transaction(
    transaction, item_code, company, paid_from_account, bank_account, supplier_name
):
    description = transaction.description
    reference_number = transaction.reference_number

    title = f"Zahlung {company.name}, {item_code}"

    amount = (
        transaction.withdrawal if transaction.withdrawal > 0 else transaction.deposit
    )

    payment = create_payment_from_account(
        company.name,
        title,
        description,
        supplier_name,
        transaction.date,
        reference_number,
        amount,
        bank_account,
        paid_from_account,
        company.cost_center
    )
    payment.insert()
    return payment


def apply_action_for_transaction(transaction, submit=True):
    submit = True
    customer = find_customer_for_transaction(transaction)
    if not customer:
        submit = False
        customer = get_or_create_unkown_customer()

    amount = transaction.deposit if transaction.unallocated_amount == 0 else transaction.unallocated_amount
    if amount<= 0:
        return (None, None, False)

    company = frappe.get_doc("Company", transaction.company)
    (
        action,
        item,
        paid_from_account,
        bank_account,
        supplier_name,
    ) = get_action_for_transaction(company, transaction)

    if action == ACTION_MAP_ITEM_TO_INVOICE:
        grand_total = amount
        invoice = create_sales_invoice(
            customer.name,
            transaction.description,
            transaction.company,
            grand_total,
            company.default_receivable_account,
            transaction.date,
        )

        entry = create_sales_invoice_item(
            item,
            transaction.description,
            "Stk",
            1,
            grand_total,
            company.default_income_account,
            company.cost_center,
        )
        invoice.append("items", entry)

        invoice.insert()

        if submit:
            invoice.submit()
        return (action, invoice, submit)
    if action == ACTION_MAP_ITEM_TO_PAYMENT:
        payment = create_payment_for_transaction(
            transaction,
            item,
            company,
            paid_from_account,
            bank_account,
            supplier_name
        )
        return (action, payment, False)

    return (None, None, None)


def create_payment_for_sales_invoice(
    transaction,
    regex_list,
    submit_payment_entry,
    find_by_total_amount=False,
):
    description = transaction.description
    reference_number = transaction.reference_number

    amount = (
        transaction.deposit
        if transaction.status == "Pending"
        else transaction.unallocated_amount
    )
    matching_invoice = find_invoice(
        reference_number,
        description,
        regex_list,
        amount,
        find_by_total_amount,
    )
    if matching_invoice:
        return create_payment_for_invoice(
            transaction, matching_invoice, submit_payment_entry
        )
    else:
        (action, result, submit) = apply_action_for_transaction(transaction, False)

        if action == ACTION_MAP_ITEM_TO_INVOICE:
            if (
                result and submit
            ):  # we cannot create payments when invoice is not submitted
                return create_payment_for_invoice(transaction, result, submit)
        if action == ACTION_MAP_ITEM_TO_PAYMENT:
            return result

    return None
