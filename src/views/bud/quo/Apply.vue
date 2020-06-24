<template>
  <div class="addApply">
    <div class="content">
      <h4>{{ $t('comm.essentialInformation') }}</h4>
      <div class>
        <div class="input_box">
          <div class="flex3">
            <div class="title must">{{ $t('bud.quo.quotationName') }}</div>
            <div class="input">
              <el-input
                v-model="quotationSaveForm.quotationName"
                class="input"
                placeholder
                @blur="validator('addQuotationName')"
              />
              <span
                ref="addQuotationName"
                data-roles="required,lengthCheck[0:30]"
                :data-value="quotationSaveForm.quotationName"
                class="message"
              />
            </div>
          </div>
          <div class="flex3">
            <div class="title">{{ $t('bud.quo.quotationType') }}</div>
            <div class="input">
              <dict-select
                v-model="quotationSaveForm.quotationType"
                dict-type-id="QuoType"
                class="input"
              />
            </div>
          </div>
          <div class="flex3">
            <div class="title must">{{ $t('bud.quo.email') }}</div>
            <div class="input">
              <el-input
                v-model="quotationSaveForm.pipelineId"
                class="input"
                placeholder
                @blur="validator('addPipelineId')"
              />
              <span
                ref="addPipelineId"
                data-roles="required,email"
                :data-value="quotationSaveForm.pipelineId"
                class="message"
              />
            </div>
          </div>
          <div class="flex3">
            <div class="title">{{ $t('bud.quo.businessDepartment') }}</div>
            <div class="input">
              <el-input v-model="quotationSaveForm.orgLevel1" class="input" placeholder />
            </div>
          </div>
          <div class="flex3">
            <div class="title">{{ $t('bud.quo.department') }}</div>
            <div class="input">
              <pm-org-select v-model="quotationSaveForm.orgLevel2" class="input" placeholder />
            </div>
          </div>
          <div class="flex3">
            <div class="title">{{ $t('bud.quo.pmUser') }}</div>
            <div class="input">
              <el-input v-model="pmNode.name" class="input">
                <i
                  slot="suffix"
                  class="iconfont icon-zuzhijiagou"
                  @click.stop="openSelect('pmNode')"
                />
              </el-input>
              <!-- <span ref="agentFrom" data-roles="required" :data-value="assignee.name" class="message" /> -->
              <!-- <tissue-tree tree-type="department" @select="selectP" /> -->
            </div>
            <!-- ID为：{{ valueId }} -->
          </div>
          <div class="flex3">
            <div class="title">{{ $t('bud.quo.contiAmount') }}</div>
            <div class="input">
              <money-input
                v-model="quotationSaveForm.contiAmount"
                @blur="validator('addContiAmount')"
              />
              <span
                ref="addContiAmount"
                data-roles="moneyWith2Decimal[10:2]"
                :data-value="quotationSaveForm.contiAmount"
                class="message"
              />
            </div>
          </div>
          <div class="flex3">
            <div class="title">{{ $t('bud.quo.customerName') }}</div>
            <div class="input">
              <el-input v-model="quotationSaveForm.accountId" class="input" placeholder />
            </div>
          </div>
          <div class="flex3">
            <div class="title">{{ $t('bud.quo.creditRank') }}</div>
            <div class="input">
              <el-input v-model="quotationSaveForm.creditRank" class="input" placeholder />
            </div>
          </div>
          <div class="flex3">
            <div class="title">{{ $t('bud.quo.quotationCommitDate') }}</div>
            <div class="input">
              <el-date-picker
                v-model="quotationSaveForm.quotationCommitDate"
                align="right"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                class="input"
              />
            </div>
          </div>
          <div class="flex3">
            <div class="title">{{ $t('bud.quo.transactionsType') }}</div>
            <div class="input">
              <dict-select
                v-model="quotationSaveForm.transactionsType"
                dict-type-id="TranType"
                class="input"
              />
              <span
                ref="addTranType"
                data-roles="required"
                :data-value="quotationSaveForm.transactionsType"
                class="message"
              />
            </div>
          </div>
          <div class="flex3">
            <div class="title">{{ $t('bud.quo.purchaseConfirm') }}</div>
            <div class="input">
              <el-radio-group v-model="quotationSaveForm.purchaseConfirmFlag">
                <el-radio :label="1">{{ $t('bud.quo.needConfirm') }}</el-radio>
                <el-radio :label="0">{{ $t('bud.quo.notConfirm') }}</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="flex1">
            <div class="title">{{ $t('bud.quo.importantOptional') }}</div>
            <div class="input">
              <!-- <el-checkbox-group v-model="checkList">
                <el-checkbox label="quotationSaveForm.newAccountFlag">
                  {{ $t('bud.quo.newAccountFlag') }}
                </el-checkbox>
                <el-checkbox label="quotationSaveForm.appointmentTradeFla" />
                <el-checkbox label="quotationSaveForm.stockTradeFlag" />
              </el-checkbox-group>-->
              <el-checkbox
                v-model="quotationSaveForm.newAccountFlag"
              >{{ $t('bud.quo.newAccountFlag') }}</el-checkbox>
              <el-checkbox
                v-model="quotationSaveForm.appointmentTradeFlag"
              >{{ $t('bud.quo.appointmentTradeFlag') }}</el-checkbox>
              <el-checkbox
                v-model="quotationSaveForm.stockTradeFlag"
              >{{ $t('bud.quo.stockTradeFlag') }}</el-checkbox>
            </div>
          </div>

          <div class="flex1">
            <div class="title">{{ $t('bud.quo.caseOutline') }}</div>
            <div class="input">
              <el-input
                v-model="quotationSaveForm.caseOutline"
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 5}"
              />
            </div>
          </div>
        </div>
      </div>
      <h4>{{ $t('bud.quo.payPlan') }}</h4>
      <div class="out">
        <div>
          <div class="title">{{ $t('bud.quo.aggregatePeriod') }}</div>
          <el-date-picker
            v-model="value1"
            type="monthrange"
            unlink-panels
            range-separator="至"
            start-placeholder="2020-01"
            end-placeholder="2020-12"
            disabled
          />
        </div>
        <div>
          <el-button type="primary" @click="payPlan=!payPlan">{{ $t('bud.quo.monthsDetail') }}</el-button>
        </div>
      </div>
      <div v-show="payPlan" class="handsontable">
        <hot-table ref="textHot" :settings="hotSettings" class="table_info" style="height: 80px" />
      </div>
      <h4>{{ $t('bud.advice.UploadAttachments') }}</h4>
      <div>
        <el-button
          type="success"
          class="el-icon-upload2"
          @click="uploadDialog = true"
        >{{ $t('comm.upload') }}</el-button>
      </div>
      <template>
        <a class="link" @click.prevent="handleDownload(systemFileName)">{{ uploadFileName }}</a>
      </template>
      <h4>{{ $t('bud.quo.otherMessage') }}</h4>
      <div class="title1">{{ $t('bud.quo.remarks') }}</div>
      <div class="input">
        <el-input
          v-model="quotationSaveForm.remark"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 5}"
          placeholder="请输入内容"
        />
      </div>
      <div class="submit">
        <el-button type="primary" @click="submit">{{ $t('comm.save') }}</el-button>
        <el-button type="success">{{ $t('comm.submit') }}</el-button>
        <el-button type="info" @click="backToQuotationQuery">{{ $t('bud.quo.return') }}</el-button>
      </div>
    </div>
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
          action="/api/bud/upload"
          :multiple="false"
          :on-success="handleUploadSuccess"
          :on-error="handleUploadError"
          @finish="uploadDialog=false"
        />
      </div>
    </el-dialog>
    <el-dialog
      :title="$t('admin.wfProxy.selectUser')"
      :visible.sync="selectUserDialog"
      append-to-body
      class="selectDialog"
      width="25%"
    >
      <div class="select_box">
        <tissue-tree :tree-type="treeType" @select="selectNode" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="selectUserDialog = false">{{ $t('comm.cancel') }}</el-button>
        <el-button type="primary" @click="addNode">{{ $t('comm.certain') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { HotTable } from "@handsontable/vue";
import "@/../node_modules/handsontable/dist/handsontable.full.css";
// eslint-disable-next-line no-unused-vars
import Handsontable from "handsontable";
import { saveQuoInfo, downloadFile } from "@/api/bud/bud.js";
import Upload from "@/components/Upload";
import { formValidator } from "@/mixins/form-validator.js";
import DictSelect from "@/components/DictSelect";
import TissueTree from "@/components/TissueTree.vue";
import MoneyInput from "@/components/MoneyInput.vue";
import PmOrgSelect from "@/components/PmOrgSelect.vue";
import { mapGetters } from "vuex";
const monthList = [
  "value01",
  "value02",
  "value03",
  "value04",
  "value05",
  "value06",
  "value07",
  "value08",
  "value09",
  "value10",
  "value11",
  "value12"
];
export default {
  components: {
    HotTable,
    Upload,
    DictSelect,
    TissueTree,
    MoneyInput,
    PmOrgSelect
  },
  mixins: [formValidator],
  data() {
    return {
      uploadAttchmentDialog: false,
      count: "",
      year: "",
      changeReason: "",
      value1: "",
      payPlan: false,
      quotationSaveForm: {
        payPlanSaveForm: []
      },
      pmNode: {
        name: "",
        id: ""
      },
      uploadDialog: false,
      isClearable: true, // 可清空（可选）
      isAccordion: true, // 可收起（可选）
      uploadFileName: "",
      systemFileName: "",
      treeType: "personnel",
      selectData: "",
      selectUserDialog: false,
      activeInput: "",
      props: {
        // 配置项（必选）
        value: "id",
        label: "name",
        children: "children"
        // disabled:true
      },
      hotSettings: {
        data: [{ vateRate: "6" }], // 数据在这个里面,由数据填充表
        colWidths: [50, 90, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70], // 单元格宽
        manualColumnResize: true,
        manualRowResize: true,
        autoRowSize: false,
        rowHeights: 35, // 单元格高
        startRows: 1, // 初始行列数
        startCols: 14,
        minRows: 1, // 最小行列
        minCols: 2,
        // rowHeaders: true, // 行表头
        colHeaders: [
          "增值税",
          "2020年度计上",
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月"
        ],
        minSpareCols: 0, // 列留白
        minSpareRows: 0, // 行留白
        // className: 'htCenter',
        // currentRowClassName: 'currentRow', // 为选中行添加类名，可以更改样式
        // currentColClassName: 'currentCol', // 为选中列添加类名
        autoWrapRow: true, // 自动换行
        // 右键效果
        fillHandle: false, // 选中拖拽复制 possible values: true, false, "horizontal", "vertical"
        fixedColumnsLeft: 2, // 固定左边列数
        fixedRowsTop: 0, // 固定上边行数
        columns: [
          // 添加每一列的数据类型和一些配置
          // { data: "subordindateUnit" }, // data后面跟的这个字段是上传对应的字段
          {
            data: "vateRate", // 税率,
            type: "text",
            className: "htMiddle htCenter notread"
            // validator: payTableInputCheck
            // renderer: grayBackgroundColorTextNumberRenderer
          },
          {
            data: "payAmount", // 年合计
            type: "numeric",
            className: "htMiddle htCenter"
          },
          {
            data: "value01", // 一月
            type: "numeric",
            className: "htMiddle htCenter"
          },
          {
            data: "value02", // 二月
            type: "numeric",
            className: "htMiddle htCenter"
          },
          {
            data: "value03", // 三月
            type: "numeric",
            className: "htMiddle htCenter"
          },
          {
            data: "value04", // 四月
            type: "numeric",
            className: "htMiddle htCenter"
          },
          {
            data: "value05", // 五月
            type: "numeric",
            className: "htMiddle htCenter"
          },
          {
            data: "value06", // 六月
            type: "numeric",
            className: "htMiddle htCenter"
          },
          {
            data: "value07", // 七月
            type: "numeric",
            className: "htMiddle htCenter"
          },
          {
            data: "value08", // 八月
            type: "numeric",
            className: "htMiddle htCenter"
          },
          {
            data: "value09", // 九月
            type: "numeric",
            className: "htMiddle htCenter"
          },
          {
            data: "value10", // 十月
            type: "numeric",
            className: "htMiddle htCenter"
          },
          {
            data: "value11", // 十一月
            type: "numeric",
            className: "htMiddle htCenter"
          },
          {
            data: "value12", // 十二月
            type: "numeric",
            className: "htMiddle htCenter"
          }
        ],
        // @params: changes, source
        afterChange: function(changes) {
          // console.log(this.getData())
          // console.log(this.getSourceData())
          if (changes) {
            // let total = 0
            changes.forEach(([row, prop, oldValue, newValue]) => {
              // 监听到数值的变化，计算总数
              if (row === 0) {
                if (oldValue === newValue) {
                  return false;
                }
                if (!monthList.find(item => item === prop)) {
                  return false;
                }
                // 计算年合计
                const count = getCount(this.getDataAtRow(row).slice(2));
                // 设置年合计
                // console.log(count)
                this.setDataAtRowProp(row, "payAmount", round(count));
              }
            });
          }
          // 保留5位小数 v：number
          function round(v) {
            return Math.floor(v * 10000) / 10000 || null;
          }
          // 计算数组当中为数字的和
          function getCount(list) {
            let count = 0;
            list.forEach(item => {
              if (item && typeof item === "number") {
                count += item;
              }
            });
            return count || null;
          }
        }
      }
    };
  },
  computed: {
    ...mapGetters(["isCollapse"])
  },
  watch: {
    isCollapse() {
      // console.log(this.$refs.textHot.hotInstance)
      setTimeout(() => {
        this.$refs.textHot.hotInstance.render();
      }, 210);
    }
  },
  async mounted() {
    if (!this.budControlidId) {
      return;
    }
  },
  methods: {
    async submit() {
      if (!this.validatorAll()) {
        return false;
      }
      const check = this.submitCheck();
      if (!check) {
        return false;
      }
      const hot = this.$refs.textHot;
      console.log(hot);
      console.log(hot.hotInstance.getSourceData());
      const handsonTableList = hot.hotInstance.getSourceData().map(item => {
        console.log(item);
        return item;
      });
      this.quotationSaveForm.payPlanSaveForm = handsonTableList;
      this.quotationSaveForm.pmUser = this.pmNode.id;
      const res = await saveQuoInfo(this.quotationSaveForm);
      if (res) {
        if (res.success) {
          this.$message({
            type: "success",
            iconClass: "iconfont icongantanhao_icon",
            customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
            message: "新建成功!"
          });
          this.$router.push("/quotation/list");
        } else {
          let message = res.message;
          if (res.messages != null) {
            res.messages.forEach(item => {
              const filedName = this.$t(item.arguments.id) + ":";
              message =
                message + filedName + this.$t(item.message, item.arguments);
            });
          }

          this.$notify.error({
            title: "错误",
            message: message
          });
        }
      }
    },
    handleDelete(table, row, index) {
      // console.log(index)
      this.$confirm("您将要删除该条数据,是否继续?", this.$t("comm.tips"), {
        confirmButtonText: this.$t("comm.certain"),
        cancelButtonText: this.$t("comm.cancel"),
        type: "warning",
        iconClass: "iconfont icongantanhao_icon",
        customClass: localStorage.getItem("theme") == "Dark" ? "dark-message-box" : " "
      })
        .then(() => {
          this[table].splice(index, 1);
          this.$message({
            type: "success",
            iconClass: "iconfont icongantanhao_icon",
            customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            iconClass: "iconfont icongantanhao_icon",
            customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
            message: "已取消删除"
          });
        });
    },
    __resetTable() {
      this.outTableData = [];
      this.inTableData = [];
    },
    backToQuotationQuery() {
      this.$router.push("/quotation/list");
    },
    // 取值
    getValue(value) {
      this.valueId = value;
      console.log(this.valueId);
    },
    handleUploadSuccess(res, file, fileList) {
      if (res) {
        this.uploadFileName = res.datas.fileName;
        this.systemFileName = res.datas.systemFileName;
      }
      console.log(res);
      console.log(file);
      console.log(fileList);
    },
    handleUploadError(res, file, fileList) {
      console.log(res);
      console.log(file);
      console.log(fileList);
    },
    handleDownload(systemFileName) {
      downloadFile({ sysFileName: systemFileName });
    },
    // 提交前校验
    submitCheck() {
      // const list = [1,7,9,10,11,12,13,14,15,16,17,18,19,20]
      const list = [0, 7];
      let flag = true;
      let message = "";
      for (var i = 0; i < 23; i++) {
        if (list.find(item => item === i)) {
          this.$refs.textHot.hotInstance
            .getDataAtCol(i)
            .forEach((item, index) => {
              if (!item && index % 3 === 0) {
                flag = false;
                message = `${this.hotSettings.colHeaders[i]}不能为空`;
                return false;
              }
            });
        }
        if (!flag) {
          // console.log(message)
          this.$message({
            type: "error",
            iconClass: "iconfont icongantanhao_icon",
            customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
            message
          });
          return false;
        }
      }
      return flag;
    },
    addNode() {
      const data = this.selectData;
      if (data.id === "_1") {
        this.$message({
          type: "error",
          iconClass: "iconfont icongantanhao_icon",
          customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
          message: this.$t("comm.msg4")
        });
        return false;
      }
      if (this.treeType === "personnel") {
        // 只要人员，排除部门
        if (data.type !== "user") {
          this.$message({
            type: "error",
            iconClass: "iconfont icongantanhao_icon",
            customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
            message: this.$t("comm.msg4")
          });
          return false;
        }
      }
      const id = data.id;
      const name = data.text || data.name;
      // this.quotationSaveForm.pmUser.name = name
      // this.quotationSaveForm.pmUser.id = id
      this[this.activeInput].name = name;
      this[this.activeInput].id = id;
      this.selectUserDialog = false;
    },
    selectNode(data) {
      this.selectData = data;
    },
    openSelect(activeInput) {
      this.activeInput = activeInput;
      this.selectUserDialog = true;
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
    // padding-right: 20px;
    padding: 10px 0;
    text-align: right;
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
.iconfont {
  cursor: pointer;
  // line-height: 40px;
  color: skyblue;
}
</style>

