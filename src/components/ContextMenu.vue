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
@import '~foundation-sites/scss/foundation.scss';
.context-menu {
  position: absolute;
  padding: rem-calc(8);
  top: rem-calc(4);
  right: rem-calc(4);
  background: none;
  border: none;
  color: rgb(97, 97, 97);
  cursor: pointer;

  .context-menu__list {
    z-index: 9999;
    min-width: rem-calc(130);
    position: absolute;
    right: 0;
    top: rem-calc(16);

    background: #fff;
    box-shadow: rem-calc(0 3 6) rgba(0, 0, 0, 0.1);
    border-radius: rem-calc(5);
    border: rem-calc(1) solid rgb(240, 240, 240);
    padding: 0;
    list-style: none;

    &__item {
      padding: rem-calc(10);
      width: 100%;
      cursor: pointer;

      &:hover {
        background: rgb(246, 252, 249);
      }
    }
  }
}
</style>
