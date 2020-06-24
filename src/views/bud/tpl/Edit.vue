<template>
  <div
    :class="theme=='Light'?'no-search-content-box tpl-template tplE-light':'no-search-content-box tpl-template'"
  >
    <div class="fixed-box">
      <el-steps :active="active" align-center class="tpl-steps">
        <el-step :class="{'activeSteps' : activeIndex == 0}" @click.native="stpesClick(0)" />
        <el-step :class="{'activeSteps' : activeIndex == 1}" @click.native="stpesClick(1)" />
        <el-step :class="{'activeSteps' : activeIndex == 2}" @click.native="stpesClick(2)" />
        <el-step :class="{'activeSteps' : activeIndex == 3}" @click.native="stpesClick(3)" />
      </el-steps>

      <div class="justify-content-flex">
        <ul class="operation-box">
          <li v-if="showEditBtn()" class="operation-item" @click="edit">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg">
              <i class="iconfont iconbianji2" />
            </span>
            <span class="operation-text">编&nbsp;&nbsp;辑</span>
          </li>
        </ul>
        <ul class="operation-box end-content-flex">
          <li v-if="activeIndex > 0" class="operation-item" @click="prev">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg">
              <i class="iconfont iconshangyibu" />
            </span>
            <span class="operation-text">上一步</span>
          </li>
          <li v-if="activeIndex < 3" class="operation-item" @click="next">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg">
              <i class="iconfont iconxiayibu" />
            </span>
            <span class="operation-text">下一步</span>
          </li>
          <li v-if="activeIndex == 3 && isEditFour" class="operation-item" @click="next">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg">
              <i class="iconfont iconbaocun" />
            </span>
            <span class="operation-text">保&nbsp;&nbsp;存</span>
          </li>
          <li class="operation-item" @click="back">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg">
              <i class="iconfont iconwithdraw-fill" />
            </span>
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
              <span
                v-if="templateId && templateId !== '-1'"
                class="advice-edit-title-num"
              >{{ $t('bud.tpl.identiferNum') }}：{{ tplInfo.identiferNum }}</span>
            </div>
            <el-form
              ref="tplInfo"
              :model="tplInfo"
              :rules="rules"
              label-width="110px"
              label-position="left"
              class="form-big-lable"
            >
              <el-row type="flex" justify="space-between">
                <el-col :span="7">
                  <el-form-item :label="$t('bud.tpl.year')" prop="year" class="big-input">
                    <el-date-picker
                      v-model="tplInfo.year"
                      value-format="yyyy"
                      type="year"
                      :disabled="!isEditFirst"
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
                    <el-input v-model="tplInfo.name" :disabled="!isEditFirst" maxlength="100">
                      <i slot="suffix" class="iconfont iconbuke" />
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7" />
              </el-row>
              <el-form-item :label="$t('bud.tpl.remark')" prop="remark" class="big-input">
                <el-input
                  v-model="tplInfo.remark"
                  type="textarea"
                  :disabled="!isEditFirst"
                  class="textarea-height"
                  maxlength="200"
                >
                  <i slot="suffix" class="iconfont iconbuke" />
                </el-input>
              </el-form-item>
            </el-form>
          </div>
          <div v-if="templateId && templateId !== '-1'" class="table-bg-box">
            <div class="advice-edit-table-title">
              <span>{{ $t('bud.comm.otherInfo') }}</span>
            </div>
            <el-form
              :model="tplInfo"
              label-width="110px"
              label-position="left"
              class="form-big-lable"
            >
              <el-row type="flex" justify="space-between">
                <el-col :span="10">
                  <el-form-item
                    :label="$t('bud.comm.createBy')"
                    prop="createTime"
                    class="big-input"
                  >
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
                  <el-form-item
                    :label="$t('bud.comm.createTime')"
                    prop="createBy"
                    class="big-input"
                  >
                    <el-input v-model="tplInfo.createBy" disabled>
                      <i slot="suffix" class="iconfont iconbuke" />
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" justify="space-between">
                <el-col :span="10">
                  <el-form-item
                    :label="$t('bud.comm.updateTime')"
                    prop="updateTime"
                    class="big-input"
                  >
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
            <span
              class="advice-table-add-btn"
              :class="{'disabled-btn-style' : !isEditSecond}"
              @click="isEditSecond ? openDialog():null"
            >
              <i class="iconfont icontianjia_huaban" />
              {{ $t('bud.tpl.addItem') }}
            </span>
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
                width="140"
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
                  </p>-->
                  <dict-write dict-type-id="BudItemType" :value="scope.row.itemType" />
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('bud.tpl.itemInit')"
                prop="isInit"
                width="150"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.isInit"
                    :inactive-value="0"
                    :active-value="1"
                    :disabled="!isEditSecond"
                    active-text="是"
                    inactive-text="否"
                  />
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('bud.tpl.itemApprove')"
                prop="isApprove"
                width="150"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.isApprove"
                    :inactive-value="0"
                    :active-value="1"
                    :disabled="!isEditSecond"
                    active-text="是"
                    inactive-text="否"
                  />
                </template>
              </el-table-column>
              <el-table-column align="center" :label="$t('bud.comm.operation')" width="120">
                <template slot-scope="scope">
                  <span
                    class="advice-deleted-btn"
                    @click="isEditSecond ? deleteTopItem(scope.$index):null"
                  >
                    <i class="iconfont iconshanchu1" />
                    {{ $t('bud.comm.remove') }}
                  </span>
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
            <span
              class="advice-table-add-btn"
              :class="{'disabled-btn-style' : !isEditThree}"
              @click="isEditThree ? addTotalTree():null"
            >
              <i class="iconfont icontianjia_huaban" />
              {{ $t('bud.tpl.addItemTotal') }}
            </span>
          </div>
          <div class="table-tree-bg tree-org-user">
            <el-scrollbar>
              <el-tree ref="tree" default-expand-all :data="tplItemTreeList">
                <template slot-scope="scope">
                  <div class="custom-tree-node">
                    <div class="tree_item">
                      {{ scope.data.label }}
                      <template v-if="scope.data.itemType ==='03'">
                        <span
                          class="tree-btn"
                          :class="{'disabled-tree-btn' : !isEditThree}"
                          @click="isEditThree ? onEditTree(scope.data.id):null"
                        >
                          <i class="iconfont iconbianji" />编辑
                        </span>
                        <span
                          class="tree-btn"
                          :class="{'disabled-tree-btn' : !isEditThree}"
                          @click="isEditThree ? onDeletedTree(scope.data.id):null"
                        >
                          <i class="iconfont iconshanchu1" />删除
                        </span>
                      </template>
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
                :draggable="isDraggable"
                default-expand-all
                :allow-drop="allowDrop"
                @node-drop="handleDrop"
              >
                <template slot-scope="scope">
                  <div class="custom-tree-node">
                    <div class="tree_item">{{ scope.data.label }}</div>
                  </div>
                </template>
              </el-tree>
            </el-scrollbar>
          </div>
        </div>
      </div>
    </div>

    <!-- 第二步添加科目弹框 -->
    <!-- <el-dialog
      id="itemDrag"
      ref="itemDragBox"
      class="content-dialog-box tpl-add-top-list"
      :close-on-click-modal="false"
      custom-class="dialog-drag fixed-search-btn-box"
      top="0"
      title="科目选择"
      :before-close="onCloseDialog"
      :visible.sync="itemDialogVisible"
    >
      <item-dialog ref="itemDialogTable" @onClose="onCloseDialog" @onConfirm="onConfirm" @onScroll="onScroll" />
    </el-dialog>-->

    <!-- 添加科目弹框 -->
    <add-item-dailog
      ref="itemDragBox"
      :is-show="itemDialogVisible"
      @onClose="onCloseDialog"
      @onConfirm="onConfirm"
    />

    <!-- 添加合计项弹框 -->
    <add-total-dailog
      ref="itemTotalDialogTable"
      :template-id="templateId"
      :is-show="isShowAddTotal"
      :edit-total="editTotal"
      :items-data="itemsData"
      @onClose="onCloseTotal"
      @onConfirm="onConfirmTotal"
    />
  </div>
