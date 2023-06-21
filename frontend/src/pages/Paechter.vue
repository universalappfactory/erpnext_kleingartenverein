<template>
   <NavbarComponent />

   

   <div class="p-4 sm:ml-64">

      <div class="m-8 p-4 mb-4 text-lg text-yellow-800 rounded-lg bg-yellow-50" role="alert">
         <span class="font-semibold">Info</span>
         <p>
            Hier entsteht eine neue Liste in der man einfach Pächter und Gärten angezeigt bekommt.
         </p>
         <p>
            Diese Liste wird dann auch auf dem Mobiltelefon ordentlich angezeigt.
         </p>
         <br/>
         
         <span class="font-semibold">Achtung</span>
         <p>
            Ist noch ne Baustelle, funktioniert also noch nicht richtig.
         </p>
      </div>
   
      <TableComponent @loadMore="loadMoreData" :items="tenants.data" :checkable="false" :hasNext="tenants.hasNextPage"
         :columns="tableColumns" />
   </div>
</template>
<script lang="ts">
import { PropType, defineComponent, ref } from 'vue';
import { initFlowbite } from 'flowbite'

import NavbarComponent from "../components/Navbar.vue";
import FooterComponent from "../components/Footer.vue";
import TableComponent from "../components/Table.vue";
import { Dropdown } from 'frappe-ui'
import { Alert, Button } from 'frappe-ui'
import { Button, LoadingText, createListResource } from 'frappe-ui'
import { ColumnMode, TableColumn } from '../ts/table';

export default defineComponent({
   name: "paechter",
   components: {
      NavbarComponent,
      FooterComponent,
      Dropdown,
      Alert,
      Button,
      TableComponent
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
         doctype: 'Customer',
         fields: ['*'],
         orderBy: 'plot_link asc',
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
            PropertyNames: ["plot_link"],
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
