<template>
  <el-dialog
    ref="dragBox"
    class="content-dialog-box tpl-add-total-list"
    :close-on-click-modal="false"
    custom-class="dialog-drag fixed-search-btn-box"
    top="0"
    :title="$t('bud.tpl.addItemTotal')"
    :visible.sync="isShow"
    :before-close="handleDialogClose"
  >
    <!-- @opened="getList" -->
    <div style="display: flex;flex-direction: column;height: 100%;">
      <div class="justify-content-flex tpl-add-title">
        <div class="big-input" style="flex:1">
          <el-form ref="itemToralForm" label-width="80px" label-position="left">
            <el-form-item :label="$t('bud.tpl.itemTotalName')" prop="name">
              <el-input v-model="result.name" />
              <!-- <el-input v-else v-model="name" /> -->
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="footer-box">
        <div class="dialog-table-box">
          <el-table ref="itemTopTable" class="scroll-table-box" :data="dataList" height="100%" row-key="id" stripe border @selection-change="handleSelectionChange">
            <el-table-column width="40" :resizable="false" type="selection" fixed />
            <el-table-column prop="itemNum" :label="$t('basedata.itemNum')" min-width="100" align="center" show-overflow-tooltip />
            <el-table-column prop="itemName" :label="$t('basedata.itemName')" min-width="100" align="center" show-overflow-tooltip />
          </el-table>
        </div>
        <!-- <div class="pagination-box">
          <el-pagination
            class="page-left"
            :current-page.sync="searchParam.pageNo"
            :page-size="searchParam.pageSize"
            layout="total,sizes"
            :total="searchParam.totalRecord"
            :popper-class="theme=='Light' ? 'blueDL' : ''"
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
        </div> -->
      </div>
      <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
        <li class="operation-item" @click="onClose">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
          <span class="operation-text">取&nbsp;&nbsp;消</span>
        </li>
        <li class="operation-item" @click="onConfirm">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
          <span class="operation-text">确&nbsp;&nbsp;认</span>
        </li>
      </ul>
    </div>
  </el-dialog>
</template>
<script>
import { getTplItemTopList } from '@/api/bud/tpl/tpl-api.js'
import { search } from '@/mixins/search-params'
import { formValidator } from '@/mixins/form-validator.js'
import { permission } from '@/mixins/permission-mixin'
import $ from 'jquery'
import 'jquery.nicescroll'

import uuidv1 from 'uuid/v1'

