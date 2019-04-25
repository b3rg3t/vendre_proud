<template>
  <div>
    <section class="choose-group">
      <Group
        v-for="(group, index) in groups"
        v-bind:key="index"
        :uid="user.uid"
        :group="group"
      />
    </section>
  </div>
</template>

<script>
import Group from '@/components/Group'
import { mapGetters } from 'vuex'
export default {
  name: 'ShowGroups',
  data: () => {
    return {}
  },
  computed: {
    ...mapGetters('groups', {
      groups: 'getAllGroups'
    }),
    ...mapGetters('users', {
      user: 'getUser'
    })
  },
  components: {
    Group
  }
}
</script>
