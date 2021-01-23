import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import axios from "@/axios/index";
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

import LeaveTwoMenus from './moudels/index'
import AddressBook from "@/router/AddressBook";
import HelpCenter from "@/router/HelpCenter";

Vue.use(VueRouter)

const routes = [
  ...LeaveTwoMenus,
    ...HelpCenter,
  ...AddressBook,
  {
    path: '/',
    name: 'Home',
    meta:{
      name:'主菜单',
      tag:'Meuns'
    },
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      name: '登录',
      tag:'Login'
    },
    component: ()=>import('../views/Login.vue')
  },
  {
    path:'/changePassword',
    name:'changePassword',
    component: ()=>import('../views/changePassword')
  },

  {
    path: '*',
    name:'NotFound',
    component: ()=>import('../views/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) =>{
  NProgress.start()
  let Token = localStorage.getItem('Token')
  if(Token === null && to.fullPath!=='/login'){
      router.push('/login')
  }
  next()
  NProgress.done()

})

router.afterEach(()=>{
  NProgress.done()
})

export default router
