import firebase from 'firebase'
import { prouds, proud } from '@/main'

// State
const state = {
  prouds: []
}

// Mutations
const mutations = {
  setProuds(state, data) {
    state.prouds = data
  }
}

// Actions
const actions = {
  getProudsFromDb({ commit }) {
    prouds.on('value', snapshot => {
      const data = snapshot.val()
      const dataArray = Object.keys(data).map(key => {
        return { ...data[key], uid: key }
      })

      commit('setProuds', dataArray)
    })
  }
}

// Getters
const getters = {
  getAllProuds: state => state.prouds,
  getProudById: state => uid => state.prouds.find(proud => proud.uid === uid)
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
