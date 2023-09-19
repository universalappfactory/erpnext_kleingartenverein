<template>
    <th scope="col" class="px-6 py-3">
        {{ name }}
    </th>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: "tablehead",
    components: {
    },
    methods: {

    },
    props: {
        name: {
            type: String,
            required: true,
        },
    },
});
</script>