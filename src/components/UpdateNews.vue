<template>
  <div>
    <el-dialog
      title="更新履历"
      :visible.sync="isShow"
      class="content-dialog-box update-news-dialog"
      :close-on-click-modal="false"
      custom-class="dialog-drag"
      top="0"
      :before-close="handleClose"
    >
      <el-timeline class="update-news-line">
        <el-timeline-item v-for="item in tableData" :key="item.index">
          <p class="update-news-line-date">
            {{ item.updateTime }}
            <span>{{ item.updateBy }}{{ item.updatType }} </span>
          </p>
          <div class="update-news-line-content">
            <div class="update-news-content-name">
              变更科目
            </div>
            <ul class="start-content-flex update-news-content-items">
              <li v-for="list in item.itemList" :key="list.index" @click="itemClick">
                {{ list.itemName }}
              </li>
            </ul>
          </div>
        </el-timeline-item>
      </el-timeline>
    </el-dialog>

    <el-dialog
      title="交际费1"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      class="content-dialog-box update-news-detail-dialog"
      custom-class="dialog-drag"
      top="0"
    >
      <div style="display: flex;flex-direction: column;height: 100%;">
        <div ref="table" class="dialog-table-box">
          <el-table
            :data="itemData"
            :span-method="objectSpanMethod"
            border
            stripe
            height="100%"
            style="width: 100%"
          >
            <el-table-column
              prop="division"
              label="大区分"
              align="center"
              show-overflow-tooltip
              min-width="100"
              fixed
            >
              <template slot-scope="scope">
                <span v-if="scope.row.division === 'estimate'">估算</span>
                <span v-else-if="scope.row.division === 'performanc'">实际</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="distinguish"
              label="区分"
              align="center"
              show-overflow-tooltip
              min-width="100"
              fixed
            >
              <template slot-scope="scope">
                <span v-if="scope.row.distinguish === 'beforeInfo'">变更前</span>
                <span v-else-if="scope.row.distinguish === 'afterInfo'">变更后</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="total"
              label="合计"
              align="center"
              show-overflow-tooltip
              min-width="100"
            />
            <el-table-column
              prop="jan"
              label="一月"
              align="center"
              show-overflow-tooltip
              min-width="100"
            />
            <el-table-column
              prop="feb"
              label="二月"
              align="center"
              show-overflow-tooltip
              min-width="100"
            />
            <el-table-column
              prop="mar"
              label="三月"
              align="center"
              show-overflow-tooltip
              min-width="100"
            />
            <el-table-column
              prop="apr"
              label="四月"
              align="center"
              show-overflow-tooltip
              min-width="100"
            />
            <el-table-column
              prop="may"
              label="五月"
              align="center"
              show-overflow-tooltip
              min-width="100"
            />
            <el-table-column
              prop="jun"
              label="六月"
              align="center"
              show-overflow-tooltip
              min-width="100"
            />
            <el-table-column
              prop="jul"
              label="七月"
              align="center"
              show-overflow-tooltip
              min-width="100"
            />
            <el-table-column
              prop="aug"
              label="八月"
              align="center"
              show-overflow-tooltip
              min-width="100"
            />
            <el-table-column
              prop="sept"
              label="九月"
              align="center"
              show-overflow-tooltip
              min-width="100"
            />
            <el-table-column
              prop="oct"
              label="十月"
              align="center"
              show-overflow-tooltip
              min-width="100"
            />
            <el-table-column
              prop="nov"
              label="十一月"
              align="center"
              show-overflow-tooltip
              min-width="100"
            />
            <el-table-column
              prop="dece"
              label="十二月"
              align="center"
              show-overflow-tooltip
              min-width="100"
            />
          </el-table>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getUpdateHistory, getItemHstory } from '@/api/bud/baf/baf-api.js'
