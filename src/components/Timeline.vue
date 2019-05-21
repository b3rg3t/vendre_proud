<template>
  <section class="timeline">
    <header class="timeline__header">
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
import { user, group, proud, users } from '@/main.js'
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
      const date = new Date(time)
      return date.toLocaleString()
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
          this.$router.replace('/home')
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
    }
  },

  beforeMount() {
    if (this.$route.query.access_token && this.$route.query.user_id) {
      this.saveToken()
    }
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
