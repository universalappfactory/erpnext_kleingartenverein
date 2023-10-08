from os import path
import frappe
import mimetypes
from pathlib import Path
from erpnext_kleingartenverein.utils.decorators import check_permission
from erpnext_kleingartenverein.exceptions import BadRequestError
from erpnext_kleingartenverein.file_api import (
    get_yearly_customer_folder,
    get_guest_folder,
)
from datetime import datetime
import puremagic


@frappe.whitelist(allow_guest=True)
@check_permission
def upload_counter_value(*args, **kwargs):
    try:
        print('upload_counter_value')
        file = frappe.request.files["file"]

        mimetype = mimetypes.guess_type(file.filename)[0]
        if not mimetype.startswith("image") :
            raise BadRequestError()

        mime_result = puremagic.magic_stream(file.stream)
        faulted = True
        for item in mime_result:
            if item.mime_type.startswith("image") :
                faulted = False

        if faulted:
            raise BadRequestError()

        content = file.stream.read()


        counter_value = float(frappe.request.form["additionalData[counterValue]"])
        plot = frappe.request.form["additionalData[plot]"]
        tenant = str(frappe.request.form["additionalData[tenant]"])

        extension = path.splitext(file.filename)[1][1:]

        if counter_value <= 0:
            raise BadRequestError()

        if tenant.lstrip().rstrip() == "":
            raise BadRequestError()

        plots = frappe.get_all("Plot", filters={"plot_number": plot}, fields=["*"])
        if len(plots) != 1:
            raise BadRequestError()

        plot = plots[0]

        recent_values = frappe.db.sql(
            """
            SELECT * FROM `tabCounter Table` WHERE parent = %s AND (Year(CURRENT_DATE)-1 = YEAR(date) OR Year(CURRENT_DATE) = YEAR(date)) ORDER BY date desc
            """,
            plot["name"],
            as_dict=1,
        )

        recent_value = 0
        counter_number = ""
        if len(recent_values) > 0:
            recent_value = recent_values[0].counter_value
            counter_number = recent_values[0].counter_number

        now = datetime.now()
        date = now.strftime("%Y-%m-%d-%H-%M")

        save_path = get_guest_folder()
        filename = f'counter_upload_{plot["customer"]}_{date}_.{extension}'

        

        file_doc = frappe.new_doc('File')
        file_doc.folder = save_path
        file_doc.file_name = filename
        file_doc.is_private = 1
        file_doc.content = content
        file_doc.flags = frappe._dict(
            {
                "ignore_existing_file_check": True,
            }
        )
        file_doc.save(ignore_permissions=True)

        submission = frappe.get_doc(
            {
                "doctype": "Counter Submission",
                "customer": plot["customer"],
                "given_name": tenant,
                "submission_date": now,
                "plot": plot["name"],
                "value": counter_value,
                "recent_value": recent_value,
                "counter_number": counter_number,
                "is_suspicious": 0,
                "picture": file_doc.file_url,
                "doc_status": 0,
            }
        ).save()

        # raise Exception('xx')
        return {"success": True}
    except Exception as e:
        frappe.log_error(e)
        raise BadRequestError()


@frappe.whitelist(allow_guest=True)
@check_permission
def get_plot_list(*args, **kwargs):
    try:
        result = frappe.get_all("Plot", fields=["plot_number"])
        return sorted(
            filter(lambda x: x.plot_number != "999", result),
            key=lambda x: x.plot_number,
        )
    except Exception as e:
        print(e)
        frappe.log_error(e)
        return []
