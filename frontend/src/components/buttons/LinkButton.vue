<template>
    <div>
        <a type="button" :href="disabled ? '#' : href" :target="disabled ? '' : target" :disabled="disabled"
            @click="this.$emit('clicked')"
            :class="disabled ? 'bg-gray-300' : 'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300'" class="text-white  font-medium rounded-lg 
            text-sm px-5 py-2.5 mr-2
             mb-2">{{label }}</a>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "LinkButton",

    props: {
        disabled: {
            type: Boolean,
            default: () => false,
        },
        href: {
            type: String,
        },
        label: {
            type: String,
            default: () => "Label",
        },
        target: {
            type: String,
            default: () => "_blank",
        },
    },
    emits: {
        clicked: () => {
            return true;
        },
    },

});
</script>