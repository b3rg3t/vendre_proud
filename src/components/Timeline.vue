<template>
  <section class="timeline">
    <header>
      <h2>Timeline</h2>
    </header>
    <GetProuds />
  </section>
</template>

<script>
import GetProuds from './GetProuds.vue'
export default {
  name: 'Timeline',
  data() {
    return {}
  },
  components: {
    GetProuds
  }
}
</script>
