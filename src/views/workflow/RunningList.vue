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
              审批进度
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
          label="审批种类"
          prop="persionalApplying"
          min-width="100"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          label="当前审批阶段"
          prop="persionalPass"
          min-width="100"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          label="业务编号"
          prop="identiferNum"
          min-width="100"
          align="center"
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
          label="审批提交时间"
          prop="departmentBudget"
          min-width="100"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          label="当前阶段滞留时间"
          min-width="100"
          align="center"
        />
      </el-table>
    </div>
    <el-dialog
      top="0"
      :title="'【'+name+'】 申请模板选择'"
      :close-on-click-modal="false"
      class="content-dialog-box"
      custom-class="dialog-drag advice-apply-dialog"
      :visible.sync="dialogVisible"
    >
      <el-form label-width="80px" label-position="left" :model="form">
        <el-form-item label="禀议模板" class="big-input">
          <el-select v-model="form.template" style="width:100%" :popper-class="theme=='Light' ? 'blueSelect' : ''">
            <el-option label="差旅费申请表" value="差旅费申请表" />
            <el-option label="差旅费申请表1" value="差旅费申请表1" />
          </el-select>
        </el-form-item>
      </el-form>
      <ul class="operation-box dialog-btn-box  end-content-flex">
        <li class="operation-item" @click="onConfirm()">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
          <span class="operation-text">确&nbsp;认</span>
        </li>
      </ul>
    </el-dialog>
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

