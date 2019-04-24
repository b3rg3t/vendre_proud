<template>
  <section>
    <h2>Groups</h2>

    <div class="groups">
      <h3>Avaliable groups</h3>

      <ShowGroups :uid="userId" v-show="groups" :groups="groups" />

      <p v-show="message">
        No groups exsists, please create a new group

        <router-link to="create-group">here</router-link>
      </p>
    </div>

    <div class="groups-buttons">
      <button class="btn" @click="handleOpenJoinGroups()">
        Join group
      </button>

      <router-link v-show="groups" to="create-group">
        Create new group
      </router-link>
    </div>
  </section>
</template>

<script>
import firebase from 'firebase'
import { groups } from '@/main'
import ShowGroups from '@/components/ShowGroups'

export default {
  name: 'Groups',
  data: () => {
    return {
      groups: false,
      message: false,
      userId: ''
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
    },
    getUserId() {
      this.userId = firebase.auth().currentUser.uid
    },
    handleOpenJoinGroups() {}
  },
  components: {
    ShowGroups
  },
  beforeMount() {
    this.getGroups()
    this.getUserId()
  }
}
</script>

<style lang="scss" scoped>
section {
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.groups {
  margin-bottom: 1rem;
  border: 1px solid lightgray;
  border-radius: 8px;
}

.groups-buttons {
  padding: 1rem 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  button {
    margin-bottom: 0;
    margin-right: 1rem;
  }
}
</style>
