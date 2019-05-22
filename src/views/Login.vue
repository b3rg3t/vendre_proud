<template>
  <div class="login">
    <h1>#PROUD</h1>
    <p class="text-center">Please login to your Proud account</p>
    <form class="login__form" @submit.prevent="login">
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
      <button class="login__form__button btn" type="submit">
        Login
      </button>
    </form>

    <p class="login__signup">
      Don't have an account ? You can
      <router-link class="login__signup__link" to="/sign-up">
        create one
      </router-link>
    </p>

    <div class="login__social">
      <p>
        or
      </p>
      <!-- <button @click="googleLogin" class="social-button">
        <img src="../assets/google-logo.png" alt="Google Logo" />
      </button>
      <button @click="facebookLogin" class="social-button">
        <img src="../assets/facebook-logo.png" alt="Facebook Logo" />
      </button> -->
      <a
        href="https://slack.com/oauth/authorize?scope=identity.basic,identity.email,identity.team,identity.avatar&client_id=230513850368.604545361031"
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
@import '~foundation-sites/scss/foundation.scss';
.login {
  width: rem-calc(400);
  margin: 10vh auto;
  padding: rem-calc(48 32);
  border: 1px solid lightgray;
  border-radius: rem-calc(8);
  .login__form {
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__input {
      margin: rem-calc(10 0);
      width: 100%;
      padding: rem-calc(15);
      border: rem-calc(1) solid lightgrey;
      background: none;
      border-radius: rem-calc(5);
    }
    &__button {
      margin-top: rem-calc(20);
      width: 100%;
      cursor: pointer;
    }
    &__signup {
      margin-top: rem-calc(40);
      font-size: rem-calc(12);
      &__link {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
  .social-button {
    width: rem-calc(48);
    height: rem-calc(48);
    background: white;
    padding: rem-calc(12);
    border-radius: 50%;
    border: none;
    outline: 0;
    margin-right: rem-calc(16);

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
