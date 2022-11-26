<template>
  <div class="container">
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

@media only screen and (max-width: 768px)  {
  .col {
    width: 200%;
  }
}
</style>
