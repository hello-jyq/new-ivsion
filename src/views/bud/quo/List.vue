<template>
  <div class="apply">
    <div class="search">
      <el-collapse>
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">{{ $t('comm.queryCriteria') }}</span>
          <div class="input_box">
            <div class="flex3">
              <div class="title">
                {{ $t('bud.quo.identiferNum') }}:
              </div>
              <el-input v-model="searchParam.params.identiferNum" class="input" :placeholder="$t('bud.quo.identiferNum')" clearable />
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('bud.quo.quotationType') }}:
              </div>
              <dict-select v-model="searchParam.params.quotationType" class="input" dict-type-id="QuoType" />
              <span ref="ListQuoType" data-roles="required" :data-value="searchParam.params.quotationType" class="message" />
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('bud.quo.quotationName') }}:
              </div>
              <el-input v-model="searchParam.params.quotationName" class="input" :placeholder="$t('bud.quo.quotationName')" clearable />
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('bud.quo.pmUser') }}:
              </div>
              <!-- <el-input v-model="searchParam.params.pmUser" class="input" :placeholder="$t('bud.quo.pmUser')" clearable /> -->
              <SelectTree
                v-model="searchParam.params.pmUser"
                :props="props"
                class="input"
              />
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('bud.quo.customerName') }}:
              </div>
              <el-input v-model="searchParam.params.accountId" class="input" :placeholder="$t('bud.quo.customerName')" clearable />
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('bud.quo.creditRank') }}:
              </div>
              <el-input v-model="searchParam.params.creditRank" class="input" :placeholder="$t('bud.quo.creditRank')" clearable />
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('bud.quo.transactionsType') }}:
              </div>
              <el-select v-model="searchParam.params.transactionsType" placeholder="请选择交易种类" size="small" class="select" multiple filterable allow-create>
                <el-option v-for="item in transactionsTypeList" :key="item" :label="item" :value="item" />
              </el-select>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('bud.quo.email') }}:
              </div>
              <el-input v-model="searchParam.params.pipelineId" class="input" :placeholder="$t('bud.quo.email')" clearable />
              <!-- <el-select v-model="searchParam.params.budgetaryYear" placeholder="请选择年度" size="small" class="select" clearable>
                <el-option v-for="item in yearList" :key="item" :label="item" :value="item" />
              </el-select> -->
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('bud.quo.businessDepartment') }}:
              </div>
              <!-- <el-input v-model="searchParam.params.businessDepartment" class="input" :placeholder="$t('bud.quo.businessDepartment')" clearable /> -->
              <el-select v-model="searchParam.params.orgLevel1" placeholder="请选择统括" size="small" class="select" clearable>
                <el-option v-for="item in businessDepartmentList" :key="item" :label="item" :value="item" />
              </el-select>
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('bud.quo.department') }}:
              </div>
              <el-input v-model="searchParam.params.orgLevel2" class="input" :placeholder="$t('bud.quo.department')" clearable />
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('bud.quo.payStartDate') }}:
              </div>
              <el-date-picker
                v-model="searchParam.params.payStartDate"
                align="right"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                class="input"
              />
            </div>
            <div class="flex3">
              <div class="title">
                {{ $t('bud.quo.payAcceptDate') }}:
              </div>
              <el-date-picker
                v-model="searchParam.params.payAcceptDate"
                align="right"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                class="input"
              />
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="btns">
        <div class="left">
          <el-button v-if="hasPermission('quoNewButton')" type="primary" class="el-icon-circle-plus-outline" @click="handleAdd">
            {{ $t('comm.newlyBuild') }}
          </el-button>
          <el-button v-if="hasPermission('quoDeleteButton')" type="danger" class="el-icon-delete" @click="handleDeleteBatch">
            {{ $t('comm.batchDeletion') }}
          </el-button>
          <!-- <el-button type="primary" class="el-icon-refresh" plain @click="handleRefreshDac">
            {{ $t('comm.refreshCache') }}
          </el-button> -->
          <el-button type="success" class="el-icon-download" @click="handleExport">
            {{ $t('comm.export') }}
          </el-button>
          <el-button type="success" class="el-icon-upload2" plain @click="uploadDialog = true">
            {{ $t('comm.import') }}
          </el-button>
          <el-button type="primary" class="el-icon-refresh" plain @click="handleUpdateHistoryClick()">
            {{ $t('comm.updateHistory') }}
          </el-button>
        </div>
        <div class="right">
          <el-button type="success" class="el-icon-search" @click="search">
            {{ this.$t('comm.query') }}
          </el-button>
          <el-button type="info" class="el-icon-refresh-left" @click="reset">
            {{ this.$t('comm.reset') }}
          </el-button>
        </div>
      </div>
    </div>
    <div class="content">
      <el-table ref="table" v-loading="isLoading" :data="dacList" border style="width: 100%">
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column v-if="hasPermission('quoDeleteButton') || hasPermission('quoEditButton')" :label="$t('comm.operation')" fixed min-width="120" width="120" align="center">
          <template slot-scope="scope">
            <el-button v-if="hasPermission('quoDeleteButton')" type="danger" size="small" icon="el-icon-delete" @click="handleDelete(scope.row.id)" />
            <el-button v-if="hasPermission('quoEditButton')" type="primary" size="small" icon="el-icon-edit" @click="handleEdit(scope.row.id)" />
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('bud.quo.identiferNum')"
          fixedkwyikeyi
          width="130"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <a class="link" @click.prevent="handleProcessInstClick(scope.row.id)">{{ scope.row.identiferNum }}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="quotationType"
          :label="$t('bud.quo.quotationType')"
          fixed
          width="80"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          prop="quotationName"
          :label="$t('bud.quo.quotationName')"
          min-width="300"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          prop="salesAmount"
          :label="$t('bud.quo.salesAmount')"
          :formatter="moneyFormat"
          min-width="100"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          prop="contiAmount"
          :label="$t('bud.quo.contiAmount')"
          :formatter="moneyFormat"
          min-width="100"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          prop="pmUser"
          :label="$t('bud.quo.pmUser')"
          min-width="100"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          prop="accountId"
          :label="$t('bud.quo.customerName')"
          min-width="130"
          align="center"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          show-overflow-tooltip
        />
        <el-table-column
          prop="creditRank"
          :label="$t('bud.quo.creditRank')"
          min-width="130"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          prop="quotationCommitDate"
          :label="$t('bud.quo.quotationCommitDate')"
          min-width="140"
          :formatter="dateFormat"
          show-overflow-tooltip
        />
        <!-- <el-table-column
          prop="rightNo"
          :label="$t('bud.quo.')"
          min-width="140"
          show-overflow-tooltip
        /> -->
        <el-table-column
          prop="caseOutline"
          :label="$t('bud.quo.caseOutline')"
          min-width="140"
          show-overflow-tooltip
        />
        <el-table-column
          prop="remark"
          :label="$t('bud.quo.remarks')"
          min-width="140"
          show-overflow-tooltip
        />
        <el-table-column
          prop="updateBy"
          :label="$t('bud.quo.updateBy')"
          width="140"
          align="center"
        />
        <el-table-column
          prop="updateTime"
          :label="$t('bud.quo.updateTime')"
          width="155"
          align="center"
        />
        <el-table-column
          prop="pipelineId"
          :label="$t('bud.quo.email')"
          width="155"
          align="center"
        />
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, ->"
          :page-size="searchParam.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :current-page.sync="searchParam.pageNo"
          :total="searchParam.totalRecord"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <!-- 更新履历 -->
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
import { search } from '@/mixins/search-params'
import { deleteDac, exportDac, downloadDacTemplate } from '@/api/admin/dac-api.js'
import { getQuoInfo, deleteQuoInfo } from '@/api/bud/bud.js'
import { formValidator } from '@/mixins/form-validator.js'
import DictSelect from '@/components/DictSelect'
import { permission } from '@/mixins/permission-mixin'
import UpdateHistory from '@/components/UpdateHistory'
import SelectTree from '@/components/TreeSelect'
export default {
  components: {
    DictSelect,
    UpdateHistory,
    SelectTree
  },
  mixins: [search, formValidator, permission],
  data() {
    return {
      dialogUpdateHistoryVisible: false,
      funcNo: '',
      isLoading: true,
      dacList: [],
      multipleSelection: [],
      businessDepartmentList: ['ITS', 'BS', '営業', 'シスコン'],
      uploadDialog: false,
      props: {
        // 配置项（必选）
        value: 'id',
        label: 'name',
        children: 'children'
        // disabled:true
      },
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          id: '',
          budgetaryYear: '',
          orgLevel1: '',
          orgLevel2: '',
          customerClassification: '',
          customerName: '',
          quotationName: '',
          transactionsType: '',
          quotationType: '',
          salesman: '',
          pmUser: '',
          pjNo: '',
          pjgNo: '',
          identiferNum: '',
          payStartDate: '',
          payAcceptDate: ''
        }
      },
      transactionsTypeList: ['コンサル', '設計構築-新規', '設計構築-既存', '運用保守', '商品販売']
    }
  },
  created: function() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const res = await getQuoInfo(this.searchParam)
      if (res && res.success) {
        const { totalRecord, results } = res.datas.searchResult
        this.searchParam.totalRecord = totalRecord
        this.dacList = results
      }
      this.tableDolayout(this.$refs['table'])
      this.isLoading = false
    },
    handleDelete(id) {
      this.$confirm(this.$t('comm.tip1'), this.$t('comm.tips'), {
        confirmButtonText: this.$t('comm.certain'),
        cancelButtonText: this.$t('comm.cancel'),
        type: 'warning'
      }).then(async() => {
        await deleteQuoInfo({ id: id })
        this.search()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg1')
        })
      })
    },
    handleDeleteBatch() {
      if (this.multipleSelection.length > 0) {
        this.$confirm(this.$t('comm.tip2'), this.$t('comm.tips'), {
          confirmButtonText: this.$t('comm.certain'),
          cancelButtonText: this.$t('comm.cancel'),
          type: 'warning'
        }).then(() => {
          const ids = this.multipleSelection.map(item => item.id)
          deleteDac(ids).then(() => {
            this.search()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('comm.msg1')
          })
        })
      } else {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      }
    },
    handleExport() {
      exportDac('xlsx', this.searchParam.params)
    },
    handleAdd() {
      this.identiferNum = 0
      this.params = {}
      this.$router.push('/quotation/apply')
    },
    handleEdit(id) {
      localStorage.setItem('editId', id)
      this.$router.push({ path: '/quotation/edit' })
    },
    handleUploadSuccess(res, file, fileList) {
      console.log(res)
      console.log(file)
      console.log(fileList)
    },
    handleUploadError(res, file, fileList) {
      console.log(res)
      console.log(file)
      console.log(fileList)
    },
    handleTemplateDownload() {
      downloadDacTemplate()
    },
    handleProcessInstClick: function(processInstId) {
      localStorage.setItem('detatilId', processInstId)
      this.$router.push('/quotation/detail')
    },
    moneyFormat(row, column, cellValue, index) {
      var num = cellValue + ''
      if (num === 'undefined' || num === '' || num === 'null') {
        return '0.00'
      }
      let reg = null
      let formatedValue = null
      if (num.indexOf('.') > -1) {
        reg = /(\d)(?=(\d{3})+\.)/g
        formatedValue = (num + '').replace(reg, '$1,')
        const vs = num.split('.')
        if (vs[1].length === 1) {
          formatedValue = formatedValue + '0'
        } else if (vs[1].length === 0) {
          formatedValue = formatedValue + '00'
        }
        return formatedValue
      } else {
        reg = /\d{1,3}(?=(\d{3})+$)/g
        formatedValue = (num + '').replace(reg, '$&,') + '.00'
        return formatedValue
      }
    },
    dateFormat(row, column, cellValue, index) {
      const arr = cellValue.split('T')
      const ymd = arr[0]
      const dateArr = ymd.split('-')

      const date = parseInt(dateArr[0]) + '年' + parseInt(dateArr[1]) + '月' + parseInt(dateArr[2]) + '日'
      return date
    },

    handleUpdateHistoryClick() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      } else if (this.multipleSelection.length > 1) {
        this.$message({
          type: 'info',
          message: this.$t('comm.msg3')
        })
      } else {
        this.funcNo = this.multipleSelection[0].identiferNum
        this.dialogUpdateHistoryVisible = true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .apply {
    .dialog {
      .createBox {
        height: 460px;
        overflow: auto;
        h4 {
          height: 30px;
          line-height: 30px;
          font-size: 16px;
          border-bottom: 1px dashed #ccc;
          color: rgb(50, 50, 50);
          margin-bottom: 10px;
          padding: 10px 0;
          position: relative;
          .tip {
            position: relative;
            top: -5px;
            left: 0;
          }
          .add_row {
            position: absolute;
            right: 0;
            bottom: 10px;
            border-radius: 6px;
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
          .add_field {
            position: absolute;
            right: 120px;
            bottom: 10px;
            border-radius: 6px;
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
        .object {
          .iconfont {
            font-size: 12px;
          }
          .table {
            input {
              height: 35px;
              width: 100%;
              box-sizing: border-box;
              border: 1px solid #dcdfe6;
              border-radius: 4px;
              transition: border-color .2s cubic-bezier(.645,.045,.355,1);
              padding: 0 10px;
              &:focus {
                outline: none;
                border-color: #409eff;
              }
            }
            textarea {
              width: 100%;
              padding: 0 10px;
              box-sizing: border-box;
              border: 1px solid #dcdfe6;
              border-radius: 4px;
              transition: border-color .2s cubic-bezier(.645,.045,.355,1);
              &:focus {
                outline: none;
                border-color: #409eff;
              }
            }
          }
        }
        .visitor {
          .iconfont {
            font-size: 12px;
          }
          .table {
            input {
              height: 35px;
              width: 100%;
              box-sizing: border-box;
              border: 1px solid #dcdfe6;
              border-radius: 4px;
              padding: 0 10px;
              transition: border-color .2s cubic-bezier(.645,.045,.355,1);
              &:focus {
                outline: none;
                border-color: #409eff;
              }
            }
          }
        }
      }
    }
  }
</style>

