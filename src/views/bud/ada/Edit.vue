<template>
  <div :class="theme=='Light'?'no-search-content-box advice-apply-edit adaE-light':'no-search-content-box advice-apply-edit'">
    <p class="advice-edit-title">
      {{ title }}
    </p>
    <div class="table-bg-box marigin-bottom">
      <div class="advice-edit-table-title">
        <span>禀议申请信息</span>
        <span class="advice-edit-title-num">禀议编号：{{ ada.applyNo }}</span>
      </div>
      <el-form ref="form" :model="ada" :rules="rules" label-width="110px" label-position="left" class="content-top-form form-big-lable">
        <el-row type="flex" justify="space-between">
          <el-col :span="7">
            <el-form-item label="禀议申请时间" prop="applyTime" class="big-input">
              <el-date-picker
                v-model="ada.applyTime"
                type="date"
                placeholder="选择日期"
                :clearable="false"
                style="width: 100%;"
                :popper-class="theme=='Light'?'blueDate':''"
              />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="禀议部门" prop="applyOrg" class="big-input">
              <el-input v-model="ada.applyOrg" disabled>
                <i slot="suffix" class="iconfont iconbuke" />
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="禀议申请人" prop="applyUser" class="big-input">
              <el-input v-model="ada.applyUser" disabled>
                <i slot="suffix" class="iconfont iconbuke" />
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="7">
            <el-form-item label="预计使用日" prop="scheduleDate" class="big-input">
              <el-date-picker
                v-model="ada.scheduleDate"
                type="date"
                placeholder="选择日期"
                :clearable="false"
                style="width: 100%;"
                :popper-class="theme=='Light'?'blueDate':''"
              />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="使用人" prop="user" class="big-input">
              <el-input v-model="ada.user">
                <i slot="suffix" class="iconfont iconbuke" />
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="状 态" prop="status" class="big-input">
              <el-input v-model="ada.status" disabled>
                <i slot="suffix" class="iconfont iconbuke" />
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- <div class="content-top-breadcrumb">
        <div :class="theme=='Light'?'state-status operation-item':'state-status operation-item dark'">
          <el-tooltip class="item" effect="light" placement="bottom-start" :popper-class="theme=='Light'?'blueHelp':'darkHelp'">
            <div v-for="(item,index) in ada.applyDetails" slot="content" :key="index" class="items">
              <span class="circle-btn"><i class="iconfont iconhesuankemuleixing" /></span>{{ item.itemName }}&nbsp;&nbsp;<span class="qian">￥</span><span>{{ item.amount }}</span>
            </div>
            <el-button>禀议科目信息<i class="iconfont iconshuangjiantouyou" /></el-button>
          </el-tooltip>
          <el-popover placement="right-end" :visible-arrow="false" trigger="hover" :popper-class="theme=='Light'?'advice-info-help blueDate':'advice-info-help'">
            <p>{{ ada.applyDetailHelp }}</p>
            <span slot="reference" class="advice-help"><i class="iconfont iconbangzhu" /></span><br>
          </el-popover>
        </div>
      </div> -->
      <el-form ref="form" :model="ada" :rules="rules" label-width="110px" label-position="left" class="content-top- form-big-lable">
        <el-form-item label="禀议缘由" prop="applyReson" class="big-input">
          <el-input v-model="ada.applyReson" type="textarea" class="textarea-height" />
        </el-form-item>
        <el-form-item label="备 注" prop="remark" class="big-input">
          <el-input v-model="ada.remark" type="textarea" class="textarea-height" />
        </el-form-item>
        <el-form-item label="禀议附件" prop="status" class="big-input">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            accept="file"
            multiple
            :limit="3"
            :file-list="ada.attachmentList"
            :on-change="handleChange"
          >
            <div><i class="iconfont iconshangchuan" />上 传</div>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-bg-box marigin-bottom">
      <div class="advice-edit-table-title justify-content-flex">
        <span>禀议科目信息</span>
        <span class="advice-table-add-btn" @click="addRows"><i class="iconfont icontianjia_huaban" /> 添加一行</span>
      </div>
      <div class="advice-edit-table">
        <hot-table ref="textHot" :settings="hotSettings" />
      </div>

      <el-form ref="form" :model="ada" :rules="rules" label-width="110px" label-position="left" class="content-top-form form-big-lable">
        <el-row type="flex">
          <el-col :span="7">
            <el-form-item label="资产种类" prop="modifyDate" class="big-input">
              <el-radio-group v-model="ada.assetsDiv">
                <el-radio label="固定资产">
                  固定资产
                </el-radio>
                <el-radio label="其他">
                  其他
                </el-radio>
                <el-radio label="备品备件">
                  备品备件
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col v-if="ada.assetsDiv === '其他'" :span="7" class="col-right big-input">
            <el-input v-model="ada.other">
              <i slot="suffix" class="iconfont iconbuke" />
            </el-input>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="7">
            <el-form-item label="设备规格" prop="deviceSpecification" class="big-input">
              <el-input v-model="ada.deviceSpecification">
                <i slot="suffix" class="iconfont iconbuke" />
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="商品编号" prop="id" class="big-input">
              <el-input v-model="ada.id">
                <i slot="suffix" class="iconfont iconbuke" />
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="采购方式" prop="buyDiv" class="big-input">
              <el-radio-group v-model="ada.buyDiv">
                <el-radio label="通过ITS部门" />
                <el-radio label="其他" />
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="7">
            <el-form-item label="保修信息" prop="info" class="big-input">
              <el-select v-model="form.info" style="width:100%" placeholder="请选择" :popper-class="theme=='Light'?'blueSelect':''">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="保修年限" prop="warrantyPeriod" class="big-input">
              <el-input v-model="ada.warrantyPeriod">
                <i slot="suffix" class="iconfont iconbuke" />
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="支付方式" prop="payment" class="big-input">
              <el-radio-group v-model="ada.payment">
                <el-radio label="银行转账" />
                <el-radio label="个人精算" />
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="7">
            <el-form-item label="预定支付时间" prop="payDate" class="big-input">
              <el-date-picker
                v-model="ada.payDate"
                type="date"
                placeholder="选择日期"
                :clearable="false"
                style="width: 100%;"
                :popper-class="theme=='Light'?'blueDate':''"
              />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="禀议金额" prop="applyAmount" class="big-input">
              <el-input v-model="ada.applyAmount" class="right-text">
                <i slot="suffix" class="iconfont iconbuke" />
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" />
        </el-row>
      </el-form>
    </div>
    <div class="table-bg-box">
      <div class="advice-edit-table-title">
        <span>其他信息</span>
      </div>
      <el-form ref="form" :model="ada" :rules="rules" label-width="110px" label-position="left" class="content-top-form form-big-lable">
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <!-- <el-form-item label="创建时间" prop="createTime" class="big-input">
              <el-date-picker
                v-model="ada.createTime"
                type="date"
                placeholder="选择日期"
                :clearable="false"
                style="width: 100%;"
                :popper-class="theme=='Light'?'blueDate bule':''"
              />
            </el-form-item> -->
            <el-form-item label="创建时间" prop="createTime" class="big-input">
              <el-input v-model="ada.createTime" disabled>
                <i slot="suffix" class="iconfont iconbuke" />
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="创建者" prop="createBy" class="big-input">
              <el-input v-model="ada.createBy" disabled>
                <i slot="suffix" class="iconfont iconbuke" />
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <!-- <el-form-item label="最后修改时间" prop="updateTime" class="big-input">
              <el-date-picker
                v-model="ada.updateTime"
                type="date"
                placeholder="选择日期"
                :clearable="false"
                style="width: 100%;"
                :popper-class="theme=='Light'?'blueDate bule':''"
              />
            </el-form-item> -->
            <el-form-item label="创建时间" prop="updateTime" class="big-input">
              <el-input v-model="ada.updateTime" disabled>
                <i slot="suffix" class="iconfont iconbuke" />
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="最后修改者" prop="updateBy" class="big-input">
              <el-input v-model="ada.updateBy" disabled>
                <i slot="suffix" class="iconfont iconbuke" />
              </el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="7" />
          <el-col :span="7" /> -->
        </el-row>
      </el-form>
    </div>
    <ul class="operation-box dialog-btn-box">
      <li class="operation-item">
        <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbaocun" /></span>
        <span class="operation-text">暂&nbsp;存</span>
      </li>
      <li class="operation-item">
        <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont icontijiao" /></span>
        <span class="operation-text">提&nbsp;交</span>
      </li>
      <li class="operation-item">
        <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
        <span class="operation-text">取&nbsp;消</span>
      </li>
      <li class="operation-item" @click.prevent="handleProcessInstClick('15051')">
        <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconyiban" /></span>
        <span class="operation-text">审批履历</span>
      </li>
    </ul>
    <el-dialog id="processDialog" :title="$t('workflow.detailedProcess') + processInstId" :visible.sync="dialogTableVisible" width="80%">
      <process-detail :key="processInstId" :process-inst-id="processInstId" />
    </el-dialog>
  </div>
