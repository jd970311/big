import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserinfo } from '../../api/login/index'
import router from '@/router/index.js'
// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useUserStore = defineStore(
  'user',
  () => {
    // 定义变量 （state）
    const token = ref('')
    // 定义修改变量的方法 （actions）
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }

    // 定义用户信息
    const userInfo = ref({})
    // 定义修改用户信息的方法
    const saveUserInfo = async () => {
      const res = await getUserinfo()
      userInfo.value = res.data
    }

    // 定义退出登录的方法
    const logOut = () => {
      removeToken()
      router.push('/login')
    }
    // 把变量和方法导出去 （getters）
    return {
      token,
      setToken,
      removeToken,
      userInfo,
      saveUserInfo,
      logOut
    }
  },
  {
    persist: {
      storage: sessionStorage
    } // 持久化
  }
)
