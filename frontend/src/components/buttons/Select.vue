<template>
    <div class="flex place-items-center">

        <template v-if="label !== ''">
            <label class="block text-sm mr-2 align-middle font-medium text-gray-900 dark:text-white">{{ label
            }}</label>
        </template>
        <select :disabled="disabled" v-model="currentValue"
            class="grow bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

            <option v-if="placeholder !== ''" :disabled="true" selected>{{ placeholder }}</option>

            <option v-for="(item, index) of items" :value="item.value" :selected="isSelected(item)">
                {{ item.description }}
            </option>
        </select>
    </div>
</template>
<script lang="ts">
import { PropType, defineComponent, ref } from 'vue';
import { SelectItem } from '../../ts/buttons/select';

export default defineComponent({
    name: "Select",

    props: {
        disabled: {
            type: Boolean,
            default: () => false,
            required: false
        },
        label: {
            type: String,
            default: () => "Label",
            required: false
        },
        placeholder: {
            type: String,
            default: () => "Placeholder",
            required: false
        },
        items: {
            type: Object as PropType<SelectItem[]>,
            required: true
        },
        selectedValue: {
            type: String,
            required: false
        },
    },
    setup(props) {
        const currentValue=ref('')
        return {
            currentValue
        }
    },
    emits: {
        itemSelected: () => {
            return true;
        },
    },
    methods: {
        isSelected(item: SelectItem): boolean {
            return this.items.findIndex(itm => itm.description === item.description) > -1
        },
    },
    watch: {
        selectedValue: function(val) {
            if (this.currentValue !== val) {
                this.currentValue = val
            }
        },
        currentValue: function(val) {
            const item = this.items.find(itm => itm.value === val)
            this.$emit('itemSelected', item)
        }
    }

});
</script>