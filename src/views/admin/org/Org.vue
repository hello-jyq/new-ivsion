<template>
  <div class="user" @click="hideOperation(activeOperation || '')">
    <div class="left">
      <el-tree
        :data="data"
        node-key="id"
        :expand-on-click-node="false"
        :default-expanded-keys="expandedKeys"
        @node-drop="allowNodeDrop"
        @node-click="selectNode"
        @node-contextmenu="operation"
      >
        <!-- draggable
        :allow-drop="allowDrop"
        :allow-drag="allowDrag"-->
        <template slot-scope="scope">
          <div class="tree_content">
            <div class="tree_item">
              <span
                v-if="scope.data.id !== 50"
                class="iconfont"
                :class="scope.data.children || scope.data.type === 'org' ? 'icon-bumenguanli_h' : 'icon-Avatar'"
              />
              <span v-else class="iconfont icon-zuzhijiagou" />
              <span>{{ scope.data.text }}</span>
            </div>
            <div :ref="scope.data.id" class="tree_down">
              <template v-if="scope.data.children || scope.data.type === 'org'">
                <p @click.stop="append(scope.data)">
                  <!-- 增加下级机构 -->
                  {{ $t('admin.org.addSubMech') }}
                </p>
                <!-- 增加本级机构 -->
                <!-- <p @click.stop="insertAfter(scope.node.parent.data)">
                  {{ $t('admin.org.addLevelMech') }}
                </p>-->
                <p @click.stop="appendPersonnel(scope.data)">
                  <!-- 增加机构人员 -->
                  {{ $t('admin.org.addMechUser') }}
                </p>
                <p @click.stop="removeObject(scope)">
                  <!-- 删除本级机构 -->
                  {{ $t('admin.org.deleteLevelMech') }}
                </p>
              </template>
              <template v-else>
                <p @click.stop="removePersonnel(scope.node.parent.data, scope.data)">
                  <!-- 删除该人员 -->
                  {{ $t('admin.org.deleteUser') }}
                </p>
              </template>
            </div>
          </div>
        </template>
      </el-tree>
    </div>
    <div class="content">
      <div v-show="active === 'list'" class="list">
        <h3>
          {{ $t('admin.org.orgManagement') }}
          <span style="float: right">
            <span>{{ $t('admin.org.validYear') }}：{{ this.$route.query.validYear }}</span>
          </span>
        </h3>
        <div class="search">
          <div>
            <div class="title">{{ $t('admin.org.orgName') }}</div>
            <el-input
              v-model="searchParam.params.orgName"
              class="input"
              :placeholder="$t('admin.org.orgName')"
              clearable
            />
          </div>
          <div>
            <div class="title">{{ $t('admin.org.orgCode') }}</div>
            <el-input
              v-model="searchParam.params.orgCode"
              class="input"
              :placeholder="$t('admin.org.orgCode')"
              clearable
            />
          </div>
          <div>
            <el-button type="primary" icon="el-icon-search" @click="search">
              <!-- 搜索 -->
              {{ $t('comm.query') }}
            </el-button>
            <el-button class="el-icon-refresh-left" type="info" @click="reset">
              <!-- 重置 -->
              {{ $t('comm.reset') }}
            </el-button>
          </div>
        </div>
        <div class="table">
          <el-table
            ref="table"
            v-loading="isLoading"
            :data="tableData"
            border
            style="width: 100%"
            height="579"
          >
            <el-table-column prop="id" :label="$t('admin.org.orgId')" />
            <el-table-column prop="orgCode" :label="$t('admin.org.orgCode')" />
            <el-table-column prop="orgName" :label="$t('admin.org.orgName')" />
            <el-table-column prop="orgLevel" :label="$t('admin.org.orgLevel')" />
            <el-table-column prop="parentId" :label="$t('admin.org.parentId')" />
            <el-table-column prop="deleteFlag" :label="$t('admin.org.deleteFlag')">
              <template slot-scope="scope">
                <dict-write dict-type-id="DeleteFlag" :value="scope.row.deleteFlag" />
              </template>
            </el-table-column>
            <el-table-column :label="$t('comm.operation')" min-width="120" width="120">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  @click="handleEdit(scope.$index, scope.row)"
                />
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="handleDelete(scope.$index, scope.row)"
                />
              </template>
            </el-table-column>
          </el-table>
        </div>
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
      <div v-show="active === 'department'" class="department">
        <div class="input_box">
          <div v-show="false" class="flex1">
            <div class="title">{{ $t('admin.org.orgId') }}</div>
            <el-input v-model="departmentEdit.id" class="input" :readonly="true" />
          </div>
          <div class="flex1">
            <div class="title must">{{ $t('admin.org.orgCode') }}</div>
            <div class="input">
              <el-input
                v-model="departmentEdit.orgCode"
                class="input"
                :placeholder="$t('admin.org.orgCode')"
                @blur="validator('orgEditOrgCode')"
              />
              <span
                ref="orgEditOrgCode"
                data-roles="required"
                :data-value="departmentEdit.orgCode"
                class="message"
              />
            </div>
          </div>
          <div class="flex1">
            <div class="title must">{{ $t('admin.org.orgName') }}</div>
            <div class="input">
              <el-input
                v-model="departmentEdit.orgName"
                class="input"
                @blur="validator('orgEditOrgName')"
              />
              <span
                ref="orgEditOrgName"
                data-roles="required"
                :data-value="departmentEdit.orgName"
                class="message"
              />
            </div>
          </div>
          <div class="flex1">
            <div class="title">
              <!-- 父机构ID -->
              {{ $t('admin.org.parentId') }}
            </div>
            <el-input v-model="departmentEdit.parentId" class="input" />
          </div>
          <div class="flex1">
            <div class="title must">{{ $t('admin.org.deleteFlag') }}</div>
            <div class="input">
              <dict-select
                v-model="departmentEdit.deleteFlag"
                dict-type-id="DeleteFlag"
                @change="(value) => {validator('orgEditState', value)}"
              />
              <span
                ref="orgEditState"
                data-roles="required"
                :data-value="departmentEdit.deleteFlag"
                class="message"
              />
            </div>
          </div>
        </div>
        <div class="btn">
          <el-button type="primary" size="mini">{{ $t('comm.cancel') }}</el-button>
          <el-button type="primary" size="mini" @click="orgEdit">{{ $t('comm.save') }}</el-button>
        </div>
      </div>
      <div class="addOrgDilog">
        <el-dialog
          :title="$t('admin.org.addInstitutionalInformation')"
          :visible.sync="addOrgDilog"
          width="60%"
          center
        >
          <div class>
            <div class="input_box">
              <div v-show="true" class="flex2">
                <div class="title must">{{ $t('admin.org.orgId') }}:</div>
                <div class="input">
                  <el-input
                    v-model="addOrgData.id"
                    :placeholder="$t('admin.org.orgId')"
                    class="input"
                    @blur="validator('orgAddOrgId')"
                  />
                  <span
                    ref="orgAddOrgId"
                    data-roles="required"
                    :data-value="addOrgData.id"
                    class="message"
                  />
                </div>
              </div>
              <div class="flex2">
                <div class="title">{{ $t('admin.org.orgCode') }}:</div>
                <div class="input">
                  <el-input
                    v-model="addOrgData.orgCode"
                    :placeholder="$t('admin.org.orgCode')"
                    class="input"
                  />
                </div>
              </div>
              <div class="flex2">
                <div class="title must">{{ $t('admin.org.orgName') }}:</div>
                <div class="input">
                  <el-input
                    v-model="addOrgData.orgName"
                    :placeholder="$t('admin.org.orgName')"
                    class="input"
                    @blur="validator('orgAddOrgName')"
                  />
                  <span
                    ref="orgAddOrgName"
                    data-roles="required"
                    :data-value="addOrgData.orgName"
                    class="message"
                  />
                </div>
              </div>
              <div class="flex2">
                <div class="title">{{ $t('admin.org.parentId') }}:</div>
                <div class="input">
                  <el-input
                    v-model="addOrgData.parentId"
                    :placeholder="$t('admin.org.parentId')"
                    class="input"
                  />
                </div>
              </div>
              <!-- <div class="flex2">
                <div class="title">
                  {{ $t('admin.org.validYear') }}:
                </div>
                <div class="input">
                  <el-input v-model="addOrgData.validYear" :placeholder="$t('admin.org.validYear')" class="input" />
                </div>
              </div>-->
              <!-- <div class="flex2">
                <div class="title must">
                  {{ $t('admin.org.deleteFlag') }}:
                </div>
                <div class="input">
                  <dict-select v-model="addOrgData.deleteFlag" dict-type-id="DeleteFlag" @change="(value) => {validator('orgAddState', value)}" />
                  <span ref="orgAddState" data-roles="required" :data-value="addOrgData.deleteFlag" class="message" />
                </div>
              </div>-->
            </div>
          </div>
          <span slot="footer">
            <!-- <el-button @click="dialogVisible = false">{{$t('comm.cancel')}}</el-button> -->
            <el-button type="primary" @click="addOrg">{{ $t('comm.certain') }}</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 添加机构人员Dilog -->
      <div class="addUserDilog">
        <el-dialog
          :title="$t('admin.org.addUserInformation')"
          :visible.sync="addUserDilog"
          width="80%"
          center
        >
          <div class="personnel">
            <!-- 基本信息 -->
            <h4>
              {{ $t('comm.essentialInformation') }}
              <div
                class="add_row iconfont icon-jia"
                @click.stop="userChose('addUserData')"
              >{{ $t('admin.org.selectUser') }}</div>
            </h4>
            <div class="input_box">
              <div class="flex2">
                <div class="title must">{{ $t('admin.org.fullName') }}</div>
                <div class="input">
                  <el-input
                    v-model="addUserData.nickName"
                    class="input"
                    :placeholder="$t('admin.org.fullName')"
                    @blur="validator('userAddNickName')"
                  />
                  <span
                    ref="userAddNickName"
                    data-roles="required"
                    :data-value="addUserData.nickName"
                    class="message"
                  />
                </div>
              </div>
              <div class="flex2">
                <div class="title must">{{ $t('admin.org.sysName') }}</div>
                <div class="input">
                  <el-input
                    v-model="addUserData.userName"
                    class="input"
                    :placeholder="$t('admin.org.sysName')"
                  />
                  <span
                    ref="userName"
                    data-roles="required"
                    :data-value="addUserData.userName"
                    class="message"
                  />
                </div>
              </div>
              <div class="flex2">
                <div class="title">{{ $t('admin.org.password') }}</div>
                <div class="input">
                  <el-input
                    v-model="addUserData.password"
                    type="password"
                    class="input"
                    :placeholder="$t('admin.org.password')"
                  />
                </div>
              </div>
              <div class="flex2">
                <div class="title">{{ $t('admin.org.confirmPassword') }}</div>
                <div class="input">
                  <el-input
                    v-model="addUserData.rePassword"
                    type="password"
                    class="input"
                    :placeholder="$t('admin.org.confirmPassword')"
                    @blur="checkPassword('addUserData')"
                  />
                  <span ref="userAddRePassword" class="message" />
                </div>
              </div>
              <div class="flex2">
                <div class="title">{{ $t('admin.org.corpUserId') }}</div>
                <div class="input">
                  <el-input
                    v-model="addUserData.corpUserId"
                    class="input"
                    :placeholder="$t('admin.org.corpUserId')"
                  />
                </div>
              </div>
              <div class="flex2">
                <div class="title">{{ $t('admin.org.mobile') }}</div>
                <div class="input">
                  <el-input
                    v-model="addUserData.mobile"
                    class="input"
                    :placeholder="$t('admin.org.mobile')"
                  />
                </div>
              </div>
              <div class="flex2">
                <div class="title must">{{ $t('admin.org.authMode') }}</div>
                <div class="input">
                  <dict-select
                    v-model="addUserData.authMode"
                    dict-type-id="AuthMode"
                    class="input"
                    @blur="validator('userAuthMod')"
                  />
                  <span
                    ref="userAuthMod"
                    data-roles="required"
                    :data-value="addUserData.authMode"
                    class="message"
                  />
                </div>
              </div>
              <div class="flex2">
                <div class="title">{{ $t('admin.org.language') }}</div>
                <div class="input">
                  <dict-select
                    v-model="addUserData.language"
                    dict-type-id="Language"
                    class="input"
                  />
                </div>
              </div>
              <div class="flex2">
                <div class="title">{{ $t('admin.org.ldapUserId') }}</div>
                <div class="input">
                  <el-input
                    v-model="addUserData.ldapUserId"
                    class="input"
                    :placeholder="$t('admin.org.ldapUserId')"
                  />
                </div>
              </div>
              <div class="flex2">
                <div class="title">{{ $t('admin.org.email') }}</div>
                <div class="input">
                  <el-input
                    v-model="addUserData.email"
                    class="input"
                    :placeholder="$t('admin.org.email')"
                  />
                </div>
              </div>
              <div class="flex2">
                <div class="title">{{ $t('admin.user.status') }}</div>
                <div class="input">
                  <dict-select
                    v-model="addUserData.status"
                    dict-type-id="UserStatus"
                    class="input"
                  />
                  <span
                    ref="userstatus"
                    data-roles="required"
                    :data-value="addUserData.status"
                    class="message"
                  />
                </div>
              </div>
              <div class="flex2">
                <div class="title must">{{ $t('admin.org.userLock') }}</div>
                <div class="input">
                  <dict-select v-model="addUserData.isLocked" dict-type-id="IsNo" class="input" />
                  <!-- @blur="validator('userIsLocked')" -->
                  <!-- <span ref="userIsLocked" data-roles="required" :data-value="addUserData.authMode" class="message" /> -->
                </div>
              </div>
              <div class="flex2">
                <div class="title">{{ $t('admin.org.invalidDate') }}</div>
                <div class="input">
                  <el-date-picker
                    v-model="addUserData.invalidDate"
                    class="input"
                    type="date"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="yyyy-MM-dd"
                  />
                </div>
              </div>
              <div class="flex2">
                <div class="title">{{ $t('admin.org.jobRank') }}</div>
                <div class="input">
                  <dict-select v-model="addUserData.jobRank" dict-type-id="Position" class="input" />
                </div>
              </div>
              <div class="flex2">
                <div class="title">{{ $t('admin.org.staffNum') }}</div>
                <div class="input">
                  <el-input
                    v-model="addUserData.staffNum"
                    class="input"
                    :placeholder="$t('admin.org.staffNum')"
                  />
                </div>
              </div>
            </div>
            <!-- 所属机构与角色（Dilog） -->
            <div class="personnel">
              <h4>
                {{ $t('admin.org.affiliation') }}
                <!-- <template slot-scope="scope"> -->
                <!-- <div class="add_row iconfont icon-jia" @click.stop="orgChoseAndAddOrgRow('addUserData')">
                  {{ $t('admin.org.addAffiliation') }}
                </div>-->
                <!-- </template> -->
              </h4>
              <div v-for="(userOrg,index) in addUserData.userOrgs" :key="index">
                <!-- 删除按钮(默认机构不展示) -->
                <h4>
                  {{ $t('admin.org.organization') }}{{ index+1 }}
                  <el-button
                    v-if="index !== 0"
                    size="mini"
                    icon="el-icon-delete"
                    type="danger"
                    style="float: left; width: 3px"
                    @click="HandleOrgDelete('addUserData', index)"
                  >{{ $t('admin.org.dOrganization') }}</el-button>
                  <div
                    class="add_row iconfont icon-jia"
                    @click.stop="orgChoseAndAddOrgRow('addUserData', index)"
                  >{{ $t('admin.org.addAffiliation') }}</div>
                </h4>
                <!-- 所属机构 -->
                <el-card shadow="always">
                  <div>
                    <div class="input_box">
                      <div class="flex2">
                        <div class="title">{{ $t('admin.org.orgId') }}:</div>
                        <div class="input">
                          <el-input
                            v-model="userOrg.orgId"
                            :placeholder="$t('admin.org.orgId')"
                            class="input"
                          />
                        </div>
                      </div>
                      <div class="flex2">
                        <div class="title">{{ $t('admin.org.orgName') }}:</div>
                        <div class="input">
                          <el-input
                            v-model="userOrg.orgName"
                            :placeholder="$t('admin.org.orgCode')"
                            class="input"
                            @blur="validator('orgAddOrgCode')"
                          />
                        </div>
                      </div>
                      <div class="flex2">
                        <div class="title">{{ $t('admin.org.post') }}:</div>
                        <div class="input">
                          <dict-select v-model="userOrg.positionCode" dict-type-id="Position" />
                        </div>
                      </div>
                      <div class="flex2">
                        <div class="title">{{ $t('admin.org.isMain') }}:</div>
                        <div class="input">
                          <dict-select v-model="userOrg.isMain" dict-type-id="IsNo" />
                        </div>
                      </div>
                      <div v-show="false" class="flex2">
                        <div class="title">{{ $t('admin.org.userId') }}:</div>
                        <div class="input">
                          <el-input
                            v-model="userOrg.userId"
                            :placeholder="$t('admin.org.userId')"
                            class="input"
                          />
                        </div>
                      </div>
                    </div>
                    <!-- 机构所属角色-->
                    <div>
                      <el-button
                        size="mini"
                        icon="el-icon-edit"
                        type="primary"
                        style="float: right; padding: 3px 0"
                        @click.stop="roleChose('addUserData', index)"
                      >{{ $t('admin.org.addRole') }}</el-button>
                      <div class="table">
                        <el-table :data="userOrg.userRoles" border height="200" style="width: 100%">
                          <el-table-column
                            :label="$t('comm.operation')"
                            width="70"
                            :style="{textAlign: 'center'}"
                          >
                            <template slot-scope="scope">
                              <el-button
                                size="mini"
                                icon="el-icon-delete"
                                type="danger"
                                @click="roleHandleDelete('addUserData', scope.row, index, scope.$index)"
                              />
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('admin.org.roleId')" prop="roleId" />
                          <el-table-column :label="$t('admin.org.roleName')" prop="roleName" />
                        </el-table>
                      </div>
                    </div>
                  </div>
                </el-card>
              </div>
              <!-- 保存，取消按钮（Dilog） -->
              <div class="btn">
                <el-button
                  type="primary"
                  size="small"
                  @click="addUserDilog = false"
                >{{ $t('comm.cancel') }}</el-button>
                <el-button
                  type="primary"
                  size="small"
                  @click="userSave('addUserData')"
                >{{ $t('comm.save') }}</el-button>
              </div>
            </div>
          </div>
        </el-dialog>
      </div>

      <div class="orgChoseDilog">
        <el-dialog
          :title="$t('admin.org.selectOrg')"
          :visible.sync="orgChoseDilog"
          width="35%"
          center
        >
          <!-- <div class="basic">
            <div>
              <el-tree
                ref="orgTree"
                :data="orgChoseData"
                node-key="id"
                :props="defaultProps"
                @node-click="handleNodeClick"
              />
            </div>
          </div>-->
          <div class="box">
            <tissue-tree
              tree-type="department"
              :valid-year="searchParam.params.validYear"
              @select="selectP"
            />
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="orgChoseDilog = false">{{ $t('comm.cancel') }}</el-button>
            <el-button type="primary" @click="handleNodeClick(selectData)">{{ $t('comm.certain') }}</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 角色选择Dilog -->
      <div class="roleChoseDilog">
        <el-dialog
          :title="$t('admin.org.selectRole')"
          :visible.sync="roleChoseDilog"
          width="80%"
          center
        >
          <div class="role_chose">
            <div class="basic">
              <div class="input_box">
                <div class="flex3">
                  <div class="title">{{ $t('admin.org.roleId') }}</div>
                  <el-input v-model="searchId" :placeholder="$t('admin.org.roleId')" clearable />
                </div>
                <div class="flex3">
                  <div class="title">{{ $t('admin.org.roleName') }}</div>
                  <el-input v-model="searchName" :placeholder="$t('admin.org.roleName')" clearable />
                </div>
                <div class="flex3">
                  <el-button
                    type="success"
                    class="el-icon-search"
                    @click="selectRole"
                  >{{ $t('admin.org.screen') }}</el-button>
                </div>
              </div>
              <div class="table">
                <el-table
                  ref="roleChoseMultipleTable"
                  :data="roleChoseData"
                  border
                  style="width: 100%"
                  @select="handleSelect"
                >
                  <el-table-column type="selection" width="55" />
                  <el-table-column prop="id" :label="$t('admin.org.roleId')" />
                  <el-table-column prop="roleName" :label="$t('admin.org.roleName')" />
                  <el-table-column prop="roleDesc" :label="$t('admin.org.desc')" />
                </el-table>
              </div>
            </div>
          </div>
          <span slot="footer">
            <el-button @click="roleChoseDilog = false">{{ $t('comm.cancel') }}</el-button>
            <el-button type="primary" @click="rolesSelect(addOrEdit)">{{ $t('comm.certain') }}</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 选择现有人员Dilog -->
      <div class="userChoseDilog">
        <el-dialog
          :title="$t('admin.org.selectUser')"
          :visible.sync="userChoseDilog"
          width="80%"
          center
        >
          <div class="user_chose">
            <div class="basic">
              <div class="input_box">
                <div class="flex3">
                  <div class="title">{{ $t('admin.org.fullName') }}</div>
                  <el-input
                    v-model="searchParam.params.nickName"
                    :placeholder="$t('admin.org.fullName')"
                    clearable
                  />
                </div>
                <div class="flex3">
                  <div class="title">{{ $t('admin.org.sysName') }}</div>
                  <el-input
                    v-model="searchParam.params.userName"
                    :placeholder="$t('admin.org.sysName')"
                    clearable
                  />
                </div>
                <div class="flex3">
                  <el-button
                    type="success"
                    class="el-icon-search"
                    @click="selectUser"
                  >{{ $t('admin.org.screen') }}</el-button>
                </div>
              </div>
              <div class="table">
                <el-table
                  ref="userChoseMultipleTable"
                  :data="userChoseData"
                  border
                  style="width: 100%"
                  @select="handleSelect"
                >
                  <el-table-column type="selection" width="55" />
                  <el-table-column prop="id" :label="$t('admin.org.userId')" />
                  <el-table-column prop="nickName" :label="$t('admin.org.fullName')" />
                  <el-table-column prop="userName" :label="$t('admin.org.sysName')" />
                  <el-table-column prop="corpUserId" :label="$t('admin.org.corpUserId')" />
                  <el-table-column prop="mobile" :label="$t('admin.org.mobile')" />
                  <el-table-column prop="ldapUserId" :label="$t('admin.org.ldapUserId')" />
                  <el-table-column prop="email" :label="$t('admin.org.email')" />
                  <el-table-column prop="jobRank" :label="$t('admin.org.jobRank')" />
                  <el-table-column prop="staffNum" :label="$t('admin.org.staffNum')" />
                </el-table>
              </div>
            </div>
          </div>
          <span slot="footer">
            <!-- <el-button @click="dialogVisible = false">{{$t('comm.cancel')}}</el-button> -->
            <el-button type="primary" @click="userSelect(addOrEdit)">{{ $t('comm.certain') }}</el-button>
          </span>
          <!-- <div class="pagination">
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
          </div>-->
        </el-dialog>
        <!-- 人员信息 -->
        <div v-show="active === 'personnel' " class="personnel">
          <h4>{{ $t('comm.essentialInformation') }}</h4>
          <div class="input_box">
            <div class="flex2">
              <div class="title must">{{ $t('admin.org.fullName') }}</div>
              <div class="input">
                <el-input
                  v-model="personEdit.nickName"
                  class="input"
                  :placeholder="$t('admin.org.fullName')"
                  @blur="validator('userEditNickName')"
                />
                <span
                  ref="userEditNickName"
                  data-roles="required"
                  :data-value="personEdit.nickName"
                  class="message"
                />
              </div>
            </div>
            <div class="flex2">
              <div class="title must">
                <!-- 系统登入用户名 -->
                {{ $t('admin.org.systemLoginUsername') }}
              </div>
              <div class="input">
                <el-input
                  v-model="personEdit.userName"
                  class="input"
                  :placeholder="$t('admin.org.systemLoginUsername')"
                />
                <span
                  ref="userEdituserName"
                  data-roles="required"
                  :data-value="personEdit.userName"
                  class="message"
                />
              </div>
            </div>
            <div class="flex2">
              <div class="title">{{ $t('admin.org.password') }}</div>
              <div class="input">
                <el-input
                  v-model="personEdit.password"
                  type="password"
                  class="input"
                  :placeholder="$t('admin.org.password')"
                />
              </div>
            </div>
            <div class="flex2">
              <div class="title">{{ $t('admin.org.confirmPassword') }}</div>
              <div class="input">
                <el-input
                  v-model="personEdit.rePassword"
                  class="input"
                  type="password"
                  :placeholder="$t('admin.org.confirmPassword')"
                  @blur="checkPassword('personEdit')"
                />
                <span ref="userEditRePassword" class="message" />
              </div>
            </div>
            <div class="flex2">
              <div class="title">{{ $t('admin.org.corpUserId') }}</div>
              <div class="input">
                <el-input
                  v-model="personEdit.corpUserId"
                  class="input"
                  :placeholder="$t('admin.org.corpUserId')"
                />
              </div>
            </div>
            <div class="flex2">
              <div class="title">{{ $t('admin.org.mobile') }}</div>
              <div class="input">
                <el-input
                  v-model="personEdit.mobile"
                  class="input"
                  :placeholder="$t('admin.org.mobile')"
                />
              </div>
            </div>
            <div class="flex2">
              <div class="title must">{{ $t('admin.org.authMode') }}</div>
              <div class="input">
                <dict-select
                  v-model="personEdit.authMode"
                  dict-type-id="AuthMode"
                  class="input"
                  @blur="validator('userEditNickName')"
                />
                <span
                  ref="userEditauthMode"
                  data-roles="required"
                  :data-value="personEdit.authMode"
                  class="message"
                />
              </div>
            </div>
            <div class="flex2">
              <div class="title">{{ $t('admin.org.language') }}</div>
              <div class="input">
                <dict-select v-model="personEdit.language" dict-type-id="Language" class="input" />
              </div>
            </div>
            <div class="flex2">
              <div class="title">{{ $t('admin.org.ldapUserId') }}</div>
              <div class="input">
                <el-input
                  v-model="personEdit.ldapUserId"
                  class="input"
                  :placeholder="$t('admin.org.ldapUserId')"
                />
              </div>
            </div>
            <div class="flex2">
              <div class="title">{{ $t('admin.org.email') }}</div>
              <div class="input">
                <el-input
                  v-model="personEdit.email"
                  class="input"
                  :placeholder="$t('admin.org.email')"
                />
              </div>
            </div>
            <div class="flex2">
              <div class="title">{{ $t('admin.user.status') }}</div>
              <div class="input">
                <dict-select v-model="personEdit.status" dict-type-id="UserStatus" class="input" />
              </div>
            </div>
            <div class="flex2">
              <div class="title must">{{ $t('admin.org.userLock') }}</div>
              <div class="input">
                <dict-select v-model="personEdit.isLocked" dict-type-id="IsNo" class="input" />
                <!-- <span ref="userIsLocked" data-roles="required" :data-value="addUserData.authMode" class="message" /> -->
              </div>
            </div>
            <div class="flex2">
              <div class="title">{{ $t('admin.org.invalidDate') }}</div>
              <div class="input">
                <el-date-picker
                  v-model="personEdit.invalidDate"
                  class="input"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="yyyy-MM-dd"
                />
              </div>
            </div>
            <div class="flex2">
              <div class="title">{{ $t('admin.org.jobRank') }}</div>
              <div class="input">
                <dict-select v-model="personEdit.jobRank" dict-type-id="JobRank" class="input" />
              </div>
            </div>
            <div class="flex2">
              <div class="title">{{ $t('admin.org.staffNum') }}</div>
              <div class="input">
                <el-input
                  v-model="personEdit.staffNum"
                  class="input"
                  :placeholder="$t('admin.org.staffNum')"
                />
              </div>
            </div>
          </div>
          <div class="personnel">
            <h4>
              {{ $t('admin.org.affiliation') }}
              <!-- <template>
                <div class="add_row iconfont icon-jia" @click.stop="orgChoseAndAddOrgRow('personEdit')">
                  {{ $t('admin.org.addAffiliation') }}
                </div>
              </template>-->
            </h4>
            <div v-for="(userOrg,index) in personEdit.userOrgs" :key="index">
              <!-- 删除按钮(默认机构不展示) -->
              <h4>
                {{ $t('admin.org.organization') }}{{ index+1 }}
                <el-button
                  size="mini"
                  icon="el-icon-delete"
                  type="danger"
                  style="float: left; width: 3px"
                  @click="HandleOrgDelete('personEdit', index)"
                >{{ $t('admin.org.dOrganization') }}</el-button>
                <div
                  class="add_row iconfont icon-jia"
                  @click.stop="orgChoseAndAddOrgRow('personEdit', index)"
                >{{ $t('admin.org.addAffiliation') }}</div>
              </h4>
              <!-- 所属机构 -->
              <el-card shadow="always">
                <div>
                  <div class="input_box">
                    <div class="flex2">
                      <div class="title">{{ $t('admin.org.orgId') }}:</div>
                      <div class="input">
                        <el-input
                          v-model="userOrg.orgId"
                          :placeholder="$t('admin.org.orgId')"
                          class="input"
                        />
                      </div>
                    </div>
                    <div class="flex2">
                      <div class="title">{{ $t('admin.org.orgName') }}:</div>
                      <div class="input">
                        <el-input
                          v-model="userOrg.orgName"
                          :placeholder="$t('admin.org.orgCode')"
                          class="input"
                          @blur="validator('orgAddOrgCode')"
                        />
                      </div>
                    </div>
                    <div class="flex2">
                      <div class="title">{{ $t('admin.org.post') }}:</div>
                      <div class="input">
                        <dict-select v-model="userOrg.positionCode" dict-type-id="Position" />
                      </div>
                    </div>
                    <div class="flex2">
                      <div class="title">{{ $t('admin.org.isMain') }}:</div>
                      <div class="input">
                        <dict-select v-model="userOrg.isMain" dict-type-id="IsNo" />
                      </div>
                    </div>
                    <div v-show="false" class="flex2">
                      <div class="title">{{ $t('admin.org.userId') }}:</div>
                      <div class="input">
                        <el-input
                          v-model="userOrg.userId"
                          :placeholder="$t('admin.org.userId')"
                          class="input"
                        />
                      </div>
                    </div>
                  </div>
                  <!-- 机构所属角色-->
                  <div>
                    <el-button
                      size="mini"
                      icon="el-icon-edit"
                      type="primary"
                      style="float: right; padding: 3px 0"
                      @click.stop="roleChose('personEdit', index)"
                    >{{ $t('admin.org.addRole') }}</el-button>
                    <div class="table">
                      <el-table :data="userOrg.userRoles" border height="200" style="width: 100%">
                        <el-table-column
                          :label="$t('comm.operation')"
                          width="70"
                          :style="{textAlign: 'center'}"
                        >
                          <template slot-scope="scope">
                            <el-button
                              size="mini"
                              icon="el-icon-delete"
                              type="danger"
                              @click="roleHandleDelete('personEdit', scope.row, index, scope.$index)"
                            />
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('admin.org.roleId')" prop="roleId" />
                        <el-table-column :label="$t('admin.org.roleName')" prop="roleName" />
                      </el-table>
                    </div>
                  </div>
                </div>
              </el-card>
            </div>
            <!-- 保存，取消按钮 -->
            <div class="btn">
              <el-button type="primary" size="small">{{ $t('comm.cancel') }}</el-button>
              <el-button
                type="primary"
                size="small"
                @click="userSave('personEdit')"
              >{{ $t('comm.save') }}</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="editDilog">
        <el-dialog :title="$t('comm.edit')" :visible.sync="orgEditDilog" width="60%" center>
          <div class="org_edit">
            <h5>{{ $t('comm.essentialInformation') }}</h5>
            <div class="input_box">
              <div v-show="false" class="flex2">
                <div class="title">
                  <!-- 机构ID： -->
                  {{ $t('admin.org.orgId') }}
                </div>
                <el-input
                  v-model="editOrgData.id"
                  :placeholder="$t('admin.org.orgId')"
                  class="input"
                  disabled
                />
              </div>
              <div class="flex2">
                <div class="title must">
                  <!-- 机构代码： -->
                  {{ $t('admin.org.orgCode') }}
                </div>
                <div class="input">
                  <el-input
                    v-model="editOrgData.orgCode"
                    :placeholder="$t('admin.org.orgCode')"
                    class="input"
                    @blur="validator('editOrgCode')"
                  />
                  <span
                    ref="editOrgCode"
                    data-roles="required"
                    :data-value="editOrgData.orgCode"
                    class="message"
                  />
                </div>
              </div>
              <div class="flex2">
                <div class="title must">
                  <!-- 机构名称： -->
                  {{ $t('admin.org.orgName') }}
                </div>
                <div class="input">
                  <el-input
                    v-model="editOrgData.orgName"
                    :placeholder="$t('admin.org.orgName')"
                    class="input"
                    @blur="validator('editOrgName')"
                  />
                  <span
                    ref="editOrgName"
                    data-roles="required"
                    :data-value="editOrgData.orgName"
                    class="message"
                  />
                </div>
              </div>
              <div class="flex2">
                <div class="title">
                  <!-- 父机构ID： -->
                  {{ $t('admin.org.parentId') }}
                </div>
                <el-input
                  v-model="editOrgData.parentId"
                  :placeholder="$t('admin.org.parentId')"
                  class="input"
                />
              </div>
              <div class="flex2">
                <div class="title must">
                  <!-- 状态： -->
                  {{ $t('admin.org.deleteFlag') }}
                </div>
                <div class="input">
                  <dict-select
                    v-model="editOrgData.deleteFlag"
                    class="input"
                    dict-type-id="DeleteFlag"
                    @change="(value) => {validator('editState', value)}"
                  />
                  <span
                    ref="editState"
                    data-roles="required"
                    :data-value="editOrgData.deleteFlag"
                    class="message"
                  />
                </div>
              </div>
            </div>
          </div>
          <span slot="footer">
            <!-- <el-button @click="dialogVisible = false">{{$t('comm.cancel')}}</el-button> -->
            <el-button type="primary" @click="orgEditDetail()">{{ $t('comm.certain') }}</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <!-- <el-dialog id="drag1" ref="dragBox" class="content-dialog-box search-light" :close-on-click-modal="false" custom-class="dialog-drag" top="0" title="人员选择" :visible.sync="dialogUserVisible">
      <user-dailog
        :data="users"
        @onClose="dialogUserVisible = false"
        @onConfirm="onConfirm"
      />
    </el-dialog>-->
  </div>
