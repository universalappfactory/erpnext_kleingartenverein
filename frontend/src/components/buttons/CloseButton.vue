<template>
  <button
    @click="this.$emit('close')"
    type="button"
    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg"
    data-modal-hide="authentication-modal"
  >
    <svg
      class="w-3 h-3"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 14"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
      />
    </svg>
  </button>
</template>
<script lang="ts" setup>
import { PropType, ref, defineComponent } from "vue";
import { useVModel } from "@vueuse/core";
import { Input } from "flowbite-vue";

const emit = defineEmits(["close"]);
</script>
