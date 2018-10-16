import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'
import 'element-ui/lib/theme-chalk/index.css'
import './css/index.scss'

Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#sidenav',
  components: { App },
  template: '<App/>'
})
