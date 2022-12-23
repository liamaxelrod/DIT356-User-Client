<template>
  <div class="row">
    <div class="col-md-9">
      <FullCalendar :options="calendarOptions">
        <template v-slot:eventContent='arg' id="event">
          <b>{{ arg.timeText }}</b>
          <b class="cut-text">{{ arg.event.title }}</b>
        </template>
      </FullCalendar>
    </div>
    <div class="col-md-3">
      <h3 class="appointment-header">Appointments</h3>
      <b-list-group v-for="event in calendarOptions.events" :key="event.key">
        <b-list-group-item>
          <div class="list-item-header">
            <h5 class="mb-1">{{event.title}}</h5>
          </div>
          <p>{{event.time}}</p>
          <p class="mb-1">
            Here goes the adress of the dentist and some other information
          </p>
        </b-list-group-item>
      </b-list-group>
    </div>
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
            start: '2022-12-22T12:00:00',
            time: '2022-12-22 12:00',
            key: 932236592
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
    this.$parent.doSubscribe('dentistimo/user-appointment/all-appointments')
    const message = { userid: 5 }
    const payload = JSON.stringify(message)
    this.$parent.doPublish('dentistimo/user-appointment/get-all-appointments', payload)
  },
  components: {
    FullCalendar
  },
  watch: {
    message: function (newVal, oldVal) {
      console.log('this is a trigger function')
      console.log(this.message.msg[0])
      for (let i = 0; i < this.message.msg.length; i++) {
        const msg = this.message.msg[i]
        const event = {
          title: 'Dentist name',
          start: `${msg.date}T${msg.time}:00`,
          time: `${msg.date} ${msg.time}`,
          key: msg.requestd
        }
        this.calendarOptions.events.push(event)
        console.log(this.message.msg[i])
      }
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
.cut-text {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
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

#event {
  background-color: #0092CA;
  color: white;
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
  color: white;
}

.fc-daygrid-day-number {
  color: #393E46;
}

.fc-col-header-cell {
  background-color: #0092CA;
}

.list-item-header {
  background-color: #0092CA;
  color: white;
}

.appointment-header {
  padding-bottom: 7%;
}

@media only screen and (max-width: 768px)  {
  .col-md-9 {
    width: 100%;
    padding-bottom: 5%;
  }
  .appointment-header {
    padding-bottom: 2%;
  }
}
</style>
