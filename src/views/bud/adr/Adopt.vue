<template>
  <div :class="theme=='Light'?'apply advice-page adradopt-light':'apply advice-page'">
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
      <div class="content-top-state">
        <div class="content-top-breadcrumb">
          <!-- <div class="state-status operation-item">
            <span class="operation-text" @click="operShow">当前部门<i class="iconfont iconshuangjiantouyou" /><p v-show="showFlag">iVision >営業統括 >営業推進部 > 営業第4</p></span>
          </div> -->
          <div class="advice-title-items" style="display: grid;">
            <span class="operation-text" style="font-weight: bold;">所在组织位置<i class="iconfont iconshuangjiantouyou" /><p>
              <template>
                iVision >BS統括 >金融系统部
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
          <el-row type="flex" justify="space-between">
            <el-col :span="7">
              <el-form-item label="禀议编号" class="big-input">
                <el-select v-model="form.number" style="width:100%" placeholder="" :popper-class="theme=='Light'?'blueSelect':''">
                  <el-option
                    v-for="item in numberList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="禀议模板" class="big-input">
                <el-input v-model="form.templateName" />
              </el-form-item>
            </el-col>
            <el-col :span="7" />
          </el-row>
          <div class="state-department operation-item" @click="onBack">
            <span class="operation-circle circle-middle-btn btn-light-color">
              <i class="iconfont iconjiantouarrowhead7" />
            </span>
            <span class="operation-text">返回</span>
          </div>
          <!-- <el-form-item style="margin-bottom:0 !important">
            <div class="dialog-btn-box">
              <div>
                <span class="circle-bigger-btn btn-light-color"><i class="iconfont iconsousuo" /></span>
                <span class="dialog-btn-text">检&nbsp;索</span>
              </div>
            </div>
          </el-form-item> -->
        </el-form>
      </div>
      <div class="table-bg-box search-list-table">
        <el-table
          :data="tableData"
          stripe
          border
          height="100%"
          style="width: 100%"
        >
          <el-table-column
            fixed
            prop="number"
            label="禀议编号"
            min-width="100"
            align="center"
          >
            <template slot-scope="scope">
              <div class="advice-watch-btn" @click="handleWatchNum(scope.$index, scope.row)">
                <!-- <i class="iconfont iconchakan" /> -->
                <a class="link"> {{ scope.row.number }}</a>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            fixed
            prop="name"
            label="禀议模板"
            min-width="200"
            show-overflow-tooltip
            header-align="center"
            align="left"
          />
          <el-table-column
            prop="money"
            label="禀议金额"
            min-width="102"
            header-align="center"
            align="right"
            show-overflow-tooltip
          />
          <el-table-column
            prop="actual"
            label="实绩"
            min-width="102"
            header-align="center"
            align="right"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.money>0" class="advice-watch-btn" @click="handleWatchActual(scope.$index, scope.row)">
                <!-- <i class="iconfont iconchakan" /> -->
                <a class="link">  {{ scope.row.money }}</a>
              </div>
              <template v-else>
                {{ scope.row.money }}
              </template>
            </template>
          </el-table-column>
          <el-table-column
            prop="balance"
            label="禀议结余"
            header-align="center"
            align="right"
            min-width="102"
            show-overflow-tooltip
          />
          <el-table-column
            prop="user"
            label="使用人"
            align="center"
            min-width="100"
            show-overflow-tooltip
          />
          <el-table-column
            prop="date"
            label="预计使用日"
            min-width="100"
            align="center"
            show-overflow-tooltip
          />
          <el-table-column
            prop="department"
            label="禀议部门"
            align="center"
            min-width="100"
            show-overflow-tooltip
          />
          <el-table-column
            prop="applyName"
            label="禀议申请人"
            min-width="100"
            align="center"
            show-overflow-tooltip
          />
          <el-table-column
            prop="applyDate"
            label="禀议申请时间"
            width="130"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            prop="name"
            min-width="100"
            label="审批履历"
            align="center"
          >
            <template slot-scope="scope">
              <div class="advice-operation-btn advice-watch-btn" @click.prevent="handleProcessInstClick('15051')">
                <i class="iconfont iconchakan" />
                查看
              </div>
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
          :popper-class="theme=='Light'?'blueDL':''"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />

        <el-pagination
          class="page-right"
          :current-page.sync="searchParam.pageNo"
          :page-size="searchParam.pageSize"
          layout="prev,pager,next,slot,jumper"
          :total="searchParam.totalRecord"
          :popper-class="theme=='Light'?'blueDL':''"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
          <span class="iconfont iconjiantou-youzhi page-last-page" @click="toLastPage" />
        </el-pagination>
        <el-pagination class="page-right  page-first" layout="slot">
          <span class="iconfont iconjiantou-zuozhi page-first-page" @click="toFirstPage" />
        </el-pagination>
      </div>
      <el-dialog
        top="0"
        :close-on-click-modal="false"
        class="content-dialog-box"
        custom-class="dialog-drag advice-adopt-dialog"
        :title="adrDialogTitle"
        :visible.sync="dialogVisible"
      >
        <div style="display: flex;flex-direction: column;height: 100%;">
          <ul class="advice-title-box">
            <li class="advice-title-items">
              <span class="advice-items-content">禀议编号：
                <el-input v-model="detail.number" />
              </span>
            </li>
            <li class="advice-title-items">
              <span class="advice-items-content">实绩金额：
                <el-input v-model="detail.money" /></span>
            </li>
          </ul>
          <div class="dialog-table-box">
            <el-table
              :data="detail.data"
              stripe
              border
              height="100%"
              style="width: 100%"
            >
              <el-table-column
                prop="accountNo"
                label="报销流水单号"
                width="130"
                align="center"
              />
              <el-table-column
                prop="serialNo"
                label="发票单号"
                width="140"
                show-overflow-tooltip
                align="center"
              />
              <el-table-column
                prop="acconutValue"
                label="报销金额"
                width="120"
                show-overflow-tooltip
                align="center"
              />
              <el-table-column
                prop="cost"
                label="成本中心"
                width="110"
                show-overflow-tooltip
                align="center"
              />
              <el-table-column
                prop="acountName"
                label="报销人"
                width="100"
                show-overflow-tooltip
                align="center"
              />
              <el-table-column
                prop="accountDate"
                label="报销日期"
                width="130"
                show-overflow-tooltip
                align="center"
              />

              <el-table-column
                prop="remarks"
                label="备注"
                show-overflow-tooltip
                header-align="center"
                align="left"
              />
            </el-table>
          </div>
        </div>
      </el-dialog>
    </div>
    <el-dialog id="processDialog" :title="$t('workflow.detailedProcess') + processInstId" :visible.sync="dialogTableVisible" width="80%">
      <process-detail :key="processInstId" :process-inst-id="processInstId" />
    </el-dialog>
  </div>
