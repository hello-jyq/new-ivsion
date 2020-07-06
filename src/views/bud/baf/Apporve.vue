<template>
  <div :class="theme=='Light'?'apply  apply-light':'apply'">
    <div class="search-left-box tree-org-user" @click="hideOperation(activeOperation || '')">
      <el-popover placement="bottom-end" :visible-arrow="false" trigger="hover" :popper-class="theme=='Light' ? 'tree-help-popper blueHover' : 'tree-help-popper'">
        <ul>
          <li class="tree-help-items">
            <span class="selfIcon"><i class="iconfont iconicon_suo-" /></span>
            <span>- 代表自己锁定,可解锁</span>
          </li>
          <li class="tree-help-items">
            <span class="otherIcon"><i class="iconfont iconicon_suo-" /></span>
            <span>- 代表他人锁定,不可解锁</span>
          </li>
          <li class="tree-help-items">
            <span class="confirmIcon"><i class="iconfont iconqueren" /></span>
            <span>- 代表已确认状态</span>
          </li>
          <li class="tree-help-items">
            <span class="permissionIcon"><i class="iconfont iconbuke" /></span>
            <span>- 无权限查看</span>
          </li>
        </ul>
        <span slot="reference" class="tree-help"><i class="iconfont iconbangzhu" /></span>
      </el-popover>
      <div class="tree-box-wrap">
        
           <el-tree
            ref="tree"
            :data="data"
            node-key="id"
            :highlight-current="false"
            :default-expanded-keys="expandedKeys"
            :expand-on-click-node="false"
            @node-click="selectNode"
            @node-contextmenu="operation"
            @node-collapse="nodeChange"
            @node-expand="nodeChange"
          >
            <template slot-scope="scope">
              <div class="custom-tree-node">
                <div class="tree_item">
                  {{ scope.data.name }}
                </div>
              </div>
            </template>
          </el-tree>
        
      </div>
      <!-- <el-scrollbar>
    
       <div class="auto-tree">
          <el-scrollbar>
         
          <el-tree
          ref="tree"
          :data="data"
          node-key="id"
          :highlight-current="false"
          :default-expanded-keys="expandedKeys"
          :expand-on-click-node="true"
          @node-click="selectNode"
          @node-contextmenu="operation"
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
      </el-scrollbar> -->
    </div>
    <div :class="theme=='Light'?'content  market-light approve-light':'content'">
      <el-scrollbar>
        <div style="overflow-x:hidden" class="con-flex">
          <el-tabs v-model="activeTabs" class="manager-tabs" type="border-card" closable @tab-click="tabClick" @tab-remove="removeTab">
            <el-tab-pane
              v-for="item in listTabs"
              :key="item.id"
              :label="item.name"
              :name="item.id"
            />
          </el-tabs>
          <div class="table-bg-box border-card-table table-span-style marigin-bottom manager-main">
            <div class="content-top-state" style="padding-right:0;padding-top:0">
              <div class="content-top-breadcrumb" style="justify-content:space-between; padding-bottom: 20px;">
                <div class="state-status operation-item-text" style="padding-left:0">
                  <span class="operation-text" style="padding-left:0">当前部门<i class="iconfont iconshuangjiantouyou" />
                    <p>
                      <template v-for="(item,index) in dataList.orgDetails">
                        {{ item.orgName }} <template v-if="index!=dataList.orgDetails.length-1">></template>
                      </template>
                    </p>
                  </span>
                </div>

                <div  :class="theme=='Light'?'state-status  operation-item-text':'state-status  operation-item dark'">
                 <el-popover trigger='manual' class="item" placement="bottom-end" v-model="statueFlag" :popper-class="theme=='Light'?'blueHelp':'darkHelp'">
                  <div :key="index" v-for="(item,index) in dataList.confirmStatus"  :class="item.isConfirmed != '1'?'items confirm':'items'">
                      <span class="circle-btn"><i  :class="item.isConfirmed === '1'?'iconfont iconyiban':'iconfont icondaiban1'" /></span><span class="con-text">{{ item.orgName}}</span>
                  </div>
                  <el-button slot="reference" @click="statueFlag = !statueFlag">当前状态<i class="iconfont iconshuangjiantouyou" /></el-button>
                </el-popover>
              </div>
              </div>
                        <el-form :model="form" label-width="78px" label-position="left" class="content-top-form" style="padding-bottom: 0px">
            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="年度" class="big-input">
                  <el-date-picker
                    v-model="form.year"
                    disabled
                    type="year"
                    prefix-icon="iconfont iconbuke"
                    style="width:100%"
                    :clearable="false"
                    placeholder="选择年"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="模板名称" class="big-input">
                  <el-input v-model="form.templateName" disabled>
                    <i slot="suffix" class="iconfont iconbuke" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7" />
            </el-row>
          </el-form>
            </div>
            <div class="apporve-table-box" >
              <el-table
              ref="table"
                :data="budgetList"
                style="width: 100%;"
                height="100%"
                :span-method="objectSpanMethod"
                :cell-class-name="cellClassName"
                row-key="id"
                border
                stripe
                @row-click="rowClick"
                @header-dragend="headerDragend"
              >
                <el-table-column
                  prop="itemName"
                  label="科目名称"
                 
                  fixed
                  header-align="center"
                  min-width="165"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <!-- 是子集的-->
                    <template v-if="scope.row.isChildren === '1'">
                      <span class="table-tree-item">
                        <i class="iconfont iconjiantou" style="transform: rotate(-90deg) scale(.7);" />
                        <i class="iconfont iconkemu" />
                        {{ scope.row.itemName }}
                        <i class="iconfont iconbianji1 table-edit-icon" />
                      </span>
                    </template>
                    <template v-else>
                      <!-- 科目组 -->
                      <span v-if="scope.row.itemDiv == 'itemGroup'">
                        <i class="iconfont iconcombination" />
                        {{ scope.row.itemName }}
                      </span>
                      <!-- 合计项 -->
                      <span v-else-if="scope.row.itemDiv == 'totalItem'" class="total-item-span">
                        <i class="iconfont iconzonghesum1" />
                        {{ scope.row.itemName }}

                        <el-popover
                          placement="top-start"
                          :visible-arrow="false"
                          width="350"
                          trigger="hover"
                          :popper-class="theme=='Light'?'blueHover':''"
                        >
                          <p style="font-size:12px;line-height:24px;color:#fff">
                            <template v-for="(item,index) in scope.row.totalItemDetails ">
                              {{ item.itemName }}<template v-if="index != scope.row.totalItemDetails.length-1">+</template>
                            </template>
                          </p>
                          <i slot="reference" class="iconfont iconbangzhu" />

                        </el-popover>
                      </span>

                      <!-- 科目 -->
                      <span v-else>
                        <i class="iconfont iconkemu" />
                        {{ scope.row.itemName }}
                        <i class="iconfont iconbianji1 table-edit-icon" />
                      </span>
                    </template>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="budDiv"
                  label="类型"
                  align="center"
                  min-width="60"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <p v-if="scope.row.budDiv == '1'">
                      预算
                    </p>
                    <p v-if="scope.row.budDiv == '2'">
                      估算
                    </p>
                    <p v-if="scope.row.budDiv == '3'">
                      实绩
                    </p>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="total"
                  label="合计"
                  header-align="center"
                  align="right"
                  min-width="135"
                  show-overflow-tooltip
                >
                  <template slot="header">
                    <span class="table-total-icon" @click="showYear">合计
                      <i v-if="!isShowYear" class="iconfont iconjiantouyou" />
                      <i v-else class="iconfont iconjiantouarrowhead7" /></span>
                  </template>
                  <template slot-scope="scope">
                    {{ scope.row.total }}
                  </template>
                </el-table-column>
                <el-table-column
                  v-if="isShowYear"
                  prop="firstHalfYear"
                  label="上半年"
                  header-align="center"
                  align="right"
                  min-width="135"
                  show-overflow-tooltip
                />
                <el-table-column
                  v-if="isShowYear"
                  prop="secondHalfYear"
                  header-align="center"
                  align="right"
                  min-width="135"
                  label="下半年"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="jan"
                  label="一月"
                  header-align="center"
                  align="right"
                  min-width="102"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="feb"
                  label="二月"
                  header-align="center"
                  align="right"
                  min-width="102"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="mar"
                  label="三月"
                  header-align="center"
                  align="right"
                  min-width="102"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="apr"
                  label="四月"
                  header-align="center"
                  align="right"
                  min-width="102"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="may"
                  label="五月"
                  header-align="center"
                  align="right"
                  min-width="102"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="jun"
                  label="六月"
                  header-align="center"
                  align="right"
                  min-width="102"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="jul"
                  label="七月"
                  header-align="center"
                  align="right"
                  min-width="102"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="aug"
                  label="八月"
                  header-align="center"
                  align="right"
                  min-width="102"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="sept"
                  label="九月"
                  header-align="center"
                  align="right"
                  min-width="102"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="oct"
                  label="十月"
                  header-align="center"
                  align="right"
                  min-width="102"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="nov"
                  label="十一月"
                  header-align="center"
                  align="right"
                  min-width="102"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="dec"
                  label="十二月"
                  header-align="center"
                  align="right"
                  min-width="102"
                  show-overflow-tooltip
                />
              </el-table>
            </div>
          </div>

          <div >
            <!-- 审批信息 -->
            <TaskApprove :task-id="'1'" :process-inst-id="'1'" />
          </div>
        </div>
      </el-scrollbar>
    </div>
    <info-dailog ref="info" :dialog-visible="dialogVisible" @onClose="onClose" />
  </div>
