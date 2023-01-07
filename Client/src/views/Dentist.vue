<template>
    <div class="row">
        <div class="col">
          <div>
            <h1 id="dentist-name">{{ this.dentistOfficeInfo.name }}</h1>
          </div>
          <h3>Contact Information</h3>
          <h5>{{ this.dentistOfficeInfo.address }}</h5>
          <img src="@/assets/pug_toothbrush.jpeg" alt="logo" width="100%" />
        </div>
        <div class="col">
          <h1>Book Appointment</h1>
          <h3>Choose a time</h3>
          <FullCalendar ref="fullCalendar" :options="calendarOptions">
            <template v-slot:eventContent='arg' id="event">
              <b>{{ arg.timeText }}</b>
              <b class="cut-text">{{ arg.event.title }}</b>
            </template>
          </FullCalendar>
          <h6 style="color:red">{{ this.error.NoTimeSelected }}</h6>
          <h3>Reason for Visit</h3>
          <Dropdown
              :options="[{ id: 1, name: 'Revision'}, { id: 2, name: 'Cleaning'}, { id: 3, name: 'Surgery'}]"
              id= "dropdown"
              v-on:selected="changeSelection"
              v-on:filter="getDropdownValues"
              :disabled="false"
              name="zipcode"
              :maxItem="10"
              placeholder="Revision">
          </Dropdown>
          <b-button class="button" id="bookAppointmentButton" @click="requestAppointment">Book appointment</b-button>
        </div>
    </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import moment from 'moment'
import Dropdown from 'vue-simple-search-dropdown'

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
        dayCellDidMount: this.handleNextAndPrev,
        aspectRatio: 2.3,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
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
        name: '',
        address: '',
        pricelist: ''
      },
      mqtt: {
        subTopicDay: '',
        pubTopicDay: '',
        subTopicDentist: '',
        pubTopicDentist: '',
        subTopicAppointment: '',
        pubTopicAppointment: ''
      },
      reasonForVisit: 'Revision',
      chosenEvent: {
        date: '',
        time: ''
      },
      error: {
        NoTimeSelected: ''
      },
      firstTime: true
    }
  },
  components: {
    FullCalendar,
    Dropdown
  },
  methods: {
    requestAppointment() {
      if (this.chosenEvent.date === '' || this.chosenEvent.time === '') {
        this.error.NoTimeSelected = 'You have to select a time to complete the booking'
      } else {
        this.mqtt.subTopicAppointment = `dentistimo/booking/succesful-booking/${this.user.idToken}`
        this.$parent.doSubscribe(this.mqtt.subTopicAppointment)
        this.mqtt.pubTopicAppointment = 'dentistimo/booking/create-booking'
        const message = {
          idToken: this.user.idToken,
          dentistOfficeId: +this.$route.params.id,
          date: this.chosenEvent.date,
          time: this.chosenEvent.time,
          visitReason: this.reasonForVisit.name
        }
        const payload = JSON.stringify(message)
        console.log(payload)
        this.$parent.doPublish(this.mqtt.pubTopicAppointment, payload)
      }
    },
    changeSelection(selection) {
      this.reasonForVisit = selection
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
        time: moment(arg.event.start).format('HH:mm')
      }
      arg.el.style.background = '#0092CA'
      arg.el.style.color = 'white'
      arg.el.id = 'selectedElement'
      this.error.NoTimeSelected = ''
    },
    handleNextAndPrev: function (arg) {
      if (this.firstTime === false) {
        this.mqtt.subTopicDay = `dentistimo/dentist/free-appointments/${this.user.idToken}`
        this.$parent.doSubscribe(this.mqtt.subTopicDay)
        this.mqtt.pubTopicDay = 'dentistimo/appointment/free'
        // const date = arg.something
        // or
        const calendarApi = this.$refs.fullCalendar.getApi()
        const date = moment(calendarApi.getDate()).format('YYYY-MM-DD')
        const payloadDay = `{"idToken": "${this.user.idToken}", "date": "${date}", "dentistOfficeId": ${this.$route.params.id}}`
        this.$parent.doPublish(this.mqtt.pubTopicDay, payloadDay)
        console.log(payloadDay)
      } else {
        this.firstTime = false
      }
    }
  },
  mounted() {
    // set initial date
    const calendarApi = this.$refs.fullCalendar.getApi()
    calendarApi.gotoDate(this.$route.params.date)
    // get dentist informtation
    this.mqtt.subTopicDentist = `dentistimo/dentist-office/one-office/${this.user.idToken}`
    this.$parent.doSubscribe(this.mqtt.subTopicDentist)
    this.mqtt.pubTopicDentist = 'dentistimo/dentist-office/fetch-one'
    const payloadDentist = `{"idToken": "${this.user.idToken}", "dentistOfficeId": ${this.$route.params.id}}`
    this.$parent.doPublish(this.mqtt.pubTopicDentist, payloadDentist)
  },
  watch: {
    message: function (newVal, oldVal) {
      // if topic is dentist info fill the blanks
      console.log(this.message.msg)
      if (this.message.topic === this.mqtt.subTopicDentist) {
        console.log('office info:')
        console.log(this.message.msg)
        const msg = this.message.msg
        this.dentistOfficeInfo.name = msg.name
        this.dentistOfficeInfo.address = msg.address
      }
      // if topic is availability for day add appointments to calendar
      if (this.message.topic === this.mqtt.subTopicDay) {
        this.calendarOptions.events = []
        const calendarApi = this.$refs.fullCalendar.getApi()
        const date = moment(calendarApi.getDate()).format('YYYY-MM-DD')
        for (let i = 0; i < this.message.msg.length; i++) {
          const msg = this.message.msg[i]
          const event = {
            title: 'Choose appointment',
            start: `${date}T${msg}:00`,
            time: `${date} ${msg}`,
            key: i
          }
          this.calendarOptions.events.push(event)
        }
      }
      // if topic is request response do popup
      if (this.message.topic === this.mqtt.subTopicAppointment) {
        this.$router.push('/calendar')
      }
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
#dropdown {
  width: 100%;
}
</style>
