<template>
  <div>
    <section
      class="choose-group"
      v-for="(group, index) in groups"
      v-bind:key="index"
    >
      <Group :name="group.name" :memberCount="group.members.length" />
    </section>
  </div>
</template>

<script>
export default {
  name: 'SelectGroups',
  data: () => {
    return {}
  },
  methods: {},
  props: {
    groups: [Array, Object]
  }
}
</script>
