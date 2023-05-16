"""
    Basic install steps for erpnext_kleingartenverein
"""
import frappe
from frappe import _


def before_install():
    pass


def after_install():
    modify_customer_naming()
    hide_unimportant_customer_form_fields()
    create_additional_customer_form_fields()
    create_customer_groups()
    hide_workspaces()


def hide_unimportant_customer_form_fields():
    """
    We modify some form fields from the customer in the install procedure as we want
    to keep the customer form clean, with only fields we really need.
    """
    hidden_fields = [
        "gender",
        "lead_name",
        "opportunity_name",
        "account_manager",
        "defaults_tab",
        "internal_customer_section",
        "market_segment",
        "industry",
        "customer_pos_id",
        "tax_tab",
        "sales_team_tab",
        "settings_tab",
        "credit_limit_section",
        "default_receivable_accounts",
    ]
    customize_form = frappe.get_doc("Customize Form")
    customize_form.doc_type = "Customer"
    customize_form.fetch_to_customize()

    for field in filter(lambda x: x.fieldname in hidden_fields, customize_form.fields):
        if field.hidden == 0:
            field.hidden = 1

    customize_form.save_customization()


def add_field(
    customize_form,
    field_name,
    field_label,
    insert_after,
    field_type="Data",
    options=None,
    read_only=False,
    in_list_view=False,
    in_standard_filter=False,
    is_unique=False,
    is_virtual=False,
):
    if options is None:
        options = []

    if (
        len(list(filter(lambda x: x.fieldname == field_name, customize_form.fields)))
        == 0
    ):
        field = frappe.new_doc("Custom Field")
        field.dt = "Customer"
        field.fieldname = field_name
        field.name = field_name
        field.fieldtype = field_type
        field.label = field_label
        field.parent = "Customize Form"
        field.parenttype = "Customize Form"
        field.parent_doc = customize_form
        field.is_custom_field = True

        if read_only:
            field.read_only = 1

        if in_list_view:
            field.in_list_view = 1

        if in_standard_filter:
            field.in_standard_filter = 1

        if is_unique:
            field.unique = 1

        if is_virtual:
            field.is_virtual = 1

        if len(options) > 0:
            field.options = "\n".join(options)

        field.insert_after = insert_after
        field.insert()


def add_teamwork_work_tasks_table(customize_form=None):
    if not customize_form:
        customize_form = frappe.get_doc("Customize Form")
        customize_form.doc_type = "Customer"
        customize_form.fetch_to_customize()

    add_field(
        customize_form,
        "teanant_teamwork_info",
        _("Tenant teamwork info"),
        "teamwork_sec_break",
        "HTML",
        options=[
            _(
                '<p class="alert alert-warning">Here you can enter teamwork tasks for a specific tenant.</p>'
            )
        ],
    )

    add_field(
        customize_form,
        "teanant_teamwork_table",
        _("Tenant specific tasks for teamwork"),
        "teanant_teamwork_info",
        "Table",
        options=["Work Task"],
    )

    add_field(
        customize_form,
        "teamwork_tasks_from_plot",
        _("Teamwork tasks (from plot)"),
        "teanant_teamwork_table",
        "Text",
        read_only=True,
    )

    add_field(
        customize_form,
        "teanant_teamwork_execution_info",
        _("Tenant teamwork execution info"),
        "teamwork_tasks_from_plot",
        "HTML",
        options=[
            _(
                '<p class="alert alert-warning">Here you can enter the actual executed tasks for teamwork</p>'
            )
        ],
    )


def add_invoice_by_email_field(customize_form=None):
    if not customize_form:
        customize_form = frappe.get_doc("Customize Form")
        customize_form.doc_type = "Customer"
        customize_form.fetch_to_customize()

    add_field(customize_form, "accounting_break", "", "bank_account_link", "Column Break")
    add_field(customize_form, "invoice_by_email", _("Invoice by EMail"), "accounting", "Check")


