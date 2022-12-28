<template>
    <div class="row">
        <div class="col">
          <div>
            <h1 id="dentist-name">{{ this.dentistOfficeInfo.name }}</h1>
          </div>
          <h4>Contact Information</h4>
          <span>{{ this.dentistOfficeInfo.address }}</span>
        </div>
        <div class="col">
          <div class="row">
            <FullCalendar :options="calendarOptions">
              <template v-slot:eventContent='arg' id="event">
                <b>{{ arg.timeText }}</b>
                <b class="cut-text">{{ arg.event.title }}</b>
              </template>
            </FullCalendar>
          </div>
          <div class="row">
            <div class="col">
              Reason for visit <br/>
              <textarea></textarea>
            </div>
            <div class="col">
              <button>Book appointment</button>
            </div>
          </div>
          <h1>
            dentistID is:
          </h1>
          <h1>
            {{ this.$route.params.id }}
          </h1>
        </div>
    </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
// const exerciseId = this.$route.params.id
export default {
  name: 'Calendar',
  props: {
    message: Object
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: 'dayGridDay',
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
            title: 'Dentist name',
            start: '2022-12-29T08:00:00',
            key: 'something'
          },
          {
            title: 'Dentist name',
            start: '2022-12-29T08:30:00',
            key: 'something'
          },
          {
            title: 'Dentist name',
            start: '2022-12-29T09:00:00',
            key: 'something'
          },
          {
            title: 'Dentist name',
            start: '2022-12-29T10:00:00',
            key: 'something'
          }
        ],
        eventBackgroundColor: '#0092CA',
        eventTextColor: 'white',
        eventTimeFormat: { // like '14:30:00'
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false
        }
      },
      dentistOfficeInfo: {
        name: 'Dental Clinic Vasaplatsen',
        address: 'Vasagatan 1 41124 Göreborg',
        availableTimes: [],
        requestedDate: '',
        pricelist: ''
      }
    }
  },
  components: {
    FullCalendar
  },
  methods: {
    requestAppointment() {

    }
  },
  mounted() {
    // request info from backend
  },
  watch: {
    message: function (newVal, oldVal) {
      // if topic is dentist info fill the blanks
      // if topic is request response do popup
    }
  }
}
</script>

<style>
#dentist-name {
  background-color: #0092CA;
  color: white;
  padding: 5% ;
}
</style>
