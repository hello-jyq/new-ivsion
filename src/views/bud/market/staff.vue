<template>
  <div style="padding-left:5px">
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
      <el-form :model="form" label-width="78px" label-position="left" class="content-top-form">
        <el-row type="flex" justify="space-between">
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
        </el-row>
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
          <el-col :span="7">
            <el-form-item label="当前部门" class="big-input">
              <el-input v-model="form.department" disabled>
                <i slot="suffix" class="iconfont iconbuke" />
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- v-show="isPermission" -->
      <ul class="content-top-btn">
        <li class="operation-item">
          <span class="operation-circle circle-middle-btn btn-light-color"><i class="iconfont iconxinjian" /></span>
          <span class="operation-text">下载模板</span>
        </li>
        <li class="operation-item">
          <span class="operation-circle circle-middle-btn btn-light-color"><i class="iconfont iconshanchu" /></span>
          <span class="operation-text">导&nbsp;入</span>
        </li>
        <li class="operation-item">
          <span class="operation-circle circle-middle-btn btn-light-color"><i class="iconfont icongengxin_huaban" /></span>
          <span class="operation-text">提&nbsp;交</span>
        </li>
        <li class="operation-item">
          <span class="operation-circle circle-middle-btn btn-light-color"><i class="iconfont iconsousuo" /></span>
          <span class="operation-text">返回首页</span>
        </li>
        <li class="operation-item">
          <span class="operation-circle circle-middle-btn btn-light-color"><i class="iconfont iconrefresh" /></span>
          <span class="operation-text">确认并开锁</span>
        </li>
        <li class="operation-item">
          <span class="operation-circle circle-middle-btn btn-light-color"><i class="iconfont iconrefresh" /></span>
          <span class="operation-text">放弃并开锁</span>
        </li>
        <li class="operation-item">
          <span class="operation-circle circle-middle-btn btn-light-color"><i class="iconfont iconrefresh" /></span>
          <span class="operation-text">取消确认</span>
        </li>
        <li class="operation-item">
          <span class="operation-circle circle-middle-btn btn-light-color"><i class="iconfont iconrefresh" /></span>
          <span class="operation-text">更新履历</span>
        </li>
      </ul>
    </div>
    <div class="table-bg-box table-span-style marigin-bottom">
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

                <el-popover placement="top-start" :visible-arrow="false" width="350" trigger="hover">
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
        <el-table-column prop="budDiv" label="类型" align="center" min-width="100">
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
        <el-table-column prop="total" label="合计" align="center" min-width="100">
          <template slot="header">
            <span class="table-total-icon" @click="showYear">合计
              <i v-if="!isShowYear" class="iconfont iconjiantouyou" />
              <i v-else class="iconfont iconjiantouarrowhead7" /></span>
          </template>
          <template slot-scope="scope">
            {{ scope.row.total }}
          </template>
        </el-table-column>
        <el-table-column v-if="isShowYear" prop="firstHalfYear" label="上半年" align="center" min-width="100" />
        <el-table-column v-if="isShowYear" prop="secondHalfYear" min-width="100" align="center" label="下半年" />
        <el-table-column prop="jan" label="一月" align="center" min-width="100" />
        <el-table-column prop="feb" label="二月" align="center" min-width="100" />
        <el-table-column prop="mar" label="三月" align="center" min-width="100" />
        <el-table-column prop="apr" label="四月" align="center" min-width="100" />
        <el-table-column prop="may" label="五月" align="center" min-width="100" />
        <el-table-column prop="jun" label="六月" align="center" min-width="100" />
        <el-table-column prop="jul" label="七月" align="center" min-width="100" />
        <el-table-column prop="aug" label="八月" align="center" min-width="100" />
        <el-table-column prop="sept" label="九月" align="center" min-width="100" />
        <el-table-column prop="oct" label="十月" align="center" min-width="100" />
        <el-table-column prop="nov" label="十一月" align="center" min-width="100" />
        <el-table-column prop="dec" label="十二月" align="center" min-width="100" />
      </el-table>
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
    }
  },
  data() {
    return {
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
      },
      scrollColr: '#5A5E63'

    }
  },
  mounted() {
    this.mountedTable()
    this.getScrollBar()
    const content = document.getElementsByClassName('content')[0]
    console.log('content', content)
    const dom = content.getElementsByClassName(' el-scrollbar__wrap')[0]
    dom.addEventListener('scroll', this.scroll)
  },
  methods: {
    scroll() {
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
      if (row.isChangeEnable === '1') {
        this.$emit('rowClick')
      }
    },
    cellClassName({
      row,
      column,
      rowIndex,
      columnIndex
    }) {
      if (columnIndex === 0) {
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
    },
    onOpenStatus() {
      this.isShow = !this.isShow
    }
  }
}
</script>
