<template>
  <ListComponent
    @loadMore="() => this.loadMore()"
    :items="items"
    :checkable="false"
    :headerList="['Pächter']"
    :hasNext="hasNext"
    @show-details="(x) => $emit('clicked', x.name)"
  >
    <template #item="{ name, plot_link, email_id, mobile_no, customer_group, selected }">
      <div class="flex p-4">
        <div class="grid grid-cols-2 content-center">
          <svg
            class="w-10 h-10 text-gray-200"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>

        <div class="grow p-2">
          <div class="font-semibold">{{ name }}</div>
          <div class="font-semibold">{{ plot_link }}</div>
          <div>{{ email_id }}</div>
          <div>{{ mobile_no }}</div>
        </div>
      </div>
    </template>

    <template v-slot:empty>
      <div class="min-h-[20vh]">
        <LoadingIndicator :isLoading="true" />
      </div>
    </template>
  </ListComponent>
</template>
<script lang="ts" setup>
import { ValidationStatus, type InputSize } from '@/components/Input/types'
import { useInputClasses } from '@/components/Input/composables/useInputClasses'
import { computed, toRefs, ref, watch } from 'vue'
import { watchThrottled } from '@vueuse/core'
import { useVModel } from '@vueuse/core'
import { Dropdown, ListGroup, ListGroupItem } from 'flowbite-vue'
import { TenantData } from '../../ts/tenant'
import ListComponent from "../ListComponent.vue";
import LoadingIndicator from "../indicators/LoadingIndicator.vue";

const props = defineProps<{
  items: Array<TenantData>,
  hasNext?: Boolean
}>()
const emit = defineEmits(['loadMore', 'clicked'])
</script>
