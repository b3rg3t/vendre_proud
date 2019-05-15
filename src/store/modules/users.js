import firebase from 'firebase'
import { users, user } from '@/main'
import { GET_KEY } from '@/helpers'

const state = {
  user: null,
  users: []
}
const mutations = {
  SET_USER(state, data) {
    state.user = data
  },
  SET_USERS(state, data) {
    state.users = data
  },
  SET_ACTIVE_GROUP(state, data) {
    state.user.activeGroup = data
  },
  LOG_OUT_USER(state) {
    state.user = null
  }
}
const actions = {
  startListeningToUser({ commit }) {
    const { uid } = firebase.auth().currentUser

    user(uid).on('value', snapshot => {
      const data = snapshot.val()

      commit('SET_USER', {
        ...data,
        uid
      })
    })
  },
  stopListeningToUser({ commit }) {
    user(user.uid).off()
  },

  startListeningToUsers({ commit, rootState, rootGetters }) {
    users.on('value', snapshot => {
      // Check if user has an active group
      const userActiveGroup = GET_KEY(
        ['users', 'user', 'activeGroup'],
        rootState
      )
      if (userActiveGroup) {
        // If all good, then get response from firebase...
        const dbUsers = snapshot.val()
        // ...get the group object from client state...
        const localGroup = rootGetters['groups/getGroupById'](userActiveGroup)
        // ...check if there are admins and users
        const admins = GET_KEY(['members', 'admins'], localGroup)
        const users = GET_KEY(['members', 'users'], localGroup)

        const stateUsers = []
        // If there are admins push the user object (for that admin) into the array stateUsers
        if (admins) {
          Object.keys(admins).forEach(admin => {
            if (dbUsers[admin]) {
              stateUsers.push({ ...dbUsers[admin], uid: user })
            }
          })
        }
        // Same for users
        if (users) {
          Object.keys(users).forEach(user => {
            if (dbUsers[user]) {
              stateUsers.push({ ...dbUsers[user], uid: user })
            }
          })
        }
        // Commit the array to rootState with SET_USERS
        commit('SET_USERS', [...stateUsers])
      }
    })
  },

  stopListeningToUsers() {
    users.off()
  },

  setActiveGroup({ commit, rootState }, gid) {
    const uid = rootState.users.user.uid
    user(uid).update({ activeGroup: gid })
  },

  // Sign in User => Takes payload user: { email, password }
  async signInUser({ commit }, user) {
    const auth = await firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
    return auth
  },

  async signUpUser({ commit }, user) {
    return await firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(auth => {
        const displayName = user.displayName
        const {
          user: { email, uid }
        } = auth

        const userObj = {
          displayName,
          email
        }
        users.child(uid).set(userObj)
      })
  },

  // Social logins
  // Facebook login
  async signInWithFacebook({ commit }) {
    const provider = new firebase.auth.FacebookAuthProvider()
    // Save auth result in variable
    const auth = await firebase.auth().signInWithPopup(provider)
    // Destruct information
    const {
      additionalUserInfo: { isNewUser },
      user: { email, displayName, uid }
    } = auth

    // Check if user has account
    if (isNewUser) {
      // If true, create userobject and push to database
      const userObj = {
        displayName,
        email,
        uid
      }
      users.child(uid).set(userObj)
    } else {
      // If false, continue login
      return auth
    }
  },

  async signInWithGoogle({ commit }) {
    const provider = new firebase.auth.GoogleAuthProvider()
    // Save auth result in variable
    const auth = await firebase.auth().signInWithPopup(provider)
    // Destruct information
    const {
      additionalUserInfo: { isNewUser },
      user: { email, displayName, uid }
    } = auth

    // Check if user has account
    if (isNewUser) {
      // If true, create userobject and push to database
      const userObj = {
        displayName,
        email
      }
      users.child(uid).set(userObj)
      return auth
    } else {
      // If false, continue login
      return auth
    }
  },
  logOutUser: ({ commit }) => {
    return firebase.auth().signOut()
  }
}

const getters = {
  getUser: state => state.user,
  getActiveGroup: state => {
    if (!state.user) return
    else return state.user.activeGroup
  },
  getUserName: state => uid => {
    if (uid && state.users) {
      const user = state.users.find(user => user.uid === uid)
      if (user && user.displayName) {
        return user.displayName
      } else if (user && !user.displayName) {
        console.log('User has no displayName')
      }
    }
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
