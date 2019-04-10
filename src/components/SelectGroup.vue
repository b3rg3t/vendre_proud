<template>
  <div>
    <section
      class="choose-group"
      v-for="(group, index) in groups"
      v-bind:key="index"
    >
      <Group :group="group" />
    </section>
  </div>
</template>

<script>
import Group from '@/components/Group'
export default {
  name: 'SelectGroups',
  data: () => {
    return {
      memberCount: 0
    }
  },
  props: {
    groups: [Array, Object, Boolean]
  },
  components: {
    Group
  }
}
</script>
