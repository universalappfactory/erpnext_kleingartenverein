<template>
  <div>
    <router-view />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import './tailwind.css'

  export default defineComponent({
  name: 'App',

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, context) {
  }
  });
</script>
