<template>
  <div style="display: flex;flex-direction: column;height: 100%;">
    <div class="middle-box">
      <div class="dialog-search-box middle-input">
        <el-form ref="searchForm" :model="form" label-width="80px" label-position="left">
          <el-row type="flex" justify="space-between">
            <el-col :span="7">
              <el-form-item label="报价编号" prop="identiferNum">
                <el-input v-model="form.identiferNum" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="报价名称" prop="identiferName">
                <el-input v-model="form.identiferName" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="客户编号" prop="accountNum">
                <el-select v-model="form.accountNum" style="width:100%" placeholder="请选择" :popper-class="this.theme=='Light' ? 'blueSelect' : ''">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="24">
              <el-form-item label="联系地址" prop="address">
                <el-input v-model="form.address" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="24">
              <el-form-item label="报价种类" prop="quotationType" class="checkout-height-box">
                <el-checkbox-group v-model="form.quotationType">
                  <el-checkbox label="合同" />
                  <el-checkbox label="报价" />
                  <el-checkbox label="提案" />
                  <el-checkbox label="审议" />
                  <el-checkbox label="做成" />
                  <el-checkbox label="撤回" />
                  <el-checkbox label="失效" />
                  <el-checkbox label="跨年合同" />
                  <el-checkbox label="社内案件" />
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="7">
              <el-form-item label="是否有效" prop="iseffective">
                <el-radio-group v-model="form.iseffective">
                  <el-radio :label="true">
                    有效
                  </el-radio>
                  <el-radio :label="false">
                    无效
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="创建人" prop="creatName">
                <el-input v-model="form.creatName" />
              </el-form-item>
            </el-col>
            <el-col :span="7" />
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="7">
              <el-form-item label="创建日期" prop="creatDate">
                <el-date-picker v-model="form.creatDate" type="date" class="search-date-box" :clearable="false" placeholder="日期选择" :popper-class="this.theme=='Light' ? 'blueDate' : ''" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="联系人" prop="contacts">
                <el-popover v-model="contactsPopover" placement="bottom" width="auto" trigger="click" :popper-class="this.theme=='Light' ? 'tree-poper blueTree' : 'tree-poper'">
                  <el-tree :data="contacts" accordion @node-click="getContactsChecked" />
                  <el-input slot="reference" v-model="form.contacts" readonly />
                </el-popover>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="报价金额" prop="quotationMoney">
                <el-input v-model="form.quotationMoney" type="number" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item style="margin-bottom:0 !important">
            <ul class="operation-box dialog-btn-box end-content-flex">
              <li class="operation-item" @click="resetForm('searchForm')">
                <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconrefresh" /></span>
                <span class="operation-text">重&nbsp;置</span>
              </li>
              <li class="operation-item">
                <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconsousuo" /></span>
                <span class="operation-text">检&nbsp;索</span>
              </li>
            </ul>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="footer-box">
      <div class="dialog-table-box">
        <el-table ref="table" class="scroll-table-box" :data="data" height="100%" stripe border @selection-change="handleSelectionChange">
          <el-table-column width="40" :resizable="false" class-name="table-radio" fixed>
            <template scope="scope">
              <el-radio v-model="radio" :label="scope.$index" class="textRadio" @change.native="getCurrentRow(scope.row)" />
            </template>
          </el-table-column>
          <el-table-column label="报价编号" width="125" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <a class="link" @click.prevent="handleNumClick(scope.row.id)">{{ scope.row.identiferNum }}</a>
            </template>
          </el-table-column>

          <el-table-column prop="quotationName" label="报价名称" min-width="230" align="center" show-overflow-tooltip />
          <el-table-column prop="quotationType" label="客户编号" width="90" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <dict-write dict-type-id="QuoType" :value="scope.row.quotationType" />
            </template>
          </el-table-column>
          <el-table-column prop="accountName" label="客户名称" align="center" width="110" show-overflow-tooltip />

          <el-table-column label="联系人" width="110" align="center" show-overflow-tooltip prop="createByName" />

          <el-table-column label="创建时间" width="120" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <p>{{ dateFtt('yyyy-MM-dd', scope.row.quotationCommitDate) }}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="createByName"
            label="报价有效期"
            width="110"
            header-align="center"
            align="right"
            show-overflow-tooltip
          >
            <template>
              <p>30</p>
            </template>
          </el-table-column>

          <el-table-column
            prop="remark"
            label="报价金额合计"
            width="130"
            header-align="center"
            align="right"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <p>{{ scope.row.id | NumFormat }}</p>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-box">
        <el-pagination
          class="page-left"
          :current-page.sync="searchParam.pageNo"
          :page-size="searchParam.pageSize"
          layout="total,sizes"
          :total="searchParam.totalRecord"
          :popper-class="theme=='Light' ? 'blueDL' : ''"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />

        <el-pagination
          class="page-right"
          :current-page.sync="searchParam.pageNo"
          :page-size="searchParam.pageSize"
          layout="prev,pager,next,slot,jumper"
          :total="searchParam.totalRecord"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
          <span class="iconfont iconjiantou-youzhi page-last-page" @click="toLastPage" />
        </el-pagination>
        <el-pagination class="page-right  page-first" layout="slot">
          <span class="iconfont iconjiantou-zuozhi page-first-page" @click="toFirstPage" />
        </el-pagination>
      </div>
    </div>
    <ul class="operation-box dialog-btn-box fixed-btn-box end-content-flex">
      <li class="operation-item" @click="onClose()">
        <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao" /></span>
        <span class="operation-text">取&nbsp;消</span>
      </li>
      <li class="operation-item" @click="onConfirm()">
        <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
        <span class="operation-text">确&nbsp;认</span>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  search
} from '@/mixins/search-params'
import {
  formValidator
} from '@/mixins/form-validator.js'
import {
  permission
} from '@/mixins/permission-mixin'
import DictWrite from '@/components/DictWrite'

