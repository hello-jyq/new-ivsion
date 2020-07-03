<template>
  <div :class="theme=='Light'?'no-search-content-box advice-apply adaL-light flex-height-table':'no-search-content-box advice-apply flex-height-table'">
    <ul class="advice-title-box">
      <li class="advice-title-items">
        <span class="advice-items-text">申请部门</span>
        <el-select v-model="value" placeholder="请选择" class="big-input select-department" :popper-class="theme=='Light' ? 'blueSelect' : ''">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </li>
    </ul>
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
        @expand-change="expandSelect"
      >
        <el-table-column width="0" type="expand">
          <template slot-scope="props">
            <el-table
              :data="props.row.approveDetals"
              border
              stripe
              style="width: 100%"
            >
              <el-table-column
                prop="applyTime"
                label="禀议时间"
                align="center"
                min-width="80"
                show-overflow-tooltip
              />
              <el-table-column
                prop="applyName"
                label="禀议名称"
                header-align="center"
                align="left"
                min-width="120"
                show-overflow-tooltip
              />
              <el-table-column
                prop="applyAmount"
                label="禀议金额"
                header-align="center"
                align="right"
                min-width="100"
                show-overflow-tooltip
              />
              <el-table-column
                prop="status"
                label="状态"
                align="center"
                min-width="100"
                show-overflow-tooltip
              />
              <el-table-column min-width="100" align="center" label="操作">
                <template slot-scope="scope">
                  <p class="advice-operation-left">
                    <span v-if="scope.row.status === '同意' || scope.row.status === '申请中'" class="advice-operation-btn" @click="onLook(scope.row)"><i class="iconfont iconchakan" />查看</span>

                    <span v-if="scope.row.status === '驳回' || scope.row.status === '暂存'" class="advice-operation-btn" @click="onEdit(scope.row)"><i class="iconfont iconbianji2" />编辑</span>

                    <span v-if="scope.row.status === '同意'" class="advice-deleted-btn" @click="onRevoke(scope.row)"><i class="iconfont iconchexiao" />撤销</span>

                    <span v-if="scope.row.status === '驳回' || scope.row.status === '暂存'" class="advice-deleted-btn" @click="onDeleted(scope.$index)">
                      <i class="iconfont iconshanchu1" />删除
                    </span>
                  </p>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          label="科目名称"
          prop="itemName"
          min-width="120"
          header-align="center"
          align="left"
          show-overflow-tooltip
        />
        <el-table-column
          label="我的禀议（申请中）"
          prop="persionalApplying"
          min-width="120"
          header-align="center"
          align="right"
          show-overflow-tooltip
        />
        <el-table-column
          label="我的禀议（已通过）"
          prop="persionalPass"
          min-width="120"
          header-align="center"
          align="right"
          show-overflow-tooltip
        />
        <el-table-column
          label="部门禀议（申请中）"
          prop="orgApplying"
          min-width="120"
          header-align="center"
          align="right"
          show-overflow-tooltip
        />
        <el-table-column
          label="部门禀议（已通过）"
          prop="orgPass"
          min-width="120"
          header-align="center"
          align="right"
          show-overflow-tooltip
        />
        <el-table-column
          label="部门实绩"
          prop="orgUsed"
          min-width="120"
          header-align="center"
          align="right"
          show-overflow-tooltip
        />
        <el-table-column
          label="部门预算"
          prop="departmentBudget"
          min-width="120"
          header-align="center"
          align="right"
          show-overflow-tooltip
        />
        <el-table-column
          label="操作"
          min-width="100"
          align="center"
        >
          <template slot-scope="scope">
            <div class="advice-operation-btn advice-apply-btn" @click="onApply(scope.row)">
              <i class="iconfont iconshenqing1" />申请
            </div>
          </template>
        </el-table-column>
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
            <el-option label="情報機器購入申請書" value="情報機器購入申請書" />
            <el-option label="名刺作成申請書" value="名刺作成申請書" />
            <el-option label="文具購入申請書" value="文具購入申請書" />
            <el-option label="資産購入申請表" value="資産購入申請表" />
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
import { getAdrApproveList } from '@/api/bud//ada/ada-api.js'
import 'jquery.nicescroll'
export default {
  data() {
    return {
      getRowKeys(row) {
        return row.id
      },
      theme: localStorage.getItem('theme') !== 'Dark' ? 'Light' : '',
      form: {
        template: '情報機器購入申請書'
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
      tableData: []
    }
  },
  mounted() {
    this.getAdrApproveList()
    // 拖拽
    $('.dialog-drag').draggable({
      cursor: 'move',
      handle: '.el-dialog__header,.advice-title-box',
      refreshPositions: true,
      containment: 'parent',
      stop() {
      }
    })

    this.expandSelect().then(() => {
      this.$nextTick(function() {
        this.getScrollBar()
      })
    })
  },
  wtach: {

  },
  Computed: {

  },
  methods: {
    async getAdrApproveList() {
      const params = {
        a: '1'
      }
      const res = await getAdrApproveList(params)
      this.tableData = res.datas.searchResult.results
      this.tableData.map((item, index) => {
        item.id = index
      })
      this.$nextTick(function() {
        this.getScrollBar()
        this.$refs.table.doLayout()
      })
    },
    // 折叠面板每次只能展开一行
    expandSelect(row, expandedRows) {
      var that = this
      if (expandedRows.length) {
        that.expands = []
        if (row) {
          that.expands.push(row.id)
          this.$nextTick(function(){
            this.getScrollBar()
            this.$refs.table.doLayout()
          })
          
        }
      } else {
        that.expands = []
      }
    },

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

