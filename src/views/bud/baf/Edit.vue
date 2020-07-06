<template>
  <div :class="theme=='Light'?'apply  apply-light':'apply'">
    <div class="search-left-box tree-org-user" @click="hideOperation(activeOperation || '')">
      <el-popover placement="bottom-end" :visible-arrow="false" trigger="hover" :popper-class="theme=='Light' ? 'tree-help-popper blueHover' : 'tree-help-popper'">
        <ul>
          <li class="tree-help-items">
            <span class="selfIcon"><i class="iconfont iconicon_suo-" /></span>
            <span>-自己锁定,可解锁</span>
          </li>
          <li class="tree-help-items">
            <span class="otherIcon"><i class="iconfont iconicon_suo-" /></span>
            <span>- 他人锁定,不可解锁</span>
          </li>
          <li class="tree-help-items">
            <span class="confirmIcon"><i class="iconfont iconqueren" /></span>
            <span>- 已确认状态</span>
          </li>
          <li class="tree-help-items">
            <span class="permissionIcon"><i class="iconfont iconbuke" /></span>
            <span>- 无权限查看</span>
          </li>
        </ul>
        <span slot="reference" class="tree-help"><i class="iconfont iconbangzhu" /></span>
      </el-popover>
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
              <div class="tree_item" :class="{'tree-confirm-item' : scope.data.confirmDiv === '1'}">
                <!-- 无权限 -->
                <template v-if="scope.data.readDiv === '0'">
                  <el-popover placement="right" :visible-arrow="false" trigger="hover" :popper-class="theme=='Light'?'tree-access-info bluePopover':'tree-access-info'">
                    <p><i class="iconfont iconbuke" />无权限查看</p>
                    <span slot="reference">{{ scope.data.name }}</span>
                  </el-popover>
                </template>
                <!-- 有权限 -->
                <template v-else>
                  <!-- 此处修改了他人锁定展示方式-->
                  <!-- 他人锁定 -->
                  <template v-if="scope.data.lockDiv === '2'">
                    <el-popover placement="bottom-start" :visible-arrow="false" trigger="hover" :popper-class="theme=='Light'?'tree-lock-info bluePopover':'tree-lock-info'">
                      <p>当前锁定人：{{ scope.data.lockUser }}</p>
                      <p>锁定时间：{{ scope.data.lockTime }}</p>
                      <span slot="reference">{{ scope.data.name }}<span class="statusIcon otherIcon"><i class="iconfont iconicon_suo-" /></span></span>
                    </el-popover>
                  </template>
                  <!-- 可锁定 -->
                  <template v-else-if="scope.data.lockDiv === '0'">
                    {{ scope.data.name }}
                    <div v-if="scope.data.editDiv === '1'" :ref="scope.data.id" class="tree-lock-text" @click.stop="onLockDiv(scope.data.id)">
                      锁&nbsp;定
                    </div>
                  </template>
                  <!-- 自己锁定 -->
                  <span v-else>{{ scope.data.name }}<span class="statusIcon selfIcon"><i class="iconfont iconicon_suo-" /></span></span>

                  <!-- 已确认icon -->
                  <template v-if="scope.data.confirmDiv === '1'">
                    <span class="statusIcon confirmIcon">
                      <i class="iconfont iconqueren" />
                    </span>
                  </template>
                </template>
              </div>
            </div>
          </template>
        </el-tree>
      </el-scrollbar>
    </div>
    <div :class="theme=='Light'?'content  market-light':'content'">
      <!-- <el-scrollbar> -->
      <div class="flex-height-table" style="padding-left:5px">
        <div class="content-top-state">
          <div class="content-top-breadcrumb" style="justify-content:space-between; padding-bottom: 20px;">
            <!-- 当前部门(动态效果，开发用) -->
            <!-- <div class="state-status operation-item-text" style="padding-left:0">
              <span class="operation-text" style="padding-left:0">当前部门<i class="iconfont iconshuangjiantouyou" />
                <p>
                  <template v-for="(item,index) in dataList.orgDetails">
                    {{ item.orgName }} <template v-if="index!=dataList.orgDetails.length-1">></template>
                  </template>
                </p>
              </span>
            </div> -->
            <!--当前部门(静态mockup)  -->
            <div class="advice-title-items" style="display: grid;">
              <span class="operation-text" style="font-weight: bold;">所在组织位置<i class="iconfont iconshuangjiantouyou" /><p>
                <template>
                  iVision >BS統括 >産業システム部 > Solution Unit
                </template>
              </p></span>
            </div>
            <!-- <div :class="theme=='Light'?'state-status  operation-item-text':'state-status  operation-item dark'">
              <el-tooltip class="item" effect="light" placement="bottom-end" :popper-class="theme=='Light'?'blueHelp':'darkHelp'">
                <div v-for="(item,index) in dataList.confirmStatus" slot="content" :key="index" :class="item.isConfirmed != '1'?'items confirm':'items'">
                  <span class="circle-btn"><i :class="item.isConfirmed === '1'?'iconfont iconyiban':'iconfont icondaiban1'" /></span><span>{{ item.orgName }}</span>
                </div>
                <el-button>当前状态<i class="iconfont iconshuangjiantouyou" /></el-button>
              </el-tooltip>
            </div> -->
            <div :class="theme=='Light'?'state-status  operation-item-text':'state-status  operation-item dark'">
              <el-popover v-model="statueFlag" trigger="manual" class="item" placement="bottom-end" :popper-class="theme=='Light'?'blueHelp':'darkHelp'">
                <div v-for="(item,index) in dataList.confirmStatus" :key="index" :class="item.isConfirmed != '1'?'items confirm':'items'">
                  <span class="circle-btn"><i :class="item.isConfirmed === '1'?'iconfont iconyiban':'iconfont icondaiban1'" /></span><span class="con-text">{{ item.orgName }}</span>
                </div>
                <el-button slot="reference" @click="statueFlag = !statueFlag">
                  当前状态<i class="iconfont iconshuangjiantouyou" />
                </el-button>
              </el-popover>
            </div>
          </div>
          <el-form :model="form" label-width="78px" label-position="left" class="content-top-form">
            <!-- <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="上次编制人" class="big-input">
                  <el-input v-model="form.organizationName">
                    <i slot="suffix" class="iconfont iconbuke" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="创建人" class="big-input">
                  <el-input v-model="form.creatName">
                    <i slot="suffix" class="iconfont iconbuke" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7" />
            </el-row> -->
            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-form-item label="年度" class="big-input">
                  <el-date-picker
                    v-model="form.year"
                    :disabled="!isPermission"
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
              <!-- <el-col :span="7">
                <el-form-item label="当前部门" class="big-input">
                  <el-input v-model="form.department" disabled>
                    <i slot="suffix" class="iconfont iconbuke" />
                  </el-input>
                </el-form-item>
              </el-col> -->
              <el-col :span="7" />
            </el-row>
          </el-form>
          <!-- v-show="isPermission" -->
          <ul class="content-top-btn">
            <li class="operation-item">
              <span class="operation-circle circle-middle-btn btn-light-color"><i class="iconfont iconxiazai" /></span>
              <span class="operation-text">下载模板</span>
            </li>
            <li class="operation-item">
              <span class="operation-circle circle-middle-btn btn-light-color"><i class="iconfont icondaoru1" /></span>
              <span class="operation-text">导&nbsp;入</span>
            </li>
            <!-- <li class="operation-item">
              <span class="operation-circle circle-middle-btn btn-light-color"><i class="iconfont icontijiao" /></span>
              <span class="operation-text">提&nbsp;交</span>
            </li> -->
            <li class="operation-item">
              <span class="operation-circle circle-middle-btn btn-light-color"><i class="iconfont iconqueren" /></span>
              <span class="operation-text">确认并开锁</span>
            </li>
            <li class="operation-item">
              <span class="operation-circle circle-middle-btn btn-light-color"><i class="iconfont iconquxiao" /></span>
              <span class="operation-text">放弃并开锁</span>
            </li>
            <!-- <li class="operation-item">
              <span class="operation-circle circle-middle-btn btn-light-color"><i class="iconfont iconquxiao1" /></span>
              <span class="operation-text">取消确认</span>
            </li> -->
            <li class="operation-item">
              <span class="operation-circle circle-middle-btn btn-light-color"><i class="iconfont iconrefresh" /></span>
              <span class="operation-text">更新履历</span>
            </li>
            <li class="operation-item">
              <span class="operation-circle circle-middle-btn btn-light-color"><i class="iconfont iconwithdraw-fill" /></span>
              <span class="operation-text">返回首页</span>
            </li>
          </ul>
        </div>
        <div class="table-bg-box table-span-style">
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
              min-width="160"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <!-- 是子集的-->
                <template v-if="scope.row.isChildren === '1'">
                  <span class="table-tree-item">
                    <i class="iconfont iconjiantou" style="display: inline-block;transform: rotate(-90deg) scale(.7);" />
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

                    <el-popover placement="top-start" :visible-arrow="false" width="350" trigger="hover" :popper-class="theme=='Light' ? 'blueHover' : ''">
                      <p style="font-size:12px;line-height:24px;color:#fff">
                        {{ scope.row.itemName }} =
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
            <el-table-column prop="budDiv" label="类型" align="center" min-width="60" show-overflow-tooltip>
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
      <!-- </el-scrollbar> -->
    </div>
    <info-dailog ref="info" :dialog-visible="dialogVisible" @onClose="onClose" />
  </div>
