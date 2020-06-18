<template>
  <div ref="apply" class="apply" :class="theme=='Light' ? 'apply-light' : 'apply'">
    <div class="search-left-box search-left-box-light">
      <div class="search-title">
        {{ $t('comm.queryCriteria') }}
      </div>
      <el-scrollbar>
        <el-form ref="form" class="search-form default-input" label-position="left" :model="searchParam.params">
          <el-form-item prop="year">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('bud.bdm.year') }}
              </el-col>
              <el-col :span="16">
                <el-select v-model="searchParam.params.year" placeholder="" class="light-select" :popper-class="this.theme=='Light' ? 'blueSelect' : ''" clearable>
                  <el-option
                    v-for="item in yearList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="name">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('bud.bdm.name') }}
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.name" />
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-scrollbar>
      <div class="search-btn-box">
        <div class="reset-box" @click="resetForm('form')">
          <p>{{ $t('comm.reset') }}</p>
          <span class="circle-larger-btn btn-default-color"><i class="iconfont iconrefresh" /></span>
        </div>
        <div class="search-box" @click="search">
          <p>{{ $t('comm.query') }}</p>
          <span class="circle-larger-btn btn-light-color bluebg"><i class="iconfont iconsousuo" /></span>
        </div>
      </div>
    </div>

    <div class="content content-light">
      <div>
        <ul class="operation-box">
          <li class="operation-item" @click="handleEdit(multipleSelection)">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbianji" /></span>
            <span class="operation-text">{{ $t('comm.edit') }}</span>
          </li>
        </ul>
      </div>
      <div class="table-bg-box search-list-table">
        <div ref="tables" style="height: 100%;">
          <el-table ref="table" v-loading="isLoading" class="scroll-table-box" :data="dacList" height="100%" stripe border @selection-change="handleSelectionChange">
            <el-table-column :resizable="false" type="selection" width="40" fixed />

            <el-table-column :label="$t('bud.bdm.identiferNum')" fixed width="130" header-align="center" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <a class="link" @click.prevent="handleNumClick(scope.row.id)">{{ scope.row.identiferNum }}</a>
              </template>
            </el-table-column>

            <el-table-column prop="year" :label="$t('bud.bdm.year')" width="100" header-align="center" align="center" show-overflow-tooltip />

            <el-table-column prop="name" :label="$t('bud.bdm.name')" min-width="300" header-align="center" align="left" show-overflow-tooltip />

            <el-table-column prop="tplStatus" :label="$t('bud.bdm.status')" width="100" header-align="center" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <dict-write dict-type-id="BudTemplateEditStatus" :value="scope.row.tplStatus" />
              </template>
            </el-table-column>
          </el-table>
        </div>
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
          :class="theme=='Light' ? 'page-right blueDR' : 'page-right'"
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
  </div>
</template>
<script>
import { search } from '@/mixins/search-params'
import { getBdmList } from '@/api/bud/bdm/bdm-api.js'
import { getTplYears } from '@/api/bud/comm/comm-api'
import DictWrite from '@/components/DictWrite'
import { permission } from '@/mixins/permission-mixin'

var elementResizeDetectorMaker = require('element-resize-detector')
import $ from 'jquery'
import 'jquery.nicescroll'

export default {
  components: {
    DictWrite
  },
  mixins: [search, permission],
  data() {
    return {
      theme: localStorage.getItem('theme') !== 'Dark' ? 'Light' : '',

      defaultProps: {
        children: 'children',
        label: 'label'
      },

      isLoading: true,
      activeNames: ['1'],
      yearList: [], // 模板年度下拉框
      dacList: [],
      multipleSelection: [],
      activeName: 'basic',
      dialogType: 'create',
      levelList: [],
      accessUrlData: [],
      createObjectDialog: false,
      objectRadio: 'COL',
      objectInp: '',
      objectData: {
        header: [],
        table: []
      },
      visitorRadio: 'USER',
      createVisitorDialog: false,
      visitorData: {
        header: [],
        table: []
      },

      id: '',
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          year: '', // 模板年度
          name: '' // 模板名称
        }
      },
      options: [],
      scrollColr: localStorage.getItem('theme') !== 'Dark' ? '#D8E0E8' : '#5A5E63',
      selectData: ''
    }
  },
  created: function() {
    this.getTplYear()
    this.fetchData()
  },
  mounted() {
    var erd = elementResizeDetectorMaker()
    var that = this
    erd.listenTo(that.$refs.apply, function(element) {
      that.$nextTick(function() {
        this.getScrollBar()
        $('.el-table__body-wrapper').getNiceScroll().resize()
      })
    })
    this.getScrollBar()
    this.getDragBar()
  },
  methods: {

    getChecked(data, node, ischeck) {
      if (node.isLeaf) {
        this.searchParam.params.sales = node.data.name
        this.searchPopover = false
      }
    },

    async getTplYear() { // 获取年度方法
      const res = await getTplYears({ funcDiv: 'BDM' })
      if (res && res.success) {
        const results = res.datas.yearList
        this.yearList = results
        // this.defaultYearSelect()
        // 调用查询方法
        // this.fetchData()
      }
    },
    onScroll() {
      // this.getScrollBar()
      $('.el-table__body-wrapper').getNiceScroll().resize()
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
    },

    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.table.toggleRowSelection(row)
        })
      } else {
        this.$refs.table.clearSelection()
      }
    },
    async fetchData() {
      const res = await getBdmList(this.searchParam)

      if (res && res.success) {
        const { totalRecord, results } = res.datas.searchResult
        this.searchParam.totalRecord = totalRecord
        this.dacList = results
      }
      this.tableDolayout(this.$refs['table'])
      this.isLoading = false
    },

    handleSelectionChange(val) {
      console.log('val', val)
      this.multipleSelection = val
    },
    handleNumClick: function(id) {
      this.$router.push({ path: '/bdm/detail', query: {
        id: id,
        screenDiv: 'read'

      }})
    },
    handleEdit(multipleSelection) {
      if (multipleSelection.length === 0 || multipleSelection.length > 1) {
        this.$message({
          type: 'message',
          message: this.$t('comm.msg3')
        })
        return
      }
      let selectItemId = ''
      // const editFlag = null
      this.multipleSelection.forEach(item => {
        // 是否有编辑权限
        selectItemId = item.id
      //  editFlag = item.editFlag
      })

      // if (editFlag == null || editFlag === '0') {
      //   this.$message({
      //     type: 'warning',
      //     message: this.$t('comm.msg34')
      //   })
      //   return
      // }

      this.$router.push({ path: '/bdm/detail', query: {
        id: selectItemId,
        screenDiv: 'edit'
      }})
    }
  }
}
</script>