def create_additional_customer_form_fields():
    customize_form = frappe.get_doc("Customize Form")
    customize_form.doc_type = "Customer"
    customize_form.fetch_to_customize()

    add_field(
        customize_form,
        "membership_number",
        "Membership Number",
        "territory",
        "Data",
        in_list_view=True,
        in_standard_filter=True,
        is_unique=True,
    )
    add_field(
        customize_form,
        "accounting_section_bankaccount",
        "Bank Account",
        "accounting_tab",
        "Section Break",
    )
    add_field(
        customize_form,
        "payment_method",
        "Payment Method",
        "accounting_section_bankaccount",
        "Select",
        ["Transfer", "Sepa Debit"],
    )
    add_field(
        customize_form,
        "bank_account_link",
        "Bank Account",
        "payment_method",
        "Link",
        ["Bank Account"],
    )

    insert_after = customize_form.fields[-1].fieldname
    add_field(customize_form, "plot_tab", "Plot", insert_after, "Tab Break")
    add_field(
        customize_form,
        "plot_link",
        "Plot",
        "plot_tab",
        "Link",
        ["Plot"],
        True,
        True,
        True,
    )
    add_field(customize_form, "lessee_since", "Lessee Since", "plot_link", "Date")
    add_field(customize_form, "teamwork_tab", "Teamwork", "lessee_since", "Tab Break")
    add_field(
        customize_form, "teamwork_freed", "Freed from teamwork", "teamwork_tab", "Check"
    )

    add_field(customize_form, "teamwork_break", "", "teamwork_freed", "Column Break")
    add_field(customize_form, "teamwork_note", "Note", "teamwork_break", "Small Text")

    add_field(
        customize_form, "teamwork_sec_break", "", "teamwork_note", "Section Break"
    )
    add_field(
        customize_form,
        "teamwork_table",
        "Teamwork",
        "teamwork_sec_break",
        "Table",
        ["Teamwork Execution Table"],
    )

    add_field(
        customize_form,
        "more_information_tab",
        "More Information",
        "teamwork_table",
        "Tab Break",
    )
    add_field(customize_form, "birthday", "Birthday", "more_information_tab", "Date")
    add_field(customize_form, "member_since", "Member Since", "birthday", "Date")

    add_field(
        customize_form, "honorary_member", "Honorary Member", "member_since", "Check"
    )
    add_field(
        customize_form,
        "association_journal",
        "Association Journal",
        "honorary_member",
        "Check",
    )

    add_field(
        customize_form,
        "insurance_tab",
        "Insurances",
        "association_journal",
        "Tab Break",
    )
    add_field(
        customize_form,
        "insurance_table",
        "Insurances",
        "insurance_tab",
        "Table",
        ["Insurance Table"],
    )

    add_field(
        customize_form, "old_invoice_tab", "Old Invoices", "insurance_tab", "Tab Break"
    )
    add_field(
        customize_form,
        "old_invoice_table",
        "Old Invoices",
        "old_invoice_tab",
        "Table",
        ["Attachment table"],
    )
    add_teamwork_work_tasks_table(customize_form)
    add_invoice_by_email_field(customize_form)


def get_or_create_default_pricelist():
    try:
        price_list = frappe.get_doc("Price List", "Standard-Selling")
        return price_list
    except frappe.DoesNotExistError:
        pass

    try:
        price_list = frappe.get_doc("Price List", "Standard-Vertrieb")
        return price_list
    except frappe.DoesNotExistError:
        pass

    try:
        price_list = frappe.get_doc("Price List", "Default")
        return price_list
    except frappe.DoesNotExistError:
        pass

    price_list = frappe.new_doc("Price List")
    price_list.price_list_name = "Default"
    price_list.currency = "EUR"
    price_list.selling = 1
    price_list.insert()
    return price_list


def create_customer_groups():
    price_list = get_or_create_default_pricelist()

    all_customer_groups = frappe.get_list("Customer Group", pluck="name")
    if "Tenant" not in all_customer_groups:
        customer_group = frappe.new_doc("Customer Group")
        customer_group.customer_group_name = "Tenant"
        customer_group.default_price_list = price_list.name
        customer_group.insert()

    if "Member" not in all_customer_groups:
        customer_group = frappe.new_doc("Customer Group")
        customer_group.customer_group_name = "Member"
        customer_group.default_price_list = price_list.name
        customer_group.insert()

    if "Former Tenant" not in all_customer_groups:
        customer_group = frappe.new_doc("Customer Group")
        customer_group.customer_group_name = "Former Tenant"
        customer_group.default_price_list = price_list.name
        customer_group.insert()


def hide_workspaces():
    workspace_list = frappe.get_list("Workspace", pluck="name")

    if "Wiki" in workspace_list:
        workspace_list.remove("Wiki")

    visible = ["Erpnext Kleingartenverein"]
    for workspace in list(filter(lambda x: x not in visible, workspace_list)):
        workspace_doc = frappe.get_doc("Workspace", workspace)
        workspace_doc.is_hidden = True
        workspace_doc.save()

    # delete = ["Home"]
    # for workspace in list(filter(lambda x: x in delete, workspace_list)):
    #     workspace_doc = frappe.get_doc("Workspace", workspace)
    #     workspace_doc.delete()


def modify_customer_naming():
    """
    you can modify the customer naming settings if it's required
    """
    # selling_settings = frappe.get_doc("Selling Settings")
    # selling_settings.cust_master_name = None

    # customer_doc = frappe.get_doc('DocType', 'Customer')
    # customer_doc.autoname = "format: L-{#####}"
    # customer_doc.save()


def before_tests():
    # pylint: disable-next=import-outside-toplevel
    from frappe.desk.page.setup_wizard.setup_wizard import setup_complete
    from erpnext.setup.setup_wizard.operations.install_fixtures import install

    # complete setup if missing
    if not int(frappe.db.get_single_value("System Settings", "setup_complete") or 0):
        setup_complete(
            {
                "company_name": "Test Company",
                "company_abbr": "TC",
                "language": "German",
                "email": "testing@test.co",
                "full_name": "Testing",
                "password": "Testing",
                "country": "Germany",
                "timezone": "Europe/Berlin",
                "currency": "EUR",
                "fy_start_date": "2023-01-01",
                "fy_end_date": "2023-12-31",
                "chart_of_accounts": "Standard",
            }
        )
    # install("Germany")

    frappe.db.commit()
    frappe.clear_cache()
