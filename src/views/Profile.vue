<template>
  <div class="profile" v-show="user !== ''">
    <h2>This is {{ user.displayName }}'s profile</h2>
  </div>
</template>

<script>
import firebase from 'firebase'
import { users } from '@/main'
import { mapGetters } from 'vuex'
export default {
  name: 'Profile',
  data() {
    return {}
  },
  computed: {
    ...mapGetters('users', {
      user: 'getUser'
    })
  }
}
</script>

<style lang="scss" scoped>
.profile {
}
</style>
