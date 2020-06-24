<template>
  <el-dialog
    title="流水线别明细"
    :visible.sync="detailDialog"
    class="dialog"
    width="80%"
    top="20px"
    modal
    center
    @close="close"
  >
    <div class="detail">
      <div class="info">
        <div class="codition_department">
          <div class="title">预算部门：</div>
          <el-input
            size="small"
            placeholder="测试课"
            disabled
            :value="inputDetail.length && inputDetail[0]"
          />
        </div>
        <div class="codition_department">
          <div class="title">预算科目：</div>
          <el-input
            size="small"
            placeholder="预算科目"
            disabled
            :value="inputDetail.length && inputDetail[1]"
          />
        </div>
        <div class="codition_apply">
          <div class="title">预算申请编号：</div>
          <el-input size="small" disabled />
        </div>
      </div>
      <h3>
        预算明细
        <div class="add_row iconfont icon-jia" @click.stop="addDetailRows">新增一行</div>
      </h3>
      <div v-if="detailDialog" class="detail_table">
        <hot-table ref="detailHot" class="table_info" :settings="detailSettings" />
      </div>
      <div class="btn">
        <!-- <el-button @click="detailDialog = false">{{$t('comm.cancel')}}</el-button> -->
        <el-button type="primary" @click="changeDetail">
          <!-- 确 定 -->
          {{ $t('comm.certain') }}
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { HotTable } from "@handsontable/vue";
import Handsontable from "handsontable";
export default {
  components: {
    HotTable
  },
  props: {
    // handsontable数据
    tableData: {
      type: Array,
      default() {
        return [];
      }
    },
    // 当年预算
    nowBudget: {
      type: Array,
      default() {
        return [];
      }
    },
    // 次年预算
    nextBudget: {
      type: Array,
      default() {
        return [];
      }
    },
    // 主数据总合
    count: {
      type: Number,
      default: 0
    },
    // 表单数据
    inputDetail: {
      type: Array,
      default() {
        return [];
      }
    },
    isShow: {
      type: Boolean,
      defaut: false
    }
  },
  data() {
    return {
      detailDialog: false,
      detailSettings: {
        data: [
          // {department: 11000, remarks: '当年预算'},
          // {department: 11000, remarks: '次年预算'}
        ], // 数据在这个里面,由数据填充表
        colWidths: [
          100,
          100,
          100,
          80,
          60,
          60,
          60,
          60,
          60,
          60,
          60,
          60,
          60,
          60,
          60,
          60,
          100
        ], // 单元格宽
        mergeCells: [
          { row: 0, col: 0, rowspan: 2, colspan: 1 },
          { row: 0, col: 1, rowspan: 2, colspan: 1 },
          { row: 0, col: 2, rowspan: 2, colspan: 1 },
          { row: 0, col: 16, rowspan: 2, colspan: 1 }
        ],
        cell: [],
        rowHeights: 25, // 单元格高
        startRows: 10, // 初始行列数
        startCols: 35,
        minRows: 0, // 最小行列
        minCols: 0,
        rowHeaders: false, // 行表头
        colHeaders: [
          "流水线单一",
          "流水线共通",
          "使用场所",
          "备注",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月",
          "1月",
          "2月",
          "3月",
          "操作"
        ], // 自定义列表头or 布尔值
        minSpareCols: 0, // 列留白
        minSpareRows: 0, // 行留白
        className: "htCenter",
        currentRowClassName: "currentRow", // 为选中行添加类名，可以更改样式
        currentColClassName: "currentCol", // 为选中列添加类名
        autoWrapRow: true, // 自动换行
        // language: "zh-CN",
        // contextMenu: [
        //   "row_above",
        //   "row_below",
        //   "col_left",
        //   "col_right",
        //   "---------",
        //   "remove_row",
        //   "remove_col",
        //   "---------",
        //   "alignment",
        //   "make_read_only",
        //   "borders",
        //   "copy",
        //   "cut"
        // ],
        // 右键效果
        fillHandle: false, // 选中拖拽复制 possible values: true, false, "horizontal", "vertical"
        fixedColumnsLeft: 0, // 固定左边列数
        fixedRowsTop: 0, // 固定上边行数
        columns: [
          {
            data: "placelineId", // 单一流水线,
            className: "htMiddle htCenter"
          },
          {
            data: "placelineDetail", // 流水线共通
            className: "htMiddle htCenter"
          },
          {
            data: "placeuseId", // 使用场所
            className: "htMiddle htCenter"
          },
          {
            data: "remarks", // 备注
            readOnly: true,
            // className: 'htMiddle htCenter notread',
            // eslint-disable-next-line
            renderer: function(
              instance,
              td,
              row,
              col,
              prop,
              value,
              cellProperties
            ) {
              if (row % 2 === 0) {
                Handsontable.dom.empty(td);
                td.innerText = "当年预算";
                Handsontable.dom.addClass(td, "htMiddle htCenter notread");
                return td;
              } else {
                Handsontable.dom.empty(td);
                td.innerText = "次年预算";
                Handsontable.dom.addClass(td, "htMiddle htCenter notread");
                return td;
              }
            }
          },
          {
            data: "value01", // 四月
            type: "numeric"
          },
          {
            data: "value02", // 五月
            type: "numeric"
          },
          {
            data: "value03", // 六月
            type: "numeric"
          },
          {
            data: "value04", // 七月
            type: "numeric"
          },
          {
            data: "value05", // 八月
            type: "numeric"
          },
          {
            data: "value06", // 九月
            type: "numeric"
          },
          {
            data: "value07", // 十月
            type: "numeric"
          },
          {
            data: "value08", // 十一月
            type: "numeric"
          },
          {
            data: "value09", // 十二月
            type: "numeric"
          },
          {
            data: "value10", // 一月
            type: "numeric"
          },
          {
            data: "value11", // 二月
            type: "numeric"
          },
          {
            data: "value12", // 三月
            type: "numeric"
          },
          {
            data: "operation", // 操作
            readOnly: true,
            renderer: this.detailRender,
            className: "htMiddle htCenter"
          }
        ]
      }
    };
  },
  watch: {
    isShow(newValue) {
      this.detailDialog = newValue;
      if (newValue) {
        this.$nextTick(() => {
          this.initHandsonTable();
        });
      }
    }
  },
  created() {
    console.log(11);
    // const tableData = JSON.stringify(this.tableData)
    // detailSettings = JSON.parse(tableData)
  },
  mounted() {
    console.log(222);
  },
  methods: {
    // 初始化表格信息
    initHandsonTable() {
      const hot = this.$refs.detailHot;
      // 当数据为空的时候
      console.log(this.tableData);
      if (this.tableData.length < 2) {
        hot.hotInstance.alter("insert_row", 0, 2);
        // 对单元格合并
        this.detailSettings.mergeCells = [
          { row: 0, col: 0, rowspan: 2, colspan: 1 },
          { row: 0, col: 1, rowspan: 2, colspan: 1 },
          { row: 0, col: 2, rowspan: 2, colspan: 1 },
          { row: 0, col: 16, rowspan: 2, colspan: 1 }
        ];
      } else {
        // 当数据不为空的时候
        const list = JSON.parse(JSON.stringify(this.tableData));
        hot.hotInstance.loadData(list);
        console.log(list);
        this.detailSettings.data.push(...list);
        // 合并单元格
        const mergeList = [];
        list.forEach((item, index) => {
          if (index % 2 === 0) {
            mergeList.push(
              { row: index, col: 0, rowspan: 2, colspan: 1 },
              { row: index, col: 1, rowspan: 2, colspan: 1 },
              { row: index, col: 2, rowspan: 2, colspan: 1 },
              { row: index, col: 16, rowspan: 2, colspan: 1 }
            );
          }
        });
        this.detailSettings.mergeCells = mergeList;
      }
    },
    // 添加一行数据
    addDetailRows() {
      const hot = this.$refs.detailHot;
      // if (this.d)
      const dLength = hot.hotInstance.getSourceData().length;
      hot.hotInstance.alter("insert_row", dLength, 2);
      // 对单元格合并
      this.detailSettings.mergeCells.push(
        { row: dLength, col: 0, rowspan: 2, colspan: 1 },
        { row: dLength, col: 1, rowspan: 2, colspan: 1 },
        { row: dLength, col: 2, rowspan: 2, colspan: 1 },
        { row: dLength, col: 16, rowspan: 2, colspan: 1 }
      );
    },
    // 添加渲染函数
    detailRender(instance, td, row) {
      if (row % 2 === 0) {
        const deleteBtn1 = document.createElement("div");
        this.setStyle(deleteBtn1);
        deleteBtn1.innerText = "删除";
        // 给删除按钮注册事件
        Handsontable.dom.addEvent(deleteBtn1, "click", () => {
          if (this.detailSettings.data.length === 2) {
            this.$message({
              type: "error",
              iconClass: "iconfont icongantanhao_icon",
              customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
              message: "最后一行，无法删除！"
            });
            return false;
          }
          this.$confirm(
            "此操作将删除该行数据, 是否继续?",
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
              instance.alter("remove_row", row, 2);
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
        });
        Handsontable.dom.empty(td);
        td.appendChild(deleteBtn1);
        Handsontable.dom.addClass(td, "htMiddle");
        return td;
      }
    },
    // 给某个dom设定样式
    setStyle(dom) {
      dom.style.textAlign = "center";
      dom.style.cursor = "pointer";
    },
    // 关闭model时
    close() {
      const hot = this.$refs.detailHot;
      hot.hotInstance.alter("remove_row", 0, this.detailSettings.data.length);
      this.detailSettings.data = [];
      this.$emit("close", false);
    },
    // 点击确定
    changeDetail() {
      const hot = this.$refs.detailHot;
      const data = JSON.stringify(hot.hotInstance.getSourceData());
      console.log(data);
      console.log(JSON.parse(data));
      let flag = true;
      let message = "";
      let nowCountList = [];
      let nextCountList = [];
      // 对前三列数据进行非空校验
      for (let i = 0; i < 3; i++) {
        hot.hotInstance.getDataAtCol(i).forEach((item, index) => {
          if (!item && index % 2 === 0) {
            console.log(i);
            const msg =
              i === 0 ? "流水线单一" : i === 1 ? "流水线共通" : "使用场所";
            // console.log(msg)
            message = `${msg}不能为空`;
            flag = false;
            return false;
          }
        });
        if (!flag) {
          this.$message({
            type: "error",
            iconClass: "iconfont icongantanhao_icon",
            customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
            message
          });
          return false;
        }
      }
      // 计算出4-3月每一列数的总合
      for (let i = 4; i < 16; i++) {
        let nowCount = 0;
        let nextCount = 0;
        hot.hotInstance.getDataAtCol(i).forEach((item, index) => {
          // 当检测出填的数据不是数字的时候，提示用户
          if (item && typeof item !== "number") {
            flag = false;
            message = "请填写正确格式的数据";
            return false;
          }
          if (index % 2 === 0) {
            // 当年的每条总和
            nowCount += item;
            // console.log(item)
          } else {
            // 预算的每条总和
            nextCount += item;
          }
        });
        if (!flag) {
          this.$message({
            type: "error",
            iconClass: "iconfont icongantanhao_icon",
            customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
            message
          });
          return false;
        }
        nowCountList = [...nowCountList, nowCount === 0 ? null : nowCount - 0];
        nextCountList = [
          ...nextCountList,
          nextCount === 0 ? null : nextCount - 0
        ];
      }
      // 获得数据后，与主表数据做对比做校验
      // 当年预算的数据对比
      const errorNum = this.nowBudget.find((item, i) => {
        return item && item !== nowCountList[i];
      });
      const errorMonth = this.nowBudget.findIndex((item, i) => {
        return item && item !== nowCountList[i];
      });
      if (errorMonth !== -1) {
        let month;
        if (errorMonth < 9) {
          month = errorMonth + 4;
        } else {
          month = errorMonth - 8;
        }
        this.$message({
          type: "error",
          iconClass: "iconfont icongantanhao_icon",
          customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
          message: `${month}月当年预算总合应为${errorNum}`
        });
        return false;
      }
      // 次年预算的数据对比
      const nextErrorNum = this.nextBudget.find((item, i) => {
        return item && item !== nextCountList[i];
      });
      const nextErrorMonth = this.nextBudget.findIndex((item, i) => {
        return item && item !== nextCountList[i];
      });
      if (nextErrorMonth !== -1) {
        let month;
        if (nextErrorMonth < 9) {
          month = nextErrorMonth + 4;
        } else {
          month = nextErrorMonth - 8;
        }
        this.$message({
          type: "error",
          iconClass: "iconfont icongantanhao_icon",
          customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
          message: `${month}月次年预算总合应为${nextErrorNum}`
        });
        return false;
      }
      // 当主表有数据时
      if (this.count) {
        const count = this.getCount(nowCountList);
        if (this.count !== count) {
          this.$message({
            type: "error",
            iconClass: "iconfont icongantanhao_icon",
            customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
            message: `合计应为${this.count}`
          });
          return false;
        }
      }
      const params = {
        list: JSON.parse(data),
        nowCountList,
        nextCountList
      };
      this.$emit("change", params);
      window.setTimeout(() => {
        this.detailDialog = false;
      }, 500);
    },
    // 计算数组的和
    getCount(list) {
      let count = 0;
      list.forEach(item => {
        if (item && typeof item === "number") {
          count += item;
        }
      });
      return count;
    }
  }
};
</script>
<style lang="scss">
.dialog {
  h3 {
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    border-bottom: 1px dashed #ccc;
    margin-bottom: 10px;
    position: relative;
    color: #000;
    .add_row {
      position: absolute;
      right: 0;
      bottom: 2px;
      border-radius: 6px;
      // border: 1px solid #ccc;
      cursor: pointer;
      font-size: 14px;
      width: 110px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      background-image: linear-gradient(rgb(52, 165, 248), rgb(8, 142, 240));
      color: #fff;
      &:hover {
        background-image: linear-gradient(rgb(42, 155, 238), rgb(8, 142, 240));
      }
    }
  }
  .detail {
    height: 500px;
    display: flex;
    flex-direction: column;
    // background-color: #ccc;
    .info {
      height: 60px;
      box-sizing: border-box;
      padding-bottom: 20px;
      width: 100%;
      display: flex;
      align-items: center;
      & > div {
        width: 33.3%;
        display: flex;
        box-sizing: border-box;
        padding: 0 20px;
        align-items: center;
        .title {
          width: 140px;
        }
      }
    }
    .btn {
      margin-top: 15px;
      text-align: right;
    }
    .detail_table {
      height: 350px;
      position: relative;
      overflow: auto;
      font-size: 12px;
    }
  }
}
</style>