import $ from 'jquery'
import 'jquery.nicescroll'
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      scrollColr: localStorage.getItem('theme') !== 'Dark' ? '#D8E0E8' : '#5A5E63',
      itemData: []
    }
  },
  watch: {
    isShow: function (newVal) {
      this.$nextTick(function () {
        this.getDragBar()
        this.getScrollBar()
      })
    },

    dialogVisible: function (newVal) {
      this.$nextTick(function () {
        this.getDragBar()
        this.getScrollBar()
      })
    }
  },
  mounted() {
    // 拖拽
    this.draggable()
    // 缩放
    this.resizable()
    // 滚动条
    this.getUpdateHistoryData()
    this.getItemHstoryData()
  },
  methods: {
    handleClose(done) {
      this.$emit('onClose')
      this.dialogVisible = false
    },
    itemClick() {
      // this.$emit('onClose')
      this.dialogVisible = true
    },
    async getUpdateHistoryData() {
      const res = await getUpdateHistory()
      if (res && res.success) {
        console.log('aaaaaaaaaaaa', res)
        this.tableData = res.datas.history
      }
    },
    async getItemHstoryData() {
      const res = await getItemHstory()
      if (res && res.success) {
        this.itemData = res.datas.items

      }
    },
    draggable() {
      $('.dialog-drag').draggable({
        cursor: 'move',
        handle: '.el-dialog__header',
        refreshPositions: true,
        containment: 'parent',
        stop() {
          $('.el-table__body-wrapper').getNiceScroll().resize()
          $('.el-dialog__body').getNiceScroll().resize()
        }
      })
    },
    resizable() {
      $('.dialog-drag').resizable({
        aspectRatio: false,
        minHeight: 150,
        containment: 'parent',
        stop: function (event, ui) {
          $('.footer-box').addClass('drag-table-height')
          $('.el-table__body-wrapper').getNiceScroll().resize()
          $('.el-dialog__body').getNiceScroll().resize()
        }
      })
    },

    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    getDragBar() {
      $('.el-dialog__body').niceScroll({
        cursorcolor: this.scrollColr,
        cursoropacitymin: 0, // 当滚动条是隐藏状态时改变透明度, 值范围 1 到 0
        cursoropacitymax: 1, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
        cursorwidth: '8px', // 滚动条的宽度，单位：便素
        cursorborder: `1px solid ${this.scrollColr}`, // CSS方式定义滚动条边框
        autohidemode: true, // 隐藏滚动条的方式, 可用的值:
        zindex: 0,
        railpadding: { top: 0, right: 0, left: 0, bottom: 0 },
        boxzoom: false,
        iframeautoresize: true // 在加载事件时自动重置iframe大小
      })
    },
    getScrollBar() {
      $('.dialog-table-box .el-table__body-wrapper').niceScroll({
        cursorcolor: this.scrollColr,
        cursoropacitymin: 0, // 当滚动条是隐藏状态时改变透明度, 值范围 1 到 0
        cursoropacitymax: 1, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
        cursorwidth: '8px', // 滚动条的宽度，单位：便素
        cursorborder: `1px solid ${this.scrollColr}`, // CSS方式定义滚动条边框
        autohidemode: true, // 隐藏滚动条的方式, 可用的值:
        zindex: 0,
        railpadding: { top: 0, right: 0, left: 0, bottom: 0 },
        boxzoom: false,
        iframeautoresize: false // 在加载事件时自动重置iframe大小
      })
    }
  }
}
</script>
<style lang="scss">
.update-news-dialog {
  .dialog-drag {
    width: 1400px;
    min-width: 950px !important;
    height: 444px;
    max-height: 800px;

    .el-dialog__header {
      padding-left: 10px;
    }
    .el-dialog__body {
      padding: 20px 70px 0 60px;
      margin-left: -15px;
      height: 100%;
    }
    .update-news-line {
      .el-timeline-item__node {
        width: 20px;
        height: 20px;
        background: linear-gradient(
          180deg,
          rgba(52, 57, 63, 1) 0%,
          rgba(22, 23, 27, 1) 100%
        );
        box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.5);
        border: 2px solid rgba(68, 71, 78, 1);
      }
      .el-timeline-item__node--normal {
        left: 15px;
        &::before {
          content: "";
          width: 10px;
          height: 10px;
          background: #00e2de;
          border-radius: 50%;
        }
      }
      .el-timeline-item__tail {
        left: 24px;
        border-left: 2px dashed #44474e;
      }
      .el-timeline-item__wrapper {
        padding-left: 55px;
      }
      .el-timeline-item__content {
        background: linear-gradient(
          180deg,
          rgba(52, 57, 63, 1) 0%,
          rgba(22, 23, 27, 1) 100%
        );
        box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.5);
        border-radius: 16px;
        border: 2px solid rgba(68, 71, 78, 1);
        .update-news-line-date {
          height: 48px;
          line-height: 48px;
          padding-left: 28px;
          font-family: "微软雅黑";
          font-size: 16px;
          color: #ffffff;
          span {
            padding-left: 20px;
          }
        }
        .update-news-no-content {
          height: 70px;
          line-height: 70px;
        }
        .update-news-line-content {
          display: flex;
          align-items: flex-start;
          border-top: 2px solid #44474e;
          padding: 20px 28px;
          font-size: 14px;
          .update-news-content-name {
            width: 110px;
            color: #ffffff;
          }
          .update-news-content-items {
            flex: 1;

            li {
              cursor: pointer;
              color: #2fa5bb;
              text-decoration: underline;
              margin-bottom: 10px;
              &:not(:last-child) {
                margin-right: 30px;
              }
            }
            li:focus,
            li:hover {
              color: #019fde;
            }
          }
        }
      }
    }
  }
  .el-timeline-item__timestamp.is-bottom {
    margin-top: 0;
  }
  .el-timeline-item:last-child {
    padding-bottom: 0;
  }
}

.update-news-detail-dialog {
  .dialog-drag {
    width: 1400px;
    min-width: auto !important;
    height: 340px !important;
    .el-dialog__body {
      margin: -8px;
      padding: 8px;
    }
    .dialog-table-box {
      height: 100%;
      padding: 20px;
      background: linear-gradient(180deg, #34393f 0%, #16171b 100%);
      box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.5);
      border-radius: 16px;
      overflow: hidden;
      .el-table {
        th {
          height: 46px;
          line-height: 46px;
          border-bottom: 0;
        }
        td {
          height: 36px;
          line-height: 36px;
        }
        .el-table__body-wrapper {
          height: calc(100% - 5px) !important;
          tbody {
            tr:nth-child(3) td:nth-child(1) {
              border-bottom: 1px solid #dddddd !important;
              border-top: 1px solid #dddddd !important;
            }
            tr:nth-child(even) td {
              color: #2fa5bb;
            }
            tr:nth-child(even) td:nth-child(1),
            td:nth-child(2) {
              color: #606266;
            }
          }
        }
        .el-table__fixed-body-wrapper tr:nth-child(odd) td:nth-child(1) {
          border-bottom: 1px solid;
        }
      }
    }
  }
}
</style>
