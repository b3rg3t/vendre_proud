import firebase from 'firebase'
import { user } from '@/main'

const state = {
  user: null
}
const mutations = {
  SET_USER(state, data) {
    state.user = data
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
  setActiveGroup({ commit }, uid) {
    commit('SET_ACTIVE_GROUP', uid)
  },

  // Sign in User => Takes payload user: { email, password }
  async signInUser({ commit }, user) {
    const auth = await firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
    return auth
  },

  async signUpUser({ commit }, user) {
    const auth = await firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(auth => {
        const displayName = user.displayName
        const {
          user: { email, uid }
        } = auth

        const userObj = {
          displayName,
          email,
          groups: false,
          prouds: false,
          mentions: false
        }

        users.child(uid).set(userObj)
      })
    return auth
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
        uid,
        groups: false,
        mentions: false,
        prouds: false
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
        email,
        groups: false,
        mentions: false,
        prouds: false
      }
      users.child(uid).set(userObj)
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
