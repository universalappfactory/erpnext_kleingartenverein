<template>
  <div>
    <button
      type="button"
      :disabled="disabled"
      @click="
        this.$emit('ok');
        this.$emit('clicked');
      "
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 focus:outline-none"
    >
      {{ label }}
    </button>
  </div>
</template>
<script lang="ts">
import { PropType, defineComponent } from "vue";

export default defineComponent({
  name: "Button",

  props: {
    disabled: {
      type: Boolean,
      default: () => false,
    },
    label: {
      type: String,
      default: () => "Label",
    },
  },
  emits: {
    ok: () => {
      //ToDo remove ok, just use clicked
      return true;
    },
    clicked: () => {
      return true;
    },
  },
});
</script>
