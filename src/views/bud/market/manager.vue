<template>
  <div style="overflow-x:hidden">
    <el-tabs v-model="activeId" class="manager-tabs" type="border-card" closable @tab-click="tabClick" @tab-remove="removeTab">
      <el-tab-pane
        v-for="item in list"
        :key="item.id"
        :label="item.name"
        :name="item.id"
      />
    </el-tabs>
    <div class="table-bg-box border-card-table table-span-style marigin-bottom">
      <div class="content-top-state">
        <div class="content-top-breadcrumb">
          <div class="state-department operation-item">
            <span class="operation-circle circle-middle-btn btn-light-color">
              <i class="iconfont iconbumenguanli" />
            </span>
            <span class="operation-text">当前部门<i class="iconfont iconshuangjiantouyou" />iVision >営業統括 >営業推進部 > 営業第4</span>
          </div>
          <div class="state-status operation-item" @click="onOpenStatus">
            <span class="operation-circle circle-middle-btn btn-light-color">
              <i class="iconfont iconbumenguanli" />
            </span>
            <span class="operation-text">
              当前状态<i class="iconfont iconshuangjiantouyou" />
              <template v-if="isShow">
                <template v-for="(item,index) in status">
                  <el-tooltip :key="index" effect="dark" placement="top">
                    <div slot="content">{{ item.orgName }}</div>
                    <span :class="{'confirm-text' : item.isConfirmed === '1'}">
                      <template v-if="index !=0">></template>{{ item.orgName }}
                    </span>
                  </el-tooltip>
                </template>
              </template>
            </span>
          </div>
        </div>
      </div>
      <el-table
        :data="dataList"
        style="width: 100%;"
        :span-method="objectSpanMethod"
        :cell-class-name="cellClassName"
        row-key="id"
        border
        stripe
        @row-click="rowClick"
      >
        <el-table-column
          prop="itemName"
          label="科目名称"
          fixed
          header-align="center"
          width="220"
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
          min-width="100"
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
          align="center"
          min-width="100"
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
          align="center"
          min-width="100"
        />
        <el-table-column
          v-if="isShowYear"
          prop="secondHalfYear"
          min-width="100"
          align="center"
          label="下半年"
        />
        <el-table-column
          prop="jan"
          label="一月"
          align="center"
          min-width="100"
        />
        <el-table-column
          prop="feb"
          label="二月"
          align="center"
          min-width="100"
        />
        <el-table-column
          prop="mar"
          label="三月"
          align="center"
          min-width="100"
        />
        <el-table-column
          prop="apr"
          label="四月"
          align="center"
          min-width="100"
        />
        <el-table-column
          prop="may"
          label="五月"
          align="center"
          min-width="100"
        />
        <el-table-column
          prop="jun"
          label="六月"
          align="center"
          min-width="100"
        />
        <el-table-column
          prop="jul"
          label="七月"
          align="center"
          min-width="100"
        />
        <el-table-column
          prop="aug"
          label="八月"
          align="center"
          min-width="100"
        />
        <el-table-column
          prop="sept"
          label="九月"
          align="center"
          min-width="100"
        />
        <el-table-column
          prop="oct"
          label="十月"
          align="center"
          min-width="100"
        />
        <el-table-column
          prop="nov"
          label="十一月"
          align="center"
          min-width="100"
        />
        <el-table-column
          prop="dec"
          label="十二月"
          align="center"
          min-width="100"
        />
      </el-table>
    </div>

    <div class="table-bg-box approval-box">
      <p>审批信息</p>
      <el-form label-width="80px" :model="formLabelAlign">
        <el-form-item label="驳回节点" class="middle-input">
          <el-select v-model="formLabelAlign.node">
            <el-option label="节点一" value="shanghai" />
            <el-option label="节点二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="审批意见" class="middle-input">
          <el-input v-model="formLabelAlign.content" type="textarea" />
        </el-form-item>
      </el-form>
      <div class="dialog-btn-box" style="padding-bottom: 3px;">
        <div class="dialog-btn-right">
          <span class="circle-bigger-btn btn-default-color"><i class="iconfont iconbaocun" /></span>
          <span class="dialog-btn-text"> 暂&nbsp;存</span>
        </div>
        <div class="dialog-btn-right">
          <span class="circle-bigger-btn btn-light-color"><i class="iconfont icontijiao" /></span>
          <span class="dialog-btn-text">提&nbsp;交</span>
        </div>
        <div class="dialog-btn-right">
          <span class="circle-bigger-btn btn-default-color"><i class="iconfont iconqueren" /></span>
          <span class="dialog-btn-text">同&nbsp;意</span>
        </div>
        <div class="dialog-btn-right">
          <span class="circle-bigger-btn btn-default-color"><i class="iconfont iconquxiao" /></span>
          <span class="dialog-btn-text">驳&nbsp;回</span>
        </div>
        <div class="dialog-btn-right">
          <span class="circle-bigger-btn btn-default-color"><i class="iconfont iconyiban" /></span>
          <span class="dialog-btn-text">审批履历</span>
        </div>
        <div>
          <span class="circle-bigger-btn btn-default-color"><i class="iconfont iconwithdraw-fill" /></span>
          <span class="dialog-btn-text">驳&nbsp;回</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import 'jquery.nicescroll'
