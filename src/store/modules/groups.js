import firebase from 'firebase'
import { group, groups } from '@/main'

// State
const state = {
  groups: []
}
// Mutations
const mutations = {
  setGroups(state, data) {
    state.groups = data
  }
}

const actions = {
  getGroupsFromDb({ commit }) {
    groups.on('value', snapshot => {
      const data = snapshot.val()
      const dataArray = Object.keys(data).map(key => {
        return { ...data[key], uid: key }
      })

      commit('setGroups', dataArray)
    })
  }
}
// Getters
const getters = {
  // group getters
  getAllGroups: state => state.groups,
  getGroupById: state => uid => state.groups.find(group => group.uid === uid),
  getGroupMemberCount: state => uid => {
    const {
      members: { users, admins }
    } = state.groups.find(group => group.id === uid)
    const uCount = Object.keys(users).length
    const aCount = Object.keys(admins).length
    return uCount + aCount
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
