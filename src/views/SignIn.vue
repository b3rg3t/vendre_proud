<template>
  <div class="form-wrapper sign-in">
    <h1>
      <i class="fab fa-slack-hash btn-getprouds-icon"></i>
      PROUD
    </h1>
    <p class="text-center">Please login to your Proud account</p>
    <form class="form" @submit.prevent="login()">
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

    <error-message
      v-show="error.display"
      @close-error="error = { message: '', display: false }"
      :title="error.title"
      :message="error.message"
    />

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
import ErrorMessage from '@/components/ErrorMessage'
import { users } from '@/main'

export default {
  name: 'signin',
  data() {
    return {
      email: '',
      password: '',
      error: {
        title: 'Problem with sign in',
        message: '',
        display: false
      }
    }
  },
  components: {
    'error-message': ErrorMessage
  },
  methods: {
    login() {
      const credentials = {
        email: this.email,
        password: this.password
      }
      this.$store
        .dispatch('users/signInUser', credentials)
        .then(auth => {
          this.$router.replace('home')
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

<style lang="scss">
@import '~foundation-sites/scss/foundation.scss';
.form-wrapper {
  width: rem-calc(400);
  margin: 10vh auto;
  padding: rem-calc(48 32);
  border: rem-calc(1) solid lightgray;
  border-radius: rem-calc(8);
}
.btn-getprouds-icon {
  color: seagreen;
}
.form {
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
    font-size: rem-calc(16);
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
</style>
