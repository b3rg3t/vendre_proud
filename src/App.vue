<template>
  <div id="app" class="grid-container full">
    <header v-show="user" class="main-header">
      <div class="main-header__wrapper grid-container">
        <div class="logo">
          <h2 class="logo__text">#PROUD</h2>
        </div>
        <Navigation v-if="user" :user="user" />
        <div v-else class="placeholder-menu"></div>
      </div>
    </header>
    <div class="content-wrapper grid-container">
      <router-view />
    </div>
    <footer v-show="user" class="footer">
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
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  data() {
    return {}
  },
  components: {
    Navigation
  },
  methods: {},
  computed: {
    ...mapGetters('users', {
      user: 'getUser'
    })
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

$text-color: #2c3e50;

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
  color: $text-color;
  padding-bottom: 4rem;
}

.btn {
  @extend .button;
  background: seagreen;
  border-radius: 5px;

  &:hover {
    background: darkseagreen;
  }
  &--outline {
    background: transparent;
    border: lightgray 2px solid;
    color: $text-color;
    &:hover {
      background: rgb(241, 241, 241);
      color: $text-color;
    }
  }
  &--with-icon {
    i {
      margin-right: 0.5rem;
    }
  }
}

.btn--small {
  @extend .btn;
  padding: 0.3rem 0.5rem;
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

  .placeholder-menu {
    background: lightgray;
    border-radius: 5px;
    width: 100%;
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

.page-wrapper {
  width: 100%;
  padding-top: 4rem;
}

// Form styles
.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__input {
    &--text {
      margin-bottom: 1rem;
      width: 100%;
      padding: 15px;
      border: 1px solid lightgrey;
      background: none;
      border-radius: 5px;
    }
    &--checkbox {
      width: 18px;
      height: 18px;
      padding: 0.5rem;
    }
  }
  &__label {
    &--checkbox {
      margin-left: 0.5rem;
      font-size: 0.8em;
      font-weight: 600;
    }
  }
  &__section {
    border: none;
    padding: 0;
    margin: 0;
    width: 100%;
    &__heading {
      width: 100%;
    }
    &--inline {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
    }
  }

  &__button {
    margin-top: 20px;
    width: 100%;
    cursor: pointer;
  }
  &__signup {
    margin-top: 40px;
    font-size: 0.75em;
    &__link {
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>
