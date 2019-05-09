<template>
  <div class="page-wrapper">
    <div class="card">
      <i class="icon-large fas fa-paper-plane"></i>
      <h2>Invite to {{ group.name }}</h2>
      <div class="input">
        <form class="form" @submit.prevent="handleSubmit()">
          <input
            class="form__input--text"
            type="email"
            v-model="input"
            placeholder="Invite person"
          />
        </form>
      </div>

      <div class="invites" v-if="invites.length > 0">
        <div
          class="invited"
          v-for="(email, index) in invites"
          v-bind:key="index"
        >
          <p class="invited__email">{{ email }}</p>
          <div class="invited__controls">
            <i class="fas fa-times" @click="removeInvite(email)" />
          </div>
        </div>
      </div>

      <button
        v-if="invites.length > 0"
        class="btn--outline btn"
        @click.prevent="handleSendInvites()"
      >
        <i class="fas fa-paper-plane" />
        Send invites
      </button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import { user, group, groups } from '@/main'
import { mapGetters } from 'vuex'
export default {
  name: 'Invite',
  data: () => {
    return {
      input: '',
      invites: []
    }
  },
  computed: {
    ...mapGetters({
      user: 'users/getUser',
      activeGroup: 'users/getActiveGroup'
    }),
    group() {
      return this.$store.getters['groups/getGroupById'](activeGroup)
    }
  },
  methods: {
    handleSendInvites() {
      // Todo: Invite all email adresses from array
    },
    handleSubmit() {
      this.input = this.input.toLowerCase()
      if (this.invites.includes(this.input)) {
        return
      } else {
        this.invites.push(this.input)
      }
      this.input = ''
    },
    removeInvite(email) {
      const index = this.invites.indexOf(email)
      if (index != -1) {
        this.invites.splice(index, 1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  max-width: 600px;
  margin: 0 auto;
}

.invites {
  background: rgb(248, 248, 248);
  border: 1px solid lightgray;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 1rem;
}

.icon-large {
  font-size: 300%;
}

.invited {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid lightgrey;

  &:last-of-type {
    border-bottom: none;
  }

  &__email {
    padding: 0;
    margin: 0;
  }

  &__controls {
    cursor: pointer;
    padding: 0 0.3rem;
    i {
      color: rgb(61, 35, 35);
    }
  }
}
</style>
