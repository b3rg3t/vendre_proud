<template>
  <section class="timeline">
    <header class="timeline__header">
      <button @click="getProudsFromSlack">Get prouds</button>
      <!-- <button @click="pushProudsToFirebaseFromSlack">Push to firebase</button> -->
      <h2 class="timeline__header__title" v-if="options.timeline === 'group'">
        <span v-if="activeGroup">{{ activeGroup.name }}</span>
        <span v-else>Loading...</span>
      </h2>
      <h2 class="timeline__header__title" v-if="options.timeline === 'user'">
        Your #PROUD's
      </h2>
    </header>

    <div class="timeline__body">
      <div class="prouds" v-if="prouds.length >= 1">
        <div class="proud" v-for="(proud, index) in prouds" :key="index">
          <div class="proud__profile">
            <img
              v-if="getUserProfilePicture(proud.owner)"
              :src="getUserProfilePicture(proud.owner)"
              class="proud__profile__img"
            />
            <img v-else src="../assets/logo.png" class="proud__profile__img" />
          </div>
          <div class="proud__content">
            <p class="proud__content__owner">
              @{{ getProudOwner(proud.owner) }}
            </p>
            <h4 class="proud__content__message">{{ proud.message }}</h4>
            <p class="proud__content__date">{{ convertTime(proud.created) }}</p>
            <context-menu
              :menuitems="contextMenuItems"
              v-show="
                user.uid === proud.owner ||
                  user.groups[activeGroup.uid] === 'admin'
              "
              :id="proud.uid"
            />
          </div>
        </div>
      </div>
      <div v-else class="no-prouds callout secondary">
        <h5>No prouds to show</h5>
        <p>
          Your group have not posted any prouds. Be the first one to be #proud
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import firebase from 'firebase'
import { user, group, proud, users, prouds } from '@/main.js'
import { mapGetters, mapState } from 'vuex'
import axios from 'axios'
import { GET_KEY } from '@/helpers'
import ContextMenu from './ContextMenu'

export default {
  name: 'Timeline',
  components: {
    'context-menu': ContextMenu
  },
  data() {
    return {
      contextMenuItems: {
        delete: {
          label: 'Delete proud',
          action: this.removeProud
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      user: 'users/getUser',
      activeGroup: 'groups/getActiveGroup'
    }),
    ...mapGetters('groups', {
      groups: 'getAllGroups'
    }),
    ...mapState({
      state: 'users'
    }),
    prouds() {
      if (this.options.timeline === 'user') {
        return this.$store.getters['prouds/getProudsByUser']
      } else if (this.options.timeline === 'group') {
        return this.$store.getters['prouds/getProudsByGroup']
      } else {
        console.log('No timeline options are set.')
      }
    }
  },
  props: ['options'],
  methods: {
    getProudOwner(uid) {
      return this.$store.getters['users/getUserName'](uid)
    },
    getUserProfilePicture(uid) {
      const localUser = this.$store.getters['users/getUserProfilePicture'](uid)
      return localUser
    },
    convertTime(time) {
      const date = new Date(0)
      console.log('time: ' + parseInt(Math.floor(time)))

      if (time.length > 14) {
        date.setUTCMilliseconds(Math.floor(time) * 1000)
      } else {
        date.setUTCMilliseconds(time)
      }
      return date.toLocaleString('sv')
    },
    removeProud(proudID) {
      this.$store.dispatch('prouds/removeProud', proudID)
    },
    saveToken() {
      if (!GET_KEY(['slack_data'], this.user)) {
        const uid = firebase.auth().currentUser.uid
        const access_token = this.$route.query.access_token
        const user_id = this.$route.query.user_id
        if (access_token && user_id) {
          console.log('push to firebase')
          users
            .child(uid)
            .child('slack_data')
            .set({
              user_id,
              access_token
            })
          this.getPicFromSlack(access_token, user_id, uid)
          // this.$router.replace('/home')
        }
      }
    },

    getPicFromSlack(access_token, user_id, uid) {
      const API = 'https://slack.com/api/users.info'
      const query = '?token=' + access_token + '&user=' + user_id
      axios.get(API + query).then(response => {
        const userPic = response.data.user.profile.image_192
        users
          .child(uid)
          .child('slack_data')
          .update({
            userpic: userPic
          })
      })
    },
    getProudsFromSlack() {
      const API = 'https://slack.com/api/groups.history'
      const access_token = '?token=' + this.user.slack_data.access_token
      const channel = '&channel=' + 'GHGLPKJRF'
      const count = '&count' + '=100'
      axios.get(API + access_token + channel + count).then(response => {
        if (response.data.messages) {
          // console.log(response.data.messages)
          var filteredProuds = response.data.messages.filter(
            proud => !proud.hasOwnProperty('subtype')
          )
        } else {
          console.error('there is no messages')
        }
        const usersId = this.state.users.map(user => {
          // console.log(user.displayName + ' : ' + user.slack_data.user_id)
          return user.slack_data ? user.slack_data.user_id : null
        })
        // console.log(usersId)
        // message.text.substr(0, message.text.indexOf(' '))
        let flag, newFilteredProuds
        if (filteredProuds) {
          newFilteredProuds = filteredProuds.filter(message => {
            flag = false
            usersId.forEach(user => {
              if (user === message.user) {
                flag = true
              }
            })
            if (!message.text.includes('PROUD')) {
              flag = false
            }
            return flag
          })
        }
        let firebaseFilteredProuds = newFilteredProuds.map(proud => {
          let newUser = this.state.users.find(
            user => user.slack_data.user_id === proud.user
          )
          // console.log(newUser)
          return {
            created: proud.ts,
            group: newUser.activeGroup,
            message: proud.text,
            owner: newUser.uid,
            slack_user: proud.user
          }
        })
        console.log(firebaseFilteredProuds)
        firebaseFilteredProuds.forEach(proud => {
          const proudKey = prouds.push(proud).key
          group(proud.group).update({ [proudKey]: true })
          user(proud.owner)
            .child('prouds')
            .update({ [proudKey]: true })
        })
      })
    }
  },

  beforeMount() {
    if (this.$route.query.access_token && this.$route.query.user_id) {
      this.saveToken()
    }
  },

  beforeMount() {
    this.saveToken()
  }
}
</script>

<style lang="scss" scoped>
.timeline__body {
  max-width: 600px;
  padding: 1rem;
  .no-prouds {
    color: hsl(54, 100%, 10%);
    padding: 1rem;
    background: rgb(255, 249, 198);
    border-radius: 8px;
  }
}
.proud {
  padding: 0.5rem;
  border: 1px solid rgb(211, 211, 211);

  position: relative;

  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  max-height: 400px;
  margin-bottom: 1rem;

  &__profile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;
    &__img {
      height: 56px;
      border-radius: 50%;
      border: 1px lightgrey solid;
    }
  }

  &__content {
    padding: 0.25rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    * {
      margin: 0;
    }
    &__message {
      margin-bottom: 0.35rem;
    }
    &__owner {
      margin-bottom: 0.2rem;
      font-size: 0.75rem;
    }

    &__date {
      font-size: 0.75em;
    }
  }
}
</style>
