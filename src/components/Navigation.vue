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
          <li class="dropdown-menu__item">
            <a
              href="#"
              class="dropdown-menu__item__link"
              @click="
                {
                  handleProfileDropDown('close')
                  redirect('profile')
                }
              "
            >
              Profile
            </a>
          </li>
          <li class="dropdown-menu__item">
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
              Logout
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
    redirect(route) {
      this.$router.replace(route)
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
      margin-left: 2rem;

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
  height: 42px;
  border: 1px solid rgba(44, 62, 80, 0.2);
  border-radius: 50%;
}
</style>
