<template>
    <div class="p-4 sm:ml-64">
        <Dialog id="bank-statement-upload" v-model="bodyDialog" style="z-index: 300">
            <template #body>
                <FileUpload  @close="closeEditor" @upload="executeUpload" />
            </template>
        </Dialog>

        <PageHeadline messageId="bankstatements.headline" />

        <div class="mt-6" :disabled="true">
            <Alert v-if="upload.uploadMessage?.value?.success === false" type="danger" class="mb-2 mt-4">
                {{ upload.uploadMessage?.value?.message }}
            </Alert>

            <Alert v-if="upload.uploadMessage?.value?.success === true" type="success" class="mb-2 mt-4">
                {{ $t("bankstatements.uploadsuccess") }}
            </Alert>

            <div class="flex flex-wrap">
                <Button class="mb-4" @click="uploadBankStatement" :label="$t('bankstatements.upload')"></Button>
                <Button class="mb-4" @click="showBankTransactions" :label="$t('bankstatements.show_bank_transactions')"></Button>
            </div>
            <ListComponent :items="items" @showDetails="showItemDetails" :hasNext="pageInfo.hasNext" @loadMore="next()"
                :headerList="[$t('bankstatements.headline')]">
                <template #item="{ name }">
                    <div class="flex p-4">
                        <div class="grow">{{ name }}</div>
                        <div>
                            <a @click="showDetails(name)" target="_blank" type="button"
                                class="text-blue-700 hover:bg-blue-700 border border-blue-700  hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:opacity-75 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center">
                                <i class="fa fa-external-link" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                </template>
            </ListComponent>
            <a :href="openLink" class="hidden" target="_blank" ref="openLinkAnchor" />
        </div>

        <template v-if="upload.loading.value">
            <div class="min-h-[20vh]">
                <LoadingIndicator :isLoading="true" />
            </div>
        </template>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useList } from "../ts/list";
import { useBankstatementUpload } from "../ts/bankstatement_upload"
import Button from "../components/Button.vue";
import ListComponent from "../components/ListComponent.vue";
import PageHeadline from "../components/PageHeadline.vue";
import FileUpload from "../components/FileUpload.vue";
import LoadingIndicator from "../components/indicators/LoadingIndicator.vue";
import { Badge, Input, Alert } from "flowbite-vue";
import { Dropdown, Dialog } from "frappe-ui";

const openLinkAnchor = ref();
const openLink = ref("");
const bodyDialog = ref(false);

const { fetch, previous, next, items, pageInfo } = useList({
    docType: "Bank Statement Import",

});

const upload = useBankstatementUpload()

onMounted(async () => {
    await fetch();
});

const closeEditor = () => {
    bodyDialog.value = false;
};

const executeUpload = async (file) => {
    if (file) {
        closeEditor()
        await upload.upload(file)
        await fetch()
    }
};

const showItemDetails = (item) => {
    showDetails(item.name)
}

const showDetails = (name) => {
    // openLink.value = `/app/bank-statement-import/${encodeURI(name)}`;
    // openLinkAnchor.value.click();
    window.open(`/app/bank-statement-import/${encodeURI(name)}`,'_blank');
};

const showBankTransactions = () => {
    // openLink.value = ;
    // openLinkAnchor.value.click();
    window.open('/app/bank-transaction?status=Unreconciled','_blank');
}

const uploadBankStatement = () => {
    bodyDialog.value = true
}

</script>


<style scoped>
button {
    font-weight: bold;
}
</style>
