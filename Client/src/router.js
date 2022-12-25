import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import SearchAppointment from './views/SearchAppointment.vue'
import Dentist from './views/Dentist.vue'
import User from './views/User.vue'
import Calendar from './views/Calendar.vue'
import SignIn from './views/SignIn.vue'
import SignUp from './views/SignUp.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/search-appointment',
      name: 'search-appointment',
      component: SearchAppointment
    },
    {
      path: '/search-appointment/book-dentist/:id',
      name: 'book-dentist',
      component: Dentist
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: Calendar
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignIn
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUp
    }
  ]
})
