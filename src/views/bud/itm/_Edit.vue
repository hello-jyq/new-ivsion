<template>
  <div
    v-if="isLoading"
    :class="theme=='Light'?'no-search-content-box advice-apply-edit adaE-light':'no-search-content-box advice-apply-edit'"
  >
    <!-- <p class="advice-edit-title">
      {{ title }}
    </p>-->
    <div class="table-bg-box marigin-bottom">
      <div class="advice-edit-table-title">
        <span>科目信息</span>
        <span v-if="flag !== '1'" class="advice-edit-title-num">业务编号：{{ item.identiferNum }}</span>
      </div>
      <el-form
        ref="itemInfo"
        :model="item"
        :rules="rules"
        label-width="110px"
        label-position="left"
        class="content-top-form form-big-lable"
      >
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="科目名称" prop="itemName" class="big-input">
              <el-input v-model="item.itemName" clearable>
                <i slot="suffix" class="iconfont iconbuke" />
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="科目编号" prop="itemNum" class="big-input">
              <el-input v-model="item.itemNum" clearable>
                <i slot="suffix" class="iconfont iconbuke" />
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="科目类型" prop="itemType" class="big-input">
              <el-radio-group v-model="item.itemType" :disabled.sync="itemTypeEnable">
                <el-radio label="01">科目组</el-radio>
                <el-radio label="02">科目</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="状态" prop="status" class="big-input">
              <el-radio-group v-model="item.status" :disabled.sync="statusEnable">
                <el-radio label="01">启用</el-radio>
                <el-radio label="02">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="item.itemType !== '01'" type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item
              :label="$t('basedata.parentItemName')"
              prop="parentItemId"
              class="big-input"
            >
              <el-select
                v-model="item.parentItemId"
                name="parentItemName"
                style="width:100%"
                placeholder="请选择"
                :popper-class="theme=='Light' ? 'blueSelect' : ''"
                clearable
              >
                <el-option
                  v-for="itemGroup in itemGroups"
                  :key="itemGroup.id"
                  :value="itemGroup.id"
                  :label="itemGroup.itemName"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form
        ref="itemInfo"
        :model="item"
        :rules="rules"
        label-width="110px"
        label-position="left"
        class="content-top- form-big-lable"
      >
        <el-form-item label="备 注" prop="remark" class="big-input">
          <el-input v-model="item.remark" type="textarea" class="textarea-height" />
        </el-form-item>
      </el-form>
    </div>
    <div v-if="flag !== '1'" class="table-bg-box">
      <div class="advice-edit-table-title">
        <span>其他信息</span>
      </div>
      <el-form
        ref="itemInfo"
        :model="item"
        :rules="rules"
        label-width="110px"
        label-position="left"
        class="content-top-form form-big-lable"
      >
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="创建时间" prop="createTime" class="big-input">
              <el-input v-model="item.createTime" disabled>
                <i slot="suffix" class="iconfont iconbuke" />
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="创建者" prop="createBy" class="big-input">
              <el-input v-model="item.createBy" disabled>
                <i slot="suffix" class="iconfont iconbuke" />
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="最后修改时间" prop="updateTime" class="big-input">
              <el-input v-model="item.updateTime" disabled>
                <i slot="suffix" class="iconfont iconbuke" />
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="最后修改者" prop="updateBy" class="big-input">
              <el-input v-model="item.updateBy" disabled>
                <i slot="suffix" class="iconfont iconbuke" />
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <ul class="operation-box dialog-btn-box">
      <li class="operation-item" @click="handleSave">
        <span class="operation-circle circle-middle-btn btn-light-color bluebg">
          <i class="iconfont iconbaocun" />
        </span>
        <span class="operation-text">保&nbsp;&nbsp;存</span>
      </li>
      <li class="operation-item" @click="onCancel()">
        <span class="operation-circle circle-middle-btn btn-light-color bluebg">
          <i class="iconfont iconquxiao" />
        </span>
        <span class="operation-text">返&nbsp;&nbsp;回</span>
      </li>
    </ul>
  </div>
