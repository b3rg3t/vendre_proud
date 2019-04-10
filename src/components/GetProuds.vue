<template>
  <div class="prouds">
    <div v-show="prouds" v-for="(proud, key) in prouds" :key="key">
      <Proud
        :owner="proud.owner"
        :message="proud.message"
        :created="proud.created"
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
import { prouds } from '@/main.js'
import Proud from './Proud.vue'
export default {
  name: 'GetProuds',
  data() {
    return {
      prouds: null
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
    }
  },
  beforeMount() {
    this.getProuds()
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
