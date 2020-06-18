import { request } from '@/utils/request'
import { download } from '../../../utils/request'

// 预算组织与模板关联的校验
export function getTplCount(params) {
  return request('POST', '/api/tpl/count/' + params)
}
// 分页查询模板列表API
export function getTplList(params) {
  return request('POST', '/api/tpl/list', params)
}
// 4-1查询模板信息API
export function getTplInfo(params) {
  return request('GET', '/api/tpl/info/' + params)
}
// 4-2查询顶层模板科目信息列表API
export function getTplItemTopList(params) {
  return request('GET', '/api/tpl/item/toplist', params)
}
// 4-3popup分页查询顶层科目列表API
export function getItemTopList() {
  return request('POST', '/api/itm/toplist')
}
// 4-5查询科目树形机构信息列表API
export function getTplItemTreeList(params) {
  return request('GET', '/api/tpl/item/treelist', params)
}
// 4-6合计项编辑popup选中数据回显API
export function getTplItemTotalList(params) {
  return request('GET', '/api/tpl/itemtotal/list', params)
}
// 4-9财务预设右边表格数据列表API
export function getTplBdmList() {
  return request('POST', '/api/tpl/bdmlist')
}
// 重置模板
export function resetTplInfo(param) {
  return request('POST', '/api/tpl/reset', param)
}
// 保存模板基础信息
export function saveTplInfo(param) {
  return request('POST', '/api/tpl/save', param)
}
// 保存模板科目列表信息
export function saveTplTopItemList(param) {
  return request('POST', '/api/tpl/item/save', param)
}
// 保存模板合计项信息
export function saveTplItemTotalList(param) {
  return request('POST', '/api/tpl/itemtotal/save', param)
}
// 保存模板科目排序列表
export function saveTplItemSortList(param) {
  return request('POST', '/api/tpl/item/sortupdate', param)
}
// 作废模板
export function cancelTpl(param) {
  return request('POST', '/api/tpl/cancelled/' + param)
}
// 发布模板
export function publishTpl(param) {
  return request('POST', '/api/tpl/publish/' + param)
}
// 下载模板
export function downloadExcel(param) {
  return download('GET', '/api/comm/excel/download/TPL', param)
}

