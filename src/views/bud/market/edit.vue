<template>
  <div class="apply">
    <div class="search-left-box tree-org-user" @click="hideOperation(activeOperation || '')">
      <el-popover placement="bottom-end" :visible-arrow="false" popper-class="tree-help-popper" trigger="hover">
        <ul>
          <li class="tree-help-items">
            <span class="selfIcon"><i class="iconfont iconicon_suo-" /></span>
            <span>- 代表自己锁定,可解锁</span>
          </li>
          <li class="tree-help-items">
            <span class="otherIcon"><i class="iconfont iconicon_suo-" /></span>
            <span>- 代表他人锁定,不可解锁</span>
          </li>
          <li class="tree-help-items">
            <span class="confirmIcon"><i class="iconfont iconqueren" /></span>
            <span>- 代表已确认状态</span>
          </li>
          <li class="tree-help-items">
            <span class="permissionIcon"><i class="iconfont iconbuke" /></span>
            <span>- 无权限查看</span>
          </li>
        </ul>
        <span slot="reference" class="tree-help"><i class="iconfont iconbangzhu" /></span>
      </el-popover>
      <el-scrollbar>
        <!-- 总经理 -->
        <el-tree
          v-if="isManager"
          ref="tree"
          :data="data"
          node-key="id"
          :highlight-current="false"
          :default-expanded-keys="expandedKeys"
          :expand-on-click-node="true"
          @node-click="selectNode"
          @node-contextmenu="operation"
        >
          <template slot-scope="scope">
            <div class="custom-tree-node">
              <div class="tree_item">
                {{ scope.data.name }}
              </div>
            </div>
          </template>
        </el-tree>
        <!-- 员工 -->
        <el-tree
          v-else
          ref="tree"
          :data="data"
          node-key="id"
          :highlight-current="false"
          :default-expanded-keys="expandedKeys"
          :expand-on-click-node="true"
          @node-click="selectNode"
          @node-contextmenu="operation"
        >
          <template slot-scope="scope">
            <div class="custom-tree-node">
              <div class="tree_item" :class="{'tree-confirm-item' : scope.data.confirmDiv === 1}">
                <!-- 无权限 -->
                <template v-if="scope.data.accessDiv === 1">
                  <el-popover placement="right" :visible-arrow="false" trigger="hover" popper-class="tree-access-info">
                    <p><i class="iconfont iconbuke" />无权限查看</p>
                    <span slot="reference">{{ scope.data.name }}</span>
                  </el-popover>
                </template>
                <!-- 有权限 -->
                <template v-else>
                  <!-- 他人锁定 -->
                  <template v-if="scope.data.lockDiv === 2">
                    <el-popover placement="right" :visible-arrow="false" trigger="hover" popper-class="tree-lock-info">
                      <p>当前锁定人：XX</p>
                      <p>锁定时间：2020-03-01 11:30：25</p>
                      <span slot="reference">{{ scope.data.name }}<span class="statusIcon otherIcon"><i class="iconfont iconicon_suo-" /></span></span>
                    </el-popover>
                  </template>
                  <!-- 可锁定 -->
                  <template v-else-if="scope.data.lockDiv === 0">
                    {{ scope.data.name }}
                    <div :ref="scope.data.id" class="tree-lock-text" @click.stop="onLockDiv(scope.data.id)">
                      锁&nbsp;定
                    </div>
                  </template>

                  <span v-else>{{ scope.data.name }}{{ scope.data.accessDiv }}</span>

                  <!-- 已确认 -->
                  <template v-if="scope.data.confirmDiv === 1">
                    <span class="statusIcon confirmIcon">
                      <i class="iconfont iconqueren" />
                    </span>
                  </template>
                  <!-- 自己锁定 -->
                  <template v-if="scope.data.lockDiv === 1">
                    <span class="statusIcon selfIcon"><i class="iconfont iconicon_suo-" /></span>
                  </template>
                </template>
              </div>
            </div>
          </template>
        </el-tree>
      </el-scrollbar>
    </div>
    <div class="content">
      <el-scrollbar>
        <manager
          v-if="isManager"
          :data-list="budgetList.datas.buds"
          :list="listTabs"
          :status="budgetList.datas.confirmStatus"
          :active-tabs="activeTabs"
          @tabClick="tabClick"
          @rowClick="rowClick"
          @removeTab="removeTab"
        />
        <staff
          v-else
          :data-list="budgetList.datas.buds"
          :status="budgetList.datas.confirmStatus"
          @rowClick="rowClick"
        />
      </el-scrollbar>
    </div>
    <info-dailog ref="info" :dialog-visible="dialogVisible" @onClose="onClose" />
  </div>
