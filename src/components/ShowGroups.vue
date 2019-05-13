<template>
  <div>
    <section class="choose-group">
      <div v-if="groups && user">
        <div class="group" v-for="(group, index) in groups" :key="index">
          <div class="group__section">
            <div class="group__title">
              <i
                class="group__title__active-group fas fa-caret-right"
                v-if="group.uid === user.activeGroup"
              ></i>
              <h4 class="group__title__name">{{ group.name }}</h4>
              <i
                class="fas fa-user group__title__joined"
                v-if="user && isMember(group.uid)"
              />
            </div>
            <div class="group__members">
              <a
                class="group__members__joined"
                @click="leaveGroup(group.uid)"
                v-if="
                  user && isMember(group.uid) && !isAdmin(group.uid, user.uid)
                "
              >
                Leave
              </a>
              <a
                class="group__members__joined"
                @click="deleteGroup(group.uid)"
                v-else-if="
                  user && isMember(group.uid) && isAdmin(group.uid, user.uid)
                "
              >
                Remove
              </a>
              <a
                v-else
                class="group__members__joined"
                @click="joinGroup(group.uid)"
              >
                Join
              </a>
              <i class="fas fa-users group__members__icon"></i>
              <span class="group__members__badge badge">
                {{ memberCount(group.uid) }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
      <error-message
        v-show="error.display"
        @close-error="error.display = false"
        :message="error.message"
        :title="error.title"
      />
    </section>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import ErrorMessage from './ErrorMessage.vue'
export default {
  name: 'ShowGroups',
  data: () => {
    return {
      error: {
        display: false,
        title: 'Problem with leave group',
        message: ''
      }
    }
  },
  computed: {
    ...mapGetters('groups', {
      groups: 'getAllGroups'
    }),
    ...mapState('users', {
      user: 'user'
    })
  },
  methods: {
    memberCount(id) {
      return this.$store.getters['groups/getGroupMemberCount'](id)
    },
    setActiveGroup(id) {
      this.$store.commit('users/SET_ACTIVE_GROUP', id)
    },
    isMember(gid) {
      if (this.user.groups) {
        const joinedGroups = Object.keys(this.user.groups)
        return joinedGroups.find(group => group === gid)
      }
    },
    isAdmin(gid, uid) {
      return this.$store.getters['groups/getAdminStatus'](gid, uid)
    },
    leaveGroup(gid) {
      try {
        this.$store.dispatch('groups/leaveGroup', gid)
      } catch (err) {
        this.error = {
          display: true,
          message: err
        }
      }
    },
    deleteGroup(gid) {
      this.$store.dispatch('groups/deleteGroup', gid)
    },
    joinGroup(gid) {
      this.$store.dispatch('groups/joinGroup', gid)
    }
  },
  components: {
    'error-message': ErrorMessage
  },
  watch: {
    groups(value, old) {
      return value
    }
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
      cursor: pointer;
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
