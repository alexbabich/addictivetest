import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App.vue'
import { configureFakeBackend, router } from './_helpers'
import store from './store'
import i18n from './i18n'

Vue.use(VueI18n)
Vue.config.productionTip = false

configureFakeBackend()

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
