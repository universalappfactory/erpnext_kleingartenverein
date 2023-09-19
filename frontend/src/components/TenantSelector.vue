<template>
    <div class="p-4 sm:ml-64">
        <TenantSearchBar @search="executeSearch" :filters="tenant.filters" class="mb-4" />
        <ListComponent @loadMore="tenant.loadMore" :items="tenant.tenants" :checkable="false" :headerList="['Pächter']"
            :hasNext="tenant.pageInfo.hasNext">

            <template #item="{ name, plot_link, email_id, mobile_no, customer_group }">
                <div class="flex p-4">
                    <div class="grid grid-cols-2 content-center">

                        <div class="grid items-center">
                            <input id="default-checkbox" type="checkbox" value="" class="
                     h-4
                     text-blue-600 
                     bg-gray-100 
                     border-gray-300 
                     rounded focus:ring-blue-500 
                     focus:ring-2 
                     " />
                        </div>

                        <svg class="w-10 h-10 text-gray-200" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </div>

                    <div class="grow p-2">
                        <div class="font-semibold">{{ name }}</div>
                        <div class="font-semibold"> {{ plot_link }}</div>
                        <div>{{ email_id }}</div>
                        <div>{{ mobile_no }}</div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 content-center">
                        asd
                    </div>
                </div>
            </template>
        </ListComponent>
    </div>
</template>
  
<script lang="ts">
import { Dialog } from 'frappe-ui'
import { defineComponent, ref } from 'vue';
import { useTenants } from '../ts/tenants';
import { useTenantEditor } from '../ts/tenanteditor';
import ListComponent from "../components/ListComponent.vue";
import TenantEditor from "../components/TenantEditor.vue";
import TenantSearchBar from "../components/TenantSearchBar.vue";


export default defineComponent({
    name: 'TenantSelector',
    components: {
        ListComponent,
        Dialog,
        TenantEditor,
        TenantSearchBar
    },
    setup() {

        const tenant = useTenants()
        const editor = useTenantEditor()
        const selectedCustomer = ref({})
        return {
            tenant,
            selectedCustomer,
            editor
        }

    },
    methods: {
        executeSearch(searchText: any) {
            this.tenant.search(searchText)
        },
    },
    data() {
        return {
            showDialog: false,
        }
    },
    mounted() {
        this.tenant.fetch()
    }

});
</script>
  