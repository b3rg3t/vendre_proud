<template>
  <section class="timeline">
    <header class="timeline__header">
      <h2 class="timeline__header__title">Timeline</h2>
    </header>

    <div class="timeline__body">
      <div class="prouds" v-if="prouds.length >= 1">
        <div class="proud" v-for="(proud, index) in prouds" :key="index">
          <div class="proud__profile">
            <img src="../assets/logo.png" class="proud__profile__img" />
          </div>
          <div class="proud__content">
            <h4 class="proud__content__message">{{ proud.message }}</h4>
            <p class="proud__content__owner">
              {{ getProudOwner(proud.owner) }}
            </p>
            <p class="proud__content__date">{{ convertTime(proud.created) }}</p>
            <button
              v-show="user.uid === proud.owner"
              @click="removeProud(proud.uid)"
              class="alert button"
            >
              X
            </button>
          </div>
        </div>
      </div>
      <div v-else class="no-prouds callout secondary">
        <h5>No prouds to show</h5>
        <p>
          Your group have not posted any prouds. Be the first one to be #proud
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import firebase from 'firebase'
import { user, group, proud } from '@/main.js'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Timeline',
  data() {
    return {}
  },

  computed: {
    ...mapGetters({
      prouds: 'prouds/getProudsByGroup',
      user: 'users/getUser'
    }),
    group() {
      return this.$store.getters['groups/getGroupById'](user.activeGroup)
    }
  },
  methods: {
    getProudOwner(uid) {
      let displayName
      user(uid).once('value', snapshot => {
        displayName = snapshot.val().displayName
      })
      return displayName
    },
    convertTime(time) {
      const date = new Date(time)
      return date.toLocaleString()
    },
    removeProud(proudID) {
      this.$store.dispatch('prouds/removeProud', proudID)
    }
  }
}
</script>

<style lang="scss" scoped>
.timeline__body {
  padding: 1rem;
  .no-prouds {
    color: hsl(54, 100%, 10%);
    padding: 1rem;
    background: rgb(255, 249, 198);
    border-radius: 8px;
  }
}
.proud {
  padding: 1rem;
  border: 1px solid seagreen;

  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  max-height: 400px;
  margin-bottom: 1rem;

  &__profile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;
    &__img {
      height: 80px;
      border-radius: 50%;
      border: 1px lightgrey solid;
    }
  }

  &__content {
    padding: 0.25rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    * {
      margin: 0;
    }
    &__message {
      margin-bottom: 0.35rem;
    }
    &__owner {
      margin-bottom: 0.2rem;
    }

    &__date {
      font-size: 0.75em;
    }
  }
}
</style>
