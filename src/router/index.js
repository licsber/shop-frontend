import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AppIndex from '@/components/home/AppIndex'
import Login from '@/components/Login'
import ItemAdd from '@/components/item/ItemAdd'
import Home from '@/components/Home'
import UserManager from '@/components/user/UserManager'
import ItemManager from '@/components/item/ItemManager'
import ItemShow from '@/components/item/ItemShow'
import Admin from '@/components/admin/Admin'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'AppIndex',
          component: AppIndex
        },
        {
          path: '/itemAdd',
          name: 'ItemAdd',
          component: ItemAdd,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/itemManager',
          name: 'ItemManager',
          component: ItemManager,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/userManager',
          name: 'UserManager',
          component: UserManager,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/reg',
      name: 'Register',
      component: Register
    },
    {
      path: '/item/:id',
      name: 'Item',
      component: ItemShow
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    }
  ]
})
