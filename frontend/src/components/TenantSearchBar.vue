<template>
    <div class="flex">
        <!--
        <button id="dropdown-button" data-dropdown-toggle="dropdown"
            class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            type="button">{{ $t('search_bar.filter') }} <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 4 4 4-4" />
            </svg></button>
        <div id="dropdown" style="z-index: 1000;"
            class="z-10 p-3 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul class="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownSearchButton">
                <li v-for="(item, index) in filters">
                    <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                        <input id="checkbox-item-11" type="checkbox" :value="item.selected" @click="filter_selected(item)"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                        <label for="checkbox-item-11"
                            class="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{{
                                $t(item.text) }}</label>
                    </div>
                </li>
            </ul>
        </div>
    -->
        <div class="relative w-full ml-2">
            <input type="search" v-model="searchText" v-on:keyup.enter="executeSearch"
                class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg   border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                :placeholder="$t('search_bar.search_for')" required>
            <button @click="executeSearch"
                class="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                <span class="sr-only">{{ $t('search_bar.search') }}</span>
            </button>
        </div>
    </div>
</template>
<script lang="ts">
import { PropType, defineComponent, ref } from 'vue';
import { FilterItem } from '../ts/tenants';


export default defineComponent({
    name: "TenantSearchBar",
    components: {
    },
    methods: {
        executeSearch() {
            this.$emit('search', this.searchText)
        },
        filter_selected(item) {
            item.selected = !item.selected
        }
    },
    emits: {
        search: () => {
            return true;
        },
    },
    setup() {
        const dropDownVisible = ref(false)
        const searchText = ref('')

        return {
            dropdown: ref<HTMLDivElement | null>(null),
            dropDownVisible,
            searchText
        };
    },
    props: {
        filters: {
            type: Object as PropType<FilterItem[]>,
            required: true,
        },
    },

});
</script>