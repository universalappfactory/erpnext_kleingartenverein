<template>
    <ul class="divide-y divide-gray-200 dark:divide-gray-700 pl-4 pr-4">
        <li class="pb-3 sm:pb-4 pt-3 sm:pt-4" v-for="(item, index) of data">
            <div class="flex items-center space-x-4">
                <div class="flex-1 min-w-0 overflow-hidden text-ellipsis">
                    {{ item.description }}
                </div>
                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <DownloadButton :url="item.url" />
                </div>
            </div>
        </li>
        <template v-if="data.length === 0">
            <div class="text-center">
                <p>{{ $t('common.no_data') }}</p>
            </div>
        </template>
    </ul>
</template>
<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { AttachmentData } from '../ts/tenanteditor';
import DownloadButton from './DownloadButton.vue'

export default defineComponent({
    name: "AttachmentList",
    components: {
        DownloadButton
    },
    props: {
        data: {
            type: Object as PropType<AttachmentData[]>,
            default: () => [],
        },
    },
    methods: {
        getMobileHref(mobile_no) {
            return `tel:${mobile_no}`
        },
        getMailHref(email_id) {
            return `mailto:${email_id}`
        },

    }
});
</script>