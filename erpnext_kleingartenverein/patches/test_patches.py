import frappe
from frappe.tests.utils import FrappeTestCase
from frappe.tests.test_patches import check_patch_files
from frappe.modules.patch_handler import get_patches_from_app, run_single


class TestPatches(FrappeTestCase):
    def test_that_patches_run(self):
        try:
            doc = frappe.get_doc("Customer Group", "Former Tenant")
            doc.delete()
        except frappe.DoesNotExistError:
            pass

        check_patch_files("erpnext_kleingartenverein")

        all_patches = get_patches_from_app("erpnext_kleingartenverein")
        self.assertEqual(len(all_patches), 2)
        for p in all_patches:
            run_single(p, force=True)

        doc = frappe.get_doc("Customer Group", "Former Tenant")
        self.assertIsNotNone(doc)

        customize_form = frappe.get_doc("Customize Form")
        customize_form.doc_type = "Customer"
        customize_form.fetch_to_customize()

        last_invoice_date = next(
            filter(
                lambda x: x.name == "Customer-last_invoice_date", customize_form.fields
            ),
            None,
        )
        self.assertIsNotNone(last_invoice_date)

        last_invoice_grand_total = next(
            filter(
                lambda x: x.name == "Customer-last_invoice_grand_total",
                customize_form.fields,
            ),
            None,
        )
        self.assertIsNotNone(last_invoice_grand_total)
