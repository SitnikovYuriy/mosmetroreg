import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Главная',
    component: () => import('@/pages/home.vue'),
  },
  {
    path: '/map',
    name: 'Схема метро',
    component: () => import('@/pages/map.vue'),
  },
  {
    path: '/registry',
    name: 'Реестр станций',
    component: () => import('@/pages/registry.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
})

export default router
