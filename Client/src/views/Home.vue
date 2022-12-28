<template>
  <div>
    <div class="row">
      <div class="col">
        <h1>What is Dentistimo?</h1>
      </div>
      <div class="col">
        <span class="span">
          Dentistimo is an online service that allows users to make dentist appointments in just a few clicks.
          Dentistimo gathers all dentist clinics in one place allowing users to quickly scan the entire city of
          Gothenburg by selecting their preferences and making appointments for a range of services including
          revisions, dental cleanings and filling cavities. Dentistimo also offers a calendar, where users can
          check their confirmed appointments and, if necessary, cancel them.
        </span>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <img src="@/assets/gothenburg.jpeg" alt="logo" width="100%" />
      </div>
      <div class="col">
        <img src="@/assets/pug_toothbrush.jpeg" alt="logo" width="100%" />
      </div>
      <div class="col">
        <img src="@/assets/dentist.jpeg" alt="logo" width="100%" />
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

@media only screen and (max-width: 768px)  {
  .col {
    width: 200%;
  }
}
</style>
