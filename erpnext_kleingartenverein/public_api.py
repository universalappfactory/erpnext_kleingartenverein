import frappe
from erpnext_kleingartenverein.utils.decorators import check_permission
from erpnext_kleingartenverein.exceptions import BadRequestError


@frappe.whitelist(allow_guest=True)
@check_permission
def upload_counter_value(*args, **kwargs):
    try:
        for x in frappe.request.files:
            print(x)

        file = frappe.request.files["file"]

        counter_value = float(frappe.request.form["additionalData[counterValue]"])
        plot = frappe.request.form["additionalData[plot]"]
        tenant = str(frappe.request.form["additionalData[tenant]"])

        result = frappe.get_all(
            "Plot", filters={"plot_number": plot}, fields=["*"]
        )

        if len(result) != 1:
            raise BadRequestError()
        
        if counter_value <= 0:
            raise BadRequestError()
        
        if tenant.lstrip().rstrip() == '':
            raise BadRequestError()

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
