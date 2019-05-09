import { groups, group, user } from '@/main'
import { GET_KEY } from '@/helpers'

// State
const state = {
  groups: []
}
// Mutations
const mutations = {
  SET_GROUPS(state, data) {
    state.groups = data
  }
}

const actions = {
  startListeningToGroups({ commit }) {
    groups.on('value', snapshot => {
      const data = snapshot.val()
      const dataArray = Object.keys(data).map(key => {
        return { ...data[key], uid: key }
      })

      commit('SET_GROUPS', dataArray)
    })
  },
  stopListeningToGroups({ commit }) {
    groups.off()
  },

  async createNewGroup({ commit, rootState }, name) {
    const uid = rootState.users.user.uid
    const groupObj = {
      name: name,
      members: {
        admins: {
          [uid]: true
        }
      }
    }
    const key = await groups.push(groupObj).key

    user(uid).update({ activeGroup: key })
    user(uid)
      .child('groups')
      .update({ [key]: true })
  },

  joinGroup({ rootState }, gid) {
    const uid = rootState.users.user.uid
    const localGroup = state.groups.find(group => group.uid === gid)
    const admins = GET_KEY(['members', 'admins', uid], localGroup)
    const users = GET_KEY(['members', 'users', uid], localGroup)
    if (!admins && !users) {
      console.log(gid)
      group(gid)
        .child('members/users')
        .update({
          [uid]: true
        })
      user(uid)
        .child('groups')
        .update({ [gid]: true })
    } else {
      throw Error('You are not able to join this group')
    }
  },

  leaveGroup({ commit, rootState }, gid) {
    const uid = rootState.users.user.uid
    const localGroup = state.groups.find(group => group.uid === gid)
    const admins = GET_KEY(['members', 'admins', uid], localGroup)
    const users = GET_KEY(['members', 'users', uid], localGroup)
    if (admins) {
      // if uid is admin
      console.log('auth is admin')
      Object.keys(admins).length > 1
        ? group(gid)
            .child(`members/admins/${uid}`)
            .remove() &&
          user(uid)
            .child(`groups/`)
            .update({ [gid]: null })
        : alert(
            'Dude, you are the only admin in this group. Remove the group or transfer the admin status to another user to leave.'
          )
    } else if (users) {
      // if uid is user

      // Todo: add some kind of confirmation
      console.log('auth is User')
      group(gid)
        .child(`members/users/${uid}`)
        .remove()
      user(uid)
        .child(`groups/`)
        .update({ [gid]: null })
    } else {
      throw 'Error: User not in group'
    }
  },

  deleteGroup({ rootState }, gid) {
    const uid = rootState.users.user.uid
    const localGroup = state.groups.find(group => group.uid === gid)
    const isAdmin = GET_KEY(['members', 'admins', uid], localGroup)
    if (isAdmin) {
      const input = confirm(`Do you really want to delete ${localGroup.name}? `)
      if (input) {
        group(gid).remove()
        // Todo: Remove group from all users that are members
      } else {
        return
      }
    } else {
      alert('You are not admin for this group. Only admins can delete groups.')
    }
  }
}

// Getters
const getters = {
  getAllGroups: state => state.groups,

  getGroupById: state => gid => state.groups.find(group => group.uid === gid),

  getJoinedGroups: state => uid =>
    state.groups.filter(group => {
      const { members } = group
      if (members.hasOwnProperty('users')) {
        return members.users.hasOwnProperty(uid) ||
          members.admins.hasOwnProperty(uid)
          ? group
          : false
      } else {
        return members.admins.hasOwnProperty(uid) ? group : false
      }
    }),

  getAdminStatus: state => (gid, uid) => {
    const localGroup = state.groups.find(group => group.uid === gid)
    return GET_KEY(['members', 'admins', uid], localGroup)
  },

  getGroupMembers: state => gid => {
    return state.groups.find(group => group.uid === gid).members
  },

  getGroupMemberCount: state => gid => {
    const group = state.groups.find(group => group.uid === gid)
    const { members } = group
    const users = members.hasOwnProperty('users')
      ? Object.keys(members.users).length
      : 0
    const admins = members.hasOwnProperty('admins')
      ? Object.keys(members.admins).length
      : 0
    return users + admins
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
