<template>
  <div>
    <div> {{message}} </div>
    <full-calendar class="test-fc" :events="events"
      first-day='1' locale="fr"
      @eventClick="eventClick"
      @moreClick="moreClick">
        <template slot="fc-event-card" slot-scope="p">
            <p><i class="fa">sadfsd</i> {{ p.event.title }} test</p>
        </template>
    </full-calendar>
  </div>
</template>

<script>
import FullCalendar from 'vue-fullcalendar'

export default {
  name: 'Calendar',
  props: {
    message: Object
  },
  data() {
    return {
      events: [
        {
          title: 'Dental Clinic Vasaplatsen',
          start: '2022-12-09',
          cssClass: 'blue',
          data: { Time: '12:00', Address: 'Vasagatan 1' }
        },
        {
          title: 'event2',
          start: '2022-12-20',
          end: '2022-12-23',
          cssClass: ['blue']
        }
      ]
    }
  },
  methods: {
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
    }
  }
}
</script>

<style>
.red {
  background: rgb(235, 77, 77) !important;
  color: whitesmoke !important;
}
.blue {
  background: #0092CA !important;
  color: whitesmoke !important;
}
.orange {
  background: orange !important;
  color: white !important;
}
.green {
  background: rgb(49, 155, 49) !important;
  color: white !important;
}
.blue,
.orange,
.red,
.green {
  font-size: 13px;
  font-weight: 500;
  text-transform: capitalize;
}
.event-item {
  padding: 1px 0 1px 2px !important;
  size: 200% !important;
  margin-top: 10px;
}
</style>
