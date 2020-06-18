<template>
  <div class="advice">
    <!-- <h3>禀议预算申请</h3> -->
    <div class="content">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">{{ $t('bud.advice.personalInformation') }}</span>
          <div class="info">
            <div class="top">
              <div>
                <div class="title">
                  <!-- {{ $t('bud.advice.company') }} -->
                  公司
                </div>
                <el-input
                  class="input"
                  :placeholder="$t('bud.advice.daikinCompany')"
                  :disabled="true"
                />
              </div>
              <div>
                <div class="title">
                  <!-- {{ $t('bud.advice.currentLoginDepartment') }} -->
                  当前登录部门
                </div>
                <el-input
                  class="input"
                  :placeholder="$t('bud.advice.daikinCompany')"
                  :disabled="true"
                />
              </div>
              <div>
                <div class="title">
                  <!-- {{ $t('bud.advice.budgetaryYear') }} -->
                  预算年度
                </div>
                <el-select v-model="year" :placeholder="$t('bud.advice.selectYear')" size="small" class="select">
                  <el-option v-for="item in yearList" :key="item" :label="item" :value="item" />
                </el-select>
              </div>
              <div>
                <div class="title">
                  <!-- {{ $t('bud.advice.budgetDepartment') }} -->
                  预算部门
                </div>
                <el-select v-model="year" :placeholder="$t('bud.advice.selectYear')" size="small" class="select">
                  <el-option v-for="item in yearList" :key="item" :label="item" :value="item" />
                </el-select>
              </div>
              <div>
                <div class="title">
                  <!-- {{ $t('bud.advice.adviceBookNo') }} -->
                  禀议书NO
                </div>
                <el-input
                  class="input"
                  :placeholder="$t('bud.advice.daikinCompany')"
                  :disabled="true"
                />
              </div>
              <div>
                <div class="title">
                  <!-- {{ $t('bud.advice.adviceBookName') }} -->
                  禀议书名称
                </div>
                <el-input
                  class="input"
                  :placeholder="$t('bud.advice.daikinCompany')"
                  :disabled="true"
                />
              </div>
              <div>
                <div class="title">
                  <!-- {{ $t('bud.advice.adviceBookCategory') }} -->
                  禀议书分类
                </div>
                <el-select v-model="year" size="small" class="select">
                  <el-option v-for="item in yearList" :key="item" :label="item" :value="item" />
                </el-select>
              </div>
              <div>
                <div class="title">
                  <!-- {{ $t('bud.advice.projectNo') }} -->
                  项目编号
                </div>
                <el-input
                  class="input"
                  :placeholder="$t('bud.advice.daikinCompany')"
                  :disabled="true"
                />
              </div>
              <div>
                <div class="title">
                  <!-- {{ $t('bud.advice.projectName') }} -->
                  项目名称
                </div>
                <el-input
                  class="input"
                  :placeholder="$t('bud.advice.daikinCompany')"
                  :disabled="true"
                />
              </div>
              <div>
                <div class="title">
                  <!-- {{ $t('bud.advice.decisionNoticeDepartment') }} -->
                  决裁通知部门
                </div>
                <el-select v-model="year" :placeholder="$t('bud.advice.selectYear')" size="small" class="select">
                  <el-option v-for="item in yearList" :key="item" :label="item" :value="item" />
                </el-select>
              </div>
              <div>
                <div class="title">
                  <!-- {{ $t('bud.advice.issueDate') }} -->
                  发行日
                </div>
                <el-date-picker
                  v-model="value1"
                  type="date"
                  :placeholder="$t('bud.advice.selectDate')"
                />
              </div>
              <div>
                <div class="title">
                  <!-- {{ $t('bud.advice.ReserveDate') }} -->
                  完了预定日
                </div>
                <el-date-picker
                  v-model="value1"
                  type="date"
                  :placeholder="$t('bud.advice.selectDate')"
                />
              </div>
              <div>
                <div class="title">
                  <!-- {{ $t('bud.advice.currency') }} -->
                  货币
                </div>
                <el-select v-model="year" :placeholder="$t('bud.advice.selectYear')" size="small" class="select">
                  <el-option v-for="item in yearList" :key="item" :label="item" :value="item" />
                </el-select>
              </div>
              <div>
                <div class="title">
                  支付方法
                  <!-- {{ $t('bud.advice.paymentMethod') }} -->
                </div>
                <el-input
                  class="input"
                  :placeholder="$t('bud.advice.daikinCompany')"
                  :disabled="true"
                />
              </div>
            </div>
            <div class="down">
              <div>
                <div class="title">
                  {{ $t('bud.advice.adviceBookObjective') }}
                </div>
                <el-input
                  v-model="textarea3"
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows: 5}"
                  :placeholder="$t('bud.advice.inputContent')"
                />
              </div>
              <div>
                <div class="title">
                  {{ $t('bud.advice.adviceContent') }}
                </div>
                <el-input
                  v-model="textarea3"
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows: 5}"
                  :placeholder="$t('bud.advice.inputContent')"
                />
              </div>
              <div>
                <div class="title">
                  {{ $t('bud.advice.implementMethod') }}
                </div>
                <el-input
                  v-model="textarea3"
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows: 5}"
                  :placeholder="$t('bud.advice.inputContent')"
                />
              </div>
              <div>
                <div class="title">
                  {{ $t('bud.advice.expectedEffect') }}
                </div>
                <el-input
                  v-model="textarea3"
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows: 5}"
                  :placeholder="$t('bud.advice.inputContent')"
                />
              </div>
            </div>
            <div class="enclosure">
              <!-- 📎上传 -->
              <div class="title" @click="uploadShow = !uploadShow">
                <span class="iconfont icon-right" :class="uploadShow ? 'show' : ''" />
                <span>{{ $t('bud.advice.UploadAttachments') }}</span>
              </div>
              <div v-show="uploadShow" class="upload">
                <attachement upload-btn-show :data="fileList" action="/api/schedule/attachmentupload" @remove="removeFile" />
                <!-- <el-upload
                  class="upload-demo"
                  drag
                  action="https://jsonplaceholder.typicode.com/posts/"
                  multiple>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload> -->
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="table">
      <h4>{{ $t('bud.advice.aggregateTotal') }}</h4>
      <div class="count">
        <el-table
          :data="summaryTableData"
          border
          height="250"
          style="width: 100%"
        >
          <el-table-column
            prop="nature"
            :label="$t('bud.advice.natureOfSubjects')"
          />
          <el-table-column
            prop="thatYear"
            :label="$t('bud.advice.currentAdvice')"
          />
          <el-table-column
            prop="newYears"
            :label="$t('bud.advice.crossYearAdvice')"
          />
          <el-table-column
            prop="total"
            :label="$t('bud.advice.adviceTotal')"
          />
          <el-table-column
            prop="money"
            :label="$t('bud.advice.budgetAmount')"
          />
          <el-table-column
            prop="balance"
            :label="$t('bud.advice.budgetBalance')"
          />
          <el-table-column
            prop="difference"
            :label="$t('bud.advice.difference')"
          />
        </el-table>
      </div>
      <h4>
        {{ $t('bud.advice.adviceDetail') }} <div class="add_row iconfont icon-jia" @click.stop="openAddDialog">
          {{ $t('bud.advice.appendDetail') }}
        </div>
      </h4>
      <div class="detail">
        <el-table
          :data="addTableData"
          border
          height="300"
          style="width: 100%"
        >
          <el-table-column :label="$t('comm.operation')" min-width="120" width="120" :style="{textAlign: 'center'}">
            <template slot-scope="scope">
              <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDelete(scope.row, scope.$index)" />
              <el-button size="mini" icon="el-icon-edit" type="primary" @click="handleEdit(scope.row, scope.$index)" />
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('bud.advice.subject')"
            prop="subject"
          />
          <el-table-column
            :label="$t('bud.advice.assemblyLine')"
            prop="assemblyLine"
          />
          <el-table-column
            :label="$t('bud.advice.range')"
            prop="range"
          />
          <el-table-column
            :label="$t('bud.advice.place')"
            prop="place"
          />
          <el-table-column
            :label="$t('bud.advice.useTime')"
          >
            <template slot-scope="scope">
              <p>{{ dateFtt("yyyy-MM-dd", scope.row.useTime) }}</p>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('bud.advice.budgetNo')"
            prop="number"
          />
          <el-table-column
            :label="$t('bud.advice.budgetAmount')"
            prop="money"
            :formatter="(row, column, cellValue, index)=>{return this.$options.filters['numFormat'](cellValue)}"
          />
          <el-table-column
            :label="$t('bud.advice.budgetBalance')"
            prop="balance"
          />
          <el-table-column
            :label="$t('bud.advice.inBudgetAmount')"
            prop="inMoney"
          />
          <el-table-column
            :label="$t('bud.advice.outBudgetAmount')"
            prop="outMoney"
          />
        </el-table>
      </div>
      <div class="submit">
        <el-button type="primary">
          {{ $t('bud.advice.submitApply') }}
        </el-button>
      </div>
    </div>
    <div class="addDilog">
      <el-dialog
        :title="$t('bud.advice.appendBudgetDetail')"
        :visible.sync="addDilog"
        width="60%"
        center
      >
        <div class="add_advice_info">
          <h5>{{ $t('comm.essentialInformation') }}</h5>
          <div class="input_box">
            <div class="flex2">
              <div class="title">
                {{ $t('bud.advice.subject') }}
              </div>
              <div class="input">
                <el-select v-model="addDilogInfo.subject" clearable :placeholder="$t('bud.advice.select')" class="input" @change="(value) => {validator('aa', value)}">
                  <el-option
                    v-for="item in subjectList"
                    :key="item"
                    :value="item"
                  />
                </el-select>
                <span ref="aa" data-roles="required" :data-value="addDilogInfo.subject" class="message" />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t('bud.advice.assemblyLine') }}
              </div>
              <el-select v-model="addDilogInfo.assemblyLine" :placeholder="$t('bud.advice.select')" class="input">
                <el-option
                  v-for="item in assemblyLineList"
                  :key="item"
                  :value="item"
                />
              </el-select>
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t('bud.advice.range') }}
              </div>
              <el-select v-model="addDilogInfo.place" :placeholder="$t('bud.advice.select')" class="input">
                <el-option
                  v-for="item in placeList"
                  :key="item"
                  :value="item"
                />
              </el-select>
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t('bud.advice.involveScope') }}
              </div>
              <el-select v-model="addDilogInfo.range" :placeholder="$t('bud.advice.select')" class="input">
                <el-option
                  v-for="item in rangeList"
                  :key="item"
                  :value="item"
                />
              </el-select>
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t('bud.advice.useTime') }}
              </div>
              <el-date-picker
                v-model="addDilogInfo.useTime"
                class="input"
                type="month"
                :placeholder="$t('bud.advice.selectMonth')"
              />
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t('bud.advice.budgetNo') }}
              </div>
              <el-input v-model="addDilogInfo.number" placeholder="100010" class="input" disabled />
            </div>
          </div>
          <h5>{{ $t('bud.advice.fillInAmount') }}</h5>
          <div class="input_box">
            <div class="flex2">
              <div class="title">
                {{ $t('bud.advice.budgetAmount') }}
              </div>
              <div class="input">
                <!-- <el-input v-model="addDilogInfo.money" :placeholder="$t('bud.advice.inputContent')" @blur="validator('money')" /> -->
                <milli-input v-model="addDilogInfo.money" :placeholder="$t('bud.advice.inputContent')" @blur="validator('money')" />
                <span ref="money" data-roles="number" :data-value="addDilogInfo.money" class="message" />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t('bud.advice.budgetBalance') }}
              </div>
              <div class="input">
                <el-input v-model="addDilogInfo.balance" :placeholder="$t('bud.advice.inputContent')" class="input" @blur="validator('balance')" />
                <span ref="balance" data-roles="number" :data-value="addDilogInfo.balance" class="message" />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t('bud.advice.inBudgetAmount') }}
              </div>
              <div class="input">
                <el-input v-model="addDilogInfo.inMoney" :placeholder="$t('bud.advice.inputContent')" class="input" @blur="validator('inMoney')" />
                <span ref="inMoney" data-roles="number" :data-value="addDilogInfo.inMoney" class="message" />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t('bud.advice.inBudgetAmountCNY') }}
              </div>
              <el-input v-model="addDilogInfo.inMoneyCNY" :placeholder="$t('bud.advice.inputContent')" class="input" disabled />
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t('bud.advice.outBudgetAmount') }}
              </div>
              <div class="input">
                <el-input v-model="addDilogInfo.outMoney" :placeholder="$t('bud.advice.inputContent')" @blur="validator('outMoney')" />
                <span ref="outMoney" data-roles="number" :data-value="addDilogInfo.outMoney" class="message" />
              </div>
            </div>
            <div class="flex2">
              <div class="title">
                {{ $t('bud.advice.outBudgetAmountCNY') }}
              </div>
              <el-input v-model="addDilogInfo.outMoneyCNY" :placeholder="$t('bud.advice.inputContent')" class="input" disabled />
            </div>
          </div>
        </div>
        <span slot="footer">
          <!-- <el-button @click="dialogVisible = false">{{$t('comm.cancel')}}</el-button> -->
          <el-button type="primary" :disabled="!validatorState" @click="addDetail">{{ $t('comm.addTo') }}</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="editDilog">
      <el-dialog
        :title="$t('bud.advice.changeBudgetDetail')"
        :visible.sync="editDilog"
        width="60%"
        center
      >
        <div class="add_advice_info">
          <h5>{{ $t('comm.essentialInformation') }}</h5>
          <div class="basic">
            <div>
              <div class="title">
                {{ $t('bud.advice.subject') }}
              </div>
              <el-select v-model="editDilogInfo.subject" :placeholder="$t('bud.advice.select')" class="input">
                <el-option
                  v-for="item in subjectList"
                  :key="item"
                  :value="item"
                />
              </el-select>
            </div>
            <div>
              <div class="title">
                {{ $t('bud.advice.assemblyLine') }}
              </div>
              <el-select v-model="editDilogInfo.assemblyLine" :placeholder="$t('bud.advice.select')" class="input">
                <el-option
                  v-for="item in assemblyLineList"
                  :key="item"
                  :value="item"
                />
              </el-select>
            </div>
            <div>
              <div class="title">
                {{ $t('bud.advice.range') }}
              </div>
              <el-select v-model="editDilogInfo.place" :placeholder="$t('bud.advice.select')" class="input">
                <el-option
                  v-for="item in placeList"
                  :key="item"
                  :value="item"
                />
              </el-select>
            </div>
            <div>
              <div class="title">
                {{ $t('bud.advice.involveScope') }}
              </div>
              <el-select v-model="editDilogInfo.range" :placeholder="$t('bud.advice.select')" class="input">
                <el-option
                  v-for="item in rangeList"
                  :key="item"
                  :value="item"
                />
              </el-select>
            </div>
            <div>
              <div class="title">
                {{ $t('bud.advice.useTime') }}
              </div>
              <el-date-picker
                v-model="editDilogInfo.useTime"
                class="input"
                type="month"
                :placeholder="$t('bud.advice.selectMonth')"
              />
            </div>
            <div>
              <div class="title">
                {{ $t('bud.advice.budgetNo') }}
              </div>
              <el-input v-model="editDilogInfo.number" placeholder="100010" class="input" disabled />
            </div>
          </div>
          <h5>{{ $t('bud.advice.amountChange') }}</h5>
          <div class="budget">
            <div>
              <div class="title">
                {{ $t('bud.advice.budgetAmount') }}
              </div>
              <el-input v-model="editDilogInfo.money" :placeholder="$t('bud.advice.inputContent')" class="input" />
            </div>
            <div>
              <div class="title">
                {{ $t('bud.advice.budgetBalance') }}
              </div>
              <el-input v-model="editDilogInfo.balance" :placeholder="$t('bud.advice.inputContent')" class="input" />
            </div>
            <div>
              <div class="title">
                {{ $t('bud.advice.inBudgetAmount') }}
              </div>
              <el-input v-model="editDilogInfo.inMoney" :placeholder="$t('bud.advice.inputContent')" class="input" />
            </div>
            <div>
              <div class="title">
                {{ $t('bud.advice.inBudgetAmountCNY') }}
              </div>
              <el-input v-model="editDilogInfo.inMoneyCNY" :placeholder="$t('bud.advice.inputContent')" class="input" disabled />
            </div>
            <div>
              <div class="title">
                {{ $t('bud.advice.outBudgetAmount') }}
              </div>
              <el-input v-model="editDilogInfo.outMoney" :placeholder="$t('bud.advice.inputContent')" class="input" />
            </div>
            <div>
              <div class="title">
                {{ $t('bud.advice.outBudgetAmountCNY') }}
              </div>
              <el-input v-model="editDilogInfo.outMoneyCNY" :placeholder="$t('bud.advice.inputContent')" class="input" disabled />
            </div>
          </div>
        </div>
        <span slot="footer">
          <!-- <el-button @click="dialogVisible = false">{{$t('comm.cancel')}}</el-button> -->
          <el-button type="primary" @click="editDetail">确定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Attachement from '@/components/Attachement'
