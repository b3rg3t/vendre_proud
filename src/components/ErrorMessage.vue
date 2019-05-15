<template>
  <div class="error">
    <div class="error__content">
      <h3 class="error__content__title">{{ title || placeholder.title }}</h3>
      <p class="error__content__message">
        {{ message || placeholder.message }}
      </p>
    </div>
    <i class="close-btn fas fa-times" @click="$emit('close-error')"></i>
  </div>
</template>

<script>
export default {
  name: 'error',
  data() {
    return {
      placeholder: { title: 'Error', message: 'Dummy message' }
    }
  },
  props: ['message', 'title']
}
</script>

<style lang="scss" scoped>
.error {
  position: relative;
  max-width: 100%;
  padding: rem-calc(24);
  background: #fff9c6;
  border-radius: rem-calc(5);

  color: #050504;
  &__content {
    &__title {
      font-size: rem-calc(16);
      margin: 0 0 rem-calc(8);
    }
    &__message {
      font-size: rem-calc(6);
      margin: 0;
      padding: 0;
    }
  }
}

.close-btn {
  color: #161612;
  position: absolute;
  top: rem-calc(16);
  right: rem-calc(16);
  padding: rem-calc(8);
  cursor: pointer;
}
</style>
