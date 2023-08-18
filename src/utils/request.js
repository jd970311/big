import axios from 'axios'
// 引入 pinia
import { useUserStore } from '@/stores/index.js'

// 引入路由
import router from '@/router'
const baseURL = 'http://big-event-vue-api-t.itheima.net'
//  http://big-event-vue-api-t.itheima.net
const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 50000
})
// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    // 实例化Pinia数据
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)
// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // TODO 3. 处理业务失败
    // TODO 4. 摘取核心响应数据
    if (res.data.code === 0) {
      // 成功
      return res.data
    }
    // 失败
    ElMessage({ message: res.data.message || '服务异常', type: 'error' })
    return Promise.reject(res.data)
  },
  (err) => {
    // TODO 5. 处理401错误 ,
    // 如果权限不足 或者 token失效，直接返回登录页
    if (err.response?.status === 401) {
      router.push('/login')
    }
    //  错误的默认情况---给提示
    ElMessage({
      message: err.response.data.message || '服务异常',
      type: 'error'
    })
    return Promise.reject(err)
  }
)

export default instance
