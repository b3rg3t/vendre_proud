<template>
  <div class="home">
    <div class="nav">
      <div class="logo">
        <h2>#PROUD</h2>
      </div>
      <nav class="navigation">
        <ul class="navigation__list">
          <li class="navigation__list__item">
            <button class="dropdown button">Groups</button>
          </li>
          <li class="navigation__list__item">
            <button class="button primary">Profile</button>
          </li>
          <li class="navigation__list__item">
            <button class="button alert" @click="logout">Logout</button>
          </li>
        </ul>
      </nav>
    </div>

    <div class="wrapper">
      <main class="main">
        <Timeline />
      </main>
      <aside class="sidebar">
        <section class="feedback">
          <header>
            <h4>FeedBack</h4>
          </header>
        </section>
        <section class="new-proud">
          <InputField msg="Create new proud" />
        </section>
      </aside>
    </div>

    <footer class="footer">
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
import Timeline from '@/components/Timeline.vue'
export default {
  name: 'home',
  components: {
    InputField,
    Timeline
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
  justify-content: space-between;
  align-items: center;
  padding: 1rem;

  h2 {
    margin: 0;
  }

  .navigation {
    margin: 0;
    &__list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: row;

      &__item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-left: 0.5rem;

        button {
          margin: 0;
        }
      }
    }
  }
}

.wrapper {
  display: grid;
  grid-template-columns: 1fr;

  @media screen and (min-width: 768px) {
    grid-template-columns: 4fr 3fr;
  }
}
.btn1 {
  flex: 1;
}
.main {
}
.input {
  margin-top: 500px;
}
.footer {
  background: #fff;
  position: fixed;
  bottom: 0;
  padding: 1rem;
  display: flex;
  width: 100%;
  box-shadow: 0px 0px 30px rgba(46, 139, 87, 0.16);
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

.sidebar {
  padding: 1rem;
}
</style>
