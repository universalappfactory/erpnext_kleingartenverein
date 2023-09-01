<template>
    <div class="overflow-scroll h-[100%]">
        <p class="border-b-2">{{ $t('tenant_editor.contact_data') }}</p>
        <div class="grid gap-6 mb-6 md:grid-cols-2 mt-3 ">
            <InputField :value="data?.contact?.first_name" :disabled="inputDisabled"
                :label="$t('tenant_editor.first_name')" />
            <InputField :value="data?.contact?.last_name" :disabled="inputDisabled"
                :label="$t('tenant_editor.last_name')" />
        </div>
        <div class="grid gap-6 mb-6 md:grid-cols-1 mt-2 ">
            <InputField :value="data?.contact?.email_id" :disabled="inputDisabled" :label="$t('tenant_editor.email')"
                type="EMail" />
            <InputField :value="data?.contact?.mobile_no" :disabled="inputDisabled"
                :label="$t('tenant_editor.mobile_no')" type="Phone" />
            <InputField :value="data?.contact?.phone" :disabled="inputDisabled" :label="$t('tenant_editor.phone')" />
        </div>

        <p class="border-t-4 pt-2">{{ $t('tenant_editor.address_data') }}</p>
        <div class="grid gap-6 mb-6 md:grid-cols-1 mt-3 ">
            <InputField :value="data?.address?.address_line1" :disabled="inputDisabled"
                :label="$t('tenant_editor.street')" />
            <InputField :value="data?.address?.address_line2" :disabled="inputDisabled"
                :label="$t('tenant_editor.address_line_2')" />
        </div>
        <div class="grid gap-3 mb-6 md:grid-cols-2">
            <InputField :value="data?.address?.pincode" :disabled="inputDisabled" :label="$t('tenant_editor.zip')" />
            <InputField :value="data?.address?.city" :disabled="inputDisabled" :label="$t('tenant_editor.city')" />
        </div>
    </div>
</template>
<script lang="ts">
import { PropType, defineComponent, ref } from 'vue';
import { TenantData } from '../ts/tenanteditor';
import InputField, { InputType } from './InputField.vue'

export default defineComponent({
    name: "TenantBaseData",
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
            type: Object as PropType<TenantData>,
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