export default {
  mixins: [search, formValidator, permission],
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    editTotal: {
      type: Boolean,
      default: false
    },
    itemsData: {
      type: Object,
      default: function() {
        return {}
      }
    },
    templateId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      num: 1000367509,
      dataList: [],
      selectList: [],
      dialogSearchVisible: false,
      theme: localStorage.getItem('theme') !== 'Dark' ? 'Light' : '',
      result: {
        name: '',
        id: ''
      },
      isLoading: true,
      rules: {
        name: [
          { required: true, message: '请输入合计项名称', trigger: 'blur' }
        ]
      },
      // 分页插件数据
      // searchParam: {
      //   paging: true,
      //   pageNo: 1, // 当前页码
      //   pageSize: 10, // 每页条数
      //   totalRecord: null // 总条数
      // },
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
        this.getList()
      }
    }
  },
  mounted() {
    // this.getList()
    // console.log('itemsData', this.itemsData)
    // 拖拽
    this.draggable()
    // 缩放
    this.resizable()
  },
  methods: {
    scroll() {
      $('.el-table__body-wrapper').getNiceScroll().resize()
    },
    newItemsData(obj) {
      // console.log('edit---------->')
      // console.log('obj', JSON.stringify(obj))
      this.result.name = obj.label
      this.result.id = obj.id
      const selectedItems = []
      this.dataList.forEach((item, index) => {
        // console.log('item.id', item.id)
        obj.templateItemIds.split(',').map(id => {
          // console.log('id', id)
          if (item.id === id) {
            // console.log('item', JSON.stringify(item))
            selectedItems.push(item)
            this.$nextTick(() => {
              this.$refs.itemTopTable.toggleRowSelection(item)
            })
          }
        })
      })
      // this.$nextTick(() => {
      //   this.$refs.itemTopTable.toggleRowSelection(selectedItems)
      // })
    },
    async getList() {
      // console.log('getList...')
      const res = await getTplItemTopList({ templateId: this.templateId })
      if (res && res.success) {
        this.dataList = res.datas.results
        // 编辑时回显
        if (this.editTotal) {
          this.newItemsData(this.itemsData)
        }
        this.$nextTick(() => {
          this.$refs['itemTopTable'].doLayout()
          this.getScrollBar()
          $('.el-table__body-wrapper').getNiceScroll().resize()
        })
        // else {
        //   this.$nextTick(() => {
        //     this.$refs.itemTopTable.toggleRowSelection(this.dataList[0])
        //   })
        //   // const that = this
        //   // setTimeout(function() {
        //   //   that.$refs.itemTopTable.toggleRowSelection(that.dataList[0])
        //   // }, 1000)
        // }
      }
      // this.tableDolayout(this.$refs['itemTopTable'])
      this.isLoading = false
    },
    handleSelectionChange(val) {
      // console.log('selectList', JSON.stringify(val))
      this.selectList = val
    },
    onClose() {
      // 重置数据
      this.result.name = ''
      this.result.id = ''
      this.$refs.itemTopTable.clearSelection()
      this.$emit('onClose')
    },
    onConfirm() {
      if (!this.result.name) {
        this.$message({
          type: 'error',
          message: '合计项名称不能为空!'
        })
        return
      }
      if (this.selectList.length < 1) {
        this.$message({
          type: 'error',
          message: '至少添加一条数据!'
        })
        return
      }
      const templateItemIds = this.selectList.map(item => item.id).join(',')
      let obj
      if (!this.editTotal) { // 编辑
        obj = {
          label: this.result.name,
          id: uuidv1(),
          itemType: '03',
          templateItemIds: templateItemIds
        }
      } else { // 新增
        obj = {
          label: this.result.name,
          id: this.result.id,
          itemType: '03',
          templateItemIds: templateItemIds
        }
      }
      // this.$emit('onClose')
      // 重置数据
      this.result.name = ''
      this.result.id = ''
      this.$refs.itemTopTable.clearSelection()
      this.$emit('onConfirm', obj)
      // this.$refs['itemToralForm'].validate(valid => {
      //   if (valid) {
      //     const templateItemIds = this.selectList.map(item => item.id).join(',')
      //     let obj
      //     if (!this.editTotal) { // 编辑
      //       obj = {
      //         label: this.result.name,
      //         id: uuidv1(),
      //         itemType: '03',
      //         templateItemIds: templateItemIds
      //       }
      //     } else { // 新增
      //       obj = {
      //         label: this.result.name,
      //         id: this.result.id,
      //         itemType: '03',
      //         templateItemIds: templateItemIds
      //       }
      //     }
      //     // this.$emit('onClose')
      //     // 重置数据
      //     this.result.name = ''
      //     this.result.id = ''
      //     this.$refs.itemTopTable.clearSelection()
      //     this.$emit('onConfirm', obj)
      //   } else {
      //     return false
      //   }
      // })
    },
    handleDialogClose() {
      // 重置数据
      this.result.name = ''
      this.result.id = ''
      this.$refs.itemTopTable.clearSelection()
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
        containment: '.tpl-add-total-list',
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
.tpl-add-total-list {
  .tpl-add-title {
    margin-bottom: 10px;
  }
  .el-form-item {
    margin-bottom: 0 !important;
  }
  .tpl-add-top-search-btn {
    padding-right: 10px;
    padding-left: 20px;
  }
  .dialog-drag {
    width: 740px;
    min-width: 330px;
    height: 598px;
  }
}
</style>
