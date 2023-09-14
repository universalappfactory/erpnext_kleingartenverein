<template>
  <div class="flex">
    <Input :placeholder="label" class="grow" v-model="data" :disabled="disabled" />

    <template v-if="isPhone()">
      <a
        :href="getMailHref(value)"
        type="button"
        :class="
          value
            ? 'text-blue-700 hover:bg-blue-700 border  hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 '
            : 'border border-gray-300  bg-gray-100'
        "
        class="ml-2 grow-0 disabled:opacity-75 font-medium text-sm p-2.5 text-center inline-flex items-center"
      >
        <i class="fa fa-phone" aria-hidden="true"></i>
        <span class="sr-only">{{ label }}</span>
      </a>
    </template>
    <template v-if="isMail()">
      <a
        :href="getMailHref(value)"
        type="button"
        :class="
          value
            ? 'text-blue-700 hover:bg-blue-700 border  hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 '
            : 'border border-gray-300  bg-gray-100'
        "
        class="ml-2 grow-0 disabled:opacity-75 font-medium text-sm p-2.5 text-center inline-flex items-center"
      >
        <i class="fa fa-envelope" aria-hidden="true"></i>
        <span class="sr-only">{{ label }}</span>
      </a>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { PropType, ref, defineComponent } from "vue";
import { useVModel } from "@vueuse/core";
import { Input } from "flowbite-vue";

const props = defineProps<{
  value: String;
  disabled: Boolean;
  type?: String;
  label: String;
}>();

const data = useVModel(props, "value");

const isMail = (val) => {
  return props.type === "EMail";
};
const isPhone = (val) => {
  return props.type === "Phone";
};

const getMobileHref = (mobile_no) => {
  return `tel:${mobile_no}`;
};
const getMailHref = (email_id) => {
  return email_id !== '' ? `mailto:${email_id}` : '';
};
</script>
