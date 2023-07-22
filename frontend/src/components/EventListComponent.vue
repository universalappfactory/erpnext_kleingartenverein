<template>
    <table class="w-full text-sm text-left text-gray-500 border border-gray-50">
        <tbody>
            <tr v-for="(evt, index) of events" :key="index"
                class="border-b"
                :class="evt.selected ? 'bg-red-100' : 'bg-gray-50'">
                <td scope="row" class="align-top px-6 py-4 font-medium whitespace-nowrap ">
                    {{ getDate(evt) }}                                        
                </td>
                <td class="px-6 py-4">
                    <div class="font-semibold">{{ evt.title }}</div>
                    <div v-html="evt.description"></div>
                    {{ getDuration(evt) }}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import 'vue-cal/dist/vuecal.css'
import { CalendarEvent, formattedDate, getDurationString } from '../ts/calendar';


export default defineComponent({
    name: "EventListComponent",
    components: {
    },
    methods: {
        getDate(input: CalendarEvent) {
            return formattedDate(input)
        },
        getDuration(input: CalendarEvent) {
            return getDurationString(input)
        }
    },
    props: {
        events: {
            type: Array as PropType<CalendarEvent[]>,
            required: true,
        },
    },
    data() {

    }
});
</script>