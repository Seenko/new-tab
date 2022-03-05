import {
  createRouter,
  createWebHistory,
  RouteRecordRaw
} from 'vue-router'

import Home from '@/views/Home.vue'
import Settings from '@/views/Settings.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    alias: '/index.html',
    name: 'home',
    component: Home
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})