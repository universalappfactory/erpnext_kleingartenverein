frappe.listview_settings["Plot"] = {
	colwidths: { subject: 6 },
	add_fields: ["priority"],
	onload: function (listview) {
		// frappe.route_options = {
		// 	status: "Open",
		// }

		// var method = "erpnext_kleingartenverein.api.execute_function"

		// listview.page.add_action_item(__("Set as Open"), function () {
		// 	listview.call_for_selected_items(method, { status: "Open" })
		// })

		// listview.page.add_action_item(__("Set as Closed"), function () {
		// 	listview.call_for_selected_items(method, { status: "Closed" })
		// })
	},

	get_indicator: function (doc) {

		if (doc.plot_status == 'Under supervision') {
            return [__("Under supervision"), "red", "plot_status,=,Under supervision"];
        } else if (doc.plot_status == 'Not under lease') {
            return [__("Not under lease"), "orange", "plot_status,=,Not under lease"];
        }
		else if (doc.plot_status == 'Under Lease') {
            return [__("Under Lease"), "green", "plot_status,=,Under Lease"];
        }
		else if (doc.plot_status == 'Canceled by lessee') {
            return [__("Canceled by lessee"), "yellow", "plot_status,=,Canceled by lessee"];
        }
		else if (doc.plot_status == 'Canceled by club') {
            return [__("Canceled by club"), "blue", "plot_status,=,Canceled by club"];
        }
	},
}
