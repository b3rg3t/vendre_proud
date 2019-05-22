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
          this.$router.replace('invite-members')
        })
        .catch(err => {
          throw Error(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~foundation-sites/scss/foundation.scss';
.btn-wrapper {
  position: absolute;
  bottom: rem-calc(16);
  left: rem-calc(16);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  font-size: rem-calc(13);
  .back-btn {
    text-decoration: none;
    i {
      margin-right: rem-calc(4);
    }
  }
}
.create-group {
  position: relative;
  margin: 0 auto;
  max-width: rem-calc(400);
  border-radius: rem-calc(10);
  padding: rem-calc(13 13 40);
  border: rem-calc(1) solid lightgray;
}
</style>
