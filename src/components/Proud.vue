<template>
  <div class="proud">
    <div class="proud__profile">
      <img src="../assets/logo.png" class="proud__profile__img" />
    </div>
    <div class="proud__content">
      <h4 class="proud__content__message">{{ msg }}</h4>
      <p class="proud__content__owner">{{ own }}</p>
      <p class="proud__content__date">{{ date }}</p>
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
    created: Number
  },
  methods: {
    convertTime() {
      const date = new Date(this.created)
      const readDate = date.toLocaleString()

      users.on('value', snapshot => {
        const ownerEmail = snapshot.val()[this.owner].email
        this.own = ownerEmail
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
    text-align: left;
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
