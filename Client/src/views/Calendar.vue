<template>
  <div class="row">
    <div class="col-9">
      <FullCalendar :options="calendarOptions">
        <template v-slot:eventContent='arg' class="event">
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>
    <div class="col-3"> {{message}} </div>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'

export default {
  name: 'Calendar',
  props: {
    message: Object
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: false,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        events: [
          {
            title: 'Dental Clinic Vasaplatsen',
            start: '2022-12-09T12:00:00'
          },
          {
            title: 'event2',
            start: '2022-12-20'
          }
        ],
        eventBackgroundColor: '#0092CA',
        eventTextColor: 'white',
        eventTimeFormat: { // like '14:30:00'
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false
        }
      }
    }
  },
  methods: {
    handleDateClick: function (arg) {
      console.log('hello')
      console.log(arg.dateStr)
    },
    handleEventClick: function (arg) {
      console.log(arg)
    },
    'eventClick'(event, jsEvent, pos) {
      console.log('eventClick', event, jsEvent, pos)
    },
    'moreClick'(day, events, jsEvent) {
      console.log('moreCLick', day, events, jsEvent)
    }
  },
  mounted() {
    this.$parent.doSubscribe('dentistimo/dentist-office/filtered-office')
  },
  components: {
    FullCalendar
  },
  watch: {
    message: function (newVal, oldVal) {
      console.log('this is a trigger function')
      console.log(this.message)
    }
  }
}
</script>

<style>
a {
  color: #0092CA;
}

b { /* used for event dates/times */
  margin-right: 3px;
}
.demo-app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
  color: #0092CA;
}
.demo-app-sidebar {
  width: 300px;
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}
.demo-app-sidebar-section {
  padding: 2em;
}
.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}
.fc { /* the calendar root */
  --first-color: #0092CA;
  max-width: 1100px;
  margin: 0 auto;
}

.fc-event {
  height: 120%;
  color: #0092CA;
}
.fc-today-button {
  background-color: #0092CA;
}

.fc-button-primary {
  background-color: #0092CA;
}

.fc-button {
  background-color: #0092CA;
}

:root {
  --first-color: #0092CA;
  --second-color: #ff7;
  --fc-first-color: #0092CA;
}

.fc-col-header-cell-cushion {
  color: #0092CA;
}

.fc-daygrid-day-number {
  color: #0092CA;
}

</style>
