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
            <div class="col">
              <v-date-picker/>
            </div>
            <div class="col">
              <h3>Available Times</h3>
              Here we can display the available Times for this day
            </div>
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
// const exerciseId = this.$route.params.id
export default {
  name: 'Calendar',
  props: {
    message: Object
  },
  data() {
    return {
      dentistOfficeInfo: {
        name: 'Dental Clinic Vasaplatsen',
        address: 'Vasagatan 1 41124 Göreborg',
        availableTimes: [],
        requestedDate: '',
        pricelist: ''
      }
    }
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