</template>

<script>
import { getAllOrgTree } from '@/api/admin/org-api.js'
import infoDailog from './_info.vue'
import budgetList from './budgetList'

import staff from './staff.vue'
import manager from './manager.vue'
export default {
  components: {
    staff,
    manager,
    infoDailog
  },
  data() {
    return {
      isManager: false, // 是否总经理
      dialogVisible: false,
      budgetList: budgetList,
      data: [],
      listTabs: [],
      activeTabs: '',
      activeOperation: '',
      visible: false,
      expandedKeys: [],
      props: {
        name: 'name',
        children: 'zones'
      }
    }
  },
  mounted() {
    this.searchTree()
    // const store = this.$refs.tree.store
  },
  methods: {
    // 表格行点击
    rowClick() {
      this.dialogVisible = true
    },
    onClose(obj) {
      this.dialogVisible = obj
    },
    async searchTree() {
      const res = await getAllOrgTree()
      if (res && res.success) {
        this.data = res.datas.result
        // 默认展开
        if (this.data) {
          this.loadTree(this.data)
        }
      }
    },
    loadTree(data) {
      data.map(item => {
        console.log('item', item)
        this.expandedKeys = []
        if (!item.children) {
          this.expandedKeys.push(item.id)
          this.listTabs.push(item)

          this.activeTabs = item.id
          this.$nextTick(function() {
            this.$refs.tree.setCurrentKey(item.id)
          })
        }
        this.loadTree(item.children)
      })
    },
    // tab选项卡切换
    tabClick(item) {
      this.$nextTick(function() {
        this.$refs.tree.setCurrentKey(item.name)
      })
    },
    // tab选项卡移除
    removeTab(item, list) {
      this.$nextTick(function() {
        this.$refs.tree.setCurrentKey(item)
      })
      this.listTabs = list
      console.log('item', item)
      console.log('this.listTabs', this.listTabs)
    },
    // 点击叶子节点
    selectNode(target) {
      console.log('target', target)
      if (target.children === null) {
        this.listTabs.push(target)
        this.activeTabs = target.id
      }
      this.hideOperation(this.activeOperation || '')
      // 去重
      this.listTabs = [...new Set(this.listTabs)]
    },
    // 点击右键时触发
    operation(event, data, node, target) {
      console.log(event)
      console.log(data)
      console.log(node)
      console.log(target)
      // 判断前一个的操作菜单是否隐藏
      if (this.activeOperation) {
        this.$refs[this.activeOperation].style.display = 'none'
      }
      this.activeOperation = data.id
      this.$refs[data.id].style.display = 'block'
    },
    // 锁定节点
    onLockDiv(id) {
      this.$refs[id].style.display = 'none'
      console.log('id', id)
    },
    // 隐藏右键操作菜单
    hideOperation(ref) {
      console.log('ref', ref)
      if (ref) {
        this.$refs[ref].style.display = 'none'
      }
    }

  }

}
</script>
<style lang="scss">
  .el-input.is-disabled .el-input__inner,
  .el-input.is-disabled .el-input__icon,
  .el-input.is-disabled .el-input__prefix,
  .el-input.is-disabled .el-input__suffix{
    cursor: default;
  }

	.content-top-state .el-form-item {
		margin-bottom: 30px;
	}

	.content-top-btn .operation-item {
		margin-bottom: 30px;
	}

	.table-tree-item {
		padding-left: 27px;
	}

	.table-edit-icon {
		display: none;
		font-size: 14px;
	}

	.table-cell-hover:hover {
		color: #00E2DE;
		cursor: pointer;

	}

	.table-cell-total .cell {
		line-height: 30px;
	}

	.total-item-span {
		position: relative;

		span {
			position: absolute;
			top: -15px;
			right: -9px;

			i {
				font-size: 12px;
			}
		}
	}

	.table-cell-hover:hover i {
		display: inline-block;
		color: #00E2DE;
	}

	.table-total-icon {
		i {
			padding-left: 6px;
			color: #00E2DE;
    }

  }
  .table-span-style{
     td:first-child .cell,
      th:first-child .cell{
          padding: 0 10px;
        }
  }

</style>
