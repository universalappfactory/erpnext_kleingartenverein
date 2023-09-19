from erpnext_kleingartenverein.exceptions import BadRequestError
from erpnext_kleingartenverein.file_api import ensure_folder_exists
from erpnext_kleingartenverein.erpnext_kleingartenverein.doctype.member_letter_shipment.shipping import (
    MemberLetterShipping,
)

import frappe
import json
import chardet
from frappe import _
import base64
import json
from werkzeug.wrappers import Response


def decode(content) -> str:
    try:
        result = chardet.detect(content)
        return content.decode(result["encoding"])
    except Exception as error:
        print(error)

    try:
        return content.decode("utf-8")
    except UnicodeDecodeError as error:
        print(error)

    try:
        return content.decode("ISO-8859-1")
    except Exception as error:
        print(error)
        return content


# def parse_input(args, kwargs):
#     data = args[1]

#     content = data["data"]
#     decoded = decode(base64.urlsafe_b64decode(content))
#     data = json.loads(decoded)

#     if len(data["recipients"][0]) == 0:
#         frappe.throw("no recipients provided")

#     recipients = data["recipients"][0]
#     description = data["description"]
#     print_format = data["printFormat"]

#     return (data["content"], recipients, description, print_format)


def execute_publish(letter_names):
    for letter_name in letter_names:
        try:
            letter = frappe.get_doc("Single Member Letter", str(letter_name))
            letter.submit()
        except frappe.DoesNotExistError as e:
            frappe.log_error(e)
            raise e


def background_publish_letters(letter_names):
    enqueue_result = frappe.enqueue(
        execute_publish,
        letter_names=letter_names,
        queue="long",
        job_name=f"background_publish_letters",
    )
    return enqueue_result


# def create_print_preview(*args, **kwargs):
#     try:
#         (content, recipients, description, print_format) = parse_input(args, kwargs)

#         target_folder = ensure_folder_exists("/Home/Preview")

#         shipping = MemberLetterShipping(True)
#         pdf = shipping.create_preview(
#             recipients, content, print_format, target_folder
#         )

#         return pdf

#     except Exception as e:
#         print(e)
#         frappe.log_error(e)
#         return []


@frappe.whitelist(allow_guest=False)
def get_print_preview(*args, **kwargs):
    try:
        pdf = None  # create_print_preview(args, kwargs)
        if not pdf:
            return ""

        response = Response(pdf, content_type="application/pdf")
        response.headers["Content-Disposition"] = "inline; filename=preview.pdf"

        return response
    except Exception as error:
        frappe.log_error(error)
        raise BadRequestError()


def parse_print_input(kwargs):
    if not "data" in kwargs:
        return None

    data = kwargs["data"]

    if all(
        k not in data for k in ("content", "recipients", "description", "printFormat", "isPreview")
    ):
        raise BadRequestError()

    return (
        kwargs["data"]["content"],
        kwargs["data"]["recipients"],
        kwargs["data"]["description"],
        kwargs["data"]["printFormat"],
        kwargs["data"]["isPreview"],
    )


@frappe.whitelist(allow_guest=False)
def print_letters(*args, **kwargs):
    (content, recipients, description, printFormat, isPreview) = parse_print_input(kwargs)
    try:
        letters_to_print = []
        shipping = MemberLetterShipping(False)
        for recipient in recipients:
            letter = shipping.create_single_member_letter(
                recipient, content, printFormat, description, isPreview
            )
            letters_to_print.append(letter)

        frappe.db.commit()
        publish_result = background_publish_letters(letters_to_print)

        return {"id": publish_result.id, "letters": letters_to_print}
    except Exception as error:
        frappe.log_error(error)
        raise BadRequestError()


@frappe.whitelist(allow_guest=False)
def get_job_status(*args, **kwargs):
    if not "id" in kwargs:
        raise BadRequestError()

    try:
        id = kwargs["id"]
        try:
            doc = frappe.get_doc("RQ Job", id)
            return doc.status
        except frappe.DoesNotExistError:
            return ""
    except Exception as error:
        frappe.log_error(error)
        raise BadRequestError()


@frappe.whitelist(allow_guest=False)
def get_letters(*args, **kwargs):
    if not "letters" in kwargs:
        raise BadRequestError()
    try:
        letters = kwargs["letters"]

        result = []
        for letter in letters:
            doc = frappe.get_doc("Single Member Letter", letter)
            result.append({"name": doc.name, "attachment": doc.attachment})
        return result
    except Exception as error:
        frappe.log_error(error)
        raise BadRequestError()
