// 统一导出pinia
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(persist)
export default pinia

// 统一导出
export * from './modules/user'
export * from './modules/article'
