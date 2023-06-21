<template>
    <th scope="col" class="px-6 py-3">
        {{ name }}
    </th>
</template>
<script lang="ts">
import { PropType, defineComponent, ref } from 'vue';
import { TableColumn } from '../ts/table'
export default defineComponent({
    name: "tablehead",
    components: {
    },
    methods: {

    },
    props: {
        name: {
            type: Object as PropType<string>,
            required: true,
        },
    },
});
</script>