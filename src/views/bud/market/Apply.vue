<!--
    新建，编辑的共同画面
    -  list画面 新建按钮   无任何参数
        不表示其他信息，流程详细按钮

    - list画面 编辑按钮   id参数
        显示其他信息，不显示流程详细

    - 审批待处理画面， 处理按钮  id参数，processId，taskId

-->
<template>
  <div class="addApply">
    <div class="content">
      <h4>
        {{ $t('comm.essentialInformation') }} <span v-if="applyScreenFlag">({{ applyName }})</span>
        <span v-if="editScreenFlag || applyScreenFlag" calss="identiferNum" style="float: right;font-size: 14px;"><span>报价编号：{{ quotationSaveForm.identiferNum }}</span></span>
      </h4>
      <div class="">
        <div class="input_box">
          <div class="flex3">
            <div class="title must">
              {{ $t('bud.quo.quotationName') }}
            </div>
            <div class="input">
              <el-input
                v-model="quotationSaveForm.quotationName"
                class="input"
                placeholder=""
                :disabled="deleteApplyFlag"
                @blur="validator('addQuotationName')"
              />
              <span ref="addQuotationName" data-roles="required,lengthCheck[0:30]" :data-value="quotationSaveForm.quotationName" class="message" />
            </div>
          </div>
          <div class="flex3">
            <div class="title">
              {{ $t('bud.quo.quotationType') }}
            </div>
            <div class="input">
              <dict-select v-model="quotationSaveForm.quotationType" :disabled="deleteApplyFlag" dict-type-id="QuoType" class="input" />
            </div>
          </div>
          <div class="flex3">
            <div class="title must">
              {{ $t('bud.quo.email') }}
            </div>
            <div class="input">
              <el-input
                v-model="quotationSaveForm.email"
                class="input"
                placeholder=""
                :disabled="deleteApplyFlag"
                @blur="validator('addEmail')"
              />
              <span ref="addEmail" data-roles="required,email" :data-value="quotationSaveForm.email" class="message" />
            </div>
          </div>

          <div class="flex3">
            <div class="title">
              {{ $t('bud.quo.customerName') }}
            </div>
            <div class="input">
              <el-input
                v-model="quotationSaveForm.accountName"
                class="input"
                :disabled="deleteApplyFlag"
                placeholder=""
              />
            </div>
          </div>
          <div class="flex3">
            <div class="title">
              {{ $t('bud.quo.quotationCommitDate') }}
            </div>
            <div class="input">
              <el-date-picker
                v-model="quotationSaveForm.quotationCommitDate"
                align="right"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                class="input"
                :disabled="deleteApplyFlag"
              />
            </div>
          </div>
          <div class="flex1">
            <div class="title">
              {{ $t('bud.quo.remarks') }}
            </div>
            <div class="input">
              <el-input
                v-model="quotationSaveForm.remark"
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 5}"
                :disabled="deleteApplyFlag"
              />
            </div>
          </div>
        </div>
      </div>

      <h4 v-if="editScreenFlag || applyScreenFlag">
        {{ $t('bud.quo.otherMessage') }}
      </h4>

      <div v-if="editScreenFlag || applyScreenFlag" class="input_box">
        <div class="flex2">
          <div class="title">
            {{ $t('admin.role.createTime') }}
          </div>
          <div class="input detail-label">
            {{ quotationSaveForm.createTime }}
          </div>
        </div>
        <div class="flex2">
          <div class="title">
            {{ $t('admin.role.createBy') }}
          </div>
          <div class="input detail-label">
            {{ quotationSaveForm.createByName }}
          </div>
        </div>
        <div class="flex2">
          <div class="title">
            {{ $t('bud.quo.updateTime') }}
          </div>
          <div class="input detail-label">
            {{ quotationSaveForm.updateTime }}
          </div>
        </div>
        <div class="flex2">
          <div class="title">
            {{ $t('bud.quo.updateBy') }}
          </div>
          <div class="input detail-label">
            {{ quotationSaveForm.updateByName }}
          </div>
        </div>
      </div>
      <div class="submit">
        <!-- 暂存按钮 -->
        <el-button v-if="!deleteApplyFlag" type="primary" plain @click="submit('save')">
          {{ $t('comm.saveTmp') }}
        </el-button>
        <!-- 提交按钮 -->
        <el-button type="success" plain @click="submit('submit')">
          {{ $t('comm.submit') }}
        </el-button>
        <!-- 审批取消按钮 todo 审批画面的时候需要表示-->
        <el-button v-if="applyScreenFlag" type="danger" plain @click="submit('cancel')">
          <span v-if="newApplyDataFlag">{{ $t('comm.delete') }}</span>
          <span v-if="newApplyDataFlag == false">{{ $t('comm.applyCancel') }}</span>
        </el-button>

        <!-- 流程履历 todo 审批画面的时候需要表示-->
        <el-button v-if="applyScreenFlag" type="info" plain @click="handleProcessInstClick">
          {{ $t('comm.applyHistory') }}
        </el-button>

        <!-- 返回按钮 -->
        <el-button type="info" @click="backToWfDemoQuery">
          {{ $t('bud.quo.return') }}
        </el-button>
      </div>
    </div>
    <el-dialog id="processDialog" :title="$t('workflow.detailedProcess') + processInstId" :visible.sync="dialogWfHistoryVisible" width="80%">
      <process-detail :key="processInstId" :process-inst-id="processInstId" />
    </el-dialog>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { findById, apply, applycancel, deleteReApply } from '@/api/bud/wfdemo.js'
