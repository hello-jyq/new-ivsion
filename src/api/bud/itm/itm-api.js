import { request } from '@/utils/request'
// 获取预算科目数据
export function getItems(params) {
  return request('POST', '/api/itm/list', params)
}
// 新建预算科目数据
export function newItem(params) {
  return request('POST', '/api/itm/new', params)
}
// 获取單個预算科目信息
export function getItemInfo(params) {
  return request('POST', '/api/itm/info/' + params)
}
// 更新預算科目信息
export function editItem(params) {
  return request('POST', '/api/itm/edit', params)
}
// 获取系统科目组
export function getItemGroups(params) {
  return request('POST', '/api/itm/allParentItem', params)
}
// 获取预算科目数据(除去子科目)ist
export function getItemsexcChild(params) {
  return request('POST', '/api/itm/items', params)
}
