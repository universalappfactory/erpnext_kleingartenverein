<template>
   <NavbarComponent />
   
   <div class="p-4 sm:ml-64">

      <Button @click="bodyDialog = true">Show Dialog</Button>
         <Dialog v-model="bodyDialog">
            <template #body>
               <!-- Modal content -->
               <TenantEditor />
            </template>
         </Dialog>

         {{ bodyDialog }}

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
   
      <GridTable @loadMore="loadMoreData" :items="tenants.data" :checkable="false" :hasNext="tenants.hasNextPage"
         :columns="tableColumns" />

   </div>
</template>
<script lang="ts">
import { PropType, defineComponent, ref } from 'vue';
import { initFlowbite } from 'flowbite'

import NavbarComponent from "../components/Navbar.vue";
import FooterComponent from "../components/Footer.vue";
import GridTable from "../components/GridTable.vue";
import TenantEditor from "../components/TenantEditor.vue";

import { Dropdown, Dialog } from 'frappe-ui'
import { Alert, Button, createListResource } from 'frappe-ui'
import { ColumnMode, TableColumn } from '../ts/table';

export default defineComponent({
   name: "paechter",
   components: {
      NavbarComponent,
      FooterComponent,
      Dropdown,
      Alert,
      Button,
      GridTable,
      Dialog,
      TenantEditor
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
         filters:{
            customer_group: 'Tenant'
         },
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

      const bodyDialog = false

      return {
         tableColumns,
         bodyDialog
      }
   },
   mounted() {
      initFlowbite();
   }
});
</script>
