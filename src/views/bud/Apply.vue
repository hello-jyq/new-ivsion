<template>
  <div class="apply">
    <el-collapse v-model="activeNames">
      <el-collapse-item name="1">
        <span slot="title" class="collapse-title">{{ $t('comm.essentialInformation') }}</span>
        <div class="input_box">
          <div class="flex3">
            <div class="title">
              公司：
            </div>
            <div class="input">
              <el-input class="input" size="small" placeholder="大金空调（上海）有限公司" disabled />
            </div>
          </div>
          <div class="flex3">
            <div class="title">
              预算年度：
            </div>
            <div class="input">
              <el-select v-model="year" placeholder="请选择年度" size="small" class="select">
                <el-option v-for="item in yearList" :key="item" :label="item" :value="item" />
              </el-select>
            </div>
          </div>
          <div class="flex3">
            <div class="title">
              预算部门：
            </div>
            <div class="input">
              <el-input size="small" placeholder="11000" disabled />
            </div>
          </div>
          <div class="flex3">
            <div class="title">
              预算申请NO：
            </div>
            <div class="input">
              <el-input v-model="budControlid.budNo" size="small" disabled />
            </div>
          </div>
          <div class="flex3">
            <div class="title">
              审批状态：
            </div>
            <div class="input">
              <el-input size="small" disabled />
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="2">
        <h3 slot="title" class="collapse-title">
          预算明细
          <div class="add_row iconfont icon-jia" @click.stop="addRows">
            新增一行
          </div>
        </h3>
        <div class="table">
          <hot-table ref="textHot" :settings="hotSettings" class="table_info" />
        </div>
      </el-collapse-item>
    </el-collapse>

    <div class="btns" style="margin-top:10px">
      <el-button type="success" class="iconfont icon-save" @click="submit('save')">
        <!-- 保存 -->
        {{ $t('comm.save') }}
      </el-button>
      <el-button type="primary" class="iconfont icon-tijiao" @click="submit('apply')">
        {{ $t('comm.submit') }}
        <!-- 提交 -->
      </el-button>
      <el-button v-if="taskId" type="danger" class="el-icon-delete" @click="submit('delete')">
        {{ $t('comm.delete') }}
        <!-- 删除 -->
      </el-button>
    </div>
    <apply-detail
      :is-show="detailDialog"
      :now-budget="nowBudget"
      :next-budget="nextBudget"
      :count="count"
      :table-data="detailTableData"
      :input-detail="inputDetail"
      @change="change"
      @close="detailClose"
    />
    <!-- <el-dialog
      title="流水线别明细"
      :visible.sync="detailDialog"
      class="dialog"
      width="80%"
      top="20px"
      @close="detailDialogClose"
      :close-on-press-escape="false"
      modal
      :close-on-click-modal= 'false'
      center>
      <div class="detail">
        <div class="info">
          <div class="codition_department">
            <div class="title">预算部门：</div>
            <el-input size="small" placeholder="测试课" disabled :value="applyDetail.length && applyDetail[0]"></el-input>
          </div>
          <div class="codition_department">
            <div class="title">预算科目：</div>
            <el-input size="small" placeholder="预算科目" disabled :value="applyDetail.length && applyDetail[1]"></el-input>
          </div>
          <div class="codition_apply">
            <div class="title">预算申请编号：</div>
            <el-input size="small" disabled></el-input>
          </div>
        </div>
        <h3>预算明细<div class="add_row iconfont icon-jia" @click.stop="addDetailRows">新增一行</div></h3>
        <div class="detail_table">
          <hot-table ref="detailHot" :settings="detailSettings" class="table_info"></hot-table>
        </div>
        <div class="btn">
          <el-button @click="detailDialog = false">{{$t('comm.cancel')}}</el-button>
          <el-button type="primary" @click="saveDetail">{{$t('comm.certain')}}</el-button>
        </div>
      </div>
    </el-dialog> -->
  </div>
