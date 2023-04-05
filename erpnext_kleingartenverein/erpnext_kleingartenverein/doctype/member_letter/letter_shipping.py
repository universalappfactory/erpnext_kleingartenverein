import requests
import frappe
import base64
import hashlib
from datetime import datetime
from erpnext_kleingartenverein.erpnext_kleingartenverein.doctype.sent_member_letter.sent_member_letter import (
    SentMemberLetter,
)
from erpnext_kleingartenverein.erpnext_kleingartenverein.doctype.member_letter.member_letter import (
    MemberLetter,
)
from frappe.utils.weasyprint import PrintFormatGenerator, download_pdf
from frappe import _
from frappe.utils.file_manager import add_attachments
from frappe.desk.doctype.tag.tag import add_tags


class ShippingError(Exception):
    pass


class LetterxpressShipping:
    """
    API client for https://www.letterxpress.de/

    the idea is to send postal letters via this service
    """

    def ship_pdf(self, pdf):
        try:
            endpoint = "https://api.letterxpress.de/v2/printjobs"

            api_key = frappe.conf.letter_express_api_key
            api_user = frappe.conf.letter_express_user

            if not api_key or not api_user:
                raise ShippingError("no credentials provided")

            auth = {"username": api_user, "apikey": api_key, "mode": "test"}

            b64 = base64.b64encode(pdf).decode("utf-8")
            md5 = hashlib.md5(b64.encode("utf-8")).hexdigest()

            letter = {
                "base64_file": b64,
                "base64_file_checksum": md5,
                "specification": {
                    "color": "1",
                    "mode": "simplex",
                    "shipping": "national",
                    "c4": 0,
                },
            }

            data = {"auth": auth, "letter": letter}

            headers = {"Content-Type": "application/json"}

            r = requests.post(url=endpoint, json=data, headers=headers)
            print(r)
        except Exception as error:
            raise ShippingError()

    def ship_letter(self, letter: SentMemberLetter):
        self.download_pdf(
            "Sent Member Letter", letter.name, "Sent Letter", "Default Head"
        )


class LetterShipping:
    def __init__(self, throw_on_error=False) -> None:
        self._throw_on_error = throw_on_error

    def get_matching_customers(self, letter):
        if letter.customer:
            return frappe.get_list("Customer", filters={"name": letter.customer})

        if letter.target_customergroup:
            return frappe.get_list(
                "Customer", filters={"customer_group": letter.target_customergroup}
            )
        else:
            return []

    def create_pdf(self, doctype, name, print_format, letterhead=None):
        doc = frappe.get_doc(doctype, name)
        doc.check_permission("print")
        generator = PrintFormatGenerator(print_format, doc, letterhead)
        pdf = generator.render_pdf()
        return pdf

    def attch_to_file(self, print_format, target_folder, sent_letter, filename):
        pdf = self.create_pdf(
            "Sent Member Letter", sent_letter.name, print_format, "Default Head"
        )
        return frappe.get_doc(
            {
                "doctype": "File",
                "attached_to_doctype": "Sent Member Letter",
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

    def create_letters(self, letter: MemberLetter, customer_list, tags=None):
        result = []
        for customer in customer_list:
            try:
                sent_letter = frappe.new_doc("Sent Member Letter")
                sent_letter.sent_date = datetime.now().date()
                sent_letter.success = False
                sent_letter.member_letter = letter.name
                sent_letter.customer = customer.name
                sent_letter.save()

                cst = frappe.get_doc("Customer", customer.name)

                target_folder = (
                    letter.target_folder if letter.target_folder else "Home/letters"
                )
                try:
                    pdf = self.attch_to_file(
                        letter.print_format,
                        target_folder,
                        sent_letter,
                        f"{letter.description}.pdf",
                    )
                    sent_letter.attachment = pdf.file_url
                    sent_letter.success = True

                    self.add_attchment_to_customer(customer.name, [pdf.name])
                    sent_letter.save()

                    if tags:
                        add_tags(tags, "Customer", [customer.name])
                except Exception as error:
                    if self._throw_on_error:
                        raise error
                    else:
                        sent_letter.error_message = str(error)
                        sent_letter.success = False
                        sent_letter.save()

                result.append(sent_letter)
            except Exception as error:
                frappe.throw("Error while sending", error)
        return result

    def ship_letter(self, letter: MemberLetter):
        raise NotImplementedError("ship_letter")
        # customers  = self.get_matching_customers(letter)
        # letters = self.create_letters(letter, customers)
        # for letter in letters:
        #     self._shipment_adapter.ship_letter(letter)
