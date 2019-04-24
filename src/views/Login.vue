<template>
  <div class="login">
    <h1>#PROUD</h1>
    <p class="text-center">Please login to your Proud account</p>
    <form class="form" @submit.prevent="login">
      <input
        class="form__input"
        type="text"
        v-model="email"
        placeholder="Email"
      />
      <input
        class="form__input"
        type="password"
        v-model="password"
        placeholder="Password"
      />
      <button class="form__button btn" type="submit">
        Login
      </button>
    </form>

    <p class="signup">
      Don't have an account ? You can
      <router-link class="signup__link" to="/sign-up">
        create one
      </router-link>
    </p>

    <div class="social">
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
  </div>
</template>

<script>
import firebase from 'firebase'
import { users } from '@/main'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$router.replace('home')
        })
        .catch(err => {
          throw Error(`Oops. ${err.message}`)
        })
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

<style lang="scss">
.login {
  width: 400px;
  margin: 10vh auto;
  padding: 3rem 2rem;
  border: 1px solid lightgray;
  border-radius: 8px;
  .form {
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__input {
      margin: 10px 0;
      width: 100%;
      padding: 15px;
      border: 1px solid lightgrey;
      background: none;
      border-radius: 5px;
    }
    &__button {
      margin-top: 20px;
      width: 100%;
      cursor: pointer;
    }
    &__signup {
      margin-top: 40px;
      font-size: 0.75em;
      &__link {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
  .social-button {
    width: 48px;
    height: 48px;
    background: white;
    padding: 0.75rem;
    border-radius: 50%;
    border: none;
    outline: 0;
    margin-right: 1rem;

    &:nth-last-child() {
      margin-right: 0;
    }

    transition: transform 300ms;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }

    img {
      width: 100%;
    }
  }
}
</style>
