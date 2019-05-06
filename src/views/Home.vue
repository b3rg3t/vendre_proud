<template>
  <div class="home">
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
          <NewProud msg="Create new proud" />
        </section>
      </aside>
    </div>
  </div>
</template>

<script>
import firebase, { functions } from 'firebase'

// @ is an alias to /src
import NewProud from '@/components/NewProud.vue'
import Timeline from '@/components/Timeline.vue'
import Navigation from '@/components/Navigation.vue'
console.log('Hej')

export default {
  name: 'Home',
  components: {
    NewProud,
    Timeline,
    Navigation
  },
  methods: {
    showTimeline: function() {
      // document.querySelector('.hello').innerHTML = '<input type=text/>'
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
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

.sidebar {
  padding: 1rem;
}
</style>