</template>

<script>
import { getAllOrgTree } from '@/api/admin/org-api.js'
import { getBafDetail } from '@/api/bud/baf/baf-api.js'
import infoDailog from './_info.vue'
import TaskApprove from '@/components/TaskApprove'
import $ from 'jquery'
import 'jquery.nicescroll'
export default {
  components: {
    TaskApprove,
    infoDailog
  },
  data() {
    return {
      theme: localStorage.getItem('theme') !== 'Dark' ? 'Light' : '',
      dialogVisible: false,
      statueFlag: false,
      dataList: {},
      budgetList: [],
      data: [],
      listTabs: [],
      activeTabs: '',
      activeOperation: '',
      visible: false,
      expandedKeys: [],
      props: {
        name: 'name',
        children: 'zones'
      },
      status: [],
      isShowYear: false,
      spanArr: [],
      formLabelAlign: {
        node: '',
        content: ''
      },
      scrollColr: '#5A5E63',
      form: {
        year: '2020',
        creatName: '吴',
        organizationName: '周',
        templateName: '2020预算模板',
        department: '菱威深根部门'
      }
    }
  },
  updated: function () {
    this.$refs.table.doLayout()
  },
  mounted() {
    this.searchTree()
    this.getScrollBar()
    this.getBafDetail()
    const content = document.getElementsByClassName('content')[0]
    // console.log('content', content)
    const dom = content.getElementsByClassName(' el-scrollbar__wrap')[0]
    dom.addEventListener('scroll', this.scroll)
    this.$nextTick(function () {
      this.getScrollBar()
      $('.el-table__body-wrapper').getNiceScroll().resize()
    })
  },
  methods: {
    headerDragend() {
      this.$refs.table.doLayout()
    },
    async getBafDetail() {
      const res = await getBafDetail()
      if (res && res.success) {
        this.dataList = res.datas
        this.budgetList = res.datas.buds
        this.mountedTable()
      }
    },
    // scroll() {
    //   $('.el-table__body').getNiceScroll().resize()
    // },
    getScrollTree() {
      $('.tree-box-wrap').niceScroll({
        cursorcolor: localStorage.getItem('theme') !== 'Dark' ? '#D8E0E8' : '#5A5E63',
        cursoropacitymin: 0, // 当滚动条是隐藏状态时改变透明度, 值范围 1 到 0
        cursoropacitymax: 1, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
        cursorwidth: '8px', // 滚动条的宽度，单位：便素
        cursorborder: `1px solid ${localStorage.getItem('theme') !== 'Dark' ? '#D8E0E8' : '#5A5E63'}`, // CSS方式定义滚动条边框
        autohidemode: 'leave', // 隐藏滚动条的方式, 可用的值:
        zindex: 99,
        railpadding: { top: 0, right: 0, left: 0, bottom: 0 },
        boxzoom: false,
        iframeautoresize: true // 在加载事件时自动重置iframe大小
      })
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
        railpadding: { top: 0, right: 0, left: 0, bottom: 0 },
        boxzoom: false,
        iframeautoresize: true // 在加载事件时自动重置iframe大小
      })

    },
    // tab选项卡切换
    tabClick(tab) {
      console.log('tab', tab)
      this.$nextTick(function () {
        this.$refs.tree.setCurrentKey(tab.name)
      })
    },
    // tab选项卡移除
    removeTab(targetName) {
      console.log('targetName', targetName)
      const tabs = this.listTabs
      let activeName = this.activeTabs
      console.log('activeName', activeName)
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          console.log('tab', tab)
          if (tab.id === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.id
            }
          }
        })
      }

      this.activeTabs = activeName
      this.listTabs = tabs.filter(tab => tab.id !== targetName)
      console.log('this.activeTabs', this.activeTabs)
      this.$nextTick(function () {
        this.$refs.tree.setCurrentKey(this.activeTabs)
      })
    },
    rowClick(row) {
      console.log('row', row)
      if (row.isChangeEnable === '1') {
        this.dialogVisible = true
      }
    },
    cellClassName({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (row.isChangeEnable === '1') {
          return 'table-cell-hover'
        } else {
          return 'table-cell-total'
        }
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    mountedTable() {
      let contactDot = 0
      this.budgetList.forEach((item, index) => {
        item.index = index
        if (index === 0) {
          this.spanArr.push(1)
        } else {
          // 后一个和前一个相比，相同的存入同一个index,不同的存入index++，**有顺序要求，所以要先排序**
          if (item.itemName === this.budgetList[index - 1].itemName) {
            this.spanArr[contactDot] += 1
            this.spanArr.push(0)
          } else {
            this.spanArr.push(1)
            contactDot = index
          }
        }
      })
    },
    showYear() {
      this.isShowYear = !this.isShowYear
    },
    onClose(obj) {
      this.dialogVisible = obj
    },
    async searchTree() {
      const res = await getAllOrgTree()
      if (res && res.success) {
        this.data = res.datas.orgs
        // 默认展开
        if (this.data) {
          this.$nextTick(function() {
            this.expandedKeys = []
            this.expandedKeys.push('1510')
            this.$refs.tree.setCurrentKey('1511')
            this.activeTabs = '1511'
            // 获取被选中的节点
            const node = this.$refs.tree.getCurrentNode()
            this.listTabs.push(node)
            let _this=this;
            setTimeout(function(){
              _this.getScrollTree()
              $('.tree-box-wrap').getNiceScroll().resize()
            },500)
          })
        }
      }
    },
    nodeChange(){
      let _this=this;
      setTimeout(function(){
        _this.getScrollTree();
        $('.tree-box-wrap').getNiceScroll().resize()
      },500)
    },
    // 点击叶子节点
    selectNode(target) {
      console.log('target', target)
      if (target.children === null) {
        this.listTabs.push(target)
        this.activeTabs = target.id
      }
      this.hideOperation(this.activeOperation || '')
      // 去重
      this.listTabs = [...new Set(this.listTabs)]
      this.nodeChange()
    },
    // 点击右键时触发
    operation(event, data, node, target) {
      console.log(event)
      console.log(data)
      console.log(node)
      console.log(target)
      // 判断前一个的操作菜单是否隐藏
      if (this.activeOperation) {
        this.$refs[this.activeOperation].style.display = 'none'
      }
      this.activeOperation = data.id
      this.$refs[data.id].style.display = 'block'
    },
    // 锁定节点
    onLockDiv(id) {
      this.$refs[id].style.display = 'none'
      console.log('id', id)
    },
    // 隐藏右键操作菜单
    hideOperation(ref) {
      console.log('ref', ref)
      if (ref) {
        this.$refs[ref].style.display = 'none'
      }
    }

  }

}
</script>
<style lang="scss">
// .market-light .el-table::after {
//   content: "";
//   width: 100%;
//   height: 1px;
//   background-color: #dddddd;
// }
.con-flex {
  display: flex;
  flex-direction: column;
  height: 100%;
  .manager-main {
    overflow: hidden;
    display: inline;
    outline: none;
    border-bottom-right-radius: 16px !important;
    border-bottom-left-radius: 16px !important;
    .apporve-table-box {
      height: calc(100% - 120px);
      flex: 1;
    }
  }
  .approval-box {
    height: 100%;
    margin-bottom: 0;
  }
}
.content-top-state .el-form-item {
  margin-bottom: 30px;
}

