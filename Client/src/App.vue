<template>
  <div id="app">
    <div>
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
          <router-view v-bind:user="user" />
        </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  components: {
    'menu-header': Header
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
