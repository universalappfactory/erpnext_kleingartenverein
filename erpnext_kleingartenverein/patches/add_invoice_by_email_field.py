from erpnext_kleingartenverein.setup.install import add_invoice_by_email_field


def execute():
    try:
        add_invoice_by_email_field()
    except BaseException:
        pass
