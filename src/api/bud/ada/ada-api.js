import { request } from '@/utils/request'

// 禀议申请画面 3-7禀议申请检索.jpg
// export function getAdrApproveList(params) {
//   console.log('params', params)
//   return request('POST', '/api/apa/list' + params)
// }
export function getAdrApproveList(params) {
  console.log('params', params)
  return request('POST', '/api/apa/list', params)
}
// 禀议申请画面 3-7禀议申请检索.jpg
// export function getAdrApproveInfo(params) {
//   return request('POST', '/api/apa/info' + params)
// }
export function getAdrApproveInfo(params) {
  return request('POST', '/api/apa/info', params)
}
