import { request } from '@/utils/request'
// 预算编制与预算数据
export function getTplCount(params) {
  return request('POST', '/api/bdm/lock/getLockedCount' + params)
}

// list 检索画面信息取得
export function getBdmList(params) {
  return request('POST', '/api/bdm/list', params)
}

// 对一个组织加锁
export function lockOrg(params) {
  return request('POST', '/api/bdm/lock', params)
}

// 对一个组织解锁
export function unlockOrg(params) {
  return request('POST', '/api/bdm/unlock', params)
}