</template>
<script>

import Handsontable from 'handsontable'
import { HotTable } from '@handsontable/vue'
import ProcessDetail from '@/components/ProcessDetail'
import { getAdrApproveInfo } from '@/api/bud//ada/ada-api.js'
export default {
  components: {
    HotTable,
    ProcessDetail

  },
  data() {
    return {
      theme: localStorage.getItem('theme') !== 'Dark' ? 'Light' : '',
      title: null,
      ada: {},
      dialogTableVisible: false,
      status: [{
        'orgName': '部门预算'
      },
      {
        'orgName': '部门禀议通过'
      },
      {
        'orgName': '部门实绩'
      },
      {
        'orgName': '部门禀议结余'
      }, {
        'orgName': '部门禀议中'
      }],
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
      form: {
        info: '0'
      },
      rules: {
        applyTime: [
          { required: true, message: '请选择禀议申请时间', trigger: 'change' }
        ],
        scheduleDate: [
          { required: true, message: '请选择预计使用日', trigger: 'change' }
        ],
        user: [
          { required: true, message: '请选择使用人', trigger: 'blur' }
        ],
        applyAmount: [
          { required: true, message: '请添加禀议金额', trigger: 'blur' }
        ]
      },
      options: [{
        value: '0',
        label: '有保修'
      }, {
        value: '1',
        label: '无保修'
      }],
      hotSettings: {
        width: '100%',
        height: '100%',
        className: 'htMiddle',
        rowHeights: 40, // 行高
        // 定义数据
        data: [],
        // 定义表结构
        colHeaders: [
          '目的地',
          '出差时间',
          // '',
          // '出差时间',
          '天数',
          '航班/车次',
          '金 额'
        ],
        // mergeCells: [
        //   { row: 0, col: 1, rowspan: 1, colspan: 3 },
        //   { row: 1, col: 1, rowspan: 1, colspan: 3 },
        //   { row: 2, col: 1, rowspan: 1, colspan: 3 }
        // ],
        // 单元格宽
        colWidths: ['auto', 'auto', 20, 'auto', 'auto', 'auto', 'auto'],
        columns: [
          // 添加每一列的数据类型和一些配置
          {
            data: 'address',
            type: 'text',
            className: 'htMiddle  notread'
          },
          {
            data: 'startDate',
            type: 'date',
            dateFormat: 'YYYY-MM-DD',
            className: 'htMiddle '
          },
          {
            data: '',
            type: 'text',
            readOnly: true,
            className: 'htMiddle tdNone',
            renderer: this.operationRender
          },
          {
            data: 'endDate',
            type: 'date',
            dateFormat: 'YYYY-MM-DD',
            className: 'htMiddle tdNone'
          },
          {
            data: 'days',
            type: 'text',
            className: 'htMiddle '
          },
          {
            data: 'departure',
            type: 'text',
            className: 'htMiddle '
          },
          {
            data: 'amount',
            type: 'text',
            className: 'htMiddle htRight'
          }
        ],

        manualColumnResize: true, // 列可拖拽调整大小
        manualRowResize: true, // 列可拖拽调整大小
        // autoColumnSize: true, // 自适应列大小
        possible: false,
        fillHandle: false, // 选中拖拽复制 possible values: true, false, "horizontal", "vertical"
        fixedColumnsLeft: 0, // 固定左边列数
        fixedRowsTop: 0, // 固定顶部多少行不能垂直滚动
        stretchH: 'all', // 根据宽度横向扩展，last:只扩展最后一列，none：默认不扩展
        contextMenu: false
        // nestedHeaders: [
        //   [
        //     '目的地',
        //     {
        //       label: '出差时间',
        //       colspan: 2
        //     },
        //     '天数',
        //     '航班/车次',
        //     '金额'
        //   ]
        // ]
      }
    }
  },
  mounted() {
    this.title = this.$route.query.name || '差旅费申请表'
    this.getAdrApproveInfo()
    const dom = document.getElementsByClassName('htCore')[1]
    const th = dom.getElementsByTagName('th')

    th[1].colSpan = '3'
    // th[2].colSpan = '0'
    // th[3].colSpan = '0'
    // th[2].style.display = 'none'
    // console.log('th', th[2])
  },
  methods: {
    async getAdrApproveInfo() {
      const params = {
        a: '1'
      }
      const res = await getAdrApproveInfo(params)
      console.log('res.datas.ada', res.datas.ada)
      this.ada = res.datas.ada
      this.ada.itemList.map(item => {
        item.address = item.startPoint + ' ——> ' + item.endPoint
      })
      this.hotSettings.data = this.ada.itemList
    },
    handleChange(file, fileList) {
      console.log('file', file)
      console.log('fileList', fileList)
    },
    // onOpenStatus() {
    //   this.isShow = !this.isShow
    // },
    // 自定义内容
    operationRender(instance, td, row, col, prop, value, cellProperties) {
      Handsontable.dom.empty(td)
      td.innerText = '至'
      Handsontable.dom.addClass(td, 'htMiddle')
      return td
    },
    // 添加一行数据
    addRows() {
      const hot = this.$refs.textHot
      const dataLength = this.hotSettings.data.length
      hot.hotInstance.alter('insert_row', dataLength, 1)
    },
    handleProcessInstClick: function(processInstId) {
      this.processInstId = processInstId
      this.dialogTableVisible = true
    }
  }
}
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
    .upload-demo {
      display: flex;
      height: 38px;
      border-radius: 4px;
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
    right: 35px;
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
      color: #52b3ff;
      text-decoration: underline;
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
.handsontable td,
.handsontable th {
  padding: 0 5px;
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
.money-right {
  text-align: right;
}
</style>
