<template>
  <div class="profile" v-show="user !== ''">
    <h2>This is {{ user.displayName }}'s profile</h2>
  </div>
</template>

<script>
import firebase from 'firebase'
import { users } from '@/main'
export default {
  name: 'Profile',
  data() {
    return {
      user: ''
    }
  },
  methods: {
    getUser() {
      const uid = firebase.auth().currentUser.uid
      users.child(uid).on('value', snapshot => {
        this.user = snapshot.val()
      })
    }
  },
  beforeMount() {
    this.getUser()
  }
}
</script>

<style lang="scss" scoped>
.profile {
}
</style>
