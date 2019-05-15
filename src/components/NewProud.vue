<template>
  <form class="create-proud" v-on:submit.prevent="addMessage">
    <h3 class="create-proud__title">{{ msg }}</h3>
    <fieldset class="input-container">
      <input
        class="input-container__input"
        type="text"
        id="message"
        v-model="newProud.message"
        placeholder="New proud message"
      />
    </fieldset>
    <input type="submit" class="btn" value="Add message" />
  </form>
</template>

<script>
import firebase from 'firebase'
import { proud, prouds, user, group } from '@/main'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'NewProud',
  data() {
    return {
      newProud: {
        message: ''
      }
    }
  },
  props: {
    msg: String
  },
  computed: {
    ...mapGetters({
      user: 'users/getUser'
    })
  },
  methods: {
    addMessage: function() {
      const newProud = {
        message: this.newProud.message,
        mentions: null, // Todo: Add a way to mention someone
        owner: this.user.uid,
        created: firebase.database.ServerValue.TIMESTAMP,
        group: this.user.activeGroup
      }
      const proudId = prouds.push(newProud).key
      this.newProud.message = ''

      group(this.user.activeGroup)
        .child('prouds')
        .update({ [proudId]: true })

      user(this.user.uid)
        .child('prouds')
        .update({ [proudId]: true })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '~foundation-sites/scss/foundation.scss';
.create-proud {
  padding: rem-calc(16);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: rem-calc(11);
  border: rem-calc(2) solid grey;

  &__title {
    margin: rem-calc(8 0 16 0);
  }
  .input-container {
    padding: 0;
    margin: 0;
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    &__input {
      padding: rem-calc(10 10 10 10);
      width: 100%;
      margin-bottom: rem-calc(16);
      border: rem-calc(2) solid grey;
      border-radius: rem-calc(11);
    }
  }
  .btn {
    margin-bottom: rem-calc(8);
    border-radius: rem-calc(11);
  }
}
</style>
