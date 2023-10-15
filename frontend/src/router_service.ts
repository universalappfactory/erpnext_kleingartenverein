import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/calendar',
    name: 'Kalender',
    component: () => import('@/pages/Calendar.vue'),
    meta: {
      title: 'Termine'
    }
  },
  {
    path: '/termine',
    name: 'Termine',
    component: () => import('@/pages/Calendar.vue'),
    meta: {
      title: 'Termine'
    }
  },
  {
    path: '/kalender',
    name: 'Kalender2',
    component: () => import('@/pages/Calendar.vue'),
    meta: {
      title: 'Termine'
    }
  },
  {
    path: '/counter',
    name: 'Counter',
    component: () => import('@/pages/CounterUpload.vue'),
    meta: {
      title: 'Zählerstände'
    }
  },
]

let router = createRouter({
  history: createWebHistory('/service'),
  routes,
})

export default router
