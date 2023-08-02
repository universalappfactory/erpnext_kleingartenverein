import frappe
from frappe.search.full_text_search import FullTextSearch
from whoosh.fields import ID, TEXT, Schema


class TenantSearch(FullTextSearch):
    def get_schema(self):
        return Schema(
            name=TEXT(stored=True),
            customer_name=TEXT(stored=True),
            customer_type=ID(stored=True),
            customer_group=TEXT(stored=True),
            mobile_no=TEXT(stored=True),
            email_id=TEXT(stored=True),
        )

    def get_fields_to_search(self):
        return ["name", "customer_name", "customer_type", "customer_group", "mobile_no", "email_id"]

    def get_all_tenants(self):
        return frappe.get_list("Customer", fields=["name", "customer_name", "customer_type", "customer_group", "mobile_no", "email_id"])

    def get_items_to_index(self):
        docs = []
        for tenant in self.get_all_tenants():
            docs.append(self.get_document_to_index(tenant))
        return docs

    def get_document_to_index(self, tenant):
        # blog = frappe.get_doc("Blog Post", name)
        return frappe._dict(tenant)

    def parse_result(self, result):
        return result["name"]
