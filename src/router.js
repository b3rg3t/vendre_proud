import firebase from 'firebase'
import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import Groups from '@/views/Groups'
import CreateGroup from '@/views/CreateGroup'
import SignIn from '@/views/SignIn'
import SignUp from '@/views/SignUp'
import Invite from '@/views/Invite'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/sign-in'
    },
    {
      path: '/',
      redirect: '/sign-in'
    },
    {
      path: '/sign-in',
      name: 'Sign in',
      component: SignIn
    },
    {
      path: '/sign-up',
      name: 'Sign up',
      component: SignUp
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/invite-members',
      name: 'Invite',
      component: Invite,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/groups',
      name: 'Groups',
      component: Groups,
      meta: {
        requiresAuth: true
      }
    },

    {
      path: '/create-group',
      name: 'Create group',
      component: CreateGroup,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('home')
  else next()
})

export default router
