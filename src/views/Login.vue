<template>
  <div class="login">
    <h3>Sign In</h3>
    <form class="login-form" @submit.prevent="login">
      <input type="text" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <button class="btn" type="submit">Connection</button>
    </form>
    <p>
      You don't have an account ? You can
      <router-link to="/sign-up">create one</router-link>
    </p>
    <p>
      or Sign In With Google
      <br />
      <button @click="googleLogin" class="social-button">
        <img src="../assets/google-logo.png" alt="Google Logo" />
      </button>
    </p>
    <p>
      <button @click="facebookLogin" class="social-button">
        <img src="../assets/facebook-logo.png" alt="Facebook Logo" />
      </button>
    </p>
  </div>
</template>

<script>
import firebase from 'firebase'

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
          alert('Oops. ' + err.message)
        })
    },
    facebookLogin() {
      const provider = new firebase.auth.FacebookAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          this.$router.replace('home')
        })
        .catch(err => {
          alert('Oops. ' + err.message)
        })
    },
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          this.$router.replace('home')
        })
        .catch(err => {
          alert('Oops. ' + err.message)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
/* "scoped" attribute limit the CSS to this component only */
.login {
  margin-top: 40px;
}

.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}
button {
  margin-top: 20px;
  width: 10%;
  cursor: pointer;
}
p {
  margin-top: 40px;
  font-size: 13px;
}
p a {
  text-decoration: underline;
  cursor: pointer;
}
.social-button {
  width: 75px;
  background: white;
  padding: 10px;
  border-radius: 100%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  outline: 0;
  border: 0;
}

.social-button:active {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}

.social-button img {
  width: 100%;
}
</style>
