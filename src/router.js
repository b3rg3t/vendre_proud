import firebase from 'firebase'
import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
<<<<<<< HEAD
import Profile from '@/views/Profile'
import Groups from '@/views/Groups'
import CreateGroup from '@/views/CreateGroup'
=======
import Groups from '@/views/Groups'
>>>>>>> master
import Login from '@/views/Login'
import SignUp from '@/views/SignUp'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
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
      path: '/groups',
      name: 'Groups',
      component: Groups,
      meta: {
        requiresAuth: true
      }
<<<<<<< HEAD
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/create-group',
      name: 'Create Group',
      component: CreateGroup,
      meta: {
        requiresAuth: true
      }
=======
>>>>>>> master
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
