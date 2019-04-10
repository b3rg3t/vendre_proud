<template>
  <div id="app" class="grid-container full">
    <header class="main-header">
      <div class="main-header__wrapper grid-container">
        <div class="logo">
          <h2 class="logo__text">#PROUD</h2>
        </div>
        <Navigation
          v-show="user"
          :userName="user.displayName"
          :logout="logout"
        />
      </div>
    </header>
    <div class="content-wrapper grid-container">
      <router-view />
    </div>
    <footer class="footer">
      <div class="bottom">
        <span>Copywright PROUD</span>
      </div>
    </footer>
  </div>
</template>

<script>
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
  }
}
</script>

<style lang="scss">
@import '~foundation-sites/scss/foundation.scss';
@include foundation-button;

// Menu-based containers
@include foundation-menu;
@include foundation-menu-icon;

@include foundation-badge;

// Grid containers
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
  vertical-align: middle;

  &__wrapper {
    height: 42px;
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
    justify-content: center;
    align-items: center;
  }
}
</style>
