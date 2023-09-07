<template>
    <div class="flex">
        <div class="relative w-full ml-2 mr-2">
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