export default {
  props: {
    dataList: {
      type: Array,
      default: function() {
        return []
      }
    },
    status: {
      type: Array,
      default: function() {
        return []
      }
    },
    list: {
      type: Array,
      default: function() {
        return []
      }
    },
    activeTabs: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isShow: false,
      isShowYear: false,
      spanArr: [],
      formLabelAlign: {
        node: '',
        content: ''
      },
      activeId: '',
      editableTabs: [{
        title: 'Tab 1',
        name: '1',
        content: 'Tab 1 content'
      }, {
        title: 'Tab 2',
        name: '2',
        content: 'Tab 2 content'
      }],
      scrollColr: '#5A5E63'
    }
  },
  watch: {
    activeTabs: function(newVal) {
      this.activeId = newVal
    }
  },
  mounted() {
    this.mountedTable()
    this.getScrollBar()
    this.activeId = this.activeTabs
    // el-scrollbar__wrap
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
    getScrollBar() {
      $('.el-table__body-wrapper').niceScroll({
        cursorcolor: this.scrollColr,
        cursoropacitymin: 0, // 当滚动条是隐藏状态时改变透明度, 值范围 1 到 0
        cursoropacitymax: 1, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
        cursorwidth: '8px', // 滚动条的宽度，单位：便素
        cursorborder: `1px solid ${this.scrollColr}`, // CSS方式定义滚动条边框
        autohidemode: true, // 隐藏滚动条的方式, 可用的值:
        zindex: 99,
        railpadding: { top: 0, right: 0, left: 0, bottom: 0 },
        boxzoom: false,
        iframeautoresize: true // 在加载事件时自动重置iframe大小
      })
    },
    onOpenStatus() {
      this.isShow = !this.isShow
    },
    tabClick(tab) {
      console.log('tab', tab)
      this.$emit('tabClick', tab)
    },
    removeTab(targetName) {
      console.log('targetName', targetName)
      const tabs = this.list
      let activeName = this.activeId
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

      this.activeId = activeName
      this.list = tabs.filter(tab => tab.id !== targetName)
      console.log('this.activeId', this.activeId)
      this.$emit('removeTab', this.activeId, this.list)

      console.log('this.list', this.list)
    },
    rowClick(row) {
      console.log('row', row)
      if (row.isChangeEnable === '1') {
        this.$emit('rowClick')
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
      this.dataList.forEach((item, index) => {
        item.index = index
        if (index === 0) {
          this.spanArr.push(1)
        } else {
          // 后一个和前一个相比，相同的存入同一个index,不同的存入index++，**有顺序要求，所以要先排序**
          if (item.itemName === this.dataList[index - 1].itemName) {
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
    }

  }
}

</script>
<style lang="scss">
.manager-tabs{

	&.el-tabs{
		padding-right:20px;
	}
	.el-tabs__nav-wrap{
    margin-bottom: -2px;
	}
	&.el-tabs--border-card{
		background-color: transparent;
		border: 0;
		box-shadow: none;
	}
	&.el-tabs--border-card>.el-tabs__header{
		background-color: transparent;
		border-bottom: 2px solid #44474E;
	}
	.el-tabs__item{
    min-width: 120px;
		text-align: center;
		text-align: -webkit-center;
		text-align: -moz-center;
		padding: 0 10px !important;
		margin-right: 10px;
		background:linear-gradient(180deg,rgba(52,57,63,1) 0%,rgba(22,23,27,1) 100%);

		border-radius: 16px 16px 0 0;
	}
	&.el-tabs--border-card>.el-tabs__header .el-tabs__item{
		border: 2px solid #44474E;
	}
	&.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
		background:linear-gradient(180deg,rgba(22,23,27,1) 0%,rgba(52,57,63,1) 100%);
		border: 2px solid #44474E;
		border-bottom:transparent;
	}
	&.el-tabs--border-card>.el-tabs__header .el-tabs__item+.el-tabs__item,
	&.el-tabs--border-card>.el-tabs__header .el-tabs__item:first-child{
		margin-top: 0;
		margin-left: 0;
	}
	&.el-tabs--border-card>.el-tabs__header .is-scrollable .el-tabs__item:first-child{
    margin-left: 10px;
	}
	&.el-tabs--top.el-tabs--border-card>.el-tabs__header .el-tabs__item:only-child .el-icon-close{
		display: none;
	}
	&.el-tabs--border-card>.el-tabs__header .el-tabs__item,
	&.el-tabs--border-card>.el-tabs__header .el-tabs__item.el-tabs,
	&.el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover,
	&.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
		font-size: 12px;
		color: #ffffff;
	}
	&.el-tabs--border-card>.el-tabs__content{
    display: none;
	}
	.el-tabs__item .el-icon-close{
    position: relative;
    top: -8px;
    width: 12px;
    height: 12px;
    line-height: 12px;
    color: #F08024;
	}
	.el-tabs__item .el-icon-close:hover{
    background-color: transparent;
    color: #F08024;
	}
	.el-tabs__nav-next, .el-tabs__nav-prev{
    color: #fff;
	}
}
	.border-card-table{
    border-radius: 0 0 16px 16px;
    border-top: 0;
	}

	.approval-box{
    padding: 20px;
    margin-bottom:50px ;
    box-shadow:0px 2px 10px 0px rgba(0,0,0,0.5);
    .el-textarea__inner{
    height: 232px;
      overflow: hidden;
    }
	}
	.approval-box p{
    margin-bottom: 30px;
    font-family:"微软雅黑";
    font-size: 16px;
    font-weight: bold;
    color: #fff;
	}

</style>
