import firebase from 'firebase'
import { user } from '@/main'

const state = {
  user: ''
}
const mutations = {
  setUser(state, data) {
    state.user = data
  }
}
const actions = {
  getUserFromDb({ commit }) {
    const { uid } = firebase.auth().currentUser

    user(uid).on('value', snapshot => {
      const data = snapshot.val()

      commit('setUser', {
        ...data,
        uid
      })
    })
  }
}

const getters = {
  // user getters
  getUser: state => state.user
  // getAllUsers: state => state.users,
  // getUserById: state => uid => state.users.find(user => user.uid === uid),
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
