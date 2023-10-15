import frappe
from frappe import _
from erpnext_kleingartenverein.utils.decorators import check_permission
from erpnext_kleingartenverein.utils.tenant_search import TenantSearch


@frappe.whitelist(allow_guest=False)
@check_permission
def get_dashboard_navigation():
    user = frappe.session.user
    if not user or user == "Guest":
        frappe.throw(_("Not permitted"), frappe.PermissionError)

    roles = frappe.get_roles(user)

    if not "MemberDashboard" in roles:
        frappe.throw(_("Not permitted"), frappe.PermissionError)

    try:
        club_settings = frappe.get_last_doc("Club Settings")

        naviation = []
        for entry in club_settings.dashboard_menu_entries:
            naviation.append(
                {
                    "displayTitle": _(entry.description),
                    "href": entry.path,
                    "icon": entry.icon,
                    "mode": f"NavigationMode.{entry.mode}",
                    "read_marker_doctype": entry.read_marker_doctype,
                }
            )
        return naviation
    except Exception as e:
        frappe.log_error(e)
        return []


@frappe.whitelist(allow_guest=False)
@check_permission
def get_unread_document_count():
    user = frappe.session.user
    if not user or user == "Guest":
        frappe.throw(_("Not permitted"), frappe.PermissionError)

    roles = frappe.get_roles(user)
    try:
        data = frappe.db.sql(
            """
        SELECT DISTINCT(mapping.document_type) AS doctype, marker.document_link AS document, COUNT(mapping.document_type) AS count FROM `tabRead Marker Mapping` mapping
            JOIN `tabRead Marker` marker
            ON marker.document_type = mapping.document_type
            LEFT JOIN `tabRead Marker Entry`  entry
            ON entry.user_link = %s AND entry.parent = marker.name
            WHERE  entry.user_link IS NULL AND mapping.role_link IN (%s)
            GROUP BY mapping.document_type, marker.document_link
        """
            % ("%s", ", ".join(["%s"] * len(roles))),
            tuple([user] + roles),
            as_dict=1,
        )

        return data
    except Exception as e:
        frappe.log_error(e)
        return []


@frappe.whitelist(allow_guest=False)
@check_permission
def get_user_info():
    user = frappe.session.user
    if not user or user == "Guest":
        frappe.throw(_("Not permitted"), frappe.PermissionError)

    roles = frappe.get_roles(user)
    if not "MemberDashboard" in roles:
        frappe.throw(_("Not permitted"), frappe.PermissionError)

    try:
        user = frappe.get_doc("User", frappe.session.user)

        club_settings = frappe.get_last_doc("Club Settings")

        return {
            "user": frappe.session.user,
            "email": user.email,
            "dashboard_message": club_settings.dashboard_message,
            "default_logo": club_settings.default_logo,
        }
    except Exception as e:
        frappe.log_error(e)


@frappe.whitelist(allow_guest=False)
@check_permission
def mark_as_read(*args, **kwargs):
    try:
        user = frappe.session.user
        if not user or user == "Guest":
            frappe.throw(_("Not permitted"), frappe.PermissionError)

        marker = frappe.get_last_doc(
            "Read Marker",
            filters={
                "document_type": kwargs["doctype"],
                "document_link": kwargs["name"],
            },
        )
        marker.mark_as_read(user)
        marker.save()
    except Exception as e:
        frappe.log_error(e)
        return []


def to_plot_tag(plot):
    r = {"name": plot["name"], "tags": plot["_user_tags"].strip(",").split(",")}
    return r


@frappe.whitelist(allow_guest=False)
@check_permission
def get_plot_tags(*args, **kwargs):
    try:
        plot_tags = frappe.db.sql(
            """
            SELECT name, _user_tags FROM `tabPlot` WHERE _user_tags IS NOT NULL; 
            """,
            as_dict=1,
        )

        return list(map(lambda x: to_plot_tag(x), plot_tags))
    except Exception as e:
        print(e)
        frappe.log_error(e)
        return []


@frappe.whitelist(allow_guest=False)
@check_permission
def search_tenants(*args, **kwargs):
    try:
        ts = TenantSearch(index_name="tenants")
        # ts.build()
        query = kwargs["query"]

        if "filter" in kwargs:
            filter = kwargs["filter"]
            ts.apply_filter(filter)

        if len(query) > 0 and query[-1] != "*":
            query = query + "*"

        search_result = ts.search(query, limit=500)

        customers = frappe.get_list(
            "Customer",
            filters={
                "name": ["IN", search_result],
            },
            fields="*",
            order_by="plot_link",
        )

        return customers
    except Exception as e:
        print(e)
        frappe.log_error(e)
        return []


