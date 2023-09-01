<template>
  <div class="w-full ">
    <Navbar></Navbar>
    <router-view />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import './tailwind.css'
  import { useDashboardStore } from './ts/dashboardstore'
  // import { initFlowbite } from 'flowbite'
  import Navbar from "./components/Navbar.vue";

  export default defineComponent({
  name: 'App',
    components: {
      Navbar,
    },
    setup() {
      const dashboardStore = useDashboardStore();
      return {
        dashboardStore
      }
    },
    mounted() {
      // initFlowbite()
    },
  });
</script>
