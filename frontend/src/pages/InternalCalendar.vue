<template>
  <div class="p-4 sm:ml-64">
    <div class="hiddenx md:block">
      <CalendarComponent :events="calendar.calendarEvents" @event-focused="calendar.eventFocused" />
    </div>

    <div>
      <h1 class="text-center text-2xl mt-8">Alle Termine</h1>
    </div>
    <div class="flex justify-center mt-4">
      <div class="overflow-x-auto w-full">
        <EventListComponent :events="calendar.upcomingEvents.value" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CalendarComponent from "../components/CalendarComponent.vue";
import EventListComponent from "../components/EventListComponent.vue";
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import { useSharedCalendar } from '../ts/calendar'


export default defineComponent({
  name: 'Calendar',
  setup() {
    const calendar = useSharedCalendar()

    return {
      calendar
    }
  },
  data() {
    return {
      showDialog: false,
    }
  },
  components: {
    VueCal,
    CalendarComponent,
    EventListComponent
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
