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
          <el-form-item prop="year">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">{{ $t('bud.tpl.year') }}</el-col>
              <el-col :span="16">
                <el-select
                  v-model="searchParam.params.year"
                  clearable
                  placeholder="请选择"
                  class="light-select"
                  :popper-class="theme=='Light' ? 'blueSelect' : ''"
                >
                  <el-option
                    v-for="item in yearList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="name">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">{{ $t('bud.tpl.name') }}</el-col>
              <el-col :span="16">
                <el-input v-model="searchParam.params.name" clearable maxlength="100" />
              </el-col>
            </el-row>
          </el-form-item>

          <!-- <el-form-item prop="abc">
            <el-row type="flex" :gutter="5" justify="space-between">
              <el-col :span="8">
                测试科目多选
              </el-col>
              <el-col :span="16">
                <el-input v-model="itemSelectedIds">
          <i slot="suffix" class="iconfont iconsousuo" @click="openDialog" />-->
          <!-- <i slot="suffix" class="iconfont iconquxiao" @click="clearInput" /> -->
          <!-- </el-input>
              </el-col>
            </el-row>
          </el-form-item>-->
        </el-form>
      </el-scrollbar>
      <div class="search-btn-box">
        <div class="reset-box" @click="resetForm('form')">
          <p>重置</p>
          <span class="circle-larger-btn btn-default-color">
            <i class="iconfont iconrefresh" />
          </span>
        </div>
        <div class="search-box" @click="fetchData">
          <p>检索</p>
          <span class="circle-larger-btn btn-light-color bluebg">
            <i class="iconfont iconsousuo" />
          </span>
        </div>
      </div>
    </div>
    <div class="content content-light">
      <ul class="operation-box">
        <li class="operation-item" click="onEdit" @click="addTemplate">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="iconfont iconxinjian" />
          </span>
          <span class="operation-text">新&nbsp;&nbsp;建</span>
        </li>
        <li class="operation-item" @click="editTemplate">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="iconfont iconbianji" />
          </span>
          <span class="operation-text">编&nbsp;&nbsp;辑</span>
        </li>
        <li class="operation-item" @click="initTemplate">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="iconfont iconfinance" />
          </span>
          <span class="operation-text">{{ $t('bud.tpl.itemInit') }}</span>
        </li>
        <li class="operation-item" @click="cancelTemplate">
          <span class="operation-circle circle-middle-btn btn-light-color bluebg">
            <i class="iconfont iconshanchu" />
          </span>
          <span class="operation-text">作&nbsp;&nbsp;废</span>
        </li>
      </ul>
      <!-- :max-height="tableHeight" -->
      <div class="table-bg-box search-list-table">
        <div ref="tables" style="height: 100%;">
          <el-table
            ref="table"
            v-loading="isLoading"
            class="scroll-table-box"
            :data="dataList"
            height="100%"
            stripe
            border
            @selection-change="handleSelectionChange"
          >
            <el-table-column :resizable="false" type="selection" width="40" fixed />
            <!-- <el-table-column width="40" :resizable="false" class-name="table-radio" fixed>
              <template scope="scope">
                <el-radio v-model="radio" :label="scope.$index" class="textRadio" @change.native="getCurrentRow(scope.row)" />
              </template>
            </el-table-column>-->
            <el-table-column
              prop="identiferNum"
              :label="$t('bud.tpl.identiferNum')"
              min-width="100"
              align="center"
              header-align="center"
              show-overflow-tooltip
              fixed
            >
              <template slot-scope="scope">
                <a
                  class="link"
                  @click.prevent="viewTemplate(scope.row.id)"
                >{{ scope.row.identiferNum }}</a>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              :label="$t('bud.tpl.name')"
              min-width="200"
              header-align="center"
              show-overflow-tooltip
              fixed
            />
            <el-table-column
              prop="year"
              :label="$t('bud.tpl.year')"
              width="100"
              align="center"
              header-align="center"
              show-overflow-tooltip
            />
            <el-table-column
              prop="status"
              :label="$t('bud.tpl.status')"
              width="100"
              align="center"
              header-align="center"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <dict-write dict-type-id="BudTemplateStatus" :value="scope.row.status" />
              </template>
            </el-table-column>
            <el-table-column
              prop="remark"
              :label="$t('bud.tpl.remark')"
              header-align="center"
              min-width="300"
              show-overflow-tooltip
            />

            <!-- <el-table-column
              prop="quotationCommitDate"
              :label="$t('bud.quo.quotationCommitDate')"
              min-width="200"
              header-align="center"
              type="date"
              value-format="yyyy-MM-dd"
              show-overflow-tooltip
            />-->
            <!-- <el-table-column :label="$t('bud.quo.quotationCommitDate')" min-width="120" header-align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <p>{{ dateFtt('yyyy-MM-dd', scope.row.quotationCommitDate) }}</p>
              </template>
            </el-table-column>
            <el-table-column prop="email" header-align="center" :label="$t('bud.quo.email')" min-width="140" show-overflow-tooltip />
            <el-table-column prop="createByName" label="创建者" width="120" header-align="center" show-overflow-tooltip />
            <el-table-column prop="updateByName" :label="$t('bud.quo.updateBy')" width="120" header-align="center" show-overflow-tooltip />

            <el-table-column prop="updateTime" :label="$t('bud.quo.updateTime')" width="165" header-align="center" show-overflow-tooltip />
            <el-table-column prop="remark" :label="$t('bud.quo.remarks')" min-width="140" show-overflow-tooltip />-->
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

    <!-- <el-dialog
      id="itemDrag"
      ref="itemDragBox"
      class="content-dialog-box search-check-light search-light"
      :close-on-click-modal="false"
      custom-class="dialog-drag"
      top="0"
      title="科目选择"
      :before-close="onCloseDialog"
      :visible.sync="itemDialogVisible"
    >
      <item-dialog ref="itemDialogTable" @onClose="onCloseDialog" @onConfirm="onConfirm" @onScroll="onScroll" />
    </el-dialog>-->

    <el-dialog
      :title="$t('comm.upload')"
      :visible.sync="uploadDialog"
      width="400px"
      class="upload_zip"
    >
      <div class="box">
        <div slot="tip" class="el-upload__tip">
          <!-- 请用模板格式的xlsx文件进行上传 -->
        </div>
        <upload
          action="/api/comm/excel/upload/TPL"
          :other-params="otherParams"
          :accept="accept"
          :multiple="false"
          :on-success="handleUploadSuccess"
          :on-error="handleUploadError"
          @finish="uploadDialog=false"
        />
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { search } from "@/mixins/search-params";
import { getTplYears } from "@/api/bud/comm/comm-api";
import { getTplList, cancelTpl, downloadExcel } from "@/api/bud/tpl/tpl-api";
import { formValidator } from "@/mixins/form-validator.js";
import DictWrite from "@/components/DictWrite";
import { permission } from "@/mixins/permission-mixin";
// import itemDialog from '../itm/_itemSearch'
// import commonUtil from '@/utils/common.js'
import $ from "jquery";
import "jquery.nicescroll";
var elementResizeDetectorMaker = require("element-resize-detector");

