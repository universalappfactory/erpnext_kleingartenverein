import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/pages/Dashboard.vue'),
  },
  {
    path: '/paechter',
    name: 'Pächter',
    component: () => import('@/pages/Paechter.vue'),
  },
]

let router = createRouter({
  history: createWebHistory('/dashboard'),
  routes,
})

export default router
