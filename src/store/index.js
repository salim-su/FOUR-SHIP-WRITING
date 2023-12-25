import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import client from './modules/client'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    client
  },
  getters
})

export default store
