<template>
  <div id="app">
    <div v-if="IsLoggedIn">
      <menu-header/>
      <div>
        <b-navbar toggleable="lg" type="dark">
          <b-navbar-brand router-link class="nav-link" to="/">
              <b-icon icon="house-door-fill" aria-hidden="true"></b-icon>
            </b-navbar-brand>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <router-link class="nav-link" to="/calendar" >Calendar</router-link>
                <router-link class="nav-link" to="/search-appointment" >Search Appointment</router-link>
              <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template #button-content>
                  <b-icon icon="person-circle" aria-hidden="true"></b-icon>
                </template>
                <b-dropdown-item router-link class="nav-link" to="/user" v-bind:userId="this.user">Profile</b-dropdown-item>
                <b-dropdown-item router-link class="nav-link" to="/login" v-on:click="logOut()">Sign Out</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
      <!-- Render the content of the current page view -->
      <router-view v-bind:message="this.receiveNews" v-bind:user="this.user"/>
    </div>
    <div v-else>
      <router-view v-bind:message="this.receiveNews" v-bind:user="this.user"/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import mqtt from 'mqtt'

export default {
  name: 'home',
  components: {
    'menu-header': Header
  },
  data() {
    return {
      user: '',
      isLoggedIn: false,
      lastMessage: {},
      showConnectionInformation: false,
      message: 'none',
      connection: {
        protocol: 'wss',
        host: 'e33e41c289ad4ac69ae5ef60f456e9c3.s2.eu.hivemq.cloud',
        port: 8884,
        endpoint: '/mqtt',
        keepalive: 60,
        clean: true,
        connectTimeout: 4000,
        reconnectPeriod: 4000,
        clientId: `mqtt_${Math.random().toString(16).slice(3)}`,
        username: 'group6_dentistimo',
        password: 'dentistimo123!'
      },
      receiveNews: {},
      qosList: [0, 1, 2],
      client: {
        connected: false
      },
      subscribeSuccess: false,
      connecting: false,
      retryTimes: 0
    }
  },
  mounted() {
    this.createConnection()
    if (localStorage.getItem('token') === null) {
      this.$router.push('/sign-in')
      this.isLoggedIn = false
    } else {
      this.isLoggedIn = true
      this.user = localStorage.getItem('token')
    }
  },
  methods: {
    initData() {
      this.client = {
        connected: false
      }
      this.retryTimes = 0
      this.connecting = false
      this.subscribeSuccess = false
    },
    handleOnReConnect() {
      this.retryTimes += 1
      if (this.retryTimes > 5) {
        try {
          this.client.end()
          this.initData()
          this.$message.error('Connection maxReconnectTimes limit, stop retry')
        } catch (error) {
          // this.$message.error(error.toString())
          console.log(error)
        }
      }
    },
    createConnection() {
      try {
        this.connecting = true
        const { protocol, host, port, endpoint, ...options } = this.connection
        const connectUrl = `${protocol}://${host}:${port}${endpoint}`
        console.log(connectUrl)
        this.client = mqtt.connect(connectUrl, options)
        console.log(this.client)
        if (this.client.on) {
          this.client.on('connect', () => {
            this.connecting = false
            console.log('Connection succeeded!')
          })
          this.client.on('reconnect', this.handleOnReConnect)
          this.client.on('error', (error) => {
            console.log('Connection failed', error)
          })
          this.client.on('message', (topic, message) => {
            const jsonString = Buffer.from(message).toString('utf8')
            // const realJson = '{' + jsonString + '}'
            const parsedData = JSON.parse(jsonString)
            this.receiveNews = { msg: parsedData, topic: topic }
          })
        }
      } catch (error) {
        this.connecting = false
        console.log('mqtt.connect error', error)
      }
    },
    doSubscribe(subTopic) {
      const qos = 2
      this.client.subscribe(subTopic, { qos }, (error, res) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        this.subscribeSuccess = true
        console.log('Subscribe to topics res', res)
      })
    },
    doUnSubscribe() {
      const { topic } = this.subscription
      this.client.unsubscribe(topic, error => {
        if (error) {
          console.log('Unsubscribe error', error)
        }
      })
    },
    doPublish(topic, payload) {
      const qos = 2
      this.client.publish(topic, payload, { qos }, error => {
        if (error) {
          console.log('Publish error', error)
        }
      })
      console.log('message published')
    },
    destroyConnection() {
      if (this.client.connected) {
        try {
          this.client.end(false, () => {
            this.initData()
            console.log('Successfully disconnected!')
          })
        } catch (error) {
          console.log('Disconnect failed', error.toString())
        }
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 1rem 1.5rem;
  background-color: #0092CA;
}
.nav-link{
    font-size: 2rem;
    font-weight: 500;
    color: #ffffff;
}
.navbar {
  font-style: bold;
  background-color: #0092CA;
  font-family: Arial, sans-serif;
  font-weight: 400;
}
.navbar-nav {
  margin-left: 30px;
  margin-right: 30px;
}

b-icon {
  min-width: 150%;
  min-height: 150%;
}
</style>
