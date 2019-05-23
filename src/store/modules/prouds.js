import { prouds, proud, user, group } from '@/main'
import axios from 'axios'

// State
const state = {
  prouds: []
}

// Mutations
const mutations = {
  SET_PROUDS(state, data) {
    state.prouds = data
  }
}

// Actions
const actions = {
  startListeningToProuds({ commit }) {
    prouds.on('value', snapshot => {
      const data = snapshot.val()
      if (data) {
        const dataArray = Object.keys(data).map(key => {
          return { ...data[key], uid: key }
        })
        commit('SET_PROUDS', dataArray)
      }
    })
  },
  stopListeningToProuds() {
    prouds.off()
  },
  createProud(proud) {
    // Todo: Add proud under user and active group
    prouds.push(proud)
  },
  removeProud({ rootState }, proudID) {
    // Get userID and activeGroup from state
    const {
      users: {
        user: { uid, activeGroup }
      }
    } = rootState
    // Update firebase prouds...
    proud(proudID).remove()
    // ...users...
    user(uid)
      .child(`prouds/${proudID}`)
      .remove()
    // ...groups.
    group(activeGroup)
      .child(`prouds/${proudID}`)
      .remove()
  },
  getProudsFromSlack({ rootState }) {
    const API = 'https://slack.com/api/groups.history'
    const access_token =
      '?token=' + rootState.users.user.slack_data.access_token
    const channel = '&channel=' + 'GHGLPKJRF'
    const count = '&count' + '=100'
    axios.get(API + access_token + channel + count).then(response => {
      if (response.data.messages) {
        const newProuds = []

        const filteredProuds = response.data.messages.filter(
          proud => !proud.hasOwnProperty('subtype')
        )
        const usersId = rootState.users.users.map(user => {
          return user.slack_data ? user.slack_data.user_id : null
        })
        if (filteredProuds) {
          let flag
          filteredProuds.filter(message => {
            flag = false
            usersId.forEach(user => {
              if (user === message.user) {
                flag = true
              }
            })
            if (!message.text.includes('PROUD')) {
              flag = false
            }
            return flag
          })
        }

        filteredProuds.forEach(proud => {
          const isGroupMember = rootState.users.users.find(
            user => user.slack_data.user_id === proud.user
          )
          if (isGroupMember) {
            const text = proud.text
            const txtarr = text.split(' ')
            if (txtarr[0] === 'PROUD') {
              console.log(txtarr[0])
              txtarr.splice(0, 1)
              console.log(proud.ts)
              const textFinal = txtarr.join(' ')
              newProuds.push({
                created: proud.ts,
                group: isGroupMember.activeGroup,
                message: textFinal,
                owner: isGroupMember.uid,
                slack_user: proud.user
              })
            }
          }
        })

        console.log(filteredProuds)

        const final = newProuds.filter(proud => {
          const exsists = state.prouds.find(p => p.created === proud.created)
          if (!exsists) {
            return proud
          }
        })
        if (final.length >= 1) {
          final.forEach(proud => {
            const proudKey = prouds.push(proud).key
            group(proud.group).update({ [proudKey]: true })
            user(proud.owner)
              .child('prouds')
              .update({ [proudKey]: true })
          })
        } else {
          console.log('Messages exsists in PROUD')
        }
      } else {
        console.error('there is no messages')
      }
    })
  }
}

// Getters
const getters = {
  getAllProuds: state => state.prouds,
  getProudById: state => uid => state.prouds.find(proud => proud.uid === uid), // CheckAgain: Is this needed?
  getProudsByUser: (state, getters, { users: { user } }) =>
    state.prouds
      .filter(proud => {
        if (user) {
          return proud.owner === user.uid
        }
      })
      .sort((next, prev) => prev.created - next.created),
  getProudsByGroup: (state, getters, { users: { user } }) =>
    // Todo: Take a look at this again
    state.prouds
      .filter(proud => {
        if (user) {
          return proud.group === user.activeGroup
        }
      })
      .sort((next, prev) => prev.created - next.created)
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

/*
prouds = {
  proudID1: {
    message:
      'hej jag vill verkligen lyfta @uid1 och @uid2 för deras grymma jobb',
    creator: uid3,
    mentions: {
      uid1: true,
      uid2: true
    },
    group: groupID || null
  }
}
*/
