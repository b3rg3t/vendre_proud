<template>
  <form class="create-proud" v-on:submit.prevent="addMessage">
    <h3 class="create-proud__title">{{ msg }}</h3>
    <fieldset class="input-container">
      <input
        class="input-container__input"
        type="text"
        id="message"
        v-model="newMessage.message"
        placeholder="New proud message"
      />
    </fieldset>
    <input type="submit" class="btn" value="Add message" />
  </form>
</template>

<script>
import firebase from 'firebase'
import { messages, users } from '@/main.js'
export default {
  name: 'InputField',
  data() {
    return {
      newMessage: {
        message: ''
      }
    }
  },
  props: {
    msg: String
  },
  methods: {
    addMessage: function() {
      const { uid } = firebase.auth().currentUser
      const proud = {
        message: this.newMessage.message,
        owner: uid,
        created: firebase.database.ServerValue.TIMESTAMP
      }
      const messagePush = messages.push(proud)
      this.newMessage.message = ''
      const messageId = messagePush.path.pieces_[1]
      users
        .child(uid)
        .child('messages')
        .update({ [messageId]: true })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.create-proud {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  border: 1px solid grey;

  &__title {
    margin: 0.5rem 0 1rem;
  }
  .input-container {
    padding: 0;
    margin: 0;
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    &__input {
      padding: 10px;
      width: 100%;
      margin-bottom: 1rem;
    }
  }
  .btn {
    margin-bottom: 0.5rem;
  }
}
</style>
