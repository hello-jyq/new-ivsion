<template>
  <div class="addApply">
    <div class="content">
      <h4>
        {{ $t('comm.essentialInformation') }}
        <span v-if="applyScreenFlag">({{ applyName }})</span>
        <span
          v-if="editScreenFlag || applyScreenFlag"
          calss="identiferNum"
          style="float: right;font-size: 14px;"
        >
          <span>报价编号：{{ quotationSaveForm.identiferNum }}</span>
        </span>
      </h4>
      <div class>
        <div class="input_box">
          <div class="flex3">
            <div class="title">{{ $t('bud.quo.quotationName') }}</div>
            <div class="input detail-label">{{ quotationSaveForm.quotationName }}</div>
          </div>
          <div class="flex3">
            <div class="title">{{ $t('bud.quo.quotationType') }}</div>
            <div class="input detail-label">
              <dict-write
                v-model="quotationSaveForm.quotationType"
                dict-type-id="QuoType"
                class="input"
              />
            </div>
          </div>
          <div class="flex3">
            <div class="title">{{ $t('bud.quo.email') }}</div>
            <div class="input detail-label">{{ quotationSaveForm.email }}</div>
          </div>

          <div class="flex3">
            <div class="title">{{ $t('bud.quo.customerName') }}</div>
            <div class="input detail-label">{{ quotationSaveForm.accountName }}</div>
          </div>
          <div class="flex3">
            <div class="title">{{ $t('bud.quo.quotationCommitDate') }}</div>
            <div
              class="input detail-label"
            >{{ dateFtt("yyyy-MM-dd", quotationSaveForm.quotationCommitDate) }}</div>
          </div>
          <div class="flex1">
            <div class="title">{{ $t('bud.quo.remarks') }}</div>
            <div class="input detail-label">{{ quotationSaveForm.remark }}</div>
          </div>
        </div>
      </div>

      <h4 v-if="editScreenFlag || applyScreenFlag">{{ $t('bud.quo.otherMessage') }}</h4>

      <div v-if="editScreenFlag || applyScreenFlag" class="input_box">
        <div class="flex2">
          <div class="title">{{ $t('admin.role.createTime') }}</div>
          <div class="input detail-label">{{ quotationSaveForm.createTime }}</div>
        </div>
        <div class="flex2">
          <div class="title">{{ $t('admin.role.createBy') }}</div>
          <div class="input detail-label">{{ quotationSaveForm.createByName }}</div>
        </div>
        <div class="flex2">
          <div class="title">{{ $t('bud.quo.updateTime') }}</div>
          <div class="input detail-label">{{ quotationSaveForm.updateTime }}</div>
        </div>
        <div class="flex2">
          <div class="title">{{ $t('bud.quo.updateBy') }}</div>
          <div class="input detail-label">{{ quotationSaveForm.updateByName }}</div>
        </div>
      </div>
      <task-approve v-if="applyScreenFlag" :task-id="taskId" :process-inst-id="processInstId" />

      <div v-if="editScreenFlag" class="submit">
        <!-- 编辑按钮 -->
        <el-button
          v-if="backto == null"
          type="primary"
          plain
          @click="handleEdit"
        >{{ $t('comm.edit') }}</el-button>
        <!-- 删除按钮 -->
        <el-button
          v-if="backto == null"
          type="danger"
          plain
          @click="handleDelete"
        >{{ $t('comm.delete') }}</el-button>
        <!-- 更新履历按钮 -->

        <!-- 流程履历 todo 审批画面的时候需要表示-->
        <el-button
          v-if="backto == null"
          type="info"
          plain
          @click="handleProcessInstClick"
        >{{ $t('comm.applyHistory') }}</el-button>

        <el-button
          v-if="backto == null"
          type="info"
          plain
          @click="handleUpdateHistoryClick"
        >{{ $t('comm.updateHistory') }}</el-button>

        <!-- 返回按钮 -->
        <el-button type="info" @click="backToWfDemoQuery">{{ $t('bud.quo.return') }}</el-button>
      </div>
    </div>
    <el-dialog
      id="processDialog"
      :title="$t('workflow.detailedProcess') + quotationSaveForm.workflowProcessInstId"
      :visible.sync="dialogWfHistoryVisible"
      width="80%"
    >
      <process-detail
        :key="processInstId"
        :process-inst-id="quotationSaveForm.workflowProcessInstId"
      />
    </el-dialog>
    <el-dialog
      id="updateHistoryDialog"
      :title="$t('comm.updateHistory')"
      :visible.sync="dialogUpdateHistoryVisible"
      class="abow_dialog"
    >
      <update-history :key="funcNo" :func-no="funcNo" />
    </el-dialog>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { findById, apply, deleteDac } from "@/api/bud/wfdemo.js";
