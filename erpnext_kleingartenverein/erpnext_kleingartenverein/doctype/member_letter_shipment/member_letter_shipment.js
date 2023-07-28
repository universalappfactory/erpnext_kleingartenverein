// Copyright (c) 2023, Kleingartenverein and contributors
// For license information, please see license.txt

frappe.ui.form.on('Member Letter Shipment', {

	member_letter_template(frm) {

		const selectedTemplate = frm.get_field('member_letter_template')
		if (!selectedTemplate || selectedTemplate.value === "") {
			return
		}

		const content = frm.get_field('content')
		if (content.value && content.value.trim() !== "") {
			frappe.confirm('The current content will be overwritten, proceed?', () => {
				const template = frm.get_field('member_letter_template')

				frappe.db.get_doc('Member Letter Template', template.value).then(doc => {
					frm.set_value('content', doc['content'])
				});
			},
			() => {})
		} else {
			const template = frm.get_field('member_letter_template')

			frappe.db.get_doc('Member Letter Template', template.value).then(doc => {
				frm.set_value('content', doc['content'])
			});
		}
	}

});
