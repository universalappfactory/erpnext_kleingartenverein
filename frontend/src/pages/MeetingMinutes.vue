<template>
   <NavbarComponent />

   <div class="p-4 sm:ml-64">

      <ListComponent @loadMore="meetingMinutes.next" :items="meetingMinutes.data" :checkable="false"
         :headerList="['Protokolle']" :hasNext="meetingMinutes.hasNextPage">

         <template #item="{ name, description, date }">
            <div class="grid grid-cols-2 md:grid-cols-2 px-4 py-4 content-center">
               <div>
                  <div class="font-semibold">{{ description }}
                     <template v-if="is_new(name)">
                        <span
                           class="inline-flex items-center px-2  mr-4 text-sm font-medium text-blue-800 bg-green-100 rounded">
                           Neu
                        </span>
                     </template>
                  </div>
                  <div>{{ dateAsString(new Date(date)) }}</div>
               </div>
               <div>
                  <a :href="getAttachment(name)" target="_blank" class="flex content-end">
                     <svg aria-hidden="true" class="w-4 h-4 mr-2 fill-current" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                           d="M2 9.5A3.5 3.5 0 005.5 13H9v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V13h2.5a4.5 4.5 0 10-.616-8.958 4.002 4.002 0 10-7.753 1.977A3.5 3.5 0 002 9.5zm9 3.5H9V8a1 1 0 012 0v5z"
                           clip-rule="evenodd"></path>
                     </svg>
                     Download
                  </a>
               </div>
            </div>
         </template>
      </ListComponent>
   </div>
</template>
<script lang="ts">
import ListComponent from '../components/ListComponent.vue';
import { defineComponent, ref, watch } from 'vue';
import { initFlowbite } from 'flowbite'

import NavbarComponent from "../components/Navbar.vue";
import FooterComponent from "../components/Footer.vue";
import GridTable from "../components/GridTable.vue";
import { Dropdown } from 'frappe-ui'
import { Alert, Button, createListResource, createResource } from 'frappe-ui'
import { dateToString } from '../ts/calendar';
import { useSharedDashboard } from '../ts/dashboard';
import { useDashboardStore } from '../ts/dashboardstore';

export default defineComponent({
   name: "Meeting Minutes",
   components: {
      NavbarComponent,
      FooterComponent,
      Dropdown,
      Alert,
      Button,
      GridTable,
      ListComponent
   },

   setup() {
      const dashboard = useSharedDashboard();
      const store = useDashboardStore()
      const meetingMinutes = createListResource({
         doctype: 'Meeting Minutes',
         fields: ['*'],
         start: 0,
         pageLength: 20,
         orderBy: 'date desc',
      })

      const allAttachments = ref([])
      const attachments = createListResource({
         doctype: 'Attachment table',
         fields: ['*'],
         start: 0,
         pageLength: 20,
         // orderBy: 'date desc',
         url: '/api/method/erpnext_kleingartenverein.api.get_all'
      })

      meetingMinutes.fetch()

      const allReadInfos = ref([])
      const readInfo = createResource({
         document_type_name: 'Meeting Minutes',
         // orderBy: 'date desc',
         url: '/api/method/erpnext_kleingartenverein.api.get_read_info'
      })

      watch(meetingMinutes, (val) => {
         let values = []

         for (const x of val.data) {
            values.push(x.name)
         }
         attachments.filters = [['parent', 'IN', values]]
         attachments.fetch()

         readInfo.params = {
            'document_type_name': 'Meeting Minutes',
            'documents': values
         };
         readInfo.fetch()
      })

      watch(attachments, (val) => {
         if (val && val.data) {
            for (const attachment of val.data) {
               allAttachments.value.push(attachment)
            }
         }
      })

      watch(readInfo, (val) => {
         if (val && val.data) {
            for (const readInfo of val.data) {
               allReadInfos.value.push(readInfo)
            }
         }
      })

      return {
         meetingMinutes: meetingMinutes,
         attachments,
         allAttachments,
         dashboard,
         store
      }

   },

   methods: {
      dateAsString(input) {
         return dateToString(input)
      },
      getAttachment(name) {
         var matching = this.allAttachments.find(d => d.parent === name)
         if (matching) {
            return matching.attachment
         }
      },
      is_new(name) {
         return this.store.isUnread(name)
      }
   },

   mounted() {
      initFlowbite();
   }
});
</script>
