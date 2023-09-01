<template>
    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 h-[90vh] " :class="isLoading ? 'opacity-25' : ''">
        <div class="bg-blue-200 flex p-4">
            {{ editor.first?.item?.tenant?.name }}
            <button @click="this.$emit('close')" type="button"
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

        <template v-if="selectedTab === 'base'">
            <div class="pl-4 pr-4 rounded-lg overflow-scroll h-[80%]" role="tabpanel" aria-labelledby="profile-tab">
                <TenantBaseData :data="baseData" />
            </div>
        </template>
        <template v-if="selectedTab === 'attachments'">
            <AttachmentList :data="editor.first?.attachments" />
        </template>

        <div class="flex flex-row-reverse mr-4">
            <Button @ok="this.$emit('close')" :label="$t('tenant_editor.close')"></Button>
        </div>

        <div role="status" :class="isLoading ? '' : 'hidden'"
            class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
            <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor" />
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill" />
            </svg>
            <span class="sr-only">Loading...</span>
        </div>
    </div>
</template>
<script lang="ts">
import { PropType, defineComponent, ref } from 'vue';

import TabComponent, { TabItem } from './TabComponent.vue'
import TenantBaseData from './TenantBaseData.vue'
import AttachmentList from './AttachmentList.vue'
import Button from './Button.vue'
import { TenantData, useTenantEditor } from '../ts/tenanteditor';

export default defineComponent({
    name: "TenantEditor",
    components: {
        TabComponent,
        TenantBaseData,
        Button,
        AttachmentList
    },
    setup() {
        const editor = useTenantEditor()
        const selectedCustomer = ref({})
        return {
            editor,
            selectedCustomer
        }

    },
    mounted() {
        this.editor.byName(this.item)
    },
    methods: {
        tabSelected(item: TabItem) {
            this.selectedTab = item.name
        }
    },
    emits: {
        close: () => {
            return true;
        },
    },
    data() {
        const items: TabItem[] = [{
            description: "tenant_editor.base_data",
            selected: true,
            name: "base"
        },
        {
            name: "attachments",
            description: "tenant_editor.attachments",
            selected: false
        }]
        const selectedTab = "base"
        return {
            items,
            selectedTab
        }
    },
    computed: {
        isLoading: function () {
            return this.editor.first.item ? false : true
        },
        baseData: function (): TenantData {
            return this.editor.first.item as TenantData
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