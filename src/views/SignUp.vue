<template>
  <div class="login">
    <h1>#PROUD</h1>
    <p>Let's create a new account !</p>
    <form class="login__form" @submit.prevent="signUp">
      <input
        class="login__form__input"
        type="text"
        v-model="displayName"
        placeholder="Display Name"
      />
      <input
        class="login__form__input"
        type="text"
        v-model="email"
        placeholder="Email"
      />
      <input
        class="login__form__input"
        type="password"
        v-model="password"
        placeholder="Password"
      />
      <button class="login__form__button btn" type="submit">Sign Up</button>
    </form>
    <div class="login__social">
      <p>
        or sign in with
      </p>
      <button @click="googleLogin" class="social-button">
        <img src="../assets/google-logo.png" alt="Google Logo" />
      </button>
      <button @click="facebookLogin" class="social-button">
        <img src="../assets/facebook-logo.png" alt="Facebook Logo" />
      </button>
    </div>
    <div class="login__back-btn">
      <router-link to="/login">
        <i class="fas fa-angle-left"></i>
        <span>Login</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import { users } from '../main.js'

export default {
  name: 'SignUp',
  data() {
    return {
      displayName: '',
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
            const displayName = this.displayName
            const {
              user: { email, uid }
            } = auth

            const userObj = {
              displayName,
              email,
              uid,
              groups: false,
              prouds: false,
              mentions: false
            }

            users.child(uid).set(userObj)
            this.$router.replace('groups')
          },
          err => {
            throw Error(`Oops. ${err.message}`)
          }
        )
    },
    facebookLogin() {
      const provider = new firebase.auth.FacebookAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(auth => {
          const {
            additionalUserInfo: { isNewUser },
            user: { email, displayName, uid }
          } = auth
          if (isNewUser) {
            const userObj = {
              displayName,
              email,
              uid,
              groups: false,
              mentions: false,
              prouds: false
            }
            users.child(uid).set(userObj)
          }
          this.$router.replace('home')
        })
        .catch(err => {
          throw Error(`Oops. ${err.message}`)
        })
    },
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(auth => {
          const {
            additionalUserInfo: { isNewUser },
            user: { email, displayName, uid }
          } = auth
          if (isNewUser) {
            const userObj = {
              displayName,
              email,
              uid,
              groups: false,
              mentions: false,
              prouds: false
            }
            users.child(uid).set(userObj)
          }
          this.$router.replace('home')
        })
        .catch(err => {
          throw Error(`Oops. ${err.message}`)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  &__back-btn {
    position: absolute;
    bottom: 1.5rem;
    left: 1.5rem;

    i {
      margin-right: 0.5rem;
    }

    a {
      text-decoration: none;
    }
  }
}
</style>
