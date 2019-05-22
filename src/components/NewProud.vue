<template>
  <div>
    <form
      v-if="user && user.slack_data"
      class="create-proud"
      v-on:submit.prevent="addMessage"
    >
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

    <a
      v-else
      href="https://slack.com/oauth/authorize?scope=chat:write:user&client_id=230513850368.604545361031"
    >
      <img
        alt="Sign in with Slack"
        height="40"
        width="172"
        src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
        srcset="
          https://platform.slack-edge.com/img/sign_in_with_slack.png    1x,
          https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x
        "
      />
    </a>
  </div>
</template>

<script>
import firebase from 'firebase'
import { proud, prouds, user, group, slack, users } from '@/main'
import { mapState, mapGetters } from 'vuex'
import { GET_KEY } from '@/helpers'

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
        console.log('This ran')
        console.log(this.user.activeGroup, proudId)

        group(this.user.activeGroup)
          .child('prouds')
          .update({ [proudId]: true })

        proud(proudId).update({ group: this.user.activeGroup })
      }
      user(this.user.uid)
        .child('prouds')
        .update({ [proudId]: true })

      this.sendToSlack(newProud)
    },

    sendToSlack: async function(proud) {
      if (!this.slack_data) {
        await users.child(this.user.uid).once('value', snapshot => {
          const temp = snapshot.val()
          if (GET_KEY(['slack_data', 'access_token'], temp)) {
            this.slack_data = {
              access_token: temp.slack_data.access_token,
              user_id: temp.slack_data.user_id
            }
          }
        })

        if (this.user.slack_data) {
          var url = 'https://evening-temple-56525.herokuapp.com/sendMessage'

          var postData = {
            channel: 'proud',
            text: proud.message,
            token: this.user.slack_data.access_token,
            userId: this.user.slack_data.user_id
          }

          await axios.post(url, postData).then(function(response) {
            console.log(response.data)
          })
        } else {
          console.log('User has no slack data')
        }
      } else {
        console.log('No slack access')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '~foundation-sites/scss/foundation.scss';
@include foundation-button;
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
