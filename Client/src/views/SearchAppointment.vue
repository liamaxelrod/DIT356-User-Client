<template>
    <div class="row" style="height: 100%">
      <div class="col-xs-10 col-sm-3">
        <h1 class="title" >Select Your Preferences</h1>
        <v-date-picker style="height: 50%; width: 90%"
          v-model="date"
          :minute-increment="30"
          is24hr is-dark
          :mode="mode" is-inline @input="filter()"/>
      </div>
      <div class="col-xs-10 col-sm-7">
        <l-map style="height: 700px; width: 1300px" :zoom="zoom" :center="center">
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <l-marker :lat-lng="markerLatLng"></l-marker>
        </l-map>
      </div>
    </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      center: [57.708, 11.974560],
      date: null,
      mode: 'datetime'
    }
  },
  methods: {
    filter() {
      console.log(this.date)
    }
  }
}
</script>

<style>
.title{
    font-size: 2rem;
    font-weight: 500;
    color: #000000;
}
</style>
