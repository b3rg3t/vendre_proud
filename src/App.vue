<template>
  <div id="app">
    <img class="v" alt="Vue logo" src="./assets/logo.png" />
    <router-view />
  </div>
</template>

<style lang="scss">
@import '~foundation-sites/scss/foundation.scss';
@include foundation-button;
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
.v {
  height: 40px;
  position: fixed;
  left: 20px;
  top: 20px;
}
.btn {
  @extend .button;
  background: seagreen;
  border-radius: 5px;

  &:hover {
    background: darkseagreen;
  }
}
</style>
