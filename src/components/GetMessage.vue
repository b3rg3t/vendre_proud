<template>
  <div class="message">
    <div v-for="(message, key) in messages" :key="key">
      <Proud
        :owner="message.owner"
        :message="message.message"
        :created="message.created"
      />
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import { messages } from '@/main.js'
import Proud from './Proud.vue'
export default {
  name: 'messageRecieve',
  data() {
    return {
      messages
    }
  },
  components: {
    Proud
  },
  methods: {
    getMessage() {
      messages.on('value', snapshot => {
        this.messages = snapshot.val()
      })
    }
    //     removeMessage(message) {
    //       messagesRef.child(message['.key']).remove()
    //       toastr.success('Message removed successfully')
    //     }
  },
  beforeMount() {
    this.getMessage()
  }
}
</script>
