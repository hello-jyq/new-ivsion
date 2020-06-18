<template>
  <div ref="apply" class="apply" :class="theme=='Light' ? 'apply-light' : 'apply'">
    <div class="search-left-box search-left-box-light">
      <div class="search-title">
        {{ $t('comm.queryCriteria') }}
      </div>
      <el-scrollbar>
        <el-form ref="form" class="search-form default-input" label-position="left" :model="searchParam.params">
          <el-form-item prop="omnibus">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                统括
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.omnibus" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="department">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                部门
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.department" />
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item prop="accountClassifiy">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                客户分类
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.accountClassifiy" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="accountName">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('bud.quo.customerName') }}
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.accountName">
                  <i slot="suffix" class="iconfont iconsousuo" @click="onCheck" />
                </el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="quotationName">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('bud.quo.quotationName') }}
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.quotationName" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="transactionType">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                交易类型
              </el-col>
              <el-col :span="16">
                <el-select v-model="searchParam.params.transactionType" placeholder="" class="light-select" :popper-class="this.theme=='Light' ? 'blueSelect' : ''">
                  <el-option label="类型一" value="shanghai" />
                  <el-option label="类型二" value="beijing" />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="quotationType">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('bud.quo.quotationType') }}
              </el-col>
              <el-col :span="16">
                <el-radio-group v-model="searchParam.params.quotationType">
                  <el-radio label="1">
                    合同
                  </el-radio>
                  <el-radio label="2">
                    报价
                  </el-radio>
                </el-radio-group>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="sales">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                营业担当
              </el-col>
              <el-col :span="16">
                <!-- <el-input v-model="searchParam.params.sales" readonly /> -->
                <!-- <TreeSelect /> -->

                <el-popover v-model="searchPopover" placement="bottom" width="auto" trigger="click" :popper-class="this.theme=='Light' ? 'tree-poper blueTree' : 'tree-poper'">
                  <el-scrollbar>
                    <el-tree
                      :data="cities"
                      accordion
                      node-key="id"
                      :default-expanded-keys="expandedKeys"
                      @node-click="getChecked"
                    >
                      <template slot-scope="scope">
                        <div class="tree_content">
                          <div class="tree_item">
                            <span>{{ scope.data.name || scope.data.text }}</span>
                          </div>
                        </div>
                      </template>
                    </el-tree>
                  </el-scrollbar>

                  <el-input slot="reference" v-model="searchParam.params.sales" readonly />
                </el-popover>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="quotationCommitDate">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('bud.quo.quotationCommitDate') }}
              </el-col>
              <el-col :span="16">
                <el-date-picker
                  v-model="searchParam.params.quotationCommitDate"
                  type="date"
                  placeholder="选择日期"
                  prefix-icon="iconfont iconicon--date"
                  :clearable="false"
                  style="width: 100%;"
                  :popper-class="theme=='Light' ? 'blueDate' : ''"
                />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="iseffective">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                是否有效
              </el-col>
              <el-col :span="16">
                <el-checkbox v-model="searchParam.params.iseffective">
                  有效
                </el-checkbox>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="PJGNO">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                PJG NO.
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.PJGNO" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="identiferNum">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                {{ $t('bud.quo.identiferNum') }}
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.identiferNum">
                  <i slot="suffix" class="iconfont iconsousuo" @click="openDialog" />
                </el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-scrollbar>
      <div class="search-btn-box">
        <div class="reset-box" @click="resetForm('form')">
          <p>重置</p>
          <span class="circle-larger-btn btn-default-color"><i class="iconfont iconrefresh" /></span>
        </div>
        <div class="search-box">
          <p>检索</p>
          <span class="circle-larger-btn btn-light-color bluebg"><i class="iconfont iconsousuo" /></span>
        </div>
      </div>
    </div>

    <div class="content content-light">
      <div>
        <ul class="operation-box">
          <li class="operation-item" @click="handleAdd">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconxinjian" /></span>
            <span class="operation-text">新&nbsp;建</span>
          </li>
          <li class="operation-item">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconfuzhi" /></span>
            <span class="operation-text">复&nbsp;制</span>
          </li>
          <!-- 添加-操作之后整体页面loading效果 -->
          <li class="operation-item" @click="handleEdit">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbianji" /></span>
            <span class="operation-text">编&nbsp;辑</span>
          </li>
          <li class="operation-item">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconshanchu" /></span>
            <span class="operation-text">删&nbsp;除</span>
          </li>
          <li class="operation-item">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont icondaochu" /></span>
            <span class="operation-text">CSV导出</span>
          </li>
          <li class="operation-item">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconfinance" /></span>
            <span class="operation-text">财务预设</span>
          </li>
          <li class="operation-item" @click="openUpdata">
            <span class="operation-circle circle-middle-btn btn-light-color"><i class="iconfont iconrefresh" /></span>
            <span class="operation-text">更新履历</span>
          </li>
          <li class="operation-item" @click="dialogUploadVisible=true">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconsuoding" /></span>
            <span class="operation-text">锁&nbsp;定</span>
          </li>
        </ul>
      </div>
      <div class="table-bg-box search-list-table">
        <div ref="tables" style="height: 100%;">
          <el-table ref="table" v-loading="isLoading" class="scroll-table-box" :data="dacList" height="100%" stripe border @header-dragend="headerDragend" @selection-change="handleSelectionChange">
            <el-table-column :resizable="false" type="selection" width="40" fixed />

            <el-table-column :label="$t('bud.quo.identiferNum')" fixed width="130" header-align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <a class="link" @click.prevent="handleNumClick(scope.row.id)">{{ scope.row.identiferNum }}</a>
              </template>
            </el-table-column>
            <el-table-column prop="quotationType" :label="$t('bud.quo.quotationType')" min-width="100" header-align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <dict-write dict-type-id="QuoType" :value="scope.row.quotationType" />
              </template>
            </el-table-column>
            <el-table-column prop="quotationName" :label="$t('bud.quo.quotationName')" min-width="150" header-align="center" show-overflow-tooltip />

            <el-table-column prop="accountName" :label="$t('bud.quo.customerName')" header-align="center" min-width="150" show-overflow-tooltip />

            <el-table-column
              prop="quotationCommitDate"
              :label="$t('bud.quo.quotationCommitDate')"
              min-width="200"
              header-align="center"
              type="date"
              value-format="yyyy-MM-dd"
              show-overflow-tooltip
            />

            <el-table-column prop="email" header-align="center" :label="$t('bud.quo.email')" min-width="140" show-overflow-tooltip />
            <el-table-column prop="createByName" label="创建者" width="120" header-align="center" show-overflow-tooltip />
            <el-table-column prop="updateByName" :label="$t('bud.quo.updateBy')" width="120" header-align="center" show-overflow-tooltip />

            <el-table-column prop="updateTime" :label="$t('bud.quo.updateTime')" width="165" header-align="center" show-overflow-tooltip />
            <el-table-column prop="remark" :label="$t('bud.quo.remarks')" min-width="140" show-overflow-tooltip />
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

    <!-- 修改弹窗——移动方法 -->
    <search-dailog
      :is-show="dialogSearchVisible"
      :radio="radioNumner"
      @onClose="dialogSearchVisible = false; radioNumner = -1"
      @onConfirm="onConfirm"
    />
    <search-check-dailog
      :is-show="dialogSearchCheckVisible"
      :data="dacList"
      @onClose="dialogSearchCheckVisible = false"
      @onConfirm="onConfirmCheck"
    />
    <update-news
      :is-show="dialogUpdateNewsVisible"
      @onClose="dialogUpdateNewsVisible = false"
    />
    <upload
      :is-show="dialogUploadVisible"
      @onClose="dialogUploadVisible = false"
    />
  </div>
