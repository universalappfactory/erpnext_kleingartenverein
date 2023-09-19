<template>
    <template v-if="mode == '0'">
        <th scope="col" class="px-6 py-3">
            {{ item[column.PropertyNames[0]] }}
        </th>
    </template>
    <template v-else-if="mode == '1'">
        <th scope="col" class="px-6 py-3">
        <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
            <div class="pl-3">
                <div class="text-base font-semibold">{{ item[column.PropertyNames[0]] }}</div>
                <div class="font-normal text-gray-500">{{ item[column.PropertyNames[1]] }}</div>
            </div>
        </th>
        </th>
    </template>
</template>
<script lang="ts">
import { PropType, defineComponent, ref } from 'vue';
import { TableColumn, ColumnMode } from '../ts/table'

export default defineComponent({
    name: "tablehead",
    components: {
    },
    methods: {

    },
    props: {
        item: {
            type: Object as PropType<Array<Record<string, string>>>,
            required: true,
        },
        column: {
            type: Object as PropType<TableColumn>,
            required: true,
        },
    },
    data() {

        const mode = this.column.Mode.toString()

        return {
            mode
        }
    }
});
</script>