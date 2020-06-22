<template>
<div :class="theme=='Light'?'no-search-content-box advice-apply edit-light':'no-search-content-box advice-apply edit-dark'">
    <div class="header-banner">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <div class="slide-content">
                    <div class="slide-icon"><i class="iconfont iconhuodong-" /></div>
                    <div class="slide-text">活动(10)</div>
                  </div>
                </div>
                <div class="swiper-slide noData-active">
                  <div class="slide-content">
                    <div class="slide-icon"><i class="iconfont iconhuodong-" /></div>
                    <div class="slide-text">活动(0)</div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="slide-content">
                    <div class="slide-icon"><i class="iconfont iconnav_promoter" /></div>
                    <div class="slide-text">客户(10)</div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="slide-content">
                    <div class="slide-icon"><i class="iconfont iconyingyeqingkuang" /></div>
                    <div class="slide-text">营业(10)</div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="slide-content">
                    <div class="slide-icon"><i class="iconfont iconbaojiadan" /></div>
                    <div class="slide-text">报价(10)</div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="slide-content">
                    <div class="slide-icon"><i class="iconfont iconfanli" /></div>
                    <div class="slide-text">返利(10)</div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="slide-content">
                    <div class="slide-icon"><i class="iconfont iconyingyeqingkuang" /></div>
                    <div class="slide-text">营业(10)</div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="slide-content">
                    <div class="slide-icon"><i class="iconfont iconbaojiadan" /></div>
                    <div class="slide-text">报价(10)</div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="slide-content">
                    <div class="slide-icon"><i class="iconfont iconfanli" /></div>
                    <div class="slide-text">返利(10)</div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="slide-content">
                    <div class="slide-icon"><i class="iconfont iconyingyeqingkuang" /></div>
                    <div class="slide-text">营业(10)</div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="slide-content">
                    <div class="slide-icon"><i class="iconfont iconbaojiadan" /></div>
                    <div class="slide-text">报价(10)</div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="slide-content">
                    <div class="slide-icon"><i class="iconfont iconfanli" /></div>
                    <div class="slide-text">返利(10)</div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="slide-content">
                    <div class="slide-icon"><i class="iconfont iconyingyeqingkuang" /></div>
                    <div class="slide-text">营业(10)</div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="slide-content">
                    <div class="slide-icon"><i class="iconfont iconbaojiadan" /></div>
                    <div class="slide-text">报价(10)</div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="slide-content">
                    <div class="slide-icon"><i class="iconfont iconfanli" /></div>
                    <div class="slide-text">返利(10)</div>
                  </div>
                </div>               
            </div>
            <div class="edit-prev-btn">
              <div class="swiper-button-prev edit-prev" >
                <i class="iconfont iconjiantouarrowhead7" />
              </div>
            </div>
            <div class="edit-next-btn">
              <div class="swiper-button-next edit-next">
                <i class="iconfont iconjiantouyou" />    
              </div>
            </div>
        </div>

    </div>
    <div class="table-bg-box">
      <div class="box-header">
        <div class="box-header-title">基本信息</div>
        <div class="box-header-info">版本号：7</div>
        <div class="box-header-info">报价编号：PIP201904099</div>
      </div>
      <el-form :model="form" :rules="rules" label-width="100px" label-position="left" class="content-top-form">
              <el-row type="flex" justify="space-between">
                <el-col :span="7">
                  <el-form-item label="Pipeline编号" class="big-input">
                    <el-input v-model="form.organizationName" disabled>
                      <i slot="suffix" class="iconfont iconbuke" />
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="禀议部门" prop="department" class="big-input">
                  <el-select v-model="form.department" placeholder="请选择" style="width:100%" :popper-class="theme=='Light'?'blueSelect':''">
                    <el-option label="禀议部门一" value="shanghai"></el-option>
                    <el-option label="禀议部门二" value="beijing"></el-option>
                  </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="7" >
                  <el-form-item label="事业统括" prop="Management" class="big-input">
                    <el-select v-model="form.Management" placeholder="请选择" style="width:100%" :popper-class="theme=='Light'?'blueSelect':''">
                    <el-option label="事业统括一" value="shanghai"></el-option>
                    <el-option label="事业统括二" value="beijing"></el-option>
                  </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" justify="space-between">
                <el-col :span="7">
                  <el-form-item label="PJ No." class="big-input" >
                    <el-input v-model="form.pjNO" disabled>
                      <i slot="suffix" class="iconfont iconbuke" />
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="使用人" prop="user" class="big-input">
                    <el-input v-model="form.user" disabled>
                      <i slot="suffix" class="iconfont iconbuke" />
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="版本号" class="big-input">
                    <el-input v-model="form.version" >
                        <i slot="suffix" class="iconfont iconsousuo"  />
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" justify="space-between">
                <el-col :span="7">
                  <el-form-item label="项目名称" prop="proj" class="big-input">
                   <el-input v-model="form.proj" >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="信用等级" class="big-input">
                    <el-input v-model="form.credit" >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7" />
              </el-row>
              <el-row type="flex" justify="space-between">
                <el-col :span="7">
                  <el-form-item label="客户基本合同" class="big-input">
                    <el-radio-group v-model="form.contract">
                      <el-radio label="1">
                        有效
                      </el-radio>
                      <el-radio label="2">
                        无效
                      </el-radio>
                  </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="客户名称" prop="cus" class="big-input">
                    <el-input v-model="form.cus" >
                      <i slot="suffix" class="iconfont iconsousuo"  />
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7" />
              </el-row>
              <el-row type="flex" justify="space-between">
                <el-col :span="7">
                  <el-form-item label="发送预定日" prop="sendDate" class="big-input">
                    <el-date-picker v-model="form.sendDate" type="date" class="search-date-box" :clearable="false" placeholder="日期选择" :popper-class="this.theme=='Light' ? 'blueDate' : ''" />
                  </el-form-item>         
                </el-col>
                <el-col :span="7">
                  <el-form-item label="客户基本合同" class="big-input">
                    <el-input v-model="form.usercontract" disabled>
                      <i slot="suffix" class="iconfont iconbuke" />
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="客户DNA合同" class="big-input">
                    <el-input v-model="form.dnacontract" disabled>
                      <i slot="suffix" class="iconfont iconbuke" />
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
               <el-form-item label="案件概要" prop="remark" class="big-input">
                <el-input v-model="form.summary" type="textarea"  class="textarea-height">
                </el-input>
              </el-form-item>
            </el-form>
    </div>
    <div class="table-bg-box">
      <div class="box-header" style="margin-bottom:10px">
        <div class="box-header-title" >重要选项</div>       
      </div>
      <el-form :model="form" :rules="rules" label-width="100px" label-position="left" class="content-top-form">
            <el-row type="flex" justify="space-between">
              <el-col :span="24">
                <el-form-item label-width="0px"  class="checkout-height-box">
                  <el-checkbox-group v-model="form.importantCheck">
                    <el-checkbox label="首次交易客户" />
                    <el-checkbox label="首次交易供应商" />
                    <el-checkbox label="预约交易" />
                    <el-checkbox label="库存交易" />
                    <el-checkbox label="跨统括项目" />
                    <el-checkbox label="跨事业部项目" />
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
            </el-form>
    </div>
    <div class="table-bg-box">
      <div class="box-header">
        <div class="box-header-title">重要选项</div>       
      </div>
      <el-form :model="form" :rules="rules" label-width="100px" label-position="left" class="content-top-form">
        <el-row type="flex" justify="space-between">
          <el-col :span="7">
            <el-form-item label="请款开始月" prop="startMonth" class="big-input">
              <el-date-picker v-model="form.startMonth" type="month" class="search-date-box" :clearable="false" placeholder="选择开始月份" :popper-class="this.theme=='Light' ? 'blueDate' : ''" />
            </el-form-item>   
          </el-col>
          <el-col :span="7">
            <el-form-item label="请款结束月" prop="endMonth" class="big-input">
              <el-date-picker v-model="form.endMonth" type="month" class="search-date-box" :clearable="false" placeholder="选择结束月份" :popper-class="this.theme=='Light' ? 'blueDate' : ''" />
            </el-form-item>   
          </el-col>
          <el-col :span="7" >
            <el-form-item >
              <ul class="operation-box dialog-btn-box end-content-flex mcbtn" style="padding:0 !important">
                <li class="operation-item"  style="margin:0 !important">
                  <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconsousuo" /></span>
                  <span class="operation-text">检&nbsp;索</span>
                </li>
              </ul>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="advice-edit-table">
        <hot-table ref="textHot" :settings="hotSettings" />
      </div>
      <!-- <el-table    
      border
      style="width: 100%; margin-top: 20px">
      <el-table-column
        prop="id"
        label="数据年度">
      </el-table-column>
      <el-table-column
        prop="name"
        label="年度计上">
      </el-table-column>
      <el-table-column
        prop="amount1"
        label="增值税">
      </el-table-column>
      <el-table-column
        prop="amount2"
        label="一月">
      </el-table-column>
      <el-table-column
        prop="amount3"
        label="二月">
      </el-table-column>
          <el-table-column
        prop="amount2"
        label="三月">
      </el-table-column>
      <el-table-column
        prop="amount3"
        label="四月">
      </el-table-column>
          <el-table-column
        prop="amount2"
        label="五月">
      </el-table-column>
      <el-table-column
        prop="amount3"
        label="六月">
      </el-table-column>
          <el-table-column
        prop="amount2"
        label="七月">
      </el-table-column>
      <el-table-column
        prop="amount3"
        label="八月">
      </el-table-column>
          <el-table-column
        prop="amount2"
        label="九月">
      </el-table-column>
      <el-table-column
        prop="amount3"
        label="十月">
      </el-table-column>
      <el-table-column
        prop="amount2"
        label="十一月">
      </el-table-column>
      <el-table-column
        prop="amount3"
        label="十二月">
      </el-table-column>
    </el-table> -->
    </div>
    <div class="table-bg-box up">
      <div class="box-header" style="margin-bottom:15px">
        <div class="box-header-title">其他信息</div>       
      </div>
      <el-form :model="form" :rules="rules" label-width="50px" label-position="left" class="content-top-form">
        <el-row type="flex" justify="space-between">
          <el-col :span="24" >
            <el-form-item label="附件">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-change="handleChange"
               >
                 <ul class="operation-box dialog-btn-box end-content-flex mcbtn" style="padding:0 !important">
                 <li class="operation-item"  style="margin:0 !important">
                 
                  <span class="operation-text"><i class="iconfont iconshangchuan" /> &nbsp;上传</span>
                 </li>
                 </ul>
              </el-upload>
              
            </el-form-item>
             <el-form-item class="file">
                <div  v-for="(item,index) in fileList" :key="index" class="fileList">
                  <span class="file-lable"> 附件{{index+1}}</span><span class="file-name">{{item.name}}</span>
                  <span @click="removeFile(item,index)"  class="file-delete"><i class="iconfont iconshanchu1"></i>&nbsp;删除</span>
                </div>
            </el-form-item>   
              <el-form-item label="备注" prop="remark" class="big-input">
                <el-input v-model="form.summary" type="textarea"  class="textarea-height" >
                </el-input>
              </el-form-item>     
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="7"> 
            <el-form-item label="创建时间" label-width="100px" class="big-input">
             <el-date-picker v-model="form.creditDate" type="date" class="search-date-box" :clearable="false" placeholder="日期选择" :popper-class="this.theme=='Light' ? 'blueDate bule' : ''" />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="创建者"  label-width="100px"  class="big-input">
             <el-input v-model="form.creditCus"/>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="最后修改时间"  label-width="100px"  class="big-input">
              <el-date-picker v-model="form.lastChangeDate" type="date" class="search-date-box" :clearable="false" placeholder="日期选择" :popper-class="this.theme=='Light' ? 'blueDate bule' : ''" />
            </el-form-item>
          </el-col>     
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="7">
            <el-form-item label="最后修改者"  label-width="100px"  class="big-input">
             <el-input v-model="form.lastChangeCus"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form> 
    </div>
    <div class="table-bg-btn">
       <ul class="operation-box">
          <li class="operation-item" >
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbaocun" /></span>
            <span class="operation-text">保&nbsp;存</span>
          </li>
          <li class="operation-item">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconbianji" /></span>
            <span class="operation-text">编&nbsp;辑</span>
          </li>
          <li class="operation-item" >
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconshanchu" /></span>
            <span class="operation-text">删&nbsp;除</span>
          </li>
          <li class="operation-item">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont icontongguo" /></span>
            <span class="operation-text">审批履历</span>
          </li>
          <li class="operation-item">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont icontongguo" /></span>
            <span class="operation-text">历史版本一览</span>
          </li>
          <li class="operation-item">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconxiazai1" /></span>
            <span class="operation-text">报价下载</span>
          </li>
          <li class="operation-item">
            <span class="operation-circle circle-middle-btn btn-light-color"><i class="iconfont iconrefresh" /></span>
            <span class="operation-text">更新履历</span>
          </li>
          <li class="operation-item">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconqueren" /></span>
            <span class="operation-text">同&nbsp;意</span>
          </li>
          <li class="operation-item">
            <span class="operation-circle circle-middle-btn btn-light-color"><i class="iconfont iconquxiao" /></span>
            <span class="operation-text">驳&nbsp;回</span>
          </li>
          <li class="operation-item">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconwithdraw-fill" /></span>
            <span class="operation-text">返&nbsp;回</span>
          </li>
          <li class="operation-item">
            <span class="operation-circle circle-middle-btn btn-light-color bluebg"><i class="iconfont iconquxiao2" /></span>
            <span class="operation-text">审批取消</span>
          </li>
        </ul>
    </div>
    
 </div>   
