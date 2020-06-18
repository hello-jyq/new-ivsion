<template>
  <div :class="theme=='Light'?'no-search-content-box advice-apply adaL-light flex-height-table':'no-search-content-box advice-apply flex-height-table'">
    <div class="table-bg-box">
      <el-table
        ref="table"
        :data="tableData"
        border
        stripe
        :row-key="getRowKeys"
        :expand-row-keys="expands"
        style="width: 100%"
        height="100%"
      >
        <el-table-column :label="$t('workflow.operation')" min-width="120" width="120" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row.id)">
              处理
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="功能名"
          prop="itemName"
          min-width="100"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          label="业务编号"
          prop="identiferNum"
          min-width="100"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <a class="link" @click.prevent="handleProcessInstClick(scope.row.id)">{{ scope.row.identiferNum }}</a>
          </template>
        </el-table-column>
        <el-table-column
          label="业务名称"
          prop="orgUsed"
          min-width="100"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          label="最后修改人"
          prop="departmentBudget"
          min-width="100"
          align="center"
        />
        <el-table-column
          label="最后修改时间"
          prop="departmentBudget"
          min-width="100"
          align="center"
        />
      </el-table>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
// import { getAdrApproveList } from '@/api/bud//ada/ada-api.js'
import 'jquery.nicescroll'
export default {
  data() {
    return {
      getRowKeys(row) {
        return row.id
      },
      theme: localStorage.getItem('theme') !== 'Dark' ? 'Light' : '',
      form: {
        template: '差旅费申请表'
      },
      dialogVisible: false,
      name: '',
      scrollColr: localStorage.getItem('theme') !== 'Dark' ? '#D8E0E8' : '#5A5E63',
      options: [{
        value: '0',
        label: '金融系统部'
      }, {
        value: '1',
        label: '产业系统部'
      }, {
        value: '2',
        label: 'HV-SCM部'
      }, {
        value: '3',
        label: 'ERP技术部'
      }, {
        value: '4',
        label: 'Solution开发部'
      }],
      value: '0',
      expands: ['0'],
      tableData: [{
        itemName: '我是待处理审批',
        identiferNum: 'TPL20200603'
      }]
    }
  },
  mounted() {
    // this.getAdrApproveList()
    // 拖拽
    $('.dialog-drag').draggable({
      cursor: 'move',
      handle: '.el-dialog__header,.advice-title-box',
      refreshPositions: true,
      containment: 'parent',
      stop() {
      }
    })
  },
  wtach: {

  },
  Computed: {

  },
  methods: {
    // async getAdrApproveList() {
    //   const params = {
    //     a: '1'
    //   }
    //   const res = await getAdrApproveList(params)
    //   this.tableData = res.datas.searchResult.results
    //   this.tableData.map((item, index) => {
    //     item.id = index
    //   })
    // },
    getScrollBar() {
      $('.el-table__body-wrapper').niceScroll({
        cursorcolor: this.scrollColr,
        cursoropacitymin: 0, // 当滚动条是隐藏状态时改变透明度, 值范围 1 到 0
        cursoropacitymax: 1, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
        cursorwidth: '8px', // 滚动条的宽度，单位：便素
        cursorborder: `1px solid ${this.scrollColr}`, // CSS方式定义滚动条边框
        autohidemode: true, // 隐藏滚动条的方式, 可用的值:
        zindex: 0,
        railpadding: { top: 0, right: 0, left: 0, bottom: 0 },
        boxzoom: false,
        iframeautoresize: false // 在加载事件时自动重置iframe大小
      })
    },
    // 申请
    onApply(row) {
      console.log('row', row)
      this.name = row.itemName
      this.dialogVisible = true
    },
    // 确认
    onConfirm() {
      this.dialogVisible = false
      this.$router.push({
        path: '/ada/edit',
        query: {
          name: this.form.template
        }
      })
    },
    // 查看
    onLook(row) {

    },
    // 编辑
    onEdit(row) {

    },
    // 撤销
    onRevoke(row) {

    },
    // 删除
    onDeleted(index) {
      console.log('row', index)
    }
  }
}
</script>

