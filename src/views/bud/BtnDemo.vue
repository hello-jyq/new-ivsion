<template>
  <div class="btnDemo">
    <div class="btns">
      <el-button type="primary" class="el-icon-circle-plus-outline">新建</el-button>
      <el-button type="primary" class="iconfont icon-tijiao">提交</el-button>
      <el-button type="primary" class="el-icon-success">同意</el-button>
      <el-button type="primary" class="iconfont icon-dayin">打印</el-button>
      <el-button type="primary" class="iconfont icon-shenpi">审批</el-button>
      <el-button type="warning" class="iconfont icon-fanhui">返回</el-button>
      <el-button type="danger" class="el-icon-delete">批量删除</el-button>
      <el-button type="primary" class="el-icon-refresh" plain>刷新</el-button>
      <el-button type="success" class="el-icon-download">导出</el-button>
      <el-button type="success" class="iconfont icon-carry-out">执行</el-button>
      <el-button type="success" class="el-icon-search">查询</el-button>
      <el-button class="el-icon-refresh-left" type="info">重置</el-button>
    </div>
    <div class="treeDemo">
      <el-button type="success" class="el-icon-search" @click="handleOpenTree('personnel')">选择人员</el-button>
      <el-button type="success" class="el-icon-search" @click="handleOpenTree('department')">选择部门</el-button>
      <el-dialog title="请选择人员" :visible.sync="dialogVisible" width="25%">
        <div class="box">
          <tissue-tree :tree-type="treeType" @select="selectNode" />
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">{{ $t('comm.cancel') }}</el-button>
          <el-button type="primary" @click="addNode">{{ $t('comm.certain') }}</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import TissueTree from "@/components/TissueTree.vue";
export default {
  components: {
    TissueTree
  },
  data() {
    return {
      dialogVisible: false,
      list: [
        {
          id: 2,
          label: "部门1",
          children: [
            {
              id: 4,
              label: "二级部门",
              children: [
                {
                  id: 9,
                  label: "人员一"
                },
                {
                  id: 10,
                  label: "人员二"
                }
              ]
            }
          ]
        },
        {
          id: 12,
          label: "部门2",
          children: [
            {
              id: 14,
              label: "二级部门",
              children: [
                {
                  id: 19,
                  label: "人员一"
                },
                {
                  id: 20,
                  label: "人员二"
                }
              ]
            }
          ]
        }
      ],
      treeType: "personnel", // department | personnel
      selectData: ""
    };
  },
  methods: {
    selectNode(data) {
      this.selectData = data;
    },
    addNode() {
      const data = this.selectData;
      if (data.id === "_1") {
        this.$message({
          type: "error",
          iconClass: "iconfont icongantanhao_icon",
          customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
          message: "请选择人员"
        });
        return false;
      }
      if (this.treeType === "personnel") {
        // 只要人员，排除部门
        if (data.type !== "user") {
          this.$message({
            type: "error",
            iconClass: "iconfont icongantanhao_icon",
            customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
            message: "请选择人员"
          });
          return false;
        }
      }
      alert(`你选择了${data.text || data.name}`);
      this.dialogVisible = false;
    },
    handleOpenTree(treeType) {
      this.treeType = treeType;
      this.dialogVisible = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.box {
  height: 300px;
  overflow: auto;
  // background-color: #eee;
}
</style>
