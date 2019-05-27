<template>
  <div class="home">
    <div class="wrapper">
      <main class="main">
        <Timeline :options="{ timeline: 'group' }" />
      </main>
      <aside class="sidebar">
        <section class="new-proud">
          <NewProud msg="Create new proud" />
        </section>

        <section v-if="state">
          <h4>Group members</h4>
          <router-link to="invite-members">
            <button class="btn-invite">
              <i class="fas fa-user-plus btn-invite-members"></i>
              Invite members
            </button>
          </router-link>
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
                  v-if="user.slack_data && user.slack_data.userpic"
                  :src="user.slack_data.userpic"
                />
                <img class="user-picture" v-else src="../assets/logo.png" />
                <h4>{{ user.displayName || user.email || 'No info' }}</h4>
              </div>
            </div>
          </div>
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
@import '~foundation-sites/scss/foundation.scss';
@include foundation-button;
.home {
  width: 100%;
  height: 100%;
}

.wrapper {
  /* @include xy-grid; */
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
  margin-top: rem-calc(500);
}
/* .main {
  @include xy-cell();
} */
.sidebar {
  /* @include xy-cell(); */
  padding: rem-calc(16);
}
.btn-invite {
  margin-bottom: rem-calc(8);
  padding: rem-calc(6);
  border: rem-calc(1) solid lightgray;
  border-radius: rem-calc(5);
<<<<<<< HEAD
  background-color: none;
  cursor: pointer;
  &:hover {
    background-color: lightgray;
=======
  background: none;
  cursor: pointer;
  &:hover {
    background-color: rgb(246, 252, 249);
>>>>>>> master
  }
}
.btn-invite-members {
  color: seagreen;
}
.users {
  padding: rem-calc(16);
  width: 100%;
  &__row {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: rem-calc(16);
    padding-right: rem-calc(16);
    margin-bottom: rem-calc(8);
    border: rem-calc(1) solid lightgray;
    border-radius: rem-calc(5);

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
        height: rem-calc(48);
        border-radius: 50%;
        border: rem-calc(1) lightgrey solid;
        margin-right: rem-calc(16);
      }
    }
    h4,
    p {
      margin: 0;
      padding: 0;
    }
    .makeAdminBtn {
      background-color: white;
      border: rem-calc(0) solid lightgray;
      border-radius: rem-calc(3);
    }
  }
}
</style>
