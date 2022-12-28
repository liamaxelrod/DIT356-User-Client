<template>
  <div>
    <div class="row">
      <div class="col">
        <img src="@/assets/Marker.png" alt="logo" width="20%" id="marker"/>
        <h1>Welcome to Dentistimo!</h1>
      </div>
      <div class="col">
        <h4>What is Dentistimo?</h4>
        <span class="span">
          Dentistimo is an online service that allows users to make dentist appointments in just a few clicks.
          Dentistimo gathers all dentist clinics in one place allowing users to quickly scan the entire city of
          Gothenburg by selecting their preferences and making appointments for a range of services including
          revisions, dental cleanings and filling cavities. Dentistimo also offers a calendar, where users can
          check their confirmed appointments and, if necessary, cancel them.
        </span>
        <h4>How do I use Dentistimo?</h4>
        <span class="span">
          To make an appointment you will have to go to the "Search Appointment" page. On this page you will find
          a map of Gothenburg. If you select a day on which you want to make your appointment and a time frame,
          the map will display pointers on the map for the dentists that have available time(s) that fit your search.
          You can then select the dentist of your choice by clicking on the pointer on the map. This will take you to
          a page where you can finalise your appointment and read some more information on the dentist. If you wish
          to view your past and upcoming appointments you can take a look at the calendar page.
        </span>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <img src="@/assets/goteborg.jpg" alt="logo" width="100%" class="hidden"/>
      </div>
      <div class="col">
        <img src="@/assets/pug_toothbrush.jpeg" alt="logo" width="100%" />
      </div>
      <div class="col">
        <img src="@/assets/dentist.jpg" alt="logo" width="100%" class="hidden"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      message: 'none'
    }
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}

#background {
  background-color: white;
}

.text {
  text-align: justify;
  hyphens: auto;
}

.row {
  padding: 2%;
}

.span {
  text-align: justify;
  display: flex;
}

#marker {
  padding-top: 4%;
}

h1 {
  padding-top: 4%;
}

h4 {
  padding-top: 4%;
}

@media only screen and (max-width: 768px)  {
  .col {
    min-width: 100%;
  }
  .hidden {
    display: none;
  }
}
</style>