import { formValidator } from "@/mixins/form-validator.js";
import DictWrite from "@/components/DictWrite";
import ProcessDetail from "@/components/ProcessDetail";
import TaskApprove from "@/components/TaskApprove";
import UpdateHistory from "@/components/UpdateHistory";
import commonUtil from "@/utils/common.js";
import { getProcessInfo } from "@/api/admin/workflow-api";

export default {
  components: {
    DictWrite,
    ProcessDetail,
    TaskApprove,
    UpdateHistory
  },
  mixins: [formValidator],
  data() {
    return {
      dialogWfHistoryVisible: false,
      dialogUpdateHistoryVisible: false, // 更新履历
      quotationSaveForm: {},
      department: "",
      editScreenFlag: false, // 编辑画面
      applyScreenFlag: false,
      isChange: false,
      isClearable: true, // 可清空（可选）
      isAccordion: true, // 可收起（可选）
      loading: true,
      applyName: "",
      funcNo: ""
    };
  },
  computed: {
    taskId: function() {
      return this.$route.query.taskId;
    },
    processInstId: function() {
      return this.$route.query.processInstId;
    },
    id: function() {
      return this.$route.query.id;
    },
    backto: function() {
      return this.$route.query.backto;
    }
  },
  watch: {},
  created() {},
  async mounted() {
    // 新建和编辑画面是一个画面，所以我们在这看一下初始的id有没有值
    // 有值就是一个编辑画面，没有值就是一个新建画面
    if (this.id == null || this.id === "" || this.id === undefined) {
      return;
    }
    const res = await findById({ id: this.id });
    if (res && res.success) {
      this.quotationSaveForm = res.datas.demowf;

      if (this.taskId == null) {
        this.editScreenFlag = true;
      } else {
        this.applyScreenFlag = true;
      }
      this.funcNo = this.quotationSaveForm.identiferNum;
      if (this.processInstId != null) {
        // 取得task一栏
        const processBeanRes = await getProcessInfo(this.processInstId);
        const processBean = processBeanRes.datas.result;
        this.applyName = processBean.processDefinitionName;
      }
    }
  },
  methods: {
    // 保存处理
    async submit(submitType) {
      // 整体在校验， 需要相关校验的添加在这里
      if (!this.validatorAll()) {
        return false;
      }
      // 设置按钮类型，submitType
      this.quotationSaveForm.submitType = submitType;
      const res = await apply(this.quotationSaveForm);
      if (res) {
        if (res.success) {
          this.$message({
            type: "success",
            iconClass: "iconfont icongantanhao_icon",
            customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
            message: "新建成功!"
          });
          if (submitType === "save") {
            this.$router.push("/workflow/tasks");
          } else {
            this.$router.push("/workflow/runnings");
          }
        }
      }
    },
    backToWfDemoQuery() {
      // 点击返回按钮返回到检索画面
      if (this.backto === "admin") {
        this.$router.push("/admin/wfInst");
      } else if (this.backto === "processlist") {
        this.$router.push("/workflow/runnings");
      } else if (this.applyScreenFlag) {
        this.$router.push("/workflow/tasks");
      } else {
        this.$router.push("/wfdemo/list");
      }
    },
    handleProcessInstClick: function() {
      // 处理点击更新履历按钮
      this.dialogWfHistoryVisible = true;
    },
    handleUpdateHistoryClick: function() {
      this.dialogUpdateHistoryVisible = true;
    },
    handleEdit() {
      // 编辑功能，首先检查是否有编辑权限
      if (!commonUtil.checkRight(this.quotationSaveForm.rightNo, "write")) {
        this.$message({
          type: "warning",
          iconClass: "iconfont icongantanhao_icon",
          customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
          message: this.$t("comm.msg33")
        });
        return;
      }

      // 是否审批中检查
      if (
        this.quotationSaveForm.workflowFlag != null &&
        this.quotationSaveForm.workflowFlag === "1"
      ) {
        this.$message({
          type: "warning",
          iconClass: "iconfont icongantanhao_icon",
          customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
          message: this.$t("workflow.e0007")
        });
        return;
      }
      this.$router.push({
        path: "/wfdemo/apply",
        query: {
          id: this.id
        }
      });
    },
    handleDelete() {
      // 编辑功能，首先检查是否有编辑权限
      if (!commonUtil.checkRight(this.quotationSaveForm.rightNo, "delete")) {
        this.$message({
          type: "warning",
          iconClass: "iconfont icongantanhao_icon",
          customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
          message: this.$t("comm.msg34")
        });
        return;
      }

      // 是否审批中检查
      if (
        this.quotationSaveForm.workflowFlag != null &&
        this.quotationSaveForm.workflowFlag === "1"
      ) {
        this.$message({
          type: "warning",
          iconClass: "iconfont icongantanhao_icon",
          customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
          message: this.$t("workflow.e0006")
        });
        return;
      }

      this.$confirm(this.$t("comm.tip1"), this.$t("comm.tips"), {
        confirmButtonText: this.$t("comm.certain"),
        cancelButtonText: this.$t("comm.cancel"),
        type: "warning",
        iconClass: "iconfont icongantanhao_icon",
        customClass: localStorage.getItem("theme") == "Dark" ? "dark-message-box" : " "
      })
        .then(async () => {
          const res = await deleteDac([this.id]);

          if (res && res.success) {
            this.$message({
              type: "success",
              iconClass: "iconfont icongantanhao_icon",
              customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
              message: "删除成功!"
            });

            this.$router.push("/workflow/runnings"); // 转移到审批中画面
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            iconClass: "iconfont icongantanhao_icon",
            customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
            message: this.$t("comm.msg1")
          });
        });
    },
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
<style lang="scss" scoped>
.addApply {
  width: 100%;
  // height: 100%;
  background-color: #fff;
  box-sizing: border-box;
  padding: 20px 20px 20px 55px;
  padding-bottom: 40px;
  border-radius: 6px;
  overflow: auto;
  h4 {
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    border-bottom: 1px dashed #ccc;
    color: rgb(50, 50, 50);
    // margin-bottom: 20px;
  }
  .content {
    // height: 100%;
    .basic {
      display: flex;
      padding: 10px 0;
      box-sizing: border-box;
      flex-wrap: wrap;
      & > div {
        width: 33.33%;
        display: flex;
        box-sizing: border-box;
        padding: 0 15px 10px 20px;
        align-items: center;
        .title {
          width: 130px;
          font-size: 14px;
        }
        .input {
          flex: 1;
        }
        .text {
          width: 100%;
        }
      }
    }
    h4 {
      height: 35px;
      line-height: 35px;
      font-size: 18px;
      border-bottom: 1px dashed #ccc;
      color: rgb(50, 50, 50);
      margin-bottom: 10px;
      padding: 10px 0;
      position: relative;
      // color: #000;
      .add_row {
        position: absolute;
        right: 0;
        bottom: 10px;
        border-radius: 6px;
        // border: 1px solid #ccc;
        cursor: pointer;
        font-size: 12px;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-image: linear-gradient(rgb(52, 165, 248), rgb(8, 142, 240));
        color: #fff;
        &:hover {
          background-image: linear-gradient(
            rgb(42, 155, 238),
            rgb(8, 142, 240)
          );
        }
      }
    }
    .count {
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      margin: 10px 0;
      margin-bottom: 40px;
      border-bottom: 1px solid #ccc;
    }
    .searchBox {
      box-sizing: border-box;
      padding-right: 30px;
      position: relative;
      // .input {}
      .search {
        position: absolute;
        right: 0;
        top: 50%;
        cursor: pointer;
        color: #ccc;
        transform: translateY(-50%);
      }
    }
    .out {
      display: flex;
      padding: 10px 0;
      box-sizing: border-box;
      flex-wrap: wrap;
      & > div {
        width: 33.33%;
        display: flex;
        box-sizing: border-box;
        padding: 0 15px 10px 20px;
        align-items: center;
        .title {
          width: 130px;
          font-size: 14px;
        }
        .input {
          flex: 1;
        }
        .text {
          width: 50%;
        }
      }
    }
    .in {
      width: 100%;
      // max-width: 1460px;
    }
    .reason {
      .title {
        font-size: 18px;
        line-height: 30px;
        font-weight: 700;
        color: rgb(50, 50, 50);
      }
    }
  }
  .submit {
    height: 56px;
    line-height: 56px;
    //padding-left: 20px;
    padding: 10px 0;
    //text-align: right;
  }
}
.pjshouzhi {
  font-size: 14px;
}
.pjcaigou {
  font-size: 14px;
}
.upload_file {
  .content {
    width: 350px;
    margin: 0 auto;
  }
}
.title1 {
  font-size: 14px;
}
</style>
<style lang="scss">
.addApply {
  .basic {
    .el-select {
      flex: 1;
      box-sizing: border-box;
      .el-input__inner {
        height: 40px;
      }
    }
    .el-date-editor {
      width: 100%;
    }
  }
}
</style>

