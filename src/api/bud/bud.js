import { request, download } from '@/utils/request'
// /api/bud/getBud 获取预算申请数据
export function getBudInfo(params) {
  return request('GET', '/api/bud/getBud', params)
}
// 获取报价数据
export function getQuoInfo(params) {
  return request('POST', '/api/bud/getQuo', params)
}
// 提交报价数据
export function saveQuoInfo(params) {
  return request('POST', '/api/bud/saveQuo', params)
}
// 查询报价信息
export function findById(params) {
  return request('GET', '/api/bud/findById', params)
}
// 更新报价信息
export function updateQuoInfo(params) {
  return request('POST', '/api/bud/updateQuo', params)
}
// 删除报价信息
export function deleteQuoInfo(params) {
  return request('POST', '/api/bud/deleteQuo', params)
}
// 下载文件
export function downloadFile(params) {
  return download('POST', '/api/bud/download', params)
}
// 提交预算申请
export function applyHandson(params) {
  return request('POST', '/api/bud/budApplyHandson', params, true)
}
// 暂存预算申请
export function saveHandson(params) {
  return request('POST', '/api/bud/budSaveHandson', params, true)
}
// 删除申请
export function deleteHandson(params) {
  return request('POST', '/api/bud/budDeleteHandson', params, true)
}
// 获取汇率
export function getRate(params) {
  return request('GET', '/api/bud/getCurrencyRate', params)
}
// 更据预算科目，获取其他相关信息
export function getFinanceAccount(params) {
  return request('GET', '/api/bud/getFinanceAccount', params)
}
// 下载CSV
export function downloadSchedule(fileType, params) {
  return download('POST', `/api/schedule/DataExport/${fileType}`, params)
}

// 下载CSV
export function exportReport(params) {
  return download('POST', `/api/report/${params.reportName}/${params.type}`, params)
}
