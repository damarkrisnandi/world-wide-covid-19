import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Trend from 'vuetrend'


Vue.config.productionTip = false
Vue.use(Trend)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
