import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/pages/MyClub.vue'),
  },
  {
    path: '/paechter',
    name: 'Pächter',
    component: () => import('@/pages/Paechter.vue'),
  },
  {
    path: '/calendar',
    name: 'Kalender',
    component: () => import('@/pages/InternalCalendar.vue'),
  },
  {
    path: '/myclub',
    name: 'MyClub',
    component: () => import('@/pages/MyClub.vue'),
  },
  {
    path: '/meetingminutes',
    name: 'Bulletins',
    component: () => import('@/pages/MeetingMinutes.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/pages/ProfilePage.vue'),
  },
]

let router = createRouter({
  history: createWebHistory('/dashboard'),
  routes,
})

export default router
