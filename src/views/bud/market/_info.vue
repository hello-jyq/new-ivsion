<template>
  <el-dialog
    title="通信费"
    top="0"
    class="content-dialog-box"
    custom-class="dialog-drag market-drag"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    @close="onClose"
  >
    <div style="display: flex;flex-direction: column;height: 100%;">
      <div ref="table" class="dialog-table-box">
        <hot-table ref="editTable" :settings="hotSettings" />
      </div>
      <div class="dialog-btn-box" style="padding-bottom: 3px;">
        <div class="dialog-btn-right" @click="onClose()">
          <span class="circle-bigger-btn btn-default-color"><i class="iconfont iconquxiao" /></span>
          <span class="dialog-btn-text"> 取&nbsp;消</span>
        </div>
        <div @click="onConfirm()">
          <span class="circle-bigger-btn btn-light-color"><i class="iconfont iconqueren" /></span>
          <span class="dialog-btn-text">确&nbsp;认</span>
        </div>
      </div>
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
        className: 'htMiddle',
        rowHeights: 40, // 行高
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
        colWidths: [70, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90],
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
            className: 'htMiddle '
          },
          {
            data: 'firstHalfYear',
            type: 'numeric',
            className: 'htMiddle tdNone'
          },
          {
            data: 'secondHalfYear',
            type: 'numeric',
            className: 'htMiddle tdNone'
          },
          {
            data: 'jan',
            type: 'numeric',
            className: 'htMiddle '
          },
          {
            data: 'feb',
            type: 'numeric',
            className: 'htMiddle '
          },
          {
            data: 'mar',
            type: 'numeric',
            className: 'htMiddle '
          }, {
            data: 'apr',
            type: 'numeric',
            className: 'htMiddle '
          },
          {
            data: 'may', // 五月
            type: 'numeric',
            className: 'htMiddle '
          },
          {
            data: 'jun', // 六月
            type: 'numeric',
            className: 'htMiddle '
          },
          {
            data: 'jul', // 七月
            type: 'numeric',
            className: 'htMiddle '
          },
          {
            data: 'aug', // 八月
            type: 'numeric',
            className: 'htMiddle '
          },
          {
            data: 'sept', // 九月
            type: 'numeric',
            className: 'htMiddle '
          },
          {
            data: 'oct', // 十月
            type: 'numeric',
            className: 'htMiddle '
          },
          {
            data: 'nov', // 十一月
            type: 'numeric',
            className: 'htMiddle '
          },
          {
            data: 'dec', // 十二月
            type: 'numeric',
            className: 'htMiddle '
          }
        ],
        hiddenColumns: {
          copyPasteEnabled: true,
          indicators: true,
          columns: [2, 3]
        },
        manualColumnResize: true, // 列可拖拽调整大小
        manualRowResize: true, // 列可拖拽调整大小
        // autoColumnSize: true, // 自适应列大小
        possible: false,
        fillHandle: false, // 选中拖拽复制 possible values: true, false, "horizontal", "vertical"
        fixedColumnsLeft: 0, // 固定左边列数
        fixedRowsTop: 0, // 固定顶部多少行不能垂直滚动
        stretchH: 'all', // 根据宽度横向扩展，last:只扩展最后一列，none：默认不扩展
        cells: this.rowReadonly,
        contextMenu: false,
        afterOnCellMouseDown: this.cellClick
      },
      isShowYear: false
    }
  },
  watch: {
    dialogVisible: function(newVal) {
      this.$nextTick(function() {
        this.getEditScroll()
        this.getScrollBar()
      })
    }
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
        $('.wtHolder').getNiceScroll().resize()
        $('.el-dialog__body').getNiceScroll().resize()
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
    erd.listenTo(document.getElementsByClassName('dialog-drag')[0], function(element) {
      that.$nextTick(function() {
        this.getEditScroll()
        this.getScrollBar()
        $('.wtHolder').getNiceScroll().resize()
        $('.el-dialog__body').getNiceScroll().resize()
      })
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
    saveData() {
      var examData = this.$refs.editTable.table.getData()

      console.log(examData)
    },
    getEditScroll() {
      $('.wtHolder').niceScroll({
        cursorcolor: this.scrollColr,
        cursoropacitymin: 0, // 当滚动条是隐藏状态时改变透明度, 值范围 1 到 0
        cursoropacitymax: 1, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
        cursorwidth: '8px', // 滚动条的宽度，单位：便素
        cursorborder: `1px solid ${this.scrollColr}`, // CSS方式定义滚动条边框
        autohidemode: true, // 隐藏滚动条的方式, 可用的值:
        zindex: 99,
        railpadding: { top: 0, right: 0, left: 0, bottom: 0 },
        boxzoom: false,
        iframeautoresize: true // 在加载事件时自动重置iframe大小
      })
    },
    getScrollBar() {
      $('.el-dialog__body').niceScroll({
        cursorcolor: this.scrollColr,
        cursoropacitymin: 0, // 当滚动条是隐藏状态时改变透明度, 值范围 1 到 0
        cursoropacitymax: 1, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
        cursorwidth: '8px', // 滚动条的宽度，单位：便素
        cursorborder: `1px solid ${this.scrollColr}`, // CSS方式定义滚动条边框
        autohidemode: true, // 隐藏滚动条的方式, 可用的值:
        zindex: 99,
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
  .content-dialog-box  .market-drag{

        .el-dialog__body{
            margin: -8px;
            padding: 8px;
        }
        .dialog-table-box{
            padding: 12px;
            background:linear-gradient(180deg,#34393F 0%,#16171B 100%);
            box-shadow:0px 2px 10px 0px rgba(0,0,0,0.5);
            border-radius:16px;
            overflow: hidden;
        }
        .handsontable{
          height: 100%;
        }
        .handsontable table,
        .handsontable tbody,
        .handsontable thead,
        .handsontable td,
        .handsontable th,
        .handsontable input,
        .handsontable textarea,
        .handsontable div{
          box-sizing: border-box;
        }
        .handsontable .wtSpreader{
          min-width: 100%;
        }
        .handsontable tr:first-child th{
          height: 50px !important;
          line-height: 50px;
          font-family:"微软雅黑";
          font-size: 16px;
          color: #ffffff;
          background-color: #26272C;
        }
        .handsontable thead th .relative{
          padding: 0 4px;
        }
        .ht_clone_top,.wtHolder,.htCore{
          width: 100% !important;
        }
        .wtHider{
          width: 100% !important;
        }
        .handsontable .htDimmed{
          color: #888888;
        }

        .handsontable tr td:first-child{
          color: #ffffff !important;
        }
        .handsontable tr td{
          font-family:"微软雅黑";
          font-size: 14px;
          color: #dddddd ;
          text-align: center;
          border: 1px solid #0AB09C
        }
        .handsontable .htDimmed{
          border-right-color: #44474E;
          border-top-color: transparent;
          border-left-color: transparent;
          border-bottom-color: transparent;
        }
        .handsontable th{
          border-right-color: #44474E;
           border-bottom-color:#44474E;
        }
        .handsontable tr:first-child th, .handsontable tr:first-child td{
          border-top: 1px solid #44474E;
        }
        .ht_clone_top_left_corner thead tr th:nth-last-child(2){
          border-right:0
        }

        .ht_master .wtHolder{
          width: 100% !important;
          height: 100% !important;
        }
		.handsontable thead th.ht__highlight,
        .handsontable th:first-child,
        .handsontable th:nth-child(2),
        .handsontable td:first-of-type,
        .handsontable .htNoFrame + th,
        .handsontable .htNoFrame + td{
          border-left-color: #44474E
        }
		// .handsontable thead th.ht__highlight,
        .handsontable tbody th.ht__highlight,
        .handsontable th,
        .handsontable td,
        .handsontable tr{
          background: transparent;
        }
        .handsontable tbody tr:nth-child(odd){
          background-color: #34393f;
        }
        .handsontable tbody tr:nth-child(even){
          background-color:#26272C;
        }
        .handsontableInput{
          width: 83px !important;
          box-shadow: none;
          white-space: nowrap;
          background:#26272C;
          color: #ffffff;
        }
        .handsontable td.area:before,
         .handsontable td.area-1:before,
         .handsontable td.area-2:before,
          .handsontable td.area-3:before,
          .handsontable td.area-4:before,
          .handsontable td.area-5:before,
           .handsontable td.area-6:before,
            .handsontable td.area-7:before{
              background: transparent;
        }
        .wtBorder,.area{
            background-color: transparent !important;
        }
    }

</style>
