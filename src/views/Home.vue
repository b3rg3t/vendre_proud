<template>
  <div class="home">
    <h1>Welcome {{ getCurrentUser }}</h1>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
// @ is an alias to /src
import firebase from 'firebase'

export default {
  name: 'Home',
  components: {},
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace('login')
        })
    }
  },
  computed: {
    getCurrentUser: () => {
      return firebase.auth().currentUser.email
    }
  }
}
</script>
