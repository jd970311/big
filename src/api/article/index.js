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
