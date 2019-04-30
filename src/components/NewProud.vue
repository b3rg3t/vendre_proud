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
      console.log('========' + firebase.auth().currentUser.uid)
      users.child(firebase.auth().currentUser.uid).once('value', snapshot => {
        const temp = snapshot.val()
        this.slack_data = {
          access_token: temp.slack_data.access_token,
          user_id: temp.slack_data.user_id
        }
      })
      console.log(this.slack_data)
      var postData = {
        channel: 'proud',
        text: proud.message
      }

      let axiosConfig = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer ' + this.slack_data.access_token,
          'X-Slack-User': this.slack_data.user_id
        }
      }

      axios
        .post('https://slack.com/api/chat.postMessage', postData, axiosConfig)
        .then(res => {
          console.log('RESPONSE RECEIVED: ', res)
        })
        .catch(err => {
          console.log('AXIOS ERROR: ', err)
        })
        .then(response => {
          dispatch({ type: FOUND_USER, data: response.data[0] })
        })
        .catch(error => {
          dispatch({ type: ERROR_FINDING_USER })
        })
    }
    // sendToSlack: function(proud) {
    //   const url =
    //     'https://hooks.slack.com/services/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'
    //   const data = {
    //     text: proud.message
    //   }
    //   axios.post(url, JSON.stringify(data), {
    //     withCredentials: false,
    //     transformRequest: [
    //       (data, headers) => {
    //         delete headers.post['Content-Type']
    //         return data
    //       }
    //     ]
    //   })
    // }
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
