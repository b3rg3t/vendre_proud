<template>
  <div class="group">
    <div class="group__section">
      <div class="group__title">
        <i
          v-if="activeGroup === group.id"
          class="group__title__active-group fas fa-caret-right"
        ></i>
        <h4 class="group__title__name">{{ group.name }}</h4>
        <i v-if="joined" class="fas fa-user group__title__joined" />
      </div>
      <div class="group__members">
        <a
          href="#"
          v-show="!joined"
          @click="joinGroup()"
          class="group__members__joined"
        >
          Join
        </a>
        <i class="fas fa-users group__members__icon"></i>
        <span class="group__members__badge badge">{{ memberCount }}</span>
      </div>
    </div>
    <div class="group__section">
      <div class="btn--small btn--with-icon" @click="handleLeaveGroup()">
        <i class="fas fa-sign-out-alt" />
        <span>Leave</span>
      </div>
    </div>
  </div>
</template>

<script>
import { user, group, groups } from '@/main'
export default {
  name: 'Group',
  data() {
    return {
      memberCount: 0,
      joined: null,
      activeGroup: null
    }
  },
  props: {
    group: Object,
    uid: String
  },
  methods: {
    handleLeaveGroup() {
      user(this.uid)
        .child('groups')
        .update({ [this.group.id]: null })
      group(this.group.id)
        .child('members')
        .child('users')
        .update({ [this.uid]: null })
    },
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
      user(this.uid).on('value', snapshot => {
        if (snapshot.val()) {
          const joinedGroups = snapshot.val().groups
          const activeGroup = snapshot.val().activeGroup
          if (this.activeGroup === groupID) this.activeGroup = true
          const joined = Object.keys(joinedGroups).includes(groupID)
          this.joined = joined
          this.activeGroup = activeGroup
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
