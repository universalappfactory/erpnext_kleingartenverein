<template>
  <NavbarComponent />
  <div>
    <div class="hidden md:block">
      <vue-cal class="bg-nature-white" locale="de" events-on-month-view="short" :events="calendarEvents"
        active-view="month" :disable-views="['years', 'year']" :cell-contextmenu="true"
        @cell-contextmenu="logEvents('cell-contextmenu', $event)" @event-focus="logEvents('event-focus', $event)">
      </vue-cal>
    </div>

    <div>
      <h1 class="text-center text-2xl mt-8">Alle Termine</h1>
    </div>
    <div class="flex justify-center mt-4">
      <div class="overflow-x-auto w-full">
        <table class="w-full text-sm text-left text-gray-500 border-separate border-spacing-4">
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
import { createListResource } from 'frappe-ui'
import { defineComponent, reactive } from 'vue';
import NavbarComponent from "../components/Navbar.vue";
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

export default defineComponent({
  name: 'Calendar',
  setup() {
    let events = createListResource({
      doctype: 'Event',
      fields: ['*'],
      filters: {
        event_type: "Public",
        status: "Open",
      },
      orderBy: 'starts_on asc',
      start: 0,
      pageLength: 20,
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
      try {
        const dt = new Date(date)
        return dt;
      } catch(e) {
        console.error(e)
      }
    },
    getUpcoming(events) {
        const now = new Date()
        return events.filter(f => f.start >= now)
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
      try {
        const dt = new Date(input)
        console.log(dt, input)
        return dt.toLocaleDateString("de-DE")
      } catch(e) {
        console.error(e)
      }
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
        return reactive([
          {
            title: "TestEvent",
            start: "2023-06-10",
            end: "2023-06-10",
            selected: false,
            index: 0,
            description: "my description"
          },
          {
            title: "TestEvent2",
            start: "2023-06-10",
            end: "2023-06-10",
            selected: false,
            index: 1,
            description: "my description"
          }
        ])
      }
    },
    getRowClass(x) {
      console.log(x.value)
      return 'bg-red-100'
    }
  },
  components: {
    VueCal,
    NavbarComponent
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
