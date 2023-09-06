<template>
   <div class="p-4 sm:ml-64">
      <Dialog id="tenant-dialog" v-model="bodyDialog" style="z-index: 300;">
         <template #body>
            <TenantEditor class="tenant-editor" :item="selectedCustomer" @close="closeEditor" />
         </template>
      </Dialog>

      <TenantList @showDialog="showDialog" :tenant="tenant" :showEditButton="true" :showActions="true" />
   </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import FooterComponent from "../components/Footer.vue";
import ListComponent from "../components/ListComponent.vue";
import TenantEditor from "../components/TenantEditor.vue";
import TenantSearchBar from "../components/TenantSearchBar.vue";
import TenantList from "../components/TenantList.vue";
import { Dropdown, Dialog } from 'frappe-ui'
import { Alert, Button } from 'frappe-ui'
import { useTenantEditor } from '../ts/tenanteditor';
import { useTenants } from '../ts/tenants';


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
      TenantSearchBar,
      TenantList
   },

   methods: {
      showDialog(item) {
         this.selectedCustomer = item
         this.bodyDialog = true
      },
      closeEditor() {
         this.bodyDialog = false
      }
   },
   setup() {
      const tenant = useTenants()
      const editor = useTenantEditor()
      const selectedCustomer = ref("")
      return {
         selectedCustomer,
         editor,
         tenant
      }

   },
   data() {
      const bodyDialog = false
      return {
         bodyDialog,
      }
   },
});
</script>
