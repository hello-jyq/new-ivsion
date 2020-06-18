import { request } from '@/utils/request'

// list 检索画面信息取得
export function getWfdemoList(params) {
  return request('POST', '/api/wfdemo/list', params)
}

// // 查询信息
export function findById(params) {
  return request('GET', '/api/wfdemo/info', params, true)
}

// 申请信息
export function apply(params) {
  return request('POST', '/api/wfdemo/apply', params)
}

// 审批取消信息
export function applycancel(params) {
  return request('POST', '/api/wfdemo/applycancel', params)
}

// 删除信息
export function deleteDac(params) {
  return request('POST', '/api/wfdemo/delete', params)
}

// 审批取消信息
export function deleteReApply(params) {
  return request('POST', '/api/wfdemo/deletereapply', params)
}

// 预实填写信息
export function getBudgetList(params) {
  return request('POST', '/api/budget/list', params)
}

