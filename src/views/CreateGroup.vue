<template>
  <div class="create-group">
    <form>
      <input type="text" v-model="name" placeholder="Group name" />
      <button @submit.prevent="createGroup" class="btn">Create group</button>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'
import { users, groups } from '@/main'
export default {
  name: 'Create-Group',
  data: () => {
    return {
      name: ''
    }
  },
  methods: {
    createGroup() {
      const groupObj = {
        name: this.name,
        members: {
          admins: {
            [user.uid]: true
          },
          users: {}
        }
      }
    }
  },
  props: {
    user: Object
  }
}
</script>

<style lang="scss" scoped>
.create-group {
}
</style>
