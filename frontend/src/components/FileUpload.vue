<template>
    <div class="p-4">
        <FileInput v-model="file" :dropzone="true">
        </FileInput>
        <Button :disabled="file === undefined" @clicked="$emit('upload', file)" class="mt-2" :label="props.label ?? $t('fileupload.upload')"></Button>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, Ref } from "vue";
import { FileInput } from "flowbite-vue";
import { useBankstatementUpload } from "../ts/bankstatement_upload";
import Button from "../components/Button.vue";

const file = ref<File | undefined>()

const props = defineProps<{
    label?: string 
}>()

defineEmits<{
    (e: 'upload', file: File | undefined): void;
}>()


</script>
