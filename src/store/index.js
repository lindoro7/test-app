import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    loading: true,
    users: []
  },
  mutations: {
    SET_USERS: (state, users) => { state.users = users },
    ADD_USER: (state, user) => { state.users.unshift(user) },
    LOADING_TO_FALSE: (state) => { state.loading = false },
    LOADING_TO_TRUE: (state) => { state.loading = true}
  },
  actions: {  
    GET_USERS_FROM_API({ commit }) {
      return axios(`http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`, {
        method: 'GET'
      })
      .then((users) => {
        commit('SET_USERS', users.data)
        return users
      })
      .catch((e) => {
        console.log(e)
        return e
      })
    },
    ADD_USER({ commit }, user) { commit('ADD_USER', user) },
    LOADING_TO_FALSE({ commit }) { commit('LOADING_TO_FALSE') },
    LOADING_TO_TRUE({ commit }) { commit('LOADING_TO_TRUE') }
  },

  getters: {
    USERS(state) { return state.users },
    LOADING(state) { return state.loading }
  }
})

export default store
