import frappe
from frappe import _
from frappe.utils.file_manager import add_attachments
from frappe.utils.weasyprint import PrintFormatGenerator

class ShippingError(Exception):
    pass

STATUS_SUBMITTED = 1

class MemberLetterShipping:
    def __init__(self, throw_on_error=False) -> None:
        self._throw_on_error = throw_on_error

    def get_matching_customers(self, letter):
        if letter.customer_table:
            customers = list(map(lambda x: x.customer, letter.customer_table))
			# 'date': ['>', '2019-09-08']
            return frappe.get_list("Customer", filters={"name": ["IN", customers]}, fields="*")

        if letter.target_customergroup:
            return frappe.get_list(
                "Customer", filters={"customer_group": letter.target_customergroup}
            )
        else:
            return []

    def default_head_exists(self):
        d = frappe.db.get_value(
				'Letter Head', 'Default Head', "*", as_dict=1
			)
        return d is not None

    def create_pdf(self, doctype, name, print_format, letterhead=None):
        doc = frappe.get_doc(doctype, name)
        doc.check_permission("print")
        generator = PrintFormatGenerator(print_format, doc, letterhead)
        pdf = generator.render_pdf()
        return pdf

    def attch_to_file(self, print_format, target_folder, sent_letter, filename):
        pdf = self.create_pdf(
            "Single Member Letter", sent_letter.name, print_format, "Default Head" if self.default_head_exists() else None
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
        for customer in customer_list:
            try:
                sent_letter = frappe.new_doc("Single Member Letter")
                sent_letter.customer = customer.name
                sent_letter.content = letter.content
                sent_letter.member_letter_shipment = letter.name
                sent_letter.description = letter.description
                sent_letter.target_folder = letter.target_folder
                sent_letter.print_format = letter.print_format

                sent_letter.save()
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

        if sent_letter.doctype != 'Single Member Letter':
            frappe.throw("sent_letter must be 'Single Member Letter'")

        try:
            target_folder = (
                sent_letter.target_folder if sent_letter.target_folder else "Home/letters"
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
                # sent_letter.save()

                self.add_attchment_to_customer(sent_letter.customer, [pdf.name])
            except Exception as error:
                if self._throw_on_error:
                    raise error
                else:
                    sent_letter.error_message = str(error)
                    sent_letter.success = False
                    # sent_letter.save()

        except Exception as error:
            frappe.log_error(error)
            frappe.throw("Error while sending", error)

    # def create_letters_with_pdf(self, letter):
    #     result = []
    #     customer_list = self.get_matching_customers(letter)
    #     for customer in customer_list:
    #         try:
    #             sent_letter = frappe.new_doc("Single Member Letter")
    #             sent_letter.customer = customer.name
    #             sent_letter.content = letter.content
    #             sent_letter.member_letter_shipment = letter.name
    #             sent_letter.description = letter.description
    #             sent_letter.save()

    #             target_folder = (
    #                 letter.target_folder if letter.target_folder else "Home/letters"
    #             )
    #             try:
    #                 pdf = self.attch_to_file(
    #                     letter.print_format,
    #                     target_folder,
    #                     sent_letter,
    #                     f"{letter.description}.pdf",
    #                 )
    #                 sent_letter.attachment = pdf.file_url
    #                 sent_letter.success = True

    #                 self.add_attchment_to_customer(customer.name, [pdf.name])
    #                 sent_letter.save()
    #             except Exception as error:
    #                 if self._throw_on_error:
    #                     raise error
    #                 else:
    #                     sent_letter.error_message = str(error)
    #                     sent_letter.success = False
    #                     sent_letter.save()

    #             result.append(sent_letter)
    #         except Exception as error:
    #             frappe.throw("Error while sending", error)
    #     return result
