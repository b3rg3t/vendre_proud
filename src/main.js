import Vue from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

let app = ''
const config = {
  apiKey: 'AIzaSyD50HAHTNxNVi5mhLISv5qMQq5maA8T8PA',
  authDomain: 'proud-e4833.firebaseapp.com',
  databaseURL: 'https://proud-e4833.firebaseio.com',
  projectId: 'proud-e4833',
  storageBucket: 'proud-e4833.appspot.com',
  messagingSenderId: '667017411392'
}

firebase.initializeApp(config)

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})
