<template>
    <!-- {{ item }} -->

    <div class="grid grid-cols-2 md:grid-cols-4 px-4 py-4">
        

        <div>
            <svg class="w-10 h-10 text-gray-200" aria-hidden="true" fill="currentColor"
                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clip-rule="evenodd"></path>
            </svg>
        </div>
        
        <div>
            <div class="font-semibold">{{ item.name }}</div>
            <div>{{ item.plot_link }}</div>

            <div class="block md:hidden">
                {{ item.email_id }}
                {{ item.mobile_no }}
            </div>
        </div>
        
        <div class="hidden md:block">
            {{ item.email_id }}
            {{ item.mobile_no }}
        </div>
        
    </div>
</template>
<script lang="ts">
import { PropType, defineComponent, ref } from 'vue';
import { TableColumn, ColumnMode } from '../ts/table'

export default defineComponent({
    name: "paechterGrid",
    components: {
    },
    methods: {

    },
    props: {
        item: {
            type: Object as PropType<Record<string, string>>,
            required: true,
        },
    },
    data() {


    }
});
</script>