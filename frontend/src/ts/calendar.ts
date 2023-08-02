
import { createSharedComposable } from '@vueuse/core'
import { createResource } from 'frappe-ui'
import { computed, reactive, watch } from 'vue';


export interface CalendarEvent
{
    title: string
    start: Date
    end: Date,
    selected: boolean,
    index: number,
    description: string
}

export function formattedDate(input: CalendarEvent) {
    const dt = new Date(input.start)
    return dateToString(dt)
}

export function dateToString(input: Date) {
  console.log(input)

  return input.toLocaleDateString("de-DE", {
    "day": "2-digit",
    "month": "2-digit",
    "year": "numeric"
  })
}

export function getDurationString(input: CalendarEvent) {
  const start = input.start.toLocaleTimeString("de-DE", {
    "hour": "2-digit",
    "minute": "2-digit",
  })
  let end = input.end.toLocaleTimeString("de-DE", {
    "hour": "2-digit",
    "minute": "2-digit",
  })

  if (input.end.getTime() === (input.start.getTime() + 86400000)) {
    return "Ganztägig"
  }

  return `${start} - ${end} Uhr`
}

export function useCalendar() {

    const events = createResource({
        url: '/api/method/erpnext_kleingartenverein.api.get_public_events'
    })

    const calendarEvents:CalendarEvent[]  = reactive([])

    events.fetch();

    const getDate = function(date): Date {
      try {
        const dt = new Date(date)
        if (dt.getHours() <= 0) {
          dt.setHours(1)
        }
        return dt;
      } catch(e) {
        console.error(e)
      }
    }

    const getStartDate = function(event): Date {
      return getDate(event.starts_on)
    }

    const getEndDate = function(event): Date {
      if (event.ends_on) {
        return getDate(event.ends_on)
      }
      const start = getStartDate(event)
      const r = new Date()
      r.setTime(start.getTime() + 86400000)
      return r;
    }


    const addRange = function(input: CalendarEvent[]) {
      calendarEvents.splice(0, calendarEvents.length)
      for (const val of input)  {
        calendarEvents.push(val)
      }
    }

    watch(events, ()  => {
      addRange(events.data.map((evt, idx) => {
                return reactive({
                  title: evt.subject,
                  start: getStartDate(evt),
                  end: getEndDate(evt),
                  index: idx,
                  description: evt.description
                })
            }))
      })

    const upcomingEvents = computed(() => {
      const now = new Date()
      return calendarEvents.filter(evt => evt.start > now)
    })

    const eventFocused = function(name, event) {
        const matching = calendarEvents.find(e => e.index === event.index)
        if (name === 'event-focus') {
            for (const evt of calendarEvents) {
                evt.selected = false
            }
            matching.selected = !matching.selected
        }
    }

    return {
        events,
        calendarEvents,
        eventFocused,
        upcomingEvents
    }
}

export const useSharedCalendar = createSharedComposable(useCalendar)