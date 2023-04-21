import frappe
from frappe import _
from erpnext_kleingartenverein.setup.install import add_teamwork_work_tasks_table


def execute():
    try:
        add_teamwork_work_tasks_table()
    except BaseException:
        pass
