<template>
  <div class="page-wrapper">
    <div class="card">
      <i class="icon-large fas fa-paper-plane"></i>
      <h2 v-if="group">Invite to {{ group.name }}</h2>
      <h2 v-else>No group selected</h2>
      <div class="input">
        <form class="form" @submit.prevent="handleSubmit()">
          <input
            class="form__input--text"
            type="email"
            v-model="input"
            placeholder="Input email"
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
import { GET_KEY } from '@/helpers'
export default {
  name: 'Invite',
  data: () => {
    return {
      input: '',
      invites: [],
      message: ''
    }
  },
  computed: {
    ...mapGetters({
      user: 'users/getUser',
      activeGroup: 'users/getActiveGroup'
    }),
    group() {
      if (this.activeGroup) {
        return this.$store.getters['groups/getGroupById'](this.activeGroup)
      }
    }
  },
  methods: {
    handleSendInvites() {
      // Todo: Invite all email adresses from array
      this.invites.forEach(invite => {
        group(this.group.uid)
          .child(`members/invites`)
          .push(invite)
      })

      console.log('Added all invites')
    },
    handleSubmit() {
      const input = this.input.toLowerCase()

      const isUser = GET_KEY(['members', 'users', input], this.group)
      const isAdmin = GET_KEY(['members', 'admins', input], this.group)

      if (this.invites.includes(input)) {
        this.message = `Dude, ${input} is allready in your list.`
      } else if (isAdmin || isUser) {
        this.message = `${input} is already a user or admin. Try again dude.`
      } else {
        this.invites.push(input)
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
@import '~foundation-sites/scss/foundation.scss';
.card {
  max-width: rem-calc(600);
  margin: 0 auto;
}

.invites {
  background: rgb(248, 248, 248);
  border: rem-calc(1) solid lightgray;
  border-radius: rem-calc(5);
  width: 100%;
  margin-bottom: rem-calc(16);
}

.icon-large {
  font-size: 300%;
}

.invited {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: rem-calc(16);
  border-bottom: rem-calc(1) solid lightgrey;

  &:last-of-type {
    border-bottom: none;
  }

  &__email {
    padding: 0;
    margin: 0;
  }

  &__controls {
    cursor: pointer;
    padding: rem-calc(0 3);
    i {
      color: rgb(61, 35, 35);
    }
  }
}
</style>
