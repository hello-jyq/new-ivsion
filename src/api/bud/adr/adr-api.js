import { request } from '@/utils/request'

// 禀议查看3-3禀议详情查看.jpg
export function getAdrDetail(params) {
  return request('POST', '/api/apr/detail' + params)
}
// 禀议查看3-5禀议通过查看.jpg
export function getAdrApplyList(params) {
  return request('POST', '/api/apr/applylist' + params)
}
// 3-6禀议通过查看popup.jpg
export function getAdrExpenseList(params) {
  return request('POST', '/api/apr/expenselist' + params)
}
