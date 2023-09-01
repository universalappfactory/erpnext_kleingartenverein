<template>
    <div>
        <a type="button"
            :href="url" 
            class="px-3 py-2 text-sm font-medium text-center inline-flex items-center text-gray-500  hover:opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg aria-hidden="true" class="w-5 h-5 mr-2 fill-current" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                    d="M2 9.5A3.5 3.5 0 005.5 13H9v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V13h2.5a4.5 4.5 0 10-.616-8.958 4.002 4.002 0 10-7.753 1.977A3.5 3.5 0 002 9.5zm9 3.5H9V8a1 1 0 012 0v5z"
                    clip-rule="evenodd"></path>
            </svg>
            {{ label }}
        </a>
    </div>
</template>
<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { AttachmentData } from '../ts/tenanteditor';

export default defineComponent({
    name: "DownloadButton",

    props: {
        url: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: false
        },
    },
    emits: {
        ok: () => {
            return true;
        },
    },

});
</script>