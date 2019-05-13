<template>
  <div class="form-wrapper sign-up">
    <h1>#PROUD</h1>
    <p>Let's create a new account !</p>
    <form class="form" @submit.prevent="signUp">
      <input
        class="form__input"
        type="text"
        v-model="displayName"
        placeholder="Display Name"
      />
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
      <button class="form__button btn" type="submit">Sign Up</button>
    </form>
    <error-message
      v-show="error.display"
      :title="error.title"
      :message="error.message"
      @close-error="error.display = false"
    />
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
    <div class="sign-up__back-btn">
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
import ErrorMessage from '@/components/ErrorMessage'

export default {
  name: 'SignUp',
  data() {
    return {
      displayName: '',
      email: '',
      password: '',
      error: {
        title: 'Problem with sign up',
        message: '',
        display: false
      }
    }
  },
  components: {
    'error-message': ErrorMessage
  },
  methods: {
    signUp: function() {
      this.$store
        .dispatch('users/signUpUser', {
          email: this.email,
          password: this.password,
          displayName: this.displayName
        })
        .then(auth => {
          this.$router.replace('groups')
        })
        .catch(err => {
          this.error.message = err
          this.error.display = true
        })
    },
    facebookLogin() {
      this.$store
        .dispatch('users/signInWithFacebook')
        .then(auth => {
          if (auth) {
            this.$router.replace('home')
          }
        })
        .catch(err => {
          this.error.message = err
          this.error.display = true
        })
    },
    googleLogin() {
      this.$store
        .dispatch('users/signInWithGoogle')
        .then(auth => {
          if (auth) {
            this.$router.replace('home')
          }
        })
        .catch(err => {
          this.error.message = err
          this.error.display = true
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.sign-up {
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
