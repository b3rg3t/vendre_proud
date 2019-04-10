<template>
  <div class="groups">
    <h3>Add your first group</h3>
    <SelectGroup v-show="groups" :groups="groups" />
    <p v-show="message">
      No groups exsists, please create a new group
      <router-link to="create-group">here</router-link>
    </p>
  </div>
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
      message: false
    }
  },
  methods: {
    getGroups() {
      groups.on('value', snapshot => {
        const groups = snapshot.val()
        if (groups) {
          this.groups = groups
          this.message = false
        } else {
          this.message = true
        }
      })
    }
  },
  components: {
    SelectGroup
  },
  beforeMount() {
    this.getGroups()
  }
}
</script>

<style lang="scss" scoped>
.groups {
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;

  border: 1px solid lightgray;
  border-radius: 8px;
}
</style>
