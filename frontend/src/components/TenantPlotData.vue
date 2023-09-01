<template>
    <div class="overflow-scroll h-[100%]">
        <div class="grid gap-6 mb-6 md:grid-cols-1 mt-3 ">
            <InputField :value="data?.plot_number" :disabled="inputDisabled" :label="$t('tenant_editor.plot_number')" />
            <InputField :value="data?.plot_size_sqm" :disabled="inputDisabled" :label="$t('tenant_editor.plot_size_sqm')" />
        </div>
    </div>
</template>
<script lang="ts">
import { PropType, defineComponent, ref } from 'vue';
import { PlotData, TenantData } from '../ts/tenanteditor';
import InputField, { InputType } from './InputField.vue'

export default defineComponent({
    name: "TenantPlotData",
    components: {
        InputField
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
        data: {
            type: Object as PropType<PlotData>,
            default: () => [],
        },
    },
    data() {
        const inputDisabled = true
        return {
            inputDisabled
        }
    }
});
</script>