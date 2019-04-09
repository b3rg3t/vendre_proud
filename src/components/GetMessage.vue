<template>
  <div class="message">
    <div v-for="message in messages">
      <h4>{{ message.message }} {{ message.owner }}</h4>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import { messages } from '@/main.js'
export default {
  name: 'messageRecieve',
  data() {
    return {
      messages
    }
  },
  methods: {
    getMessage() {
      messages.on('value', snapshot => {
        this.messages = snapshot.val()
      })
    }
  },
  beforeMount() {
    this.getMessage()
  }
}
</script>
