<template>
  <section class="timeline">
    <header>
      <h2>Timeline</h2>
    </header>
    <GetMessage />
  </section>
</template>

<script>
import GetMessage from './GetMessage.vue'
export default {
  name: 'Timeline',
  data() {
    return {}
  },
  components: {
    GetMessage
  }
}
</script>
