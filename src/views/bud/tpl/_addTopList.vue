<template>
  <el-dialog
    ref="dragBox"
    class="content-dialog-box tpl-add-top-list"
    :close-on-click-modal="false"
    custom-class="dialog-drag fixed-search-btn-box"
    top="0"
    title="科目选择"
    :visible.sync="isShow"
    :before-close="handleDialogClose"
  >
    <div style="display: flex;flex-direction: column;height: 100%;">
      <div class="justify-content-flex tpl-add-title">
        <div class="big-input" style="flex:1">
          <el-form label-width="80px" label-position="left">
            <el-form-item label="科目名称" prop="identiferNum">
              <el-input v-model="name" />
            </el-form-item>
          </el-form>
        </div>
        <div class="tpl-add-top-search-btn">
          <ul class="operation-box">
            <li class="operation-item">
              <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconsousuo" /></span>
              <span class="operation-text">检&nbsp;索</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer-box">
        <div class="dialog-table-box">
          <el-table ref="table" v-loading="isLoading" class="scroll-table-box" :data="dataList" height="100%" stripe border @selection-change="handleSelectionChange">
            <el-table-column width="40" :resizable="false" type="selection" fixed />
            <el-table-column prop="itemNum" label="科目编号" min-width="100" align="center" show-overflow-tooltip />
            <el-table-column prop="itemName" label="科目名称" min-width="100" align="center" show-overflow-tooltip />
            <el-table-column prop="remark" label="科目说明" min-width="100" align="center" show-overflow-tooltip />
          </el-table>
        </div>
        <div class="pagination-box">
          <el-pagination
            class="page-left"
            :current-page.sync="searchParam.pageNo"
            :page-size="searchParam.pageSize"
            layout="total,sizes"
            :total="searchParam.totalRecord"
            :popper-class="theme=='Light' ? 'blueDL' : ''"
            placement="top-start"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />

          <el-pagination
            class="page-right"
            :current-page.sync="searchParam.pageNo"
            :page-size="searchParam.pageSize"
            layout="prev,pager,next,slot,jumper"
            :total="searchParam.totalRecord"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
            <span class="iconfont iconjiantou-youzhi page-last-page" @click="toLastPage" />
          </el-pagination>
          <el-pagination class="page-right  page-first" layout="slot">
            <span class="iconfont iconjiantou-zuozhi page-first-page" @click="toFirstPage" />
          </el-pagination>
        </div>
      </div>
      <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
        <li class="operation-item" @click="onClose">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
          <span class="operation-text">取&nbsp;消</span>
        </li>
        <li class="operation-item" @click="onConfirm">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
          <span class="operation-text">确&nbsp;认</span>
        </li>
      </ul>
    </div>
  </el-dialog>
</template>
<script>
import { getItemTopList } from '@/api/bud//tpl/tpl-api.js'
import { search } from '@/mixins/search-params'
import { formValidator } from '@/mixins/form-validator.js'
import { permission } from '@/mixins/permission-mixin'
import $ from 'jquery'
import 'jquery.nicescroll'
export default {
  mixins: [search, formValidator, permission],
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      name: '',
      selectList: [],
      theme: localStorage.getItem('theme') !== 'Dark' ? 'Light' : '',
      dataList: [],
      isLoading: true,
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null // 总条数
      },
      scrollColr: localStorage.getItem('theme') !== 'Dark' ? '#D8E0E8' : '#5A5E63'
    }
  },
  watch: {
    'isShow': function(newVal, oldVal) {
      if (newVal === true) {
        const self = this
        setTimeout(function() {
          self.getScrollBar()
          self.getDragBar()
          const dom = document.getElementsByClassName('el-dialog__body')[0]
          dom.addEventListener('scroll', self.scroll)
        })
      }
    }
  },
  mounted() {
    this.getList()
    // 拖拽
    this.draggable()
    // 缩放
    this.resizable()
  },
  methods: {
    scroll() {
      $('.el-table__body-wrapper').getNiceScroll().resize()
    },
    async getList() {
      const res = await getItemTopList()
      if (res && res.success) {
        const { totalRecord, results } = res.datas.searchResult
        this.searchParam.totalRecord = totalRecord
        this.dataList = results
      }
      this.tableDolayout(this.$refs['table'])
      this.isLoading = false
    },
    handleSelectionChange(val) {
      console.log('val', val)
      this.selectList = val
    },
    onClose() {
      this.$emit('onClose')
      this.$refs.table.clearSelection()
    },
    onConfirm() {
      this.$emit('onClose')
      this.$emit('onConfirm', this.selectList)
      this.$refs.table.clearSelection()
    },
    handleDialogClose() {
      this.$emit('onClose')
    },
    draggable() {
      $('.dialog-drag').draggable({
        cursor: 'move',
        handle: '.el-dialog__header',
        refreshPositions: true,
        containment: 'parent',
        stop() {
          $('.el-table__body-wrapper').getNiceScroll().resize()
          $('.el-dialog__body').getNiceScroll().resize()
        }
      })
    },
    resizable() {
      $('.dialog-drag.fixed-search-btn-box').resizable({
        aspectRatio: false,
        minHeight: 150,
        containment: 'parent',
        stop: function(event, ui) {
          $('.footer-box').addClass('drag-table-height')
          $('.el-table__body-wrapper').getNiceScroll().resize()
          $('.el-dialog__body').getNiceScroll().resize()
        }
      })
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
    getDragBar() {
      $('.el-dialog__body').niceScroll({
        cursorcolor: this.scrollColr,
        cursoropacitymin: 0, // 当滚动条是隐藏状态时改变透明度, 值范围 1 到 0
        cursoropacitymax: 1, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
        cursorwidth: '8px', // 滚动条的宽度，单位：便素
        cursorborder: `1px solid ${this.scrollColr}`, // CSS方式定义滚动条边框
        autohidemode: true, // 隐藏滚动条的方式, 可用的值:
        zindex: 0,
        railpadding: { top: 0, right: 0, left: 0, bottom: 0 },
        boxzoom: false,
        iframeautoresize: true // 在加载事件时自动重置iframe大小
      })
    }
  }
}
</script>
<style lang="scss">
.tpl-add-top-list {
  .tpl-add-title {
    margin-bottom: 10px;
  }
  .el-form-item {
    margin-bottom: 0 !important;
  }
  .tpl-add-title {
    .operation-item {
      margin-bottom: 0 !important;
    }
  }

  .tpl-add-top-search-btn {
    padding-right: 10px;
    padding-left: 20px;
  }
  .dialog-drag {
    width: 842px;
    min-width: 330px;
    height: 598px;
  }
}
</style>
