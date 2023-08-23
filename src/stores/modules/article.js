import { defineStore } from 'pinia'
export const userArticleStore = defineStore(
  'article',
  () => {
    // 定义变量
    // 定义保存数据的方法

    return {}
  },
  {
    persist: {
      storage: sessionStorage
    } // 持久化
  }
)
