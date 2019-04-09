<template>
  <div>
    <h4>{{ msg }}</h4>
    <p>{{ own }}</p>
    <p>{{ date }}</p>
  </div>
</template>

<script>
export default {
  name: 'Proud',
  data() {
    return {
      date: '',
      msg: '',
      own: ''
    }
  },
  props: {
    message: String,
    owner: String,
    created: Number
  },
  methods: {
    convertTime() {
      const date = new Date(this.created)
      const readDate = date.toLocaleString()
      this.date = readDate
      this.own = this.owner
      this.msg = this.message
    }
  },
  beforeMount() {
    this.convertTime()
  }
}
</script>
