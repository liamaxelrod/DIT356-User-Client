<template>
    <div class="container">
      <img src="@/assets/Logo.png" alt="logo" width="50%" />
      <h2>Account Signup</h2>
      <b-form-input
        class="input"
        v-model="FirstName"
        placeholder="First name">
      </b-form-input>
      <b-form-input
        class="input"
        v-model="LastName"
        placeholder="Last name">
      </b-form-input>
      <b-form-input
        class="input"
        v-model="Email"
        placeholder="Email">
      </b-form-input>
      <b-form-input
        class="input"
        v-model="Password"
        placeholder="Password"
        type="password">
      </b-form-input>
      <b-form-input
        class="input"
        v-model="passwordCheck"
        placeholder="passwordCheck"
        type="password">
      </b-form-input>
      <b-button class="button" variant="primary" @click="signUp">Sign Up</b-button>
    </div>
</template>

<script>
export default {
  name: 'sign-up',
  props: {
    message: Object
  },
  data() {
    return {
      FirstName: '',
      LastName: '',
      Email: '',
      Password: '',
      passwordCheck: '',
      subTopic: '',
      subTopicError: ''
    }
  },
  methods: {
    signUp() {
      // subscribe to topic with generated request id
      const requestId = Math.floor(Math.random() * 10000000)
      this.subTopic = `dentistimo/register/user/${requestId}`
      this.subTopicError = `dentistimo/register/error/${requestId}`
      this.$parent.doSubscribe(this.subTopic)
      this.$parent.doSubscribe(this.subTopicError)
      // publish message to topic
      const pubTopic = 'dentistimo/register/user'
      const payload = `{"password": "${this.Password}", "passwordCheck": "${this.passwordCheck}", "email": "${this.Email}", "requestId": "${requestId}", "firstName": "${this.FirstName}", "lastName": "${this.LastName}"}`
      this.$parent.doPublish(pubTopic, payload)
    }
  },
  watch: {
    message: function (newVal, oldVal) {
      if (this.message.topic === this.subTopic) {
        // Set user variable in App.vue
        localStorage.setItem('token', JSON.stringify(this.message.msg))
        this.$parent.doUnSubscribe(this.subTopic)
        this.$parent.doUnSubscribe(this.subTopicError)
        this.$parent.login()
      }
      if (this.message.topic === this.subTopicError) {
        // Alert user about error
        window.confirm(this.message.msg)
        this.$parent.doUnSubscribe(this.subTopic)
        this.$parent.doUnSubscribe(this.subTopicError)
        this.subTopic = ''
        this.subTopicError = ''
      }
    }
  }
}
</script>

<style scoped>
  .container {
    padding-top: 20px;
    text-align: center;
  }
  h2 {
    font-size: 18px;
    color: rgb(96, 96, 96);
    font-weight: normal;
  }
  .input {
    width: 500px;
    height: 50px;
    margin: 20px auto;
    background-color: rgb(214, 212, 212);
    color: black;
  }
  .button {
    margin-top: 40px;
    padding: 8px 20px;
  }
</style>