// 上传组件
import Upload from "@/components/Upload";

export default {
  components: {
    DictWrite,
    Upload
    // itemDialog
  },
  mixins: [search, formValidator, permission],
  data() {
    return {
      theme: localStorage.getItem("theme") !== "Dark" ? "Light" : "", // 主题相关
      yearList: [], // 模板年度下拉框
      dataList: [], // 表格数据
      isLoading: true, // 加载相关效果
      multipleSelection: [], // 选择值
      searchParam: {
        // 分页参数
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          year: "",
          name: ""
        }
        // radioNumner: -1,
        // searchPopover: false,
        // orgChoseDilog: false,
        // dialogUpdateHistoryVisible: false,
        // funcNo: '',
        // activeName: 'basic',
        // dialogType: 'create',
        // accessUrlData: [],
        // createObjectDialog: false,
        // objectData: {
        //   header: [],
        //   table: []
        // },
        // visitorData: {
        //   header: [],
        //   table: []
        // }
      },
      itemSelectedIds: "", // 科目选择后的id串
      itemDialogVisible: false, // 科目选择弹框显示标志位
      tableHeight: null,
      uploadDialog: false, // 上传文件dialog显示标志位
      accept: ".xlsx",
      otherParams: {
        templateId: "",
        orgId: ""
      },
      scrollColr:
        localStorage.getItem("theme") === "Light" ? "#D8E0E8" : "#5A5E63"
    };
  },
  created: function() {
    this.getTplYear();
    this.fetchData();
    // console.log(this.theme)
  },
  mounted() {
    // 调整弹出框位置等相关
    var erd = elementResizeDetectorMaker();
    var that = this;
    erd.listenTo(that.$refs.apply, function(element) {
      that.$nextTick(function() {
        $(".el-table__body-wrapper")
          .getNiceScroll()
          .resize();
      });
    });
    this.getScrollBar();
  },
  methods: {
    handleUploadSuccess(res, file, fileList) {
      console.log(res);
      console.log(file);
      console.log(fileList);
    },
    handleUploadError(res, file, fileList) {
      console.log(res);
      console.log(file);
      console.log(fileList);
    },

    async fetchData() {
      // 分页查询方法
      const res = await getTplList(this.searchParam);
      if (res && res.success) {
        const { totalRecord, results } = res.datas.searchResult;
        this.searchParam.totalRecord = totalRecord;
        this.dataList = results;
      }
      // console.log(this.dataList)
      this.tableDolayout(this.$refs["table"]);
      this.isLoading = false;
      this.changeTableHeight();
    },
    // defaultYearSelect() {
    //   if (this.yearList && this.yearList.length > 0) {
    //     // 初始化查询给年度赋值
    //     // console.log(this.yearList)
    //     this.searchParam.params.year = this.yearList[0].value
    //   }
    // },
    async getTplYear() {
      // 获取年度方法
      const res = await getTplYears({ funcDiv: "TPL" });
      if (res && res.success) {
        const results = res.datas.yearList;
        this.yearList = results;
        // this.defaultYearSelect()
        // 调用查询方法
        // this.fetchData()
      }
    },
    viewTemplate(templateId) {
      // alert(templateId)
      this.$router.push({
        path: "/tpl/detail",
        params: { templateId: templateId, flag: 3 }
      });
      // console.log('templateId', templateId)
    },
    async addTemplate() {
      // 新增传递id为-1
      this.$router.push({
        path: "/tpl/edit",
        params: { templateId: "-1", flag: 1 }
      });

      // this.otherParams.templateId = '1000393498'
      // this.otherParams.orgId = '2021-1551'
      // this.uploadDialog = true
      // await downloadExcel({ 'templateId': this.otherParams.templateId, 'orgId': this.otherParams.orgId })
      // window.location.href = '/api/comm/excel/download/BAF?templateId=' + templateId + '&orgId=' + orgId
    },
    editTemplate() {
      // 校验不可多选
      if (this.multipleSelection && this.multipleSelection.length !== 1) {
        this.$message({
          type: "message",
          iconClass: "iconfont icongantanhao_icon",
          customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
          message: this.$t("comm.msg3")
        });
        return;
      }
      const rowObj = this.multipleSelection[0];
      if (rowObj.status !== "01") {
        // 仅草稿状态可以编辑
        this.$message({
          type: "message",
          iconClass: "iconfont icongantanhao_icon",
          customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
          message: this.$t("bud.tpl.e0007")
        });
        return;
      }
      this.$router.push({
        name: "/tpl/edit",
        params: { templateId: rowObj.id, flag: 2 }
      });
    },
    initTemplate() {
      // 校验不可多选
      if (this.multipleSelection && this.multipleSelection.length !== 1) {
        this.$message({
          type: "message",
          iconClass: "iconfont icongantanhao_icon",
          customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
          message: this.$t("comm.msg3")
        });
        return;
      }
      const rowObj = this.multipleSelection[0];
      if (rowObj.status !== "01" && rowObj.status !== "02") {
        // 仅草稿与发布状态可以财务预设
        this.$message({
          type: "message",
          iconClass: "iconfont icongantanhao_icon",
          customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
          message: this.$t("bud.tpl.e0010")
        });
        return;
      }
      if (rowObj.step !== 4) {
        // 仅完成四步骤可以操作
        this.$message({
          type: "message",
          iconClass: "iconfont icongantanhao_icon",
          customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
          message: this.$t("bud.tpl.e0009")
        });
        return;
      }
      this.$router.push("/tpl/fedit");
      // const rowObj = this.multipleSelection[0]
      // alert(rowObj.identiferNum)
    },
    cancelTemplate() {
      // 校验不可多选
      if (this.multipleSelection && this.multipleSelection.length !== 1) {
        this.$message({
          type: "message",
          iconClass: "iconfont icongantanhao_icon",
          customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
          message: this.$t("comm.msg3")
        });
        return;
      }
      const rowObj = this.multipleSelection[0];
      if (rowObj.status !== "01" && rowObj.status !== "02") {
        // 仅草稿与发布状态可以作废
        this.$message({
          type: "message",
          iconClass: "iconfont icongantanhao_icon",
          customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
          message: this.$t("bud.tpl.e0005")
        });
        return;
      }
      this.$confirm(this.$t("bud.tpl.tip3"), this.$t("comm.tips"), {
        confirmButtonText: this.$t("comm.certain"),
        cancelButtonText: this.$t("comm.cancel"),
        cancelButtonClass: "btn-custom-cancel",
        type: "warning",
        iconClass: "iconfont icongantanhao_icon",
        customClass: localStorage.getItem("theme") == "Dark" ? "dark-message-box" : " "
      })
        .then(async () => {
          const res = await cancelTpl(rowObj.id);
          if (res) {
            if (res.success) {
              this.$message({
                type: "success",
                iconClass: "iconfont icongantanhao_icon",
                customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
                message: "操作成功!"
              });
              this.fetchData();
            }
          }
        })
        .catch(() => {});
    },
    // openDialog() { // 科目选择弹框
    //   this.itemDialogVisible = true
    // },
    // clearInput() {
    //   this.itemSelectedIds = ''
    // },
    // onScroll() {
    //   this.getScrollBar()
    //   $('.el-table__body-wrapper').getNiceScroll().resize()
    // },
    // onConfirm(arr) {
    //   this.itemDialogVisible = false
    //   // console.log('arr', arr.length)
    //   // console.log('arr--->', JSON.stringify(arr))
    //   this.itemSelectedIds = arr.map(item => item.id).join(',')
    //   // console.log('ids', this.itemSelectedIds)
    //   // arr.map(item => {
    //   //   console.log('item', item)
    //   // })
    // },
    // onCloseDialog() {
    //   this.itemDialogVisible = false
    //   this.$refs.itemDialogTable.clearSelectedItems()
    // },
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
        zindex: 0,
        railpadding: { top: 0, right: 0, left: 0, bottom: 0 },
        boxzoom: false,
        iframeautoresize: false // 在加载事件时自动重置iframe大小
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      // 默认选中第一个年份
      // this.defaultYearSelect()
    },
    onEdit() {
      this.$router.push("/tpl/edit");
    },
    // toggleSelection(rows) {
    //   if (rows) {
    //     rows.forEach(row => {
    //       this.$refs.table.toggleRowSelection(row)
    //     })
    //   } else {
    //     this.$refs.table.clearSelection()
    //   }
    // },
    // getCurrentRow(row) {
    //   this.multipleSelection = row
    //   console.log('row', JSON.stringify(row))
    // },
    handleSelectionChange(row) {
      this.multipleSelection = row;
      // console.log('length', row.length)、
      // // 单选逻辑
      // if (row.length > 1) {
      //   // this.$refs.table.clearSelection()
      //   // this.$refs.table.toggleRowSelection(row[row.length === this.dataList.length ? 0 : row.length - 1])
      //   if (row.length === this.dataList.length && row.length > 2) {
      //     this.$refs.table.clearSelection()
      //     this.$refs.table.toggleRowSelection(this.dataList[0])
      //   } else {
      //     const arrays = row.splice(0, row.length - 1)
      //     // console.log(JSON.stringify(arrays))
      //     arrays.forEach(row => {
      //       this.$refs.table.toggleRowSelection(row) // 除了当前点击的，其他的全部取消选中
      //     })
      //   }
      //   return
      // } else {
      //   // console.log('========>row', JSON.stringify(row))
      //   this.multipleSelection = row
      //   const ids = this.multipleSelection.map(item => item.identiferNum)
      //   console.log('ids', ids.join(','))
      // }
    },
    // handleDelete(item) {
    //   // 编辑功能，首先检查是否有编辑权限
    //   if (!commonUtil.checkRight(item.rightNo, 'delete')) {
    //     this.$message({
    //       type: 'warning',
    //       message: this.$t('comm.msg34')
    //     })
    //     return
    //   }

    //   // 是否审批中检查
    //   if (item.workflowFlag != null && item.workflowFlag === '1') {
    //     this.$message({
    //       type: 'warning',
    //       message: this.$t('workflow.e0006')
    //     })
    //     return
    //   }

    //   this.$confirm(this.$t('comm.tip1'), this.$t('comm.tips'), {
    //     confirmButtonText: this.$t('comm.certain'),
    //     cancelButtonText: this.$t('comm.cancel'),
    //     type: 'warning'
    //   }).then(async() => {
    //     await deleteDac([item.id])
    //     this.search()
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: this.$t('comm.msg1')
    //     })
    //   })
    // },
    // handleDeleteBatch() {
    //   if (this.multipleSelection.length > 0) {
    //     let deleteAuth = true
    //     let workflowFlag = false
    //     this.multipleSelection.forEach(item => {
    //       // 编辑功能，首先检查是否有编辑权限
    //       if (!commonUtil.checkRight(item.rightNo, 'delete')) {
    //         deleteAuth = false
    //         return false
    //       }

    //       // 是否审批中检查
    //       if (item.workflowFlag != null && item.workflowFlag === '1') {
    //         workflowFlag = true
    //         return false
    //       }
    //     })

    //     // 没有删除权限时
    //     if (!deleteAuth) {
    //       this.$message({
    //         type: 'warning',
    //         message: this.$t('comm.msg34')
    //       })
    //       return
    //     }

    //     // 审批中的时候
    //     if (workflowFlag) {
    //       this.$message({
    //         type: 'warning',
    //         message: this.$t('workflow.e0006')
    //       })
    //       return
    //     }

    //     this.$confirm(this.$t('comm.tip2'), this.$t('comm.tips'), {
    //       confirmButtonText: this.$t('comm.certain'),
    //       cancelButtonText: this.$t('comm.cancel'),
    //       type: 'warning'
    //     }).then(() => {
    //       const ids = this.multipleSelection.map(item => item.id)
    //       deleteDac(ids).then(() => {
    //         this.search()
    //       })
    //     }).catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: this.$t('comm.msg1')
    //       })
    //     })
    //   } else {
    //     this.$message({
    //       type: 'info',
    //       message: this.$t('comm.msg3')
    //     })
    //   }
    // },

    // handleAdd() {
    //   this.identiferNum = 0
    //   this.params = {}
    //   this.$router.push('/wfdemo/apply')
    // },
    // handleCreate() {
    //   this.dialogObj = {}
    //   this.dialogType = 'create'
    //   this.activeName = 'basic'
    //   this.accessUrlData = []
    //   this.validatorState = false
    //   this.objectData = {
    //     header: [],
    //     table: []
    //   }
    //   this.visitorData = {
    //     header: [],
    //     table: []
    //   }
    //   this.showDialog = true
    //   this.$nextTick(function() {
    //     this.clearErrorMessage()
    //   })
    // },
    // handleEdit(item) {
    //   // 编辑功能，首先检查是否有编辑权限
    //   if (!commonUtil.checkRight(item.rightNo, 'write')) {
    //     this.$message({
    //       type: 'warning',
    //       message: this.$t('comm.msg33')
    //     })
    //     return
    //   }

    //   // 是否审批中检查
    //   if (item.workflowFlag != null && item.workflowFlag === '1') {
    //     this.$message({
    //       type: 'warning',
    //       message: this.$t('workflow.e0007')
    //     })
    //     return
    //   }
    //   this.$router.push({ path: '/wfdemo/apply', query: {
    //     id: item.id
    //   }})
    // },
    // handleNumClick: function(id) {
    //   this.$router.push({ path: '/wfdemo/approve', query: { id: id }})
    // },
    // handleUpdateHistoryClick() {
    //   if (this.multipleSelection.length === 0) {
    //     this.$message({
    //       type: 'info',
    //       message: this.$t('comm.msg3')
    //     })
    //   } else if (this.multipleSelection.length > 1) {
    //     this.$message({
    //       type: 'info',
    //       message: this.$t('comm.msg3')
    //     })
    //   } else {
    //     this.funcNo = this.multipleSelection[0].identiferNum
    //     this.dialogUpdateHistoryVisible = true
    //   }
    // },
    dateFtt(fmt, time) {
      let date;
      if (!time) {
        date = new Date();
      } else {
        date = new Date(time);
      }
      const o = {
        "M+": date.getMonth() + 1, // 月份
        "d+": date.getDate(), // 日
        "h+": date.getHours(), // 小时
        "m+": date.getMinutes(), // 分
        "s+": date.getSeconds(), // 秒
        "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds() // 毫秒
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
        }
      }
      return fmt;
    }
  }
};
</script>

