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
import { prouds, users, slack } from '@/main.js'

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

export default {
  name: 'CreateProud',
  post: 'postData',

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
  methods: {
    addMessage: function() {
      const { uid } = firebase.auth().currentUser
      const proud = {
        message: this.newProud.message,
        mentions: false,
        owner: uid,
        created: firebase.database.ServerValue.TIMESTAMP
      }
      const proudPush = prouds.push(proud)
      this.newProud.message = ''
      const proudId = proudPush.path.pieces_[1]
      users
        .child(uid)
        .child('prouds')
        .update({ [proudId]: true })
      this.sendToSlack(proud)
    },
    sendToSlack: function(proud) {
      users.child(firebase.auth().currentUser.uid).once('value', snapshot => {
        const temp = snapshot.val()
        this.slack_data = {
          access_token: temp.slack_data.access_token,
          user_id: temp.slack_data.user_id
        }
      })
      var url = 'http://localhost:4390/sendMessage'

      var postData = {
        channel: 'proud',
        text: proud.message,
        token: this.slack_data.access_token,
        userId: this.slack_data.user_id
      }

      axios.post(url, postData).then(function(response) {
        console.log(response.data)
      })
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
