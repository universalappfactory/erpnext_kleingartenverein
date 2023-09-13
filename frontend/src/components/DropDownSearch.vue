<template>
  <div>
    <Button :label="label" @click="openDropDown"></Button>

    <!-- Dropdown menu -->
    <div
      ref="dropDown"
      :class="dropDownVisible ? 'relative' : 'hidden'"
      style=""
      class="z-10 bg-white rounded-lg shadow w-60 dark:bg-gray-700"
    >
      <div class="p-3">
        <label for="input-group-search" class="sr-only">Search</label>
        <div class="relative">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
          >
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="input-group-search"
            v-model="search.searchOptions.query"
            class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search user"
          />
        </div>
      </div>
      <ul
        class="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownSearchButton"
      >
        <li v-for="(item, index) of search.items">
          <div
            class="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            <input
              id="checkbox-item-11"
              type="checkbox"
              :value="item.selected"
              :checked="item.selected"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              for="checkbox-item-11"
              class="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
            >
              {{ item.displayText }}
            </label>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { PropType, defineComponent, ref } from "vue";
import { AttachmentData } from "../ts/tenanteditor";
import Button from "./Button.vue";
import { useThrottledRefHistory } from "@vueuse/core";
import { DropDownSearchItem, useDropdownSearch } from "../ts/dropdown_search";
import { watchThrottled } from "@vueuse/core";

export default defineComponent({
  name: "DropDownSearch",

  props: {
    label: {
      type: String,
      default: () => "Label",
    },
  },
  emits: {
    ok: () => {
      return true;
    },
    search: () => {
      return true;
    },
  },
  components: {
    Button,
  },
  setup() {
    const dropDown = ref<HTMLDivElement | null>(null);
    const dropDownVisible = ref(false);
    const search = useDropdownSearch();
    const test = ref("asd");
    return {
      dropDown,
      dropDownVisible,
      search,
      test,
    };
  },
  methods: {
    openDropDown(searchText: any) {
      console.log(this.dropDown);
      this.dropDownVisible = !this.dropDownVisible;
    },
  },
  watch: {
    test: (val) => {
      console.log("changed", val);
    },
  },
});
</script>
