<template>
  <div>
    <section
      class="choose-group"
      v-for="(group, index) in groups"
      v-bind:key="index"
    >
      <Group :uid="uid" :group="group" />
    </section>
  </div>
</template>

<script>
import Group from '@/components/Group'
export default {
  name: 'ShowGroups',
  data: () => {
    return {
      memberCount: 0
    }
  },
  props: {
    groups: [Array, Object, Boolean],
    uid: String
  },
  components: {
    Group
  }
}
</script>
