<template>
  <div class="group">
    <div class="group__title">
      <h4 class="group__title__name">{{ group.name }}</h4>
      <i v-show="joined" class="fas fa-user group__title__joined" />
    </div>
    <div class="group__members">
      <a href="#" v-show="!joined" @click="joinGroup()">Join</a>
      <i class="fas fa-users group__members__icon"></i>
      <span class="group__members__badge badge">{{ memberCount }}</span>
    </div>
  </div>
</template>

<script>
import { user, group } from '@/main'
export default {
  name: 'Group',
  data() {
    return {
      memberCount: 0,
      joined: false
    }
  },
  props: {
    group: Object,
    uid: String
  },
  methods: {
    updateState() {
      const { name, members } = this.group
      if (members.users) {
        const users = Object.keys(members.users).length
        const admins = Object.keys(members.admins).length
        const total = users + admins
        this.memberCount = total
      } else {
        const admins = Object.keys(members.admins).length
        this.memberCount = admins
      }
      const groupID = this.group.id

      user(this.uid)
        .child('groups')
        .on('value', snapshot => {
          if (snapshot.val()) {
            const joinedGroups = snapshot.val()
            const joined = Object.keys(joinedGroups).includes(groupID)
            this.joined = joined
          }
        })
    },
    joinGroup() {
      user(this.uid)
        .child('groups')
        .update({ [this.group.id]: true })

      group(this.group.id)
        .child('members')
        .child('users')
        .update({ [this.uid]: true })
    }
  },
  beforeMount() {
    this.updateState()
  },
  beforeUpdate() {
    this.updateState()
  }
}
</script>

<style lang="scss" scoped>
.group {
  border-top: 1px solid lightgray;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem 0 1rem;
  &__title {
    display: flex;
    flex-direction: row;
    align-items: center;
    &__name {
      margin-right: 0.75rem;
    }
  }

  &__members {
    display: flex;
    flex-direction: row;
    align-items: center;
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
