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
              <div
                class="users__row__actions"
                v-if="
                  getAdminStatus(activeGroup.uid, state.user.uid) &&
                    user.uid !== state.user.uid
                "
              >
                <context-menu
                  v-if="user.groups[activeGroup.uid] !== 'admin'"
                  :menuitems="usersMenuItems"
                  :id="user.uid"
                />
                <context-menu
                  v-else
                  :menuitems="adminsMenuItems"
                  :id="user.uid"
                />
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
import ContextMenuVue from '../components/ContextMenu.vue'

import { group, users, user } from '@/main.js'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    NewProud,
    Timeline,
    Navigation,
    'context-menu': ContextMenuVue
  },
  data() {
    return {
      usersMenuItems: {
        makeAdmin: {
          label: 'Promote to admin',
          action: this.makeAdmin
        },
        removeFromGroup: {
          label: 'Remove user',
          action: this.removeUser,
          color: 'red'
        }
      },
      adminsMenuItems: {
        removeAdmin: {
          label: 'Demote to user',
          action: this.removeAdmin
        }
      }
    }
  },
  methods: {
    makeAdmin(uid) {
      const conf = confirm(
        'Do you want to add ' +
          this.getUserById(uid).displayName +
          ' to admin for this group?'
      )
      if (conf == true) {
        group(this.activeGroup.uid)
          .child('members/users')
          .update({
            [uid]: null
          })
        group(this.activeGroup.uid)
          .child('members/admins')
          .update({
            [uid]: true
          })
        user(uid)
          .child('groups')
          .update({ [this.activeGroup.uid]: 'admin' })
      } else {
        //You pressed Cancel! Do nothing
      }
    },
    removeAdmin(uid) {
      group(this.activeGroup.uid)
        .child('members/users')
        .update({
          [uid]: true
        })
      group(this.activeGroup.uid)
        .child('members/admins')
        .update({
          [uid]: null
        })
      user(uid)
        .child('groups')
        .update({ [this.activeGroup.uid]: true })
    },
    removeUser(uid) {
      group(this.activeGroup.uid)
        .child('members/users')
        .update({
          [uid]: null
        })

      user(uid)
        .child('groups')
        .update({ [this.activeGroup.uid]: null })
    }
  },
  computed: {
    ...mapState({
      state: 'users'
    }),
    ...mapGetters({
      activeGroup: 'groups/getActiveGroup',
      getAdminStatus: 'groups/getAdminStatus',
      getUserById: 'users/getUserById'
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
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1rem;
    margin-bottom: 0.5rem;
    border: 1px solid lightgray;
    border-radius: 5px;

    &__actions {
      position: absolute;
      top: 0;
      right: 0;
    }

    &__left {
      display: flex;
      min-width: 50%;
      align-items: center;
      flex-grow: 1;
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
