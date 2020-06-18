<template>
  <div :class="theme=='Light'?'no-search-content-box tpl-template tplE-light':'no-search-content-box tpl-template'">
    <div class="fixed-box">
      <el-steps :active="active" align-center class="tpl-steps">
        <el-step :class="{'activeSteps' : activeIndex == 0}" @click.native="stpesClick(0)" />
        <el-step :class="{'activeSteps' : activeIndex == 1}" @click.native="stpesClick(1)" />
        <el-step :class="{'activeSteps' : activeIndex == 2}" @click.native="stpesClick(2)" />
        <el-step :class="{'activeSteps' : activeIndex == 3}" @click.native="stpesClick(3)" />
      </el-steps>

      <div class="justify-content-flex">
        <ul class="operation-box end-content-flex">
          <li v-if="activeIndex > 0" class="operation-item" @click="prev">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconshangyibu" /></span>
            <span class="operation-text">上一步</span>
          </li>
          <li v-if="nextBtnShow()" class="operation-item" @click="next">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconxiayibu" /></span>
            <span class="operation-text">下一步</span>
          </li>
          <li class="operation-item" @click="back">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconwithdraw-fill" /></span>
            <span class="operation-text">返&nbsp;&nbsp;回</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="fixed-scroll-bpx">
      <div v-if="activeIndex === 0" class="tpl-height-full-form-box">
        <el-scrollbar>
          <div class="table-bg-box marigin-bottom">
            <div class="advice-edit-table-title">
              <span>{{ $t('bud.tpl.baseInfo') }}</span>
              <span v-if="templateId && templateId !== '-1'" class="advice-edit-title-num">{{ $t('bud.tpl.identiferNum') }}：{{ tplInfo.identiferNum }}</span>
            </div>
            <el-form ref="tplInfo" :model="tplInfo" label-width="110px" label-position="left" class="form-big-lable">
              <el-row type="flex" justify="space-between">
                <el-col :span="7">
                  <el-form-item :label="$t('bud.tpl.year')" prop="year" class="big-input">
                    <el-date-picker
                      v-model="tplInfo.year"
                      value-format="yyyy"
                      type="year"
                      disabled
                      prefix-icon="iconfont iconbuke"
                      placeholder="选择年度"
                      :clearable="false"
                      style="width: 100%;"
                      :popper-class="theme=='Light'?'blueDate':''"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item :label="$t('bud.tpl.name')" prop="name" class="big-input">
                    <el-input v-model="tplInfo.name" disabled>
                      <i slot="suffix" class="iconfont iconbuke" />
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7" />
              </el-row>
              <el-form-item :label="$t('bud.tpl.remark')" prop="remark" class="big-input">
                <el-input v-model="tplInfo.remark" type="textarea" disabled class="textarea-height">
                  <i slot="suffix" class="iconfont iconbuke" />
                </el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="table-bg-box  marigin-bottom">
            <div class="advice-edit-table-title">
              <span>{{ $t('bud.comm.otherInfo') }}</span>
            </div>
            <el-form :model="tplInfo" label-width="110px" label-position="left" class="form-big-lable">
              <el-row type="flex" justify="space-between">
                <el-col :span="10">
                  <el-form-item :label="$t('bud.comm.createBy')" prop="createTime" class="big-input">
                    <el-date-picker
                      v-model="tplInfo.createTime"
                      type="datetime"
                      placeholder="选择创建时间"
                      disabled
                      prefix-icon="iconfont iconbuke"
                      :clearable="false"
                      style="width: 100%;"
                      :popper-class="theme=='Light'?'blueDate bule':''"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item :label="$t('bud.comm.createTime')" prop="createBy" class="big-input">
                    <el-input v-model="tplInfo.createBy" disabled>
                      <i slot="suffix" class="iconfont iconbuke" />
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" justify="space-between">
                <el-col :span="10">
                  <el-form-item :label="$t('bud.comm.updateTime')" prop="updateTime" class="big-input">
                    <el-date-picker
                      v-model="tplInfo.updateTime"
                      type="datetime"
                      disabled
                      prefix-icon="iconfont iconbuke"
                      placeholder="选择创建时间"
                      :clearable="false"
                      style="width: 100%;"
                      :popper-class="theme=='Light'?'blueDate bule':''"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item :label="$t('bud.comm.updateBy')" prop="updateBy" class="big-input">
                    <el-input v-model="tplInfo.updateBy" disabled>
                      <i slot="suffix" class="iconfont iconbuke" />
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-scrollbar>
      </div>
      <div v-if="activeIndex === 1" class="tpl-height-full-box">
        <div class="table-bg-box">
          <div class="advice-edit-table-title justify-content-flex">
            <span>{{ $t('bud.tpl.itemInfo') }}</span>
          </div>
          <div class="tpl-table-box">
            <el-table
              ref="itemListTb"
              :data="tplItemTopList"
              style="width: 100%"
              height="100%"
              border
              stripe
            >
              <el-table-column
                :label="$t('basedata.itemNum')"
                prop="itemNum"
                align="center"
                min-width="100"
                show-overflow-tooltip
              />
              <el-table-column
                :label="$t('basedata.itemName')"
                prop="itemName"
                min-width="200"
                header-align="center"
                align="left"
                show-overflow-tooltip
              />
              <el-table-column
                :label="$t('basedata.itemType')"
                prop="itemType"
                width="160"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <!-- <p v-if="scope.row.itemType === '01'">
                      科目组
                    </p>
                    <p v-else-if="scope.row.itemType === '02'">
                      科目
                    </p>
                    <p v-else>
                      合计项
                    </p> -->
                  <dict-write dict-type-id="BudItemType" :value="scope.row.itemType" />
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('bud.tpl.itemInit')"
                prop="isInit"
                align="center"
                width="160"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <p v-if="scope.row.isInit === 0">
                    {{ $t('bud.comm.no') }}
                  </p>
                  <p v-else>
                    {{ $t('bud.comm.yes') }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column
                label="禀议科目"
                prop="isApprove"
                align="center"
                width="160"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <p v-if="scope.row.isApprove === 0">
                    {{ $t('bud.comm.no') }}
                  </p>
                  <p v-else>
                    {{ $t('bud.comm.yes') }}
                  </p>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div v-if="activeIndex === 2" class="tpl-height-full-box">
        <div class="table-bg-box marigin-bottom">
          <div class="advice-edit-table-title justify-content-flex">
            <span>{{ $t('bud.tpl.itemTotalInfo') }}</span>
          </div>
          <div class="table-tree-bg tree-org-user">
            <el-scrollbar>
              <el-tree
                ref="tree"
                default-expand-all
                :data="tplItemTreeList"
              >
                <template slot-scope="scope">
                  <div class="custom-tree-node">
                    <div class="tree_item">
                      {{ scope.data.label }}
                    </div>
                  </div>
                </template>
              </el-tree>
            </el-scrollbar>
          </div>
        </div>
      </div>
      <div v-if="activeIndex === 3" class="tpl-height-full-box">
        <div class="table-bg-box marigin-bottom">
          <div class="advice-edit-table-title justify-content-flex">
            <span>{{ $t('bud.tpl.itemSortInfo') }}</span>
          </div>
          <div class="table-tree-bg tree-org-user">
            <el-scrollbar>
              <el-tree
                :data="tplItemTreeSortList"
                :draggable="false"
                default-expand-all
              >
                <template slot-scope="scope">
                  <div class="custom-tree-node">
                    <div class="tree_item">
                      {{ scope.data.label }}
                    </div>
                  </div>
                </template>
              </el-tree>
            </el-scrollbar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import 'jquery.nicescroll'
import DictWrite from '@/components/DictWrite'
import { getTplInfo, getTplItemTopList, getTplItemTreeList } from '@/api/bud/tpl/tpl-api.js'

export default {
  components: {
    DictWrite
  },
  data() {
    return {
      // 页面属性
      flag: -1,
      theme: localStorage.getItem('theme') !== 'Dark' ? 'Light' : '',
      templateId: '',
      active: 0,
      activeIndex: -1,
      // 第一步相关信息
      tplInfo: { year: '' },
      // 第二步相关操作
      tplItemTopList: [],
      // 第三步相关操作
      tplItemTreeList: [],
      // 第四部相关操作
      tplItemTreeSortList: [],
      scrollColr: localStorage.getItem('theme') === 'Light' ? '#D8E0E8' : '#5A5E63'
    }
  },
  watch: {
    'active': function(newVal, oldVal) {
      // 进行下一步
      if (newVal > oldVal) {
        this.activeIndex = newVal
      }
      this.$nextTick(() => {
        this.getScrollBar()
      })
    },
    'activeIndex': function(newVal, oldVal) {
      // 点击的是后面的步骤
      // if (this.active < this.activeIndex) {
      //   this.active = newVal
      // }
      // this.loadData()
      this.$nextTick(() => {
        this.getScrollBar()
      })
    }
  },
  created: function() {
    this.templateId = this.$route.params.templateId || localStorage.getItem('tpl-step-templateId')
    localStorage.setItem('tpl-step-templateId', this.templateId)
    this.flag = this.$route.params.flag
    this.activeIndex = this.flag === 1 ? 0 : -1
    this.loadTplInfo()
  },
  mounted() {

  },
  methods: {
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
    // 加载页面数据
    loadData() {
      // 加载数据
      this.loadTplItemTopList()
      this.loadTplItemTreeList()
      this.loadTplItemTreeSortList()
    },
    // 查询第一部分模板信息
    async loadTplInfo() {
      const res = await getTplInfo(this.templateId)
      if (res && res.success) {
        this.tplInfo = res.datas.result
        if (this.tplInfo && this.tplInfo.id) {
          this.templateId = this.tplInfo.id
          this.activeIndex = this.tplInfo.step
          this.active = this.tplInfo.step
          this.$nextTick(() => {
            this.loadData()
          })
          if (this.tplInfo.step === 4) {
            this.$nextTick(() => {
              this.prev()
            })
          } else {
            this.$nextTick(() => {
              this.stpesClick(this.activeIndex)
            })
          }
        } else {
          // console.log('nodata', this.activeIndex)
          this.tplInfo = { year: '' }
        }
      }
    },
    // 查询第二部分模板科目顶层列表
    async loadTplItemTopList() {
      const res = await getTplItemTopList({ templateId: this.templateId })
      if (res && res.success) {
        this.tplItemTopList = res.datas.results
        this.$nextTick(() => {
          // this.$refs['itemListTb'].doLayout()
          this.getScrollBar()
          $('.el-table__body-wrapper').getNiceScroll().resize()
        })
      }
    },
    // 查询第三部分模板科目树形列表
    async loadTplItemTreeList() {
      const res = await getTplItemTreeList({ templateId: this.templateId })
      if (res && res.success) {
        this.tplItemTreeList = res.datas.results
      }
    },
    // 查询第三部分模板科目树形列表
    async loadTplItemTreeSortList() {
      const res = await getTplItemTreeList({ templateId: this.templateId })
      if (res && res.success) {
        this.tplItemTreeSortList = res.datas.results
      }
    },
    // 下一步是否显示
    nextBtnShow() {
      return this.activeIndex < 3 && this.active > (this.activeIndex)
    },
    // 下一步按钮事件
    next() {
      // console.log('active', this.active)
      // console.log('activeIndex', this.activeIndex)
      if (this.active >= (this.activeIndex + 1)) {
        this.nextFn()
      }
    },
    // 下一步执行
    nextFn() {
      if (this.activeIndex < 3) {
        if (this.active > this.activeIndex) {
          this.activeIndex++
        } else {
          this.active++
        }
      }
    },
    // 前一步
    prev() {
      this.activeIndex--
      // this.loadData()
    },
    // 点击步骤条
    stpesClick(index) {
      // 不能点击还没有操作的步骤
      if (index <= this.active) {
        this.activeIndex = index
      }
      // this.loadData()
    },
    // 返回列表页面
    back() {
      this.$router.push('/tpl/list')
    }
  }
}
</script>
<style lang="scss">
.tpl-steps {
  width: 700px;
  margin: 0 auto;
  .el-step.is-horizontal .el-step__line {
    top: 45px;
  }
  .el-step__icon {
    background-color: transparent;
    border: 0;
  }
  .el-step__icon-inner {
    font-family: "微软雅黑";
    font-size: 20px;
  }
}

.is-finish {
  .el-step__line {
    background-color: #00e2de;
  }
}
.el-step__head.is-finish {
  color: #00e2de;
  border-color: #00e2de;
}
.is-finish,
.is-process {
  .el-step__icon {
    width: 92px;
    height: 92px;
    background-image: url("../../../assets/images/tpl/light.png");
    background-position: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .el-step__icon-inner {
    color: #ffffff;
  }
}
.is-wait {
  .el-step__icon {
    width: 92px;
    height: 92px;
    background-image: url("../../../assets/images/tpl/dark.png");
    background-position: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .el-step__icon-inner {
    color: #999999;
  }
}
.is-wait,
.is-process {
  .el-step__line {
    border: 1px dashed #666666;
    background-color: transparent;
  }
}

.activeSteps {
  .el-step__head::after {
    content: "";
    position: absolute;
    bottom: 12px;
    left: 50%;
    width: 8px;
    height: 10px;
    background-image: url("../../../assets/images/arrow-light.png");
    background-position: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    transform: translate(-50%, 0) rotate(-90deg);
  }
}

// 内容
.tpl-template {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .fixed-scroll-bpx {
    flex: 1;
    overflow: hidden;
  }
  .tpl-height-full-box {
    height: calc(100% - 20px);
    .table-bg-box {
      height: 100%;
      .tpl-table-box {
        height: calc(100% - 70px);
        .el-table__body-wrapper {
          height: calc(100% - 50px);
        }
      }
    }
  }
  .tpl-height-full-form-box {
    height: calc(100% - 20px);
  }
  .operation-item {
    // width: 120px;
    margin-bottom: 15px;
  }
  .el-icon-date,
  .el-icon-time {
    display: none;
  }
  .el-switch {
    height: 26px;
    .el-switch__label {
      color: #ffffff;
    }
    .is-active {
      color: #00e2de;
    }
    .el-switch__core {
      width: 50px !important;
      height: 26px;
      border: 1px solid #999999;
      background: #999999;
      border-radius: 13px;
      &::after {
        width: 22px;
        height: 22px;
      }
    }
    &.is-checked {
      .el-switch__core {
        border: 1px solid #00e2de;
        background: #00e2de;
        &::after {
          margin-left: -23px;
        }
      }
    }
  }
  .operation-box {
    padding-top: 0;
  }
  .table-tree-bg {
    height: calc(100% - 70px);
    padding: 24px 5pc 24px 24px;
    background-color: #34393f;
    box-shadow: 0px 8px 10px 0px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    border: 2px solid #44474e;
    .tree_item {
      font-family: "微软雅黑";
      font-size: 14px;
      font-weight: bold;
      color: #ffffff;
    }
    .el-tree-node__children {
      .tree_item {
        font-weight: normal;
        color: rgba(255, 255, 255, 0.8);
      }
    }
    .tree-btn {
      display: inline-block;
      width: 70px;
      height: 24px;
      line-height: 22px;
      font-family: "微软雅黑";
      font-size: 12px;
      text-align: center;
      color: #f08024;
      background: linear-gradient(
        180deg,
        rgba(47, 52, 58, 1) 0%,
        rgba(30, 34, 37, 1) 100%
      );
      border-radius: 24px;
      border: 1px solid rgba(29, 34, 38, 0.5);
      vertical-align: middle;
      i {
        margin-right: 5px;
        font-size: 12px;
        color: #f08024;
      }
      &:first-child {
        margin-left: 15px;
        color: #00e2de;
        i {
          color: #00e2de;
        }
      }
      &:not(:last-child) {
        margin-right: 10px;
      }
    }
    .disabled-tree-btn {
      color: #666666 !important;
      i {
        color: #666666 !important;
      }
    }
  }
  .el-tree__drop-indicator {
    background-color: transparent;
  }
}
.tpl-edit-tips {
  .el-dialog {
    width: 600px;
    min-width: auto;
    height: 180px;
    padding-left: 40px;
    p {
      font-family: "微软雅黑";
      font-size: 16px;
      color: #ffffff;
    }
    .operation-item {
      margin-bottom: 0 !important;
      margin-top: 20px;
    }
  }
}
</style>
