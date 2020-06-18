<template>
  <div :class="theme=='Light'?'apply advice-page adr-light':'apply advice-page'">
    <div class="search-left-box tree-org-user">
      <el-scrollbar>
        <el-tree
          ref="tree"
          :data="data"
          node-key="id"
          :highlight-current="false"
          :default-expanded-keys="expandedKeys"
          :expand-on-click-node="true"
          @node-click="selectNode"
        >
          <template slot-scope="scope">
            <div class="custom-tree-node">
              <div class="tree_item">
                {{ scope.data.name }}
              </div>
            </div>
          </template>
        </el-tree>
      </el-scrollbar>
    </div>
    <div class="advice-content content">
      <div class="flex-height-table">
        <div class="content-top-state">
          <div class="content-top-breadcrumb">
            <!-- <div class="state-status operation-item">
               <span class="operation-circle circle-middle-btn btn-light-color">
                <i class="iconfont iconbumenguanli" />
              </span> -->
            <!--<span class="operation-text" @click="operShow">当前部门<i class="iconfont iconshuangjiantouyou" /><p v-show="showFlag">iVision >営業統括 >営業推進部 > 営業第4</p></span>
            </div> -->
            <div class="advice-title-items" style="display: grid;">
              <span class="operation-text" style="font-weight: bold;">所在组织位置<i class="iconfont iconshuangjiantouyou" /><p>
                <template>
                  iVision >BS統括
                </template>
              </p></span>
            </div>
          </div>
          <el-form :model="form" label-width="78px" label-position="left" class="content-top-form">
            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="年度" class="big-input">
                  <el-input v-model="form.year" disabled>
                    <i slot="suffix" class="iconfont iconbuke" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="科目" class="big-input">
                  <el-select v-model="form.subject" style="width:100%" placeholder="请选择" :popper-class="theme=='Light'?'blueSelect':''">
                    <el-option
                      v-for="item in subjectList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="查看类别" class="big-input">
                  <el-select v-model="form.classify" style="width:100%" placeholder="请选择" :popper-class="theme=='Light'?'blueSelect':''" @change="onChange">
                    <el-option
                      v-for="item in classifyList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="state-department operation-item" @click="onBack">
              <span class="operation-circle circle-middle-btn btn-light-color">
                <i class="iconfont iconjiantouarrowhead7" />
              </span>
              <span class="operation-text">返回</span>
            </div>
          </el-form>
        </div>
        <div class="table-bg-box table-span-style  table-advice-span-style marigin-bottom">
          <el-table
            v-loading="loading"
            :data="tableData"
            border
            stripe
            :span-method="arraySpanMethod"
            style="width: 100%"
            height="100%"
          >
            <el-table-column
              prop="itemName"
              align="center"
              label="部门名称"
              min-width="110"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              label="类型"
              show-overflow-tooltip
            >
              <el-table-column
                prop="budDiv"
                align="center"
                width="50"
                show-overflow-tooltip
              />
              <el-table-column
                prop="typeDiv"
                align="center"
                width="90"
                show-overflow-tooltip
              />
            </el-table-column>
            <el-table-column prop="total" label="合计" header-align="center" align="right" min-width="135" show-overflow-tooltip>
              <template slot="header">
                <span class="table-total-icon" @click="showYear">合计
                  <i v-if="!isShowYear" class="iconfont iconjiantouyou" />
                  <i v-else class="iconfont iconjiantouarrowhead7" /></span>
              </template>
              <template slot-scope="scope">
                {{ scope.row.total }}
              </template>
            </el-table-column>
            <el-table-column v-if="isShowYear" prop="firstHalfYear" label="上半年" header-align="center" align="right" min-width="135" show-overflow-tooltip />
            <el-table-column v-if="isShowYear" prop="secondHalfYear" label="下半年" header-align="center" align="right" min-width="135" show-overflow-tooltip />
            <el-table-column prop="jan" label="一月" header-align="center" align="right" min-width="102" show-overflow-tooltip />
            <el-table-column prop="feb" label="二月" header-align="center" align="right" min-width="102" show-overflow-tooltip />
            <el-table-column prop="mar" label="三月" header-align="center" align="right" min-width="102" show-overflow-tooltip />
            <el-table-column prop="apr" label="四月" header-align="center" align="right" min-width="102" show-overflow-tooltip />
            <el-table-column prop="may" label="五月" header-align="center" align="right" min-width="102" show-overflow-tooltip />
            <el-table-column prop="jun" label="六月" header-align="center" align="right" min-width="102" show-overflow-tooltip />
            <el-table-column prop="jul" label="七月" header-align="center" align="right" min-width="102" show-overflow-tooltip />
            <el-table-column prop="aug" label="八月" header-align="center" align="right" min-width="102" show-overflow-tooltip />
            <el-table-column prop="sept" label="九月" header-align="center" align="right" min-width="102" show-overflow-tooltip />
            <el-table-column prop="oct" label="十月" header-align="center" align="right" min-width="102" show-overflow-tooltip />
            <el-table-column prop="nov" label="十一月" header-align="center" align="right" min-width="102" show-overflow-tooltip />
            <el-table-column prop="dec" label="十二月" header-align="center" align="right" min-width="102" show-overflow-tooltip />
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllOrgTree } from '@/api/admin/org-api.js'
import $ from 'jquery'
import 'jquery.nicescroll'
import department from './department'
import child from './child'
export default {
  data() {
    return {
      theme: localStorage.getItem('theme') !== 'Dark' ? 'Light' : '',
      showFlag: false,
      data: [],
      listTabs: [],
      activeTabs: '',
      activeOperation: '',
      visible: false,
      expandedKeys: [],
      isShowYear: false,
      scrollColr: '#5A5E63',
      form: {
        year: '2020',
        subject: '办公用品费',
        classify: '0'
      },
      subjectList: [
        {
          value: '办公用品费',
          label: '办公用品费'
        },
        {
          value: '通讯费',
          label: '通讯费'
        },
        {
          value: '保险费',
          label: '保险费'
        }
      ],
      classifyList: [
        {
          value: '0',
          label: '详情'
        },
        {
          value: '1',
          label: '实绩'
        },
        {
          value: '2',
          label: '预算'
        },
        {
          value: '3',
          label: '禀议中'
        },
        {
          value: '4',
          label: '禀议通过'
        }
      ],
      tableData: [],
      originalData: [], // table数据备份
      itemNameArr: [], // 省份要合并数组 [2,0,1,3,0,0] 代表第一二行合并,第三行不变,第四五六行合并,0代表原本的那一行被合并,因此这个列被消除
      itemNamePos: 0, // 省份要合并数组内容的序号
      budDivArr: [], // 同上 市
      budDivPos: [],
      typeDivArr: [], // 同上 区
      typeDivPos: [],
      formInline: { // form表单
        search: ''
      },
      loading: false,
      activeName: null
    }
  },
  watch: {
    $route(to, from) {
      // console.log(to)
      this.activeName = to.query.name
    }
  },
  created() {
    this.form.classify = this.$route.query.id
    const id = this.form.classify
    console.log(id)
    if (id === '0') {
      this.tableData = department.detail.datas.data
    } else if (id === '2') {
      this.tableData = department.budget.datas.data
    }
  },
  mounted() {
    console.log(localStorage.getItem('theme'))
    this.merage()
    this.getScrollBar()
    this.searchTree()
    this.form.subject = this.$route.query.name || '办公用品费'
    const content = document.getElementsByClassName('content')[0]
    console.log('content', content)
    const dom = content.getElementsByClassName(' el-scrollbar__wrap')[0]
    dom.addEventListener('scroll', this.scroll)
  },
  methods: {
    scroll() {
      console.log('aa')
      $('.el-table__body-wrapper').getNiceScroll().resize()
    },
    // 点击节点
    selectNode(target) {
      console.log('target', child)
      if (target.children === null) {
        this.tableData = child.detail.datas.data
      } else {
        this.tableData = department.detail.datas.data
      }
      this.activeName = target.name
    },
    async searchTree() {
      const res = await getAllOrgTree()
      if (res && res.success) {
        this.data = res.datas.orgs
        // 默认展开
        if (this.data) {
          // this.expandedKeys = this.data.map(item => item.id)
          this.data.map(items => {
            console.log('items', items)
            this.expandedKeys.push(items.id)
            this.activeName = items.name
          })
        }
      }
    },
    onChange(value) {
      console.log('查看类别选中的值', value)
      if (value === '0') {
        this.$router.push({
          path: '/adr/edit',
          query: {
            id: value,
            name: this.form.subject
          }
        })
        // this.form.classify = value
      }
      if (value === '1') {
        this.$router.push({
          path: '/adr/actual',
          query: {
            id: value,
            name: this.form.subject
          }
        })
      }
      if (value === '2') {
        this.$router.push({
          path: '/adr/budget',
          query: {
            id: value,
            name: this.form.subject
          }
        })
      }
      if (value === '3') {
        this.$router.push({
          path: '/adr/running',
          query: {
            id: value,
            name: this.form.subject
          }
        })
      }
      if (value === '4') {
        this.$router.push({
          path: '/adr/adopt',
          query: {
            id: value,
            name: this.form.subject
          }
        })
      }
    },
    showYear() {
      this.isShowYear = !this.isShowYear
    },
    onBack() {
      this.$router.push('/adr/list')
    },
    merage() {
      // 要合并的数组的方法
      this.merageInit()
      for (var i = 0; i < this.tableData.length; i++) {
        if (i === 0) {
          // 第一行必须存在
          this.itemNameArr.push(1)
          this.itemNamePos = 0

          this.budDivArr.push(1)
          this.budDivPos = 0
          this.typeDivArr.push(1)
          this.typeDivPos = 0
        } else {
          // 判断当前元素与上一个元素是否相同 this.itemNamePos是itemNameArr内容的序号

          if (this.tableData[i].itemName === this.tableData[i - 1].itemName) {
            this.itemNameArr[this.itemNamePos] += 1
            this.itemNameArr.push(0)
          } else {
            this.itemNameArr.push(1)
            this.itemNamePos = i
          }

          if (this.tableData[i].budDiv === this.tableData[i - 1].budDiv && this.tableData[i].itemName === this.tableData[i - 1].itemName) {
            this.budDivArr[this.budDivPos] += 1
            this.budDivArr.push(0)
          } else {
            this.budDivArr.push(1)
            this.budDivPos = i
          }

          if (this.tableData[i].typeDiv === this.tableData[i - 1].typeDiv && this.tableData[i].budDiv === this.tableData[i - 1].budDiv && this.tableData[i].itemName === this.tableData[i - 1].itemName) {
            this.typeDivArr[this.typeDivPos] += 1
            this.typeDivArr.push(0)
          } else {
            this.typeDivArr.push(1)
            this.typeDivPos = i
          }
        }
      }
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1 && row.budDiv !== '禀议') {
        return {
          rowspan: 1,
          colspan: 2
        }
      } else if (columnIndex === 2 && row.budDiv !== '禀议') {
        return {
          rowspan: 0,
          colspan: 0
        }
      }

      if (columnIndex === 0) {
        const _row_1 = this.itemNameArr[rowIndex]
        const _col_1 = _row_1 > 0 ? 1 : 0
        return {
          rowspan: _row_1,
          colspan: _col_1
        }
      } else if (columnIndex === 1) {
        const _row_2 = this.budDivArr[rowIndex]
        const _col_2 = _row_2 > 0 ? 1 : 0
        return {
          rowspan: _row_2,
          colspan: _col_2
        }
      } else if (columnIndex === 2) {
        const _row_3 = this.typeDivArr[rowIndex]
        const _col_3 = _row_3 > 0 ? 1 : 0
        return {
          rowspan: _row_3,
          colspan: _col_3
        }
      }
    },
    merageInit() {
      this.itemNameArr = []
      this.itemNamePos = 0
      this.budDivArr = []
      this.budDivPos = 0
      this.typeDivArr = []
      this.typeDivPos = 0
    },
    getSummaries(param) {

    },
    getScrollBar() {
      $('.el-table__body-wrapper').niceScroll({
        cursorcolor: localStorage.getItem('theme') !== 'Dark' ? '#D8E0E8' : '#5A5E63',
        cursoropacitymin: 0, // 当滚动条是隐藏状态时改变透明度, 值范围 1 到 0
        cursoropacitymax: 1, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
        cursorwidth: '8px', // 滚动条的宽度，单位：便素
        cursorborder: `1px solid ${localStorage.getItem('theme') !== 'Dark' ? '#D8E0E8' : '#5A5E63'}`, // CSS方式定义滚动条边框
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
    operShow() {
      this.showFlag = !(this.showFlag)
    }
  }
}
</script>
<style lang="scss">
.table-advice-span-style {
  .el-table__header .has-gutter tr:nth-child(2) {
    display: none;
  }
  .el-table--border th {
    border-bottom-color: #44474e;
    border-right-color: #44474e;
  }

  // .el-table__row td:first-child,
  // .el-table__row .el-table_1_column_2_column_3,
  // .el-table__row .el-table_1_column_2_column_4{
  //   border-bottom:1px solid #44474e;
  // }
  .el-table__row {
    td:first-child {
      border-bottom: 1px solid #44474e;
    }
    td:nth-child(2) {
      border-bottom: 1px solid #44474e;
    }
  }
  .el-table__row--striped {
    td:nth-child(2) {
      border-bottom: 1px solid #26272c !important;
    }
  }
  tr:nth-child(6n-1) td:nth-child(2) {
    border-bottom: 1px solid #26272c !important;
  }
}
</style>

