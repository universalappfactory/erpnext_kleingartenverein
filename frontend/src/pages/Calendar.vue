<template>
  <div class="">
    <div class="hidden md:block">
      <vue-cal class="bg-nature-white" locale="de" events-on-month-view="short" :events="calendarEvents"
        active-view="month" :disable-views="['years', 'year']" :cell-contextmenu="true"
        @cell-contextmenu="logEvents('cell-contextmenu', $event)" @event-focus="logEvents('event-focus', $event)">
      </vue-cal>
    </div>

    <div class="bg-sand md:mt-8">
      <h1 class="text-center text-2xl py-8">Kommende Termine</h1>
    </div>
    <div class="flex justify-center">
      <div class="overflow-x-auto w-full">
        <table class="w-full text-sm text-left text-gray-500 body border border-gray-400 border-spacing-4">
          <tbody>
            <tr v-for="(event, index) in getUpcoming(calendarEvents)" :key="index"
              class="border-b dark:bg-gray-900 dark:border-gray-700"
              :class="event.selected ? 'bg-red-100' : 'bg-gray-50'">
              <td scope="row" class="align-top px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {{ this.formatedDate(event.start) }}
              </td>
              <td class="px-6 py-4">
                <div class="font-semibold">{{ event.title }}</div>
                <div v-html="event.description">
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { createListResource, createResource } from 'frappe-ui'
import { defineComponent, reactive } from 'vue';
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

export default defineComponent({
  name: 'Calendar',
  setup() {
    let events = createResource({
      // doctype: 'Event',
      // fields: ['*'],
      // filters: {
      //   event_type: "Public",
      //   status: "Open",
      // },
      // orderBy: 'starts_on asc',
      // start: 0,
      // pageLength: 20,
      url: '/api/method/erpnext_kleingartenverein.api.get_public_events'
    })

    events.fetch()
    return {
      events
    }

  },
  data() {
    return {
      showDialog: false,
    }
  },
  methods: {
    getDate(date): Date {
      const dt = new Date(date)
      if (dt.getHours() <= 0) {
        dt.setHours(1)
      }
      return dt
    },
    getStartDate(event): string {
      return this.getDate(event.starts_on)
    },
    getEndDate(event): string {
      if (event.ends_on) {
        return this.getDate(event.ends_on)
      }
      return this.getStartDate(event)
    },
    formatedDate(input: string) {
      const dt = new Date(input)
      return dt.toLocaleDateString("de-DE")
    },
    logEvents(name, event) {
      const matching = this.calendarEvents.find(e => e.index === event.index)
      if (name === 'event-focus') {
        for (const evt of this.calendarEvents) {
          evt.selected = false
        }
        matching.selected = !matching.selected
      }
    },
    getUpcoming(events) {
      const now = new Date()
      return events.filter(f => f.start >= now)
    }
  },
  computed: {
    calendarEvents() {
      if (this.events && this.events.data) {
        var calendarEvents = this.events.data.map((evt, idx) => {
          return {
            title: evt.subject,
            start: this.getStartDate(evt),
            end: this.getEndDate(evt),
            index: idx,
            description: evt.description
          }
        })
        return reactive(calendarEvents);
      } else {
        return reactive([])
      }
    },
  },
  components: {
    VueCal
  },
});
</script>

<style>
.vuecal--month-view .vuecal__cell {
  height: 80px;
}

.vuecal--month-view .vuecal__cell-content {
  justify-content: flex-start;
  height: 100%;
  align-items: flex-end;
}

.vuecal--month-view .vuecal__cell-date {
  padding: 4px;
}

.vuecal--month-view .vuecal__no-event {
  display: none;
}

.vuecal__flex .vuecal__menu {
  background-color: rgb(109 143 57)
}

.vuecal__title-bar {
  background-color: rgb(109 143 0.6)
}

.vuecal__cell-events {
  padding: 4px;

}

.vuecal__event {
  background-color: aqua;
  background-color: rgb(109 143 0.3);
  color: #000;
  margin-bottom: 1px;
}
</style>
