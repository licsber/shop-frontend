import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      token: window.localStorage
        .getItem('user' || '[]') == null ? ''
        : JSON.parse(window.localStorage.getItem('user' || '[]')).token,
      nick: window.localStorage
        .getItem('user' || '[]') == null ? ''
        : JSON.parse(window.localStorage.getItem('user' || '[]')).nick,
      lastLogin: window.localStorage
        .getItem('user' || '[]') == null ? ''
        : JSON.parse(window.localStorage.getItem('user' || '[]')).lastLogin
    }
  },
  mutations: {
    login (state, user) {
      state.user = user
      window.localStorage.setItem('user', JSON.stringify(user))
    }
  }
})
