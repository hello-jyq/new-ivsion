import { request } from '@/utils/request'
// 获取报价数据
export function getQuoInfo(params) {
  return request('POST', '/api/bud/quo/search', params)
}
// 提交报价数据
export function saveQuoInfo(params) {
  return request('POST', '/api/bud/quo/newBuild', params)
}
// 查询报价信息
export function findById(params) {
  return request('GET', '/api/bud/quo/query', params)
}
// 更新报价信息
export function updateQuoInfo(params) {
  return request('POST', '/api/bud/quo/edit', params)
}
// 删除报价信息
export function deleteQuoInfo(params) {
  return request('POST', '/api/bud/quo/remove', params)
}
