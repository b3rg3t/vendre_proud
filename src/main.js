import Vue from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import router from './router'
import config from './config'
import store from '@/store/store'

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
export const group = gid => db.ref(`groups/${gid}`)

// Prouds
export const prouds = db.ref('prouds')
export const proud = pid => db.ref(`prouds/${pid}`)

var SlackWebhook = require('slack-webhook')
export const slack = new SlackWebhook(
  'https://hooks.slack.com/services/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'
)

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    ;(async function() {
      console.log('User login detected!')
      await store.dispatch('users/startListeningToUser')
      await store.dispatch('prouds/startListeningToProuds')
      await store.dispatch('groups/startListeningToGroups')
    })()
  } else {
    ;(async function() {
      console.log('User logout detected!')
      await store.dispatch('groups/stopListeningToGroups')
      await store.dispatch('prouds/stopListeningToProuds')
      await store.dispatch('users/stopListeningToUser')
    })()
  }

  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      store,
      beforeRouteEnter(to, from, next) {
        if (Object.keys(to.query).length !== 0) {
          //if the url has query (?query)
          next(vm => {
            vm.access_token = to.query.access_token
            vm.user_id = to.query.user_id
          })
        }
        next()
      },
      render: h => h(App),
      data: {
        access_token: '',
        user_id: ''
      }
    }).$mount('#app')
  }
})
