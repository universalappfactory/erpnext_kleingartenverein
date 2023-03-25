frappe.listview_settings["Member Letter"] = {
	// colwidths: { subject: 6 },
	// add_fields: ["priority"],
	onload: function (listview) {
		frappe.route_options = {
			status: "Open",
		}

		var method = "erpnext_kleingartenverein.api.execute_member_letter_shipping"

		listview.page.add_action_item(__("Ship letters"), function () {
			listview.call_for_selected_items(method, { status: "Open" })
		})

		var method = "erpnext_kleingartenverein.api.execute_create_letters"

		listview.page.add_action_item(__("Create letters"), function () {
			listview.call_for_selected_items(method, { status: "Open" })
		})
	},

	// get_indicator: function (doc) {

	// 	if (doc.status == 'Unter beobachtung') {
    //         return [__("Unter Beobachtung"), "red"];
    //     } else {
    //         return [__("Verpachtet"), "green", "status,=,Verpachtet"];
    //     }

	// 	// if (doc.status === "Open") {
	// 	// 	if (!doc.priority) doc.priority = "Medium"
	// 	// 	const color = {
	// 	// 		Low: "yellow",
	// 	// 		Medium: "orange",
	// 	// 		High: "red",
	// 	// 	}
	// 	// 	return [
	// 	// 		__(doc.status),
	// 	// 		color[doc.priority] || "red",
	// 	// 		`status,=,Open`,
	// 	// 	]
	// 	// } else if (doc.status === "Closed") {
	// 	// 	return [__(doc.status), "green", "status,=," + doc.status]
	// 	// } else {
	// 	// 	return [__(doc.status), "gray", "status,=," + doc.status]
	// 	// }
	// },
}
