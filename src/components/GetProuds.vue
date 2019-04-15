<template>
  <div class="prouds">
    <div v-show="prouds" v-for="(proud, key, index) in prouds" :key="key">
      <Proud
        :owner="proud.owner"
        :message="proud.message"
        :created="proud.created"
        :uid="uid"
        :removeProud="removeProud"
        :proudId="Object.keys(prouds)[index]"
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
import { users } from '@/main.js'
import { prouds } from '@/main.js'
import Proud from './Proud.vue'
import { userInfo } from 'os'
export default {
  name: 'GetProuds',
  data() {
    return {
      prouds: null,
      uid: ''
    }
  },
  components: {
    Proud
  },
  methods: {
    getProuds() {
      prouds.on('value', snapshot => {
        this.prouds = snapshot.val()
      })
    },
    getUid() {
      this.uid = firebase.auth().currentUser.uid
    },
    removeProud(proudId) {
      prouds.child(proudId).remove()

      users
        .child(this.uid)
        .child('prouds')
        .child(proudId)
        .remove()
    }
  },
  beforeMount() {
    this.getProuds()
    this.getUid()
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