import { formValidator } from '@/mixins/form-validator.js'
import DictSelect from '@/components/DictSelect'
import ProcessDetail from '@/components/ProcessDetail'
import { getProcessInfo } from '@/api/admin/workflow-api'
// import Attachement from '@/components/Attachement.vue'

export default {
  components: {
    DictSelect,
    ProcessDetail
  },
  mixins: [formValidator],
  data() {
    return {
      dialogWfHistoryVisible: false, // 审批履历表示的e-dialog
      quotationSaveForm: {},
      department: '',
      editScreenFlag: false, // 编辑画面
      applyScreenFlag: false, // 审批的画面的标志
      // 新规申请还是编辑的申请，画面上的审批取消按钮的表示会有不同。
      //  新规申请的时候【删除】，编辑申请的时候，审批取消。
      newApplyDataFlag: false,
      deleteApplyFlag: false,
      isChange: false,
      isClearable: true, // 可清空（可选）
      isAccordion: true, // 可收起（可选）
      loading: true,
      applyName: ''
    }
  },
  computed: {
    taskId: function() { return this.$route.query.taskId },
    processInstId: function() { return this.$route.query.processInstId },
    id: function() { return this.$route.query.id }
  },
  watch: {
  },
  created() {

  },
  async mounted() {
    // 新建和编辑画面是一个画面，所以我们在这看一下初始的id有没有值
    // 有值就是一个编辑画面，没有值就是一个新建画面
    if (this.id == null || this.id === '' || this.id === undefined) {
      return
    }
    const res = await findById({ id: this.id })
    if (res && res.success) {
      this.quotationSaveForm = res.datas.demowf

      // 判断是否是审批的数据。
      if (this.taskId == null) {
        this.editScreenFlag = true
        this.newApplyDataFlag = false
      } else {
        this.applyScreenFlag = true
        if (this.quotationSaveForm.identiferNum.indexOf('T') === 0) {
          this.newApplyDataFlag = true
        } else {
          this.newApplyDataFlag = false
        }

        // 取得task一栏
        const processBeanRes = await getProcessInfo(this.processInstId)
        const processBean = processBeanRes.datas.result
        this.applyName = processBean.processDefinitionName
        if (processBean.processDefinitionId.indexOf('Delete') > -1) {
          this.deleteApplyFlag = true
        }
      }
    }
  },
  methods: {
    // 保存处理
    async submit(submitType) {
      // 整体在校验， 需要相关校验的添加在这里
      if (!this.validatorAll()) {
        return false
      }

      // 提示信息的message
      let tipMsg = ''
      if (submitType === 'cancel') {
        tipMsg = this.$t('comm.tip19')
      } else if (submitType === 'save') {
        tipMsg = this.$t('comm.tip17')
      } else {
        tipMsg = this.$t('comm.tip18')
      }

      // 确认时候需要操作。
      this.$confirm(tipMsg, this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        // 设置按钮类型，submitType
        this.quotationSaveForm.submitType = submitType
        this.quotationSaveForm.taskId = this.taskId
        this.quotationSaveForm.workflowProcessInstId = this.processInstId
        let res = null

        // 暂存，提交，审批取消按钮的共通动作
        //  - 如果是审批取消，submittype: cancel
        if (submitType === 'cancel') {
          res = await applycancel(this.quotationSaveForm)
        //  - 删除审批被驳回后再提交，用新的api，不用检查form信息
        } else if (this.deleteApplyFlag) { // y
          res = await deleteReApply(this.quotationSaveForm)
        } else {
          res = await apply(this.quotationSaveForm)
        }

        // 检查结果
        if (res) {
          // 成功的时候
          if (res.success) {
            this.$message({
              type: 'success',
              message: this.$t('comm.success')
            })
            if (submitType === 'cancel') {
              this.$router.push('/wfdemo/list')
            } else if (submitType === 'save') {
              this.$router.push('/workflow/tasks')
            } else {
              this.$router.push('/workflow/runnings')
            }
          }
        }
      // 发生系统错误的时候
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('home.msg5')
        })
      })
    },
    backToWfDemoQuery() {
      // 点击返回按钮返回到检索画面
      if (this.applyScreenFlag) {
        this.$router.push('/workflow/tasks')
      } else {
        this.$router.push('/wfdemo/list')
      }
    },
    handleProcessInstClick: function() {
      // 处理点击更新履历按钮
      this.dialogWfHistoryVisible = true
    }
  }
}
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
        &>div {
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
            background-image: linear-gradient(rgb(42, 155, 238), rgb(8, 142, 240));
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
        &>div {
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
      // padding-right: 20px;
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