</template>
<script>
import { HotTable } from '@handsontable/vue'
import { Message } from 'element-ui'
import { mapGetters } from 'vuex'
import '@/../node_modules/handsontable/dist/handsontable.full.css'
import { saveHandson, applyHandson, deleteHandson, getBudInfo, getRate, getFinanceAccount } from '@/api/bud/bud.js'
import Handsontable from 'handsontable'
import ApplyDetail from './ApplyDetail.vue'
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
    HotTable,
    ApplyDetail
  },
  data() {
    return {
      activeNames: ['1', '2'],
      // 传入组件的数据
      detailTableData: [],
      budControlid: {},
      // 当前操作的行数
      applayDetailRow: 0,
      // 流水信息
      inputDetail: [],
      // 当年预算
      nowBudget: null,
      // 次年预算
      nextBudget: null,
      // 总合
      count: null,
      detailDialog: false,
      year: 2019,
      yearList: [2019, 2020, 2021, 2022],
      hotSettings: {
        data: [
          { orgId: 11000, hasLinedata: '否', budLinedatas: [] },
          { orgId: 11000 },
          { orgId: 11000 }
        ], // 数据在这个里面,由数据填充表
        colWidths: [100, 100, 60, 80, 100, 150, 80, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 100, 100, 100, 100], // 单元格宽
        manualColumnResize: true,
        manualRowResize: true,
        mergeCells: [
          { row: 0, col: 0, rowspan: 3, colspan: 1 },
          { row: 0, col: 1, rowspan: 3, colspan: 1 },
          { row: 0, col: 2, rowspan: 3, colspan: 1 },
          { row: 0, col: 3, rowspan: 3, colspan: 1 },
          { row: 0, col: 4, rowspan: 3, colspan: 1 },
          { row: 0, col: 5, rowspan: 3, colspan: 1 },
          { row: 0, col: 6, rowspan: 3, colspan: 1 },
          { row: 0, col: 7, rowspan: 3, colspan: 1 },
          { row: 0, col: 21, rowspan: 3, colspan: 1 },
          { row: 0, col: 22, rowspan: 3, colspan: 1 },
          { row: 0, col: 23, rowspan: 3, colspan: 1 },
          { row: 0, col: 24, rowspan: 3, colspan: 1 }
        ],
        cell: [
          { row: 0, col: 9, className: 'notread', editor: false },
          { row: 0, col: 10, className: 'notread', editor: false },
          { row: 0, col: 11, className: 'notread', editor: false },
          { row: 0, col: 12, className: 'notread', editor: false },
          { row: 0, col: 13, className: 'notread', editor: false },
          { row: 0, col: 14, className: 'notread', editor: false },
          { row: 0, col: 15, className: 'notread', editor: false },
          { row: 0, col: 16, className: 'notread', editor: false },
          { row: 0, col: 17, className: 'notread', editor: false },
          { row: 0, col: 18, className: 'notread', editor: false },
          { row: 0, col: 19, className: 'notread', editor: false },
          { row: 0, col: 20, className: 'notread', editor: false }
        ],
        autoRowSize: false,
        rowHeights: 30, // 单元格高
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
            className: 'htLeft hText',
            wordWrap: false
          },
          {
            data: 'currencyCode', // 货币代码
            type: 'dropdown', //  数据类型
            source: ['人民币', '日元', '美元'], // 值
            strict: true,
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
            type: 'numeric'
          },
          {
            data: 'value02', // 五月
            type: 'numeric'
          },
          {
            data: 'value03', // 六月
            type: 'numeric'
          },
          {
            data: 'value04', // 七月
            type: 'numeric'
          },
          {
            data: 'value05', // 八月
            type: 'numeric'
          },
          {
            data: 'value06', // 九月
            type: 'numeric'
          },
          {
            data: 'value07', // 十月
            type: 'numeric'
          },
          {
            data: 'value08', // 十一月
            type: 'numeric'
          },
          {
            data: 'value09', // 十二月
            type: 'numeric'
          },
          {
            data: 'value10', // 一月
            type: 'numeric'
          },
          {
            data: 'value11', // 二月
            type: 'numeric'
          },
          {
            data: 'value12', // 三月
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
        // @params: changes, source
        afterChange: function(changes) {
          // console.log(source)
          if (changes) {
            // let total = 0
            changes.forEach(([row, prop, oldValue, newValue]) => {
              // 监听到数值的变化，计算总数
              if ((row % 3 === 1 && row !== 0 && row !== 2) || row === 1) {
                if (oldValue === newValue) {
                  return false
                }
                if (!monthList.find(item => item === prop)) {
                  return false
                }
                // 计算年合计
                // console.log(this.getDataAtRow(row).slice(9,21))
                const count = getCount(this.getDataAtRow(row).slice(9, 21))
                const rate = this.getDataAtCell(row - 1, 7) || null
                // 设置年合计
                // console.log(count)
                this.setDataAtRowProp(row - 1, 'aggregate', round(count))
                if (rate) {
                  this.setDataAtRowProp(row - 1, 'RMBAggregate', round(count / rate))
                }
              }
              // 监听到货币的变化，获取汇率，计算出人命币年合计
              if (prop === 'currencyCode') {
                // 设置对应汇率的数值
                if (!newValue) {
                  return false
                }
                // console.log(newValue)
                const currencyCd = exchangeRateList[newValue].code
                const params = {
                  currencyCd
                }
                getRate(params).then(res => {
                  let rate = 1
                  if (res && res.success) {
                    rate = parseFloat(res.datas.currencyRate)
                  }
                  this.setDataAtRowProp(row, 'currencyRate', rate)
                  const count = this.getDataAtCell(row, 21) || null
                  if (!count) {
                    return false
                  }
                  const RMBcount = count / rate
                  this.setDataAtRowProp(row, 'RMBAggregate', round(RMBcount))
                })
              }
              // 监听到预算科目发生变化，获取其他信息
              if (prop === 'financeAccount') {
                if (!newValue) {
                  return false
                }
                const params = {
                  financeAccount: newValue
                }
                getFinanceAccount(params).then(res => {
                  // console.log(res)
                  if (res && res.success) {
                    // console.log(datas)
                    const mdBudacccode = res.datas.mdBudacccode
                    if (mdBudacccode) {
                      const { isControl, isFixed, scopeDesc } = mdBudacccode
                      this.setDataAtRowProp(row, 'isControl', isControl ? '是' : '否')
                      this.setDataAtRowProp(row, 'isFixed', isFixed)
                      this.setDataAtRowProp(row, 'scopeDesc', scopeDesc)
                    } else {
                      // 提示用户该科目不存在
                      Message({
                        type: 'error',
                        message: '找不到对应科目，请重新输入!'
                      })
                      this.setDataAtRowProp(row, 'financeAccount', null)
                      this.setDataAtRowProp(row, 'isControl', null)
                      this.setDataAtRowProp(row, 'isFixed', null)
                      this.setDataAtRowProp(row, 'scopeDesc', null)
                      return false
                    }
                  }
                })
              }
            })
          }
          // 保留5位小数 v：number
          function round(v) {
            return Math.floor(v * 10000) / 10000 || null
          }
          // 计算数组当中为数字的和
          function getCount(list) {
            let count = 0
            list.forEach(item => {
              if (item && typeof item === 'number') {
                count += item
              }
            })
            return count || null
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
            data: 'placelineId', // 单一流水线,
            className: 'htMiddle htCenter'
          },
          {
            data: 'placelineDetail', // 流水线共通
            className: 'htMiddle htCenter'
          },
          {
            data: 'placeuseId', // 使用场所
            className: 'htMiddle htCenter'
          },
          {
            data: 'remarks', // 备注
            readOnly: true,
            // className: 'htMiddle htCenter notread',
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
            data: 'value01', // 四月
            type: 'numeric'
          },
          {
            data: 'value02', // 五月
            type: 'numeric'
          },
          {
            data: 'value03', // 六月
            type: 'numeric'
          },
          {
            data: 'value04', // 七月
            type: 'numeric'
          },
          {
            data: 'value05', // 八月
            type: 'numeric'
          },
          {
            data: 'value06', // 九月
            type: 'numeric'
          },
          {
            data: 'value07', // 十月
            type: 'numeric'
          },
          {
            data: 'value08', // 十一月
            type: 'numeric'
          },
          {
            data: 'value09', // 十二月
            type: 'numeric'
          },
          {
            data: 'value10', // 一月
            type: 'numeric'
          },
          {
            data: 'value11', // 二月
            type: 'numeric'
          },
          {
            data: 'value12', // 三月
            type: 'numeric'
          },
          {
            data: 'operation', // 操作
            readOnly: true,
            renderer: this.detailRender,
            className: 'htMiddle htCenter'
          }
        ]
        // afterChange: function(changes, source) {
        //   console.log(changes, source)
        // }
      }
    }
  },
  computed: {
    taskId: function() { return this.$route.query.taskId },
    processInstId: function() { return this.$route.query.processInstId },
    budControlidId: function() { return this.$route.query.businessKey },
    ...mapGetters(['isCollapse'])
  },
  watch: {
    isCollapse() {
      // console.log(this.$refs.textHot.hotInstance)
      setTimeout(() => {
        this.$refs.textHot.hotInstance.render()
      }, 210)
    },
    '$route': function() {
      this.$router.go(0)
    }
  },
  created() {
    // console.log('wozi')
  },
  async mounted() {
    if (!this.budControlidId) {
      return
    }
    const res = await getBudInfo({ budControlidId: this.budControlidId })
    if (res && res.success) {
      this.budControlid = res.datas.budControlid
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
    // 保留5位小数
    round(v) {
      return Math.floor(v * 10000) / 10000 || null
    },
    // 给某个dom设定样式
    setStyle(dom) {
      dom.style.textAlign = 'center'
      dom.style.cursor = 'pointer'
    },
    // 添加渲染函数
    // @param: instance, td, row, col, prop, value, cellProperties
    operationRender(instance, td, row) {
      if (row % 3 === 0) {
        const deleteBtn = document.createElement('div')
        const infoBtn = document.createElement('div')
        this.setStyle(deleteBtn)
        this.setStyle(infoBtn)
        deleteBtn.innerText = '删除'
        infoBtn.innerText = '详细'
        // 给删除按钮注册事件
        Handsontable.dom.addEvent(deleteBtn, 'click', () => {
          if (this.hotSettings.data.length === 3) {
            this.$message({
              type: 'error',
              message: '最后一行，无法删除！'
            })
            return false
          }
          this.$confirm('此操作将删除该行数据, 是否继续?', this.$t('comm.tips'), {
            confirmButtonText: this.$t('comm.certain'),
            cancelButtonText: this.$t('comm.cancel'),
            type: 'warning'
          }).then(() => {
            instance.alter('remove_row', row, 3)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        })
        // 给详情按钮注册事件
        Handsontable.dom.addEvent(infoBtn, 'click', () => {
          const subject = instance.getDataAtCell(row, 1)
          const rate = instance.getDataAtCell(row, 7)
          // console.log(subject)
          if (!subject) {
            this.$message({
              type: 'waring',
              message: '请填写预算科目！'
            })
            return false
          }
          if (!rate) {
            this.$message({
              type: 'waring',
              message: '请选择货币种类！'
            })
            return false
          }
          console.log(this.hotSettings.data[row].budLinedatas)
          this.detailTableData = this.hotSettings.data[row].budLinedatas
          this.inputDetail = instance.getDataAtRow(row).slice(0, 2)
          this.applayDetailRow = row
          this.nowBudget = instance.getDataAtRow(row + 1).slice(9, 21)
          this.nextBudget = instance.getDataAtRow(row + 2).slice(9, 21)
          this.count = instance.getDataAtCell(row, 21)
          // 初始化表格数据
          this.detailDialog = true
          // this.initDetailTable()
        })
        Handsontable.dom.empty(td)
        td.appendChild(infoBtn)
        td.appendChild(deleteBtn)
        Handsontable.dom.addClass(td, 'htMiddle')
        return td
      }
    },
    // detailRender (instance, td, row) {
    //   if (row % 2 === 0) {
    //     const deleteBtn1 = document.createElement('div')
    //     this.setStyle(deleteBtn1)
    //     deleteBtn1.innerText = '删除'
    //     // 给删除按钮注册事件
    //     Handsontable.dom.addEvent(deleteBtn1, 'click', () => {
    //       if (this.detailSettings.data.length=== 2) {
    //         this.$message({
    //           type: 'error',
    //           message: '最后一行，无法删除！'
    //         })
    //         return false;
    //       }
    //       this.$confirm('此操作将删除该行数据, 是否继续?', this.$t('comm.tips') , {
    //         confirmButtonText: this.$t('comm.certain'),
    //         cancelButtonText: this.$t('comm.cancel'),
    //         type: 'warning'
    //       }).then(() => {
    //         instance.alter('remove_row', row, 2)
    //         this.$message({
    //           type: 'success',
    //           message: '删除成功!'
    //         })
    //       }).catch(() => {
    //         this.$message({
    //           type: 'info',
    //           message: '已取消删除'
    //         })
    //       })
    //     })
    //     Handsontable.dom.empty(td)
    //     td.appendChild(deleteBtn1)
    //     Handsontable.dom.addClass(td, 'htMiddle')
    //     return td
    //   }
    // },
    // 添加一行数据
    addRows() {
      const hot = this.$refs.textHot
      const dataLength = this.hotSettings.data.length
      hot.hotInstance.alter('insert_row', dataLength, 3)
      // console.log(hot.hotInstance)
      // 对数据进行填充
      // hot.setDataAtRowProp([
      //   [row, prop, value, source]
      // ])
      for (let i = dataLength; i < dataLength + 3; i++) {
        hot.hotInstance.setDataAtRowProp(i, 'orgId', 11000)
        hot.hotInstance.setDataAtRowProp(i, 'hasLinedata', '否')
        hot.hotInstance.setDataAtRowProp(i, 'budLinedatas', [])
      }
      // 让某些按钮只读
      const coList = JSON.stringify(this.hotSettings.cell)
      const newList = JSON.parse(coList).map(item => {
        item.row = dataLength
        return item
      })
      this.hotSettings.cell.push(...newList)
      // this.hotSettings.cell=[this.hotSettings.cell, ...newList]
      // 对单元格进行合并
      this.hotSettings.mergeCells.push(
        { row: dataLength, col: 0, rowspan: 3, colspan: 1 },
        { row: dataLength, col: 1, rowspan: 3, colspan: 1 },
        { row: dataLength, col: 2, rowspan: 3, colspan: 1 },
        { row: dataLength, col: 3, rowspan: 3, colspan: 1 },
        { row: dataLength, col: 4, rowspan: 3, colspan: 1 },
        { row: dataLength, col: 5, rowspan: 3, colspan: 1 },
        { row: dataLength, col: 6, rowspan: 3, colspan: 1 },
        { row: dataLength, col: 7, rowspan: 3, colspan: 1 },
        { row: dataLength, col: 21, rowspan: 3, colspan: 1 },
        { row: dataLength, col: 22, rowspan: 3, colspan: 1 },
        { row: dataLength, col: 23, rowspan: 3, colspan: 1 },
        { row: dataLength, col: 24, rowspan: 3, colspan: 1 },)
    },
    detailClose(state) {
      this.detailDialog = state
    },
    // 明细页添加一行数据
    // addDetailRows () {
    //   const dTable = this.$refs.detailHot
    //   // if (this.d)
    //   const dLength = dTable.hotInstance.getSourceData().length
    //   console.log(dLength)
    //   dTable.hotInstance.alter('insert_row', dLength, 2)
    //   // 对单元格合并
    //   this.detailSettings.mergeCells.push(
    //     {row: dLength, col: 0, rowspan: 2, colspan: 1},
    //     {row: dLength, col: 1, rowspan: 2, colspan: 1},
    //     {row: dLength, col: 2, rowspan: 2, colspan: 1},
    //     {row: dLength, col: 16, rowspan: 2, colspan: 1}
    //   )
    // },
    //  初始化明细页面的表格
    // initDetailTable () {
    //   this.$nextTick(() => {
    //     const dTable = this.$refs.detailHot
    //     // if (this.detailSettings.data.length > 0) {
    //     //   console.log('执行了清空操作')
    //     //   dTable.hotInstance.alter('remove_row', 0, this.detailSettings.data.length)
    //     // }
    //     if (this.hotSettings.data[this.applayDetailRow].budLinedatas.length <= 0) {
    //       console.log('新增两行')
    //       dTable.hotInstance.alter('insert_row', 0, 2)
    //       // 对单元格合并
    //       this.detailSettings.mergeCells = [
    //         {row:0, col: 0, rowspan: 2, colspan: 1},
    //         {row: 0, col: 1, rowspan: 2, colspan: 1},
    //         {row: 0, col: 2, rowspan: 2, colspan: 1},
    //         {row: 0, col: 16, rowspan: 2, colspan: 1}
    //       ]
    //     } else {
    //       console.log('取得历史数据')
    //       // console.log(this.hotSettings.data[this.applayDetailRow].budLinedatas)
    //       const list = this.hotSettings.data[this.applayDetailRow].budLinedatas
    //       // this.hotSettings.data[this.applayDetailRow].budLinedatas = list
    //       this.detailSettings.data = list
    //       // dTable.hotInstance.loadData(list)
    //       // 合并单元格
    //       let mergeList = []
    //       console.log(list)
    //       list.forEach((item, index) => {
    //         if (index % 2 === 0) {
    //           mergeList.push(
    //             {row: index, col: 0, rowspan: 2, colspan: 1},
    //             {row: index, col: 1, rowspan: 2, colspan: 1},
    //             {row: index, col: 2, rowspan: 2, colspan: 1},
    //             {row: index, col: 16, rowspan: 2, colspan: 1})
    //         }
    //       })
    //       this.detailSettings.mergeCells = mergeList
    //       dTable.hotInstance.updateSettings(this.detailSettings)
    //     }
    //   })
    // },
    // 保存明细数据
    // saveDetail () {
    //   let flag = true
    //   let message = ''
    //   let nowCountList = []
    //   let nextCountList = []
    //   const hot = this.$refs.detailHot
    //   // 对前三列数据进行非空校验
    //   for(let i = 0; i < 3; i++) {
    //     hot.hotInstance.getDataAtCol(i).forEach((item, index) => {
    //       if (!item && index % 2 === 0) {
    //         console.log(i)
    //         const msg = i===0 ? '流水线单一' : i===1 ? '流水线共通' : '使用场所'
    //         console.log(msg)
    //         message = `${msg}不能为空`
    //         flag = false
    //         return false
    //       }
    //     })
    //     if (!flag) {
    //       this.$message({
    //         type: 'error',
    //         message
    //       })
    //       return false
    //     }
    //   }
    //   // 计算出4-3月每一列数的总合
    //   for (let i = 4; i < 16; i++) {
    //     let nowCount = 0
    //     let nextCount = 0
    //     hot.hotInstance.getDataAtCol(i).forEach((item, index) => {
    //       // 当检测出填的数据不是数字的时候，提示用户
    //       if (item && typeof item !== 'number') {
    //         flag = false
    //         message = '请填写正确格式的数据'
    //         return false
    //       }
    //       if (index % 2 === 0) {
    //         // 当年的每条总和
    //         nowCount += item
    //         console.log(item)
    //       } else {
    //         // 预算的每条总和
    //         nextCount += item
    //       }
    //     })
    //     if (!flag) {
    //       this.$message({
    //         type: 'error',
    //         message
    //       })
    //       return false
    //     }
    //     nowCountList = [...nowCountList, nowCount == 0 ? null : nowCount - 0]
    //     nextCountList = [...nextCountList, nextCount == 0 ? null : nextCount - 0]
    //   }
    //   // 获得数据后，与主表数据做对比做校验
    //   // 当年预算的数据对比
    //   const errorNum = this.nowBudget.find((item, i) => {
    //     return item && item !== nowCountList[i]
    //   })
    //   const errorMonth = this.nowBudget.findIndex((item, i) => {
    //     return item && item !== nowCountList[i]
    //   })
    //   if (errorMonth !== -1) {
    //     let month
    //     if (errorMonth < 9) {
    //       month = errorMonth + 4
    //     } else {
    //       month = errorMonth - 8
    //     }
    //     this.$message({
    //       type: 'error',
    //       message: `${month}月当年预算总合应为${errorNum}`
    //     })
    //     return false
    //   }
    //   // 次年预算的数据对比
    //   const nextErrorNum = this.nextBudget.find((item, i) => {
    //     return item && item !== nextCountList[i]
    //   })
    //   const nextErrorMonth = this.nextBudget.findIndex((item, i) => {
    //     return item && item !== nextCountList[i]
    //   })
    //   if (nextErrorMonth !== -1) {
    //     let month
    //     if (nextErrorMonth < 9) {
    //       month = nextErrorMonth + 4
    //     } else {
    //       month = nextErrorMonth - 8
    //     }
    //     this.$message({
    //       type: 'error',
    //       message: `${month}月次年预算总合应为${nextErrorNum}`
    //     })
    //     return false
    //   }
    //   // 当主表有数据时
    //   if (this.count) {
    //     const count = this.getCount(nowCountList)
    //     if (this.count != count) {
    //       this.$message({
    //         type: 'error',
    //         message: `合计应为${this.count}`
    //       })
    //       return false
    //     }
    //   }
    //   // console.log(errorNum)
    //   // console.log(errorMonth)
    //   // nowBudget
    //   // nextBudget
    //   // 添加数据到主表
    //   this.addBudgetList(this.applayDetailRow + 1, nowCountList)
    //   this.addBudgetList(this.applayDetailRow + 2, nextCountList)
    //   const budLinedatas = [...hot.hotInstance.getSourceData()]
    //   this.hotSettings.data[this.applayDetailRow].budLinedatas = budLinedatas
    //   this.detailSettings.data = {}
    //   if (budLinedatas.length > 2) {
    //     this.$refs.textHot.hotInstance.setDataAtRowProp(this.applayDetailRow, 'hasLinedata', '是')
    //   } else {
    //     this.$refs.textHot.hotInstance.setDataAtRowProp(this.applayDetailRow, 'hasLinedata', '否')
    //   }
    //   window.setTimeout(() => {
    //     this.detailDialog = false
    //   }, 400)
    // },
    // 关闭dialogClose的时候
    // detailDialogClose () {
    //   const hot = this.$refs.detailHot
    //   const budLinedatas = [...hot.hotInstance.getSourceData()]
    //   // this.hotSettings.data[this.applayDetailRow].budLinedatas = budLinedatas
    //   this.detailSettings.data = budLinedatas
    // },
    // detali组件数据提交时
    change({ list, nowCountList, nextCountList }) {
      // 添加数据到主表
      console.log(list)
      console.log(nowCountList)
      console.log(nextCountList)
      this.addBudgetList(this.applayDetailRow + 1, nowCountList)
      this.addBudgetList(this.applayDetailRow + 2, nextCountList)
      this.hotSettings.data[this.applayDetailRow].budLinedatas = list
      this.$refs.textHot.hotInstance.setDataAtRowProp(this.applayDetailRow, 'hasLinedata', '是')
      // if (list.length > 2) {
      //   this.$refs.textHot.hotInstance.setDataAtRowProp(this.applayDetailRow, 'hasLinedata', '是')
      // } else {
      //   this.$refs.textHot.hotInstance.setDataAtRowProp(this.applayDetailRow, 'hasLinedata', '否')
      // }
      // window.setTimeout(() => {
      //   this.detailDialog = false
      // }, 400)
    },
    // 给主表某行添加预算数据
    addBudgetList(row, list) {
      // console.log(list)
      const hot = this.$refs.textHot
      monthList.forEach((item, index) => {
        hot.hotInstance.setDataAtRowProp(row, item, list[index] === 0 ? null : list[index])
      })
    },
    // 保存提交数据
    async submit(type) {
      const check = this.submitCheck()
      if (!check) {
        return false
      }
      const hot = this.$refs.textHot
      // console.log(hot.hotInstance.getSourceData())
      const list = hot.hotInstance.getSourceData().map(item => {
        if (item.currencyCode) {
          item.currencyCd = exchangeRateList[item.currencyCode].code
        }
        item.isControl = item.isControl === '是' ? '1' : '0'
        item.hasLinedata = item.hasLinedata === '是' ? '1' : '0'
        return item
      })
      this.budControlid.id = this.budControlidId
      this.budControlid.budControlidId = this.budControlidId
      this.budControlid.taskId = this.taskId
      this.budControlid.orgId = 11000
      this.budControlid.budYear = this.year
      this.budControlid.budControlidDetailHandsons = list
      // console.log(this.budControlid)
      let res
      if (type === 'apply') {
        res = await applyHandson(this.budControlid)
      } else if (type === 'save') {
        res = await saveHandson(this.budControlid)
      } else {
        res = await deleteHandson(this.budControlid)
      }
      if (res && res.success) {
        console.log(this.hotSettings.data.length)
        if (type === 'delete') {
          this.$router.push('/workflow/tasks')
        } else {
          this.$router.push(`/bud/${res.datas.budControlidId}`)
        }
        // this.clearHandsontable()
        // window.location.reload()
      }
    },
    // 计算数组的和
    getCount(list) {
      let count = 0
      list.forEach(item => {
        if (item && typeof item === 'number') {
          count += item
        }
      })
      return count
    },
    // 提交前校验
    submitCheck() {
      // const list = [1,7,9,10,11,12,13,14,15,16,17,18,19,20]
      const list = [1, 7]
      let flag = true
      let message = ''
      for (var i = 0; i < 23; i++) {
        if (list.find(item => item === i)) {
          this.$refs.textHot.hotInstance.getDataAtCol(i).forEach((item, index) => {
            if (!item && index % 3 === 0) {
              flag = false
              message = `${this.hotSettings.colHeaders[i]}不能为空`
              return false
            }
          })
        }
        if (!flag) {
          // console.log(message)
          this.$message({
            type: 'error',
            message
          })
          return false
        }
      }
      return flag
    },
    clearHandsontable() {
      this.$refs.textHot.hotInstance.alter('remove_row', 3, this.hotSettings.data.length - 3)
      this.$refs.textHot.hotInstance.clear()
      this.$refs.textHot.hotInstance.setDataAtRowProp(0, 'isControl', null)
      this.$refs.textHot.hotInstance.setDataAtRowProp(0, 'isFixed', null)
      this.$refs.textHot.hotInstance.setDataAtRowProp(0, 'scopeDesc', null)
      this.$refs.textHot.hotInstance.setDataAtRowProp(0, 'currencyRate', null)
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
    // height: 40px;
    // line-height: 40px;
    font-size: 18px;
    // border-bottom: 1px dashed #ccc;
    // margin-bottom: 10px;
    position: relative;
    // color: #000;
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
  .table {
    width: 99%;
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
  .btns {
    padding-top: 10px;
  }
}
</style>
<style lang="scss">
.apply {
  .notread {
    background-color: #f5f7fa;
  }
  .hText {
    // overflow: hidden;
    text-overflow: ellipsis;
    // display: -webkit-box;
    // -webkit-line-clamp: 3;
    // -webkit-box-orient: vertical;
  }
  th:first-child {
    width: 0;
  }
  .submit {
    width: 200px;
    padding-top: 15px;
    box-sizing: border-box;
  }
}
</style>

