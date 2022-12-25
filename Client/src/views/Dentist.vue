<template>
    <div>
        <h1>
            dentistID is:
        </h1>
        <h1>
            {{ this.$route.params.id }}
        </h1>
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
        name: '',
        address: '',
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
</style>