</template>
<script>
import Swiper from 'swiper/dist/js/swiper.js'
import Handsontable from 'handsontable'
import { HotTable } from '@handsontable/vue'
export default {
  name: 'comEdit',
  data() {
    return {
      theme: localStorage.getItem('theme') != 'Dark' ? 'Light' : '',
      form: {
        pNO: '2020',
        department: '菱威深根部门',
        Management: 'ITS；BS；营业；管理',
        pjNO: 'label',
        user: '渣渣辉',
        version: '树选择',
        proj: '',
        credit: '',
        contract: '1',
        cus: '',
        sendDate: '',
        usercontract: '有',
        dnacontract: '无',
        summary: '',
        importantCheck: ['预约交易', '跨事业部项目'],
        startMonth: '',
        endMonth: '',
        editTable: '',
        otherSummary: '',
        creditDate: '',
        creditCus: '',
        lastChangeDate: '',
        lastChangeCus: ''
      },
      rules: {
        department: [
          { required: true, message: '请输入模板名称', trigger: 'change' }
        ],
        Management: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        user: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        proj: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        cus: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        sendDate: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        startMonth: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        endtMonth: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]
      },
      fileList: [{
        name: '2020开发部.xlsx',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }, {
        name: '2021开发部.xlsx',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }, {
        name: '2022开发部.xlsx',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }],
      hotSettings: {
        width: '100%',
        height: '100%',
        className: 'editTable',
        // rowHeights: 40, // 行高
        // 定义数据
        data: [
          {
            'id': 'item10001',
            'jan': '-',
            'feb': '-',
            'mar': '20,000.00',
            'apr': '-',
            'may': '-',
            'jun': '-',
            'jul': '-',
            'aug': '-',
            'sept': '-',
            'oct': '-',
            'nov': '80,000.00',
            'dec': '-',
            'yearData': '2019',
            'plan': '250,000.00',
            'VAT': '13%'

          },
          {
            'id': 'item10002',
            'jan': '-',
            'feb': '-',
            'mar': '-',
            'apr': '-',
            'may': '-',
            'jun': '-',
            'jul': '-',
            'aug': '-',
            'sept': '-',
            'oct': '-',
            'nov': '120,000.00',
            'dec': '-',
            'yearData': '2019',
            'plan': '250,000.00',
            'VAT': '6%'
          },
          {
            'id': 'item10003',
            'jan': '-',
            'feb': '-',
            'mar': '20,000.00',
            'apr': '-',
            'may': '-',
            'jun': '-',
            'jul': '-',
            'aug': '-',
            'sept': '-',
            'oct': '-',
            'nov': '80,000.00',
            'dec': '-',
            'yearData': '2020',
            'plan': '75,000.00',
            'VAT': '13%'
          },
          {
            'id': 'item10004',
            'jan': '-',
            'feb': '-',
            'mar': '20,000.00',
            'apr': '-',
            'may': '-',
            'jun': '-',
            'jul': '-',
            'aug': '-',
            'sept': '-',
            'oct': '-',
            'nov': '-',
            'dec': '-',
            'yearData': '2021',
            'plan': '10,000.00',
            'VAT': '13%'
          }
        ],
        // 定义表结构
        colHeaders: [
          '数据年度',
          '年度计上',
          '增值税',
          '一月',
          '二月',
          '三月',
          '四月',
          '五月',
          '六月',
          '七月',
          '八月',
          '九月',
          '十月',
          '十一月',
          '十二月'
        ],
        //  单元格宽
        //  colWidths: [60, 135, 135, 135, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102],
        columns: [
          // 添加每一列的数据类型和一些配置
          {
            data: 'yearData', // 类别,
            type: 'text',
            className: 'htMiddle  notread',
            readOnly: true,
          },
          {
            data: 'plan', // 合计
            type: 'numeric',
            className: 'htMiddle htRight',
            readOnly: true,
          },
          {
            data: 'VAT',
            type: 'numeric',
            className: 'htMiddle htRight tdNone'
          },
          {
            data: 'jan',
            type: 'numeric',
            className: 'htMiddle htRight'
          },
          {
            data: 'feb',
            type: 'numeric',
            className: 'htMiddle htRight'
          },
          {
            data: 'mar',
            type: 'numeric',
            className: 'htMiddle htRight'
          }, {
            data: 'apr',
            type: 'numeric',
            className: 'htMiddle htRight'
          },
          {
            data: 'may', // 五月
            type: 'numeric',
            className: 'htMiddle htRight'
          },
          {
            data: 'jun', // 六月
            type: 'numeric',
            className: 'htMiddle htRight'
          },
          {
            data: 'jul', // 七月
            type: 'numeric',
            className: 'htMiddle htRight'
          },
          {
            data: 'aug', // 八月
            type: 'numeric',
            className: 'htMiddle htRight'
          },
          {
            data: 'sept', // 九月
            type: 'numeric',
            className: 'htMiddle htRight'
          },
          {
            data: 'oct', // 十月
            type: 'numeric',
            className: 'htMiddle htRight'
          },
          {
            data: 'nov', // 十一月
            type: 'numeric',
            className: 'htMiddle htRight'
          },
          {
            data: 'dec', // 十二月
            type: 'numeric',
            className: 'htMiddle htRight'
          }
        ],
        // hiddenColumns: {
        //   copyPasteEnabled: true,
        //   indicators: true,
        //   columns: [2, 3]
        // },
        mergeCells: [
          { row: 0, col: 0, rowspan: 2, colspan: 1 },
          { row: 0, col: 1, rowspan: 2, colspan: 1 },
        ],
        manualColumnResize: true, // 列可拖拽调整大小
        manualRowResize: false, // 列可拖拽调整大小
        manualColumnMove: false,//当值为true时，列可拖拽移动到指定列
        manualRowMove: false, //当值为true时，行可拖拽至指定行
        // autoColumnSize: true, // 自适应列大小
        possible: false,
        fillHandle: false, // 选中拖拽复制 possible values: true, false, "horizontal", "vertical"
        fixedColumnsLeft: 0, // 固定左边列数
        fixedRowsTop: 0, // 固定顶部多少行不能垂直滚动
        stretchH: 'all', // 根据宽度横向扩展，last:只扩展最后一列，none：默认不扩展
        contextMenu: false,

      },
    }
  },
  components: {
    HotTable
  },
  mounted() {
    var mySwiper = new Swiper('.swiper-container', {
      slidesPerView: 'auto',
      loop: true,
      navigation: {
        nextEl: '.edit-next',
        prevEl: '.edit-prev',
      },

    });
  },
  methods: {
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },
    removeFile(item, index) {
      this.fileList.splice(index, 1)
    },
  }
}
</script>

