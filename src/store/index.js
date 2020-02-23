import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false
  },
  mutations: {
    logIn (state, payload) {
      state.isLogin = true
    },
    logOut (state, payload) {
      state.isLogin = false
    }
  },
  actions: {
    logIn ({ commit }) {
      commit('logIn')
    },
    logOut ({ commit }) {
      commit('logOut')
    }
  }
})
