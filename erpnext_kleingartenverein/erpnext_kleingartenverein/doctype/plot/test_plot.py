# Copyright (c) 2023, Kleingartenverein and Contributors
# See license.txt

# import frappe
import frappe
from datetime import date
from frappe.exceptions import DoesNotExistError, MandatoryError, ValidationError
from frappe.tests.utils import FrappeTestCase


class TestPlot(FrappeTestCase):

	def setUp(self):
		try:
			plot = frappe.get_doc('Plot', 'Plot-MyPlot1')
			if plot:
				plot.delete()
		except DoesNotExistError:
			pass

	def test_required_fields(self):
		plot = frappe.new_doc('Plot')

		with self.assertRaises(MandatoryError) as context:
			plot.save()

		self.assertTrue('plot_number' in str(context.exception))

	def test_that_valid_plot_can_be_saved(self):
		plot = frappe.new_doc('Plot')
		plot.plot_number = 'MyPlot1'
		plot.save()
		self.assertIsNotNone(plot.name)

	def test_that_counter_table_must_have_unique_years(self):
		plot = frappe.new_doc('Plot')
		plot.plot_number = 'MyPlot1'

		row1 = frappe.new_doc('Counter Table')
		row1.date = date(2022,1,16)
		row1.counter_value = 22.5
		row1.counter_number = 'ABC'
		plot.water_meter_table.append(row1)

		row2 = frappe.new_doc('Counter Table')
		row2.date = date(2022,12,16)
		row2.counter_value = 28.5
		row2.counter_number = 'ABC'
		plot.water_meter_table.append(row2)

		with self.assertRaises(ValidationError) as context:
			plot.save()
		self.assertTrue('Year 2022 has multiple entries.' in str(context.exception))

	def test_that_plot_can_be_saved_when_counter_year_is_unique(self):
		plot = frappe.new_doc('Plot')
		plot.plot_number = 'MyPlot1'

		row1 = frappe.new_doc('Counter Table')
		row1.date = date(2022,1,16)
		row1.counter_value = 22.5
		row1.counter_number = 'ABC'
		plot.water_meter_table.append(row1)

		row2 = frappe.new_doc('Counter Table')
		row2.date = date(2023,12,16)
		row2.counter_value = 28.5
		row2.counter_number = 'ABC'
		plot.water_meter_table.append(row2)

		plot.save()

		self.assertEqual(len(plot.water_meter_table), 2)

	def test_that_counter_validation_can_handle_string_dates(self):
		plot = frappe.new_doc('Plot')
		plot.plot_number = 'MyPlot1'

		row1 = frappe.new_doc('Counter Table')
		row1.date = '2023-03-13'
		row1.counter_value = 22.5
		row1.counter_number = 'ABC'
		plot.water_meter_table.append(row1)

		row2 = frappe.new_doc('Counter Table')
		row2.date = '2024-04-13'
		row2.counter_value = 28.5
		row2.counter_number = 'ABC'
		plot.water_meter_table.append(row2)

		plot.save()

		self.assertEqual(len(plot.water_meter_table), 2)

	def test_that_plot_can_be_saved_when_different_counters_having_the_same_year(self):
		plot = frappe.new_doc('Plot')
		plot.plot_number = 'MyPlot1'

		row1 = frappe.new_doc('Counter Table')
		row1.date = date(2023,1,16)
		row1.counter_value = 22.5
		row1.counter_number = 'ABC'
		plot.water_meter_table.append(row1)

		row2 = frappe.new_doc('Counter Table')
		row2.date = date(2023,12,16)
		row2.counter_value = 28.5
		row2.counter_number = '123'
		plot.water_meter_table.append(row2)

		plot.save()

		self.assertEqual(len(plot.water_meter_table), 2)

	def test_that_counter_values_of_single_counter_must_increase_over_years(self):
		plot = frappe.new_doc('Plot')
		plot.plot_number = 'MyPlot1'

		row1 = frappe.new_doc('Counter Table')
		row1.date = date(2022,12,15)
		row1.counter_value = 22.5
		row1.counter_number = 'ABC'
		plot.water_meter_table.append(row1)

		row2 = frappe.new_doc('Counter Table')
		row2.date = date(2023,12,16)
		row2.counter_value = 12.2
		row2.counter_number = 'ABC'
		plot.water_meter_table.append(row2)

		with self.assertRaises(ValidationError) as context:
			plot.save()
		self.assertTrue("Counter 'ABC' has decresing values" in str(context.exception))
