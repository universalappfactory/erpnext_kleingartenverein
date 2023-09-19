<template>
  <div>
  <p class="text-2xl border-b-4 border-blue-400 pb-2">
    {{ $t(messageId)}}
  </p>
  </div>
</template>

<script lang="ts" setup>
import { ref  } from "vue";

const props = defineProps<{
  messageId: string,
}>()

</script>
