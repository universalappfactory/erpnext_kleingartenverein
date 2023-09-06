<template>
    <Dropdown
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        :options="items">{{ label }}</Dropdown>
</template>
<script lang="ts">
import { PropType, defineComponent, ref } from 'vue';
import Button from "./Button.vue";
import { DropdownItem } from '../ts/dropdown';
import { Dropdown } from 'frappe-ui'

export default defineComponent({
    name: "DropDownSearch",

    props: {
        label: {
            type: String,
            default: () => "Label",
        },
        items: {
            type: Object as PropType<DropdownItem[]>,
            required: true
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
        toggleDropdown() {
            this.dropDownOpen = !this.dropDownOpen
        },
        itemSelected(item: DropdownItem) {
            this.$emit('selected', item)
            this.toggleDropdown()
        }
    },

});
</script>