<template>
  <div class="create-group">
    <h3>Create a new group</h3>
    <form @submit.prevent="createGroup">
      <input type="text" v-model="name" placeholder="Group name" />
      <button type="submit" class="btn">Create group</button>
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
      const uid = firebase.auth().currentUser.uid
      const groupObj = {
        name: this.name,
        members: {
          admins: {
            [uid]: true
          },
          users: {}
        }
      }
      const groupPush = groups.push(groupObj)
      const groupID = groupPush.path.pieces_[1]
      users
        .child(uid)
        .child('groups')
        .update({ [groupID]: true })

      // reset inputfield
      this.name = ''
      this.$router.replace('groups')
    }
  }
}
</script>

<style lang="scss" scoped>
.create-group {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  form {
    max-width: 400px;
    padding: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    input {
      padding: 0.75rem;
      margin-right: 1rem;
    }
    .btn {
      margin-bottom: 0;
    }
  }
}
</style>
