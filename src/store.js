import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import { prouds, user, groups } from '@/main'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user,
    groups: [],
    prouds: []
  },
  mutations: {
    setProuds(state, data) {
      state.prouds = data
    },
    setGroups(state, data) {
      state.groups = data
    },
    setUser(state, data) {
      state.user = data
    }
  },
  actions: {
    getProudsFromDb({ commit }) {
      prouds.on('value', snapshot => {
        const data = snapshot.val()
        const dataArray = Object.keys(data).map(key => {
          return { ...data[key], uid: key }
        })

        commit('setProuds', dataArray)
      })
    },
    getGroupsFromDb({ commit }) {
      groups.on('value', snapshot => {
        const data = snapshot.val()
        const dataArray = Object.keys(data).map(key => {
          return { ...data[key], uid: key }
        })

        commit('setGroups', dataArray)
      })
    },
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
  },
  getters: {
    // user getters
    getUser: state => state.user,
    // getAllUsers: state => state.users,
    // getUserById: state => uid => state.users.find(user => user.uid === uid),

    // proud getters
    getAllProuds: state => state.prouds,
    getProudById: state => uid => state.prouds.find(proud => proud.uid === uid),

    // group getters
    getAllGroups: state => state.groups,
    getGroupById: state => uid => state.groups.find(group => group.uid === uid)
  }
})

export { store }