.content-top-state .el-form-item {
  margin-bottom: 30px;
}

.content-top-btn .operation-item {
  margin-bottom: 30px;
}

.table-tree-item {
  padding-left: 27px;
}

.table-edit-icon {
  display: none;
  font-size: 14px;
}

.table-cell-hover:hover {
  color: #00e2de;
  cursor: pointer;
}

.table-cell-total .cell {
  line-height: 30px;
}

.total-item-span {
  position: relative;

  span {
    position: absolute;
    top: -15px;
    right: -9px;

    i {
      font-size: 12px;
    }
  }
}

.table-cell-hover:hover i {
  display: inline-block;
  color: #00e2de;
}

.table-span-style {
  td:first-child .cell,
  th:first-child .cell {
    padding: 0 10px;
  }
}

.manager-tabs {
  &.el-tabs {
    padding-right: 20px;
  }
  .el-tabs__nav-wrap {
    margin-bottom: -2px;
  }
  &.el-tabs--border-card {
    background-color: transparent;
    border: 0;
    box-shadow: none;
  }
  &.el-tabs--border-card > .el-tabs__header {
    background-color: transparent;
    border-bottom: 2px solid #44474e;
  }
  .el-tabs__item {
    min-width: 120px;
    text-align: center;
    text-align: -webkit-center;
    text-align: -moz-center;
    padding: 0 10px !important;
    margin-right: 10px;
    background: linear-gradient(
      180deg,
      rgba(52, 57, 63, 1) 0%,
      rgba(22, 23, 27, 1) 100%
    );

    border-radius: 16px 16px 0 0;
  }
  &.el-tabs--border-card > .el-tabs__header .el-tabs__item {
    border: 2px solid #44474e;
  }
  &.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    background: linear-gradient(
      180deg,
      rgba(22, 23, 27, 1) 0%,
      rgba(52, 57, 63, 1) 100%
    );
    border: 2px solid #44474e;
    border-bottom: transparent;
  }
  &.el-tabs--border-card > .el-tabs__header .el-tabs__item + .el-tabs__item,
  &.el-tabs--border-card > .el-tabs__header .el-tabs__item:first-child {
    margin-top: 0;
    margin-left: 0;
  }
  &.el-tabs--border-card
    > .el-tabs__header
    .is-scrollable
    .el-tabs__item:first-child {
    margin-left: 10px;
  }
  &.el-tabs--top.el-tabs--border-card
    > .el-tabs__header
    .el-tabs__item:only-child
    .el-icon-close {
    display: none;
  }
  &.el-tabs--border-card > .el-tabs__header .el-tabs__item,
  &.el-tabs--border-card > .el-tabs__header .el-tabs__item.el-tabs,
  &.el-tabs--border-card
    > .el-tabs__header
    .el-tabs__item:not(.is-disabled):hover,
  &.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    font-size: 12px;
    color: #ffffff;
  }
  &.el-tabs--border-card > .el-tabs__content {
    display: none;
  }
  .el-tabs__item .el-icon-close {
    position: relative;
    top: -8px;
    width: 12px;
    height: 12px;
    line-height: 12px;
    color: #f08024;
  }
  .el-tabs__item .el-icon-close:hover {
    background-color: transparent;
    color: #f08024;
  }
  .el-tabs__nav-next,
  .el-tabs__nav-prev {
    color: #fff;
  }
}
.border-card-table {
  border-radius: 0 0 16px 16px;
  border-top: 0;
}

.approval-box {
  padding: 20px;
  margin-bottom: 50px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.5);
  .el-textarea__inner {
    height: 232px;
    overflow: hidden;
  }
}
.approval-box p {
  margin-bottom: 30px;
  font-family: "微软雅黑";
  font-size: 16px;
  font-weight: bold;
  color: #fff;
}

.approval-box {
  padding: 20px;
  margin-bottom: 50px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.5);
  .el-textarea__inner {
    height: 232px;
    overflow: hidden;
  }
}
.approval-box p {
  margin-bottom: 30px;
  font-family: "微软雅黑";
  font-size: 16px;
  font-weight: bold;
  color: #fff;
}

// .el-table__body-wrapper {
//   height: calc(100% - 46px) !important;
// }
.con-flex .manager-main {
  display: flex;
  flex-direction: column;
}
</style>
