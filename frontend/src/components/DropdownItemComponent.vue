<template>
    
    <div>
        {{ label }}
    </div>
</template>
<script lang="ts">
import { PropType, defineComponent, ref } from 'vue';
import Button from "./Button.vue";
import { Dropdown } from 'frappe-ui'

export default defineComponent({
    name: "DropdownItemComponent",

    props: {
        label: {
            type: String,
            default: () => "Label",
        },
        
    },
    emits: {
        selected: () => {
            return true;
        },
    },
    components: {
        Button,
        Dropdown
    },
    setup() {
        const dropDown = ref<HTMLDivElement | null>(null);
        const dropDownOpen = ref(false)
        return {
            dropDown,
            dropDownOpen,
        }
    },
    methods: {
        
    },

});
</script>