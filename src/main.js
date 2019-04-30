import Vue from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import router from './router'
import config from './config'

Vue.config.productionTip = false

let app = ''

firebase.initializeApp(config)

const db = firebase.database()

// refs
export const users = db.ref('users')
export const groups = db.ref('groups')
export const prouds = db.ref('prouds')

var SlackWebhook = require('slack-webhook')
export const slack = new SlackWebhook(
  'https://hooks.slack.com/services/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'
)

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      render: h => h(App),
      data: {
        access_token: '',
        user_id: ''
      },
      beforeRouteEnter(to, from, next) {
        if (Object.keys(to.query).length !== 0) {
          //if the url has query (?query)
          next(vm => {
            vm.access_token = to.query.access_token
            vm.user_id = to.query.user_id
          })
        }
        next()
      }
    }).$mount('#app')
  }
})
