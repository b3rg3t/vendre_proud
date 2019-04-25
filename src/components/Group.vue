<template>
  <div class="group">
    <div class="group__section">
      <div class="group__title">
        <i class="group__title__active-group fas fa-caret-right"></i>
        <h4 class="group__title__name">{{ group.name }}</h4>
        <i class="fas fa-user group__title__joined" />
      </div>
      <div class="group__members">
        <a href="#" class="group__members__joined">
          Join
        </a>
        <i class="fas fa-users group__members__icon"></i>
        <span class="group__members__badge badge">
          {{ memberCount }}
        </span>
      </div>
    </div>
    <div class="group__section">
      <div class="btn--small btn--with-icon">
        <i class="fas fa-sign-out-alt" />
        <span>Leave</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Group',
  data() {
    return {}
  },
  props: {
    group: Object,
    uid: String
  },
  methods: {},
  computed: {
    ...mapGetters('groups', {
      memberCount: getGroupMemberCount(group.id)
    })

    // isMember() {
    //   const {
    //     members: { users, admin }
    //   } = this.$store.group.getters.getGroup(this.group.id)
    //   const { groups } = this.$store.getters.getUser(this.uid)
    //   const groupKeys = Object.keys(groups)
    // }
  }
}
</script>

<style lang="scss" scoped>
.group {
  border-top: 1px solid lightgray;
  padding: 0 1rem 0 1rem;
  &__section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  &__title {
    display: flex;
    flex-direction: row;
    align-items: center;
    &__name {
      margin-right: 0.75rem;
    }
    &__active-group {
      margin-right: 0.75rem;
    }
  }

  &__members {
    display: flex;
    flex-direction: row;
    align-items: center;
    &__joined {
      margin-right: 0.75rem;
    }
    &__icon {
      color: rgb(34, 100, 63);
    }
    &__badge {
      margin-left: 0.75rem;
      background: rgb(34, 100, 63);
    }
  }
}
</style>

<script>
// export default {
//   handleLeaveGroup() {
//     user(this.uid)
//       .child('groups')
//       .update({ [this.group.id]: null })
//     group(this.group.id)
//       .child('members')
//       .child('users')
//       .update({ [this.uid]: null })
//   },

//   joinGroup() {
//     user(this.uid)
//       .child('groups')
//       .update({ [this.group.id]: true })

//     group(this.group.id)
//       .child('members')
//       .child('users')
//       .update({ [this.uid]: true })
//   }
// }
</script>
