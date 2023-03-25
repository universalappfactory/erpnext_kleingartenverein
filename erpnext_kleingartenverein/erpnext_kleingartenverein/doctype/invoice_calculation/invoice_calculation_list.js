frappe.listview_settings["Invoice Calculation"] = {
	onload: function (listview) {
		frappe.route_options = {
			status: "Open",
		}

		var method = "erpnext_kleingartenverein.api.execute_invoice_calculation"

		listview.page.add_action_item(__("Create invoice drafts"), function () {
			listview.call_for_selected_items(method, { status: "Open" })
		})
	},
}
