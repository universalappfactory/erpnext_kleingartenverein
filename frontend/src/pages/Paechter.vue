<template>
   <NavbarComponent />

   <div class="p-4 sm:ml-64">

      <Button @click="bodyDialog = true">Show Dialog</Button>
      <Dialog v-model="bodyDialog" style="z-index: 300;">
         <template #body>
            <!-- Modal content -->
            <TenantEditor :item="selectedCustomer" />
         </template>
      </Dialog>

      <Button @click="executeSearch">Search</Button>

      <input type="text" v-model="searchText" id="table-search-users"
         class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
         placeholder="Search for users" />

      <ListComponent @loadMore="tenant.loadMore" :items="tenant.tenants" :checkable="false" :headerList="['Pächter']"
         :hasNext="tenant.pageInfo.hasNext"
         @show-details="showDialog"
         >

         <template #item="{ name, plot_link, email_id, mobile_no, customer_group }">
            <div class="flex p-4">
               <div class="grid content-center">
                  <svg class="w-10 h-10 text-gray-200" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                     <path fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                        clip-rule="evenodd"></path>
                  </svg>
               </div>

               <div class="grow p-2">
                  <div class="font-semibold">{{ name }}</div>
                  <div class="font-semibold"> {{ plot_link  }}</div>
                  <div>{{ email_id }}</div>
                  <div>{{ mobile_no }}</div>
               </div>
               
               <div class="grow bg-red-100">
                  
               </div>

               <div class="flex grow-0 justify-end pl-4">
                  <button @click="showDialog" type="button">
                     <i class="fa fa-edit" aria-hidden="true"></i>
                     <span class="sr-only">Icon description</span>
                  </button>
               </div>
            </div>

         </template>
      </ListComponent>

   </div>
</template>
<script lang="ts">
import { PropType, defineComponent, ref } from 'vue';
import { initFlowbite } from 'flowbite'

import NavbarComponent from "../components/Navbar.vue";
import FooterComponent from "../components/Footer.vue";
import ListComponent from "../components/ListComponent.vue";
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
      ListComponent,
      Dialog,
      TenantEditor
   },

   methods: {
      executeSearch() {
         this.tenant.search(this.searchText)
      },
      showDialog(item) {
         console.log(item)
         this.selectedCustomer = item
         this.bodyDialog = true
      },
   },
   setup() {

      const tenant = useTenants()
      const selectedCustomer = ref({})
      return {
         tenant,
         selectedCustomer
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
      // initFlowbite();
      this.tenant.fetch()
   }
});
</script>
