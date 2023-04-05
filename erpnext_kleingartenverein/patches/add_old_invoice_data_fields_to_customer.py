import frappe
from frappe import _
from erpnext_kleingartenverein.setup.install import add_field


def add_old_invoice_data_fields():
    customize_form = frappe.get_doc("Customize Form")
    customize_form.doc_type = "Customer"
    customize_form.fetch_to_customize()

    add_field(
        customize_form,
        "last_invoice_sec",
        _("Last Invoice (from old program)"),
        "old_invoice_table",
        "Section Break",
    )

    add_field(
        customize_form,
        "last_invoice_date",
        _("Invoice Date"),
        "last_invoice_sec",
        "Date",
    )

    add_field(
        customize_form,
        "last_invoice_grand_total",
        _("Grand Total"),
        "last_invoice_date",
        "Float",
    )


def execute():
    try:
        add_old_invoice_data_fields()
    except BaseException:
        pass
