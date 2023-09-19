<template>
  <div class="w-full">
    <input
      ref="inputText"
      v-model="data"
      v-on:keyup.enter="
        inputText.select();
        $emit('enterPressed');
      "
      class="w-full focus:outline-none border pb-1 border-l-0 border-r-0 border-t-0 border-b-2"
      :class="hasError ? 'border-red-400' : ''"
      :placeholder="placeholder"
      type="text"
    />
    <div :class="dropdownVisible ? 'relative' : 'hidden'" style="z-index:2000">
      <div class="absolute bg-red-100 w-full">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ValidationStatus, type InputSize } from '@/components/Input/types'
import { useInputClasses } from '@/components/Input/composables/useInputClasses'
import { computed, toRefs, ref, watch } from 'vue'
import { watchThrottled } from '@vueuse/core'
import { useVModel } from '@vueuse/core'
import { Badge, ListGroup, ListGroupItem } from 'flowbite-vue'

const props = defineProps<{
  modelValue: string,
  dropdownVisible: Boolean,
  hasError: Boolean
  placeholder?: String
}>()
const emit = defineEmits(['update:modelValue', 'enterPressed'])
const data = ref('')
const inputText = ref(null)


watchThrottled(
  data,
  (val) => {
    console.log('changed!',val)
    emit('update:modelValue', val)
  },
  { throttle: 1000 },
)
</script>
