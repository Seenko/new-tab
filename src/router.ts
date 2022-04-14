import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw
} from 'vue-router'

import Home from '@/views/Home.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    alias: '/index.html',
    name: 'home',
    component: Home
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})