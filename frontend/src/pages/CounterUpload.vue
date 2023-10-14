<template>
  <div class="flex justify-center">
    <div class="grid grid-cols-1 gap-4 p-4 max-w-md justify-center">
      <div>
        <Alert type="success"
          >Hallo, hier könnt ihr euere Zählerstände hochladen. <br /><br />
          <b>Bitte beachtet:</b>
          <p>
            Nach dem klick auf Übertragen wird ein Hinweis angezeigt, ob alles geklappt hat!<br/>
          </p>
        </Alert>
      </div>
      <div>
        <Input
          :class="upload.errors.value['tenant']"
          :disabled="upload.isLoading.value || upload.uploadSuccess.value"
          v-model="upload.tenant.value"
          placeholder="Name of tenant"
          label="Tenant"
        />
      </div>
      <div>
        <Select
          class="border rounded-lg"
          :disabled="upload.isLoading.value || upload.uploadSuccess.value"
          :class="upload.errors.value['plot']"
          :options="upload.plots.items"
          v-model="upload.plot.value"
          placeholder="Garden number"
        />
      </div>
      <div>
        <template v-if="counterNumber !== ''">
          <p class="text-blue-800 font-semibold pt-1 mb-2">
            Counter: {{ counterNumber }}
          </p>
        </template>
        <Input
          :class="upload.errors.value['counterValue']"
          :disabled="upload.isLoading.value || upload.uploadSuccess.value"
          v-model="upload.counterValue.value"
          placeholder="Counter value"
          label="Counter value"
        />

        <Alert class="mt-2" type="success">
          <b>Zählerstand in Kubikmeter (z.B. 19.3)</b>
          <br />Als Dezimaltrennzeichen einen Punkt verwenden
        </Alert>
      </div>

      <div>
        <FileInput
          v-model="upload.file.value"
          :dropzone="true"
          v-if="!upload.preview.value"
        >
          <p class="!mt-1 text-xs text-gray-500 dark:text-gray-400">
            Foto von dem Zählerstand hinzufügen
          </p>
        </FileInput>

        <Alert type="danger" class="mt-4" v-if="upload.emptyFile.value">
          Bitte wählen Sie ein Bild aus
        </Alert>

        <div v-if="upload.preview.value">
          <img :src="upload.preview.value" />
          <div class="flex justify-end mt-2">
            <Button
              :disabled="upload.isLoading.value || upload.uploadSuccess.value"
              @click="upload.clearFile"
              class="bg-red-400"
              >Löschen</Button
            >
          </div>
        </div>
      </div>

      <div>
        <Alert type="warning">
          Wenn ihr eine EMail Adresse bei uns hinterlegt habt, können wir euch eine
          Bestätigung senden sobald die Zählerstände eingetragen und geprüft sind.
          <br /><b>Das kann ein paar Tage dauern.</b>
        </Alert>

        <Checkbox
          class="mt-4 ml-2"
          v-model="upload.sentConfirmationMail.value"
          label="Sent confirmation mail"
        />
      </div>

      <div class="flex items-center">
        <div class="grow mt-0">
          <AnimatedLoadingCard :isLoading="upload.isLoading.value">
            <p class="p-2">Daten werden übertagen</p>
          </AnimatedLoadingCard>
        </div>

        <Alert type="danger" class="mr-2" v-if="upload.hasError.value">
          Es ist ein Fehler aufgetreten
        </Alert>

        <template v-if="upload.uploadSuccess.value">
          <div class="mr-2 text-green-800">
            <i class="text-2xl fa fa-check text-green-400"></i>Vielen Dank, ihre Daten
            wurden erfolgreich übertragen
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
              <div class="mt-1">Übertragen</div>
            </div>
          </Button>
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PropType, ref, defineComponent, computed } from "vue";
import { useVModel } from "@vueuse/core";
import { Input, Alert, FileInput, Button, Checkbox, Select } from "flowbite-vue";
// import { Img as FbImg } from 'flowbite-vue'
import { useAxios } from "@vueuse/integrations/useAxios";
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
  upload.plot.value = route.query.plot;
}

if (route.query.counternumber) {
  counterNumber.value = route.query.counternumber;
}
</script>
