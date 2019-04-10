<template>
  <div>
    <section
      class="choose-group"
      v-for="(group, index) in groups"
      v-bind:key="index"
    >
<<<<<<< HEAD
      <Group :uid="uid" :group="group" />
=======
      <Group :name="group.name" :memberCount="group.members.length" />
>>>>>>> master
    </section>
  </div>
</template>

<script>
<<<<<<< HEAD
import Group from '@/components/Group'
export default {
  name: 'SelectGroups',
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
=======
export default {
  name: 'SelectGroups',
  data: () => {
    return {}
  },
  methods: {},
  props: {
    groups: [Array, Object]
>>>>>>> master
  }
}
</script>
