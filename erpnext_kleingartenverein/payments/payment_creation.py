import frappe
import re
from datetime import datetime
from erpnext_kleingartenverein.payments.payment_factory import (
    create_payment_for_received_amount,
)
from erpnext_kleingartenverein.payments.sales_invoice_factory import (
    create_sales_invoice,
    create_sales_invoice_item,
)
from erpnext_kleingartenverein.payments.item_factory import (
    create_item,
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
                    "status": "Unpaid",
                    "posting_date": [">=", start],
                    "posting_date": ["<=", end],
                    "grand_total": total_amount,
                },
                fields="*",
            )
            if len(invoice_list) == 1:
                return invoice_list[0]


def find_invoice_by_customer_name(ref_no, description, total_amount):
    all_customers = frappe.get_list(
        "Customer", limit_page_length=2000, fields=["name", "customer_name"]
    )

    start = datetime.now().strftime("%Y-01-01")
    end = datetime.now().strftime("%Y-12-31")
    for customer in all_customers:
        compare = customer["customer_name"].lower()
        if compare in ref_no.lower() or compare in description.lower():
            invoice_list = frappe.db.get_list(
                "Sales Invoice",
                filters={
                    "customer": customer["name"],
                    "status": "Unpaid",
                    "posting_date": [">=", start],
                    "posting_date": ["<=", end],
                    "grand_total": total_amount,
                },
                fields="*",
            )
            if len(invoice_list) == 1:
                return invoice_list[0]


def find_invoice(
    ref_no, description, regex_list, total_amount, find_by_total_amount=False
):
    for re in regex_list:
        invoice = find_invoice_by_regex(ref_no, re)
        if invoice:
            return invoice

        invoice = find_invoice_by_regex(description, re)
        if invoice:
            return invoice

    for re in regex_list:
        invoice = find_invoice_by_plot(description, re, total_amount)
        if invoice:
            return invoice

    invoice = find_invoice_by_customer_name(ref_no, description, total_amount)
    if invoice:
        return invoice

    if find_by_total_amount:
        invoice_list = frappe.db.get_list(
            "Sales Invoice",
            filters={"grand_total": total_amount},
            fields="*",
        )
        if len(invoice_list) == 1:
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


def get_general_item_code(company):
    try:
        item = frappe.get_doc("Item", "Ausgangsrechnung Freiposition")
        return item.item_code
    except frappe.DoesNotExistError:
        pass

    warehouse = frappe.get_last_doc("Warehouse")
    item = create_item(
        "Ausgangsrechnung Freiposition",
        company,
        warehouse.name,
        company.default_income_account,
    )
    item.insert()
    return item.name


def create_invoice_for_transaction(transaction):
    customer = get_or_create_unkown_customer()
    company = frappe.get_doc("Company", transaction.company)
    grand_total = transaction.unallocated_amount
    invoice = create_sales_invoice(
        customer.name,
        transaction.reference_number,
        transaction.company,
        grand_total,
        company.default_receivable_account,
    )

    item = get_general_item_code(company)
    entry = create_sales_invoice_item(
        item,
        transaction.reference_number,
        "Stk",
        1,
        grand_total,
        company.default_income_account,
        company.cost_center,
    )
    invoice.append("items", entry)

    invoice.insert()
    # invoice.submit()
    return invoice


def create_payment_for_sales_invoice(
    transaction,
    regex_list,
    submit_payment_entry,
    find_by_total_amount=False,
):
    description = transaction.description
    reference_number = transaction.reference_number

    matching_invoice = find_invoice(
        reference_number,
        description,
        regex_list,
        transaction.unallocated_amount,
        find_by_total_amount,
    )
    if matching_invoice:
        return create_payment_for_invoice(
            transaction, matching_invoice, submit_payment_entry
        )
    else:
        invoice = create_invoice_for_transaction(transaction)
        if invoice:
            return create_payment_for_invoice(transaction, invoice, False)

    return None