</template>
<script>
import { getAllOrgTree } from '@/api/admin/org-api.js'
import { getAdrApplyList } from '@/api/bud/adr/adr-api.js'
import ProcessDetail from '@/components/ProcessDetail'
import { search } from '@/mixins/search-params'
import $ from 'jquery'
import 'jquery.nicescroll'
export default {
  components: {
    ProcessDetail
  },
  mixins: [search],
  data() {
    return {
      theme: localStorage.getItem('theme') != 'Dark' ? 'Light' : '',
      data: [],
      listTabs: [],
      activeTabs: '',
      activeOperation: '',
      visible: false,
      expandedKeys: [],
      dialogVisible: false,
      scrollColr: localStorage.getItem('theme') !== 'Dark' ? '#D8E0E8' : '#5A5E63',
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: 3, // 总条数
        params: {

        }
      },
      showFlag: false,
      form: {
        year: '2020',
        subject: '办公用品费',
        classify: '0',
        number: ''
      },
      adrDialogTitle: '',
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
      numberList: [
        {
          value: '0',
          label: '编号1'
        },
        {
          value: '1',
          label: '编号2'
        }
      ],

      tableData: [{
        number: 'By0001',
        name: '文件采购申请表',
        money: '600.00',
        actual: '600.00',
        balance: '500.00',
        user: '李四',
        date: '2020-04-19',
        department: '金融系统部',
        applyName: '李四',
        applyDate: '2020-04-01'
      }, {
        number: 'By0002',
        name: '数码设备采购申请表',
        money: '0.00',
        actual: '600.00',
        balance: '500.00',
        user: '李四',
        date: '2020-04-19',
        department: '金融系统部',
        applyName: '李四',
        applyDate: '2020-04-01'
      }, {
        number: 'By0003',
        name: '自社情报机器采购申请表',
        money: '400.00',
        actual: '600.00',
        balance: '500.00',
        user: '李四',
        date: '2020-04-19',
        department: '金融系统部',
        applyName: '李四',
        applyDate: '2020-04-01'
      }, {
        number: 'By0001',
        name: '文件采购申请表',
        money: '600.00',
        actual: '600.00',
        balance: '500.00',
        user: '李四',
        date: '2020-04-19',
        department: '金融系统部',
        applyName: '李四',
        applyDate: '2020-04-01'
      }, {
        number: 'By0002',
        name: '数码设备采购申请表',
        money: '0.00',
        actual: '600.00',
        balance: '500.00',
        user: '李四',
        date: '2020-04-19',
        department: '金融系统部',
        applyName: '李四',
        applyDate: '2020-04-01'
      }, {
        number: 'By0003',
        name: '自社情报机器采购申请表',
        money: '400.00',
        actual: '600.00',
        balance: '500.00',
        user: '李四',
        date: '2020-04-19',
        department: '金融系统部',
        applyName: '李四',
        applyDate: '2020-04-01'
      }, {
        number: 'By0001',
        name: '文件采购申请表',
        money: '600.00',
        actual: '600.00',
        balance: '500.00',
        user: '李四',
        date: '2020-04-19',
        department: '金融系统部',
        applyName: '李四',
        applyDate: '2020-04-01'
      }, {
        number: 'By0002',
        name: '数码设备采购申请表',
        money: '0.00',
        actual: '600.00',
        balance: '500.00',
        user: '李四',
        date: '2020-04-19',
        department: '金融系统部',
        applyName: '李四',
        applyDate: '2020-04-01'
      }, {
        number: 'By0003',
        name: '自社情报机器采购申请表',
        money: '400.00',
        actual: '600.00',
        balance: '500.00',
        user: '李四',
        date: '2020-04-19',
        department: '金融系统部',
        applyName: '李四',
        applyDate: '2020-04-01'
      }, {
        number: 'By0001',
        name: '文件采购申请表',
        money: '600.00',
        actual: '600.00',
        balance: '500.00',
        user: '李四',
        date: '2020-04-19',
        department: '金融系统部',
        applyName: '李四',
        applyDate: '2020-04-01'
      }, {
        number: 'By0002',
        name: '数码设备采购申请表',
        money: '0.00',
        actual: '600.00',
        balance: '500.00',
        user: '李四',
        date: '2020-04-19',
        department: '金融系统部',
        applyName: '李四',
        applyDate: '2020-04-01'
      }, {
        number: 'By0003',
        name: '自社情报机器采购申请表',
        money: '400.00',
        actual: '600.00',
        balance: '500.00',
        user: '李四',
        date: '2020-04-19',
        department: '金融系统部',
        applyName: '李四',
        applyDate: '2020-04-01'
      }],
      detail: {
        number: null,
        money: null,
        data: [
          {
            accountNo: 'BXD-00001',
            serialNo: '3000005648216',
            acconutValue: '125,000.00',
            acountName: '李四',
            accountDate: '2020-04-20',
            cost: '金融部',
            remarks: 'BXD-00001'
          },
          {
            accountNo: 'BXD-00002',
            serialNo: '3000005648217',
            acconutValue: '125,000.00',
            acountName: '周芷若',
            accountDate: '2020-04-20',
            cost: '金融部',
            remarks: 'BXD-00002'
          }
        ]
      },
      dialogTableVisible: false
    }
  },
  mounted() {
    this.form.classify = this.$route.query.id || '0'
    this.form.subject = this.$route.query.name || '办公用品费'
    // 拖拽
    $('.dialog-drag').draggable({
      cursor: 'move',
      handle: '.el-dialog__header,.advice-title-box',
      refreshPositions: true,
      containment: 'parent',
      stop() {
        $('.el-table__body-wrapper').getNiceScroll().resize()
        $('.el-dialog__body').getNiceScroll().resize()
      }
    })
    // 缩放
    // const self = this
    $('.dialog-drag').resizable({
      aspectRatio: false,
      containment: '.content-dialog-box',
      stop: function(event, ui) {
        $('.el-table__body-wrapper').getNiceScroll().resize()
        $('.el-dialog__body').getNiceScroll().resize()
      }
    })
    this.getScrollBar()
    this.searchTree()
  },
  methods: {
    async searchTree() {
      const res = await getAllOrgTree()
      if (res && res.success) {
        this.data = res.datas.orgs
        // 默认展开
        // if (this.data) {
        //   this.loadTree(this.data)
        // }
        if (this.data) {
          // this.expandedKeys = this.data.map(item => item.id)
          this.data.map(items => {
            console.log('items', items)

            this.expandedKeys.push(items.id)
          })
        }
      }
    },
    onBack() {
      this.$router.push('/adr/list')
    },
    // 点击节点
    selectNode(target) {
      console.log('target', target)
      //   this.activeName = target.name
    },
    handleWatchNum(index, row) {
      // this.detail.number = row.number
      // this.detail.money = row.money
      // this.dialogVisible = true
      // const self = this
      // setTimeout(function() {
      //   self.getScrollBar()
      //   self.getDragBar()
      // })
      this.$router.push({ path: '/ada/edit' })
    },
    handleWatchActual(index, row) {
      this.detail.number = row.number
      this.detail.money = row.money
      this.adrDialogTitle = '实绩'
      this.dialogVisible = true
      const self = this
      setTimeout(function() {
        self.getScrollBar()
        self.getDragBar()
      })
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
    operShow() {
      this.showFlag = !(this.showFlag)
    },
    getScrollBar() {
      $('.el-table__body-wrapper').niceScroll({
        cursorcolor: this.scrollColr,
        cursoropabudDivmin: 0, // 当滚动条是隐藏状态时改变透明度, 值范围 1 到 0
        cursoropabudDivmax: 1, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
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
    handleProcessInstClick: function(processInstId) {
      this.processInstId = processInstId
      this.dialogTableVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.advice-money-btn i,
.advice-watch-btn i {
  margin-right: 8px;
  font-size: 16px;
}
</style>
