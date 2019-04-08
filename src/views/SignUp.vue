<template>
  <div class="sign-up">
    <p>Let's create a new account !</p>
    <form @submit.prevent="signUp">
      <input type="text" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <button type="submit">Sign Up</button>
    </form>
    <span>
      or go back to
      <router-link to="/login">login</router-link>
    </span>
  </div>
</template>

<script>
import firebase from 'firebase'
import { users } from '../refs.js'

export default {
  name: 'SignUp',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signUp: function() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          auth => {
            this.$router.replace('home')
            users.push(auth.user.email)
          },
          err => {
            throw Error(`Oops. ${err.message}`)
          }
        )
    }
  }
}
</script>

<style scoped>
.sign-up {
  margin-top: 40px;
}
input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}
button {
  margin-top: 10px;
  width: 10%;
  cursor: pointer;
}
span {
  display: block;
  margin-top: 20px;
  font-size: 11px;
}
</style>
