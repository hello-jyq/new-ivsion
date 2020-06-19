<template>
  <el-dialog
    title="通信费"
    top="0"
    class="content-dialog-box"
    custom-class="dialog-drag market-drag baf"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    @close="onClose"
  >
    <div style="display: flex;flex-direction: column;height: 100%;overflow：hidden">
      
      <div ref="table" class="dialog-table-box" style="overflow：auto">
        <hot-table ref="editTab" :settings="hotSettings" />
      </div>
      <ul class="operation-box dialog-btn-box  end-content-flex">
        <li class="operation-item" @click="onClose()">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
          <span class="operation-text">取&nbsp;消</span>
        </li>
        <li class="operation-item" @click="onConfirm()">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
          <span class="operation-text">确&nbsp;认</span>
        </li>
      </ul>
    </div>
  </el-dialog>
</template>
<script>
import $ from 'jquery'
import 'jquery.nicescroll'

import Handsontable from 'handsontable'
import { HotTable } from '@handsontable/vue'
var elementResizeDetectorMaker = require('element-resize-detector')

export default {
  components: {
    HotTable
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scrollColr: '#5A5E63',
      hotSettings: {
        width: '100%',
        height: '100%',
        className: 'editTable',
        // rowHeights: 40, // 行高
        // 定义数据
        data: [
          {
            'teplItemId': 'item10001',
            'budDiv': '1',
            'itemDiv': 'itemGroup',
            'itemName': '従業員給与',
            'isChildren': '0',
            'parentItemId': '',
            'isChangeEnable': '0',
            'sortNo': '1',
            'jan': '20,000.08',
            'feb': '20,000.08',
            'mar': '20,000.08',
            'apr': '20,000.08',
            'may': '20,000.08',
            'jun': '20,000.08',
            'jul': '20,000.08',
            'aug': '20,000.08',
            'sept': '20,000.08',
            'oct': '20,000.08',
            'nov': '20,000.08',
            'dec': '20,000.08',
            'firstHalfYear': '100,000.08',
            'secondHalfYear': '100,000.08',
            'total': '200,000.08',
            'totalItemDetails': [
            ]

          },
          {
            'teplItemId': 'item10001',
            'budDiv': '2',
            'itemDiv': 'itemGroup',
            'itemName': '従業員給与',
            'isChildren': '0',
            'parentItemId': '',
            'isChangeEnable': '0',
            'sortNo': '1',
            'jan': '20,000.08',
            'feb': '20,000.08',
            'mar': '20,000.08',
            'apr': '20,000.08',
            'may': '20,000.08',
            'jun': '20,000.08',
            'jul': '20,000.08',
            'aug': '20,000.08',
            'sept': '20,000.08',
            'oct': '20,000.08',
            'nov': '20,000.08',
            'dec': '20,000.08',
            'firstHalfYear': '100,000.08',
            'secondHalfYear': '100,000.08',
            'total': '200,000.08',
            'totalItemDetails': [
            ]
          },
          {
            'teplItemId': 'item10001',
            'budDiv': '3',
            'itemDiv': 'itemGroup',
            'itemName': '従業員給与',
            'isChildren': '0',
            'parentItemId': '',
            'isChangeEnable': '0',
            'sortNo': '1',
            'jan': '20,000.08',
            'feb': '20,000.08',
            'mar': '20,000.08',
            'apr': '20,000.08',
            'may': '20,000.08',
            'jun': '20,000.08',
            'jul': '20,000.08',
            'aug': '20,000.08',
            'sept': '20,000.08',
            'oct': '20,000.08',
            'nov': '20,000.08',
            'dec': '20,000.08',
            'firstHalfYear': '100,000.08',
            'secondHalfYear': '100,000.08',
            'total': '200,000.08',
            'totalItemDetails': [
            ]
          }
        ],
        // 定义表结构
        colHeaders: [
          '类别',
          '合计',
          '上半年',
          '下半年',
          '一月',
          '二月',
          '三月',
          '四月',
          '五月',
          '六月',
          '七月',
          '八月',
          '九月',
          '十月',
          '十一月',
          '十二月'
        ],
        // 单元格宽
        colWidths: [60, 135, 135, 135, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102],
        autoWrapRow: false,
        columns: [
          // 添加每一列的数据类型和一些配置
          {
            data: 'budDiv', // 类别,
            type: 'text',
            className: 'htMiddle  notread',
            readOnly: true,
            renderer: this.operationRender
          },
          {
            data: 'total', // 合计
            type: 'numeric',
            readOnly: true,
            className: 'htMiddle htRight'
          },
          {
            data: 'firstHalfYear',
            type: 'numeric',
            className: 'htMiddle htRight tdNone'
          },
          {
            data: 'secondHalfYear',
            type: 'numeric',
            className: 'htMiddle htRight tdNone'
          },
          {
            data: 'jan',
            type: 'numeric',
            className: 'htMiddle htRight',
            renderer: this.userCheck
          },
          {
            data: 'feb',
            type: 'numeric',
            className: 'htMiddle htRight',
            renderer: this.userCheck
          },
          {
            data: 'mar',
            type: 'numeric',
            className: 'htMiddle htRight',
            renderer: this.userCheck
          }, {
            data: 'apr',
            type: 'numeric',
            className: 'htMiddle htRight',
            renderer: this.userCheck
          },
          {
            data: 'may', // 五月
            type: 'numeric',
            className: 'htMiddle htRight',
            renderer: this.userCheck
          },
          {
            data: 'jun', // 六月
            type: 'numeric',
            className: 'htMiddle htRight',
            renderer: this.userCheck
          },
          {
            data: 'jul', // 七月
            type: 'numeric',
            className: 'htMiddle htRight',
            renderer: this.userCheck
          },
          {
            data: 'aug', // 八月
            type: 'numeric',
            className: 'htMiddle htRight',
            renderer: this.userCheck
          },
          {
            data: 'sept', // 九月
            type: 'numeric',
            className: 'htMiddle htRight',
            renderer: this.userCheck
          },
          {
            data: 'oct', // 十月
            type: 'numeric',
            className: 'htMiddle htRight',
            renderer: this.userCheck
          },
          {
            data: 'nov', // 十一月
            type: 'numeric',
            className: 'htMiddle htRight',
            renderer: this.userCheck
          },
          {
            data: 'dec', // 十二月
            type: 'numeric',
            className: 'htMiddle htRight',
            renderer: this.userCheck
          }
        ],
        // hiddenColumns: {
        //   copyPasteEnabled: true,
        //   indicators: true,
        //   columns: [2, 3]
        // },
        customBorder: true,
        // customBorders: [
        //   {            range:
        //     {
        //       from: { row: 2, col: 4 },
        //       to: { row: 3, col: 8 }
        //     },
        //     top: { width: 1, color: 'red' },
        //     left: { width: 1, color: 'red' },
        //     bottom: { width: 1, color: 'red' },
        //     right: { width: 1, color: 'red' }
        //   },],
        renderAllRows: true,
        autoColumnSize: true,
        manualColumnResize: true, // 列可拖拽调整大小
        manualRowResize: true, // 列可拖拽调整大小
        //  autoColumnSize: true, // 自适应列大小
        autoWrapRow: true, // 自动换行
        possible: false,
        fillHandle: false, // 选中拖拽复制 possible values: true, false, "horizontal", "vertical"
        fixedColumnsLeft: 2, // 固定左边列数
        fixedRowsTop: 0, // 固定顶部多少行不能垂直滚动
        stretchH: 'all', // 根据宽度横向扩展，last:只扩展最后一列，none：默认不扩展
        cells: this.rowReadonly,
        contextMenu: false,
        afterOnCellMouseDown: this.cellClick,
        afterChange: this.afterChange
      },
      isShowYear: false
    }
  },
  watch: {
    dialogVisible: function (newVal) {
      this.$nextTick(function () {
        // this.getEditScroll()
        this.getScrollBar()
      })
    },
  },
  mounted() {
    console.log('Handsontable', Handsontable)

    // 拖拽
    $('.market-drag').draggable({
      cursor: 'move',
      handle: '.el-dialog__header',
      refreshPositions: true,
      containment: 'parent',
      stop() {
        // $('.wtHolder').getNiceScroll().resize()
        this.getScrollBar()
        $('.wtHolder').getNiceScroll().resize()
      }
    })
    // 缩放
    // const self = this
    $('.market-drag').resizable({
      aspectRatio: false,
      containment: '.content-dialog-box'
    })

    var erd = elementResizeDetectorMaker()
    var that = this
    erd.listenTo(document.getElementsByClassName('dialog-drag')[0], function (element) {
      // that.$nextTick(function () {
      //   // this.getEditScroll()
      //   this.getScrollBar()
      //   // $('.wtHolder').getNiceScroll().resize()
      //   $('.wtHolder').getNiceScroll().resize()
      // })
    })
    this.$nextTick(function () {
      this.getScrollBar()
      $('.wtHolder').getNiceScroll().resize()
    })
  },
  methods: {
    // 列点击
    cellClick(event, coords, TD) {
      if (coords.row === -1 && coords.col === 1) {
        console.log('coords', coords)
        console.log('TD', TD)
        // this.isShowYear = !this.isShowYear
        // if (this.isShowYear === true) {
        //   $('.iconjiantouarrowhead7').show()
        //   $('.iconjiantouyou').hide()
        // } else {
        //   $('.iconjiantouarrowhead7').hide()
        //   $('.iconjiantouyou').show()
        // }
      }
    },
    // 自定义类别内容
    operationRender(instance, td, row, col, prop, value, cellProperties) {
      if (value === '1') {
        Handsontable.dom.empty(td)
        td.innerText = '预算'
        Handsontable.dom.addClass(td, 'htDimmed htMiddle')
        return td
      } else if (value === '2') {
        Handsontable.dom.empty(td)
        td.innerText = '估算'
        Handsontable.dom.addClass(td, 'htDimmed htMiddle')
        return td
      } else {
        Handsontable.dom.empty(td)
        td.innerText = '实绩'
        Handsontable.dom.addClass(td, 'htDimmed htMiddle')
        return td
      }
    },
    // 行只读
    rowReadonly(row, col, prop) {
      var cellProperties = {}
      if (row === 0 || col === 0) {
        cellProperties.readOnly = true
      }
      if (prop === 'total' || prop === 'firstHalfYear' || prop === 'secondHalfYear') {
        cellProperties.readOnly = true
      }
      return cellProperties
    },
    afterChange(changes, source) {
      // this.getScrollBar()
      // if (changes) {
      //   // let total = 0
      //   changes.forEach(([row, prop, oldValue, newValue]) => {
      //     // 监听到数值的变化，计算总数
      //     if (oldValue === newValue || /^(-?\d+)(\.\d+)?$/.test(newValue) === false) {
      //       return false
      //       console.log(this.setDataAtRowProp)
      //       this.setDataAtRowProp(row, 'apr', this.css('background', "red"))
      //     } else {
      //       console.log(4444, round(newValue))
      //       this.$refs.editTab.hotInstance.render()
      //       console.log(this.$refs.editTab.hotInstance)
      //     }
      //   })
      // }
      // // 保留2位小数 v：number
      // function round(v) {
      //   return Math.floor(v * 100) / 100 || null
      // }
    },
    userCheck(instance, td, row, col, prop, value, cellProperties) {
      Handsontable.dom.addClass(td, 'htMiddle htRight')

      // return td

      function formatCurrency(num) {
        num = num.toString().replace(/[^\d\.-]/g, ''); //转成字符串并去掉其中除数字, . 和 - 之外的其它字符。
        if (isNaN(num)) num = "0";  //是否非数字值
        var sign = (num == (num = Math.abs(num)));
        num = Math.floor(num * 100 + 0.50000000001); //下舍入
        var cents = num % 100;  //求余 余数 = 被除数 - 除数 * 商
        cents = (cents < 10) ? "0" + cents : cents; //小于2位数就补齐
        num = Math.floor(num / 100).toString();
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) { //每隔三位小数分始开隔
          //4 ==> 三位小数加一个分隔符，
          num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
        }
        return (((sign) ? '' : '-') + num + '.' + cents);
      }
      if (value.toString().includes(",") != true) {
        if (/^(-?\d+)(\.\d+)?$/.test(value) === false) {
          Handsontable.dom.addClass(td, 'htMiddle htRight erro')
          return td.innerText = value
        } else {
          Handsontable.dom.addClass(td, 'htMiddle htRight')
          return td.innerText = formatCurrency(value)

        }
      }
      td.innerText = value
    },
    saveData() {
      var examData = this.$refs.editTable.table.getData()

      console.log(examData)
    },

    getScrollBar() {
      $('.wtHolder').niceScroll({
        cursorcolor: localStorage.getItem('theme') === 'Light' ? '#D8E0E8' : '#5A5E63',
        cursoropacitymin: 0, // 当滚动条是隐藏状态时改变透明度, 值范围 1 到 0
        cursoropacitymax: 1, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
        cursorwidth: '8px', // 滚动条的宽度，单位：便素
        cursorborder: `1px solid ${localStorage.getItem('theme') === 'Light' ? '#D8E0E8' : '#5A5E63'}`, // CSS方式定义滚动条边框
        autohidemode: true, // 隐藏滚动条的方式, 可用的值:
        zindex: 0,
        railpadding: {
          top: 0,
          right: 0,
          left: 0,
          bottom: 0
        },
        boxzoom: false,
        iframeautoresize: true // 在加载事件时自动重置iframe大小
      })
    },
    onClose() {
      this.$emit('onClose', false)
      // this.dialogVisible = false
    }

  }
}
</script>
<style lang="scss">
.baf {
  width: 1400px;
}
.erro {
  background: red !important;
}
.wtHolder::-webkit-scrollbar {
  display: none;
}
.wtHolder::-ms-scrollbar {
  display: none;
}
.content-dialog-box .market-drag {
  .el-dialog__body {
    margin: -8px;
    padding: 8px;
  }
  .dialog-table-box {
    padding: 12px;
    background: linear-gradient(180deg, #34393f 0%, #16171b 100%);
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.5);
    border-radius: 16px;
  }
  // #app .handsontable td.htInvalid {
  //   background-color: transparents !important;
  // }
  .editTable {
    height: 100%;

    th {
      height: 46px !important;
      background: #26272c;
      border-color: #44474e;
      .relative {
        span {
          line-height: 46px;
          color: #ffffff;
        }
      }
    }
    td {
      line-height: 38px;
      height: 38px;
      color: #ffffff;
      background: #34393f;
      border-color: #44474e;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      // display: inherit;
    }

    tr:nth-child(even) td {
      background: #26272c;
    }
    .wtBorder {
      display: none !important;
    }
    // .handsontableInputHolder textarea {
    //   overflow: hidden;
    //   height: 10px !important;
    // }
  }

  // .handsontable {
  //   height: 100%;
  // }

  // .handsontable table,
  // .handsontable tbody,
  // .handsontable thead,
  // .handsontable td,
  // .handsontable th,
  // .handsontable input,
  // .handsontable textarea,
  // .handsontable div {
  //   box-sizing: border-box;
  // }
  // .handsontable .wtSpreader {
  //   min-width: 100%;
  // }
  // .handsontable tr:first-child th {
  //   height: 50px !important;
  //   line-height: 50px;
  //   font-family: "微软雅黑";
  //   font-size: 16px;
  //   color: #ffffff;
  //   background-color: #26272c;
  // }
  // .handsontable thead th .relative {
  //   padding: 0 4px;
  // }
  // .ht_clone_top,
  // .wtHolder,
  // .htCore {
  //   width: 100% !important;
  //   overflow: hidden;
  // }
  // .wtHider {
  //   width: 100% !important;
  // }
  // .handsontable .htDimmed {
  //   color: #888888;
  // }

  // .handsontable tr td:first-child {
  //   color: #ffffff !important;
  // }
  // .handsontable tr td {
  //   font-family: "微软雅黑";
  //   font-size: 14px;
  //   color: #dddddd;
  //   text-align: center;
  //   border: 1px solid #0ab09c;
  // }
  // .handsontable .htDimmed {
  //   border-right-color: #44474e;
  //   border-top-color: transparent;
  //   border-left-color: transparent;
  //   border-bottom-color: transparent;
  // }
  // .handsontable th {
  //   border-right-color: #44474e;
  //   border-bottom-color: #44474e;
  // }
  // .handsontable tr:first-child th,
  // .handsontable tr:first-child td {
  //   border-top: 1px solid #44474e;
  // }
  // .ht_clone_top_left_corner thead tr th:nth-last-child(2) {
  //   border-right: 0;
  // }

  // .ht_master .wtHolder {
  //   width: 100% !important;
  //   height: 100% !important;
  // }
  // .handsontable thead th.ht__highlight,
  // .handsontable th:first-child,
  // .handsontable th:nth-child(2),
  // .handsontable td:first-of-type,
  // .handsontable .htNoFrame + th,
  // .handsontable .htNoFrame + td {
  //   border-left-color: #44474e;
  // }
  // // .handsontable thead th.ht__highlight,
  // .handsontable tbody th.ht__highlight,
  // .handsontable th,
  // .handsontable td,
  // .handsontable tr {
  //   background: transparent;
  // }
  // .handsontable tbody tr:nth-child(odd) {
  //   background-color: #34393f;
  // }
  // .handsontable tbody tr:nth-child(even) {
  //   background-color: #26272c;
  // }
  // .handsontableInput {
  //   box-shadow: none;
  //   white-space: nowrap;
  //   background: #26272c;
  //   color: #ffffff;
  //   margin-top: 2px;
  //   margin-left: 1px;
  //   width: calc(45% + 8px) !important;
  // }
  // .handsontable td.area:before,
  // .handsontable td.area-1:before,
  // .handsontable td.area-2:before,
  // .handsontable td.area-3:before,
  // .handsontable td.area-4:before,
  // .handsontable td.area-5:before,
  // .handsontable td.area-6:before,
  // .handsontable td.area-7:before {
  //   background: transparent;
  // }
  // .wtBorder,
  // .area {
  //   background-color: transparent !important;
  // }
}
</style>