</template>

<script>
import { getAllOrgTree } from '@/api/admin/org-api.js'
import { getBafDetail } from '@/api/bud/baf/baf-api.js'
import infoDailog from './_info.vue'
import $ from 'jquery'
import 'jquery.nicescroll'
export default {
  components: {

    infoDailog
  },
  data() {
    return {
      dataList: {},
      showFlag: true,
      statueFlag: false,
      // 新增结束
      theme: localStorage.getItem('theme') !== 'Dark' ? 'Light' : '',
      dialogVisible: false,
      // 此处修改
      budgetList: [],

      data: [],
      activeKey: '',
      activeOperation: '',
      activeAccessDiv: ' ',
      visible: false,
      expandedKeys: [],
      props: {
        name: 'name',
        children: 'zones'
      },
      spanArr: [],
      isShowYear: false,
      isShow: false,
      isPermission: false,
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
    this.getBafDetail()
    const content = document.getElementsByClassName('content')[0]
    console.log('content', content)
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
        this.$nextTick(function () {
          this.getScrollBar()
        })
      }
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

    rowClick(row) {
      console.log('row', row)
      if (row.isChangeEnable == '1') {
        this.dialogVisible = true
      }
    },
    cellClassName({
      row,
      column,
      rowIndex,
      columnIndex
    }) {
      if (columnIndex === 0) {
        console.log('row.isChangeEnable', row.isChangeEnable === '1')
        if (row.isChangeEnable === '1') {
          return 'table-cell-hover'
        } else {
          return 'table-cell-total'
        }
      }
    },
    objectSpanMethod({
      row,
      column,
      rowIndex,
      columnIndex
    }) {
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
    // 新加当前部门展开收缩
    operShow() {
      this.showFlag = !this.showFlag
    },
    onOpenStatus() {
      this.isShow = !this.isShow
    },
    onClose(obj) {
      this.dialogVisible = obj
    },
    async searchTree() {
      const res = await getAllOrgTree()
      if (res && res.success) {
        this.data = res.datas.orgs
        // 此处修改为默认选中1511结点
        this.$nextTick(function () {
          this.expandedKeys = []
          this.expandedKeys.push('1510')
          this.$refs.tree.setCurrentKey('1511')
          this.activeKey = '1511'
        })
      }
    },
    // 点击叶子节点
    selectNode(target) {
      console.log('target', target)
      if (target.readDiv === '0') {
        // 无权限查看
        this.$refs.tree.setCurrentKey(this.activeKey)
      } else {
        this.activeKey = target.id
        this.hideOperation(this.activeOperation || '')
      }
    },
    // 点击右键时触发
    operation(event, data, node, target) {
      // 判断前一个的操作菜单是否隐藏
      console.log('this.accessDiv', this.activeAccessDiv)
      console.log('data.id', data)
      if (this.activeOperation) {
        this.$refs[this.activeOperation].style.display = 'none'
      }
      // this.activeOperation = data.id
      if (data.editDiv === '1') { // 可以锁定节点
        this.$refs.tree.setCurrentKey(data.id)
        this.activeOperation = data.id
        this.$refs[data.id].style.display = 'block'
      }
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
.table-cell-hover i {
  display: inline-block;
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
    top: -10px;
    right: -15px;

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
</style>
