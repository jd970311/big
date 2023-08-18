import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 登录页
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue')
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
          component: () => import('@/views/article/channel.vue')
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
router.beforeEach((to) => {
  // 判断有无token，没有token回到 /login 页面
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') return '/login'
})
export default router
