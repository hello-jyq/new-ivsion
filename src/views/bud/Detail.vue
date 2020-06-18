<template>
  <div class="apply">
    <el-collapse v-model="activeNames">
      <el-collapse-item name="1">
        <span slot="title" class="collapse-title">{{ $t('comm.essentialInformation') }}</span>
        <div class="condition">
          <div class="codition_company">
            <div class="title">
              公司：
            </div>
            <el-input size="small" placeholder="大金空调（上海）有限公司" disabled />
          </div>
          <div class="codition_year">
            <div class="title">
              预算年度：
            </div>
            <el-select v-model="year" placeholder="请选择年度" size="small" class="select">
              <el-option v-for="item in yearList" :key="item" :label="item" :value="item" />
            </el-select>
          </div>
          <div class="codition_department">
            <div class="title">
              预算部门：
            </div>
            <el-input size="small" placeholder="测试课" disabled />
          </div>
          <div class="codition_apply">
            <div class="title">
              预算申请NO：
            </div>
            <el-input size="small" disabled />
          </div>
          <div class="codition_state">
            <div class="title">
              审批状态：
            </div>
            <el-input size="small" disabled />
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="2">
        <span slot="title" class="collapse-title">预算明细</span>
        <div class="table">
          <hot-table ref="textHot" :settings="hotSettings" class="table_info" />
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-dialog
      title="流水线别明细"
      :visible.sync="detailDialog"
      class="dialog"
      width="80%"
      top="20px"
      modal
      :close-on-click-modal="false"
      center
      @close="closeDialog"
    >
      <div class="detail">
        <div class="info">
          <div class="codition_department">
            <div class="title">
              预算部门：
            </div>
            <el-input size="small" placeholder="测试课" disabled :value="applyDetail.length && applyDetail[0]" />
          </div>
          <div class="codition_department">
            <div class="title">
              预算科目：
            </div>
            <el-input size="small" placeholder="预算科目" disabled :value="applyDetail.length && applyDetail[1]" />
          </div>
          <div class="codition_apply">
            <div class="title">
              预算申请编号：
            </div>
            <el-input size="small" disabled />
          </div>
        </div>
        <h3>预算明细</h3>
        <div class="detail_table">
          <hot-table ref="detailHot" :settings="detailSettings" class="table_info" />
        </div>
        <div class="btn">
          <el-button type="primary" @click="detailDialog = false">
            确 定
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { HotTable } from '@handsontable/vue'
import '@/../node_modules/handsontable/dist/handsontable.full.css'
import { getBudInfo } from '@/api/bud/bud.js'
import Handsontable from 'handsontable'
// import { updateLocale } from 'moment';
const monthList = [
  'value01',
  'value02',
  'value03',
  'value04',
  'value05',
  'value06',
  'value07',
  'value08',
  'value09',
  'value10',
  'value11',
  'value12'
]
const exchangeRateList = {
  '人民币': {
    code: 'C6301',
    rate: 1.000000
  },
  '日元': {
    code: 'C6302',
    rate: 15.822000
  },
  '美元': {
    code: 'C6303',
    rate: 0.145400
  }
}
export default {
  components: {
    HotTable
  },
  data() {
    return {
      activeNames: ['1', '2'],
      budControlid: {},
      // 当前操作的行数
      applayDetailRow: 0,
      // 流水信息
      applyDetail: [],
      // 当年预算
      nowBudget: null,
      // 次年预算
      nextBudget: null,
      detailDialog: false,
      year: '2019年度',
      yearList: ['2019年度', '2020年度', '2021年度', '2022年度'],
      hotSettings: {
        data: [
          // {orgId: 11000, remarks: '当年实绩', budLinedatas: []},
          // {orgId: 11000, remarks: '当年预算'},
          // {orgId: 11000, remarks: '次年预算'}
        ], // 数据在这个里面,由数据填充表
        colWidths: [100, 100, 60, 80, 100, 150, 80, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 100, 100, 100, 100], // 单元格宽
        manualColumnResize: true,
        manualRowResize: false,
        mergeCells: [
          // {row:0, col: 0, rowspan: 3, colspan: 1},
          // {row: 0, col: 1, rowspan: 3, colspan: 1},
          // {row: 0, col: 2, rowspan: 3, colspan: 1},
          // {row: 0, col: 3, rowspan: 3, colspan: 1},
          // {row: 0, col: 4, rowspan: 3, colspan: 1},
          // {row: 0, col: 5, rowspan: 3, colspan: 1},
          // {row: 0, col: 6, rowspan: 3, colspan: 1},
          // {row: 0, col: 7, rowspan: 3, colspan: 1},
          // {row: 0, col: 21, rowspan: 3, colspan: 1},
          // {row: 0, col: 22, rowspan: 3, colspan: 1},
          // {row: 0, col: 23, rowspan: 3, colspan: 1},
          // {row: 0, col: 24, rowspan: 3, colspan: 1},
        ],
        cell: [
          // {row:0, col:9, className: 'notread', editor: false},
          // {row:0, col:10, className: 'notread', editor: false},
          // {row:0, col:11, className: 'notread', editor: false},
          // {row:0, col:12, className: 'notread', editor: false},
          // {row:0, col:13, className: 'notread', editor: false},
          // {row:0, col:14, className: 'notread', editor: false},
          // {row:0, col:15, className: 'notread', editor: false},
          // {row:0, col:16, className: 'notread', editor: false},
          // {row:0, col:17, className: 'notread', editor: false},
          // {row:0, col:18, className: 'notread', editor: false},
          // {row:0, col:19, className: 'notread', editor: false},
          // {row:0, col:20, className: 'notread', editor: false},
        ],
        rowHeights: 25, // 单元格高
        startRows: 10, // 初始行列数
        startCols: 35,
        minRows: 3, // 最小行列
        minCols: 2,
        rowHeaders: true, // 行表头
        colHeaders: [
          '预算部门',
          '预算科目',
          '是否可控',
          '变动固定',
          '涉及范围',
          '业务说明',
          '货币代码',
          '预计汇率',
          '备注',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月',
          '1月',
          '2月',
          '3月',
          '年合计',
          '人民币年合计',
          '细分',
          '操作'
        ], // 自定义列表头or 布尔值
        minSpareCols: 0, // 列留白
        minSpareRows: 0, // 行留白
        className: 'htCenter',
        currentRowClassName: 'currentRow', // 为选中行添加类名，可以更改样式
        currentColClassName: 'currentCol', // 为选中列添加类名
        autoWrapRow: true, // 自动换行
        // language: "zh-CN",
        // contextMenu: [
        //   "row_above",
        //   "row_below",
        //   "col_left",
        //   "col_right",
        //   "---------",
        //   "remove_row",
        //   "remove_col",
        //   "---------",
        //   "alignment",
        //   "make_read_only",
        //   "borders",
        //   "copy",
        //   "cut"
        // ],
        // 右键效果
        fillHandle: false, // 选中拖拽复制 possible values: true, false, "horizontal", "vertical"
        fixedColumnsLeft: 2, // 固定左边列数
        fixedRowsTop: 0, // 固定上边行数
        columns: [
          // 添加每一列的数据类型和一些配置
          // { data: "subordindateUnit" }, // data后面跟的这个字段是上传对应的字段
          // {
          //   data: "excelDetectTime",
          //   type: "time",
          //   timeFormat: "h:mm:ss a",
          //   correctFormat: true
          // },
          // { data: "jobNumber" },
          // { data: "name" },
          // {
          //   data: "phone",
          //   type: "numeric"
          // }, //数值
          // {
          //   data: "excelGender",
          //   type: "dropdown",
          //   source: ["男", "女"],
          //   strict: false
          // },
          // {
          //   data: "excelBirthday",
          //   type: "date", //时间格式
          //   dateFormat: "YYYY-MM-DD",
          //   correctFormat: true,
          //   defaultDate: "1960-01-01"
          // },
          {
            data: 'orgId', // 部门,
            readOnly: true,
            className: 'htMiddle htCenter notread'
          },
          {
            data: 'financeAccount', // 科目
            readOnly: true,
            className: 'htMiddle htCenter'
          },
          {
            data: 'isControl', // 是否可控
            readOnly: true,
            className: 'htMiddle htCenter notread'
          },
          {
            data: 'isFixed', // 变动
            readOnly: true,
            className: 'htMiddle htCenter notread'
          },
          {
            data: 'scopeDesc', // 涉及范围
            readOnly: true,
            className: 'htMiddle htCenter notread'
          },
          {
            data: 'sysDesc', // 业务说明
            readOnly: true,
            className: 'htLeft',
            wordWrap: false
          },
          {
            data: 'currencyCode', // 货币代码
            type: 'dropdown', //  数据类型
            source: ['人民币', '日元', '美元'], // 值
            strict: false,
            readOnly: true,
            className: 'htMiddle htCenter'
          },
          {
            data: 'currencyRate', // 汇率
            readOnly: true,
            className: 'htMiddle htCenter notread'
          },
          {
            data: 'remarks', // 备注
            readOnly: true,
            // className: 'htMiddle htCenter notread'
            // eslint-disable-next-line
            renderer: function(instance, td, row, col, prop, value, cellProperties) {
              if (row % 3 === 0) {
                Handsontable.dom.empty(td)
                td.innerText = '当年实绩'
                Handsontable.dom.addClass(td, 'htMiddle htCenter notread')
                return td
              } else if (row % 3 === 1) {
                Handsontable.dom.empty(td)
                td.innerText = '当年预算'
                Handsontable.dom.addClass(td, 'htMiddle htCenter notread')
                return td
              } else {
                Handsontable.dom.empty(td)
                td.innerText = '次年预算'
                Handsontable.dom.addClass(td, 'htMiddle htCenter notread')
                return td
              }
            }
          },
          {
            data: 'value01', // 四月
            readOnly: true,
            type: 'numeric'
          },
          {
            data: 'value02', // 五月
            readOnly: true,
            type: 'numeric'
          },
          {
            data: 'value03', // 六月
            readOnly: true,
            type: 'numeric'
          },
          {
            data: 'value04', // 七月
            readOnly: true,
            type: 'numeric'
          },
          {
            data: 'value05', // 八月
            readOnly: true,
            type: 'numeric'
          },
          {
            data: 'value06', // 九月
            readOnly: true,
            type: 'numeric'
          },
          {
            data: 'value07', // 十月
            readOnly: true,
            type: 'numeric'
          },
          {
            data: 'value08', // 十一月
            readOnly: true,
            type: 'numeric'
          },
          {
            data: 'value09', // 十二月
            readOnly: true,
            type: 'numeric'
          },
          {
            data: 'value10', // 一月
            readOnly: true,
            type: 'numeric'
          },
          {
            data: 'value11', // 二月
            readOnly: true,
            type: 'numeric'
          },
          {
            data: 'value12', // 三月
            readOnly: true,
            type: 'numeric'
          },
          {
            data: 'aggregate', // 年合计
            readOnly: true,
            className: 'htMiddle htCenter notread'
          },
          {
            data: 'RMBAggregate', // 人民币年合计
            readOnly: true,
            className: 'htMiddle htCenter notread'
          },
          {
            data: 'hasLinedata', // 细分
            readOnly: true,
            className: 'htMiddle htCenter notread'
          },
          {
            data: 'operation', // 操作
            readOnly: true,
            renderer: this.operationRender,
            className: 'htMiddle htCenter notread'
          }
        ],
        afterChange: function(changes, source) {
          console.log(source)
          if (changes) {
            // let total = 0
            changes.forEach(([row, prop, oldValue, newValue]) => {
              // 监听到数值的变化，计算总数
              if ((row % 3 === 1 && row !== 0 && row !== 2) || row === 1) {
                if (!newValue || oldValue === newValue) {
                  return false
                }
                if (!monthList.find(item => item === prop)) {
                  return false
                }
                if (typeof newValue !== 'number') {
                  return false
                } else {
                  // console.log(this.get(row-1, 'aggregate'))
                  // 计算年合计
                  const count = this.getDataAtCell(row - 1, 21) || 0
                  // 获取汇率
                  const num = this.getDataAtCell(row - 1, 7) || null
                  if (!oldValue) {
                    this.setDataAtRowProp(row - 1, 'aggregate', round(count + newValue))
                    if (num) {
                      this.setDataAtRowProp(row - 1, 'RMBAggregate', round((count + newValue) / num))
                    }
                  } else {
                    if (typeof oldValue !== 'number') {
                      oldValue = 0
                    }
                    this.setDataAtRowProp(row - 1, 'aggregate', round(count + newValue - oldValue))
                    if (num) {
                      this.setDataAtRowProp(row - 1, 'RMBAggregate', round((count + newValue - oldValue) / num))
                    }
                  }
                }
              }
              // 监听到货币的变化，改变汇率，计算出人命币年合计
              if (prop === 'currencyCode') {
                console.log('货币发生了变化')
                // 设置对应汇率的数值
                if (newValue === oldValue) {
                  return false
                }
                const num = exchangeRateList[newValue] ? exchangeRateList[newValue].rate : null
                this.setDataAtRowProp(row, 'currencyRate', num)
                const count = this.getDataAtCell(row, 21) || null
                if (!count) {
                  return false
                }
                const RMBcount = count / num
                console.log(round(RMBcount, 4))
                this.setDataAtRowProp(row, 'RMBAggregate', round(RMBcount))
              }
            })
          }
          // 保留5位小数
          function round(v) {
            return Math.floor(v * 10000) / 10000
          }
        }
      },
      detailSettings: {
        data: [
          // {department: 11000, remarks: '当年预算'},
          // {department: 11000, remarks: '次年预算'}
        ], // 数据在这个里面,由数据填充表
        colWidths: [100, 100, 100, 80, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 100], // 单元格宽
        mergeCells: [
          // {row:0, col: 0, rowspan: 2, colspan: 1},
          // {row: 0, col: 1, rowspan: 2, colspan: 1},
          // {row: 0, col: 2, rowspan: 2, colspan: 1},
          // {row: 0, col: 16, rowspan: 2, colspan: 1},
        ],
        cell: [
        ],
        rowHeights: 25, // 单元格高
        startRows: 10, // 初始行列数
        startCols: 35,
        minRows: 0, // 最小行列
        minCols: 0,
        rowHeaders: false, // 行表头
        colHeaders: [
          '流水线单一',
          '流水线共通',
          '使用场所',
          '备注',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月',
          '1月',
          '2月',
          '3月',
          '操作'
        ], // 自定义列表头or 布尔值
        minSpareCols: 0, // 列留白
        minSpareRows: 0, // 行留白
        className: 'htCenter',
        currentRowClassName: 'currentRow', // 为选中行添加类名，可以更改样式
        currentColClassName: 'currentCol', // 为选中列添加类名
        autoWrapRow: true, // 自动换行
        // language: "zh-CN",
        // contextMenu: [
        //   "row_above",
        //   "row_below",
        //   "col_left",
        //   "col_right",
        //   "---------",
        //   "remove_row",
        //   "remove_col",
        //   "---------",
        //   "alignment",
        //   "make_read_only",
        //   "borders",
        //   "copy",
        //   "cut"
        // ],
        // 右键效果
        fillHandle: false, // 选中拖拽复制 possible values: true, false, "horizontal", "vertical"
        fixedColumnsLeft: 0, // 固定左边列数
        fixedRowsTop: 0, // 固定上边行数
        columns: [
          {
            readOnly: true,
            data: 'placelineId', // 单一流水线,
            className: 'htMiddle htCenter'
          },
          {
            readOnly: true,
            data: 'placelineDetail', // 流水线共通
            className: 'htMiddle htCenter'
          },
          {
            readOnly: true,
            data: 'placeuseId', // 使用场所
            className: 'htMiddle htCenter'
          },
          {
            data: 'remarks', // 备注
            readOnly: true,
            // className: 'htMiddle htCenter notread'
            // eslint-disable-next-line
            renderer: function(instance, td, row, col, prop, value, cellProperties) {
              if (row % 2 === 0) {
                Handsontable.dom.empty(td)
                td.innerText = '当年预算'
                Handsontable.dom.addClass(td, 'htMiddle htCenter notread')
                return td
              } else {
                Handsontable.dom.empty(td)
                td.innerText = '次年预算'
                Handsontable.dom.addClass(td, 'htMiddle htCenter notread')
                return td
              }
            }
          },
          {
            readOnly: true,
            data: 'value01', // 四月
            type: 'numeric'
          },
          {
            readOnly: true,
            data: 'value02', // 五月
            type: 'numeric'
          },
          {
            readOnly: true,
            data: 'value03', // 六月
            type: 'numeric'
          },
          {
            readOnly: true,
            data: 'value04', // 七月
            type: 'numeric'
          },
          {
            readOnly: true,
            data: 'value05', // 八月
            type: 'numeric'
          },
          {
            readOnly: true,
            data: 'value06', // 九月
            type: 'numeric'
          },
          {
            readOnly: true,
            data: 'value07', // 十月
            type: 'numeric'
          },
          {
            readOnly: true,
            data: 'value08', // 十一月
            type: 'numeric'
          },
          {
            readOnly: true,
            data: 'value09', // 十二月
            type: 'numeric'
          },
          {
            readOnly: true,
            data: 'value10', // 一月
            type: 'numeric'
          },
          {
            readOnly: true,
            data: 'value11', // 二月
            type: 'numeric'
          },
          {
            readOnly: true,
            data: 'value12', // 三月
            type: 'numeric'
          }
          // {
          //   data: 'operation', // 操作
          //   readOnly: true,
          //   renderer: this.detailRender,
          //   className: 'htMiddle htCenter'
          // },
        ],
        afterChange: function(changes, source) {
          console.log(changes, source)
        }
      }
    }
  },
  async mounted() {
    const budControlidId = this.$route.params.id
    console.log(budControlidId)
    const res = await getBudInfo({ budControlidId })
    if (res && res.success) {
      const { budControlidDetailHandsons } = res.datas.budControlid
      const list = budControlidDetailHandsons.map((item, index) => {
        item.remarks = index % 3 === 1 ? '当年预算' : index % 3 === 2 ? '次年预算' : '当年实绩'
        item.currencyCode = item.currencyCd === 'C6301' ? '人民币' : item.currencyCd === 'C6302' ? '日元' : '美元'
        item.hasLinedata = parseInt(item.hasLinedata) ? '是' : '否'
        item.isControl = parseInt(item.isControl) ? '是' : '否'
        return item
      })
      this.$refs.textHot.hotInstance.loadData(list)
      // this.$refs.textHot.hotInstance.updata
      console.log(this.hotSettings.data)
      // 合并单元格
      this.mergeCell(list)
      // 计算本币总合与人民币总合
      this.computedCount(list)
      this.hotSettings.data = list
    }
  },
  // 使用handsontable的api（this.$refs.textHot.hotInstance.xx）
  methods: {
    // 合并单元格
    mergeCell(list) {
      list.forEach((item, index) => {
        if (index % 3 === 0) {
          this.hotSettings.mergeCells.push(
            { row: index, col: 0, rowspan: 3, colspan: 1 },
            { row: index, col: 1, rowspan: 3, colspan: 1 },
            { row: index, col: 2, rowspan: 3, colspan: 1 },
            { row: index, col: 3, rowspan: 3, colspan: 1 },
            { row: index, col: 4, rowspan: 3, colspan: 1 },
            { row: index, col: 5, rowspan: 3, colspan: 1 },
            { row: index, col: 6, rowspan: 3, colspan: 1 },
            { row: index, col: 7, rowspan: 3, colspan: 1 },
            { row: index, col: 21, rowspan: 3, colspan: 1 },
            { row: index, col: 22, rowspan: 3, colspan: 1 },
            { row: index, col: 23, rowspan: 3, colspan: 1 },
            { row: index, col: 24, rowspan: 3, colspan: 1 }
          )
        }
      })
    },
    // 计算总合
    computedCount(list) {
      list.forEach((item, index) => {
        // 1 4 7 10
        if (index % 3 === 1) {
          const rate = parseFloat(this.$refs.textHot.hotInstance.getDataAtRow(index - 1).slice(7, 8)[0])
          const count = this.round(this.getCount(this.$refs.textHot.hotInstance.getDataAtRow(index).slice(9, 21)))
          const RMBCount = this.round(count / rate)
          this.$refs.textHot.hotInstance.setDataAtRowProp(index - 1, 'aggregate', count)
          this.$refs.textHot.hotInstance.setDataAtRowProp(index - 1, 'RMBAggregate', RMBCount)
        }
      })
    },
    // 给某个dom设定样式
    setStyle(dom) {
      dom.style.textAlign = 'center'
      dom.style.cursor = 'pointer'
    },
    // 添加渲染函数
    operationRender(instance, td, row) {
      if (row % 3 === 0) {
        // const deleteBtn = document.createElement('div')
        const infoBtn = document.createElement('div')
        // this.setStyle(deleteBtn)
        this.setStyle(infoBtn)
        // deleteBtn.innerText = '删除'
        infoBtn.innerText = '详细'
        // 给删除按钮注册事件
        // Handsontable.dom.addEvent(deleteBtn, 'click', () => {
        //   if (this.hotSettings.data.length=== 3) {
        //     this.$message({
        //       type: 'error',
        //       message: '最后一行，无法删除！'
        //     })
        //     return false;
        //   }
        //   this.$confirm('此操作将删除该行数据, 是否继续?', this.$t('comm.tips') , {
        //     confirmButtonText: this.$t('comm.certain'),
        //     cancelButtonText: this.$t('comm.cancel'),
        //     type: 'warning'
        //   }).then(() => {
        //     instance.alter('remove_row', row, 3)
        //     this.$message({
        //       type: 'success',
        //       message: '删除成功!'
        //     })
        //   }).catch(() => {
        //     this.$message({
        //       type: 'info',
        //       message: '已取消删除'
        //     })
        //   })
        // })
        // 给详情按钮注册事件
        Handsontable.dom.addEvent(infoBtn, 'click', () => {
          const subject = instance.getDataAtCell(row, 1)
          console.log(subject)
          if (!subject) {
            this.$message({
              type: 'waring',
              message: '请填写预算科目！'
            })
            return false
          }
          this.applyDetail = instance.getDataAtRow(row).slice(0, 2)
          this.applayDetailRow = row
          this.nowBudget = instance.getDataAtRow(row * 3 + 1).slice(9, 21)
          this.nextBudget = instance.getDataAtRow(row * 3 + 2).slice(9, 21)
          // 初始化表格数据
          this.detailDialog = true
          this.initDetailTable()
        })
        Handsontable.dom.empty(td)
        td.appendChild(infoBtn)
        // td.appendChild(deleteBtn)
        Handsontable.dom.addClass(td, 'htMiddle')
        return td
      }
    },
    //  初始化明细页面的表格
    initDetailTable() {
      this.$nextTick(() => {
        const dTable = this.$refs.detailHot
        if (this.detailSettings.data.length > 0) {
          console.log('进行了清除操作')
          dTable.hotInstance.alter('remove_row', 0, this.detailSettings.data.length)
        }
        if (this.hotSettings.data[this.applayDetailRow].budLinedatas.length <= 0) {
          // dTable.hotInstance.alter('insert_row', 0, 2)
          // // 填充默认数据
          // for (let i = 0; i < 2; i++) {
          //   dTable.hotInstance.setDataAtRowProp(i, 'remarks', i === 0 ? '当年预算' : '次年预算')
          // }
          // // 对单元格合并
          // this.detailSettings.mergeCells = [
          //   {row:0, col: 0, rowspan: 2, colspan: 1},
          //   {row: 0, col: 1, rowspan: 2, colspan: 1},
          //   {row: 0, col: 2, rowspan: 2, colspan: 1},
          //   {row: 0, col: 16, rowspan: 2, colspan: 1}
          // ]
        } else {
          console.log(this.hotSettings.data[this.applayDetailRow].budLinedatas)
          const list = this.hotSettings.data[this.applayDetailRow].budLinedatas
          dTable.hotInstance.loadData(list)
          // 合并单元格
          const mergeList = []
          console.log(this.detailSettings)
          console.log(this.detailSettings.mergeCells)
          list.forEach((item, index) => {
            if (index % 2 === 0) {
              mergeList.push(
                { row: index, col: 0, rowspan: 2, colspan: 1 },
                { row: index, col: 1, rowspan: 2, colspan: 1 },
                { row: index, col: 2, rowspan: 2, colspan: 1 },
                { row: index, col: 16, rowspan: 2, colspan: 1 })
            }
          })
          this.detailSettings.mergeCells = mergeList
        }
      })
    },
    // 保存明细数据
    closeDialog() {
      const budLinedatas = [...this.$refs.detailHot.hotInstance.getSourceData()]
      this.hotSettings.data[this.applayDetailRow].budLinedatas = [...budLinedatas]
      // console.log([...this.hotSettings.data[this.applayDetailRow].budLinedatas])
      this.detailSettings.data = [...budLinedatas]
    },
    // 计算数组的和
    getCount(list) {
      let count = 0
      list.forEach(item => {
        item = parseFloat(item)
        if (item && typeof item === 'number') {
          count += item
        }
      })
      return count
    },
    // 保留5位小数
    round(v) {
      return Math.floor(v * 10000) / 10000 || null
    }
  }
}
</script>
<style lang="scss" scoped>
.apply {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 5px #cac6c6;
  // display: flex;
  // flex-direction: column;
  overflow: auto;
  h3 {
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    border-bottom: 1px dashed #ccc;
    margin-bottom: 10px;
    position: relative;
    color: #333;
    .add_row {
      position: absolute;
      right: 0;
      bottom: 2px;
      border-radius: 6px;
      // border: 1px solid #ccc;
      cursor: pointer;
      font-size: 14px;
      width: 110px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      background-image: linear-gradient(rgb(52, 165, 248), rgb(8, 142, 240));
      color: #fff;
      &:hover {
        background-image: linear-gradient(rgb(42, 155, 238), rgb(8, 142, 240));
      }
    }
  }
  .condition {
    width: 100%;
    min-width: 650px;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
    & > div {
      width: 33.33%;
      box-sizing: border-box;
      padding: 5px 25px 20px 10px;
      display: flex;
      align-items: center;
      .title {
        width: 110px;
        font-size: 14px;
      }
      .el-input {
        flex: 1;
      }
      .select {
        flex: 1;
      }
    }
  }
  .table {
    width: 100%;
    font-size: 12px;
    // flex: 1;
    height: 400px;
    position: relative;
    // overflow: hidden;
    .table_info {
      width: 100%;
      // height: 100%;
      height: 400px;
      overflow: auto;
    }
  }
  .dialog {
    .detail {
      height: 500px;
      display: flex;
      flex-direction: column;
      // background-color: #ccc;
      .info {
        height: 60px;
        box-sizing: border-box;
        padding-bottom: 20px;
        width: 100%;
        display: flex;
        align-items: center;
        & > div {
          width: 33.3%;
          display: flex;
          box-sizing: border-box;
          padding: 0 20px;
          align-items: center;
          .title {
            width: 140px;
          }
        }
      }
      .btn {
        margin-top: 15px;
        text-align: right;
      }
      .detail_table {
        height: 350px;
        position: relative;
        overflow: auto;
        font-size: 12px;
      }
    }
  }
}
</style>
<style lang="scss">
.apply {
  .notread {
    background-color: #f5f7fa;
  }
  th:first-child {
    width: 0;
  }
  .submit {
    width: 100px;
    padding-top: 15px;
    box-sizing: border-box;
  }
}
</style>

