<template>
  <div class="proud-popup">
    <button class="proud-popup__open" @click="openPopup()" v-show="!display">
      <i class="far fa-plus-square"></i>
    </button>
    <div class="create-proud" v-show="display">
      <button class="proud-popup__close" @click="closePopup()">
        <i class="fas fa-times"></i>
      </button>
      <form class="create-proud__form" v-on:submit.prevent="addMessage">
        <h3 class="create-proud__form__title">{{ msg }}</h3>
        <fieldset class="input-container">
          <textarea
            class="input-container__textarea"
            type="text"
            id="message"
            v-model="newProud.message"
            placeholder="New proud message"
            v-bind:rows="textareaRows"
          ></textarea>
          <button type="submit" class="btn-outline" value="Add message">
            <i class="fas fa-paper-plane"></i>
          </button>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import { proud, prouds, user, group } from '@/main'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'NewProud',
  data() {
    return {
      newProud: {
        message: ''
      },
      display: false
    }
  },
  props: {
    msg: String
  },
  computed: {
    ...mapGetters({
      user: 'users/getUser'
    }),
    textareaRows() {
      const rows = Math.ceil(this.newProud.message.length / 33)
      return rows === 0 ? 1 : rows
    }
  },
  methods: {
    addMessage: function() {
      const newProud = {
        message: this.newProud.message,
        mentions: null, // Todo: Add a way to mention someone
        owner: this.user.uid,
        created: firebase.database.ServerValue.TIMESTAMP,
        group: this.user.activeGroup
      }
      const proudId = prouds.push(newProud).key
      this.newProud.message = ''

      group(this.user.activeGroup)
        .child('prouds')
        .update({ [proudId]: true })

      user(this.user.uid)
        .child('prouds')
        .update({ [proudId]: true })
    },
    openPopup() {
      this.display = true
    },
    closePopup() {
      this.display = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.proud-popup {
  position: fixed;
  width: 300px;
  bottom: 1rem;
  right: 1rem;
  &__open {
    cursor: pointer;
    border-radius: 50%;
    background: #fff;
    width: 56px;
    height: 56px;
    position: absolute;

    font-size: 1.5rem;

    bottom: 1rem;
    right: 1rem;

    border: 1px solid #2c3e50;
    color: #2c3e50;
    transition: background 200ms;
    &:hover {
      background: #f4f8fd;
    }
  }

  &__close {
    cursor: pointer;
    width: 2.5rem;
    height: 2.5rem;
    position: absolute;
    top: 0;
    right: 0;
    background: none;
    border: none;
  }
}

.create-proud {
  padding: 1rem;
  border: 1px solid lightgray;
  border-radius: 5px;
  &__form {
    &__title {
      margin: 0.5rem 0 1rem;
    }
    .input-container {
      position: relative;
      padding: 0;
      margin: 0;
      border: none;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      &__textarea {
        font-size: 0.9rem;
        width: 100%;
        padding: 0.6875rem 2.5rem 0.6875rem 0.6875rem;
        border: 1px solid lightgray;
        margin-bottom: 1rem;
        border-radius: 5px;
        word-wrap: break-word;
        resize: none;
        position: relative;
      }

      .btn-outline {
        cursor: pointer;
        font-size: 0.9rem;
        position: absolute;
        background: transparent;
        padding: 0.8125rem 0.9375rem;
        border: none;
        right: 0;
        bottom: 0.875rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
