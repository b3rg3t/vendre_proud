import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

import users from './modules/users'
import prouds from './modules/prouds'
import groups from './modules/groups'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    users,
    prouds,
    groups
  }
})

export default store
