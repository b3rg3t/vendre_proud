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
  padding: 1.5rem;
  background: #fff9c6;
  border-radius: 5px;

  color: #050504;
  &__content {
    &__title {
      font-size: 1em;
      margin: 0 0 0.5rem;
    }
    &__message {
      font-size: 0.85em;
      margin: 0;
      padding: 0;
    }
  }
}

.close-btn {
  color: #161612;
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem;
  cursor: pointer;
}
</style>
