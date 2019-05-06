<template>
  <section class="timeline">
    <header>
      <h2>Timeline</h2>
      <button @click="saveToken" class="social-button">
        Save user to Firebase
      </button>
    </header>
    <GetProuds />
  </section>
</template>

<script>
import firebase from 'firebase'
import { users } from '@/main.js'
import GetProuds from './GetProuds.vue'
export default {
  name: 'Timeline',
  data() {
    return {}
  },
  methods: {
    saveToken: function() {
      const { uid } = firebase.auth().currentUser
      // kolla om access token och userid finns i det dära.
      if (this.$route.query.access_token && this.$route.query.user_id) {
        console.log('push to firebase')

        users
          .child(uid)
          .child('slack_data')
          .set({
            user_id: this.$route.query.user_id,
            access_token: this.$route.query.access_token
          })
      }
      // om det finns, dunka in i rätt(inloggad) user i firebase
      //this.$route.router.go('/#/home')
    }
  },
  components: {
    GetProuds
  }
}
</script>
