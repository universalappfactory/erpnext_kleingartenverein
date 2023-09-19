<template>
  <div>
    <label for="first_name" class="block text-sm pb-1 pl-.5 font-medium text-gray-900">{{
      label
    }}</label>

    <div class="flex">
      <input
        type="text"
        :disabled="disabled"
        class="grow bg-gray-50 text-gray-900 text-sm rounded-sm block w-full p-1.5"
        :class="calculatedClass"
        :placeholder="placeholder"
        v-model="actualContent"
        required
      />

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
  </div>
</template>
<script lang="ts">
import { PropType, ref, defineComponent } from "vue";

export enum InputType {
  Default = "Default",
  EMail = "EMail",
  Phone = "Phone",
}

export default defineComponent({
  name: "InputField",

  props: {
    value: {
      type: String,
      default: () => "",
    },
    disabled: {
      type: Boolean,
      default: () => false,
    },
    hasError: {
      type: Boolean,
      default: () => false,
    },
    label: {
      type: String,
      default: () => "Label",
    },
    placeholder: {
      type: String,
      default: () => "",
    },
    type: {
      type: String,
      default: () => "Default",
    },
  },
  emits: {
    valueChanged: () => {
      //ToDo remove ok, just use clicked
      return true;
    },
  },
  
  setup(props, ctx) {
    console.log('SETUP')
    const actualContent = ref(props.value);
    return {
      actualContent,
    };
  },
  methods: {
    getMobileHref(mobile_no) {
      return `tel:${mobile_no}`;
    },
    getMailHref(email_id) {
      return `mailto:${email_id}`;
    },
    isPhone() {
      return this.type === InputType.Phone;
    },
    isMail() {
      return this.type === InputType.EMail;
    },
  },
  computed: {
    calculatedClass() {
      return this.hasError
        ? "border border-red-600 focus:border-red-600 focus:ring-red-600"
        : "border border-gray-300 focus:ring-blue-500 focus:border-blue-500";
    },
  },
});
</script>
