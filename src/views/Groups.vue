<template>
  <section>
    <h2>Groups</h2>

    <div class="groups">
      <h3>Avaliable groups</h3>

      <ShowGroups />

      <p v-show="message">
        No groups exsists, please create a new group

        <router-link to="create-group">here</router-link>
      </p>
    </div>

    <div class="groups-buttons">
      <router-link to="create-group">
        Create new group +
      </router-link>
    </div>
  </section>
</template>

<script>
import firebase from 'firebase'
import { groups } from '@/main'
import ShowGroups from '@/components/ShowGroups'
import { mapGetters } from 'vuex'

export default {
  name: 'Groups',
  data: () => {
    return {
      message: false,
      userId: ''
    }
  },

  components: {
    ShowGroups
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
  justify-content: center;
  align-items: center;
  button {
    margin-bottom: 0;
    margin-right: 1rem;
  }
}
</style>
