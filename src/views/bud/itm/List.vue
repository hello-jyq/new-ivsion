<template>
  <div ref="apply" class="apply" :class="theme=='Light' ? 'apply-light' : 'apply'">
    <div class="search-left-box search-left-box-light">
      <div class="search-title">{{ $t('comm.queryCriteria') }}</div>
      <el-scrollbar>
        <el-form
          ref="form"
          class="search-form default-input"
          label-position="left"
          :model="searchParam.params"
        >
          <el-form-item prop="itemName">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                <!-- 科目名称 -->
                {{ $t('basedata.itemName') }}
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.itemName" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="identiferNum">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                <!-- 业务编号 -->
                {{ $t('basedata.identiferNum') }}
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.identiferNum" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="itemNum">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                <!-- 科目编号 -->
                {{ $t('basedata.itemNum') }}
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.itemNum" clearable />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="status">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                <!-- 状态 -->
                {{ $t('basedata.status') }}
              </el-col>
              <el-col :span="16">
                <dict-select
                  v-model="searchParam.params.status"
                  dict-type-id="BudItemStatus"
                  class="light-select"
                  theme="theme"
                />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="parentItemName">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                <!-- 所属科目组 -->
                {{ $t('basedata.parentItemName') }}
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.parentItemName" clearable />
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-scrollbar>
      <div class="search-btn-box">
        <div class="reset-box" @click="resetForm('form')">
          <p>{{ $t('comm.reset') }}</p>
          <span class="circle-larger-btn btn-default-color">
            <i class="iconfont iconrefresh" />
          </span>
        </div>
        <div class="search-box" @click="search">
          <p>{{ $t('comm.query') }}</p>
          <span class="circle-larger-btn btn-light-color bluebg">
            <i class="iconfont iconsousuo" />
          </span>
        </div>
      </div>
    </div>

    <div class="content content-light">
      <ul class="operation-box">
        <li class="operation-item" @click="handleCreate">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="iconfont iconxinjian" />
          </span>
          <span class="operation-text">新&nbsp;&nbsp;建</span>
        </li>
        <li class="operation-item" @click="handleEdit(multipleSelection)">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="iconfont iconbianji" />
          </span>
          <span class="operation-text">编&nbsp;&nbsp;辑</span>
        </li>
      </ul>
      <div class="table-bg-box search-list-table">
        <div ref="tables" style="height: 100%;">
          <el-table
            ref="table"
            v-loading="isLoading"
            class="scroll-table-box"
            :data="itemList"
            height="100%"
            stripe
            border
            @selection-change="handleSelectionChange"
          >
            <el-table-column :resizable="false" type="selection" width="40" fixed />
            <el-table-column
              prop="identiferNum"
              :label="$t('basedata.identiferNum')"
              min-width="100"
              header-align="center"
              align="center"
              fixed
            >
              <template slot-scope="scope">
                <a class="link" @click.prevent="viewItem(scope.row.id)">{{ scope.row.identiferNum }}</a>
              </template>
            </el-table-column>
            <el-table-column
              prop="itemName"
              :label="$t('basedata.itemName')"
              min-width="200"
              show-overflow-tooltip
              header-align="center"
              align="left"
              fixed
            />
            <el-table-column
              prop="itemNum"
              :label="$t('basedata.itemNum')"
              min-width="150"
              header-align="center"
              align="left"
            />
            <el-table-column
              prop="parentItemName"
              :label="$t('basedata.parentItemName')"
              min-width="200"
              show-overflow-tooltip
              header-align="center"
              align="left"
            />
            <el-table-column
              prop="itemType"
              :label="$t('basedata.itemType')"
              min-width="80"
              header-align="center"
              align="center"
            />
            <el-table-column
              prop="status"
              :label="$t('basedata.status')"
              min-width="60"
              header-align="center"
              align="center"
            />
            <el-table-column
              prop="remark"
              :label="$t('basedata.remark')"
              min-width="300"
              show-overflow-tooltip
              header-align="center"
              align="left"
            />
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
        <el-pagination class="page-right page-first" layout="slot">
          <span class="iconfont iconjiantou-zuozhi page-first-page" @click="toFirstPage" />
        </el-pagination>
      </div>
    </div>
    <!-- 科目新建编辑Dialog -->
    <el-dialog
      :key="dialogKey"
      class="content-dialog-box search-light"
      :close-on-click-modal="false"
      custom-class="dialog-drag fixed-search-btn-box"
      top="0"
      :title.sync="titleType"
      :visible.sync="dialogSearchVisible"
      width="60%"
    >
      <edit-dailog
        :dialog-type="dialogType"
        :identifernum-flag="identifernumFlag"
        :othermessage-flag="othermessageFlag"
        :status-enable="statusEnable"
        :type-enable="typeEnabale"
        :item-type="item.itemType"
        :status="item.status"
        :items="item"
        :item-groups="itemGroups"
        @onClose="dialogSearchVisible = false"
        @onConfirm="onConfirm"
        @onScroll="onScroll"
      />
    </el-dialog>
    <!-- <edit-dailog
      :is-show="itemEditVisible"
      :dialog-type="dialogType"
      :identifernum-flag="identifernumFlag"
      :othermessage-flag="othermessageFlag"
      :status-enable="statusEnable"
      :type-enable="typeEnabale"
      :item-type="item.itemType"
      :status="item.status"
      :items="item"
      :item-groups="itemGroups"
      @onClose="dialogSearchVisible = false"
      @onConfirm="onConfirm"
      @onScroll="onScroll"
    />-->
  </div>