import { formValidator } from '@/mixins/form-validator.js'
import { numFormat } from '@/mixins/num-format.js'
import MilliInput from '@/components/MilliInput.vue'
export default {
  components: {
    Attachement,
    MilliInput
  },
  filters: {
    dateFormat(value) {
      console.log(value)
      // console.log(this.dateFtt)
      // this.dateFtt("yyyy-MM-dd hh:mm:ss", value)
    }
  },
  mixins: [formValidator, numFormat],
  data() {
    return {
      addDilog: false,
      editDilog: false,
      fileList: [
        { name: '12345.jpg', uid: '1234567' },
        { name: '12455345.jpg', uid: '123334567' },
        { name: '12555345.jpg', uid: '12664567' }
      ],
      uploadShow: true,
      year: '',
      value1: '',
      yearList: [2019, 2020, 2021],
      textarea3: '',
      activeNames: ['1'],
      summaryTableData: [
        {
          nature: '投资',
          thatYear: '0.00',
          newYears: '0.00',
          total: '00',
          money: '00',
          balance: '00',
          difference: '00'
        },
        {
          nature: '经费',
          thatYear: '0.00',
          newYears: '0.00',
          total: '00',
          money: '00',
          balance: '00',
          difference: '00'
        },
        {
          nature: '总计',
          thatYear: '0.00',
          newYears: '0.00',
          total: '00',
          money: '00',
          balance: '00',
          difference: '00'
        }
      ],
      addTableData: [
        {
          subject: '科目',
          assemblyLine: '流水线',
          range: '使用场所',
          place: '涉及范围',
          useTime: '',
          number: '预算NO',
          money: '预算金额',
          balance: '预算余额',
          inMoney: '预算内金额',
          outMoney: '预算外金额'
        }
      ],
      addDilogInfo: {
        subject: '',
        assemblyLine: '',
        range: '',
        place: '',
        useTime: '',
        money: '',
        balance: '',
        inMoney: '',
        inMoneyCNY: '',
        outMoney: '',
        outMoneyCNY: ''
      },
      subjectList: ['科目一', '科目二', '科目三'],
      assemblyLineList: ['流水线一', '流水线二'],
      rangeList: ['范围一', '范围二'],
      placeList: ['场所一', '场所二'],
      editDilogInfo: {
        subject: '',
        assemblyLine: '',
        range: '',
        place: '',
        useTime: '',
        money: '',
        balance: '',
        inMoney: '',
        inMoneyCNY: '',
        outMoney: '',
        outMoneyCNY: ''
      },
      editIndex: 0
    }
  },
  methods: {
    removeFile({ uid }) {
      this.fileList = this.fileList.filter(item => item.uid !== uid)
    },
    addDetail() {
      if (!this.validatorAll()) {
        return false
      }
      this.addDilog = false
      const arr = { ...this.addDilogInfo }
      this.addTableData = [...this.addTableData, arr]
      this.resetDilogInfo()
    },
    openAddDialog() {
      this.resetDilogInfo()
      this.addDilog = true
    },
    handleDelete(row, index) {
      this.$confirm('您将要删除该条数据, 是否继续?', this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(() => {
        this.addTableData.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleEdit(row, index) {
      this.editDilog = true
      this.editIndex = index
      this.editDilogInfo = { ...row }
    },
    editDetail() {
      this.editDilog = false
      console.log({ ...this.editDilogInfo })
      console.log(this.editIndex)
      console.log(this.addTableData[this.editIndex])
      const tableData = [...this.addTableData]
      tableData[this.editIndex] = { ...this.editDilogInfo }
      this.addTableData = tableData
    },
    dateFtt(fmt, date) {
      if (!date) {
        date = new Date()
      }
      const o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
      return fmt
    },
    resetDilogInfo() {
      for (const k in this.addDilogInfo) {
        this.addDilogInfo[k] = ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .advice {
    // height: 100%;
    width: 100%;
    padding: 20px;
    // height: 100%;
    box-sizing: border-box;
    border-radius: 6px;
    background-color: #fff;
    box-sizing: border-box;
    h4 {
      height: 35px;
      line-height: 35px;
      font-size: 18px;
      color: rgb(50, 50, 50);
      border-bottom: 1px dashed #ccc;
      margin-bottom: 10px;
      margin-top: 20px;
      position: relative;
      .add_row {
        position: absolute;
        right: 0;
        bottom: 2px;
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
    .content {
      // padding: 20px 0;
      // padding-top: 30px;
      .info {
        width: 100%;
        .top {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          &>div {
            width: 33.33%;
            box-sizing: border-box;
            padding: 5px 20px;
            display: flex;
            align-items: center;
            .title {
              font-size: 14px;
              width: 130px;
            }
            .input {
              flex: 1;
            }
          }
        }
        .down {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          &>div {
            width: 100%;
            display: flex;
            box-sizing: border-box;
            padding: 5px 20px;
            // padding: 10px 20px;
            align-items: center;
            .title {
              font-size: 14px;
              width: 130px;
            }
            .input {
              flex: 1;
            }
          }
        }
        .enclosure {
          // display: flex;
          box-sizing: border-box;
          align-items: center;
          padding: 0 20px;
          font-size: 14px;
          .title {
            display: flex;
            flex-wrap: wrap;
            padding-bottom: 6px;
            width: 100%;
            border-bottom: 1px solid #ddd;
            margin-bottom: 10px;
            cursor: pointer;
            span {
              display: block;
              transition: all 0.3s linear;
              &:last-child {
                padding-left: 10px;
              }
            }
            .iconfont {
              font-size: 14px;
            }
            .show {
              transform: rotate(90deg)
            }
          }
        }
      }
    }
    .table {
      background: #fff;
      border-radius: 0 0 6px 6px;
      .submit {
        margin-top: 20px;
        text-align: right;
      }
    }
    .addDilog, .editDilog {
      .add_advice_info {
        h5 {
          font-size: 16px;
          line-height: 35px;
          height: 35px;
          // border-bottom: 1px dashed #ccc;
        }
        .basic {
          margin-bottom: 15px;
          display: flex;
          flex-wrap: wrap;
          &>div {
            min-width: 300px;
            width: 50%;
            padding: 12px 0;
            padding-right: 10%;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            .title {
              width: 120px;
            }
            .input {
              flex: 1;
            }
          }
        }
        .budget {
          display: flex;
          flex-wrap: wrap;
          &>div {
            min-width: 300px;
            width: 50%;
            padding: 12px 0;
            padding-right: 10%;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            .title {
              width: 120px;
            }
            .input {
              flex: 1;
              position: relative;
              .message {
                position: absolute;
                left: 0;
                height: 20px;
                line-height: 20px;
                padding-left: 5px;
                font-size: 12px;
                color: red;
                top: 100%;
              }
            }
          }
        }
      }
    }
  }
</style>
<style lang="scss">
.advice {
  .info {
    .el-select {
      flex: 1;
      box-sizing: border-box;
      .el-input__inner {
        height: 40px;
      }
    }
    .el-date-editor {
      // width: 100%;
      flex: 1;
    }
    .el-textarea {
      flex: 1;
    }
  }
}
</style>
