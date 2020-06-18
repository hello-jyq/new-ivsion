import { request } from '@/utils/request'

// 通用获取模板年度列表API
export function getTplYears(params) {
  return request('GET', '/api/comm/tplyears', params)
}
// 组织树取得（预实画面，财务预设）
export function getBudOrgTree(params) {
  return request('POST', '/api/comm/budorglist', params)
}

// 预算编制信息取得（预实画面，财务预设）
export function getBdminfo(params) {
  return request('POST', '/api/comm/bdminfo', params)
}
