<template>
  <nav class="navigation">
    <ul class="navigation__list">
      <li class="navigation__list__item">
        <router-link class="navigation__list__item__link" to="home">
          Home
        </router-link>
      </li>
      <li class="navigation__list__item">
        <router-link class="navigation__list__item__link" to="groups">
          Groups
        </router-link>
      </li>
      <li
        class="navigation__list__item navigation__list__item--has-dropdown"
        @click="handleProfileDropDown('open')"
        @mouseleave="handleProfileDropDown('close')"
      >
        <a href="#" class="navigation__list__item__link">
          <img
            class="profile-picture"
            :alt="userName"
            src="../assets/logo.png"
          />
        </a>
        <ul class="dropdown-menu menu vertical" v-show="profileDropdown">
          <li class="dropdown-menu__item dropdown-menu__item--with-icon">
            <router-link
              to="profile"
              href="#"
              class="dropdown-menu__item__link"
              @click="handleProfileDropDown('close')"
            >
              <i class="fas fa-user"></i>
              <span>Profile</span>
            </router-link>
          </li>
          <li class="dropdown-menu__item dropdown-menu__item--with-icon">
            <a
              href="#"
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
export default {
  name: 'Navigation',
  data: () => {
    return {
      profileDropdown: false,
      groupDropdown: false
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
    handleGroupDropDown() {
      this.groupDropdown = !this.groupDropdown
    },
    redirect(route = String) {
      this.$router.push(route)
    }
  },
  props: {
    logout: Function,
    userName: String
  }
}
</script>

<style lang="scss" scoped>
.navigation {
  margin: 0;
  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;

    &__item {
      display: flex;
      flex-direction: column;
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
          top: 4rem;
          right: 0;

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

      &--has-dropdown {
        position: relative;
      }

      &__link {
        text-decoration: none;
        font-weight: 600;
        color: rgb(44, 62, 80);
      }
    }
  }
<<<<<<< HEAD
=======

  .dropdown-menu {
    background: #fff;
    border-radius: 5px;
    border: 1px solid lightgrey;
    padding: 0;
    position: absolute;
    top: 2.8rem;
    right: 0;
  }
>>>>>>> master
}
.profile-picture {
  height: 42px;
  border: 1px solid rgba(44, 62, 80, 0.2);
  border-radius: 50%;
}
</style>
