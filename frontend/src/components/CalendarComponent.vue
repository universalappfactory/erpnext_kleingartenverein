<template>
    <vue-cal class="bg-nature-white" 
        locale="de" 
        events-on-month-view="short" 
        :events="events" 
        active-view="month"
        :disable-views="['years', 'year']" 
        :cell-contextmenu="false"
        :time-from="9 * 60"
        :time-to="23 * 60"
        @event-focus="eventFocused('event-focus', $event)"
        >
    </vue-cal>
</template>

<script lang="ts">
import { PropType, defineComponent, reactive } from 'vue';
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import { CalendarEvent } from '../ts/calendar';


export default defineComponent({
    name: "CalendarComponent",
    components: {
        VueCal
    },
    emits: ['eventFocused'],
    methods: {
        eventFocused(name, event) {
            this.$emit("eventFocused", name, event)
        },
    },
    props: {
        events: {
            type: Array as PropType<CalendarEvent[]>,
            required: true,
        },
    },
    computed: {
        calendarEvents() {
            return reactive(this.events.value)
        }
    }
});
</script>