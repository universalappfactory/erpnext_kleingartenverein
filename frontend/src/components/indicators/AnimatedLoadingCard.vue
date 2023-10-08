<template>
  <div :class="cssClass" class="flex items-center justify-center rounded-sm">
    <div
      :class="cssClass"
      class="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-md animate-pulse"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AnimatedLoadingCard",

  props: {
    isLoading: {
      type: Boolean,
      default: () => false,
      required: true,
    },
  },
  computed: {
    cssClass() {
      let result = "";
      if (!this.isLoading) {
        result = result + "hidden";
      }

      return result;
    },
  },
});
</script>
