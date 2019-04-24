<template>
  <nav class="navigation">
    <ul class="navigation__list">
      <li class="navigation__list__item">
        <router-link class="navigation__list__item__link" to="home">
          Home
        </router-link>
      </li>
      <li
        class="navigation__list__item navigation__list__item--has-dropdown"
        @mouseover="handleGroupDropDown('open')"
        @mouseleave="handleGroupDropDown('close')"
      >
        <router-link class="navigation__list__item__link" to="groups">
          Groups
        </router-link>
        <ul class="dropdown-menu menu vertical" v-show="groupDropdown">
          <li
            class="dropdown-menu__item dropdown-menu__item--with-icon"
            v-for="(group, index) in groups"
            v-bind:key="index"
          >
            <a class="dropdown-menu__item__link" @click="selectGroup(group.id)">
              {{ group.name }}
            </a>
          </li>
          <div class="divider"></div>
          <li class="dropdown-menu__item dropdown-menu__item--with-icon">
            <a class="dropdown-menu__item__link">
              <i class="fas fa-user-plus"></i>
              <span>Join group</span>
            </a>
          </li>
        </ul>
      </li>
      <li
        class="navigation__list__item navigation__list__item--has-dropdown"
        @mouseover="handleProfileDropDown('open')"
        @mouseleave="handleProfileDropDown('close')"
      >
        <a class="navigation__list__item__link extra-margin">
          {{ user.displayName }}
        </a>
        <a class="navigation__list__item__link">
          <img
            class="profile-picture"
            :alt="user.displayName"
            src="../assets/logo.png"
          />
        </a>
        <ul class="dropdown-menu menu vertical" v-show="profileDropdown">
          <li class="dropdown-menu__item dropdown-menu__item--with-icon">
            <a
              class="dropdown-menu__item__link"
              @click="
                {
                  handleProfileDropDown('close')
                  redirect('profile')
                }
              "
            >
              <i class="fas fa-user"></i>
              <span>Profile</span>
            </a>
          </li>
          <li class="dropdown-menu__item dropdown-menu__item--with-icon">
            <a
              class="dropdown-menu__item__link"
              @click="
                {
                  handleProfileDropDown('close')
                  logout()
                }
              "
            >
              <i class="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
import { user, group } from '@/main'
export default {
  name: 'Navigation',
  data: () => {
    return {
      profileDropdown: false,
      groupDropdown: false,
      groups: []
    }
  },
  methods: {
    handleProfileDropDown(value) {
      if (value === 'open') {
        this.profileDropdown = true
      } else if (value === 'close') {
        this.profileDropdown = false
      }
    },
    handleGroupDropDown(value) {
      if (value === 'open') {
        this.groupDropdown = true
      } else if (value === 'close') {
        this.groupDropdown = false
      }
    },
    redirect(route = String) {
      this.$router.push(route)
    },
    getJoinedGroups() {
      // Get the signed in user's groups
      user(this.user.uid).on('value', snapshot => {
        // If any group has been joined
        if (snapshot.val()) {
          // Convert to array of keys
          const joinedGroups = Object.keys(snapshot.val().groups)
          const array = []
          // Loop through keys
          joinedGroups.forEach(g => {
            // Get the group object and push it to state
            group([g])
              .once('value', snapshot => {
                const res = snapshot.val()
                if (res) {
                  array.push(res)
                } else {
                  throw Error(`Could not find group. ${err}`)
                }
              })
              .catch(err => {
                throw Error(
                  `[Navigation(getJoinedGroups)]Something went wrong. ${err}`
                )
              })
          })
          this.groups = array
        }
      })
    },
    selectGroup(id) {
      console.log(id)
      user(this.user.uid)
        .child('activeGroup')
        .set(id)
    }
  },
  props: { user: Object, logout: Function },
  beforeMount() {
    this.getJoinedGroups()
  }
}
</script>

<style lang="scss" scoped>
.extra-margin {
  margin-right: 1rem;
}

.divider {
  height: 1px;
  background: lightgray;
}

.navigation {
  margin: 0;
  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: row;

    &__item {
      height: 50px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 1rem;

      &:nth-last-child() {
        margin-right: -1rem;
      }
      &--has-dropdown {
        position: relative;
        .dropdown-menu {
          background: #fff;
          border-radius: 5px;
          border: 1px solid lightgrey;
          padding: 0;

          position: absolute;
          right: 0;
          top: 3rem;

          width: 200px;
          &__item {
            width: 100%;
            padding: 0.5rem 0;
            &:hover {
              background: darken(#fff, 5%);
            }
            &--with-icon {
              a {
                display: flex;
                flex-direction: row;
                cursor: pointer;
              }
              span {
                padding-left: 0.5rem;
              }
              i {
                padding-top: 2px;
              }
            }
          }
        }
      }

      &__link {
        text-decoration: none;
        font-weight: 600;
        color: rgb(44, 62, 80);
        cursor: pointer;
      }
    }
  }
}
.profile-picture {
  height: 42px;
  border: 1px solid rgba(44, 62, 80, 0.2);
  border-radius: 50%;
}
</style>
