<template>
  <div id="app" class="grid-container full">
    <header class="main-header">
      <div class="main-header__wrapper grid-container">
        <div class="logo">
          <h2 class="logo__text">#PROUD</h2>
        </div>
        <Navigation />
      </div>
    </header>
    <div class="content-wrapper grid-container">
      <router-view />
    </div>
    <footer class="footer">
      <div class="bottom">
        <div class="left">
          <span>Copywright PROUD</span>
        </div>
        <div class="right">
          <button @click="showTimeline">New</button>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'
export default {
  name: 'App',
  components: {
    Navigation
  }
}
</script>

<style lang="scss">
@import '~foundation-sites/scss/foundation.scss';
@include foundation-button;
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

  &__wrapper {
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
    .left {
      flex: 1 1 auto;
      text-align: center;
    }
    .right {
      flex: 1 1 auto;
      text-align: center;
    }
  }
}
</style>
