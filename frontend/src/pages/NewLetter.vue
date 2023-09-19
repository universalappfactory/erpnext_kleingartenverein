<template>
  <div class="p-4 sm:ml-64">
    <div class="grid grid-cols-1">
      <PageHeadline messageId="new_letter.headline" />

      <template v-if="letter.submitError.value">
        <Alert type="warning" class="mb-2 mt-4">
          {{ $t("new_letter.error_while_shipping") }}
        </Alert>
      </template>

      <div class="mt-6">
        <Input
          label=""
          :modelValue="letter.description.value"
          :class="letter.validationStatus.description == 'error' ? 'border-red-400' : ''"
          :required="true"
          :validation-status="letter.validationStatus.description"
          @update:modelValue="letter.setDescription"
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
        <p class="mb-2 font-semibold">{{ $t("new_letter.recipients") }}</p>

        <div class="flex flex-wrap gap-2">
          <Badge class="p-1 whitespace-nowrap" v-for="(item, index) of tenant.selection">
            {{ item.name }}
          </Badge>
        </div>
        <div :class="tenant.selection.length > 0 ? 'mt-4' : 'mt-0'">
          <SearchInput
            class="grow"
            :placeholder="$t('new_letter.search_hint')"
            modelValue=""
            :dropdownVisible="dropdownVisible"
            :hasError="letter.validationStatus.recepients === 'error'"
            @update:modelValue="tenantSearchTextChanged"
            @enterPressed="selectAllTenants"
          >
            <div
              class="border border-b-1 bg-gray-100 w-full min-w-[100%] max-h-[60vh] min-w-[30rem] overflow-scroll"
            >
              <div>
                <div class="flex min-h-[2rem] justify-end items-center pr-4">
                  <CloseButton @click="dropdownVisible = false" class="h-2" />
                </div>
                <TenantList
                  @clicked="selectTenant"
                  :selectable="true"
                  :items="tenant.tenants"
                />
              </div>
            </div>
          </SearchInput>
        </div>
      </div>

      <div class="mt-4">
        <EditorComponent
          @contentChanged="contentChanged"
          :content="content"
          @template-selected="templateSelected"
          :templates="letter.templates"
          :hasError="letter.validationStatus.content === 'error'"
        ></EditorComponent>
      </div>
      <div class="flex gap-4 items-center content-center">
        <a class="hidden" target="_blank" ref="previewLink" ></a>

        <Button @clicked="showPreview" :label="$t('new_letter.show_preview')" />

        <Button
          @clicked="printLetters"
          :label="$t('new_letter.print_letters')"
        ></Button>

        <LoadingIndicator :isLoading="letter.isLoading.value" :centerPlacement="false" />

        <template v-if="letter.letterAttachments.value.length > 0">
          <i class="text-2xl fa fa-check text-green-400"></i>
        </template>
      </div>

      <template v-if="letter.letterAttachments.value.length > 0">
        <div class="mt-4 min-h-[20vh]">
          <ul>
            <li v-for="(item, index) of letter.letterAttachments.value">
              <DownloadButton :url="item.attachment" :label="item.name" />
            </li>
          </ul>
          <!-- <a ref="openHref" target="_blank" class="hidden"></a>
          <Button @click="openAll" :label="$t('new_letter.open_all')"></Button> -->
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Dialog } from "frappe-ui";
import { defineComponent, ref, watch } from "vue";
import TenantSelector from "../components/TenantSelector.vue";
import DropdownButton from "../components/DropdownButton.vue";
import TenantList from "../components/lists/TenantList.vue";
import DropDownlist from "../components/DropDownlist.vue";
import DownloadButton from "../components/DownloadButton.vue";
import EditorComponent from "../components/EditorComponent.vue";
import Button from "../components/Button.vue";
import LinkButton from "../components/buttons/LinkButton.vue";
import InputField from "../components/InputField.vue";
import PageHeadline from "../components/PageHeadline.vue";

import Select from "../components/buttons/Select.vue";
import SearchInput from "../components/inputs/SearchInput.vue";
import CloseButton from "../components/buttons/CloseButton.vue";

import LoadingIndicator from "../components/indicators/LoadingIndicator.vue";

import { useTenants } from "../ts/tenants";
import { useMemberLetter } from "../ts/member_letter";
import { SelectItem } from "../ts/buttons/select";
import { Badge, Input, Alert } from "flowbite-vue";

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
    const dropdownVisible = ref(false);
    const previewLink = ref<HTMLAnchorElement>();
    const openHref = ref<HTMLAnchorElement>();
    const attachments = []

    watch(letter.letterAttachments.value, (val) => {
      if (val.length > 0) {
        if (val[0].name.startsWith("Preview")) {
          previewLink.value.href = val[0].attachment
          previewLink.value.click()
        }
      }
    })
    
    return {
      tenant,
      letter,
      content,
      dropdownVisible,
      previewLink,
      openHref,
      attachments
    };
  },
  mounted() {
    this.letter.fetchData();
  },
  methods: {
    selectTenant(name) {
      this.tenant.select(name);
      this.dropdownVisible = false;
    },
    selectAllTenants() {
      this.tenant.selectAll()
      this.dropdownVisible = false;
    },
    tenantSearchTextChanged(value) {
      this.tenant.searchText.value = value;
      if (!this.dropdownVisible) {
        this.dropdownVisible = true
      }
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
    async showPreview() {
      const recipients = this.tenant.selection.map((x) => x.name).splice(0, 1);
      await this.letter.printLetters(recipients, true);
    },
    async printLetters() {
      const recipients = this.tenant.selection.map((x) => x.name);
      await this.letter.printLetters(recipients, false);
    },
  },
  computed: {
    // href: function () {
    //   const recipients = this.tenant.selection.map((x) => x.name);
    //   let data = JSON.stringify({
    //     recipients: recipients,
    //     content: this.content,
    //     description: "",
    //     printFormat: this.letter.selectedPrintTemplate.value
    //   });
    //   data = encodeURIComponent(btoa(data));
    //   return `/api/method/erpnext_kleingartenverein.letter_api.get_print_preview?data=${data}`;
    // },
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
    Input,
    CloseButton,
    Alert,
    DownloadButton,
    PageHeadline
  },
});
</script>
