import request from '@/utils/request.js'
// 登录
export const login = (data) => {
  return request({
    url: '/api/login',
    method: 'POST',
    data
  })
}

// 注册 /api/reg
export const reg = (data) => {
  return request({
    url: '/api/reg',
    method: 'POST',
    data
  })
}