</template>
<script>
import { search } from "@/mixins/search-params";
import {
  getItems,
  newItem,
  editItem,
  getItemGroups
} from "@/api/bud/itm/itm-api";
import { formValidator } from "@/mixins/form-validator.js";
import { permission } from "@/mixins/permission-mixin";
import DictSelect from "@/components/DictSelect";
import editDailog from "./_Edit.vue";

var elementResizeDetectorMaker = require("element-resize-detector");
import $ from "jquery";
import "jquery.nicescroll";

export default {
  components: {
    DictSelect,
    editDailog
  },
  mixins: [search, formValidator, permission],
  data() {
    return {
      isLoading: true,
      activeNames: ["1"],
      itemList: [],
      showDialog: false,
      dialogType: "create",
      dialogKey: 0,
      item: {
        itemName: "",
        itemNum: "",
        itemType: "01",
        status: "01",
        parentItemName: "",
        remark: ""
      },
      identifernumFlag: false,
      typeEnabale: false,
      statusEnable: false,
      othermessageFlag: false,
      itemGroups: [
        {
          itemId: "",
          itemName: ""
        }
      ],
      titleType: "新建",
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          itemName: "",
          identiferNum: "",
          itemNum: "",
          status: "",
          parentItemName: ""
        }
      },
      theme: localStorage.getItem("theme") !== "Dark" ? "Light" : "",
      searchPopover: false,
      orgChoseDilog: false,
      defaultProps: {
        children: "children",
        label: "label"
      },
      expandedKeys: [],
      cities: [],
      dialogSearchVisible: false,
      dialogSearchCheckVisible: false,
      dialogUpdateHistoryVisible: false,
      funcNo: "",
      dacList: [],
      multipleSelection: [],
      activeName: "basic",
      levelList: [],
      accessUrlData: [],
      createObjectDialog: false,
      objectRadio: "COL",
      objectInp: "",
      objectData: {
        header: [],
        table: []
      },
      visitorRadio: "USER",
      createVisitorDialog: false,
      visitorData: {
        header: [],
        table: []
      },
      uploadDialog: false,
      id: "",
      options: [],
      tableHeight: null,
      // scrollColr: localStorage.getItem('theme') === 'Light' ? '#D8E0E8' : '#5A5E63',
      scrollColr: localStorage.getItem('theme') !== 'Dark' ? '#D8E0E8' : '#5A5E63',
      selectData: '',
      orgAddOrEdit: '',
      itemEditVisible: false
    };
  },
  created: function () {
    this.fetchData()
    console.log(this.theme)
  },
  mounted() {
    // this.theme = localStorage.getItem('theme') || 'Dark'
    // if (this.theme === 'Dark') {
    //   this.scrollColr = '#5A5E63'
    // } else {
    //   this.scrollColr = '#dddddd'
    // }
    var erd = elementResizeDetectorMaker()
    var that = this
    erd.listenTo(that.$refs.apply, function (element) {
      that.$nextTick(function () {
        this.getScrollBar()
        this.getDragBar()
        this.changeTableHeight()
        $('.el-table__body-wrapper').getNiceScroll().resize()
      })
    })

    erd.listenTo(document.getElementsByClassName('dialog-drag')[0], function (element) {
      that.$nextTick(function () {
        this.getScrollBar()
        this.getDragBar()
        $('.el-table__body-wrapper').getNiceScroll().resize()
        $('.el-dialog__body').getNiceScroll().resize()
      })
    })
    // erd.listenTo(document.getElementsByClassName('dialog-drag')[1], function(element) {
    //   that.$nextTick(function() {
    //     this.getScrollBar()
    //     this.getDragBar()
    //     $('.el-table__body-wrapper').getNiceScroll().resize()
    //     $('.el-dialog__body').getNiceScroll().resize()
    //   })
    // })
    this.getScrollBar();
    this.getDragBar();

    // 拖拽
    $(".dialog-drag").draggable({
      cursor: "move",
      handle: ".el-dialog__header",
      refreshPositions: true,
      containment: "parent",
      stop() {
        $(".el-table__body-wrapper")
          .getNiceScroll()
          .resize();
        $(".el-dialog__body")
          .getNiceScroll()
          .resize();
      }
    });
    // 缩放
    // $('#drag1 .dialog-drag').resizable({
    //   aspectRatio: false,
    //   minHeight: 150,
    //   containment: '#drag1'
    // })
    // $('#drag2 .dialog-drag').resizable({
    //   aspectRatio: false,
    //   minHeight: 150,
    //   containment: '#drag2'
    // })
  },
  methods: {
    selectP(data) {
      console.log("data", data);
      this.selectData = data;
    },
    onScroll() {
      this.getScrollBar();
      $(".el-table__body-wrapper")
        .getNiceScroll()
        .resize();
    },
    onConfirm() {
      this.dialogSearchVisible = false;
      this.fetchData();
    },
    onCheck() {
      this.dialogSearchVisible = false;
      this.dialogSearchCheckVisible = true;
    },
    changeTableHeight() {
      var tableStyleObject = getComputedStyle(this.$refs.tables, null);
      this.tableHeight = parseInt(tableStyleObject.height);
    },
    getScrollBar() {
      $(".el-table__body-wrapper").niceScroll({
        cursorcolor: this.scrollColr,
        cursoropacitymin: 0, // 当滚动条是隐藏状态时改变透明度, 值范围 1 到 0
        cursoropacitymax: 1, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
        cursorwidth: "8px", // 滚动条的宽度，单位：便素
        cursorborder: `1px solid ${this.scrollColr}`, // CSS方式定义滚动条边框
        autohidemode: true, // 隐藏滚动条的方式, 可用的值:
        zindex: 99,
        railpadding: { top: 0, right: 0, left: 0, bottom: 0 },
        boxzoom: false,
        iframeautoresize: true // 在加载事件时自动重置iframe大小
      });
    },
    getDragBar() {
      $(".el-dialog__body").niceScroll({
        cursorcolor: this.scrollColr,
        cursoropacitymin: 0, // 当滚动条是隐藏状态时改变透明度, 值范围 1 到 0
        cursoropacitymax: 1, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
        cursorwidth: "8px", // 滚动条的宽度，单位：便素
        cursorborder: `1px solid ${this.scrollColr}`, // CSS方式定义滚动条边框
        autohidemode: true, // 隐藏滚动条的方式, 可用的值:
        zindex: 1,
        railpadding: { top: 0, right: 0, left: 0, bottom: 0 },
        boxzoom: false,
        iframeautoresize: true // 在加载事件时自动重置iframe大小
      });
    },
    openDialog() {
      this.dialogSearchVisible = true;
    },
    getChecked(data, node, ischeck) {
      if (node.isLeaf) {
        console.log("node", node);
        this.searchParam.params.sales = node.data.name;
        this.searchPopover = false;
        console.log("data", data);
        console.log("node", node.data);
        console.log("ischeck", ischeck);
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.table.toggleRowSelection(row);
        });
      } else {
        this.$refs.table.clearSelection();
      }
    },
    async fetchData() {
      const res = await getItems(this.searchParam);
      if (res && res.success) {
        const { totalRecord, results } = res.datas.searchResult;
        this.searchParam.totalRecord = totalRecord;
        this.itemList = results;
      }
      // 获取系统科目组
      const itemGroupsRes = await getItemGroups();
      const itemGroupsResults = itemGroupsRes.datas.itemGroups;
      this.itemGroups = itemGroupsResults;

      this.tableDolayout(this.$refs["table"]);
      this.isLoading = false;
    },
    handleSelectionChange(val) {
      console.log("val", val);
      this.multipleSelection = val;
    },
    handleCreate() {
      this.$router.push({
        path: "/itm/add",
        params: { itemId: "-1", flag: "1" }
      });
    },
    async handleEdit(val) {
      // 所选项目大于1个时，不可编辑
      if (val.length === 0 || val.length > 1) {
        this.$message({
          type: "message",
          iconClass: "iconfont icongantanhao_icon",
          customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
          message: this.$t("comm.msg3")
        });
        return;
      }
      let selectItemId = "";
      if (val && val.length > 0) {
        val.forEach(obj => {
          selectItemId = obj.id;
        });
      }
      this.$router.push({
        path: "/itm/edit",
        query: { itemId: selectItemId, flag: "2" }
      });
      // this.$router.push({ name: 'itmEdit', params: { itemId: selectItemId, flag: '2' }})
      // this.dialogKey++
      // this.dialogType = 'edit'
      // this.activeName = 'menu'
      // this.titleType = '编辑'
      // this.item = {}
      // this.identifernumFlag = true
      // this.othermessageFlag = true
      // this.statusEnable = false
      // this.typeEnabale = true
      // const itemInfoRes = await getItemInfo(selectItemId)
      // this.item = itemInfoRes.datas.itemSelectResult
      // this.dialogSearchVisible = true
    },
    async viewItem(val) {
      // this.dialogKey++
      // this.dialogType = 'edit'
      // this.activeName = 'menu'
      // this.titleType = '编辑'
      // this.item = {}
      // this.identifernumFlag = true
      // this.othermessageFlag = true
      // this.statusEnable = false
      // this.typeEnabale = true
      // const itemInfoRes = await getItemInfo(val)
      // this.item = itemInfoRes.datas.itemSelectResult
      // this.dialogSearchVisible = true
      // this.$router.push({ path: '/itm/edit', query: { itemId: val, flag: '2' }})
      this.$router.push({
        name: "itmEdit",
        params: { itemId: val, flag: "2" }
      });
    },
    async handleSave() {
      if (!this.validatorAll()) {
        return false;
      }
      if (this.dialogType === "create") {
        const res = await newItem(this.item);
        if (res) {
          if (res.success) {
            this.showDialog = false;
            this.$message({
              type: "success",
              iconClass: "iconfont icongantanhao_icon",
              customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
              message: "新建成功!"
            });

            this.fetchData();
          }
        }
      } else if (this.dialogType === "edit") {
        const res = await editItem(this.item);
        if (res) {
          if (res.success) {
            this.showDialog = false;
            this.$message({
              type: "success",
              iconClass: "iconfont icongantanhao_icon",
              customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
              message: "编辑成功!"
            });
            this.fetchData();
          }
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.abow_dialog {
  display: flex;
  justify-content: center;
  align-items: Center;
  overflow: hidden;
  .el-dialog {
    margin: 0 auto !important;
    height: 90%;
    overflow: hidden;
    .el-dialog__body {
      position: absolute;
      left: 0;
      top: 54px;
      bottom: 0;
      right: 0;
      padding: 0;
      z-index: 1;
      overflow: hidden;
      overflow-y: auto;
    }
  }
}
</style>

