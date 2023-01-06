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
          <h1>Book Appointment</h1>
          <h3>Choose a time</h3>
          <FullCalendar :options="calendarOptions">
            <template v-slot:eventContent='arg' id="event">
              <b>{{ arg.timeText }}</b>
              <b class="cut-text">{{ arg.event.title }}</b>
            </template>
          </FullCalendar>
          <h3>Reason for Visit</h3>
          <b-form-input
            class="input"
            v-model="reasonForVisit"
            placeholder="Reason for visit">
          </b-form-input>
          <b-button class="button" id="bookAppointmentButton" @click="requestAppointment">Book appointment</b-button>
          <h6>
            {{ this.$route.params.id }}
          </h6>
        </div>
    </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import moment from 'moment'
export default {
  name: 'Calendar',
  props: {
    message: Object,
    user: Object
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: 'dayGridDay',
        titleFormat: { year: 'numeric', month: 'short', day: 'numeric' },
        dayCellDidMount: this.nextDay,
        aspectRatio: 2.3,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: false,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        next: this.nextDay,
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
      },
      mqtt: {
        subTopic: '',
        pubTopic: ''
      },
      reasonForVisit: '',
      chosenEvent: {
        date: '',
        time: ''
      }
    }
  },
  components: {
    FullCalendar
  },
  methods: {
    requestAppointment() {
      const requestId = Math.floor(Math.random() * 10000000)
      this.mqtt.subTopic = `dentistimo/?/?/${requestId}`
      this.$parent.doSubscribe(this.mqtt.subTopic)
      this.mqtt.pubTopic = 'dentistimo/?/?'
      const payload = `{"password": "${this.Password}", "email": "${this.Email}", "requestId": "${requestId}"}`
      this.$parent.doPublish(this.mqtt.pubTopic, payload)
    },
    handleEventClick: function (arg) {
      try {
        this.$el.querySelector('#selectedElement').style.background = 'white'
        this.$el.querySelector('#selectedElement').style.color = '#0092CA'
        this.$el.querySelector('#selectedElement').id = 'event'
      } catch (error) {
        console.log('color setting not needed')
      }
      this.chosenEvent = {
        title: arg.event.title,
        date: moment(arg.event.start).format('YYYY-MM-DD'),
        time: moment(arg.event.start).format('HH:mm:ss')
      }
      arg.el.style.background = '#0092CA'
      arg.el.style.color = 'white'
      arg.el.id = 'selectedElement'
    },
    nextDay() {
      console.log('hello')
    }
  },
  mounted() {
    const requestId = Math.floor(Math.random() * 10000000)
    this.mqtt.subTopic = `dentistimo/?/?/${requestId}`
    this.$parent.doSubscribe(this.mqtt.subTopic)
    this.mqtt.pubTopic = 'dentistimo/?/?'
    const payload = `{"password": "${this.Password}", "email": "${this.Email}", "requestId": "${requestId}"}`
    this.$parent.doPublish(this.mqtt.pubTopic, payload)
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
b {
  font-size: large;
}

#bookAppointmentButton {
  margin-top: 5%;
}

#dentist-name {
  background-color: #0092CA;
  color: white;
  padding: 5% ;
}

h3 {
  padding-top: 5%;
}
</style>
