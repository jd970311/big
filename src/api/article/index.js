import request from '@/utils/request.js'

// 获取文章分类
export const cateList = (data) => {
  return request({
    url: '/my/cate/list',
    method: 'get',
    data
  })
}

// 增加 /my/cate/add
export const cateAdd = (data) => {
  return request({
    url: '/my/cate/add',
    method: 'POST',
    data
  })
}
// 修改 /my/cate/info
export const editCateInfo = (data) => {
  return request({
    url: '/my/cate/info',
    method: 'PUT',
    data
  })
}
// 删除 /my/cate/del
export const cateDel = (data) => {
  return request({
    url: '/my/cate/del',
    method: 'DELETE',
    params: data
  })
}
// 获取详情 /my/cate/info
export const getCateInfo = (data) => {
  return request({
    url: '/my/cate/info',
    method: 'GET',
    params: data
  })
}

// 文章管理请求

// /my/article/list 文章列表
export const articleList = (data) => {
  return request({
    url: '/my/article/list',
    method: 'get',
    params: data
  })
}

// /my/article/info  更新-文章详情
export const articleInfo = (data) => {
  return request({
    url: '/my/article/info',
    method: 'PUT',
    data
  })
}

// 发布-文章 /my/article/add
export const addInfo = (data) => {
  return request({
    url: '/my/article/add',
    method: 'post',
    data
  })
}
// 获取-文章详情 /my/article/info
export const getInfo = (data) => {
  return request({
    url: '/my/article/info',
    method: 'GET',
    params: data
  })
}

// 删除-文章 /my/article/info
export const deleteInfo = (data) => {
  return request({
    url: '/my/article/info',
    method: 'DELETE',
    params: data
  })
}
