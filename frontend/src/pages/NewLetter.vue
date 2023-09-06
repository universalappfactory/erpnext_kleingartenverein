<template>
    <div class="p-4 sm:ml-64">
        <div class="grid grid-cols-1">
            
            <div class="flex">
                <DropdownButton :label="$t('new_letter.recipients')">
                    <div class="bg-gray-100 w-full max-h-[60vh] min-w-[30rem] pt-4 overflow-scroll">
                        <TenantList :selectable="true" :tenant="tenant" />
                    </div>
                </DropdownButton>
                
            </div>

            <div class="border-b-2 mt-4 pb-2">
                <div class="flex flex-wrap gap-2">

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
                </div>
            </div>

            <div class="mt-4">
                <DropDownlist @selected="templateSelected" :label="$t('new_letter.template')" :items="letter.templates" />
            </div>

            <div class="bg-red-100 mt-4">
                asd
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">resizeBy
import { Dialog } from 'frappe-ui'
import { defineComponent, ref } from 'vue';
import TenantSelector from "../components/TenantSelector.vue";
import DropdownButton from "../components/DropdownButton.vue";
import TenantList from "../components/TenantList.vue";
import DropDownlist from "../components/DropDownlist.vue";
import { useTenants } from '../ts/tenants';
import { useMemberLetter } from '../ts/member_letter';
import { DropdownItem } from '../ts/dropdown';

export default defineComponent({
    name: 'Home',
    data() {
        return {
            showDialog: false,
        }
    },
    setup() {
        const letter = useMemberLetter()
        const tenant = useTenants()
        return {
            tenant,
            letter
        }

    },
    mounted() {
        this.letter.fetchData()
    },
    methods: {
        removeRecipient(name: string) {
            this.tenant.unselect(name)
        },
        templateSelected(item: DropdownItem) {
            console.log('templateSelected', item)
        }
    },
    components: {
        Dialog,
        TenantSelector,
        DropdownButton,
        TenantList,
        DropDownlist
    },
});
</script>
  