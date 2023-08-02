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

         <Button @click="executeSearch">Search</Button>

         <input type="text" v-model="searchText" id="table-search-users"
                    class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for users" />

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
   
      <GridTable @loadMore="tenant.loadMore" :items="tenant.tenants" :checkable="false" 
         :hasNext="tenant.pageInfo.hasNext"
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
import { Alert, Button, createListResource, createResource } from 'frappe-ui'
import { ColumnMode, TableColumn } from '../ts/table';
import { useTenants } from '../ts/tenants.ts';


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
      executeSearch() {
         console.log("searchText", this.searchText)
         this.tenant.search(this.searchText)
      }
   },
   setup() {

      const tenant = useTenants()
      return {
         tenant,
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
      
      const searchText = ""
      return {
         tableColumns,
         bodyDialog,
         searchText
      }
   },
   mounted() {
      initFlowbite();
      this.tenant.fetch()
   }
});
</script>
