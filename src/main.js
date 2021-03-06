import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './quasar'
import VueAxios from 'vue-axios'
import  axios  from 'axios'
import VueTypedJs from 'vue-typed-js'

Vue.use(VueTypedJs)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
