import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Userlist from '@/views/Userlist.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/userlist',
      name: 'Userlist',
      component: Userlist
    },
    { path: '*', redirect: '/' }
  ]
})

router.beforeEach((to, from, next) => {
  // редиректим пользователя из списка закрытых страниц для незалогиненых пользователей
  const publicPages = ['/', '/login']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')

  if (authRequired && !loggedIn) {
    return next('/login')
  }

  next()
})
