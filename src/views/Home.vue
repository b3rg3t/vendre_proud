<template>
  <div class="home">
    <div class="nav">
      <div class="logo">
        <h2>#PROUD</h2>
      </div>
      <nav>
        <div class="btn1">
          <button class="dropdown button">Groups</button>
          <button class="button primary">Profile</button>
          <button class="button alert" @click="logout">Logout</button>
        </div>
      </nav>
    </div>
    <div class="main">
      <div class="timeline">
        <header>
          <h2>Timeline</h2>
          <GetMessage />
        </header>
      </div>
      <div class="feedback">
        <article>
          <h4>FeedBack</h4>
          <div class="input">
            <InputField msg="Write a new mention" />
          </div>
        </article>
      </div>
    </div>
    <footer>
      <div class="bottom">
        <div class="left">
          <span>Copywright PROUD</span>
        </div>
        <div class="right">
          <button @click="showTimeline">New</button>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import firebase, { functions } from 'firebase'

// @ is an alias to /src
import InputField from '@/components/InputField.vue'
import GetMessage from '@/components/GetMessage.vue'
export default {
  name: 'home',
  components: {
    InputField,
    GetMessage
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace('login')
        })
    },
    showTimeline: function() {
      // document.querySelector('.hello').innerHTML = '<input type=text/>'
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100vh;
}
.nav {
  display: flex;
  padding: 10px 10px 0 0;
  button {
    margin-left: 5px;
  }
}
.logo {
  flex: 1;
  margin-left: 30px;
  h2 {
    margin: 0;
  }
}
.btn1 {
  flex: 1;
}
.main {
  display: flex;
  text-align: center;
  .timeline {
    flex: 1 1 300px;
  }
  .feedback {
    flex: 1 1 300px;
  }
}
.input {
  margin-top: 500px;
}
footer {
  position: absolute;
  bottom: 10px;
  display: flex;
  width: 100%;
  .bottom {
    width: 100%;
    display: flex;
    .left {
      flex: 1 1 auto;
      text-align: center;
    }
    .right {
      flex: 1 1 auto;
      text-align: center;
    }
  }
}
</style>
