<template>
  <div class="flex justify-center">
    <div class="grid grid-cols-1 gap-4 p-4 max-w-md justify-center">
      <div>
        <Alert type="success"
          >Hallo, hier könnt ihr euere Zählerstände hochladen. <br /><br />
          <b>Bitte beachtet:</b>
          <p>
            Wenn ihr auf Übertragen klickt wird ein grüner Haken angezeigt sobald die
            Übertragung funktioniert hat!
          </p>
          <br />
          <p>Bei Name bitte den Name des Pächters eingeben</p>
        </Alert>
      </div>
      <div>
        <Input
          :class="upload.errors.value['tenant']"
          v-model="upload.tenant.value"
          placeholder="Name of tenant"
          label="Tenant"
        />
      </div>
      <div>
        <Select
          class="border rounded-lg"
          :class="upload.errors.value['plot']"
          :options="upload.plots.items"
          v-model="upload.plot.value"
          placeholder="Garden number"
        />
      </div>
      <div>
        <Input
          :class="upload.errors.value['counterValue']"
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
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </FileInput>

        <Alert type="danger" class="mt-2" v-if="upload.emptyFile.value">
          Bitte wählen Sie ein Bild aus
        </Alert>

        <div v-if="upload.preview.value">
          <img :src="upload.preview.value" />
          <div class="flex justify-end">
            <Button
              :disabled="upload.isLoading.value"
              @click="upload.clearFile"
              class="bg-red-400"
              >Löschen</Button
            >
          </div>
        </div>
      </div>

      <div>
        <Alert class="mt-2" type="warning">
          Wenn ihr eine EMail Adresse bei uns hinterlegt habt, können wir euch eine
          Bestätigung senden sobald die Zählerstände eingetragen und geprüft sind.
          <br /><b>Das kann ein paar Tage dauern.</b>
        </Alert>

        <Checkbox
          class="mt-2 ml-2"
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

      <Alert type="danger" v-if="upload.hasError.value">
        Es ist ein Fehler aufgetreten
      </Alert>
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

import AnimatedLoadingCard from "../components/indicators/AnimatedLoadingCard.vue";

const upload = useCounterUpload();
</script>
