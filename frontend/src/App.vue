<template>
  <div class="h-screen w-full ">
    <router-view />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import './tailwind.css'
  import { useDashboardStore } from './ts/dashboardstore.ts'

  export default defineComponent({
  name: 'App',

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setup(props, context) {
      const dashboardStore = useDashboardStore();
      return {
        dashboardStore
      }
    },
    mounted() {
      console.log('MOUNTED')
    },
  });
</script>
