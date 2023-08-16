import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 登录页
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login')
    },
    {
      path: '/',
      name: '',
      component: () => import('@/views/layout/index.vue'),
      redirect: '/article',
      children: [
        // 个人详情
        {
          path: 'article',
          name: 'article',
          component: () => import('@/views/article/index.vue')
        },
        // 频道详情
        {
          path: 'article/channel',
          name: 'channel',
          component: () => import('@/views/article/channel/index.')
        },
        // 个人中心
        {
          path: 'user',
          name: 'user',
          component: () => import('@/views/user/index.vue')
        },
        // 更换头像
        {
          path: 'user/avatar',
          name: 'avatar',
          component: () => import('@/views/user/avatar.vue')
        },
        // 重置密码
        {
          path: 'user/password',
          name: 'password',
          component: () => import('@/views/user/password.vue')
        }
      ]
    }
  ]
})

export default router
