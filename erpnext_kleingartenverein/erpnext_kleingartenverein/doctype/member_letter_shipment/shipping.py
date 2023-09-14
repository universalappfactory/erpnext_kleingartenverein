import frappe
from datetime import datetime
from frappe import _
from frappe.utils.file_manager import add_attachments
from frappe.utils.weasyprint import PrintFormatGenerator
from erpnext_kleingartenverein.file_api import get_yearly_customer_folder


class ShippingError(Exception):
    pass


STATUS_SUBMITTED = 1


def background_create_letters(member_letter_shipping_name):
    try:
        if not member_letter_shipping_name or member_letter_shipping_name == "":
            frappe.throw("you must provide a member_letter_shipping_name")

        letter_shipment = frappe.get_doc(
            "Member Letter Shipment", member_letter_shipping_name
        )
        if not letter_shipment:
            frappe.throw(
                _("cannot find Member Letter Shipment: {0}").format(
                    member_letter_shipping_name
                )
            )

        shipping = MemberLetterShipping()
        shipping.create_letters_and_submit(letter_shipment)

        frappe.publish_realtime(
            "background_create_letters_start", {"Done": member_letter_shipping_name}
        )
    except Exception as error:
        frappe.log_error(error)


@frappe.whitelist()
def create_letters_and_submit(member_letter_shipping_name):
    if not member_letter_shipping_name or member_letter_shipping_name == "":
        frappe.throw("you must provide a member_letter_shipping_name")

    try:
        letter_shipment = frappe.get_doc(
            "Member Letter Shipment", member_letter_shipping_name
        )
        if not letter_shipment:
            frappe.throw(
                _("cannot find Member Letter Shipment: {0}").format(
                    member_letter_shipping_name
                )
            )

        if letter_shipment.customer_table and len(letter_shipment.customer_table) == 1:
            background_create_letters(member_letter_shipping_name)
        else:
            frappe.enqueue(
                background_create_letters,
                member_letter_shipping_name=member_letter_shipping_name,
                queue="long",
                job_name=f"create_letters_for_{member_letter_shipping_name}",
            )

    except Exception as e:
        frappe.log_error(e)
        frappe.throw(str(e))


class MemberLetterShipping:
    """
    generates a pdf for a single member letter
    """

    def __init__(self, throw_on_error=False) -> None:
        self._throw_on_error = throw_on_error

    def get_matching_customers(self, letter):
        if letter.customer_table:
            customers = list(map(lambda x: x.customer, letter.customer_table))
            # 'date': ['>', '2019-09-08']
            return frappe.get_list(
                "Customer", filters={"name": ["IN", customers]}, fields="*"
            )

        if letter.target_customergroup:
            return frappe.get_list(
                "Customer", filters={"customer_group": letter.target_customergroup}
            )
        else:
            return []

    def default_head_exists(self):
        d = frappe.db.get_value("Letter Head", "Default Head", "*", as_dict=1)
        return d is not None

    def create_pdf(self, doctype, name, print_format, letterhead=None):
        doc = frappe.get_doc(doctype, name)
        doc.check_permission("print")
        generator = PrintFormatGenerator(print_format, doc, letterhead)
        pdf = generator.render_pdf()
        return pdf

    def attch_to_file(self, print_format, target_folder, sent_letter, filename):
        pdf = self.create_pdf(
            "Single Member Letter",
            sent_letter.name,
            print_format,
            "Default Head" if self.default_head_exists() else None,
        )
        return frappe.get_doc(
            {
                "doctype": "File",
                "attached_to_doctype": "Single Member Letter",
                "attached_to_name": sent_letter.name,
                "attached_to_field": "attachment",
                "folder": target_folder,
                "file_name": filename,
                # "file_url": file_url,
                "is_private": 1,
                "content": pdf,
            }
        ).save()

    def add_attchment_to_customer(self, customer_name, file_url):
        add_attachments("Customer", customer_name, file_url)

    def create_letters(self, letter, submit=False):
        customer_list = self.get_matching_customers(letter)
        now = datetime.now()

        date = now.strftime("%Y-%m-%d-%H-%M")
        idx = 0
        for customer in customer_list:
            try:
                description = f"{letter.description}-{date}-{idx}"
                sent_letter = frappe.new_doc("Single Member Letter")
                sent_letter.customer = customer.name
                sent_letter.content = letter.content
                sent_letter.member_letter_shipment = letter.name
                sent_letter.description = description
                sent_letter.target_folder = letter.target_folder
                sent_letter.print_format = letter.print_format

                sent_letter.save()
                idx = idx + 1
                if submit:
                    sent_letter.submit()
            except Exception as error:
                frappe.log_error(error)
                frappe.throw("Error creating letters")

    def create_letters_and_submit(self, letter):
        self.create_letters(letter, True)

    def create_pdf_for_letter(self, sent_letter):
        if not sent_letter:
            frappe.throw("you must provide sent_letter")

        if sent_letter.doctype != "Single Member Letter":
            frappe.throw("sent_letter must be 'Single Member Letter'")

        try:
            target_folder = (
                sent_letter.target_folder
                if sent_letter.target_folder
                else "Home/letters"
            )
            try:
                pdf = self.attch_to_file(
                    sent_letter.print_format,
                    target_folder,
                    sent_letter,
                    f"{sent_letter.description}.pdf",
                )
                sent_letter.attachment = pdf.file_url
                sent_letter.success = True

                self.add_attchment_to_customer(sent_letter.customer, [pdf.name])
            except Exception as error:
                if self._throw_on_error:
                    raise error
                else:
                    sent_letter.error_message = str(error)
                    sent_letter.success = False

        except Exception as error:
            frappe.log_error(error)
            frappe.throw("Error while sending", error)

    def create_preview(self, customer_name, content, print_format, target_folder):
        letter_name = ""
        try:
            now = datetime.now()

            preview_letter = frappe.get_doc(
                {
                    "doctype": "Single Member Letter",
                    "target_folder": target_folder,
                    "print_format": print_format,
                    "content": content,
                    "customer": customer_name,
                    "description": f"Preview Letter {now.strftime('YYYY-MM-dd-HH-mm-ss')}",
                }
            )
            preview_letter.insert()
            letter_name = preview_letter.name

            return self.create_pdf(
                "Single Member Letter", preview_letter.name, preview_letter.print_format
            )
        except Exception as error:
            frappe.log_error(error)
            if letter_name != "":
                frappe.delete_doc("Single Member Letter", letter_name)

            frappe.throw(error)

    def get_letter_description(self, letter_description):
        result = letter_description
        try:
            while True:
                by_description = frappe.get_last_doc(
                    "Single Member Letter", filters={"description": result}
                )
                now = datetime.now().strftime("%Y-%m-%d-%H:%M")
                result = f"{letter_description} - {now}"
        except frappe.DoesNotExistError:
            return result

    def create_single_member_letter(
        self, customer_name, content, print_format, letter_description
    ):
        """
        creates a single member letter document for the given customer
        """

        description = f"{customer_name} - {letter_description}"
        letter_description = self.get_letter_description(description)

        yearly_folder = get_yearly_customer_folder(customer_name)
        letter = frappe.get_doc(
            {
                "doctype": "Single Member Letter",
                "target_folder": yearly_folder,
                "print_format": print_format,
                "content": content,
                "customer": customer_name,
                "description": letter_description,
            }
        )
        letter.insert()
        return letter.name
