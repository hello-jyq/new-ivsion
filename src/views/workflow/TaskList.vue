<template>
  <div
    :class="theme=='Light'?'no-search-content-box advice-apply adaL-light flex-height-table':'no-search-content-box advice-apply flex-height-table'"
  >
    <div class="table-bg-box">
      <el-table ref="table" :data="taskToView" border stripe style="width: 100%" height="100%">
        <el-table-column type="selection" width="45" />
        <el-table-column :label="$t('comm.operation')" width="80" align="center">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="handleBtnExec(scope.row)">
              <!-- 处理 -->
              {{ $t('workflow.handle') }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          :label="$t('workflow.nodeName')"
          min-width="100"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          :label="$t('workflow.processId')"
          prop="persionalApplying"
          min-width="100"
          align="center"
        >
          <template slot-scope="scope">
            <a
              class="link"
              @click.prevent="handleProcessInstClick(scope.row.processInstId)"
            >{{ scope.row.processInstId }}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="processDefinitionName"
          :label="$t('workflow.processDefinitionName')"
          min-width="100"
          align="center"
        />
        <el-table-column
          prop="processName"
          :label="$t('workflow.processName')"
          min-width="100"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          prop="startUserNickName"
          :label="$t('workflow.startUserNickName')"
          min-width="100"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          prop="startTime"
          :label="$t('workflow.startTime')"
          min-width="100"
          align="center"
          show-overflow-tooltip
        />
      </el-table>
    </div>
    <el-dialog
      id="processDialog"
      :title="$t('workflow.detailedProcess') + processInstId"
      :visible.sync="dialogTableVisible"
      custom-class="dialog-drag"
      class="content-dialog-box"
    >
      <process-detail :key="processInstId" :process-inst-id="processInstId" />
    </el-dialog>
  </div>
</template>
<script>
import { getTasks, agreeTasks } from "@/api/base";
import ProcessDetail from "@/components/ProcessDetail";
import { mapGetters } from "vuex";
import $ from "jquery";
import "jquery.nicescroll";
export default {
  name: "TaskList",
  components: {
    ProcessDetail
  },
  data() {
    return {
      theme: localStorage.getItem("theme") !== "Dark" ? "Light" : "",
      dialogVisible: false,
      name: "",
      scrollColr:
        localStorage.getItem("theme") !== "Dark" ? "#D8E0E8" : "#5A5E63",
      isLoading: true,
      activeNames: ["1"],
      taskList: [],
      taskToView: [],
      processInstId: "",
      dialogTableVisible: false,
      multipleSelection: [],
      searchParam: {
        paging: false,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          procInstId: "",
          procDefName: "",
          procInstName: ""
        }
      }
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    dialogTableVisible: function() {
      this.$nextTick(function() {
        this.getScrollBar();
      });
    }
  },
  mounted() {
    // this.getAdrApproveList()
    // 拖拽
    this.draggable();
    // 缩放
    this.resizable();
    this.getScrollBar();
    // 拖拽
    // $('.dialog-drag').draggable({
    //   cursor: 'move',
    //   handle: '.el-dialog__header,.advice-title-box',
    //   refreshPositions: true,
    //   containment: 'parent',
    //   stop() {
    //   }
    // })
  },
  Computed: {
    ...mapGetters(["searchParams"])
  },
  methods: {
    draggable() {
      $(".dialog-drag").draggable({
        cursor: "move",
        handle: ".el-dialog__header",
        refreshPositions: true,
        containment: "parent",
        stop() {
          $(".el-dialog__body")
            .getNiceScroll()
            .resize();
        }
      });
    },
    resizable() {
      $(".dialog-drag").resizable({
        aspectRatio: false,
        minHeight: 150,
        containment: "parent",
        stop: function(event, ui) {
          $(".footer-box").addClass("drag-table-height");
          $(".el-table__body-wrapper")
            .getNiceScroll()
            .resize();
          $(".el-dialog__body")
            .getNiceScroll()
            .resize();
        }
      });
    },
    fetchData: async function() {
      const res = await getTasks(this.searchParam.params);
      if (res && res.success) {
        if (res.datas && res.datas.taskList) {
          const _this = this;
          let ret = res.datas.taskList;
          if (_this.searchParam.params.procInstId) {
            ret = ret.filter(item => {
              return (
                item.processInstId.indexOf(
                  _this.searchParam.params.procInstId
                ) > -1
              );
            });
          }
          if (_this.searchParam.params.procInstName) {
            ret = ret.filter(item => {
              return (
                item.processName.indexOf(
                  _this.searchParam.params.procInstName
                ) > -1
              );
            });
          }
          this.taskList = ret;
          this.searchParam.totalRecord = ret.length;
          const start =
            (this.searchParam.pageNo - 1) * this.searchParam.pageSize;
          this.taskToView = this.taskList.slice(
            start,
            start + this.searchParam.pageSize
          );
        }
      }
      this.tableDolayout(this.$refs["table"]);
      this.isLoading = false;
    },
    handleBtnExec(row) {
      this.$router.push({
        path: row.formKey,
        query: {
          taskId: row.id,
          processInstId: row.processInstId,
          id: row.businessKey
        }
      });
    },
    handleProcessInstClick: function(processInstId) {
      this.processInstId = processInstId;
      this.dialogTableVisible = true;
      this.getScrollBar();
    },
    // 申请
    onApply(row) {
      console.log("row", row);
      this.name = row.itemName;
      this.dialogVisible = true;
    },
    // 确认
    onConfirm() {
      this.dialogVisible = false;
      this.$router.push({
        path: "/ada/edit",
        query: {
          name: this.form.template
        }
      });
    },
    // 查看
    onLook(row) {},
    // 编辑
    onEdit(row) {},
    // 撤销
    onRevoke(row) {},
    // 删除
    onDeleted(index) {
      console.log("row", index);
    },
    getScrollBar() {
      $(".el-dialog__body").niceScroll({
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
    }
  }
};
</script>
<style lang="scss">
#processDialog .el-dialog {
  width: 1000px;
  height: 800px;
  min-width: 950px;
  margin-top: 80px !important;
  padding: 0;
  border-radius: 16px;
}
</style>

