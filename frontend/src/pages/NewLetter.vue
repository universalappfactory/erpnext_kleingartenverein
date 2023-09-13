<template>
  <div class="p-4 sm:ml-64">
    <div class="grid grid-cols-1">
      <p class="text-2xl border-b-4 border-blue-400 pb-2">Neuen Brief verfassen</p>

      <div class="mt-6">
        <InputField
          label=""
          :value="letter.description"
          :placeholder="$t('new_letter.letter_description')"
        />

        <Select
          label=""
          :selectedValue="letter.selectedPrintTemplate.value"
          class="mt-2"
          placeholder=""
          :items="letter.printTemplates"
        >
        </Select>
      </div>

      <div class="pt-2 mt-6 pb-2">
        <p class="mb-2 font-semibold">Empfänger:</p>
        <!-- <div class="flex flex-wrap gap-2">
                    <div v-for="(item, index) of tenant.selection" class="bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded 
                            border border-blue-400 inline-flex items-center justify-center">
                        {{ item.name }}
                        <button type="button" @click="removeRecipient(item.name)"
                            class="inline-flex items-center p-1 ml-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
                            data-dismiss-target="#badge-dismiss-default" aria-label="Remove">
                            <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Remove badge</span>
                        </button>
                    </div>

                    <template v-if="tenant.selection.length === 0">
                        {{ $t('new_letter.no_recipients') }}
                    </template>
                </div> -->

        <div class="flex">
          <Badge v-for="(item,index) of tenant.selection" >
            {{item.name}}
          </Badge>

          <SearchInput
            class="grow"
            modelValue=""
            :dropdownVisible="tenant.tenants.length > 0 && tenant.searchText !== ''"
            @update:modelValue="tenantSearchTextChanged"
            @enterPressed="tenant.selectAll"
          >
            <div
              class="bg-gray-100 w-full max-h-[60vh] min-w-[30rem] pt-4 overflow-scroll"
            >
              <TenantList :selectable="true" :items="tenant.tenants" />
            </div>
          </SearchInput>
        </div>
      </div>

      <!-- <div class="flex">
        <DropdownButton class="mt-4" :label="$t('new_letter.add_recipients')">
          <div class="bg-gray-100 w-full max-h-[60vh] min-w-[30rem] pt-4 overflow-scroll">
            <TenantList :selectable="true" :tenant="tenant" />
          </div>
        </DropdownButton>
      </div> -->

      <div class="mt-4">
        <EditorComponent
          @contentChanged="contentChanged"
          :content="content"
          @template-selected="templateSelected"
          :templates="letter.templates"
        ></EditorComponent>
      </div>
      <div class="flex gap-4 items-center">
        <LinkButton
          :disabled="previewDisabled"
          :href="href"
          :label="$t('new_letter.show_preview')"
          target="_blank"
        ></LinkButton>
        <Button
          @clicked="printLetters"
          :disabled="previewDisabled"
          :href="href"
          :label="$t('new_letter.print_letters')"
        ></Button>

        <LoadingIndicator :isLoading="letter.isLoading.value" :centerPlacement="false" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
resizeBy;
import { Dialog } from "frappe-ui";
import { defineComponent, ref } from "vue";
import TenantSelector from "../components/TenantSelector.vue";
import DropdownButton from "../components/DropdownButton.vue";
import TenantList from "../components/lists/TenantList.vue";
import DropDownlist from "../components/DropDownlist.vue";
import EditorComponent from "../components/EditorComponent.vue";
import Button from "../components/Button.vue";
import LinkButton from "../components/buttons/LinkButton.vue";
import InputField from "../components/InputField.vue";
import Select from "../components/buttons/Select.vue";
import SearchInput from "../components/inputs/SearchInput.vue";

import LoadingIndicator from "../components/indicators/LoadingIndicator.vue";

import { useTenants } from "../ts/tenants";
import { useMemberLetter } from "../ts/member_letter";
import { SelectItem } from "../ts/buttons/select";
import { Badge } from 'flowbite-vue'


export default defineComponent({
  name: "Home",
  data() {
    const tenantSearchText = "";
    return {
      showDialog: false,
      tenantSearchText,
    };
  },
  setup() {
    const letter = useMemberLetter();
    const tenant = useTenants();
    const content = ref("");
    return {
      tenant,
      letter,
      content,
    };
  },
  mounted() {
    this.letter.fetchData();
  },
  methods: {
    tenantSearchTextChanged(value) {
      console.log("tenantSearchTextChanged", value);
      this.tenant.searchText.value = value;
    },
    removeRecipient(name: string) {
      this.tenant.unselect(name);
    },
    templateSelected(item: SelectItem) {
      this.content = item.content;
    },
    contentChanged(val: string) {
      this.letter.contentChanged(val);
    },
    async createPreview() {
      console.log("create preview");
      await this.letter.createPreview();
    },
    async printLetters() {
      const recipients = this.tenant.selection.map((x) => x.name);
      await this.letter.printLetters(recipients);
    },
  },
  computed: {
    href: function () {
      const recipients = this.tenant.selection.map((x) => x.name);
      let data = JSON.stringify({
        recipients: recipients,
        content: this.content,
        description: "",
      });
      data = encodeURIComponent(btoa(data));
      return `/api/method/erpnext_kleingartenverein.letter_api.get_print_preview?data=${data}`;
    },
    previewDisabled: function () {
      return this.content === "" || this.tenant.selection.length === 0;
    },
  },
  components: {
    Dialog,
    TenantSelector,
    DropdownButton,
    TenantList,
    DropDownlist,
    EditorComponent,
    Button,
    LoadingIndicator,
    LinkButton,
    InputField,
    Select,
    SearchInput,
    Badge,
  },
});
</script>
