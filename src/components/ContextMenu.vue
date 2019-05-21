<template>
  <button
    class="context-menu"
    @mouseover="open = true"
    @mouseleave="open = false"
  >
    <i class="fas fa-ellipsis-v"></i>
    <ul v-show="open" class="context-menu__list">
      <li
        v-for="(item, index) in menuitems"
        :key="index"
        class="context-menu__list__item"
      >
        <a
          @click="item.action(id)"
          class="context-menu__list__item__link"
          :style="`color: ${item.color}`"
        >
          {{ item.label }}
        </a>
      </li>
    </ul>
  </button>
</template>

<script>
export default {
  name: 'context-menu',
  data: () => {
    return {
      open: false
    }
  },
  props: ['menuitems', 'id']
}
</script>

<style lang="scss" scoped>
.context-menu {
  position: absolute;
  padding: 0.5rem;
  top: 0.5rem;
  right: 0.25rem;
  background: none;
  border: none;
  color: rgb(97, 97, 97);
  cursor: pointer;

  .context-menu__list {
    z-index: 9999;
    min-width: 130px;
    position: absolute;
    right: 0;
    top: 1rem;

    background: #fff;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    border: 1px solid rgb(240, 240, 240);
    padding: 0;
    list-style: none;

    &__item {
      padding: 0.7rem;
      width: 100%;
      cursor: pointer;

      &:hover {
        background: rgb(246, 252, 249);
      }
    }
  }
}
</style>
