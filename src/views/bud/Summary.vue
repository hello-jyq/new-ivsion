<template>
  <!-- 汇总搜索页 -->
  <div class="summary">
    <div class="search">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">{{ $t('comm.essentialInformation') }}</span>
          <div class="basic">
            <div>
              <div class="title">
                公司
              </div>
              <el-input
                class="input"
                placeholder="大金空调（上海）有限公司"
                :disabled="true"
              />
            </div>
            <div>
              <div class="title">
                当前登入部门
              </div>
              <el-input
                class="input"
                placeholder="企划部"
                :disabled="true"
              />
            </div>
            <div>
              <div class="title">
                预算部门
              </div>
              <el-input
                v-model="department"
                class="input"
                placeholder="预算部门"
              />
            </div>
            <div>
              <div class="title">
                预算年度
              </div>
              <el-select v-model="year" placeholder="请选择年度" size="small" class="select">
                <el-option v-for="item in yearList" :key="item" :label="item" :value="item" />
              </el-select>
            </div>
            <div>
              <div class="title">
                预算分类
              </div>
              <el-select v-model="category" placeholder="请选择预算分类" size="small" class="select">
                <el-option v-for="item in categoryList" :key="item" :label="item" :value="item" />
              </el-select>
            </div>
            <div>
              <div class="title">
                审批状态
              </div>
              <el-select v-model="state" placeholder="请选择状态" size="small" class="select">
                <el-option v-for="item in stateList" :key="item" :label="item" :value="item" />
              </el-select>
            </div>
            <div>
              <div class="title">
                预算管理编号类型
              </div>
              <el-select v-model="numberType" placeholder="请编号类型" size="small" class="select">
                <el-option v-for="item in numberTypeList" :key="item" :label="item" :value="item" />
              </el-select>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <span slot="title" class="collapse-title">预算信息</span>
          <div class="applyInfo">
            <div>
              <div class="title">
                预算管理编号
              </div>
              <el-input
                class="input"
              />
            </div>
            <div>
              <div class="title">
                科目编号
              </div>
              <el-input
                class="input"
              />
            </div>
            <div>
              <div class="title">
                科目名称
              </div>
              <el-input
                class="input"
              />
            </div>
            <div>
              <div class="title">
                项目编号
              </div>
              <el-input
                class="input"
              />
            </div>
            <div>
              <div class="title">
                项目名称
              </div>
              <el-input
                class="input"
              />
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <span slot="title" class="collapse-title">查询方式</span>
          <div class="mode">
            <div>
              <div class="title">
                查询方式
              </div>
              <el-select v-model="pattern" placeholder="请选择查询方式" size="small" class="select">
                <el-option v-for="item in patternList" :key="item" :label="item" :value="item" />
              </el-select>
            </div>
            <div>
              <div class="title">
                合计行是否显示
              </div>
              <div class="input">
                <el-radio v-model="count" :label="1">
                  是
                </el-radio>
                <el-radio v-model="count" :label="2">
                  否
                </el-radio>
              </div>
            </div>
            <div>
              <div class="title">
                是否显示0金额预算
              </div>
              <div class="input">
                <el-radio v-model="zero" :label="1">
                  是
                </el-radio>
                <el-radio v-model="zero" :label="2">
                  否
                </el-radio>
              </div>
            </div>
            <div class="month">
              <div class="title">
                期间选择
              </div>
              <div class="input">
                <el-date-picker
                  v-model="start"
                  type="month"
                  placeholder="选择月"
                />至
                <el-date-picker
                  v-model="end"
                  type="month"
                  placeholder="选择月"
                />
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="btns">
        <el-button type="primary" class="iconfont icon-search" @click="search">
          查询
        </el-button>
      </div>
    </div>
    <div class="content">
      <el-table
        :data="tableList"
        style="width: 100%"
      >
        <el-table-column type="expand" fixed>
          <template slot-scope="props">
            <div class="valueList">
              <div v-for="item in props.row.valueList" :key="item.title" class="value_item">
                <span class="title">{{ item.title }}</span>
                <span class="value">{{ item.value }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          width="60"
          type="index"
        />
        <el-table-column
          width="120"
          label="年份"
          prop="year"
        />
        <el-table-column
          width="120"
          label="分类"
          prop="category"
        />
        <el-table-column
          label="部门"
          width="120"
          prop="department"
        />
        <el-table-column
          label="项目编号"
          width="120"
          prop="itemNumber"
        />
        <el-table-column
          label="项目名称"
          width="120"
          prop="entryName"
        />
        <el-table-column
          label="科目编号"
          width="120"
          prop="subjectNumber"
        />
        <el-table-column
          label="科目名称"
          width="120"
          prop="subjectName"
        />
        <el-table-column
          label="预算编号"
          width="120"
          prop="budgetNumber"
        />
        <el-table-column
          label="状态"
          width="120"
          prop="state"
        />
        <el-table-column
          label="申请编号"
          width="120"
          prop="applicationNumber"
        />
        <el-table-column
          label="属性"
          width="120"
          prop="attribute"
        />
        <el-table-column
          label="范围"
          width="120"
          prop="range"
        />
        <el-table-column
          label="相关性"
          width="120"
          prop="relevance"
        />
        <el-table-column
          label="分析科目"
          width="120"
          prop="analyticalSubjects"
        />
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, ->"
          :page-size.sync="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :current-page.sync="currentPage"
          :total="total"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { getSummaryList } from '@/api/demo.js'
export default {
  data() {
    return {
      activeNames: ['1', '2', '3'],
      department: '', // 预算部门
      year: '',
      yearList: [2019, 2020, 2021, 2022],
      category: '',
      categoryList: ['采购预算', '一般经费预算', '招聘预算'],
      state: '',
      stateList: ['审核中', '审核通过'],
      numberType: '',
      numberTypeList: ['类型一', '类型二'],
      count: 1,
      zero: 1,
      pattern: '',
      patternList: ['按科目汇总'],
      start: '',
      end: '',
      summaryList: [],
      isSearch: false,
      countL: null,
      // 分页插件数据
      pageSize: 10, // 每页条数
      currentPage: 1, // 当前页码
      total: null // 总条数
    }
  },
  computed: {
    countList() {
      return { year: '总计', valueList: this.countL }
    },
    tableList() {
      if (this.count === 1) {
        return [...this.summaryList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize), this.countList]
      } else {
        return this.summaryList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      }
    }
  },
  created() {
    this.__getSummaryList(this.currentPage)
  },
  methods: {
    search() {
      console.log(this.start)
      console.log(this.end)
      // console.log(this.zero)
      this.isSearch = true
      this.currentPage = 1
      const { department, year, category, state, zero } = this
      const params = {
        department,
        year,
        category,
        state,
        zero
      }
      this.__getSummaryList(params)
    },
    async __getSummaryList(params) {
      const month = (new Date(this.start).getMonth() + 1) > 9 ? (new Date(this.start).getMonth() + 1) : '0' + (new Date(this.start).getMonth() + 1)
      const endMonth = (new Date(this.end).getMonth() + 1) > 9 ? (new Date(this.end).getMonth() + 1) : '0' + (new Date(this.end).getMonth() + 1)
      const start = parseInt(String(new Date(this.start).getFullYear()) + month) || 0
      const end = parseInt(String(new Date(this.end).getFullYear()) + endMonth) || 1000000
      console.log(start)
      console.log(end)
      const res = await getSummaryList(params)
      const { summaryList, countList } = res
      console.log(res)
      this.total = summaryList.length
      let count = countList
      if (start || end) {
        summaryList.forEach(item => {
          item.valueList = item.valueList.filter(value => {
            let month = parseInt(value.title.slice(5, 7))
            if (month < 10) {
              month = '0' + month
            }
            const year = value.title.slice(0, 4)
            const count = parseInt(year + month)
            if (count >= start && count <= end) {
              return value
            }
          })
        })
        count = countList.filter(item => {
          let month = parseInt(item.title.slice(5, 7))
          if (month < 10) {
            month = '0' + month
          }
          const year = item.title.slice(0, 4)
          const count = parseInt(year + month)
          if (count >= start && count <= end) {
            return item
          }
        })
      }
      console.log(summaryList)
      this.countL = count
      this.summaryList = summaryList
    }
  }
}
</script>
<style lang="scss" scoped>
  .summary {
    width: 100%;
    // height: 100%;
    background-color: #fff;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 6px;
    // overflow: auto;
    .search {
      .basic,.applyInfo {
        display: flex;
        flex-wrap: wrap;
        &>div {
          width: 33.33%;
          min-width: 200px;
          box-sizing: border-box;
          padding: 0 30px 15px 10px;
          display: flex;
          align-items: center;
          .title {
            width: 130px;
          }
          .input {
            flex: 1;
          }
        }
      }
      .mode {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        &>div {
          padding: 0 30px 15px 10px;
          // padding: 0 20px 15px 5px;
          width: 33.33%;
          box-sizing: border-box;
          display: flex;
          align-items: center;
        }
        .month {
          width: 45%;
        }
        .title {
          width: 130px;
        }
        .input {
          flex: 1;
          display: flex;
          align-items: center;
        }
      }
      .btns {
        box-sizing: border-box;
        text-align: right;
        padding: 20px;
        .iconfont {
          font-size: 16px;
        }
      }
    }
    .content {
      // height: 100px;
      // width: 800px;
      width: 100%;
      // height: 100%;
      padding-bottom: 100px;
      // max-width: 1460px;
      // background-color: red;
      // box-sizing: border-box;
      // overflow: hidden;
      .valueList {
        width: 100%;
        overflow: auto;
        display: flex;
        // flex-wrap: wrap;
        // justify-content: space-around;
        .value_item {
          display: flex;
          flex-direction: column;
          height: 65px;
          min-width: 120px;
          padding: 0 20px;
          text-align: center;
          justify-content: space-around;
          // span {}
        }
      }
      .pagination {
        text-align: right;
        padding: 10px 0;
      }
    }
  }
</style>
<style lang="scss">
.summary {
  .search {
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
    // .el-collapse-item__header {
    // }
  }
}
</style>
