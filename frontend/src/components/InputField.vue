<template>
    <div>
        <label for="first_name" class="block text-sm pb-1 pl-.5 font-medium text-gray-900 dark:text-white">{{ label
        }}</label>

        <div class="flex">
            <input type="text" :disabled="disabled"
                class="grow bg-gray-50 
                    border 
                    border-gray-300 
                    text-gray-900 text-sm 
                    rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                :placeholder="label" :value="value" required />

            <template v-if="isPhone()">
                <a :href="getMailHref(value)" type="button"
                    :class="value ? 'text-blue-700 hover:bg-blue-700 border  hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 ' : 'border border-gray-300  bg-gray-100'"
                    class="ml-2 grow-0 disabled:opacity-75   font-medium text-sm p-2.5 text-center inline-flex items-center">
                    <i class="fa fa-phone" aria-hidden="true"></i>
                    <span class="sr-only">{{ label }}</span>
                </a>
            </template>
            <template v-if="isMail()">
                <a :href="getMailHref(value)" type="button"
                    :class="value ? 'text-blue-700 hover:bg-blue-700 border  hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 ' : 'border border-gray-300  bg-gray-100'"
                    class="ml-2 grow-0 disabled:opacity-75   font-medium text-sm p-2.5 text-center inline-flex items-center">
                    <i class="fa fa-envelope" aria-hidden="true"></i>
                    <span class="sr-only">{{ label }}</span>
                </a>
            </template>
        </div>
    </div>
</template>
<script lang="ts">
import { PropType, defineComponent } from 'vue';

export enum InputType {
    Default = "Default",
    EMail = "EMail",
    Phone = "Phone"
}

export default defineComponent({
    name: "InputField",

    props: {
        value: {
            type: Object as PropType<any>,
            default: () => "",
        },
        disabled: {
            type: Boolean,
            default: () => false,
        },
        label: {
            type: String,
            default: () => "Label",
        },
        type: {
            type: String,
            default: () => "Default",
        },
    },
    methods: {
        getMobileHref(mobile_no) {
            return `tel:${mobile_no}`
        },
        getMailHref(email_id) {
            return `mailto:${email_id}`
        },
        isPhone() {
            return this.type === InputType.Phone
        },
        isMail() {
            return this.type === InputType.EMail
        }
    },
    data() {

    }
});
</script>