<template>
  <div class="flex justify-center mt-4 mb-6 md:rounded-lg sm:mt-0 bg-white">
    <div class="grid grid-cols-1 gap-4 p-4 mt-4 max-w-md justify-center">
      <div>
        <Alert type="success"
          >{{ $t("counter_upload.headline") }} <br /><br />
          <b>{{ $t("counter_upload.head_info") }}</b>
          <p>{{ $t("counter_upload.head_info_long") }}<br /></p>
        </Alert>
      </div>
      <div>
        <Input
          :class="upload.errors.value['tenant']"
          :disabled="upload.isLoading.value || upload.uploadSuccess.value"
          v-model="upload.tenant.value"
          :placeholder="$t('counter_upload.tenant_placeholder')"
          :label="$t('counter_upload.tenant')"
        />
      </div>
      <div>
        <Select
          class="border rounded-lg"
          :disabled="upload.isLoading.value || upload.uploadSuccess.value"
          :class="upload.errors.value['plot']"
          :options="upload.plots.items"
          v-model="upload.plot.value"
          :placeholder="$t('counter_upload.garden_number')"
        />
      </div>
      <div>
        <template v-if="counterNumber !== ''">
          <p class="text-blue-800 font-semibold pt-1 mb-2">
            {{ $t("counter_upload.counter") }}: {{ counterNumber }}
          </p>
        </template>
        <Input
          :class="upload.errors.value['counterValue']"
          :disabled="upload.isLoading.value || upload.uploadSuccess.value"
          v-model="upload.counterValue.value"
          :placeholder="$t('counter_upload.counter_value')"
          :label="$t('counter_upload.counter_value')"
        />

        <Alert class="mt-2" type="success">
          <b>{{ $t("counter_upload.counter_value_hint1") }}</b
          ><br />
          {{ $t("counter_upload.counter_value_hint2") }}
        </Alert>
      </div>

      <div>
        <FileInput
          v-model="upload.file.value"
          :dropzone="true"
          v-if="!upload.preview.value"
        >
          <p class="!mt-1 text-xs text-gray-500">
            {{ $t("counter_upload.counter_picture") }}
          </p>
        </FileInput>

        <Alert type="danger" class="mt-4" v-if="upload.emptyFile.value">
          {{ $t("counter_upload.counter_select_picture") }}
        </Alert>

        <div v-if="upload.preview.value">
          <img :src="upload.preview.value" />
          <div class="flex justify-end mt-2">
            <Button
              :disabled="upload.isLoading.value || upload.uploadSuccess.value"
              @click="upload.clearFile"
              class="bg-red-400"
              >{{ $t("counter_upload.counter_delete_picture") }}</Button
            >
          </div>
        </div>
      </div>

      <div>
        <Alert type="warning">
          {{ $t("counter_upload.email_hint1") }}<br />
          <b>{{ $t("counter_upload.email_hint2") }}</b>
        </Alert>

        <Checkbox
          class="mt-4 ml-2"
          v-model="upload.sendConfirmationMail.value"
          :label="$t('counter_upload.sendConfirmationMail')"
        />
      </div>

      <div class="mt-2 gap-2">
        <template v-if="upload.errorMessage.value === 'Filesize exceeded'">
          <Toast style="padding: 0px; margin-bottom: 2px;" type="danger">
            {{ $t("counter_upload.filesizeError") }}
          </Toast>
        </template>
        <template
          v-if="upload.errors.value['tenant'] && upload.errors.value['tenant'] !== ''"
        >
          <Toast style="padding: 0px; margin-bottom: 2px;" type="danger">
            {{ $t("counter_upload.tenant_error") }}
          </Toast>
        </template>
        <template
          v-if="upload.errors.value['plot'] && upload.errors.value['plot'] !== ''"
        >
          <Toast style="padding: 0px; margin-bottom: 2px;" type="danger"> {{ $t("counter_upload.plot_error") }} </Toast>
        </template>
        <template
          v-if="
            upload.errors.value['counterValue'] &&
            upload.errors.value['counterValue'] !== ''
          "
        >
          <Toast style="padding: 0px; margin-bottom: 2px;" type="danger">
            {{ $t("counter_upload.counter_value_error") }}
          </Toast>
        </template>
      </div>

      <div class="flex items-center">
        <div class="grow mt-0">
          <AnimatedLoadingCard :isLoading="upload.isLoading.value">
            <p class="p-2">{{ $t("counter_upload.submitting") }}</p>
          </AnimatedLoadingCard>

          <Alert class="mr-2" type="danger" v-if="upload.hasError.value">
            {{ $t("counter_upload.error") }}
          </Alert>
        </div>

        <template v-if="upload.uploadSuccess.value">
          <div class="mr-2 text-green-800 bg-white p-4 rounded-lg">
            {{ $t("counter_upload.success") }}
            <i class="text-2xl fa fa-check text-green-400 mr-2"></i>
          </div>
        </template>
        <template v-else>
          <Button
            :disabled="upload.isLoading.value"
            @click="upload.uploadData()"
            class="bg-red-400"
            color="default"
          >
            <div class="flex content-center">
              <div class="mt-1">{{ $t("counter_upload.submit") }}</div>
            </div>
          </Button>
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { Input, Alert, FileInput, Button, Checkbox, Select, Toast } from "flowbite-vue";
import { useCounterUpload } from "../ts/counter_upload";
import { useRoute } from "vue-router";
import AnimatedLoadingCard from "../components/indicators/AnimatedLoadingCard.vue";

const upload = useCounterUpload();
const route = useRoute();

const counterNumber = ref("");

if (route.query.tenant) {
  upload.tenant.value = route.query.tenant;
}

if (route.query.plot) {
  const plot = route.query.plot.replace("Plot-", "");
  upload.plot.value = plot;
}

if (route.query.counternumber) {
  counterNumber.value = route.query.counternumber;
}
</script>
