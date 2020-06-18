<template>
  <div style="display: flex;flex-direction: column;height: 100%;">
    <div class="middle-box">
      <div class="dialog-search-box middle-input">
        <el-form ref="searchForm" :model="form" label-width="80px" label-position="left">
          <el-row type="flex" justify="space-between">
            <el-col :span="7">
              <el-form-item label="科目名称" prop="itemName">
                <el-input v-model="searchParam.params.itemName" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="科目编号" prop="itemNum">
                <el-input v-model="searchParam.params.itemNum" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item style="margin-bottom:0 !important">
            <div class="dialog-btn-box">
              <div class="dialog-btn-right" @click="resetForm('searchForm')">
                <span class="circle-bigger-btn btn-default-color"><i class="iconfont iconrefresh" /></span>
                <span class="dialog-btn-text">重&nbsp;置</span>
              </div>
              <div @click="search">
                <span class="circle-bigger-btn btn-light-color bluebg"><i class="iconfont iconsousuo" /></span>
                <span class="dialog-btn-text">检&nbsp;索</span>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="footer-box">
      <div class="dialog-table-box">
        <el-table ref="itemListTable" class="scroll-table-box" :data="dataList" height="100%" stripe border :row-key="getRowKey" @selection-change="handleSelectionChange">
          <el-table-column
            :resizable="false"
            type="selection"
            width="40"
            :reserve-selection="true"
            fixed
          />
          <el-table-column prop="itemName" :label="$t('basedata.itemName')" show-overflow-tooltip fixed />
          <el-table-column prop="itemNum" :label="$t('basedata.itemNum')" min-width="100" align="center" />
          <el-table-column prop="remark" :label="$t('basedata.remark')" show-overflow-tooltip />
          <el-table-column prop="itemType" :label="$t('basedata.itemType')" width="80" align="center">
            <template slot-scope="scope">
              <dict-write dict-type-id="BudItemType" :value="scope.row.itemType" />
            </template>
          </el-table-column>
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
    <div class="dialog-btn-box light-box" style="padding-bottom: 3px;">
      <div class="dialog-btn-right" @click="onClose()">
        <span class="circle-bigger-btn btn-default-color"><i class="iconfont iconquxiao" /></span>
        <span class="dialog-btn-text"> 取&nbsp;消</span>
      </div>
      <div @click="onConfirm()">
        <span class="circle-bigger-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
        <span class="dialog-btn-text">确&nbsp;认</span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  search
} from '@/mixins/search-params'
import {
  formValidator
} from '@/mixins/form-validator.js'
import {
  permission
} from '@/mixins/permission-mixin'
import DictWrite from '@/components/DictWrite'
import { getItemsexcChild } from '@/api/bud/itm/itm-api'

import $ from 'jquery'
import 'jquery.nicescroll'
export default {
  components: {
    DictWrite
  },
  mixins: [search, formValidator, permission],
  props: {
    // data: {
    //   type: Array,
    //   default: function() {
    //     return []
    //   }
    // },
    // radio: {
    //   type: Number,
    //   default: -1
    // }
  },
  data() {
    return {
      theme: localStorage.getItem('theme') !== 'Dark' ? 'Light' : '',
      Height: '',
      selectedItems: null,
      contactsPopover: false,
      form: { // 弹窗检索参数
        itemName: '', // 科目名称
        itemNum: '' // 科目编号
      },
      dataList: [],
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 5, // 每页条数
        totalRecord: null, // 总条数
        params: {
          itemName: '',
          itemNum: ''
        }
      }
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    // console.log('data', this.data)
    // this.searchParam.totalRecord = this.data.length
    // 监听滚动事件
    const dom = document.getElementsByClassName('el-dialog__body')[0]
    dom.addEventListener('scroll', this.scroll)
  },
  methods: {
    async fetchData() {
      const res = await getItemsexcChild(this.searchParam)
      if (res && res.success) {
        const { totalRecord, results } = res.datas.searchResult
        this.searchParam.totalRecord = totalRecord
        this.dataList = results
        // console.log(this.dataList)
      }
    },
    getRowKey(row) {
      return row.id
    },
    scroll() {
      this.$emit('onScroll')
      $('.el-table__body-wrapper').getNiceScroll().resize()
    },
    onClose() {
      this.$emit('onClose')
    },
    onConfirm() {
      this.$emit('onConfirm', this.selectedItems)
      this.clearSelectedItems()
    },
    clearSelectedItems() {
      this.$refs.itemListTable.clearSelection()
    },
    handleSelectionChange(val) {
      this.selectedItems = val
      // console.log('------->' + this.selectedItems)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.itemListTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.itemListTable.clearSelection()
      }
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
