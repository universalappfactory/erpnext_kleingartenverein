import frappe
import os
import csv


def apply_row_templates(file, template_str):
    try:
        full_path = file.get_full_path()

        if not os.path.exists(full_path):
            raise FileNotFoundError()

        result = []
        with open(full_path, "r") as fp:
            for line in fp:
                context = frappe._dict()
                context["line"] = line
                r = frappe.render_template(template_str, context, False, True)
                if r != "":
                    result.append(r + "\n")

        with open(full_path, "w") as fp:
            fp.writelines(result)

    except Exception as e:
        frappe.throw("error in apply_row_templates")
