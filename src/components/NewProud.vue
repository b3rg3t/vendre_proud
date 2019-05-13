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
import { proud, prouds, user, group, slack, users } from '@/main'
import { mapState, mapGetters } from 'vuex'

Vue.use(VueAxios, axios)
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

export default {
  name: 'NewProud',
  post: 'postData',

  data() {
    return {
      newProud: {
        message: ''
      },
      slack_data: null
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
        created: firebase.database.ServerValue.TIMESTAMP
      }
      const proudId = prouds.push(newProud).key
      this.newProud.message = ''
      if (this.user.activeGroup) {
        newProud.group = this.user.activeGroup
        group(this.user.activeGroup)
          .child('prouds')
          .update({ [proudId]: true })
      }
      user(this.user.uid)
        .child('prouds')
        .update({ [proudId]: true })
      this.sendToSlack(newProud)
    },
    sendToSlack: function(proud) {
      if (!this.slack_data) {
        users.child(this.user.uid).once('value', snapshot => {
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
      } else {
        console.log('No slack access')
      }
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