<style lang="scss">
.edit-light {
  .header-banner {
    width: 100%;
    height: 102px;
    margin: 20px 0 40px 0;
    .swiper-container {
      height: 100%;
      .swiper-slide {
        width: 102px;
        height: 102px;
        padding: 21px;
        margin-left: 63px;
        background: url("../../assets/images/edit-light.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        .slide-content {
          width: 60px;
          height: 60px;
          text-align: center;
          div {
            margin: 0 auto;
          }
          .slide-icon {
            width: 28px;
            height: 28px;
            margin-bottom: 10px;
            i {
              color: #2fa5bb;
              font-size: 28px;
            }
          }
          .slide-text {
            width: 100%;
            height: 20px;
            font-family: "微软雅黑";
            font-size: 14px;
            line-height: 20px;
            color: #2fa5bb;
          }
        }
      }
      .noData-active {
        background: url("../../assets/images/edit-light-disabled.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        .slide-content {
          .slide-icon {
            i {
              color: #999999;
            }
          }
          .slide-text {
            color: #999999;
          }
        }
      }
      .edit-next-btn {
        position: absolute;
        top: 0px;
        right: 0;
        width: 40px;
        height: 102px;
        background-color: #eef2f6;
        z-index: 998;
        .edit-next {
          right: 0 !important;
        }
        .edit-prev {
          left: 0 !important;
        }
      }
      .edit-prev-btn {
        position: absolute;
        top: 0px;
        left: 0;
        width: 40px;
        height: 102px;
        background-color: #eef2f6;
        z-index: 998;
        .edit-next {
          right: 0 !important;
        }
        .edit-prev {
          left: 0 !important;
        }
      }
    }
    .edit-next,
    .edit-prev {
      width: 34px;
      height: 34px;
      padding: 0 10px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 4px 0px rgba(28, 29, 84, 0.15);
      border-radius: 50%;
      z-index: 999;
      i {
        line-height: 34px;
        color: #cccccc;
      }
    }
  }
  .table-bg-box {
    margin: 10px 0;
    .box-header {
      width: 100%;
      height: 38px;
      color: #333333;
      margin-bottom: 25px;
      .box-header-title {
        font-family: "微软雅黑";
        line-height: 38px;
        float: left;
        font-size: 16px;
        font-weight: bold;
      }
      .box-header-info {
        font-family: "微软雅黑";
        line-height: 38px;
        float: right;
        font-size: 16px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 1px 4px 1px rgba(28, 29, 84, 0.15);
        border-radius: 19px;
        padding: 0 20px;
        margin-left: 30px;
      }
    }
    form {
      label {
        color: #333333;
      }
      i {
        color: #666666 !important;
      }
      .textarea-height textarea {
        height: 120px;
      }
      .big-input .el-input__inner {
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        border: 1px solid rgba(204, 204, 204, 1);
        color: #666666;
      }
      .el-input.is-disabled .el-input__inner {
        background: rgba(221, 221, 221, 1);
        border-radius: 4px;
      }
      .el-textarea__inner {
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        border: 1px solid rgba(204, 204, 204, 1);
        color: #666666;
      }
      .el-radio__input.is-checked + .el-radio__label,
      .el-radio {
        color: #666666;
      }
      .el-radio__input.is-checked {
        .el-radio__inner {
          background-color: #ffffff;
          border-color: #cccccc;
        }
      }
      .el-radio__input {
        .el-radio__inner {
          background-color: #ffffff;
          border-color: #cccccc;
        }
      }
      .el-radio__inner::after {
        background-color: #2fa5bb;
      }
      .checkout-height-box {
        margin-bottom: 0;
        .el-checkbox {
          margin-right: 110px;
        }
        .el-checkbox__inner,
        .el-checkbox__inner:hover,
        .el-checkbox__input.is-focus .el-checkbox__inner {
          width: 22px;
          height: 22px;
          background: rgba(255, 255, 255, 1);
          border-radius: 4px;
          border: 1px solid rgba(204, 204, 204, 1);
        }
        .el-checkbox__inner::after {
          border-color: #2fa5bb;
          left: 7px;
          top: 3px;
          width: 5px;
          height: 9px;
        }
      }
      .operation-item {
        // background: url("../../assets/images/edit-btn.png") !important;
        // background-position: center;
        // background-repeat: no-repeat;
        // background-size: contain !important;
        // height: 58px;
        // box-shadow: none !important;
        // border-radius: 0 !important;
        // padding: 10px !important;
        .iconsousuo {
          color: #ffffff !important;
        }
        .iconshangchuan {
          color: #ffffff !important;
        }
        .operation-text {
          color: #333333 !important;
        }
      }
    }
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
    }
  }
  .up {
    .el-form-item {
      .el-form-item__content {
        .operation-item {
          width: 130px;
          height: 38px;
          background: linear-gradient(
            180deg,
            rgba(71, 91, 160, 1) 0%,
            rgba(47, 165, 187, 1) 100%
          ) !important;
          border-radius: 24px !important;
          box-shadow: none !important;
          .operation-text {
            padding: 0;
            width: 100%;
            color: #ffffff !important;
          }
        }
        .el-upload-list {
          display: flex;
          align-items: center;
          .el-upload-list__item {
            width: auto;
            margin-top: 30px;
          }
        }
      }
      .textarea-height textarea {
        height: 100px;
      }
    }
    .file {
      .el-form-item__content {
        display: flex;
        align-items: center;
        margin-left: 0 !important;
        .fileList {
          width: auto;
          margin-right: 75px;
          .file-lable {
            color: #333333;
            margin-right: 14px;
          }
          .file-name {
            color: #4a90e2;
            text-decoration: underline;
            margin-right: 10px;
          }
          .file-delete {
            i {
              color: #ed5565 !important;
            }
            color: #ed5565;
          }
        }
      }
    }
  }
  .advice-edit-table {
    height: 190px;
    overflow: hidden;
    .editTable {
      height: 100%;
      th {
        height: 42px;
        background: #8aa2ad;
        color: #ffffff;
        font-size: 16px;
        border-color: #dddddd;
        .relative {
          span {
            line-height: 42px;
          }
        }
      }
      td {
        line-height: 34px;
        height: 34px;
        color: #666666;
        font-size: 14px;
        border-color: #dddddd;
      }
      tr:nth-child(even) td {
        background: #f5f5f5;
      }
    }
  }
}
.edit-dark {
  .header-banner {
    width: 100%;
    height: 102px;
    margin: 20px 0 40px 0;
    .swiper-container {
      height: 100%;
      .swiper-slide {
        width: 102px !important;
        height: 102px;
        padding: 21px;
        margin-left: 63px;
        background: url("../../assets/images/edit-dark.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        .slide-content {
          width: 60px;
          height: 60px;
          text-align: center;
          margin: 0 auto;
          div {
            margin: 0 auto;
          }
          .slide-icon {
            width: 28px;
            height: 28px;
            margin-bottom: 10px;
            i {
              color: #2fa5bb;
              font-size: 28px;
            }
          }
          .slide-text {
            width: 100%;
            height: 20px;
            font-family: "微软雅黑";
            font-size: 14px;
            line-height: 20px;
            color: #2fa5bb;
          }
        }
      }
      .noData-active {
        background: url("../../assets/images/edit-dark-disabled.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        .slide-content {
          .slide-icon {
            i {
              color: #999999;
            }
          }
          .slide-text {
            color: #999999;
          }
        }
      }
      .edit-next-btn {
        position: absolute;
        top: 0px;
        right: 0;
        width: 45px;
        height: 102px;
        background-color: #26272c;
        z-index: 998;
        .edit-next {
          right: 0 !important;
        }
        .edit-prev {
          left: 0 !important;
        }
      }
      .edit-prev-btn {
        position: absolute;
        top: 0px;
        left: 0;
        width: 45px;
        height: 102px;
        background-color: #26272c;
        z-index: 998;
        .edit-next {
          right: 5px !important;
        }
        .edit-prev {
          left: 5px !important;
        }
      }
    }
    .edit-next,
    .edit-prev {
      width: 34px;
      height: 34px;
      padding: 0 10px;
      background: linear-gradient(
        180deg,
        rgba(47, 52, 58, 1) 0%,
        rgba(30, 34, 37, 1) 100%
      );
      box-shadow: -1px -1px 5px 2px rgba(255, 255, 255, 0.2),
        0px 2px 10px 4px rgba(20, 22, 26, 1);
      border: 1px solid rgba(35, 37, 40, 1);
      border-radius: 50%;
      z-index: 999;
      i {
        line-height: 34px;
        color: #cccccc;
      }
    }
  }
  .table-bg-box {
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.5);
    margin: 10px 0;
    .box-header {
      width: 100%;
      height: 38px;
      color: #333333;
      margin-bottom: 25px;
      .box-header-title {
        font-family: "微软雅黑";
        line-height: 38px;
        float: left;
        font-size: 16px;
        color: #ffffff;
        font-weight: bold;
      }
      .box-header-info {
        font-family: "微软雅黑";
        line-height: 38px;
        float: right;
        font-size: 16px;
        color: #ffffff;
        background: rgba(23, 25, 29, 1);
        box-shadow: none;
        border-radius: 19px;
        padding: 0 20px;
        margin-left: 30px;
      }
    }
    form {
      .textarea-height textarea {
        height: 120px;
      }
      .checkout-height-box {
        margin-bottom: 0;
        .el-checkbox {
          margin-right: 110px;
        }
      }
      .operation-item {
        padding: 10px;
        .iconsousuo {
          color: #ffffff !important;
        }
        .iconshangchuan {
          color: #ffffff !important;
        }
        .operation-text {
          color: #ffffff !important;
        }
      }
    }
  }
  .up {
    .el-form-item {
      .el-form-item__label {
        color: #ffffff;
      }
      .el-form-item__content {
        .operation-item {
          width: 130px;
          height: 38px;
          .operation-text {
            padding: 0;
            width: 100%;
            color: #00e2de !important;
            i {
              color: #00e2de !important;
            }
          }
        }
        .el-upload-list {
          display: flex;
          align-items: center;
          .el-upload-list__item {
            width: auto;
            margin-top: 30px;
          }
        }
      }
      .textarea-height textarea {
        height: 100px;
      }
    }
    .file {
      .el-form-item__content {
        display: flex;
        align-items: center;
        margin-left: 0 !important;
        .fileList {
          width: auto;
          margin-right: 75px;
          .file-lable {
            color: #ffffff;
            margin-right: 14px;
          }
          .file-name {
            color: #52b3ff;
            text-decoration: underline;
            margin-right: 10px;
          }
          .file-delete {
            i {
              color: #f08024 !important;
            }
            color: #f08024;
          }
        }
      }
    }
  }
  input {
    color: #ffffff !important;
  }
  input::-webkit-input-placeholder {
    color: #ffffff;
  }
  input::-moz-input-placeholder {
    color: #ffffff;
  }
  input::-ms-input-placeholder {
    color: #ffffff;
  }
  .advice-edit-table {
    height: 214px;
    overflow: hidden;
    .editTable {
      height: 100%;
      th {
        height: 46px !important;
        background: #26272c;
        border-color: #44474e;
        font-size: 16px;
        .relative {
          span {
            line-height: 46px;
            color: #ffffff;
          }
        }
      }
      td {
        line-height: 38px;
        height: 38px;
        font-size: 14px;
        color: #ffffff;
        background: #34393f;
        border-color: #44474e;
      }
      tr:nth-child(even) td {
        background: #26272c;
      }
    }
  }
}
</style>