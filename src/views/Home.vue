<template>
  <div class="home">
    <div class="wrapper">
      <main class="main">
        <Timeline :options="{ timeline: 'group' }" />
      </main>
      <aside class="sidebar">
        <section v-if="state">
          <h4>Group members</h4>

          <div class="users">
            <div
              class="users__row"
              v-for="(user, index) in state.users"
              :key="index"
            >
              <div v-if="getAdminStatus(activeGroup.uid, state.user.uid)">
                <button
                  v-if="user.groups[activeGroup.uid] !== 'admin'"
                  class="makeAdminBtn"
                  @click="
                    makeAdmin(user.uid, activeGroup.uid, user.displayName)
                  "
                >
                  <i class="fas fa-users-cog"></i>
                </button>
                <button
                  v-else-if="user.groups[activeGroup.uid] === 'admin'"
                  @click="removeAdmin(user.uid, activeGroup.uid)"
                >
                  remove
                </button>
              </div>
              <div class="users__row__left">
                <img
                  class="user-picture"
                  v-if="user.slack_data"
                  :src="user.slack_data.userpic"
                />
                <img class="user-picture" v-else src="../assets/logo.png" />
                <h4>{{ user.displayName || user.email || 'No info' }}</h4>
              </div>
              <p>{{ user.prouds ? Object.keys(user.prouds).length : 0 }}</p>
            </div>
          </div>
        </section>
        <section class="new-proud">
          <NewProud msg="Create new proud" />
        </section>
      </aside>
    </div>
  </div>
</template>

<script>
import firebase, { functions } from 'firebase'

// @ is an alias to /src
import NewProud from '@/components/NewProud.vue'
import Timeline from '@/components/Timeline.vue'
import Navigation from '@/components/Navigation.vue'
import { group, users, user } from '@/main.js'

import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    NewProud,
    Timeline,
    Navigation
  },

  methods: {
    makeAdmin(uid, gid, displayName) {
      const conf = confirm(
        'Do you want to add ' + displayName + ' to admin for this group?'
      )
      if (conf == true) {
        group(gid)
          .child('members/users')
          .update({
            [uid]: null
          })
        group(gid)
          .child('members/admins')
          .update({
            [uid]: true
          })
        user(uid)
          .child('groups')
          .update({ [gid]: 'admin' })
      } else {
        //You pressed Cancel! Do nothing
      }
    },
    removeAdmin(uid, gid) {
      group(gid)
        .child('members/users')
        .update({
          [uid]: true
        })
      group(gid)
        .child('members/admins')
        .update({
          [uid]: null
        })
      user(uid)
        .child('groups')
        .update({ [gid]: true })
    }
  },
  computed: {
    ...mapState({
      state: 'users'
    }),
    ...mapGetters({
      activeGroup: 'groups/getActiveGroup',
      getAdminStatus: 'groups/getAdminStatus'
    })
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
}

.wrapper {
  display: grid;
  grid-template-columns: 1fr;

  @media screen and (min-width: 768px) {
    grid-template-columns: 4fr 3fr;
  }
}
.btn1 {
  flex: 1;
}
.input {
  margin-top: 500px;
}
.sidebar {
  padding: 1rem;
}

.users {
  padding: 0.5rem 1rem 1rem;
  width: 100%;
  &__row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1rem;
    margin-bottom: 0.5rem;
    border: 1px solid lightgray;
    border-radius: 5px;
    &__left {
      display: flex;
      min-width: 50%;
      align-items: center;
      flex-direction: row;
      .user-picture {
        height: 48px;
        border-radius: 50%;
        border: 1px lightgrey solid;
        margin-right: 1rem;
      }
    }
    h4,
    p {
      margin: 0;
      padding: 0;
    }
    .makeAdminBtn {
      background-color: white;
      border: 0px solid lightgray;
      border-radius: 3px;
    }
  }
}
</style>
