<template>
  <div class="pg-body">
    <div class="left" style="background-color:#0092CA">
      <div class="container mt-2">
        <div class="mb-2">
          <div class="mb-2">
            <h1 class="title" >Select a date</h1>
            <v-date-picker
              v-model="date"
              :mode="mode" is-inline @dayclick="filter()"/>
              <h1 class="title" >Select a time interval</h1>
            <vue-timepicker v-model="FromTime" :minute-interval="30" @change="filter()"></vue-timepicker>
            <vue-timepicker v-model="ToTime" :minute-interval="30" @change="filter()"></vue-timepicker>
          </div>
        </div>
      </div>
    </div>

    <div class="right">
      <l-map
        ref="map"
        :zoom="12.5"
        :center="[57.708, 11.974560]"
        :options={}
        style="height: 100%; width: 100%; z-index: 0">
        <l-tile-layer :url="url" :attribution="attribution" />
        <l-marker v-for="marker in markerDetails"
        :key="marker.id"
        :lat-lng="marker.location"
        :icon="icon"
        @click="markerSelected(marker.id)"/>
      </l-map>
      </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'
import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css' // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility'
import moment from 'moment'

Vue.component('vue-timepicker', VueTimepicker)
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  props: {
    message: Object
  },
  data() {
    return {
      FromTime: {
        HH: '09',
        mm: '00'
      },
      ToTime: {
        HH: '17',
        mm: '00'
      },
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      date: new Date(),
      mode: 'date',
      markerDetails: []
    }
  },
  methods: {
    filter() {
      // clean previous search
      this.markerDetails = []
      /*
      // send message with date and time formated like this for backend
        {
          "date": "December 12, 2022",
          "from": "01:00:00",
          "to": "06:00:00"
        }
      */
      // retrieve and format date from v-calendar
      const date = moment(this.date).format('YYYY-MM-DD')
      // retrieve "from time" and "to time" from time picker
      const fromTime = this.FromTime.HH + ':' + this.FromTime.mm
      const toTime = this.ToTime.HH + ':' + this.ToTime.mm
      // create JSON object
      const request = {
        date: date,
        from: fromTime,
        to: toTime
      }
      console.log(request)
      // send date to backend
      const searchTopic = 'dentistimo/dentist-office/fetch-availability'
      const payload = JSON.stringify(request)
      this.$parent.doPublish(searchTopic, payload)
      const subscribeTopic = 'dentistimo/dentist-office/filtered-office'
      this.$parent.doSubscribe(subscribeTopic)
    },
    markerSelected(markerID) {
      console.log(markerID)
      console.log(this.markerDetails[markerID])
      // get DB id for dentist office
      const dentistID = this.markerDetails[markerID].dentistID
      // change to dentist page
      this.$router.push({ path: `/search-appointment/book-dentist/${dentistID}` })
    }
  },
  watch: {
    message: function (newVal, oldVal) {
      if (this.message.topic === 'dentistimo/dentist-office/filtered-office') {
        for (let i = 0; i < this.message.msg.length; i++) {
          this.markerDetails.push({
            dentistID: this.message.msg[i]._id,
            id: this.markerDetails.length,
            location: [this.message.msg[i].coordinate.latitude, this.message.msg[i].coordinate.longitude]
          })
        }
      }
    }
  }
}
</script>

<style scoped>
.title{
    font-size: 2rem;
    font-weight: 500;
    color: #FFFFFF;
}
.pg-body {
display: flex;
align-items: stretch;
height: 100vh;
}
.pg-body > .left {
width: 325px;
overflow: auto;
}
.pg-body > .right {
flex: 1;
position: relative;
background-color: rgb(0, 0, 0, 0.05);
}
.leaflet-default-icon-path {
    background-image: url(https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png);
}

</style>