import $ from 'jquery'
import 'jquery.nicescroll'
export default {
  components: {
    DictWrite
  },
  mixins: [search, formValidator, permission],
  props: {
    data: {
      type: Array,
      default: function() {
        return []
      }
    },
    radio: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      theme: localStorage.getItem('theme') != 'Dark' ? 'Light' : '',
      Height: '',
      item: null,
      contactsPopover: false,
      options: [{
        value: '1',
        label: '编号1'
      }, {
        value: '2',
        label: '编号2'
      }, {
        value: '3',
        label: '编号3'
      }],
      contacts: [{
        label: '技术统括',
        children: [{
          label: '技术统括1',
          children: [{
            label: '王二'
          }]
        }]
      }, {
        label: '营业统括',
        children: [{
          label: '营业统括1',
          children: [{
            label: '张三'
          }]
        }, {
          label: '营业统括2',
          children: [{
            label: '李四'
          }]
        }]

      }],
      form: { // 弹窗检索参数
        identifer: '',
        identiferNum: '', // 报价编号
        identiferName: '', // 报价名称
        accountNum: '', // 客户编号
        address: '',
        quotationType: [], // 报价种类
        iseffective: false, // 是否有效
        creatName: '', // 创建人
        creatDate: '', // 创建日期
        contacts: '', // 联系人
        quotationMoney: '' // 报价金额

      },
      // 分页插件数据
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null // 总条数
      }
    }
  },
  mounted() {
    console.log('data', this.data)
    this.searchParam.totalRecord = this.data.length
    // 监听滚动事件

    const dom = document.getElementsByClassName('el-dialog__body')[0]
    dom.addEventListener('scroll', this.scroll)
  },
  methods: {
    scroll() {
      this.$emit('onScroll')
      $('.el-table__body-wrapper').getNiceScroll().resize()
    },
    onClose() {
      this.$emit('onClose')
    },
    // onShowCheck() {
    //   this.$emit('onCheck')
    // },
    onConfirm() {
      this.$emit('onConfirm', this.item)
    },
    getContactsChecked(data, node, ischeck) {
      if (node.isLeaf) {
        this.form.contacts = node.label
        this.contactsPopover = false
      }
    },
    getCurrentRow(index) {
      this.item = index
      console.log('index', index)
    },

    handleSelectionChange(val) {

    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.table.toggleRowSelection(row)
        })
      } else {
        this.$refs.table.clearSelection()
      }
    },
    dateFtt(fmt, time) {
      let date
      if (!time) {
        date = new Date()
      } else {
        date = new Date(time)
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
    }
  }
}
</script>
