import Vue from 'vue'
import Vuex from 'vuex'

import users from './modules/users'
import prouds from './modules/prouds'
import groups from './modules/groups'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    users,
    prouds,
    groups
  },
  actions: {}
})

export default store
