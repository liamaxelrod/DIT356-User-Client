<template>
    <div class="container">
      <img src="@/assets/Logo.png" alt="logo" width="50%" />
      <h2>Account Signin</h2>
      <b-form-input
        class="input"
        v-model="Email"
        placeholder="Email"
      ></b-form-input>
        <b-form-input
        class="input"
        v-model="Password"
        placeholder="Password"
        type="password">
    </b-form-input>
      <b-button class="button" variant="primary" @click="login">Sign In</b-button>
      <div class="row">
        <a href="/forgetPassword">Forget password</a>
        <a @click="switchToSignUp">Register New Account</a>
      </div>
    </div>
</template>

<script>
export default {
  name: 'sign-in',
  props: {
    message: Object
  },
  data() {
    return {
      Email: '',
      Password: '',
      subTopic: 'zdwgf'
    }
  },
  mounted() {
    this.$parent.doSubscribe(this.subTopic)
  },
  methods: {
    login() {
      const pubTopic = 'dentistimo/login/user'
      const requestId = Math.floor(Math.random() * 10000000)
      const payload = `{"password": "${this.Password}"", "email": "${this.Email}", "requestId": "${requestId}"}`
      this.$parent.doPublish(pubTopic, payload)
    },
    switchToSignUp() {
      this.$parent.doUnSubscribe(this.subTopic)
      this.$router.push('/sign-up')
    }
  },
  watch: {
    message: function (newVal, oldVal) {
      if (this.message.topic === 'zdwgf') {
        // I am not sure which is the eway we should do it
        localStorage.setItem('token', JSON.stringify(this.message.msg))
        this.$parent.login()
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

  .row {
    width: 500px;
    display: flex;
    justify-content: space-evenly;
    margin: 50px auto;
  }
  .row a {
    color: #585656;
    font-style: italic;
  }
</style>
