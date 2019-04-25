<template>
  <div class="prouds">
    <div v-show="prouds" v-for="(proud, index) in prouds" :key="index">
      <Proud
        :owner="proud.owner"
        :message="proud.message"
        :created="proud.created"
        :uid="uid"
        :removeProud="removeProud"
        :proudId="proud.id"
      />
    </div>
    <div v-show="!prouds" class="no-prouds callout secondary">
      <h5>No prouds to show</h5>
      <p>
        Your group have not posted any prouds. Be the first one to be #proud
      </p>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import {
  users,
  user,
  proud,
  prouds,
  group,
  filterProudsByGroupId
} from '@/main.js'
import Proud from './Proud.vue'

export default {
  name: 'GetProuds',
  data() {
    return {
      prouds: [],
      uid: '',
      groupId: null
    }
  },
  components: {
    Proud
  },
  methods: {
    readProuds() {},

    getProuds(groupId) {
      group(groupId)
        .child('prouds')
        .on('value', snap => {
          const prouds = Object.keys(snap.key)
        })
    },
    getUid() {
      this.uid = firebase.auth().currentUser.uid
    },
    getGroupId() {
      return user(this.uid).once('value', snapshot => {
        const { activeGroup } = snapshot.val()
        if (activeGroup) {
          this.groupId = activeGroup
        } else {
          return false
        }
      })
    },
    removeProud(proudId) {
      proud(proudId).remove()

      user(this.uid)
        .child('prouds')
        .child(proudId)
        .remove()

      group(this.groupId)
        .child('prouds')
        .child(proudId)
        .remove()
    }
  },
  beforeMount() {
    this.getUid()
    this.getGroupId().then(res => {
      if (res) {
        this.getProuds(this.groupId)
      } else {
        throw Error(`User has no active group.`)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.prouds {
  padding: 1rem;
  .no-prouds {
    color: hsl(54, 100%, 10%);
    padding: 1rem;
    background: rgb(255, 249, 198);
    border-radius: 8px;
  }
}
</style>
