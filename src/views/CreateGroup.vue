<template>
  <div class="create-group">
    <h2>Create a new group</h2>
    <form class="form" @submit.prevent="createGroup">
      <input
        class="form__input--text"
        type="text"
        v-model="name"
        placeholder="Group name"
        required
      />
      <div class="form__section">
        <h4 class="form__section__heading">Settings</h4>
        <div class="form__section--inline">
          <input
            class="form__input--checkbox"
            type="checkbox"
            v-model="privateGroup"
            value="true"
            id="private"
          />
          <label class="form__label--checkbox" for="private">
            Private Group
          </label>
        </div>
      </div>
      <button type="submit" class="btn form__button">Create group</button>
    </form>
    <div class="btn-wrapper">
      <a href="#" @click.prevent="$router.go(-1)" class="back-btn">
        <i class="fas fa-arrow-left" />
        Back
      </a>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import { user, group, groups } from '@/main'
export default {
  name: 'Create-Group',
  data: () => {
    return {
      name: '',
      invite: '',
      invitees: [],
      privateGroup: false
    }
  },
  methods: {
    createGroup() {
      // reset inputfield
      this.$store
        .dispatch('groups/createNewGroup', this.name)
        .then(res => {
          this.name = ''
          this.$router.replace('groups')
        })
        .catch(err => {
          throw Error(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-wrapper {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  font-size: 0.8em;
  .back-btn {
    text-decoration: none;
    i {
      margin-right: 0.3rem;
    }
  }
}
.create-group {
  position: relative;
  margin: 0 auto;
  max-width: 400px;
  border-radius: 8px;
  padding: 1rem 1rem 3rem;
  border: 1px solid lightgray;
}
</style>
