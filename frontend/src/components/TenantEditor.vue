<template>
    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

        <div class="bg-blue-200 flex p-4">
            {{ item.name }}

            <button type="button"
                class="absolute right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span class="sr-only">Close modal</span>
            </button>
        </div>

        <TabComponent @item-selected="tabSelected" :items="items" />

        <div class="" style="">
            <template v-if="selectedTab === 'base'">
                <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="profile" role="tabpanel"
                    aria-labelledby="profile-tab">
                    <TenantBaseData :data="item"  />
                </div>
            </template>
            <template v-if="selectedTab === 'attachments'">
                <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="dashboard" role="tabpanel"
                    aria-labelledby="dashboard-tab">
                    <p class="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong
                            class="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</strong>.
                        Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps
                        classes to control the content visibility and styling.</p>
                </div>
            </template>

        </div>
    </div>
</template>
<script lang="ts">
import { PropType, defineComponent, ref } from 'vue';
import { TableColumn } from '../ts/table'

import TabComponent, { TabItem } from './TabComponent.vue'
import TenantBaseData from './TenantBaseData.vue'

export default defineComponent({
    name: "TenantEditor",
    components: {
        TabComponent,
        TenantBaseData,
    },
    methods: {
        tabSelected(item: TabItem) {
            this.selectedTab = item.name
        }
    },
    data() {
        const items: TabItem[] = [{
            description: "tenant_editor.base_data",
            selected: true,
            name: "base"
        },
        {
            name: "attachments",
            description: "tenant_editor.base_data",
            selected: false
        }]
        const selectedTab = "base"
        return {
            items,
            selectedTab
        }
    },
    props: {
        item: {
            type: Object as PropType<any>,
            required: true,
        },
    },
});
</script>