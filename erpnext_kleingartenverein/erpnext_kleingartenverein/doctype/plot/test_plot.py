# Copyright (c) 2023, Kleingartenverein and Contributors
# See license.txt

# import frappe
import frappe
from datetime import date, timedelta
from frappe.exceptions import DoesNotExistError, MandatoryError, ValidationError
from frappe.tests.utils import FrappeTestCase

test_records = frappe.get_test_records("Plot")
test_dependencies = []
test_ignore = ["Customer", "Warehouse"]


class TestPlot(FrappeTestCase):
    def setUp(self):
        try:
            plot = frappe.get_doc("Plot", "Plot-MyPlot1")
            if plot:
                plot.delete()
        except DoesNotExistError:
            pass

        customer = frappe.get_doc("Customer", "Former Tenant Customer")
        customer.customer_group = "Tenant"
        customer.save()

        customer = frappe.get_doc("Customer", "New Tenant")
        customer.customer_group = "Test CustomerGroup"
        customer.save()

        plot_list = frappe.get_list("Plot")
        for plot in plot_list:
            doc = frappe.get_doc("Plot", plot)
            doc.customer = None
            doc.save()

    @staticmethod
    def create_plot(plot_number, customer_name=None, teanant_since=None):
        try:
            plot = frappe.get_doc("Plot", f"Plot-{plot_number}")
            if plot:
                plot.delete()
        except DoesNotExistError:
            pass

        plot = frappe.new_doc("Plot")
        plot.plot_number = plot_number
        if customer_name:
            plot.customer = customer_name

            if teanant_since:
                new_entry = frappe.new_doc("Former Tenant Table")
                new_entry.from_date = teanant_since
                new_entry.customer_link = customer_name
                plot.append("former_tenants_table", new_entry)

        plot.save()
        return plot

    def test_required_fields(self):
        plot = frappe.new_doc("Plot")

        with self.assertRaises(MandatoryError) as context:
            plot.save()

        self.assertTrue("plot_number" in str(context.exception))

    def test_that_valid_plot_can_be_saved(self):
        plot = frappe.new_doc("Plot")
        plot.plot_number = "MyPlot1"
        plot.save()
        self.assertIsNotNone(plot.name)

    def test_that_plot_can_be_saved_when_counter_year_is_unique(self):
        plot = frappe.new_doc("Plot")
        plot.plot_number = "MyPlot1"

        row1 = frappe.new_doc("Counter Table")
        row1.date = date(2022, 1, 16)
        row1.counter_value = 22.5
        row1.counter_number = "ABC"
        plot.water_meter_table.append(row1)

        row2 = frappe.new_doc("Counter Table")
        row2.date = date(2023, 12, 16)
        row2.counter_value = 28.5
        row2.counter_number = "ABC"
        plot.water_meter_table.append(row2)

        plot.save()

        self.assertEqual(len(plot.water_meter_table), 2)

    def test_that_counter_validation_can_handle_string_dates(self):
        plot = frappe.new_doc("Plot")
        plot.plot_number = "MyPlot1"

        row1 = frappe.new_doc("Counter Table")
        row1.date = "2023-03-13"
        row1.counter_value = 22.5
        row1.counter_number = "ABC"
        plot.water_meter_table.append(row1)

        row2 = frappe.new_doc("Counter Table")
        row2.date = "2024-04-13"
        row2.counter_value = 28.5
        row2.counter_number = "ABC"
        plot.water_meter_table.append(row2)

        plot.save()

        self.assertEqual(len(plot.water_meter_table), 2)

    def test_that_plot_can_be_saved_when_different_counters_having_the_same_year(self):
        plot = frappe.new_doc("Plot")
        plot.plot_number = "MyPlot1"

        row1 = frappe.new_doc("Counter Table")
        row1.date = date(2023, 1, 16)
        row1.counter_value = 22.5
        row1.counter_number = "ABC"
        plot.water_meter_table.append(row1)

        row2 = frappe.new_doc("Counter Table")
        row2.date = date(2023, 12, 16)
        row2.counter_value = 28.5
        row2.counter_number = "123"
        plot.water_meter_table.append(row2)

        plot.save()

        self.assertEqual(len(plot.water_meter_table), 2)

    def test_that_counter_values_of_single_counter_must_increase_over_years(self):
        plot = frappe.new_doc("Plot")
        plot.plot_number = "MyPlot1"

        row1 = frappe.new_doc("Counter Table")
        row1.date = date(2022, 12, 15)
        row1.counter_value = 22.5
        row1.counter_number = "ABC"
        plot.water_meter_table.append(row1)

        row2 = frappe.new_doc("Counter Table")
        row2.date = date(2023, 12, 16)
        row2.counter_value = 12.2
        row2.counter_number = "ABC"
        plot.water_meter_table.append(row2)

        with self.assertRaises(ValidationError) as context:
            plot.save()
        self.assertTrue("Counter 'ABC' has decresing values" in str(context.exception))

    def test_that_mounting_date_must_be_unique_per_counter_number(self):
        plot = frappe.new_doc("Plot")
        plot.plot_number = "MyPlot1"

        row1 = frappe.new_doc("Counter Table")
        row1.date = date(2022, 12, 15)
        row1.mounting_date = date(2021, 3, 15)
        row1.counter_value = 22.5
        row1.counter_number = "ABC"
        plot.water_meter_table.append(row1)

        row2 = frappe.new_doc("Counter Table")
        row2.date = date(2023, 12, 16)
        row2.mounting_date = date(2021, 3, 14)
        row2.counter_value = 25
        row2.counter_number = "ABC"
        plot.water_meter_table.append(row2)

        with self.assertRaises(ValidationError) as context:
            plot.save()
        self.assertTrue(
            "Counter Number 'ABC' has multiple mounting dates."
            in str(context.exception)
        )

    def test_that_a_new_counter_can_be_mounted_over_the_year(self):
        plot = frappe.new_doc("Plot")
        plot.plot_number = "MyPlot1"

        row1 = frappe.new_doc("Counter Table")
        row1.date = date(2022, 12, 15)
        row1.mounting_date = date(2021, 3, 15)
        row1.counter_value = 22.5
        row1.counter_number = "ABC"
        plot.water_meter_table.append(row1)

        row2 = frappe.new_doc("Counter Table")
        row2.date = date(2023, 12, 16)
        row2.mounting_date = date(2021, 6, 14)
        row2.counter_value = 0
        row2.counter_number = "CDE"
        plot.water_meter_table.append(row2)

        self.assertEqual(len(plot.water_meter_table), 2)

    def test_that_a_new_counter_can_be_mounted_over_the_year_with_new_value_later_on(
        self,
    ):
        plot = frappe.new_doc("Plot")
        plot.plot_number = "MyPlot1"

        row1 = frappe.new_doc("Counter Table")
        row1.date = date(2022, 12, 15)
        row1.mounting_date = date(2021, 3, 15)
        row1.counter_value = 22.5
        row1.counter_number = "ABC"
        plot.water_meter_table.append(row1)

        row2 = frappe.new_doc("Counter Table")
        row2.date = date(2023, 12, 16)
        row2.mounting_date = date(2021, 6, 14)
        row2.counter_value = 0
        row2.counter_number = "CDE"
        plot.water_meter_table.append(row2)

        row3 = frappe.new_doc("Counter Table")
        row3.date = date(2023, 12, 30)
        row3.mounting_date = date(2021, 6, 14)
        row3.counter_value = 10
        row3.counter_number = "CDE"
        plot.water_meter_table.append(row3)

        self.assertEqual(len(plot.water_meter_table), 3)

    def test_that_plot_has_seal_label_when_counter_table_has_a_seal_number(
        self,
    ):
        plot = frappe.new_doc("Plot")
        plot.plot_number = "MyPlot1"

        row1 = frappe.new_doc("Counter Table")
        row1.date = date(2022, 12, 15)
        row1.mounting_date = date(2021, 3, 15)
        row1.counter_value = 22.5
        row1.counter_number = "ABC"
        row1.seal_number = "12345"
        plot.water_meter_table.append(row1)

        plot.save()

        tags = plot.get_tags()
        expected_tags = ["Has Seal"]
        self.assertListEqual(tags, expected_tags)

    def test_that_plot_without_seal_number_does_not_get_seal_tag(
        self,
    ):
        plot = frappe.new_doc("Plot")
        plot.plot_number = "MyPlot1"

        row1 = frappe.new_doc("Counter Table")
        row1.date = date(2022, 12, 15)
        row1.mounting_date = date(2021, 3, 15)
        row1.counter_value = 22.5
        row1.counter_number = "ABC"
        plot.water_meter_table.append(row1)

        plot.save()

        tags = plot.get_tags()
        expected_tags = []
        self.assertListEqual(tags, expected_tags)

    def test_that_plot_with_only_required_fields_can_be_saved(
        self,
    ):
        plot = frappe.new_doc("Plot")
        plot.plot_number = "MyPlot1"

        plot.save()

        self.assertIsNotNone(plot.name)

    def test_that_existing_seal_number_is_set_on_new_row_when_row_by_counter_exist(
        self,
    ):
        plot = frappe.new_doc("Plot")
        plot.plot_number = "MyPlot1"

        row1 = frappe.new_doc("Counter Table")
        row1.date = date(2022, 12, 15)
        row1.mounting_date = date(2021, 3, 15)
        row1.counter_value = 22.5
        row1.counter_number = "ABC"
        row1.seal_number = "FirstSeal"
        plot.water_meter_table.append(row1)
        plot.save()

        row2 = frappe.new_doc("Counter Table")
        row2.date = date(2023, 12, 16)
        row1.mounting_date = date(2021, 3, 15)
        row2.counter_value = 45
        row2.counter_number = "ABC"
        plot.water_meter_table.append(row2)
        plot.save()

        self.assertEqual(row2.seal_number, "FirstSeal")

    def test_that_existing_mounting_date_is_set_on_new_row_when_row_by_counter_exist(
        self,
    ):
        plot = frappe.new_doc("Plot")
        plot.plot_number = "MyPlot1"

        row1 = frappe.new_doc("Counter Table")
        row1.date = date(2022, 12, 15)
        row1.mounting_date = date(2021, 3, 15)
        row1.counter_value = 22.5
        row1.counter_number = "ABC"
        plot.water_meter_table.append(row1)
        plot.save()

        row2 = frappe.new_doc("Counter Table")
        row2.date = date(2023, 12, 16)
        row2.counter_value = 45
        row2.counter_number = "ABC"
        plot.water_meter_table.append(row2)
        plot.save()

        self.assertEqual(row2.mounting_date, date(2021, 3, 15))

    def test_that_former_tenant_gets_new_tenant_group_when_new_tenant_is_assigned(self):
        former_tenant = frappe.get_doc("Customer", "Former Tenant Customer")
        self.assertEqual(former_tenant.customer_group, "Tenant")

        new_tenant = frappe.get_doc("Customer", "New Tenant")
        self.assertEqual(new_tenant.customer_group, "Test CustomerGroup")

        existing_plot = TestPlot.create_plot("123", former_tenant.name)
        plot = frappe.get_doc("Plot", existing_plot.name)
        plot.customer = new_tenant.name
        plot.save()

        modified_tenant = frappe.get_doc("Customer", "Former Tenant Customer")
        self.assertEqual(modified_tenant.customer_group, "Former Tenant")

    def test_that_tenant_history_is_completed_for_former_tenant(self):
        former_tenant = frappe.get_doc("Customer", "Former Tenant Customer")
        self.assertEqual(former_tenant.customer_group, "Tenant")

        new_tenant = frappe.get_doc("Customer", "New Tenant")
        self.assertEqual(new_tenant.customer_group, "Test CustomerGroup")

        tenant_since = date(2019, 5, 13)
        existing_plot = TestPlot.create_plot("456", former_tenant.name, tenant_since)
        plot = frappe.get_doc("Plot", existing_plot.name)
        plot.customer = new_tenant.name

        plot.save()

        tenant_history = plot.former_tenants_table
        self.assertGreater(len(tenant_history), 0)

        matching = next(
            filter(
                lambda x: x.customer_link == "Former Tenant Customer", tenant_history
            ),
            None,
        )
        self.assertIsNotNone(matching)
        self.assertEqual(matching.customer_link, "Former Tenant Customer")
        self.assertEqual(matching.from_date, tenant_since)
        self.assertEqual(matching.to_date, date.today())

    def test_that_new_tenant_history_entry_is_created_for_new_tenant(self):
        former_tenant = frappe.get_doc("Customer", "Former Tenant Customer")
        self.assertEqual(former_tenant.customer_group, "Tenant")

        new_tenant = frappe.get_doc("Customer", "New Tenant")
        self.assertEqual(new_tenant.customer_group, "Test CustomerGroup")

        existing_plot = TestPlot.create_plot("789", former_tenant.name)
        plot = frappe.get_doc("Plot", existing_plot.name)
        plot.customer = new_tenant.name

        plot.save()

        tenant_history = plot.former_tenants_table
        self.assertGreater(len(tenant_history), 0)

        matching = next(
            filter(lambda x: x.customer_link == "New Tenant", tenant_history), None
        )
        self.assertIsNotNone(matching)
        self.assertEqual(matching.customer_link, "New Tenant")
        self.assertEqual(matching.from_date, date.today())
        self.assertEqual(matching.to_date, None)

    def test_that_customergroup_tenant_is_assigned_when_new_tenant_has_different_group(
        self,
    ):
        former_tenant = frappe.get_doc("Customer", "Former Tenant Customer")
        self.assertEqual(former_tenant.customer_group, "Tenant")

        new_tenant = frappe.get_doc("Customer", "New Tenant")
        self.assertNotEqual(new_tenant.customer_group, "Tenant")

        plot = TestPlot.create_plot("101112", former_tenant.name, date(2018, 3, 1))
        plot.customer = new_tenant.name

        plot.save()

        modified_tenant = frappe.get_doc("Customer", "New Tenant")
        self.assertEqual(modified_tenant.customer_group, "Tenant")

    def test_that_customer_backlink_is_removed_when_tenant_is_deleted(self):
        former_tenant = frappe.get_doc("Customer", "Former Tenant Customer")
        self.assertEqual(former_tenant.customer_group, "Tenant")

        plot = TestPlot.create_plot("131415", former_tenant.name, date(2018, 3, 1))
        plot.customer = None
        plot.save()

        former_tenant = frappe.get_doc("Customer", "Former Tenant Customer")
        self.assertIsNone(former_tenant.plot_link)

    def test_that_customer_backlink_is_set_as_expected_when_new_tenant_is_assigned(
        self,
    ):
        former_tenant = frappe.get_doc("Customer", "Former Tenant Customer")
        self.assertEqual(former_tenant.customer_group, "Tenant")

        new_tenant = frappe.get_doc("Customer", "New Tenant")
        self.assertEqual(new_tenant.customer_group, "Test CustomerGroup")

        plot = TestPlot.create_plot("161718", former_tenant.name, date(2018, 3, 1))
        plot.customer = new_tenant.name

        plot.save()

        modified_tenant = frappe.get_doc("Customer", "New Tenant")
        self.assertEqual(modified_tenant.plot_link, "Plot-161718")

        former_tenant = frappe.get_doc("Customer", "Former Tenant Customer")
        self.assertIsNone(former_tenant.plot_link)

    def test_that_plot_has_plot_status_under_lease_when_a_new_customer_is_assigned(
        self,
    ):
        plot = frappe.new_doc("Plot")
        plot.plot_number = "MyNewPlot"
        plot.save()

        self.assertEqual(plot.plot_status, "Not under lease")

        new_tenant = frappe.get_doc("Customer", "New Tenant")
        plot.customer = new_tenant.name
        plot.save()

        self.assertEqual(plot.plot_status, "Under Lease")

    def test_that_plot_has_plot_status_not_lease_when_customer_is_removed(
        self,
    ):
        former_tenant = frappe.get_doc("Customer", "Former Tenant Customer")
        self.assertEqual(former_tenant.customer_group, "Tenant")

        plot = TestPlot.create_plot("161718", former_tenant.name, date(2018, 3, 1))
        self.assertEqual(plot.plot_status, "Under Lease")

        plot.customer = None
        plot.save()
        self.assertEqual(plot.plot_status, "Not under lease")

    def test_that_teamwork_tasks_from_plot_is_written(
        self,
    ):
        test_tenant = frappe.get_doc("Customer", "Test Tenant")
        self.assertEqual(test_tenant.customer_group, "Test CustomerGroup")

        plot = TestPlot.create_plot("181920", test_tenant.name, date(2018, 3, 1))
        first_entry = frappe.new_doc("Work Task")
        first_entry.description = "task description"
        first_entry.duration = timedelta(hours=3, minutes=40).total_seconds()
        plot.append("teamwork_tasks_table", first_entry)

        second_entry = frappe.new_doc("Work Task")
        second_entry.description = "second task description"
        second_entry.duration = timedelta(hours=2).total_seconds()
        plot.append("teamwork_tasks_table", second_entry)
        plot.save()

        modified_tenant = frappe.get_doc("Customer", "Test Tenant")
        expected_result = "Tasks for teamwork:\n\ntask description - 3h 40min\n"
        expected_result = expected_result +"second task description - 2h 0min\n"
        self.assertEqual(modified_tenant.teamwork_tasks_from_plot, expected_result)

        plot.remove(first_entry)
        plot.remove(second_entry)
        plot.save()

        modified_tenant = frappe.get_doc("Customer", "Test Tenant")
        self.assertEqual(modified_tenant.teamwork_tasks_from_plot, "")
