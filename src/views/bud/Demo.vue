<template>
  <div class="demo">
    <h3>这是Demo页面</h3>
    <el-row>
      <el-button size="medium" type="primary" round @click="handleJumpBtnClick">
        跳转至'/bud/1000214518'
      </el-button>
    </el-row>
    <el-row style="margin-top:5px">
      <el-button size="small" type="primary" round @click="handleDownloadBtnClick">
        数据下载
      </el-button>
      <br>
      <br>
      <el-button size="small" type="primary" class="iconfont icon-dayin" round @click="handlePdfBtnClick">
        报表导出
      </el-button>
      <br>
      <el-select v-model="fileType" placeholder="请选择文件类型" style="margin-top:5px">
        <el-option
          v-for="item in fileTypes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-row>
    <el-row style="margin-top:5px">
      <dict-select v-model="isNo" dict-type-id="IsNo" placeholder="请输入" :disabled="true" />
      <span>业务字典值：{{ isNo }}</span>
      <dict-select v-model="approveStatus" dict-type-id="ApproveStatus" />
      <span>审批状态值：{{ approveStatus }}</span>
    </el-row>
    <el-row style="margin-top:5px">
      <dict-radio v-model="isNo" dict-type-id="IsNo" :disabled="false" />
    </el-row>
    <el-row style="margin-top:5px">
      <dict-checkbox v-model="approveStatus2" dict-type-id="ApproveStatus" />
      <span>审批状态值2：{{ approveStatus2 }}</span>
    </el-row>
    <el-row style="margin-top:5px">
      <span><dict-write dict-type-id="ApproveStatus" value="2" /></span>
    </el-row>
    <el-row style="margin-top:5px">
      <span v-if="hasPermission('authBtn')">对authBtn有权限</span>
    </el-row>
    <el-row style="margin-top:5px">
      千分位
      <milli-input v-model="milliInputValue" />
    </el-row>
  </div>
</template>
<script>
import { downloadSchedule, exportReport } from '@/api/bud/bud.js'
import DictSelect from '@/components/DictSelect'
import DictRadio from '@/components/DictRadio'
import DictCheckbox from '@/components/DictCheckbox'
import DictWrite from '@/components/DictWrite'
import MilliInput from '@/components/MilliInput'
import { permission } from '@/mixins/permission-mixin'
export default {
  components: {
    DictSelect,
    DictRadio,
    DictCheckbox,
    DictWrite,
    MilliInput
  },
  mixins: [permission],
  data() {
    return {
      fileTypes: [
        {
          value: 'csv',
          label: 'CSV文件'
        }, {
          value: 'xlsx',
          label: 'Excel文件'
        }, {
          value: 'txt',
          label: 'Text文件'
        }, {
          value: 'pdf',
          label: 'PDF文件'
        }, {
          value: 'html',
          label: 'HTML文件'
        }
      ],
      // isNos:[],
      fileType: 'csv',
      isNo: '',
      approveStatus: '2',
      approveStatus2: ['1', '2'],
      milliInputValue: 0
      // isNoList:[]
    }
  },
  /*
  computed: {
    isNoList: function(){
      const dictList = this.$store.state.dictList
      const dict = dictList.filter(item=>item.dictTypeId==='IsNo')
      if(dict && dict.length > 0){
        return dict.dicts
      }else{
        return []
      }
    }
  },
  created: function(){
    // this.isNoList = getDictEntries('IsNo')
    this.$store.dispatch('getDicts', 'IsNo')
  },
  */
  methods: {
    handleJumpBtnClick() {
      this.$router.push('/bud/1000214518')
    },
    /*
    getDicts(dictType){
      let ret=[]
      getDictEntries(dictType).then(res=>{
        console.log('Dict.vue created res')
        console.log(res)
        ret = res
      })
      return ret
    },*/
    handleDownloadBtnClick() {
      const dbParameters = {
        params: {
          loginUserId: 'admin'
        }
      }

      downloadSchedule(this.fileType, dbParameters)
    },
    handlePdfBtnClick() {
      const params = { sex: '男', reportName: 'report1', type: this.fileType, downloadFileName: 'demo' }
      exportReport(params)
    }
  }
}
</script>
<style lang="scss" scoped>
  .demo {
    // height: 100%;
    width: 100%;
    padding: 20px;
    // height: 100%;
    box-sizing: border-box;
    border-radius: 6px;
    background-color: #fff;
    box-sizing: border-box;
  }

</style>
