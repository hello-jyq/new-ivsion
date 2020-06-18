import { request } from '@/utils/request'

// 预实查看--预实一览检索
export function getBafList(params) {
  return request('POST', '/api/baf/list', params)
}
// 组织树取得（预实画面，财务预设）
export function getBudOrgTree(params) {
  return request('POST', '/api/baf/budorglist', params)
}
// 预算编制信息取得（预实画面，财务预设）
export function getBdminfo(params) {
  return request('POST', '/api/baf/bafinfo', params)
}
export function getBafDetail(params) {
  return request('POST', '/api/baf/detail', params)
}
// 5-1更新履历.jpg
export function getUpdateHistory(params) {
  return request('POST', '/api/baf/updatehistory', params)
}
// 5-2更新履历.jpg
export function getItemHstory(params) {
  return request('POST', '/api/baf/itemhistory', params)
}
