<template>
<full-calendar :events="this.events" />
</template>

<script>
import FullCalendar from 'vue-fullcalendar'

export default {
  name: 'Calendar',
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
  components: {
    FullCalendar
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
  size-adjust: 150%;
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
}
</style>
