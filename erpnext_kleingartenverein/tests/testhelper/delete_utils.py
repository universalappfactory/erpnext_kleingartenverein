import frappe


def try_delete(action):
    try:
        action()
    except Exception as error:
        print(error)


def try_delete_list(document_type_name):
    try:
        items = frappe.get_list(document_type_name)
        for item in items:
            try:
                doc = frappe.get_doc(document_type_name, item.name)
                doc.delete()
            except Exception as error:
                print(error)
    except Exception as error:
        print(error)
