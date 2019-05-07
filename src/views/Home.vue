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
      </aside>
    </div>
    <NewProud msg="Create new proud" />
  </div>
</template>

<script>
import firebase, { functions } from 'firebase'

// @ is an alias to /src
import NewProud from '@/components/NewProud.vue'
import Timeline from '@/components/Timeline.vue'
export default {
  name: 'Home',
  components: {
    NewProud,
    Timeline
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
}

.wrapper {
  position: relative;
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
