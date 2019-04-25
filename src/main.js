import Vue from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import router from './router'
import config from './config'
import { store } from '@/store'

Vue.config.productionTip = false

let app = ''

firebase.initializeApp(config)

const db = firebase.database()

// Reference to database

// Users
export const users = db.ref('users')
export const user = uid => db.ref(`users/${uid}`)

// Groups
export const groups = db.ref('groups')
export const group = groupId => db.ref(`groups/${groupId}`)

// Prouds
export const prouds = db.ref('prouds')
export const proud = proudId => db.ref(`prouds/${proudId}`)

firebase.auth().onAuthStateChanged(() => {
  store.dispatch('getProudsFromDb')
  store.dispatch('getUserFromDb')
  store.dispatch('getGroupsFromDb')

  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
