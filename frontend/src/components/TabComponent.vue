<template>
    <div class="mb-4 border-b border-gray-400">
        <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
            <li class="mr-2" v-for="(item, index) in items">
                <button class="inline-block p-4 rounded-t-lg" :class="item.selected ? 'border-b-2 border-blue-400' : ''"
                    type="button" role="tab" @click="selectItem(item)">
                    <div class="flex items-center">
                        <i class="fa" :class="item.icon" aria-hidden="true"></i>
                        <div class="hidden sm:block pl-2">{{ $t(item.description) }}</div>
                    </div>
                </button>
            </li>
        </ul>
    </div>
</template>
<script lang="ts">
import { PropType, defineComponent, ref } from 'vue';

export interface TabItem {
    name: string,
    description: string,
    selected: boolean,
    icon: string
}

export default defineComponent({
    name: "TabComponent",
    components: {
    },
    methods: {
        selectItem(item) {
            for (const x of this.items) {
                x.selected = false;
            }
            item.selected = true
            this.$emit('itemSelected', item)
        }
    },
    emits: {
        itemSelected: (item) => {
            return true;
        },
    },
    props: {
        items: {
            type: Array as PropType<TabItem[]>,
            default: () => [],
        },
    },
});
</script>