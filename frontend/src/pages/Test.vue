<template>
  <div>
    <Dropdown
        :options="[
          { label: 'New File', handler: () => alert('New File') },
          { label: 'New Window' },
        ]"
        :button="{ label: 'Menu', icon: 'more-horizontal' }"
      />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

import NavbarComponent from "../components/Navbar.vue";
import FooterComponent from "../components/Footer.vue";
import { Dropdown } from 'frappe-ui'
import { Alert, Button } from 'frappe-ui'

export default defineComponent({
  name: "test-page",
  components: {
    NavbarComponent,
    FooterComponent,
    Dropdown,
    Alert,
    Button
  },
  methods: {
    doIt: function(){
      alert('doIt')
    }
  }
});
</script>