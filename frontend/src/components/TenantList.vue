<template>
  <div>
    <div>
      <TenantSearchBar
        @search="executeSearch"
        @selectedFilterChanged="(x) => this.$emit('selectedFilterChanged', x)"
        :showFilters="showTags"
        :filters="tags ?? []"
        class="mb-4"
      />
    </div>
    <div class="overflow-y-scroll">
      <ListComponent
        @loadMore="tenant.loadMore"
        :items="tenant.tenants"
        :checkable="false"
        :headerList="['Pächter']"
        :hasNext="tenant.pageInfo.hasNext"
        @show-details="(x: any) => this.showDialog(x.name)"
      >
        <template
          #item="{
            name,
            plot_link,
            email_id,
            mobile_no,
            customer_group,
            selected,
            _user_tags,
          }"
        >
          <div class="flex p-4">
            <div class="grid grid-cols-2 content-center">
              <template v-if="selectable">
                <Checkbox
                  :selected="selected"
                  @checkChanged="(value) => this.checkChanged(name, value)"
                />
              </template>

              <svg
                class="w-10 h-10 text-gray-200"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>

            <div class="grow p-2">
              <div class="font-semibold">{{ name }}</div>
              <div class="font-semibold">{{ plot_link }}</div>
              <div>{{ email_id }}</div>
              <div>{{ mobile_no }}</div>
            </div>
            <template v-if="showActions">
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 content-center">
                <a
                  :href="getMobileHref(mobile_no)"
                  type="button"
                  :class="
                    mobile_no
                      ? 'text-blue-700 hover:bg-blue-700 border border-blue-700  hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 '
                      : 'border border-gray-300  bg-gray-100'
                  "
                  class="disabled:opacity-75 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                >
                  <i class="fa fa-phone" aria-hidden="true"></i>
                  <span class="sr-only">Phonecall</span>
                </a>
                <a
                  :href="getMailHref(email_id)"
                  type="button"
                  :class="
                    mobile_no
                      ? 'text-blue-700 hover:bg-blue-700 border border-blue-700  hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 '
                      : 'border border-gray-300  bg-gray-100'
                  "
                  class="disabled:opacity-75 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                >
                  <i class="fa fa-envelope" aria-hidden="true"></i>
                  <span class="sr-only">EMail</span>
                </a>

                <template v-if="showEditButton">
                  <button
                    type="button"
                    @click="(x: any) => this.showDialog(name)"
                    class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                  >
                    <i class="fa fa-edit" aria-hidden="true"></i>
                    <span class="sr-only">Edit</span>
                  </button>
                </template>
              </div>
            </template>
          </div>
          <div class="p-4">
            <div class="flex">
              <template v-if="customer_group === 'Tenant'">
                <Badge type="green">Pächter</Badge>
              </template>
              <template v-if="customer_group === 'Former Tenant'">
                <Badge type="yellow">Ehemaliger Pächter</Badge>
              </template>
              <template v-if="customer_group === 'Member'">
                <Badge type="dark">Passives Mitglied</Badge>
              </template>

              <Badge v-for="(item, index) of getUserTags(_user_tags)">{{ item }}</Badge>

              <div class="grow"></div>

              <div>
                <a
                  class="pl-4 font-medium text-blue-600 hover:underline"
                  target="_blank"
                  :href="`/app/customer/${name}`"
                >
                {{$t('tenant_list.open_in_desk')}}
                </a>
              </div>
            </div>
          </div>
        </template>
      </ListComponent>
    </div>
  </div>
</template>
<script lang="ts">
import { PropType, defineComponent, ref } from "vue";
import { TenantFunctions, useTenants } from "../ts/tenants";
import ListComponent from "./ListComponent.vue";
import TenantSearchBar from "./TenantSearchBar.vue";
import Checkbox from "./Checkbox.vue";
import LinkButton from "./buttons/LinkButton.vue";
import { Badge } from "flowbite-vue";
import { SelectItem } from "../ts/button/select";

export default defineComponent({
  name: "TenantList",
  components: {
    TenantSearchBar,
    ListComponent,
    Checkbox,
    Badge,
    LinkButton,
  },
  props: {
    showEditButton: {
      type: Boolean,
      default: () => false,
    },
    showActions: {
      type: Boolean,
      default: () => false,
    },
    selectable: {
      type: Boolean,
      default: () => false,
    },
    filter: {
      type: String,
      default: () => "",
    },
    tenant: {
      type: Object as PropType<TenantFunctions>,
      required: true,
    },
    tags: {
      type: Object as PropType<SelectItem>,
      required: false,
    },
    showTags: {
      type: Boolean,
      required: false,
    },
  },
  emits: {
    loadMore: () => {
      return true;
    },
    showDialog: () => {
      return true;
    },
    selectedFilterChanged: () => {
      return true;
    },
  },
  async mounted() {
    await this.tenant.fetch();
  },
  methods: {
    executeSearch(searchText: any) {
      this.tenant.search(searchText, this.filter);
    },
    getMobileHref(mobile_no) {
      return `tel:${mobile_no}`;
    },
    getMailHref(email_id) {
      return `mailto:${email_id}`;
    },
    showDialog(item) {
      if (this.showEditButton) {
        this.$emit("showDialog", item);
      }
    },
    checkChanged(name: String, selected) {
      if (selected) {
        this.tenant.select(name);
      } else {
        this.tenant.unselect(name);
      }
    },
    getUserTags(input?: String): Array<String> {
      if (!input) {
        return [];
      }
      return input.split(",").filter((itm) => itm !== "");
    },
  },
});
</script>
