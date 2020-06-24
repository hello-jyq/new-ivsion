<template>
  <div class="change">
    <h4>{{ $t('comm.essentialInformation') }}</h4>
    <div class="content">
      <div class="basic">
        <div>
          <div class="title">公司</div>
          <el-input class="input" placeholder="大金空调（上海）有限公司" :disabled="true" />
        </div>
        <div>
          <div class="title">当前登入部门</div>
          <el-select v-model="department" placeholder="请选择">
            <el-option v-for="item in departmentList" :key="item" :value="item" />
          </el-select>
        </div>
        <div>
          <div class="title">预实年度</div>
          <el-date-picker v-model="year" type="year" placeholder="选择年" />
        </div>
        <div>
          <div class="title">预算调整申请编号</div>
          <el-input class="input" placeholder="企划部" :disabled="true" />
        </div>
        <div>
          <div class="title">经费类别</div>
          <div class="input">
            <el-radio v-model="count" label="1">一般经费</el-radio>
            <el-radio v-model="count" label="2">项目</el-radio>
          </div>
        </div>
      </div>
      <div class="out">
        <h4>
          调出（单位：元）
          <div class="add_row iconfont icon-jia" @click.stop="addTableRows('outTableData')">新增一行</div>
        </h4>
        <div class="table">
          <el-table :data="outTableData" border height="200" style="width: 100%">
            <el-table-column
              :label="$t('comm.operation')"
              width="65"
              :style="{textAlign: 'center'}"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  icon="el-icon-delete"
                  type="danger"
                  @click="handleDelete('outTableData', scope.row, scope.$index)"
                />
              </template>
            </el-table-column>
            <!-- <el-table-column
              prop="department"
              label="预算部门">
            </el-table-column>-->
            <el-table-column label="预算部门" width="180">
              <template slot-scope="scope">
                <div class="box">
                  <div v-if="department === '企划部'" class="searchBox">
                    <el-input v-model="scope.row.department" placeholder="请输入预算部门" class="input" />
                    <i
                      title="点击检索"
                      class="iconfont icon-search search"
                      @click="searchDepartment('outTableData', scope.$index)"
                    />
                  </div>
                  <div v-else class="selectBox">
                    <el-select v-model="scope.row.department" placeholder="请选择">
                      <el-option v-for="item in departmentInfoList" :key="item" :value="item" />
                    </el-select>
                  </div>
                </div>
              </template>
            </el-table-column>
            <!-- <el-table-column
              prop="project"
              label="项目">
            </el-table-column>-->
            <el-table-column label="项目" width="180">
              <template slot-scope="scope">
                <div class="searchBox">
                  <el-input v-model="scope.row.project" placeholder="请输入项目" class="input" />
                  <i title="点击检索" class="iconfont icon-search search" />
                </div>
              </template>
            </el-table-column>
            <!-- <el-table-column
              prop="number"
              label="预算编号">
            </el-table-column>-->
            <el-table-column label="预算编号" width="160">
              <template slot-scope="scope">
                <el-input v-model="scope.row.number" placeholder="请输入预算编号" />
              </template>
            </el-table-column>
            <el-table-column prop="type" label="受益机种" />
            <el-table-column prop="subject" label="科目" />
            <el-table-column prop="subjectName" label="科目名称" />
            <el-table-column prop="distinguish" label="区分" />
            <!-- <el-table-column
              prop="month"
              label="预算月">
            </el-table-column>-->
            <el-table-column label="预算月" width="160">
              <template slot-scope="scope">
                <el-input v-model="scope.row.month" placeholder="请输入预算月" />
              </template>
            </el-table-column>
            <el-table-column prop="period" label="管控期间" />
            <el-table-column prop="amount" label="预算金额" />
            <!-- <el-table-column label="预算金额">
              <template slot-scope="scope">
                <el-input v-model="scope.row.number" placeholder="请输入预算编号"></el-input>
              </template>
            </el-table-column>-->
            <el-table-column prop="availableAmount" label="可用金额" />
          </el-table>
        </div>
        <div class="count">调出金额合计：</div>
      </div>
      <div class="in">
        <h4>
          调入（单位：元）
          <div class="add_row iconfont icon-jia" @click.stop="addTableRows('inTableData')">新增一行</div>
        </h4>
        <div class="table">
          <el-table :data="inTableData" border height="200" style="width: 100%">
            <!-- <el-table-column
              prop="department"
              label="预算部门">
            </el-table-column>-->
            <el-table-column
              :label="$t('comm.operation')"
              width="65"
              :style="{textAlign: 'center'}"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  icon="el-icon-delete"
                  type="danger"
                  @click="handleDelete('inTableData', scope.row, scope.$index)"
                />
              </template>
            </el-table-column>
            <el-table-column label="预算部门" width="180">
              <template slot-scope="scope">
                <div class="box">
                  <div v-if="department === '企划部'" class="searchBox">
                    <el-input v-model="scope.row.department" placeholder="请输入预算部门" class="input" />
                    <i
                      title="点击检索"
                      class="iconfont icon-search search"
                      @click="searchDepartment('inTableData', scope.$index)"
                    />
                  </div>
                  <div v-else class="selectBox">
                    <el-select v-model="scope.row.department" placeholder="请选择">
                      <el-option v-for="item in departmentInfoList" :key="item" :value="item" />
                    </el-select>
                  </div>
                </div>
              </template>
            </el-table-column>
            <!-- <el-table-column
              prop="project"
              label="项目">
            </el-table-column>-->
            <el-table-column label="项目" width="180">
              <template slot-scope="scope">
                <div class="searchBox">
                  <el-input v-model="scope.row.project" placeholder="请输入项目" class="input" />
                  <i title="点击检索" class="iconfont icon-search search" />
                </div>
              </template>
            </el-table-column>
            <!-- <el-table-column
              prop="number"
              label="预算编号">
            </el-table-column>-->
            <el-table-column label="预算编号" width="160">
              <template slot-scope="scope">
                <el-input v-model="scope.row.number" placeholder="请输入预算编号" />
              </template>
            </el-table-column>
            <el-table-column prop="type" label="受益机种" />
            <el-table-column prop="subject" label="科目" />
            <el-table-column prop="subjectName" label="科目名称" />
            <el-table-column prop="distinguish" label="区分" />
            <!-- <el-table-column
              prop="month"
              label="预算月">
            </el-table-column>-->
            <el-table-column label="预算月" width="160">
              <template slot-scope="scope">
                <el-input v-model="scope.row.month" placeholder="请输入预算月" />
              </template>
            </el-table-column>
            <el-table-column prop="period" label="管控期间" />
            <el-table-column prop="amount" label="预算金额" />
            <!-- <el-table-column label="预算金额">
              <template slot-scope="scope">
                <el-input v-model="scope.row.number" placeholder="请输入预算编号"></el-input>
              </template>
            </el-table-column>-->
            <el-table-column prop="availableAmount" label="可用金额" />
          </el-table>
        </div>
        <div class="count">调入金额合计：</div>
      </div>
      <div class="reason">
        <div class="title">调整理由：</div>
        <div class="text">
          <el-input
            v-model="changeReason"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 5}"
            placeholder="请输入内容"
          />
        </div>
      </div>
      <div class="submit">
        <el-button type="primary">提交申请</el-button>
      </div>
    </div>
    <department-dialog
      :ids="ids"
      :is-show="departmentDialogShow"
      @change="setDepartment"
      @close="close"
    />
  </div>
