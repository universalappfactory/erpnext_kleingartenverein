<template>
   <NavbarComponent />
   
   <div class="p-4 sm:ml-64">
   
      <GridTable @loadMore="loadMoreData" :items="tenants.data" :checkable="false" 
         :hasNext="tenants.hasNextPage"
         :columns="tableColumns" />
   </div>
</template>
<script lang="ts">
import { PropType, defineComponent, ref } from 'vue';
import { initFlowbite } from 'flowbite'

import NavbarComponent from "../components/Navbar.vue";
import FooterComponent from "../components/Footer.vue";
import GridTable from "../components/GridTable.vue";
import { Dropdown } from 'frappe-ui'
import { Alert, Button, createListResource } from 'frappe-ui'
import { ColumnMode, TableColumn } from '../ts/table';

export default defineComponent({
   name: "Meeting Minutes",
   components: {
      NavbarComponent,
      FooterComponent,
      Dropdown,
      Alert,
      Button,
      GridTable
   },

   methods: {
      loadMoreData() {
         console.log('LoadMore')
         this.tenants.next();
      }
   },
   setup() {
      console.log('SETUP')

      let tenants = createListResource({
         doctype: 'Bulletin',
         fields: ['*'],
         start: 0,
         pageLength: 20,
      })

      tenants.fetch()
      return {
         tenants
      }

   },
   data() {

      const tableColumns: TableColumn[] = [
         {
            DisplayTitle: "Name",
            PropertyNames: ["customer_name", "email_id"],
            Mode: ColumnMode.DoubleEntry
         },
         {
            DisplayTitle: "Contact",
            PropertyNames: ["email_id", "mobile_no"],
            Mode: ColumnMode.DoubleEntry
         },
         {
            DisplayTitle: "Garten",
            PropertyNames: ["title"],
            Mode: ColumnMode.Default
         }
      ]

      return {
         tableColumns
      }
   },
   mounted() {
      initFlowbite();
   }
});
</script>
