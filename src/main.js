import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import store from './store'
import 'materialize-css/dist/js/materialize.min.js'
import 'materialize-css/dist/css/materialize.min.css'

Vue.config.productionTip = false

Vue.use(Vuelidate)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
