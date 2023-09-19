<template>
    <div class="grid items-center">
        <input ref="checkbox" type="checkbox" :value="selected" :checked="selected" 
            @click="changeSelection" class="
                                h-4
                                text-blue-600 
                                bg-gray-100 
                                border-gray-300 
                                rounded focus:ring-blue-500 
                                focus:ring-2 
                                " />
    </div>
</template>
<script lang="ts">
import { PropType, defineComponent, ref } from 'vue';

export default defineComponent({
    name: "Checkbox",

    props: {
        selected: {
            type: Boolean,
            default: () => false,
            required: true
        },
    },
    setup() {
        const checkbox = ref<HTMLInputElement | undefined>()
        return {
            checkbox
        }

    },
    methods: {
        changeSelection() {
            this.$emit("checkChanged", this.checkbox.checked)
        }
    },
    emits: {
        checkChanged: () => {
            return true;
        },
    },

});
</script>