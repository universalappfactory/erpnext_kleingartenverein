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
        <Input class="border-red-600 focus:outline-none focus:ring-0 focus:border-red-600" v-model="upload.tenant.value" placeholder="Name of tenant" label="Tenant" />
      </div>
      <div>
        <Select :options="upload.plots.items" v-model="upload.plot.value" placeholder="Garden number" />
      </div>
      <div>
        <Input v-model="upload.counterValue.value" placeholder="Counter value" label="Counter value" />
      </div>
      {{ upload.counterValue}}
      <div>
        <FileInput v-model="file" :dropzone="true" v-if="!preview">
          <p class="!mt-1 text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </FileInput>
        <div v-if="preview" >
          <img :src="preview" />
          <div class="flex justify-end">
            <Button @click="clearFile" class="bg-red-400">Löschen</Button>
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
          v-model="sentConfirmationMail"
          label="Sent confirmation mail"
        />
      </div>

      <div>
        <Button @click="upload.executeUpload()" class="bg-red-400" color="default"
          >Übertragen</Button
        >
      </div>
      <Alert type="danger" v-if="upload.hasError.value"> Es ist ein Fehler aufgetreten </Alert>
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

const upload = useCounterUpload();

// const { execute } = useAxios(
//   "http://localhost:8000/api/method/erpnext_kleingartenverein.public_api.upload_counter_value",
//   {
//     method: "POST",
//   },
//   { immediate: false }
// );

// // const preview = computed(() => {
// //   if file.value {
// //     return URL.createObjectURL(file.value);
// //   }
// // })

// const preview = computed(() => {
//   if (file.value) {
//     return URL.createObjectURL(file.value);
//   }
// });

// const uploadContent = async () => {
//   try {
//     console.log("uploadContent", file.value);
//     hasError.value = false;
//     const r = await execute({
//       data: { file: file.value },
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//       method: "POST",
//     });
//     console.log("upload result: ", r);
//   } catch (e) {
//     console.error(e);
//     hasError.value = true;
//   }
// };
</script>
