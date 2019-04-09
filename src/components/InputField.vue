<template>
  <form class="hello" v-on:submit.prevent="addMessage">
    <h3>{{ msg }}</h3>
    <label>Write text here:</label>
    <input type="text" v-model="newMessage.message" />
    <input type="submit" class="btn" value="Add message" />
  </form>
</template>

<script>
import firebase from 'firebase'
import { messages, users } from '../main.js'
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
        owner: uid
      }
      const messagePush = messages.push(proud)
      this.newMessage.message = ''
      const messageId = messagePush.path.pieces_[1]
      users
        .child(uid)
        .child('messages')
        .update({ [messageId]: true })
    }
    // removeMessage: function(message) {
    //   messagesRef.child(message['.key']).remove()
    //   toastr.success('Message removed successfully')
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
