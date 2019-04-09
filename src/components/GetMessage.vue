<template>
  <div class="timeline">
    <div v-show="messages" v-for="(message, key) in messages" :key="key">
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
      messages: false
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
  },
  beforeMount() {
    this.getMessage()
  }
}
</script>

<style lang="scss" scoped>
.timeline {
  padding: 1rem;
}
</style>
