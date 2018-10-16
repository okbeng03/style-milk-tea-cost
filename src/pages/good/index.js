import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'
import './css/index.scss'

Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