</template>
<script>
import {
  newItem,
  getItemInfo,
  editItem,
  getItemGroups
} from "@/api/bud/itm/itm-api";
export default {
  components: {},
  data() {
    return {
      theme: localStorage.getItem("theme") !== "Dark" ? "Light" : "",
      isLoading: false,
      title: null,
      isShow: false,
      itemId: "",
      flag: "",
      operationType: "",
      itemTypeEnable: false,
      statusEnable: false,
      item: {},
      form: {},
      itemGroups: [
        {
          itemId: "",
          itemName: ""
        }
      ],
      rules: {
        itemName: [
          { required: true, message: "请输入科目名称", trigger: "blur" },
          { min: 1, max: 100, message: "请输入100个字符以内", trigger: "blur" }
        ],
        itemNum: [
          { min: 1, max: 36, message: "请输入36个字符以内", trigger: "blur" }
        ],
        itemType: [{ required: true }],
        status: [{ required: true }],
        remark: [
          { min: 1, max: 255, message: "请输入255个字符以内", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.itemId = this.$route.params.itemId;
    this.flag = this.$route.params.flag;
    console.log(this.itemId);
    console.log(this.flag);
    // 科目新建
    if (this.flag === "1") {
      console.log("dsf");
      this.operationType = "create";
      this.statusEnable = true;

      console.log(this.statusEnable);

      // this.dialogType = 'create'
      // this.titleType = '新建'item
      // this.identifernumFlag = false
      // this.othermessageFlag = false
      // this.statusEnable = true
      // this.typeEnabale = false
      this.item = {
        itemName: "",
        itemNum: "",
        itemType: "01",
        status: "01",
        parentItemId: "",
        remark: ""
      };
    } else {
      this.operationType = "edit";
      this.itemTypeEnable = true;
      console.log(this.itemTypeEnable);
      this.getItemInfo();
      // this.item = {}
    }
    this.fetchData();
  },
  // mounted() {
  //   this.isLoading = true
  // },
  methods: {
    async fetchData() {
      // 获取所有科目组
      const itemGroupsRes = await getItemGroups();
      const itemGroupsResults = itemGroupsRes.datas.itemGroups;
      this.itemGroups = itemGroupsResults;
      this.isLoading = true;
    },
    async getItemInfo() {
      const itemId = this.itemId;
      const itemInfoRes = await getItemInfo(itemId);
      this.item = itemInfoRes.datas.itemSelectResult;
      // this.isLoading = false
    },
    async handleSave() {
      this.$refs["itemInfo"].validate(async valid => {
        if (valid) {
          if (this.operationType === "create") {
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
                this.$router.push({ path: "/itm/list" });
              }
            }
          } else if (this.operationType === "edit") {
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
                this.$router.push({ path: "/itm/list" });
              }
            }
          }
          // this.onCancel()
          // this.onConfirm()
        }
      });
    },
    onCancel() {
      this.$router.push({ path: "/itm/list" });
    }
  }
};
</script>
<style lang="scss">
.advice-apply-edit {
  .advice-edit-title {
    margin-top: 10px;
    margin-bottom: 20px;
    font-family: "微软雅黑";
    font-size: 22px;
    font-weight: bold;
    color: #ffffff;
  }
  .table-bg-box {
    background: linear-gradient(180deg, #34393f 0%, #22252a 100%);
    .el-form-item {
      margin-bottom: 30px;
    }
    .advice-edit-table {
      margin-bottom: 38px;
    }
  }
  .state-status {
    position: relative;
  }
  .advice-help {
    position: absolute;
    top: 0px;
    right: -20px;
    i {
      font-size: 16px;
    }
  }
  .dialog-btn-box {
    justify-content: flex-start;
    margin-top: 30px;
    margin-bottom: 50px;
  }
  .operation-text span {
    max-width: 300px;
  }
}
</style>
<style lang="scss">
.advice-apply-edit {
  .el-icon-date {
    display: none;
  }
  .col-right {
    padding-right: 110px;
  }
  .el-upload--text {
    width: 120px;
    height: 38px;
    margin-left: -27px;
    background: linear-gradient(180deg, #2f343a 0%, #1e2225 100%);
    box-shadow: -2px -2px 15px 2px rgba(255, 255, 255, 0.2),
      0px 2px 10px 6px rgba(20, 22, 26, 1);
    border-radius: 24px;
    border: 1px solid #1d2226;
    & > div {
      font-size: 14px;
      color: #00e2de;
      .iconshangchuan {
        color: #00e2de;
        margin-right: 4px;
      }
    }
  }
  .el-upload-list {
    display: flex;
    align-items: center;
    padding-left: 30px;
    .el-upload-list__item {
      margin-top: 0 !important;
    }
    .el-icon-document {
      display: none;
    }
    .el-upload-list__item-name {
      margin-right: 10px;
      color: #ffffff;
    }
    .el-upload-list__item-status-label {
      display: none;
    }
    .el-upload-list__item:hover {
      background-color: transparent;
    }
    .el-icon-close {
      display: none;
    }
    .el-upload-list__item.is-success .el-upload-list__item-name:focus,
    .el-upload-list__item.is-success .el-upload-list__item-name:hover {
      color: #ffffff;
    }
  }
}
.advice-info-help {
  width: 100px;
  min-width: auto;
  height: 30px;
  line-height: 30px;
  padding: 0;
  text-align: center;
  font-size: 12px;
  color: #ffffff;
}

.handsontable {
  height: 100%;
}
.handsontable table,
.handsontable tbody,
.handsontable thead,
.handsontable td,
.handsontable th,
.handsontable input,
.handsontable textarea,
.handsontable div {
  box-sizing: border-box;
}
.handsontable .wtSpreader {
  min-width: 100%;
}
.handsontable tr:first-child th {
  height: 50px !important;
  line-height: 50px;
  font-family: "微软雅黑";
  font-size: 16px;
  color: #ffffff;
  background-color: #26272c;
}
.handsontable thead th .relative {
  padding: 0 4px;
}
.ht_clone_top,
.wtHolder,
.htCore {
  width: 100% !important;
  overflow: hidden;
}
.wtHider {
  width: 100% !important;
}

.handsontable tr td:first-child {
  color: #ffffff !important;
}
.handsontable th:last-child {
  border-right: 1px solid #44474e;
  border-bottom: 1px solid #44474e;
}
.handsontable tr td {
  font-family: "微软雅黑";
  font-size: 14px;
  color: #dddddd;
  text-align: center;
  border-right: 1px solid #44474e;
  border-bottom: 1px solid #44474e;
}
.handsontable tr td:hover {
  border: 1px solid #0ab09c !important;
}
.handsontable th {
  border-right-color: #44474e;
  border-bottom-color: #44474e;
}
.handsontable tr:first-child th,
.handsontable tr:first-child td {
  border-top: 1px solid #44474e;
}
.ht_clone_top_left_corner thead tr th:nth-last-child(2) {
  border-right: 0;
}

.ht_master .wtHolder {
  width: 100% !important;
  height: 100% !important;
}
.handsontable thead th.ht__highlight,
.handsontable th:first-child,
.handsontable th:nth-child(2),
.handsontable td:first-of-type,
.handsontable .htNoFrame + th,
.handsontable .htNoFrame + td {
  border-left-color: #44474e;
}

.handsontable tbody th.ht__highlight,
.handsontable th,
.handsontable td,
.handsontable tr {
  background: transparent;
}
.handsontable tbody tr:nth-child(odd) {
  background-color: #34393f;
}
.handsontable tbody tr:nth-child(even) {
  background-color: #26272c;
}
.handsontableInput {
  box-shadow: none;
  white-space: nowrap;
  background: #26272c;
  color: #ffffff;
  margin-top: 2px;
  margin-left: 1px;
  width: calc(49% + 8px) !important;
}
.handsontable td.area:before,
.handsontable td.area-1:before,
.handsontable td.area-2:before,
.handsontable td.area-3:before,
.handsontable td.area-4:before,
.handsontable td.area-5:before,
.handsontable td.area-6:before,
.handsontable td.area-7:before {
  background: transparent;
}
.wtBorder,
.area {
  background-color: transparent !important;
}
</style>
