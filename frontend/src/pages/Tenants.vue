<template>
  <div class="p-4 sm:ml-64">
    <Dialog id="tenant-dialog" v-model="bodyDialog" style="z-index: 300">
      <template #body>
        <TenantEditor
          class="tenant-editor"
          :item="selectedCustomer"
          @close="closeEditor"
        />
      </template>
    </Dialog>
    <div class="ml-2 mr-2 mb-4">
      <Select
        v-model="selectedFilter"
        :placeholder="$t('tenant_list.select_placeholder')"
        :options="filters"
        class="rounded-lg border border-gray-300"
      />
    </div>
    <TenantList
      @selectedFilterChanged="selectedTagChanged"
      @showDialog="showDialog"
      :tags="tags.items"
      :showTags="selectedFilter !== ''"
      :filter="selectedFilter"
      :tenant="tenant"
      :showEditButton="true"
      :showActions="true"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import FooterComponent from "../components/Footer.vue";
import ListComponent from "../components/ListComponent.vue";
import TenantEditor from "../components/TenantEditor.vue";
import TenantSearchBar from "../components/TenantSearchBar.vue";
import TenantList from "../components/TenantList.vue";
import { Dropdown, Dialog } from "frappe-ui";
import { Alert, Button } from "frappe-ui";
import { useTenantEditor } from "../ts/tenanteditor";
import { useTenants } from "../ts/tenants";
import { Select } from "flowbite-vue";
import { useResource } from "../ts/resource";
import { SelectItem } from "../ts/buttons/select";

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
    TenantList,
    Select,
  },

  methods: {
    showDialog(item) {
      this.selectedCustomer = item;
      this.bodyDialog = true;
    },
    closeEditor() {
      this.bodyDialog = false;
    },
    selectedTagChanged(value) {
      this.selectedTag = value
      this.tenant.search(value, this.selectedFilter);
    },
  },
  setup() {
    const tenant = useTenants();
    const editor = useTenantEditor();
    const selectedCustomer = ref("");
    const selectedTag = ref("")

    const tags = useResource<SelectItem>({
      url: "/api/method/erpnext_kleingartenverein.dashboard_api.get_tenant_tags",
    });

    const selectedFilter = ref("");
    const filters = [
      { value: "", name: "Kein Filter" },
      { value: "withTag", name: "Hat Schlagwort" },
      { value: "withoutTag", name: "Ohne Schlagwort" },
    ];

    return {
      selectedCustomer,
      editor,
      tenant,
      filters,
      selectedFilter,
      tags,
    };
  },
  async mounted() {
    await this.tags.fetch();
  },
  watch: {
    selectedFilter: function (val) {
      if (this.selectedFilter !== '') {
         this.tenant.search(this.selectedTag, this.selectedFilter);
      } else {
         this.tenant.clear()
      }
    },
  },
  data() {
    const bodyDialog = false;
    return {
      bodyDialog,
    };
  },
});
</script>
