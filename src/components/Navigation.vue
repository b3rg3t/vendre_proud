<template>
  <nav class="navigation">
    <ul class="navigation__list">
      <li class="navigation__list__item">
        <button class="dropdown button">Groups</button>
      </li>
      <li class="navigation__list__item">
        <button class="button primary">Profile</button>
      </li>
      <li class="navigation__list__item">
        <button class="button alert" @click="logout">Logout</button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  data: () => {
    return {}
  },
  methods: {},
  props: {}
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

    &__item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-left: 0.5rem;

      button {
        margin: 0;
      }
    }
  }
}
</style>
