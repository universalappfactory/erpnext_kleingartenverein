<template>
    <Button @click="toggleDropdown" :label="label">{{ label }}</Button>

    <!-- Dropdown menu -->
    <div id="dropdown" style="z-index: 1000; position: relative; " :class="dropDownOpen ? 'block' : 'hidden'"
        class="bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
        <ul style="position: absolute;" class="bg-white border-2 rounded-md py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton">
            <li v-for="(item, index) of items">
                <a @click="itemSelected(item)"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    {{ item.label }}
                </a>
            </li>

        </ul>
    </div>
</template>
<script lang="ts">
import { PropType, defineComponent, ref } from 'vue';
import Button from "./Button.vue";
// import Dropdown from 'frappe-ui'
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