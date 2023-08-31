<template>
    <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">

            <li class="mr-2" v-for="(item, index) in items">
                <button class="inline-block p-4 rounded-t-lg" 
                    :class="item.selected ? 'border-b-2' : ''" type="button"
                    role="tab" 
                    @click="selectItem(item)"
                    >{{ $t(item.description) }}</button>
            </li>
        </ul>
    </div>
</template>
<script lang="ts">
import { PropType, defineComponent, ref } from 'vue';

export interface TabItem {
    name: string,
    description: string,
    selected: boolean
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
    data() {

    }
});
</script>