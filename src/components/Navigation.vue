<template>
  <nav class="navigation">
    <ul class="navigation__list">
      <li v-if="isHidden" class="navigation__list__item">
        <a
          href="https://slack.com/oauth/authorize?scope=incoming-webhook,chat:write:user,groups:history&client_id=230513850368.604545361031"
        >
          <!-- href="https://slack.com/oauth/authorize?scope=incoming-webhook,chat:write:user,users:read&client_id=230513850368.604545361031&redirect_uri=https://evening-temple-56525.herokuapp.com/oauth" -->

          <!-- href="https://slack.com/oauth/authorize?scope=incoming-webhook,chat:write:user,users:read&client_id=230513850368.604545361031&redirect_uri=https://111f4eaf.ngrok.io/oauth" -->
          <img
            alt="Add to Slack"
            height="40"
            width="139"
            src="https://platform.slack-edge.com/img/add_to_slack.png"
            srcset="
              https://platform.slack-edge.com/img/add_to_slack.png    1x,
              https://platform.slack-edge.com/img/add_to_slack@2x.png 2x
            "
          />
        </a>
      </li>
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
            <router-link class="navigation__list__item__link" to="groups">
              <a class="dropdown-menu__item__link">
                <i class="fas fa-user-plus"></i>
                <span>Join group</span>
              </a>
            </router-link>
          </li>
          <li class="dropdown-menu__item dropdown-menu__item--with-icon">
            <router-link class="navigation__list__item__link" to="create-group">
              <a class="dropdown-menu__item__link">
                <i class="fas fa-plus-circle"></i>
                <span>Create group</span>
              </a>
            </router-link>
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
            v-if="getProfilePicture"
            class="profile-picture"
            :alt="user.displayName"
            :src="getProfilePicture"
          />
          <img
            v-else
            class="profile-picture"
            alt="Placeholder profile picture"
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
import { GET_KEY } from '@/helpers'
export default {
  name: 'Navigation',
  data: () => {
    return {
      profileDropdown: false,
      groupDropdown: false,
      isHidden: true
    }
  },
  computed: {
    joinedGroups() {
      return this.$store.getters['groups/getJoinedGroups'](this.user.uid)
    },
    getProfilePicture() {
      const userProfilePic = GET_KEY(['slack_data', 'userpic'], this.user)
      if (userProfilePic) {
        return userProfilePic
      } else {
        return false
      }
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
      this.redirect('home')
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
          border: rem-calc(1) solid lightgrey;
          padding: 0;
          z-index: 999;
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

  .dropdown-menu {
    background: #fff;
    border-radius: 5px;
    border: 1px solid lightgrey;
    padding: 0;
    position: absolute;
    top: 2.8rem;
    right: 0;
  }
}
.profile-picture {
  height: rem-calc(42);
  border: rem-calc(1) solid rgba(44, 62, 80, 0.2);
  border-radius: 50%;
}
</style>
