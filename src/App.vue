<template>
  <div id="app" class="grid-container full">
    <header class="main-header">
      <div class="main-header__wrapper grid-container">
        <div class="logo">
          <h2 class="logo__text">#PROUD</h2>
        </div>
<<<<<<< HEAD
        <Navigation
          v-show="user"
          :userName="user.displayName"
          :logout="logout"
        />
=======
        <Navigation />
>>>>>>> master
      </div>
    </header>
    <div class="content-wrapper grid-container">
      <router-view />
    </div>
    <footer class="footer">
      <div class="bottom">
<<<<<<< HEAD
        <span>Copywright PROUD</span>
=======
        <div class="left">
          <span>Copywright PROUD</span>
        </div>
        <div class="right">
          <button @click="showTimeline">New</button>
        </div>
>>>>>>> master
      </div>
    </footer>
  </div>
</template>

<script>
<<<<<<< HEAD
import firebase from 'firebase'
import { users } from '@/main'
import Navigation from '@/components/Navigation'
export default {
  name: 'App',
  data() {
    return {
      user: false
    }
  },
  components: {
    Navigation
  },
  methods: {
    getCurrentUser(uid) {
      users.child(uid).on('value', snapshot => {
        this.user = snapshot.val()
      })
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace('login')
        })
    },
    checkUser() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.getCurrentUser(user.uid)
        } else {
          this.user = false
        }
      })
    }
  },
  beforeMount() {
    this.checkUser()
=======
import Navigation from '@/components/Navigation'
export default {
  name: 'App',
  components: {
    Navigation
>>>>>>> master
  }
}
</script>

<style lang="scss">
@import '~foundation-sites/scss/foundation.scss';
@include foundation-button;
<<<<<<< HEAD

// Menu-based containers
@include foundation-menu;
@include foundation-menu-icon;

@include foundation-badge;

// Grid containers
=======
>>>>>>> master
@include foundation-xy-grid-classes(
  $base-grid: true,
  $margin-grid: true,
  $padding-grid: true,
  $block-grid: true,
  $collapse: true,
  $offset: true,
  $vertical-grid: true,
  $frame-grid: true
);
<<<<<<< HEAD

=======
>>>>>>> master
* {
  box-sizing: border-box;
}

body {
  padding: 0;
  margin: 0;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.btn {
  @extend .button;
  background: seagreen;
  border-radius: 5px;

  &:hover {
    background: darkseagreen;
  }
}

.main-header {
  border-bottom: 1px solid lightgrey;
  margin-bottom: 1.5rem;
  padding: 1rem;
<<<<<<< HEAD
  vertical-align: middle;

  &__wrapper {
    height: 42px;
=======

  &__wrapper {
>>>>>>> master
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
      &__text {
        margin: 0;
      }
    }
  }
}

.footer {
  background: #fff;
  position: fixed;
  bottom: 0;
  padding: 1rem;
  display: flex;
  width: 100%;
  border-top: 1px solid lightgray;
  .bottom {
    width: 100%;
    display: flex;
<<<<<<< HEAD
    justify-content: center;
    align-items: center;
=======
    .left {
      flex: 1 1 auto;
      text-align: center;
    }
    .right {
      flex: 1 1 auto;
      text-align: center;
    }
>>>>>>> master
  }
}
</style>