</template>
<script>
import DepartmentDialog from "@/components/DepartmentDialog.vue";
export default {
  components: {
    DepartmentDialog
  },
  data() {
    return {
      departmentList: ["企划部", "财务部"],
      department: "企划部",
      isChange: false,
      departmentInfoList: ["财务一课", "财务二课"],
      ids: {
        index: 0,
        tableName: ""
      },
      departmentDialogShow: false,
      count: "",
      year: "",
      changeReason: "",
      outTableData: [
        // {
        //   id: new Date().getTime() + Math.floor(Math.random() * 10),
        //   department: '',
        //   project: '',
        //   number: '',
        //   type: '机种',
        //   subject: '科目',
        //   subjectName: '科目名称',
        //   distinguish: '区分',
        //   month: '',
        //   period: '管控期间',
        //   amount: '预算金额',
        //   availableAmount: '可用金额',
        // }
      ],
      inTableData: [
        // {
        //   id: new Date().getTime() + Math.floor(Math.random() * 10),
        //   department: '',
        //   project: '',
        //   number: '',
        //   type: '机种',
        //   subject: '科目',
        //   subjectName: '科目名称',
        //   distinguish: '区分',
        //   month: '',
        //   period: '管控期间',
        //   amount: '预算金额',
        //   availableAmount: '可用金额',
        // }
      ]
    };
  },
  watch: {
    department(newValue, oldValue) {
      if (this.isChange) {
        this.isChange = !this.isChange;
        return false;
      }
      if (newValue === oldValue) {
        return false;
      } else {
        this.$confirm(
          "切换部门将重置表格数据, 是否继续?",
          this.$t("comm.tips"),
          {
            confirmButtonText: this.$t("comm.certain"),
            cancelButtonText: this.$t("comm.cancel"),
            type: "warning",
            iconClass: "iconfont icongantanhao_icon",
            customClass: localStorage.getItem("theme") == "Dark" ? "dark-message-box" : " "
          }
        )
          .then(() => {
            this.$message({
              type: "success",
              iconClass: "iconfont icongantanhao_icon",
              customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
              message: "您已切换部门!"
            });
            this.__resetTable();
          })
          .catch(() => {
            this.isChange = true;
            this.department = oldValue;
            this.$message({
              type: "info",
              iconClass: "iconfont icongantanhao_icon",
              customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
              message: "已取消切换"
            });
          });
      }
    }
  },
  methods: {
    searchDepartment(tableName, index) {
      this.ids.index = index;
      this.ids.tableName = tableName;
      this.departmentDialogShow = true;
    },
    setDepartment({ index, tableName, name }) {
      console.log(tableName);
      this[tableName][index].department = name;
    },
    close(e) {
      console.log(e);
      this.departmentDialogShow = false;
    },
    addTableRows(table) {
      const newRow = {
        id: new Date().getTime() + Math.floor(Math.random() * 10),
        department: "",
        project: "",
        number: "",
        type: "机种",
        subject: "科目",
        subjectName: "科目名称",
        distinguish: "区分",
        month: "",
        period: "管控期间",
        amount: "预算金额",
        availableAmount: "可用金额"
      };
      this[table] = [...this[table], newRow];
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
    }
  }
};
</script>
<style lang="scss" scoped>
.change {
  width: 100%;
  // height: 100%;
  background-color: #fff;
  box-sizing: border-box;
  padding: 20px;
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
      width: 100%;
      // max-width: 1460px;
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
</style>
<style lang="scss">
.change {
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

