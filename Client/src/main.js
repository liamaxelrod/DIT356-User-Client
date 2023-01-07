import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import VCalendar from 'v-calendar'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { DropDownButtonPlugin } from '@syncfusion/ej2-vue-splitbuttons'
import Dropdown from 'vue-simple-search-dropdown'

Vue.use(Dropdown)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VCalendar)
Vue.use(DropDownButtonPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
