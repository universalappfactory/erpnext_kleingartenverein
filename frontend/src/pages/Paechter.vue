<template>
   <NavbarComponent />

   <div class="p-4 sm:ml-64">

      <Dialog v-model="bodyDialog" style="z-index: 300;">
         <template #body>
            <TenantEditor :item="selectedCustomer" @close="closeEditor" />
         </template>
      </Dialog>

      <TenantSearchBar @search="executeSearch" :filters="tenant.filters" class="mb-4" />
      <ListComponent @loadMore="tenant.loadMore" :items="tenant.tenants" :checkable="false" :headerList="['Pächter']"
         :hasNext="tenant.pageInfo.hasNext" @show-details="showDialog">

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
                  <div class="font-semibold"> {{ plot_link }}</div>
                  <div>{{ email_id }}</div>
                  <div>{{ mobile_no }}</div>
               </div>

               <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 content-center">
                  <a :href="getMobileHref(mobile_no)" type="button"
                     :class="mobile_no ? 'text-blue-700 hover:bg-blue-700 border border-blue-700  hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 ' : 'border border-gray-300  bg-gray-100'"                     
                     class="disabled:opacity-75   font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center">
                     <i class="fa fa-phone" aria-hidden="true"></i>
                     <span class="sr-only">Phonecall</span>
                  </a>
                  <a :href="getMailHref(email_id)" type="button"
                  :class="mobile_no ? 'text-blue-700 hover:bg-blue-700 border border-blue-700  hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 ' : 'border border-gray-300  bg-gray-100'"                     
                     class="disabled:opacity-75   font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center">
                     <i class="fa fa-envelope" aria-hidden="true"></i>
                     <span class="sr-only">EMail</span>
                  </a>

                  <button type="button" @click="showDialog(name)"
                     class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
                     <i class="fa fa-edit" aria-hidden="true"></i>
                     <span class="sr-only">Edit</span>
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
import TenantSearchBar from "../components/TenantSearchBar.vue";

import { Dropdown, Dialog } from 'frappe-ui'
import { Alert, Button, createListResource, createResource } from 'frappe-ui'
import { ColumnMode, TableColumn } from '../ts/table';
import { useTenants } from '../ts/tenants.ts';
import { useTenantEditor } from '../ts/tenanteditor';


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
      TenantEditor,
      TenantSearchBar
   },

   methods: {
      executeSearch(searchText: any) {
         this.tenant.search(searchText)
      },
      showDialog(item) {
         this.selectedCustomer = item
         this.bodyDialog = true
      },
      getMobileHref(mobile_no) {
         return `tel:${mobile_no}`
      },
      getMailHref(email_id) {
         return `mailto:${email_id}`
      },
      closeEditor() {
         this.bodyDialog = false
      }
   },
   setup() {

      const tenant = useTenants()
      const editor = useTenantEditor()
      const selectedCustomer = ref({})
      return {
         tenant,
         selectedCustomer,
         editor
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
