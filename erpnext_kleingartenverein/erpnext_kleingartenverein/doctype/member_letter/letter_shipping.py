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
from datetime import datetime


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
