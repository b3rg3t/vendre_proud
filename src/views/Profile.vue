<template>
  <section class="user-profile">
    <h2 v-if="user">Hi, {{ user.displayName || user.email }}!</h2>
    <p>This is your profile</p>
    <Timeline :options="{ timeline: 'user' }" />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import Timeline from '@/components/Timeline'
export default {
  name: 'Profile',
  data: () => {
    return {}
  },
  computed: {
    ...mapGetters({
      user: 'users/getUser'
    })
  },
  components: {
    Timeline
  }
}
</script>

<style lang="scss" scoped>
@import '~foundation-sites/scss/foundation.scss';
.user-profile {
}
</style>
