<template>
    <div class="container">
      <img src="@/assets/Logo.png" alt="logo" width="50%" />
      <h2>Forgot Password</h2>
      <b-input-group class="input-group">
        <b-form-input
          class="input"
          v-model="Email"
          placeholder="Email"
        ></b-form-input>
        <b-input-group-append>
          <b-button variant="primary" class="send_btn" @click="sendMail"
            >send</b-button
          >
        </b-input-group-append>
      </b-input-group>
      <h2>Reset Password</h2>
      <b-form-input
        class="input"
        v-model="Code"
        placeholder="code"
        type="text"
      ></b-form-input>
      <b-form-input
        class="input"
        v-model="Password"
        placeholder="new Password"
        type="password"
      ></b-form-input>
      <b-form-input
        class="input"
        v-model="PasswordCheck"
        placeholder="passwordCheck"
        type="password"
      ></b-form-input>
      <b-button class="button" variant="primary" @click="submit">Submit</b-button>
    </div>
</template>

<script>
export default {
  name: 'forgot-password',
  props: {
    message: Object
  },
  data() {
    return {
      Email: '',
      Password: '',
      PasswordCheck: '',
      subTopicMail: '',
      subTopic: '',
      subTopicError: '',
      Code: ''
    }
  },
  methods: {
    sendMail() {
      // generate request id and subscribe to topic
      const requestId = Math.floor(Math.random() * 10000000)
      this.subTopicMail = `dentistimo/send-email-code/${requestId}`
      this.$parent.doSubscribe(this.subTopicMail)
      // publish message
      const pubTopic = 'dentistimo/send-email-code'
      const payload = `{"email": "${this.Email}", "requestId": "${requestId}"}`
      this.$parent.doPublish(pubTopic, payload)
    },
    submit() {
      // TODO: change topic names to the correct ones
      // generate request id and subscribe to topic
      const requestId = Math.floor(Math.random() * 10000000)
      this.subTopic = `dentistimo/reset-password/user/${requestId}`
      this.$parent.doSubscribe(this.subTopic)
      this.subTopicError = `dentistimo/reset-password/error/${requestId}`
      this.$parent.doSubscribe(this.subTopic)
      // publish message
      const pubTopic = 'dentistimo/reset-password/user'
      const payload = `{"newPassword": "${this.Password}", "passwordCheck": "${this.PasswordCheck}", "userCode": "${this.Code}", "email": "${this.Email}", "requestId": "${requestId}"}`
      this.$parent.doPublish(pubTopic, payload)
    }
  },
  watch: {
    message: function (newVal, oldVal) {
      if (this.message.topic === this.subTopic) {
        window.confirm(this.message.msg.status)
        this.$parent.doUnSubscribe(this.subTopic)
        this.$parent.doUnSubscribe(this.subTopicMail)
        this.$parent.doUnSubscribe(this.subTopicError)
        this.$router.push('/sign-in')
      }
      if (this.message.topic === this.subTopicMail) {
        window.confirm(this.message.msg)
      }
      if (this.message.topic === this.subTopicError) {
        this.$bvModal.msgBoxOk(this.message.msg)
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
.input-group {
  width: 500px;
  margin: 20px auto;
}
.input-group .input {
  margin: 0;
}
.input {
  width: 500px;
  height: 50px;
  margin: 20px auto;
  background-color: rgb(214, 212, 212);
  color: black;
}
.send_btn {
  padding: 0 20px;
}
.button {
  margin-top: 40px;
  padding: 8px 20px;
}
</style>
