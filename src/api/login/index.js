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

// 获取用户信息 /my/userinfo
export const getUserinfo = (data) => {
  return request({
    url: '/my/userinfo',
    method: 'get',
    data
  })
}
