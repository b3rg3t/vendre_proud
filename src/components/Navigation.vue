<template>
  <nav class="navigation">
    <ul class="navigation__list">
      <li class="navigation__list__item">
<<<<<<< HEAD
        <router-link class="navigation__list__item__link" to="home">
          Home
        </router-link>
      </li>
      <li class="navigation__list__item">
        <router-link class="navigation__list__item__link" to="groups">
          Groups
        </router-link>
      </li>
      <li class="navigation__list__item">
        <a
          href="#"
          class="navigation__list__item__link"
          @click="handleProfileDropDown"
        >
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
                  handleProfileDropDown()
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
                  handleProfileDropDown()
                  logout()
                }
              "
            >
              Logout
            </a>
          </li>
        </ul>
=======
        <button class="dropdown button">Groups</button>
      </li>
      <li class="navigation__list__item">
        <button class="button primary">Profile</button>
      </li>
      <li class="navigation__list__item">
        <button class="button alert" @click="logout">Logout</button>
>>>>>>> master
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  data: () => {
<<<<<<< HEAD
    return {
      profileDropdown: false,
      groupDropdown: false
    }
  },
  methods: {
    handleProfileDropDown() {
      this.profileDropdown = !this.profileDropdown
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
=======
    return {}
  },
  methods: {},
  props: {}
>>>>>>> master
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
<<<<<<< HEAD
    justify-content: flex-end;
    align-items: center;
=======
>>>>>>> master

    &__item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
<<<<<<< HEAD
      margin-left: 2rem;

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
    top: 4rem;
  }
}
.profile-picture {
  height: 42px;
  border: 1px solid rgba(44, 62, 80, 0.2);
  border-radius: 50%;
=======
      margin-left: 0.5rem;

      button {
        margin: 0;
      }
    }
  }
>>>>>>> master
}
</style>
