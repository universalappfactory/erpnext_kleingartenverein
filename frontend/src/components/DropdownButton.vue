<template>
    <div>
        <Button :label="label" @click="openDropDown">
        </Button>

        <!-- Dropdown menu -->
        <div ref="dropDown" :class="dropDownVisible ? 'relative' : 'hidden'" style=""
            class="z-10 bg-red-100 rounded-lg dark:bg-gray-700">
            <div class="absolute border-2">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import Button from "./Button.vue";

export default defineComponent({
    name: "DropdownButton",

    props: {
        label: {
            type: String,
            default: () => "Label",
        },
    },
    components: {
        Button,
    },
    setup() {
        const dropDown = ref<HTMLDivElement | null>(null);
        const dropDownVisible = ref(false)
        return {
            dropDown,
            dropDownVisible,
        }
    },
    methods: {
        openDropDown(searchText: any) {
            console.log(this.dropDown)
            this.dropDownVisible = !this.dropDownVisible
        },
    }
});
</script>