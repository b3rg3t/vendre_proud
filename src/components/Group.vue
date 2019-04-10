<template>
  <div class="group">
    <h4 class="group__name">{{ name }}</h4>
    <div class="group__members">
      <i class="fas fa-users group__members__icon"></i>
      <span class="group__members__badge badge">{{ memberCount }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Group',
  data() {
    return {
      name: '',
      memberCount: 0
    }
  },
  props: {
    group: Object
  },
  methods: {
    updateState() {
      const { name, members } = this.$props.group
      if (members.users) {
        const users = Object.keys(members.users).length
        const admins = Object.keys(members.admins).length
        const total = users + admins
        this.name = name
        this.memberCount = total
      } else {
        const admins = Object.keys(members.admins).length
        this.name = name
        this.memberCount = admins
      }
    }
  },
  beforeMount() {
    this.updateState()
  }
}
</script>

<style lang="scss" scoped>
.group {
  border-top: 1px solid lightgray;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem 0 1rem;
  &__name {
  }

  &__members {
    display: flex;
    flex-direction: row;
    align-items: center;
    &__icon {
      color: rgb(34, 100, 63);
    }
    &__badge {
      margin-left: 0.75rem;
      background: rgb(34, 100, 63);
    }
  }
}
</style>
