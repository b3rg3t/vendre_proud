<template>
  <section class="timeline">
    <header>
      <h2>Timeline</h2>
    </header>
    <GetProuds />
  </section>
</template>

<script>
import firebase from 'firebase'
import { users } from '@/main.js'
import GetProuds from './GetProuds.vue'
import axios from 'axios'
export default {
  name: 'Timeline',
  data() {
    return {
      userpic: null
    }
  },
  methods: {
    saveToken: function() {
      const { uid } = firebase.auth().currentUser
      const access_token = this.$route.query.access_token
      const user_id = this.$route.query.user_id
      if (access_token && user_id) {
        console.log('push to firebase')
        users
          .child(uid)
          .child('slack_data')
          .set({
            user_id,
            access_token
          })
      }
      this.getPicFromSlack(access_token, user_id, uid)
      this.$router.replace('home')
    },
    getPicFromSlack(access_token, user_id, uid) {
      const API = 'https://slack.com/api/users.info'
      const query = '?token=' + access_token + '&user=' + user_id
      axios.get(API + query).then(response => {
        this.userpic = response.data.user.profile.image_192
        console.log(response)
        users
          .child(uid)
          .child('slack_data')
          .update({
            userpic: this.userpic
          })
      })
    }
  },

  beforeMount() {
    this.saveToken()
  },
  components: {
    GetProuds
  }
}
</script>
