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
            v-for="(group, index) in joinedGroups"
            v-bind:key="index"
          >
            <a
              class="dropdown-menu__item__link"
              @click="setActiveGroup(group.uid)"
            >
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
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Navigation',
  data: () => {
    return {
      profileDropdown: false,
      groupDropdown: false
    }
  },
  computed: {
    joinedGroups() {
      return this.$store.getters['groups/getJoinedGroups'](this.user.uid)
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
    setActiveGroup(id) {
      this.$store.dispatch('users/setActiveGroup', id)
    },
    logout() {
      this.$store.dispatch('users/logOutUser').then(res => {
        this.$store.commit('users/LOG_OUT_USER')
        this.$router.replace('login')
      })
    }
  },
  props: { user: Object }
}
</script>

<style lang="scss" scoped>
@import '~foundation-sites/scss/foundation.scss';
.extra-margin {
  margin-right: rem-calc(16);
}

.divider {
  height: rem-calc(1);
  background: lightgrey;
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
      height: rem-calc(50);
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: rem-calc(16);

      &:nth-last-child() {
        margin-right: rem-calc(-16);
      }
      &--has-dropdown {
        position: relative;
        .dropdown-menu {
          background: #fff;
          border-radius: rem-calc(5);
          border: 1px solid lightgrey;
          padding: 0;

          position: absolute;
          right: 0;
          top: rem-calc(48);

          width: rem-calc(200);
          &__item {
            width: 100%;
            padding: rem-calc(8) 0;
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
                padding-left: rem-calc(8);
              }
              i {
                padding-top: rem-calc(2);
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
  height: rem-calc(42);
  border: rem-calc(1) solid rgba(44, 62, 80, 0.2);
  border-radius: 50%;
}
</style>
