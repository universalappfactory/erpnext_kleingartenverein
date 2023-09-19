<template>
   <div class="p-4 sm:ml-64">

      <Dialog id="tenant-dialog" v-model="bodyDialog" style="z-index: 300;">
         <template #body>
            <TenantEditor class="tenant-editor" :item="selectedCustomer" @close="closeEditor" />
         </template>
      </Dialog>

      <TenantSearchBar @search="executeSearch" :filters="tenant.filters" class="mb-4" />
      
   </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import FooterComponent from "../components/Footer.vue";
import ListComponent from "../components/ListComponent.vue";
import TenantEditor from "../components/TenantEditor.vue";
import TenantSearchBar from "../components/TenantSearchBar.vue";
import { Dropdown, Dialog } from 'frappe-ui'
import { Alert, Button, createListResource, createResource } from 'frappe-ui'
import { ColumnMode, TableColumn } from '../ts/table';
import { useTenants } from '../ts/tenants';
import { useTenantEditor } from '../ts/tenanteditor';


export default defineComponent({
   name: "paechter",
   components: {
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
      this.tenant.fetch()
   }
});
</script>