</template>
<script>
import $ from "jquery";
import "jquery.nicescroll";
import DictWrite from "@/components/DictWrite";
import {
  getTplInfo,
  getTplItemTopList,
  saveTplInfo,
  saveTplTopItemList,
  getTplItemTreeList,
  saveTplItemTotalList,
  saveTplItemSortList,
  resetTplInfo
} from "@/api/bud/tpl/tpl-api.js";
// import itemDialog from '../itm/_itemSearch'

import addItemDailog from "../itm/_addItem.vue";
import addTotalDailog from "./_addTotalList.vue";

// var elementResizeDetectorMaker = require('element-resize-detector')

export default {
  components: {
    // itemDialog,
    DictWrite,
    addItemDailog,
    addTotalDailog
  },
  data() {
    return {
      // 页面属性
      flag: -1, // 操作标记位
      theme: localStorage.getItem("theme") !== "Dark" ? "Light" : "",
      templateId: "", // 模板主键
      active: 0,
      activeIndex: -1,
      editIndex: -1,
      isClickEdit: [0, 0, 0, 0, 0],
      rules: {
        year: [
          { required: true, message: "请选择年度", trigger: "change" },
          { min: 4, max: 4, message: "年度格式为YYYY", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入模板名称", trigger: "blur" },
          { min: 1, max: 100, message: "100字符以内", trigger: "blur" }
        ],
        remark: [{ max: 200, message: "200字符以内", trigger: "blur" }]
      },
      // 第一步相关信息
      tplInfo: { year: "" },
      // 第二步相关操作
      itemDialogVisible: false, // 科目选择弹框显示标志位
      tplItemTopList: [],
      // 第三步相关操作
      tplItemTreeList: [],
      // 第四部相关操作
      tplItemTreeSortList: [],

      isEditFirst: true, // 第一步是否可编辑
      isEditSecond: true, // 第二步是否可编辑
      isEditThree: true, // 第三步是否可编辑
      isEditFour: true, // 第四步是否可编辑
      // isBack: true
      isDraggable: true, // 是否可拖拽排序
      isShowAddTotal: false, // 显示添加合计项弹框标志位
      itemsData: {}, // 合计项编辑时回显数据，传递给子组件
      editTotal: false, // 合计项编辑时传入子组件的标志位
      scrollColr:
        localStorage.getItem("theme") === "Light" ? "#D8E0E8" : "#5A5E63"
    };
  },
  watch: {
    active: function(newVal, oldVal) {
      // 进行下一步
      if (newVal > oldVal) {
        this.activeIndex = newVal;
        // this.isBack = true
        this.$nextTick(() => {
          this.getScrollBar();
        });
      }
    },
    activeIndex: function(newVal, oldVal) {
      // 点击的是后面的步骤
      // if (this.active < this.activeIndex) {
      //   this.active = newVal
      // }
      // this.loadData()
      this.$nextTick(() => {
        this.getScrollBar();
      });
    }
  },
  created: function() {
    // this.templateId = this.$route.params.templateId || localStorage.getItem('tpl-step-templateId')
    // localStorage.setItem('tpl-step-templateId', this.templateId)
    // this.activeIndex = this.$route.params.step || Number(localStorage.getItem('tpl-step-activeIndex'))
    // this.active = this.$route.params.step || Number(localStorage.getItem('tpl-step-active'))
    // this.editIndex = this.activeIndex
    // this.$forceUpdate()
    // console.log('templateId', this.templateId)
    // console.log('activeIndex', this.activeIndex)
    // console.log('active', this.active)
    this.templateId =
      this.$route.params.templateId ||
      localStorage.getItem("tpl-step-templateId");
    localStorage.setItem("tpl-step-templateId", this.templateId);
    // this.activeIndex = this.$route.params.flag === 1 ? 0 : -1
    this.flag = this.$route.params.flag;
    this.activeIndex = this.flag === 1 ? 0 : -1;
    this.loadTplInfo();
  },
  mounted() {
    // this.templateId = this.$route.params.templateId || localStorage.getItem('tpl-step-templateId')
    // localStorage.setItem('tpl-step-templateId', this.templateId)
    // this.loadTplInfo()
    // 调整弹出框位置等相关
    // var erd = elementResizeDetectorMaker()
    // var that = this
    // erd.listenTo(document.getElementsByClassName('dialog-drag')[0], function(element) {
    //   that.$nextTick(function() {
    //     this.getScrollBar()
    //     this.getDragBar()
    //     $('.el-table__body-wrapper').getNiceScroll().resize()
    //     $('.el-dialog__body').getNiceScroll().resize()
    //   })
    // })
    // this.getScrollBar()
    // this.getDragBar()
    // // 拖拽
    // $('.dialog-drag').draggable({
    //   cursor: 'move',
    //   handle: '.el-dialog__header',
    //   refreshPositions: true,
    //   containment: 'parent',
    //   stop() {
    //     $('.el-table__body-wrapper').getNiceScroll().resize()
    //     $('.el-dialog__body').getNiceScroll().resize()
    //   }
    // })
    // // 缩放
    // $('#itemDrag .dialog-drag').resizable({
    //   aspectRatio: false,
    //   minHeight: 150,
    //   containment: '#itemDrag'
    // })
  },
  methods: {
    getScrollBar() {
      $(".el-table__body-wrapper").niceScroll({
        cursorcolor: this.scrollColr,
        cursoropacitymin: 0, // 当滚动条是隐藏状态时改变透明度, 值范围 1 到 0
        cursoropacitymax: 1, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
        cursorwidth: "8px", // 滚动条的宽度，单位：便素
        cursorborder: `1px solid ${this.scrollColr}`, // CSS方式定义滚动条边框
        autohidemode: true, // 隐藏滚动条的方式, 可用的值:
        zindex: 0,
        railpadding: { top: 0, right: 0, left: 0, bottom: 0 },
        boxzoom: false,
        iframeautoresize: false // 在加载事件时自动重置iframe大小
      });
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      // 拖拽之后进行排序
      const obj = {
        aboveId: "",
        arr: []
      };
      obj.aboveId = dropNode.data.aboveId;
      for (const item of dropNode.parent.childNodes) {
        obj.arr.push(item.data.id);
      }
      // console.log('obj', obj)
    },
    allowDrop(draggingNode, dropNode, type) {
      // 同级拖拽
      if (draggingNode.level === dropNode.level) {
        // 同父级拖拽
        if (draggingNode.parent.id === dropNode.parent.id) {
          return type === "prev" || type === "next";
        }
      } else {
        // 不同级进行处理
        return false;
      }
    },
    // 加载页面数据
    loadData() {
      // 加载对应面板数据
      if (this.activeIndex === 0) {
        // this.loadTplInfo()
      } else if (this.activeIndex === 1) {
        this.isEditFirst = false;
        this.loadTplItemTopList();
      } else if (this.activeIndex === 2) {
        this.isEditFirst = false;
        this.isEditSecond = false;
        this.loadTplItemTreeList();
      } else {
        if (this.activeIndex === 3) {
          this.isEditFirst = false;
          this.isEditSecond = false;
          this.isEditThree = false;
        } else {
          this.isEditFirst = false;
          this.isEditSecond = false;
          this.isEditThree = false;
          this.isEditFour = false;
        }
        this.loadTplItemTreeSortList();
      }
    },
    // 查询第一部分模板信息
    async loadTplInfo() {
      const res = await getTplInfo(this.templateId);
      if (res && res.success) {
        this.tplInfo = res.datas.result;
        if (this.tplInfo && this.tplInfo.id) {
          this.templateId = this.tplInfo.id;
          // this.activeIndex = this.tplInfo.step === 4 ? 3 : this.tplInfo.step
          this.activeIndex = this.tplInfo.step;
          this.active = this.tplInfo.step;
          // console.log('activeIndex', this.activeIndex)
          // console.log('active', this.active)
          if (this.tplInfo.step === 4) {
            this.isEditFour = false;
            this.isDraggable = false;
            this.$nextTick(() => {
              this.prev();
            });
          } else {
            this.$nextTick(() => {
              this.stpesClick(this.activeIndex);
            });
          }
        } else {
          // console.log('nodata', this.activeIndex)
          this.tplInfo = { year: "" };
        }
      }
    },
    // 查询第二部分模板科目顶层列表
    async loadTplItemTopList() {
      const res = await getTplItemTopList({ templateId: this.templateId });
      if (res && res.success) {
        this.tplItemTopList = res.datas.results;
        this.$nextTick(() => {
          this.$refs["itemListTb"].doLayout();
          this.getScrollBar();
          $(".el-table__body-wrapper")
            .getNiceScroll()
            .resize();
        });
      }
    },
    // 查询第三部分模板科目树形列表
    async loadTplItemTreeList() {
      const res = await getTplItemTreeList({ templateId: this.templateId });
      if (res && res.success) {
        this.tplItemTreeList = res.datas.results;
        // this.$nextTick(() => {
        //   this.getScrollBar()
        // })
      }
    },
    // 查询第三部分模板科目树形列表
    async loadTplItemTreeSortList() {
      const res = await getTplItemTreeList({ templateId: this.templateId });
      if (res && res.success) {
        this.tplItemTreeSortList = res.datas.results;
        // this.$nextTick(() => {
        //   this.getScrollBar()
        // })
      }
    },
    // 显示编辑按钮
    showEditBtn() {
      return (
        this.editIndex === this.activeIndex &&
        this.isClickEdit[this.activeIndex] === 0
      );
    },
    // 编辑按钮事件
    edit() {
      this.$confirm(this.$t("bud.tpl.tip1"), this.$t("comm.tips"), {
        confirmButtonText: this.$t("comm.certain"),
        cancelButtonText: this.$t("comm.cancel"),
        cancelButtonClass: "btn-custom-cancel",
        type: "warning",
        iconClass: "iconfont icongantanhao_icon",
        customClass: localStorage.getItem("theme") == "Dark" ? "dark-message-box" : " "
      })
        .then(() => {
          this.handleEdit();
        })
        .catch(() => {});
    },
    async handleEdit() {
      const res = await resetTplInfo({
        templateId: this.templateId,
        step: this.activeIndex
      });
      if (res && res.success) {
        this.$set(this.isClickEdit, this.activeIndex, 1);
        // this.isClickEdit[this.activeIndex] = 1
        if (this.activeIndex === 0) {
          this.isEditFirst = true;
          this.isEditSecond = true;
          this.isEditThree = true;
          this.isEditFour = true;
          // 清空后续数据内容
          this.tplItemTopList = [];
          this.tplItemTreeList = [];
          this.tplItemTreeSortList = [];
        } else if (this.activeIndex === 1) {
          this.isEditSecond = true;
          this.isEditThree = true;
          this.isEditFour = true;
          // 清空后续数据内容
          this.tplItemTreeList = [];
          this.tplItemTreeSortList = [];
        } else if (this.activeIndex === 2) {
          this.isEditThree = true;
          this.isEditFour = true;
          // 清空后续数据内容
          this.tplItemTreeSortList = [];
        } else if (this.activeIndex >= 3) {
          this.isEditFour = true;
        }
        this.isDraggable = true;
        this.active = this.activeIndex;
      }
    },
    // 下一步按钮事件
    next() {
      // 如果当前操作步骤大于当前所在步骤
      if (this.activeIndex === 0) {
        !this.isEditFirst ? this.nextFn() : this.saveInfo();
      } else if (this.activeIndex === 1) {
        !this.isEditSecond ? this.nextFn() : this.saveItemTopList();
      } else if (this.activeIndex === 2) {
        !this.isEditThree ? this.nextFn() : this.saveItemTotalList();
      } else if (this.activeIndex === 3) {
        !this.isEditFour ? this.nextFn() : this.saveItemSortList();
      }
    },
    // 下一步执行
    nextFn() {
      this.$set(this.isClickEdit, this.activeIndex, 0);
      if (this.activeIndex < 3) {
        if (this.active > this.activeIndex) {
          this.activeIndex++;
          this.editIndex = this.activeIndex;
        } else {
          this.active++;
        }
      } else {
        this.editIndex = this.activeIndex;
      }
    },
    // 前一步
    prev() {
      this.activeIndex--;
      this.editIndex = this.activeIndex;
      // if (this.isBack === true) {
      //   // this.active = this.activeIndex
      //   this.isBack = false
      // }
      this.loadData();
    },
    // 点击步骤条
    stpesClick(index) {
      // 不能点击还没有操作的步骤
      if (index <= this.active) {
        this.activeIndex = index;
        if (index === this.active) {
          this.editIndex = -1;
        } else {
          this.editIndex = this.activeIndex;
        }
        // if (this.isBack === true) {
        // //   this.active = this.activeIndex
        //   // this.active--
        //   this.isBack = false
        // }
        this.loadData();
      }
    },
    // 返回列表页面
    back() {
      if (
        !this.isEditFirst &&
        !this.isEditSecond &&
        !this.isEditThree &&
        !this.isEditFour
      ) {
        this.$router.push("/tpl/list");
      } else {
        this.$confirm(this.$t("bud.tpl.tip4"), this.$t("comm.tips"), {
          confirmButtonText: this.$t("comm.certain"),
          cancelButtonText: this.$t("comm.cancel"),
          cancelButtonClass: "btn-custom-cancel",
          type: "warning",
          iconClass: "iconfont icongantanhao_icon",
          customClass: localStorage.getItem("theme") == "Dark" ? "dark-message-box" : " "
        })
          .then(() => {
            this.$router.push("/tpl/list");
          })
          .catch(() => {});
      }
    },
    // 第一部分模板信息保存
    saveInfo() {
      this.$refs["tplInfo"].validate(async valid => {
        if (valid) {
          const res = await saveTplInfo(this.tplInfo);
          if (res) {
            if (res.success) {
              this.$message({
                type: "success",
                iconClass: "iconfont icongantanhao_icon",
                customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
                message: "保存成功!"
              });
              this.isEditFirst = false;
              if (res.datas.result) {
                this.templateId = res.datas.result.id;
                this.tplInfo = res.datas.result;
                localStorage.setItem("tpl-step-templateId", this.templateId);
              }
              this.nextFn();
            }
          }
        } else {
          return false;
        }
      });
    },
    // 第二部分模板科目选择部分
    openDialog() {
      // 打开弹框
      this.itemDialogVisible = true;
    },
    onConfirm(arr) {
      // 点击确认
      // this.itemDialogVisible = false
      this.onCloseDialog();
      let items = this.tplItemTopList;
      items = items.concat(
        arr.map(function(item) {
          return {
            id: null,
            itemId: item.id,
            itemType: item.itemType,
            isInit: 0,
            isApprove: 0,
            sortNo: 0,
            itemName: item.itemName,
            itemNum: item.itemNum
          };
        })
      );
      // console.log('222--------------->' + JSON.stringify(items))
      const res = new Map();
      this.tplItemTopList = items.filter(
        a => !res.has(a.itemId) && res.set(a.itemId, 1)
      );
      this.$nextTick(() => {
        this.$refs["itemListTb"].doLayout();
        this.getScrollBar();
        $(".el-table__body-wrapper")
          .getNiceScroll()
          .resize();
      });
    },
    onCloseDialog() {
      // 点击取消
      this.itemDialogVisible = false;
      // this.$refs.itemDialogTable.clearSelectedItems()
    },
    // 移除模板科目当前行按钮
    deleteTopItem(index) {
      this.$confirm(this.$t("comm.tip19"), this.$t("comm.tips"), {
        confirmButtonText: this.$t("comm.certain"),
        cancelButtonText: this.$t("comm.cancel"),
        cancelButtonClass: "btn-custom-cancel",
        type: "warning",
        iconClass: "iconfont icongantanhao_icon",
        customClass: localStorage.getItem("theme") == "Dark" ? "dark-message-box" : " "
      })
        .then(() => {
          this.tplItemTopList.splice(index, 1);
        })
        .catch(() => {});
    },
    // 第二部分保存模板科目
    async saveItemTopList() {
      const res = await saveTplTopItemList({
        templateId: this.templateId,
        items: JSON.stringify(this.tplItemTopList)
      });
      if (res) {
        if (res.success) {
          this.$message({
            type: "success",
            iconClass: "iconfont icongantanhao_icon",
            customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
            message: "保存成功!"
          });
          this.isEditSecond = false;
          this.loadTplItemTreeList();
          this.nextFn();
        }
      }
      // TODO 临时去掉校验
      // if (this.tplItemTopList.length <= 0) {
      //   this.$message({
      //     type: 'error',
      //     message: '至少添加一条数据!'
      //   })
      //   return
      // } else {
      //   const res = await saveTplTopItemList({ templateId: this.templateId, items: JSON.stringify(this.tplItemTopList) })
      //   if (res) {
      //     if (res.success) {
      //       this.$message({
      //         type: 'success',
      //         message: '保存成功!'
      //       })
      //       this.isEditSecond = false
      //       this.loadTplItemTreeList()
      //       this.nextFn()
      //     }
      //   }
      // }
    },
    // 第三步添加合计项部分
    addTotalTree() {
      this.editTotal = false;
      this.isShowAddTotal = true;
    },
    // 关闭合计项弹框
    onCloseTotal() {
      this.isShowAddTotal = false;
    },
    // 删除合计项节点
    onDeletedTree(id) {
      this.$confirm(this.$t("comm.tip19"), this.$t("comm.tips"), {
        confirmButtonText: this.$t("comm.certain"),
        cancelButtonText: this.$t("comm.cancel"),
        cancelButtonClass: "btn-custom-cancel",
        type: "warning",
        iconClass: "iconfont icongantanhao_icon",
        customClass: localStorage.getItem("theme") == "Dark" ? "dark-message-box" : " "
      })
        .then(() => {
          this.tplItemTreeList.map((item, index) => {
            if (item.id === id) {
              this.tplItemTreeList.splice(index, 1);
            }
          });
        })
        .catch(() => {});
    },
    // 编辑合计项节点
    onEditTree(id) {
      this.tplItemTreeList.map((item, index) => {
        if (item.id === id) {
          this.itemsData = item;
          // console.log('---------->', JSON.stringify(this.itemsData))
          this.editTotal = true;
          this.isShowAddTotal = true;
        }
      });
    },
    // 添加合计项确认按钮
    onConfirmTotal(val) {
      this.isShowAddTotal = false;
      // console.log('this.editTotal', this.editTotal)
      // console.log('totalItem', JSON.stringify(val))
      // console.log('editTotal', this.editTotal)
      if (!this.editTotal) {
        this.tplItemTreeList.push({
          label: val.label,
          id: val.id,
          itemType: val.itemType,
          templateItemIds: val.templateItemIds
        });
      } else {
        this.tplItemTreeList.map(item => {
          if (item.id === val.id) {
            item.templateItemIds = val.templateItemIds;
            item.label = val.label;
          }
        });
      }
    },
    // 第三部分保存合计项信息
    async saveItemTotalList() {
      // TODO 增加保存方法
      const itemTotalData = [];
      this.tplItemTreeList.map((item, index) => {
        if (item.itemType === "03") {
          itemTotalData.push({
            name: item.label,
            templateItemIds: item.templateItemIds
          });
        }
      });
      const res = await saveTplItemTotalList({
        templateId: this.templateId,
        items: JSON.stringify(itemTotalData)
      });
      if (res) {
        if (res.success) {
          this.$message({
            type: "success",
            iconClass: "iconfont icongantanhao_icon",
            customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
            message: "保存成功!"
          });
          this.isEditThree = false;
          this.loadTplItemTreeSortList();
          this.nextFn();
        }
      }
    },
    // 第四步保存模板科目排序
    async saveItemSortList() {
      this.isEditFour = false;
      const nodeList = [];
      this.tplItemTreeSortList.map((item, index) => {
        nodeList.push(item.id);
        if (item.children && item.children.length > 0) {
          item.children.map(it => {
            nodeList.push(it.id);
          });
        }
      });
      // console.log('ids', nodeList.join(','))
      const res = await saveTplItemSortList({
        templateId: this.templateId,
        templateItemIds: nodeList.join(",")
      });
      if (res) {
        if (res.success) {
          this.$message({
            type: "success",
            iconClass: "iconfont icongantanhao_icon",
            customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
            message: "保存成功!"
          });
          this.isDraggable = false;
          this.$router.push("/tpl/list");
          // this.$router.go(0)
          // this.isEditFour = false
          // this.active = 4
          // this.loadTplItemTreeSortList()
          // this.nextFn()
        }
      }
    },
    draggable() {
      $(".dialog-drag").draggable({
        cursor: "move",
        handle: ".el-dialog__header",
        refreshPositions: true,
        containment: "parent"
      });
    }
  }
};
</script>
<style lang="scss">
//设置取消按钮向右浮动，左magin为10px，即与确定按钮间距为10px
.btn-custom-cancel {
  float: right;
  margin-left: 10px;
}
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
