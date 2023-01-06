<template>
  <div class="container">
      <div id="headline">
          <h1 class="header">Hello {{this.FirstName}}</h1>
          <p>Here you can view and edit all your personal information</p>
          <h4 class="header" style="color:red">{{this.Changes}}</h4>
      </div>
      <form>
          <div class="row inputs">
              <div class="col-6 col-md-4">
                  <label for="firstName" class="inputLabel">First Name</label><br>
                  <input type="text" name="fName" v-model="FirstName" >
              </div>
              <div class="col-6 col-md-4">
                  <label for="lastName" class="inputLabel">Last Name</label><br>
                  <input type="text" name="Lname" v-model="LastName" >
              </div>
              <div class="col-6 col-md-4">
                  <label for="email" class="inputLabel">Email Adress</label><br>
                  <input type="text" name="Email" v-model="Email" >
              </div>
              <div class="col-6 col-md-4">
                  <label for="password" class="inputLabel">Password</label><br>
                  <input type="text" name="Password" v-model="Password" >
              </div>
              <div class="col-6 col-md-4">
                  <br>
                  <b-button href="#" class="submitButton" @click="ChangeInfo()">Save update</b-button>
              </div>
          </div>
      </form>
  </div>
</template>

<script>
export default {
  name: 'profile',
  props: {
    message: Object,
    user: Object
  },
  data() {
    return {
      Paswword: '',
      FirstName: '',
      LastName: '',
      Email: '',
      RequestTopic: 'dentistimo/modify-user',
      ResponseTopic: 'dentistimo/modify-user/',
      ErrorTopic: 'dentistimo/modify-user/error/',
      Changes: ''
    }
  },
  mounted() {
    this.FirstName = this.user.firstName
    this.LastName = this.user.lastName
    this.Email = this.user.email
  },
  methods: {
    ChangeInfo() {
      const request = {
        oldPassword: this.Password,
        idToken: this.user.idToken,
        firstName: this.FirstName,
        lastName: this.LastName,
        email: this.Email
      }
      const payload = JSON.stringify(request)
      this.$parent.doPublish(this.RequestTopic, payload)
      this.ResponseTopic = this.ResponseTopic + this.user.idToken
      this.$parent.doSubscribe(this.ResponseTopic)
      this.ErrorTopic = this.ErrorTopic + this.user.idToken
      this.$parent.doSubscribe(this.ErrorTopic)
    }
  },
  watch: {
    message: function (newVal, oldVal) {
      console.log(this.message.topic)
      console.log(this.message.msg)
      if (this.message.topic === this.ResponseTopic) {
        this.Changes = ''
      } else if (this.message.topic === this.ErrorTopic) {
        this.Changes = 'invalid password'
      }
    }
  }
}
</script>

<style>
</style>
