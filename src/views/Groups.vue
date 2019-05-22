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
      <button class="btn" @click="handleOpenJoinGroups()">
        Join group
      </button>

      <router-link to="create-group">
        Create new group
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
@import '~foundation-sites/scss/foundation.scss';
section {
  max-width: rem-calc(430);
  margin-left: auto;
  margin-right: auto;
}

.groups {
  margin-bottom: rem-calc(16);
  border: rem-calc(1) solid lightgray;
  border-radius: (8);
}

.groups-buttons {
  padding: rem-calc(16 0);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  button {
    margin-bottom: 0;
    margin-right: rem-calc(16);
  }
}
</style>
