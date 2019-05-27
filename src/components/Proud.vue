<template>
  <div class="proud">
    <div class="proud__profile">
      <img src="../assets/logo.png" class="proud__profile__img" />
    </div>
    <div class="proud__content">
      <h4 class="proud__content__message">{{ msg }}</h4>
      <p class="proud__content__owner">{{ own }}</p>
      <p class="proud__content__date">{{ date }}</p>
      <button
        v-show="uid === owner"
        @click="removeProud(proudId)"
        class="alert button"
      >
        X
      </button>
    </div>
  </div>
</template>

<script>
import { users } from '@/main.js'

export default {
  name: 'Proud',
  data() {
    return {
      date: '',
      msg: '',
      own: ''
    }
  },
  props: {
    message: String,
    owner: String,
    created: Number,
    uid: String,
    removeProud: Function,
    proudId: String
  },
  methods: {
    convertTime() {
      const date = new Date(this.created)
      const readDate = date.toLocaleString()

      users.on('value', snapshot => {
        const displayName = snapshot.val()[this.owner].displayName
        this.own = displayName
      })
      this.date = readDate
      this.msg = this.message
    }
  },
  beforeMount() {
    this.convertTime()
  }
}
</script>

<style lang="scss" scoped>
@import '~foundation-sites/scss/foundation.scss';
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
      margin-bottom: rem-calc(6);
    }
    &__owner {
      margin-bottom: rem-calc(2);
    }

    &__date {
      font-size: rem-calc(10);
    }
  }
}
</style>
