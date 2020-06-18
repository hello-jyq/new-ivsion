<template>
  <div ref="index" class="index">
    <el-row
      :gutter="20"
      class="marigin-bottom"
    >
      <el-col
        :span="8"
      >
        <el-card shadow="never" class="todo-card funnel-card">
          <div slot="header" class="clearfix">
            <span>销售漏斗</span>
          </div>
          <!-- <div class="funnel">
            <img src="@/assets/images/funnel.png">
          </div> -->
          <div ref="funnelEcharts" class="funnel" style="width:100%;height:305px" />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="never" class="todo-card">
          <div slot="header">
            <span>{{ $t('dashboard.pendingDisposal') }}</span>
            <span class="circle-btn btn-default-color card-more" @click="handleTasksBtnOnClick"><i class="iconfont icongengduo" /></span>
          </div>
          <el-table
            stripe
            border
            :data="taskList"
            style="width: 100%"
          >
            <el-table-column
              prop="processDefinitionName"
              min-width="20%"
              show-overflow-tooltip
              align="center"
              :label="$t('dashboard.functionName')"
            />
            <el-table-column
              prop="name"
              min-width="23%"
              show-overflow-tooltip
              align="center"
              :label="$t('dashboard.currentNode')"
            />
            <el-table-column
              min-width="30%"
              show-overflow-tooltip
              prop="processName"
              align="center"
              :label="$t('dashboard.businessNumber')"
            >
              <template slot-scope="scope">
                <router-link :to="{path: scope.row.formKey, query: {taskId: scope.row.id, processInstId: scope.row.processInstId, id: scope.row.businessKey}}">
                  {{ scope.row.processName }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              min-width="27%"
              show-overflow-tooltip
              prop="startTime"
              align="center"
              :label="$t('dashboard.submissionTime')"
            >
              <template slot-scope="scope">
                <p>{{ dateFtt("yyyy-MM-dd", scope.row.startTime) }}</p>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="never" class="todo-card">
          <div slot="header">
            <span>{{ $t('dashboard.inProcessing') }}</span>
            <span class="circle-btn btn-default-color card-more" @click="handleRunningBtnOnClick"><i class="iconfont icongengduo" /></span>
          </div>
          <el-table
            stripe
            border
            :data="runningList"
            style="width: 100%"
          >
            <el-table-column
              prop="processDefinitionName"
              min-width="20%"
              show-overflow-tooltip
              align="center"
              :label="$t('dashboard.functionName')"
            />
            <el-table-column
              prop="currentTaskName"
              min-width="23%"
              show-overflow-tooltip
              align="center"
              :label="$t('dashboard.currentNode')"
            />
            <el-table-column
              min-width="30%"
              show-overflow-tooltip
              prop="name"
              align="center"
              :label="$t('dashboard.businessNumber')"
            >
              <template slot-scope="scope">
                <a href="javascript:;" @click.prevent="handleProcessInstClick(scope.row.id)">
                  {{ scope.row.name }}
                </a>
              </template>
            </el-table-column>
            <el-table-column
              min-width="27%"
              show-overflow-tooltip
              prop="startTime"
              align="center"
              :label="$t('dashboard.submissionTime')"
            >
              <template slot-scope="scope">
                <p>{{ dateFtt("yyyy-MM-dd", scope.row.startTime) }}</p>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <div class="bar-box marigin-bottom">
      <p class="echarts-title">
        禀议科目一栏<span>单位（千元）</span>
      </p>
      <div id="bar-echarts" ref="barEcharts" />
    </div>
    <div class="bar-box bar-cause-box marigin-bottom">
      <p class="echarts-title">
        事业开发部 预算实绩<span>单位（千元）</span>
      </p>
      <div id="bar-cause-echarts" ref="barCauseEcharts" />
    </div>
    <el-row
      :gutter="20"
      class="marigin-bottom"
    >
      <el-col :span="16">
        <el-card shadow="never" class="todo-card">
          <div slot="header">
            <span>{{ $t('dashboard.inProcessing') }}</span>
            <span class="circle-btn btn-default-color card-more" @click="handleRunningBtnOnClick"><i class="iconfont icongengduo" /></span>
          </div>
          <el-table
            stripe
            border
            :data="runningList"
            style="width: 100%"
          >
            <el-table-column
              prop="processDefinitionName"
              min-width="20%"
              show-overflow-tooltip
              align="center"
              :label="$t('dashboard.functionName')"
            />
            <el-table-column
              prop="currentTaskName"
              min-width="23%"
              show-overflow-tooltip
              align="center"
              :label="$t('dashboard.currentNode')"
            />
            <el-table-column
              min-width="30%"
              show-overflow-tooltip
              prop="name"
              align="center"
              :label="$t('dashboard.businessNumber')"
            >
              <template slot-scope="scope">
                <a href="javascript:;" @click.prevent="handleProcessInstClick(scope.row.id)">
                  {{ scope.row.name }}
                </a>
              </template>
            </el-table-column>
            <el-table-column
              min-width="27%"
              show-overflow-tooltip
              prop="startTime"
              align="center"
              :label="$t('dashboard.submissionTime')"
            >
              <template slot-scope="scope">
                <p>{{ dateFtt("yyyy-MM-dd", scope.row.startTime) }}</p>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="never" class="todo-card">
          <div slot="header">
            <span class="title">{{ $t('dashboard.completed') }}</span>
            <span class="circle-btn btn-default-color card-more" @click="handleFinishedBtnOnClick"><i class="iconfont icongengduo" /></span>
          </div>

          <el-table
            stripe
            border
            :data="finishedList"
            style="width: 100%"
          >
            <el-table-column
              prop="processDefinitionName"
              min-width="25%"
              show-overflow-tooltip
              align="center"
              :label="$t('dashboard.functionName')"
            />
            <el-table-column
              min-width="42%"
              show-overflow-tooltip
              prop="name"
              align="center"
              :label="$t('dashboard.businessNumber')"
            >
              <template slot-scope="scope">
                <a href="javascript:;" @click.prevent="handleProcessInstClick(scope.row.id)">
                  {{ scope.row.name }}
                </a>
              </template>
            </el-table-column>
            <el-table-column
              min-width="33%"
              show-overflow-tooltip
              prop="sendTime"
              align="center"
              :label="$t('dashboard.submissionTime')"
            >
              <template slot-scope="scope">
                <p>{{ dateFtt("yyyy-MM-dd", scope.row.startTime) }}</p>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog id="processDialog" :title="$t('dashboard.detailedProcess') + processInstId" :visible.sync="dialogTableVisible" width="80%">
      <process-detail :process-inst-id="processInstId" :can-withdraw="true" />
    </el-dialog>
  </div>
</template>
<script>
import { getTasks, getRunnings, getFinished } from '@/api/base'
import ProcessDetail from '@/components/ProcessDetail'
var elementResizeDetectorMaker = require('element-resize-detector')
export default {
  components: {
    ProcessDetail
  },
  filters: {
    dateTimeFormat(val) {
      // yyyy-MM-dd HH:mm:ss 转为 yyyy-MM-dd
      return val ? val.substring(0, 10) : val
    }
  },
  data() {
    return {
      theme: 'Light',
      value: new Date(),
      processInstId: '',
      dialogTableVisible: false,
      taskList: [],
      runningList: [],
      finishedList: [],
      FunnelDark: {
        color: '#ffffff',
        funnelColor: ['#006461', '#008581', '#00BAB6', '#0AFFF9', '#6DFFFC'],
        shadowColor: 'rgba(0,0,0,.5)'
      },
      FunnelLight: {
        color: '#666666',
        funnelColor: ['#FF6124', '#FFBF1B ', '#2FA5BB', '#5FA0FF', '#A071FD'],
        shadowColor: 'rgba(0,0,0,0)'
      },
      barDark: {
        color1: '#ffffff',
        color2: '#dddddd',
        bgColor: '#16171B',
        borderColor: '#44474E',
        line: '#5a5a5a',
        barColor: [{
          from: '#00EBE4',
          to: '#009A97'
        },
        {
          from: '#FF9238',
          to: '#D66000'
        },
        {
          from: '#9668D6',
          to: '#793DCE'
        },
        {
          from: '#FFDC38',
          to: '#D69E00'
        }]
      },
      barLight: {
        color1: '#333333',
        color2: '#666666',
        bgColor: '#ffffff',
        borderColor: '#ffffff',
        line: '#DBDBDB',
        barColor: [{
          from: '#2FA5BB',
          to: '#2FA5BB'
        },
        {
          from: '#FFBF1B',
          to: '#FFBF1B'
        },
        {
          from: '#A071FD',
          to: '#A071FD'
        },
        {
          from: '#FF6124',
          to: '#FF6124'
        }]
      },
      causeBarDark: {
        color1: '#ffffff',
        color2: '#dddddd',
        bgColor: '#16171B',
        borderColor: '#44474E',
        line: '#5a5a5a',
        barColor: [{
          from: '#00EBE4',
          to: '#009A97'
        },
        {
          from: '#FF9238',
          to: '#D66000'
        },
        {
          from: '#9668D6',
          to: '#793DCE'
        }]
      },
      causeBarLight: {
        color1: '#333333',
        color2: '#666666',
        bgColor: '#ffffff',
        borderColor: '#ffffff',
        line: '#DBDBDB',
        barColor: [{
          from: '#2FA5BB',
          to: '#2FA5BB'
        },
        {
          from: '#FFBF1B',
          to: '#FFBF1B'
        },
        {
          from: '#FF6124',
          to: '#FF6124'
        }]
      }
    }
  },
  created: function() {
    this.fetchData()
  },
  mounted() {
    this.theme = localStorage.getItem('theme') || 'Light'
    console.log('this.theme', this.theme)
    if (this.theme === 'Dark') {
      this.gerFunnel(this.FunnelDark)
      this.getBar(this.barDark)
      this.getCauseBar(this.causeBarDark)
    } else {
      this.gerFunnel(this.FunnelLight)
      this.getBar(this.barLight)
      this.getCauseBar(this.causeBarLight)
    }

    var erd = elementResizeDetectorMaker()
    var that = this
    erd.listenTo(that.$refs.index, function(element) {
      that.$nextTick(function() {
        // 使echarts尺寸重置
        that.$echarts.init(this.$refs.barEcharts).resize()
        that.$echarts.init(this.$refs.barCauseEcharts).resize()
        that.$echarts.init(this.$refs.funnelEcharts).resize()
      })
    })
  },
  methods: {
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
    },
    gerFunnel(theme) {
      const dom = this.$refs.funnelEcharts
      var myChart = this.$echarts.init(dom)
      var option = {
        title: {
          x: 'left',
          textStyle: {
            color: theme.color,
            fontSize: 16
          }
        },
        color: theme.funnelColor,
        tooltip: {
          trigger: 'none'

        },

        legend: {
          left: 'right',
          align: 'left',
          top: '2%',
          itemWidth: 12,
          itemHeight: 12,
          orient: 'vertical',
          textStyle: {
            color: theme.color,
            fontSize: 12
          },
          data: ['初步沟通', '需求分析', '方案定制', '提案订单', '正式签约']

        },
        calculable: true,
        series: [
          {
            name: '漏斗图',
            type: 'funnel',
            left: '0',
            top: 40,
            bottom: 20,
            width: '80%',
            legendHoverLink: false,
            animation: false,
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 0,
            label: {
              normal: {
                show: true,
                position: 'inside'
              },
              emphasis: {
                textStyle: {
                  fontSize: 12
                }
              }
            },
            labelLine: {
              normal: {
                length: 0,
                lineStyle: {
                  width: 0,
                  type: 'solid'
                }
              }
            },
            itemStyle: {
              normal: {
                borderWidth: 0,
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowColor: theme.shadowColor
              }
            },
            data: [
              { value: 90, name: '初步沟通' },
              { value: 70, name: '需求分析' },
              { value: 50, name: '方案定制' },
              { value: 30, name: '提案订单' },
              {
                value: 10, name: '正式签约',
                label: {
                  normal: {
                    show: true,
                    position: 'rightBottom',
                    textStyle: {
                      color: theme.color
                    }
                  }
                }
              }
            ]
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
      window.onresize = function() {
        myChart.resize()
      }
    },
    getBar(theme) {
      // 基于准备好的dom，初始化echarts实例
      const dom = this.$refs.barEcharts
      var myChart = this.$echarts.init(dom)

      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          position: function(point, params, dom, rect, size) {
            // 固定在顶部
            return [point[0] + 20, point[1] - 70]
          },
          backgroundColor: theme.bgColor,
          borderColor: theme.borderColor,
          borderWidth: 2,
          extraCssText: 'box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.5);border-radius:5px;',
          formatter: function(params) {
            var result = params[0].axisValue + '</br>'
            for (var i = 0; i < params.length; i++) {
              const color = params[i].color.colorStops[0].color
              var dotHtml = '<span style="display:inline-block;margin-right:3px;width:8px;height:8px;background-color:' + color + '"></span>'
              result += dotHtml + ' ' + params[i].seriesName + ' ' + params[i].data + '</br>'
            }
            return result
          },
          textStyle: {
            color: theme.color2,
            fontStyle: 'normal',
            fontFamily: '微软雅黑',
            fontSize: 12
          }
        },
        toolbox: {
          right: '-5', // 距左
          top: '-3', // 距上
          feature: {
            magicType: {
              show: true,
              type: ['line', 'bar']
            },
            restore: {
              show: true

            }
          },
          itemSize: 16
        },
        grid: {
          left: '1.5%',
          right: '1.5%',
          bottom: '0',
          top: '26%',
          containLabel: true
        },
        legend: {// 图例组件，颜色和名字
          top: '7px',
          itemGap: 20,
          itemWidth: 12,
          itemHeight: 12,
          borderRadius: 5,
          // icon: 'rect',
          data: [{
            name: '预算'
          },
          {
            name: '部门禀议中'
          }, {
            name: '部门禀议通过'
          }, {
            name: '实绩'
          }],
          textStyle: {
            color: theme.color2,
            fontStyle: 'normal',
            fontFamily: '微软雅黑',
            fontSize: 12
          }
        },
        barGap: '0',
        xAxis: [
          {
            type: 'category',
            data: ['教育研修费', '人才绍介费', '国内出张费', '海外出张费', '财务委托费', '接待结交计费', '社内交际费', '一般福利费', '地贷家凭', '电话代', '光热费', '交通费'],
            axisLabel: { // 坐标轴刻度标签的相关设置。
              margin: 15,
              textStyle: {
                color: theme.color1,
                fontStyle: 'normal',
                fontFamily: '微软雅黑',
                fontSize: 12
              },
              rotate: 50

            },
            axisTick: {// 坐标轴刻度相关设置。
              show: true,
              inside: false,
              length: 8,
              alignWithLabel: true
            },
            axisLine: {// 坐标轴轴线相关设置
              lineStyle: {
                color: theme.line,
                opacity: 0.2
              }
            },
            splitLine: { // 坐标轴在 grid 区域中的分隔线。
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            scale: true,
            min: 0,
            splitNumber: 5,
            axisLabel: {
              textStyle: {
                color: theme.color1,
                fontStyle: 'normal',
                fontFamily: '微软雅黑',
                fontSize: 12
              }
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: theme.line,
                type: 'dashed'
              }
            }

          }
        ],
        series: [
          {
            name: '预算',
            type: 'bar',
            data: [10, 15, 30, 45, 55, 60, 62, 80, 80, 62, 60, 55],
            barWidth: '12',
            itemStyle: {
              normal: {
                show: true,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: theme.barColor[0].from
                }, {
                  offset: 1,
                  color: theme.barColor[0].to
                }]),
                barBorderRadius: [30, 30, 0, 0],
                borderWidth: 0
              }
            }
          },
          {
            name: '部门禀议中',
            type: 'bar',
            data: [8, 50, 25, 35, 35, 35, 62, 86, 65, 59, 62, 45],
            barWidth: '12',
            itemStyle: {
              normal: {
                show: true,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: theme.barColor[1].from
                }, {
                  offset: 1,
                  color: theme.barColor[1].to
                }]),
                barBorderRadius: [30, 30, 0, 0],
                borderWidth: 0
              }
            }
          },
          {
            name: '部门禀议通过',
            type: 'bar',
            data: [8, 5, 25, 30, 35, 55, 62, 78, 88, 5, 68, 76],
            barWidth: '12',
            itemStyle: {
              normal: {
                show: true,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: theme.barColor[2].from
                }, {
                  offset: 1,
                  color: theme.barColor[2].to
                }]),
                barBorderRadius: [30, 30, 0, 0],
                borderWidth: 0
              }
            }
          },
          {
            name: '实绩',
            type: 'bar',
            data: [18, 50, 55, 60, 5, 55, 62, 38, 65, 55, 60, 15],
            barWidth: '12',
            itemStyle: {
              normal: {
                show: true,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: theme.barColor[3].from
                }, {
                  offset: 1,
                  color: theme.barColor[3].to
                }]),
                barBorderRadius: [30, 30, 0, 0],
                borderWidth: 0
              }
            }
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
      window.onresize = function() {
        myChart.resize()
      }
    },
    getCauseBar(theme) {
      // 基于准备好的dom，初始化echarts实例
      const dom = this.$refs.barCauseEcharts
      var myChart = this.$echarts.init(dom)

      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          position: function(point, params, dom, rect, size) {
            // 固定在顶部
            return [point[0] + 20, point[1] - 70]
          },
          backgroundColor: theme.bgColor,
          borderColor: theme.borderColor,
          borderWidth: 2,
          extraCssText: 'box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.5);border-radius:5px;',
          formatter: function(params) {
            var result = params[0].axisValue + '</br>'
            for (var i = 0; i < params.length; i++) {
              const color = params[i].color.colorStops[0].color
              var dotHtml = '<span style="display:inline-block;margin-right:5px;width:8px;height:8px;background-color:' + color + '"></span>'
              result += dotHtml + ' ' + params[i].seriesName + ' ' + params[i].data + '</br>'
            }
            return result
          },
          textStyle: {
            color: theme.color2,
            fontStyle: 'normal',
            fontFamily: '微软雅黑',
            fontSize: 12
          }
        },

        grid: {
          left: '0',
          right: '0',
          bottom: '0',
          top: '15%',
          containLabel: true
        },
        legend: {// 图例组件，颜色和名字
          top: '7px',
          right: '15px',
          itemGap: 25,
          itemWidth: 12,
          itemHeight: 12,
          data: [{
            name: '实际'
          },
          {
            name: '预估'
          }, {
            name: '预算'
          }],
          textStyle: {
            color: theme.color2,
            fontStyle: 'normal',
            fontFamily: '微软雅黑',
            fontSize: 12
          }
        },
        barGap: '0',
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisLabel: { // 坐标轴刻度标签的相关设置。
              margin: 15,
              textStyle: {
                color: theme.color1,
                fontStyle: 'normal',
                fontFamily: '微软雅黑',
                fontSize: 12

              },
              rotate: 50
            },
            axisTick: {// 坐标轴刻度相关设置。
              show: true,
              inside: false,
              length: 8,
              alignWithLabel: true
            },
            axisLine: {// 坐标轴轴线相关设置
              lineStyle: {
                color: theme.line,
                opacity: 0.2
              }
            },
            splitLine: { // 坐标轴在 grid 区域中的分隔线。
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            scale: true,
            min: 0,
            splitNumber: 9,
            axisLabel: {
              textStyle: {
                color: theme.color1,
                fontStyle: 'normal',
                fontFamily: '微软雅黑',
                fontSize: 12
              }
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: theme.line,
                type: 'dashed'
              }
            }

          }
        ],
        series: [
          {
            name: '实际',
            type: 'bar',
            data: [100, 215, 130, 345, 455, 260, 162, 380, 180, 162, 160, 555],
            barWidth: '12',
            itemStyle: {
              normal: {
                show: true,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: theme.barColor[0].from
                }, {
                  offset: 1,
                  color: theme.barColor[0].to
                }]),
                barBorderRadius: [30, 30, 0, 0],
                borderWidth: 0
              }
            }
          },

          {
            name: '预估',
            type: 'bar',
            data: [348, 475, 325, 430, 235, 55, 262, 378, 565, 355, 260, 145],
            barWidth: '12',
            itemStyle: {
              normal: {
                show: true,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: theme.barColor[1].from
                }, {
                  offset: 1,
                  color: theme.barColor[1].to
                }]),
                barBorderRadius: [30, 30, 0, 0],
                borderWidth: 0
              }
            }
          },
          {
            name: '预算',
            type: 'bar',
            data: [580, 560, 525, 235, 435, 335, 262, 186, 365, 259, 362, 545],
            barWidth: '12',
            itemStyle: {
              normal: {
                show: true,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: theme.barColor[2].from
                }, {
                  offset: 1,
                  color: theme.barColor[2].to
                }]),
                barBorderRadius: [30, 30, 0, 0],
                borderWidth: 0
              }
            }
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
      window.onresize = function() {
        myChart.resize()
      }
    },

    fetchData() {
      this.getTasksList()
      this.getRunningsList()
      this.getFinishedList()
    },
    async getTasksList() {
      const res = await getTasks({})
      const results = res.datas.taskList
      const cut = results.splice(0, 4)
      this.taskList = cut
    },
    async getRunningsList() {
      const res = await getRunnings({})
      const { results } = res.datas.searchResult
      const cut = results.splice(0, 4)
      this.runningList = cut
    },
    async getFinishedList() {
      const res = await getFinished({})
      const { results } = res.datas.searchResult
      const cut = results.splice(0, 4)
      this.finishedList = cut
    },
    handleTasksBtnOnClick() {
      this.$router.push('/workflow/tasks')
    },
    handleRunningBtnOnClick() {
      this.$router.push('/workflow/runnings')
    },
    handleFinishedBtnOnClick() {
      this.$router.push('/workflow/finished')
    },
    handleProcessInstClick(processInstId) {
      this.processInstId = processInstId
      this.dialogTableVisible = true
    }

  }
}
</script>
<style lang="scss" scoped>
  .index {
    width: 100%;
    padding: 0 40px 0 70px;
    box-sizing: border-box;
    overflow: hidden;
    .todo-card{
      .funnel{
        width: 100%;
        height: 345px;
        padding: 20px 0 0px;
        margin: 0 auto;
         img{
        display: block;
        height: 100%;
        margin: 0 auto;
      }
      }
    }
    .bar-box{
        position: relative;
        width:100%;
        height:430px;
        padding: 20px;
        border-radius:16px;
        #bar-echarts{
          width: 100%;
          height: 100%;
        }
      .echarts-title{
       position: absolute;
        height: 21px;
        line-height: 21px;
        font-size:16px;
        font-family:"微软雅黑";
        font-weight:bold;
        // color: #ffffff;
        span{
          padding-left: 10px;
          font-size:12px;
        }
      }
    }
    .bar-cause-box{
      height: 510px;
      #bar-cause-echarts{
         width: 100%;
          height: 100%;
      }
    }

  }
</style>