</template>
<script>
import { search } from '@/mixins/search-params'

import { getWfdemoList } from '@/api/bud/wfdemo.js'
import { getAllOrgAndUserTree } from '@/api/admin/org-api'
import { formValidator } from '@/mixins/form-validator.js'
import DictWrite from '@/components/DictWrite'
import { permission } from '@/mixins/permission-mixin'
import UpdateNews from '@/components/UpdateNews'
import Upload from '@/components/UploadNew'
import searchDailog from './_search.vue'
import searchCheckDailog from './_searchCheck.vue'

var elementResizeDetectorMaker = require('element-resize-detector')
import $ from 'jquery'
import 'jquery.nicescroll'

export default {
  components: {
    DictWrite,
    searchDailog,
    searchCheckDailog,
    UpdateNews,
    Upload
  },
  mixins: [search, formValidator, permission],
  data() {
    return {

      // 新加结束
      theme: localStorage.getItem('theme') !== 'Dark' ? 'Light' : '',
      radioNumner: -1,
      searchPopover: false,
      orgChoseDilog: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      expandedKeys: [],
      cities: [],
      dialogSearchVisible: false,
      dialogSearchCheckVisible: false,
      dialogUpdateHistoryVisible: false,
      dialogUpdateNewsVisible: false,
      dialogUploadVisible: false,
      funcNo: '',
      isLoading: true,
      activeNames: ['1'],
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
      uploadDialog: false,
      id: '',
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          omnibus: '', // 统括
          department: '', // 部门
          accountClassifiy: '', // 客户分类
          transactionType: '', // 交易类型
          sales: '', // 营业担当
          iseffective: false, // 是否有效
          PJGNO: '',
          quotationCommitDate: '', // 提案截止日期
          identiferNum: '', // 报价编号
          quotationName: '', // 项目名称
          quotationType: '1', // 报价种类
          accountName: '' // 客户名称
        }
      },
      options: [],
      scrollColr: localStorage.getItem('theme') !== 'Dark' ? '#D8E0E8' : '#5A5E63',
      selectData: '',
      orgAddOrEdit: ''
    }
  },
  created: function() {
    this.fetchData()
  },
  mounted() {
    this.searchTree()
    var erd = elementResizeDetectorMaker()
    var that = this
    erd.listenTo(that.$refs.apply, function(element) {
      that.$nextTick(function() {
        $('.el-table__body-wrapper').getNiceScroll().resize()
      })
    })
    this.getScrollBar()
  },
  methods: {
    headerDragend() {
      this.$refs.table.doLayout()
    },
    async searchTree() {
      const res = await getAllOrgAndUserTree()
      if (res && res.success) {
        this.cities = res.datas.result
        if (this.cities) {
          this.expandedKeys = this.cities.map(item => item.id)
        }
        console.log('cities', res.datas.result)
      }
    },
    getChecked(data, node, ischeck) {
      if (node.isLeaf) {
        console.log('node', node)
        this.searchParam.params.sales = data.text
        this.searchPopover = false
        console.log('data', data)
        console.log('node', node.data)
        console.log('ischeck', ischeck)
      }
    },
    onConfirm(item) {
      this.radioNumner = -1
      this.dialogSearchVisible = false
      this.dacList.push(item)
    },
    onCheck() {
      this.dialogSearchVisible = false
      this.dialogSearchCheckVisible = true
    },
    onConfirmCheck(arr) {
      this.dialogSearchCheckVisible = false
      arr.map(item => {
        console.log('item', item)
        this.dacList.push(item)
      })
    },
    openUpdata() {
      this.dialogUpdateNewsVisible = true
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
    openDialog() {
      this.dialogSearchVisible = true
    },
    selectP(data) {
      console.log('data', data)
      this.selectData = data
    },
    onUserTree() {
      this.orgChoseDilog = true
    },
    handleNodeClick(data) {
      console.log('data', data)
      if (data) {
        this.searchParam.params.sales = data.name
      }
      this.orgChoseDilog = false
    },
    handleSizeChange(size) {
      console.log('ccccccc', size)
      if (datas) {
        this.searchParam.pageSize = size
      }
    },
    handleAdd() {
      this.$router.push('/wfdemo/apply')
    },
    handleEdit() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loading.close()
      }, 2000)
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
      const res = await getWfdemoList(this.searchParam)

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
      this.$router.push(path, '/wfdemo/approve')
    },
    dateFtt(fmt, time) {
      let date
      if (!time) {
        date = new Date()
      } else {
        date = new Date(time)
      }
      const o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
      return fmt
    }
  }
}
</script>

