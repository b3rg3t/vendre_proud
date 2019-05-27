<template>
  <div id="app" class="grid-container full">
    <header v-show="user" class="main-header">
      <div class="main-header__wrapper grid-container">
        <div class="logo">
          <h2 class="logo__text">
            <i class="fab fa-slack-hash btn-getprouds-icon"></i>
            PROUD
          </h2>
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
  border-radius: rem-calc(5);

  &:hover {
    background: darkseagreen;
  }
  &--outline {
    background: transparent;
    border: rem-calc(2) lightgray solid;
    color: $text-color;
    &:hover {
      background: rgb(241, 241, 241);
      color: $text-color;
    }
  }
  &--with-icon {
    i {
      margin-right: rem-calc(8);
    }
  }
}
.btn-getprouds-icon {
  color: seagreen;
}
.btn--small {
  @extend .btn;
  padding: rem-calc(4 8);
}

.main-header {
  border-bottom: rem-calc(1) solid lightgrey;
  margin-bottom: rem-calc(24);
  padding: rem-calc(16);
  vertical-align: middle;

  &__wrapper {
    height: rem-calc(42);
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
    border-radius: rem-calc(5);
    width: 100%;
  }
}

.footer {
  background: #fff;
  position: fixed;
  bottom: 0;
  padding: rem-calc(16);
  display: flex;
  width: 100%;
  border-top: rem-calc(1) solid lightgray;
  .bottom {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.page-wrapper {
  width: 100%;
  padding-top: rem-calc(64);
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
      margin-bottom: rem-calc(16);
      width: 100%;
      padding: rem-calc(15);
      border: rem-calc(1) solid lightgrey;
      background: none;
      border-radius: rem-calc(5);
    }
    &--checkbox {
      width: rem-calc(18);
      height: rem-calc(18);
      padding: rem-calc(8);
    }
  }
  &__label {
    &--checkbox {
      margin-left: rem-calc(8);
      font-size: rem-calc(8);
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
    margin-top: rem-calc(20);
    width: 100%;
    cursor: pointer;
  }
  &__signup {
    margin-top: rem-calc(40);
    font-size: rem-calc(6);
    &__link {
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>
