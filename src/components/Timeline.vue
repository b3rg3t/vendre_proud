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
              class="button alert proud__content__btn"
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
@import '~foundation-sites/scss/foundation.scss';
.timeline__body {
  padding: 1rem;
  .no-prouds {
    color: hsl(54, 100%, 10%);
    padding: rem-calc(16) 1rem;
    background: rgb(255, 249, 198);
    border-radius: rem-calc(8);
  }
}
.proud {
  padding: rem-calc(16);
  border: rem-calc(1) solid seagreen;

  border-radius: rem-calc(8);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  max-height: rem-calc(400);
  margin-bottom: rem-calc(16);

  &__profile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: rem-calc(16);
    &__img {
      height: rem-calc(80);
      border-radius: 50%;
      border: rem-calc(1) lightgrey solid;
    }
  }

  &__content {
    padding: rem-calc(4);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    * {
      margin: 0;
    }
    &__message {
      margin-bottom: rem-calc(5);
    }
    &__owner {
      margin-bottom: rem-calc(3.5);
    }

    &__date {
      font-size: rem-calc(11.3);
    }
    &__btn {
      border-radius: rem-calc(25 10 25 0);
      margin: rem-calc(18 0 0 0);
    }
  }
}
</style>