@frappe.whitelist()
@check_permission
def get_read_info(*args, **kwargs):
    if not "document_type_name" in kwargs:
        return []

    if not "documents" in kwargs:
        return []

    user = frappe.session.user
    if not user or user == "Guest":
        frappe.throw(_("Not permitted"), frappe.PermissionError)

    try:
        data = frappe.db.sql(
            """
        SELECT * FROM `tabRead Marker` rm 
            JOIN `tabRead Marker Entry` entry ON entry.parent = rm.name AND entry.user_link = %s
            WHERE document_type=%s AND document_link IN (%s)
        """
            % ("%s", "%s", ", ".join(["%s"] * len(kwargs["documents"]))),
            tuple([user, kwargs["document_type_name"]] + kwargs["documents"]),
            as_dict=1,
        )

        return data
    except Exception as e:
        frappe.log_error(e)
        return []


@frappe.whitelist(allow_guest=False)
@check_permission
def get_all(*args, **kwargs):
    try:
        r = frappe.get_all(
            kwargs["doctype"], fields=kwargs["fields"], filters=kwargs["filters"]
        )
        return r
    except Exception as e:
        frappe.log_error(e)
        return []


@frappe.whitelist(allow_guest=False)
@check_permission
def get_tenant_data(*args, **kwargs):
    try:
        result = {}

        tenant = frappe.get_doc("Customer", kwargs["name"])
        result["tenant"] = tenant.as_dict()

        if tenant.plot_link:
            plot = frappe.get_doc("Plot", tenant.plot_link)
            result["plot"] = plot.as_dict()

        if tenant.customer_primary_address:
            plot = frappe.get_doc("Address", tenant.customer_primary_address)
            result["address"] = plot.as_dict()

        if tenant.customer_primary_contact:
            plot = frappe.get_doc("Contact", tenant.customer_primary_contact)
            result["contact"] = plot.as_dict()

        files = frappe.get_all(
            "File",
            filters={
                "attached_to_name": kwargs["name"],
            },
            order_by="modified desc",
            fields=["file_url", "file_name"],
        )

        result["files"] = files

        attachments = frappe.get_all(
            "Attachment table",
            filters={
                "parenttype": "Customer",
                "parent": kwargs["name"],
            },
            order_by="modified desc",
            fields=["attachment", "attachment_description"],
        )

        result["attachments"] = attachments

        if tenant.plot_link:
            plot_files = frappe.get_all(
                "File",
                filters={
                    "attached_to_name": tenant.plot_link,
                },
                order_by="modified desc",
                fields=["file_url", "file_name"],
            )

            result["plot_files"] = plot_files

            plot_attachments = frappe.get_all(
                "Attachment table",
                filters={
                    "parenttype": "Plot",
                    "parent": tenant.plot_link,
                },
                order_by="modified desc",
                fields=["attachment", "attachment_description"],
            )

            result["plot_attachments"] = plot_attachments

        return [result]
    except Exception as e:
        frappe.log_error(e)
        return []

def map_tag(input):
    return {"value": input["name"], "description": input["name"], "name": input["name"]}

@frappe.whitelist(allow_guest=False)
@check_permission
def get_tenant_tags():
    user = frappe.session.user
    if not user or user == "Guest":
        frappe.throw(_("Not permitted"), frappe.PermissionError)

    try:
        tenant_tags = frappe.db.sql(
            """
            with recursive cte as (
                select _user_tags as name, concat(_user_tags, ',') as names, 1 as lev
                from `tabCustomer`
                union all
                select substring_index(names, ',', 1),
                        substr(names, instr(names, ',') + 1), lev + 1
                from cte
                where names like '%,%'
                )
            select DISTINCT(name)
            from cte
            where lev > 1 AND name <> ''
        """,
            as_dict=1,
        )

        plot_tags = frappe.db.sql(
            """
            with recursive cte as (
                select _user_tags as name, concat(_user_tags, ',') as names, 1 as lev
                from `tabPlot`
                union all
                select substring_index(names, ',', 1),
                        substr(names, instr(names, ',') + 1), lev + 1
                from cte
                where names like '%,%'
                )
            select DISTINCT(name)
            from cte
            where lev > 1 AND name <> ''
        """,
            as_dict=1,
        )

        result = list(map(lambda x: map_tag(x), tenant_tags)) + list(
            map(lambda x: map_tag(x), plot_tags)
        )
        return sorted(result, key=lambda x: x['description'].lower())
    except Exception as e:
        frappe.log_error(e)
        return []