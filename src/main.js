// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Notifications from 'vue-notification'
import {dateFilter} from './utils/filters/DateFilter'
import store from './store'

Vue.filter('dateFilter', dateFilter)

Vue.use(Notifications)
Vue.use(ElementUI)

var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8888/api/v1'
Vue.prototype.$axios = axios

Vue.config.productionTip = false

router.beforeEach(
  (to, from, next) => {
    if (to.meta.requireAuth) {
      if (store.state.user.token) {
        next()
      } else {
        next({
          path: '/login',
          query: {redirect: to.fullPath}
        })
      }
    } else {
      next()
    }
  }
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