</template>
<script>
import { search } from "@/mixins/search-params";
import { formValidator } from "@/mixins/form-validator.js";
import {
  getOrgList,
  orgSave,
  getAllOrgAndUserTree,
  orgRemove,
  userSave,
  userRemove,
  orgUserEdit,
  userMove,
  orgMove
} from "@/api/admin/org-api.js";
import { getAllRole } from "@/api/admin/role-api.js";
import { getUserList } from "@/api/admin/user-api.js";
import DictSelect from "@/components/DictSelect";
import DictWrite from "@/components/DictWrite";
import TissueTree from "@/components/TissueTree.vue";
import userDailog from "./_userChose.vue";
export default {
  components: {
    DictSelect,
    DictWrite,
    TissueTree,
    userDailog
  },
  mixins: [search, formValidator],
  data() {
    return {
      validYear: "",
      selectData: "",
      searchId: "",
      searchName: "",
      searchUserName: "",
      orgEditDilog: false,
      addOrgDilog: false,
      addUserDilog: false,
      orgChoseDilog: false,
      roleChoseDilog: false,
      userChoseDilog: false,
      dialogUserVisible: false,
      isLoading: true,
      paginationFlag: "orgList",
      users: [],
      searchParam: {
        paging: true,
        pageNo: 1, // 当前页码
        pageSize: 10, // 每页条数
        totalRecord: null, // 总条数
        params: {
          orgCode: "",
          orgName: "",
          userName: "",
          nickName: "",
          validYear: ""
        }
      },
      data: [],
      expandedKeys: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      activeOperation: "",
      tableData: [],
      active: "list",
      departmentInfo: {
        radio: "1"
      },
      editOrgData: {
        id: "",
        orgCode: "",
        orgName: "",
        parentId: "",
        deleteFlag: ""
      },
      addOrgData: {
        id: "",
        orgCode: "",
        orgName: "",
        parentId: "",
        deleteFlag: "",
        validYear: ""
      },
      addUserData: {
        nickName: "",
        userName: "",
        password: "",
        rePassword: "",
        corpUserId: "",
        mobile: "",
        authMode: "",
        language: "",
        ldapUserId: "",
        email: "",
        deleteFlag: "",
        isLocked: "",
        invalidDate: "",
        jobRank: "",
        staffNum: "",
        validYear: "",
        userOrgs: [
          {
            orgId: "",
            orgName: "",
            positionCode: "",
            isMain: "",
            userId: "",
            userRoles: []
          }
        ]
      },
      personEdit: {
        id: "",
        nickName: "",
        userName: "",
        password: "",
        rePassword: "",
        corpUserId: "",
        mobile: "",
        authMode: "",
        language: "",
        ldapUserId: "",
        email: "",
        deleteFlag: "",
        isLocked: "",
        invalidDate: "",
        jobRank: "",
        staffNum: "",
        validYear: "",
        userOrgs: [
          {
            orgId: "",
            orgName: "",
            positionCode: "",
            isMain: "",
            userId: "",
            userRoles: []
          }
        ]
      },
      orgChoseData: [],
      roleChoseData: [],
      userChoseData: [],
      allRoleList: [],
      allUserList: [],
      orgChoseIndex: "0",
      orgChoseName: [],
      roleChoseName: [],
      multipleSelection: [],
      departmentEdit: {
        id: "",
        orgCode: "",
        orgName: "",
        parentId: "",
        deleteFlag: ""
      },
      addOrEdit: "",
      orgAddOrEdit: "",
      userMove: {
        userId: "",
        orgId: "",
        targetOrgId: ""
      },
      orgMove: {
        orgId: "",
        targetParentOrgId: ""
      }
    };
  },
  created() {
    this.fetchData();
    this.searchTree();
  },
  methods: {
    selectP(data) {
      this.selectData = data;
    },
    selectRole() {
      this.roleChoseData = this.allRoleList.filter(item => {
        // 筛选条件都为空
        if (!this.searchId && !this.searchName) {
          return true;
        } else {
          let flag = true;
          if (
            this.searchId &&
            item.id.toLowerCase().indexOf(this.searchId.toLowerCase()) < 0
          ) {
            flag = false;
          }
          if (
            this.searchName &&
            item.roleName.toLowerCase().indexOf(this.searchName.toLowerCase()) <
              0
          ) {
            flag = false;
          }
          return flag;
        }
      });
      this.$nextTick(function() {
        this.roleChoseData.forEach(obj => {
          if (obj.checkFlag) {
            this.$refs.roleChoseMultipleTable.toggleRowSelection(obj, true);
          }
        });
      });
    },
    selectUser() {
      this.userChoseData = this.allUserList.filter(item => {
        // 筛选条件都为空
        if (
          !this.searchParam.params.userName &&
          !this.searchParam.params.nickName
        ) {
          return true;
        } else {
          let flag = true;
          if (
            this.searchParam.params.userName &&
            item.userName
              .toLowerCase()
              .indexOf(this.searchParam.params.userName.toLowerCase()) < 0
          ) {
            flag = false;
          }
          if (
            this.searchParam.params.nickName &&
            item.nickName
              .toLowerCase()
              .indexOf(this.searchParam.params.nickName.toLowerCase()) < 0
          ) {
            flag = false;
          }
          return flag;
        }
      });
      this.$nextTick(function() {
        this.userChoseData.forEach(obj => {
          if (obj.checkFlag) {
            this.$refs.userChoseMultipleTable.toggleRowSelection(obj, true);
          }
        });
      });
    },
    async fetchData() {
      this.searchParam.params.validYear = this.$route.query.validYear;
      const res = await getOrgList(this.searchParam);
      if (res && res.success) {
        const { results, pageNo, totalRecord } = res.datas.searchResult;
        this.tableData = results;
        this.searchParam.pageNo = pageNo;
        this.searchParam.totalRecord = totalRecord;
      }
      this.tableDolayout(this.$refs["table"]);
      this.isLoading = false;
    },
    async searchTree() {
      this.validYear = this.$route.query.validYear;
      const res = await getAllOrgAndUserTree(this.validYear);
      if (res && res.success) {
        this.data = res.datas.result;
        // 默认展开第一级
        if (this.data) {
          this.expandedKeys = this.data.map(item => item.id);
        }
        this.data.unshift({ id: 50, text: "机构人员树" });
      }
    },
    operation(event, data, node, target) {
      // 点击右键时触发
      // alert('点击了右键')
      console.log(event);
      console.log(data);
      console.log(node);
      console.log(target);
      if (!(data.text === "机构人员树")) {
        this.showOperation(data.id);
      }
    },
    selectNode(target) {
      // 点击左键时触发
      if (target.id === 50) {
        this.active = "list";
      } else {
        if (target.children || target.type === "org") {
          this.clearErrorMessage("orgEdit");
          console.log(target);
          this.departmentEdit.id = target.id;
          this.departmentEdit.orgCode = target.code;
          this.departmentEdit.orgName = target.text;
          this.departmentEdit.parentId = target.parentId;
          this.departmentEdit.deleteFlag = "0";
          this.active = "department";
        } else {
          this.clearErrorMessage("userEdit");
          this.personEdit.password = "";
          this.personEdit.rePassword = "";
          orgUserEdit(target.id, this.validYear).then(res => {
            const user = res.datas.user;
            const userOrgs = res.datas.userOrgs;
            console.log(user);
            console.log(userOrgs);
            this.personEdit.id = user.id;
            this.personEdit.nickName = user.nickName;
            this.personEdit.userName = user.userName;
            this.personEdit.corpUserId = user.corpUserId;
            this.personEdit.mobile = user.mobile;
            this.personEdit.authMode = user.authMode;
            this.personEdit.language = user.language;
            this.personEdit.ldapUserId = user.ldapUserId;
            this.personEdit.email = user.email;
            this.personEdit.deleteFlag = user.deleteFlag + "";
            this.personEdit.isLocked = user.isLocked + "";
            this.personEdit.invalidDate = user.invalidDate;
            this.personEdit.jobRank = user.jobRank;
            this.personEdit.staffNum = user.staffNum;
            this.personEdit.userOrgs = [];
            userOrgs.forEach(data => {
              this.personEdit.userOrgs.push({
                orgId: data.orgId,
                orgName: data.orgName,
                positionCode: data.positionCode,
                isMain: data.isMain + "",
                userId: data.userId,
                userRoles: data.userRoles
              });
            });
            this.active = "personnel";
          });
        }
      }
    },
    // 设置节点能否被放置
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.type === "user") {
        // 不能放置在人员的里面
        return type !== "inner";
      } else {
        return true;
      }
    },
    // 设置节点能否被拖拽
    allowDrag(draggingNode) {
      // 判断是否为第一级，第一级不可拖动
      console.log(draggingNode);
      if (!draggingNode.parent.data.children) {
        return false;
      }
      return true;
    },
    //  拖拽完成时触发
    allowNodeDrop(draggingNode, dropNode, dropType, ev) {
      if (draggingNode.data.type === "user") {
        // 用户拖拽
        this.userMove.userId = draggingNode.data.id;
        this.userMove.orgId = draggingNode.data.parentId;
        if (dropType !== "inner") {
          this.userMove.targetOrgId = dropNode.data.parentId;
        } else {
          this.userMove.targetOrgId = dropNode.data.id;
        }
        userMove(this.userMove).then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              iconClass: "iconfont icongantanhao_icon",
              customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
              message: this.$t("comm.success")
            });
            this.searchTree();
          }
        });
      }
      if (draggingNode.data.type === "org") {
        // 组织拖拽
        this.orgMove.orgId = draggingNode.data.id;
        if (dropType !== "inner") {
          this.orgMove.targetParentOrgId = dropNode.data.parentId;
        } else {
          this.orgMove.targetParentOrgId = dropNode.data.id;
        }
        orgMove(this.orgMove).then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              iconClass: "iconfont icongantanhao_icon",
              customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
              message: this.$t("comm.success")
            });
            this.searchTree();
          }
        });
      }
    },
    // 增加本级机构
    // insertAfter(data) {
    // this.$prompt('请输入机构名称', this.$t('comm.tips') , {
    //  confirmButtonText: this.$t('comm.certain'),
    //  cancelButtonText: '取消'
    // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
    // inputErrorMessage: '邮箱格式不正确'
    // }).then(({ value }) => {
    // const newChild = { id: id++, text: value, children: [] }
    // if (!data.children) {
    //   // 当不存在时，说明在最外层
    //   data.push(newChild)
    // } else {
    //   data.children.push(newChild)
    // }
    //   this.clearErrorMessage('orgAdd')
    //   this.resetTable(this.addOrgData)
    //   this.addOrgData.parentId = data.id
    //   this.addOrgDilog = true
    //   this.hideOperation(this.activeOperation)
    // },
    // 增加下属机构
    append(data) {
      // this.$prompt('请输入机构名称', '提示 ', {
      //  confirmButtonText: this.$t('comm.certain'),
      //  cancelButtonText: '取消'
      // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
      // inputErrorMessage: '邮箱格式不正确'
      // }).then(({ value }) => {
      // const newChild = { id: id++, text: value, children: [] }
      // if (!data.children) {
      //   this.$set(data, 'children', [])
      // }
      // data.children.push(newChild)
      this.clearErrorMessage("orgAdd");
      this.resetTable(this.addOrgData);
      this.addOrgData.parentId = data.id;
      this.addOrgDilog = true;
      this.hideOperation(this.activeOperation);
    },
    resetTable(params) {
      for (var i in params) {
        params[i] = "";
      }
    },
    // 增加下级人员
    appendPersonnel(data) {
      // this.$prompt('请输人员名称', this.$t('comm.tips') , {
      //  confirmButtonText: this.$t('comm.certain'),
      //  cancelButtonText: '取消'
      // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
      // inputErrorMessage: '邮箱格式不正确'
      // }).then(({ value }) => {
      //  const newChild = { id: id++, text: value }
      //  if (!data.children) {
      //    this.$set(data, 'children', [])
      //  }
      //  data.children.push(newChild)
      // }).catch(() => {
      // })
      console.log(data);
      this.clearErrorMessage("userAdd");
      this.resetTable(this.addUserData);
      this.addUserData.userOrgs = [];
      // this.addUserData.userOrgs.userRoles = []
      // this.addUserData.userRoles = []
      // this.addUserData.userOrgs.orgId = data.id
      // this.addUserData.userOrgs.orgName = data.text
      this.addUserData.userOrgs.push({ orgId: data.id, orgName: data.text });
      const userOrgs = this.addUserData.userOrgs;
      userOrgs.forEach(userOrg => {
        userOrg.userRoles = [];
        userOrg.userRoles.push({
          roleId: "ROLE_OPC_SYS_TOOL_AUTH",
          roleName: "系统功能照会角色"
        });
      });
      // this.addUserData.userOrgs.userRoles.push({ roleId: 'ROLE_OPC_SYS_TOOL_AUTH', roleName: '系统功能照会角色' })
      this.hideOperation(this.activeOperation);
      this.addUserDilog = true;
    },
    // 删除本级机构
    removeObject(scope) {
      const { node, data } = scope;
      const { data: parentData } = node.parent;
      // 判断是否在最外层，最外层无法删除
      if (!parentData.children) {
        console.log("无法删除");
        this.$message({
          type: "error",
          iconClass: "iconfont icongantanhao_icon",
          customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
          message: this.$t("comm.msg5")
        });
      } else {
        this.$confirm(this.$t("comm.tip8"), this.$t("comm.tips"), {
          confirmButtonText: this.$t("comm.certain"),
          cancelButtonText: this.$t("comm.cancel"),
          type: "warning",
          iconClass: "iconfont icongantanhao_icon",
          customClass: localStorage.getItem("theme") == "Dark" ? "dark-message-box" : " "
        })
          .then(() => {
            // console.log(parentData)
            // const { children } = parentData
            // children.splice(children.findIndex(d => d.id === data.id), 1)
            orgRemove([{ id: data.id }]).then(() => {
              this.search();
              this.searchTree();
            });
            this.activeOperation = "";
          })
          .catch(() => {
            this.$message({
              type: "info",
              iconClass: "iconfont icongantanhao_icon",
              customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
              message: this.$t("comm.msg1")
            });
          });
      }
      this.hideOperation(this.activeOperation);
      // console.log(node)
      // console.log(data)
    },
    // 删除人员
    removePersonnel(parent, data) {
      console.log(parent);
      console.log(data);
      // const children = parent.children || parent
      // const index = children.findIndex(d => d.id === data.id)
      this.$confirm(this.$t("comm.tip7"), this.$t("comm.tips"), {
        confirmButtonText: this.$t("comm.certain"),
        cancelButtonText: this.$t("comm.cancel"),
        type: "warning",
        iconClass: "iconfont icongantanhao_icon",
        customClass: localStorage.getItem("theme") == "Dark" ? "dark-message-box" : " "
      })
        .then(() => {
          // children.splice(index, 1)
          userRemove({ userId: data.id, orgId: parent.id }).then(res => {
            if (res && res.success) {
              this.activeOperation = "";
              this.hideOperation(this.activeOperation);
              this.searchTree();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            iconClass: "iconfont icongantanhao_icon",
            customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
            message: this.$t("comm.msg1")
          });
        });
    },
    // 显示右键操作菜单
    showOperation(ref) {
      // 判断前一个的操作菜单是否隐藏
      if (this.activeOperation) {
        this.$refs[this.activeOperation].style.display = "none";
      }
      this.activeOperation = ref;
      this.$refs[ref].style.display = "block";
    },
    // 隐藏右键操作菜单
    hideOperation(ref) {
      if (ref) {
        this.$refs[ref].style.display = "none";
      }
    },
    handleEdit(index, rowData) {
      this.clearErrorMessage("edit");
      this.editOrgData = { ...rowData };
      this.editOrgData.deleteFlag = rowData.deleteFlag + "";
      this.orgEditDilog = true;
    },
    handleDelete(index, rowData) {
      this.$confirm(this.$t("comm.tip2"), this.$t("comm.tips"), {
        confirmButtonText: this.$t("comm.certain"),
        cancelButtonText: this.$t("comm.cancel"),
        type: "warning",
        iconClass: "iconfont icongantanhao_icon",
        customClass: localStorage.getItem("theme") == "Dark" ? "dark-message-box" : " "
      })
        .then(() => {
          console.log(rowData);
          orgRemove([rowData]).then(() => {
            this.search();
            this.searchTree();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            iconClass: "iconfont icongantanhao_icon",
            customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
            message: this.$t("comm.msg1")
          });
        });
    },
    HandleOrgDelete(table, index) {
      if (this[table].userOrgs.length === 1) {
        this.$message({
          type: "error",
          iconClass: "iconfont icongantanhao_icon",
          customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
          message: this.$t("comm.msg39")
        });
        return;
      }
      this.$confirm(this.$t("comm.tip1"), this.$t("comm.tips"), {
        confirmButtonText: this.$t("comm.certain"),
        cancelButtonText: this.$t("comm.cancel"),
        type: "warning",
        iconClass: "iconfont icongantanhao_icon",
        customClass: localStorage.getItem("theme") == "Dark" ? "dark-message-box" : " "
      })
        .then(() => {
          console.log(this[table].userOrgs);
          this[table].userOrgs.splice(index, 1);
          // this.orgChoseName.splice(index, 1)
          this.$message({
            type: "success",
            iconClass: "iconfont icongantanhao_icon",
            customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
            message: this.$t("comm.msg2")
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            iconClass: "iconfont icongantanhao_icon",
            customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
            message: this.$t("comm.msg1")
          });
        });
    },
    roleHandleDelete(table, row, orgIndex, rowIndex) {
      if (row.roleId === "ROLE_OPC_SYS_TOOL_AUTH") {
        this.$message({
          type: "error",
          iconClass: "iconfont icongantanhao_icon",
          customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
          message: this.$t("comm.msg40")
        });
        return;
      }
      this.$confirm(this.$t("comm.tip1"), this.$t("comm.tips"), {
        confirmButtonText: this.$t("comm.certain"),
        cancelButtonText: this.$t("comm.cancel"),
        type: "warning",
        iconClass: "iconfont icongantanhao_icon",
        customClass: localStorage.getItem("theme") == "Dark" ? "dark-message-box" : " "
      })
        .then(() => {
          this[table].userOrgs[orgIndex].userRoles.splice(rowIndex, 1);
          this.roleChoseName.splice(rowIndex, 1);
          this.$message({
            type: "success",
            iconClass: "iconfont icongantanhao_icon",
            customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
            message: this.$t("comm.msg2")
          });
        })
        .catch(e => {
          this.$message({
            type: "info",
            iconClass: "iconfont icongantanhao_icon",
            customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
            message: this.$t("comm.msg1")
          });
        });
    },
    addOrgRows(table) {
      const newRow = {
        orgId: "",
        orgName: "",
        positionCode: "",
        isMain: ""
      };
      this[table].userOrgs.push(newRow);
      // this.orgChoseName.push('')
    },
    orgChoseAndAddOrgRow(table, index) {
      // const orgCount = this[table].userOrgs.length
      // console.log(orgCount)

      this.orgChoseIndex = index;
      this.orgAddOrEdit = table;
      this.orgChoseDilog = true;

      // this.orgChoseName.push('')
    },
    // 123
    orgChose(table, index) {
      console.log(table);
      // getAllOrgTree().then(res => {
      //   this.orgChoseData = res.datas.result
      this.orgChoseIndex = index;
      this.orgAddOrEdit = table;
      this.orgChoseDilog = true;
      // })
    },
    async roleChose(table, index) {
      if (this.allRoleList.length === 0) {
        const res = await getAllRole();
        this.allRoleList = res.datas.allRole;
      }
      this.allRoleList.forEach(item => {
        item.checkFlag = false;
      });
      this.searchId = "";
      this.searchName = "";
      this.roleChoseData = [...this.allRoleList];
      this.$nextTick(function() {
        this[table].userOrgs.forEach(org => {
          org.userRoles.forEach(role => {
            const roles = this.roleChoseData.filter(
              item => item.id === role.roleId
            );
            if (roles.length > 0) {
              this.$refs.roleChoseMultipleTable.toggleRowSelection(
                roles[0],
                true
              );
              roles[0].checkFlag = true;
            }
          });
        });
      });
      this.orgChoseIndex = index;
      this.roleChoseDilog = true;
      this.addOrEdit = table;
    },
    async userChose(table) {
      this.openDialog();
      if (this.allUserList.length === 0) {
        const res = await getUserList(this.searchParam);
        this.allUserList = res.datas.searchResult.results;
      }
      this.allUserList.forEach(item => {
        item.checkFlag = false;
      });
      this.searchParam.params.nickName = "";
      this.searchParam.params.userName = "";
      this.userChoseData = [...this.allUserList];
      this.$nextTick(function() {
        const userId = this[table].id;
        const users = this.userChoseData.filter(item => item.id === userId);
        this.$refs.userChoseMultipleTable.toggleRowSelection(users, true);
        users.checkFlag = true;
      });
      this.paginationFlag = "userList";
      this.userChoseDilog = true;
      this.addOrEdit = table;
    },
    openDialog() {
      this.dialogUserVisible = true;
    },
    onChose() {
      this.dialogUserVisible = false;
    },
    onConfirm(item) {
      this.radioNumner = -1;
      this.dialogUserVisible = false;
      // this.UserList.push(user)
    },
    orgEditDetail() {
      if (!this.validatorAll("edit")) {
        return false;
      }
      orgSave(this.editOrgData).then(res => {
        this.orgEditDilog = false;
        this.search();
      });
    },
    addOrg() {
      if (!this.validatorAll("orgAdd")) {
        return false;
      }
      this.addOrgData.validYear = this.searchParam.params.validYear;
      orgSave(this.addOrgData).then(() => {
        this.addOrgDilog = false;
        this.search();
        this.searchTree();
      });
    },
    checkPassword(table) {
      let startStr = "";
      if (table === "addUserData") {
        startStr = "userAdd";
      } else if (table === "personEdit") {
        startStr = "userEdit";
      }
      if (this[table].password === this[table].rePassword) {
        this.clearErrorMessage(startStr + "RePassword");
        return true;
      } else {
        this.setValidatorMessage(
          startStr + "RePassword",
          this.$t("comm.msg21")
        );
        return false;
      }
    },
    userSave(table) {
      // 获取当前年度
      this[table].validYear = this.validYear;
      let startValid = "";
      if (table === "addUserData") {
        startValid = "userAdd";
        this[table].id = null;
      } else if (table === "personEdit") {
        startValid = "userEdit";
      }
      if (!this.validatorAll(startValid) | !this.checkPassword(table)) {
        return false;
      }
      const item = this[table].userOrgs;
      if (!item || item.length === 0) {
        const roleItem = this[table].userOrgs[0].userRoles;
        if (!roleItem || roleItem.length === 0) {
          this.$message({
            type: "error",
            iconClass: "iconfont icongantanhao_icon",
            customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
            message: this.$t("comm.msg7")
          });
        } else {
          userSave(this[table]).then(res => {
            if (res && res.success) {
              this.addUserDilog = false;
              this.searchTree();
            }
          });
        }
      } else {
        let checkFlag = true;
        let mainPostionCnt = 0;
        for (var i = 0; i < item.length; i++) {
          if (!item[i].orgId || !item[i].orgName) {
            this.$message({
              type: "error",
              iconClass: "iconfont icongantanhao_icon",
              customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
              message: this.$t("comm.msg8")
            });
            checkFlag = false;
            break;
          }
          if (!item[i].positionCode) {
            this.$message({
              type: "error",
              iconClass: "iconfont icongantanhao_icon",
              customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
              message: this.$t("comm.msg9")
            });
            checkFlag = false;
            break;
          }
          if (!item[i].isMain) {
            this.$message({
              type: "error",
              iconClass: "iconfont icongantanhao_icon",
              customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
              message: this.$t("comm.msg9")
            });
            checkFlag = false;
            break;
          }
          if (item[i].isMain === "1") {
            mainPostionCnt++;
          }
        }
        if (checkFlag) {
          // modify by wanglei 20200527
          // if (mainPostionCnt !== 1) {
          //   this.$message({
          //     type: 'error',
          //     message: this.$t('comm.msg10')
          //   })
          // }
          // else {
          const roleItem = this[table].userOrgs[0].userRoles;
          if (!roleItem || roleItem.length === 0) {
            this.$message({
              type: "error",
              iconClass: "iconfont icongantanhao_icon",
              customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
              message: this.$t("comm.msg7")
            });
          } else {
            userSave(this[table]).then(res => {
              if (res && res.success) {
                this.addUserDilog = false;
                this.searchTree();
              }
            });
          }
          // }
        }
      }
    },
    orgEdit() {
      if (!this.validatorAll("orgEdit")) {
        return false;
      }
      orgSave(this.departmentEdit).then(() => {
        this.search();
        this.searchTree();
      });
    },
    // 123
    handleNodeClick(data) {
      console.log(this.orgAddOrEdit); // persionEdit或adduserData
      console.log(data);
      console.log(this[this.orgAddOrEdit].userOrgs);
      if (data.id === "_1") {
        this.$message({
          type: "error",
          iconClass: "iconfont icongantanhao_icon",
          customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
          message: this.$t("comm.msg22")
        });
        return false;
      }
      const repeat = this[this.orgAddOrEdit].userOrgs.filter(
        item => item.orgId === data.id
      );
      if (repeat.length > 0) {
        this.$message({
          type: "error",
          iconClass: "iconfont icongantanhao_icon",
          customClass: localStorage.getItem("theme") == "Dark" ? "dark-el-message" : " ",
          message: this.$t("comm.msg23")
        });
        return false;
      }
      const userRoles = [];
      userRoles.push({
        roleId: "ROLE_OPC_SYS_TOOL_AUTH",
        roleName: "系统功能照会角色"
      });
      console.log(userRoles);
      const newRow = {
        orgId: data.id,
        orgName: data.name,
        positionCode: "",
        isMain: "",
        userRoles
      };
      console.log(newRow);
      this[this.orgAddOrEdit].userOrgs.push(newRow);
      console.log(this[this.orgAddOrEdit].userOrgs);
      this.orgChoseDilog = false;
    },
    rolesSelect(table) {
      const role = [];
      this.allRoleList.forEach(obj => {
        if (obj.checkFlag) {
          role.push({ roleId: obj.id, roleName: obj.roleName });
        }
      });
      this[table].userOrgs[this.orgChoseIndex].userRoles = role;

      this.roleChoseDilog = false;
    },
    userSelect(table) {
      let id = "";
      let nickName = "";
      let userName = "";
      let corpUserId = "";
      let mobile = "";
      let ldapUserId = "";
      let email = "";
      let jobRank = "";
      let staffNum = "";
      this.allUserList.forEach(obj => {
        if (obj.checkFlag) {
          id = obj.id;
          nickName = obj.nickName;
          userName = obj.userName;
          corpUserId = obj.corpUserId;
          mobile = obj.mobile;
          ldapUserId = obj.ldapUserId;
          email = obj.email;
          jobRank = obj.jobRank;
          staffNum = obj.staffNum;
        }
      });
      this[table].id = id;
      this[table].nickName = nickName;
      this[table].userName = userName;
      this[table].corpUserId = corpUserId;
      this[table].mobile = mobile;
      this[table].ldapUserId = ldapUserId;
      this[table].email = email;
      this[table].jobRank = jobRank;
      this[table].staffNum = staffNum;
      this.userChoseDilog = false;
    },
    handleSizeChange(val) {
      this.searchParam.pageSize = val;
      this.searchParam.pageNo = 1;
      this.search();
    },
    handleSelect(selection, row) {
      const roles = selection.filter(item => item.id === row.id);
      if (roles.length > 0) {
        row.checkFlag = true;
      } else {
        row.checkFlag = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.user {
  height: 100%;
  width: 100%;
  background-color: #fff;
  border-radius: 6px;
  overflow: hidden;
  padding: 0 !important;
  .left {
    width: 180px;
    height: 100%;
    float: left;
    overflow: auto;
    box-sizing: border-box;
    padding: 0 5px;
    background-color: #eee;
    border-right: 5px solid #ccc;
    // background-color: skyblue;
    .tree_content {
      position: relative;
      .tree_item {
        .iconfont {
          font-size: 16px;
        }
        .icon-bumenguanli_h {
          color: rgb(180, 87, 6);
          font-size: 18px;
        }
        .icon-Avatar {
          color: rgb(64, 179, 224);
          font-size: 14px;
        }
        .icon-zuzhijiagou {
          color: cadetblue;
          font-size: 16px;
          position: relative;
          left: -12px;
        }
      }
      .tree_down {
        position: absolute;
        top: 20px;
        left: 15px;
        z-index: 999;
        background-color: #fff;
        padding: 3px;
        // height: 300px;
        display: none;
        p {
          height: 20px;
          line-height: 20px;
          font-size: 12px;
          color: #000;
          &:hover {
            background-color: #ccc;
          }
        }
      }
    }
  }
  .content {
    overflow: auto;
    height: 100%;
    box-sizing: border-box;
    padding: 20px;
    .list {
      h3 {
        height: 40px;
        line-height: 40px;
        font-size: 20px;
        border-bottom: 1px dashed #ccc;
        margin-bottom: 15px;
        position: relative;
        color: rgb(50, 50, 50);
      }
      .search {
        display: flex;
        flex-wrap: wrap;
        & > div {
          width: 33.33%;
          min-width: 200px;
          box-sizing: border-box;
          padding: 0 30px 15px 10px;
          display: flex;
          align-items: center;
          .title {
            width: 130px;
            font-size: 14px;
            font-weight: 700;
          }
          .input {
            flex: 1;
          }
        }
      }
      .pagination {
        text-align: right;
        padding: 20px 5px;
      }
    }
    .department {
      width: 100%;
      box-sizing: border-box;
      padding-left: 10%;
      .info {
        width: 50%;
        & > div {
          display: flex;
          padding: 10px 0;
          align-items: center;
          .title {
            width: 130px;
            font-size: 14px;
            font-weight: 700;
          }
          .input {
            flex: 1;
          }
        }
      }
      .btn {
        width: 50%;
        box-sizing: border-box;
        padding-left: 130px;
        margin-top: 10px;
      }
    }
    .personnel {
      .info {
        display: flex;
        flex-wrap: wrap;
        & > div {
          width: 50%;
          display: flex;
          box-sizing: border-box;
          padding: 10px 0;
          padding-right: 50px;
          align-items: center;
          .title {
            width: 120px;
            font-size: 14px;
            font-weight: 700;
          }
          .input {
            flex: 1;
          }
        }
      }
      h4 {
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        border-bottom: 1px dashed #ccc;
        color: rgb(50, 50, 50);
        margin-bottom: 10px;
        padding: 10px 0;
        position: relative;
        // color: #000;
        .add_row {
          position: absolute;
          right: 0;
          bottom: 10px;
          border-radius: 6px;
          // border: 1px solid #ccc;
          cursor: pointer;
          font-size: 12px;
          width: 100px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          background-image: linear-gradient(
            rgb(52, 165, 248),
            rgb(8, 142, 240)
          );
          color: #fff;
          &:hover {
            background-image: linear-gradient(
              rgb(42, 155, 238),
              rgb(8, 142, 240)
            );
          }
        }
      }
      .affiliation,
      .role {
        width: 80%;
        .select_role {
          display: flex;
          .input {
            margin-right: 15px;
          }
        }
      }
      .btn {
        width: 80%;
        box-sizing: border-box;
        padding-left: 30px;
        margin-top: 10px;
      }
    }
  }
  .orgChoseDilog {
    .box {
      height: 300px;
      overflow: auto;
      background-color: #fff;
    }
  }
}
</style>
<style lang="scss">
.user {
  .left {
    .el-tree {
      background-color: #eee;
      color: #000;
      font-size: 14px;
      .el-tree-node > .el-tree-node__children {
        overflow: visible;
      }
    }
  }
}
</style>

