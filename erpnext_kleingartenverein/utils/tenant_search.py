import frappe
from frappe.search.full_text_search import FullTextSearch, FuzzyTermExtended
from whoosh.fields import ID, TEXT, KEYWORD, NUMERIC, Schema
from whoosh.qparser import FieldsPlugin, MultifieldParser, WildcardPlugin
from whoosh.query import FuzzyTerm, Prefix

class TenantSearch(FullTextSearch):
    DEFAULT_FIELDS = [
        "name",
        "customer_name",
        "customer_type",
        "customer_group",
        "email_id",
        "plot_number_numeric",
        # "keywords",
    ]

    def get_schema(self):
        return Schema(
            name=TEXT(stored=True),
            customer_name=TEXT(stored=False),
            customer_type=ID(stored=False),
            customer_group=TEXT(stored=False),
            mobile_no=TEXT(stored=False),
            email_id=TEXT(stored=False),
            keywords=KEYWORD(stored=False),
            plot_number=TEXT(stored=False),
            plot_number_numeric=NUMERIC(stored=False),
            plot_status=TEXT(stored=False),
        )

    def get_fields_to_search(self):
        return TenantSearch.DEFAULT_FIELDS

    def get_all_tenants(self):
        return frappe.get_list("Customer", fields=["name"])

    def get_items_to_index(self):
        docs = []
        for tenant in self.get_all_tenants():
            doc = frappe.get_doc("Customer", tenant.name)
            docs.append(self.get_document_to_index(doc))
        return docs

    def get_document_to_index(self, tenant):
        r = self.get_tenant_data(tenant) | self.get_plot_data(tenant)
        return frappe._dict(r)

    def get_tenant_data(self, tenant):
        return {
            "name": tenant.name,
            "customer_name": tenant.customer_name,
            "customer_type": tenant.customer_type,
            "customer_group": tenant.customer_group,
            "mobile_no": tenant.mobile_no,
            "email_id": tenant.email_id,
            "keywords": "",
        }

    def try_get_numeric_plot_number(self, plot_number):
        if not plot_number:
            return None
        try:
            return int(plot_number)
        except ValueError:
            return None

    def get_plot_data(self, tenant):
        if tenant.plot_link:
            plot = frappe.get_doc("Plot", tenant.plot_link)
            return {
                "plot_number": plot.plot_number,
                "plot_number_numeric": self.try_get_numeric_plot_number(
                    plot.plot_number
                ),
                "plot_status": plot.plot_status
            }

        return {}

    def get_tenant_keywords(self, tenant):
        result = []
        if not tenant:
            return None

        if tenant.plot_link:
            plot = frappe.get_doc("Plot", tenant.plot_link)
            result.append(tenant.plot_link.split("-")[1])

        return result

    def parse_result(self, result):
        return result["name"]
    
    def search(self, text, scope=None, limit=20):
        """Search from the current index

        Args:
                text (str): String to search for
                scope (str, optional): Scope to limit the search. Defaults to None.
                limit (int, optional): Limit number of search results. Defaults to 20.

        Returns:
                [List(_dict)]: Search results
        """
        ix = self.get_index()

        results = None
        out = []

        search_fields = self.get_fields_to_search()
        fieldboosts = {}

        # apply reducing boost on fields based on order. 1.0, 0.5, 0.33 and so on
        for idx, field in enumerate(search_fields, start=1):
            fieldboosts[field] = 1.0 / idx

        with ix.searcher() as searcher:
            parser = MultifieldParser(
                search_fields, ix.schema, termclass=FuzzyTermExtended, fieldboosts=fieldboosts
            )
            parser.remove_plugin_class(FieldsPlugin)
            # parser.remove_plugin_class(WildcardPlugin)
            query = parser.parse(text)

            filter_scoped = None
            if scope:
                filter_scoped = Prefix(self.id, scope)
            results = searcher.search(query, limit=limit, filter=filter_scoped)

            for r in results:
                out.append(self.parse_result(r))

        return out
