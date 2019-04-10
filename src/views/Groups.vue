<template>
<<<<<<< HEAD
  <section>
    <h2>Groups</h2>
    <div class="groups">
      <h3>Avaliable groups</h3>
      <SelectGroup :uid="userId" v-show="groups" :groups="groups" />
      <p v-show="message">
        No groups exsists, please create a new group
        <router-link to="create-group">here</router-link>
      </p>
    </div>
    <router-link v-show="groups" to="create-group">
      Create new group
    </router-link>
  </section>
=======
  <div class="groups">
    <h3>Add your first group</h3>
    <SelectGroup v-show="groups" :groups="groups" />
    <p v-show="message">
      No groups exsists, please create a new group
      <router-link to="create-group">here</router-link>
    </p>
  </div>
>>>>>>> master
</template>

<script>
import firebase from 'firebase'
import { groups } from '@/main.js'
import SelectGroup from '@/components/SelectGroup.vue'
export default {
  name: 'Groups',
  data: () => {
    return {
      groups: false,
<<<<<<< HEAD
      message: false,
      userId: ''
=======
      message: false
>>>>>>> master
    }
  },
  methods: {
    getGroups() {
      groups.on('value', snapshot => {
        const groups = snapshot.val()
        if (groups) {
<<<<<<< HEAD
          var newGroups
          Object.keys(groups).forEach(groupID => {
            newGroups = {
              ...newGroups,
              [groupID]: {
                ...groups[groupID],
                groupID: groupID
              }
            }
          })
          this.groups = newGroups
=======
          this.groups = groups
>>>>>>> master
          this.message = false
        } else {
          this.message = true
        }
      })
<<<<<<< HEAD
    },
    getUserId() {
      this.userId = firebase.auth().currentUser.uid
=======
>>>>>>> master
    }
  },
  components: {
    SelectGroup
<<<<<<< HEAD
  },
  beforeMount() {
    this.getGroups()
    this.getUserId()
=======
>>>>>>> master
  }
}
</script>

<style lang="scss" scoped>
.groups {
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
<<<<<<< HEAD
  margin-bottom: 1rem;
=======
>>>>>>> master

  border: 1px solid lightgray;
  border-radius: 8px;
}
</style>
