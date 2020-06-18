var express = require('express')
var path = require('path')
var fs = require('fs')
var bodyParser = require('body-parser') // 对post请求的请求体进行解析模块
var app = express()
app.use(bodyParser.urlencoded({
  extended: false,
  'Content-Type': 'application/json'
})) // bodyParser.urlencoded 用来解析request中body的 urlencoded字符，只支持utf-8的编码的字符，也支持自动的解析gzip和 zlib。返回的对象是一个键值对，当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。
app.use(bodyParser.json())
var hostName = '127.0.0.1' // ip
var port = 8081 // 端口
// 设置允许跨域请求
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Metheds', 'PUT, POST, GET, DELETE, OPTIONS')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})
// 创建get接口
app.post('/api/getSummaryList', (req, res) => {
  console.log('查询参数：', req.body) // 获取请求参数
  const { year, department, category, state, zero } = req.body
  const file = path.join(__dirname, 'dataList/data.json') // 文件路径，__dirname为当前运行js文件的目录
  // 读取json文件
  fs.readFile(file, 'utf-8', function(err, data1) {
    if (err) {
      console.log('文件读取失败')
      res.send({
        summaryList: [],
        code: 0,
        mes: '程序运行错误'
      })
    } else {
      // eslint-disable-next-line no-undef
      data = JSON.parse(data1)

      // eslint-disable-next-line no-undef
      const { summaryList } = data
      let list = [...summaryList]
      // 条件查询
      if (year) {
        list = list.filter(item => item.year === year)
      }
      if (department) {
        list = list.filter(item => item.department === department)
      }
      if (category) {
        list = list.filter(item => item.category === category)
      }
      if (state) {
        // console.log()
        list = list.filter(item => item.state === state)
      }
      if (zero && zero === 2) {
        list = list.filter(item => {
          if (!item.valueList.every(value => value.value === 0)) {
            // console.log('我进来了')
            return item
          }
        })
      }
      // 计算总合
      const countList = []
      list.forEach(item => {
        item.valueList.forEach((v, i) => {
          countList[i] = countList[i] || {}
          countList[i].title = v.title
          countList[i].value = countList[i].value ? countList[i].value + v.value : v.value
        })
      })
      console.log(countList)
      setTimeout(() => {
        res.send({ summaryList: list, countList })
      }, 200)
    }
  })
})
// 0. 共同 业务字典取得
app.post('/api/base/getDictEntriesByTypeId', (req, res) => {
  const { dictTypeId } = req.body
  // 读取json文件并送信
  const file = path.join(__dirname, 'dataList/dict.json') // 文件路径，__dirname为当前运行js文件的目录
  // 读取json文件
  fs.readFile(file, 'utf-8', function(err, data1) {
    if (err) {
      console.log('文件读取失败')
      res.send({
        code: 0,
        mes: '程序运行错误'
      })
    } else {
      // eslint-disable-next-line no-undef
      data = JSON.parse(data1)

      // eslint-disable-next-line no-undef
      const json = data[dictTypeId]
      console.log(json)
      setTimeout(() => {
        res.send(json)
      }, 200)
    }
  })
})
// 1. loginApi
app.post('/api/auth/ajaxLogin', (req, res) => {
  console.log('查询参数：', req.body) // 获取请求参数
  // 读取json文件并送信
  sentResByJson('dataList/logininfo.json', res)
})
app.get('/api/auth/loginInfo', (req, res) => {
  console.log('查询参数：', req.body) // 获取请求参数
  // 读取json文件并送信
  sentResByJson('dataList/logininfo.json', res)
})

app.get('/api/auth/logout', (req, res) => {
  console.log('查询参数：', req.body) // 获取请求参数
  // 读取json文件并送信
  const data = { 'messages': [], 'warnings': [], 'message': null, 'arguments': null, 'success': true, 'datas': {}}
  setTimeout(() => {
    res.send(data)
  }, 200)
})

// 2. home画面取得用户tasks
app.post('/api/workflow/user/tasks', (req, res) => {
  console.log('查询参数：', req.body) // 获取请求参数
  // 读取json文件并送信
  sentResByJson('dataList/approve/tasks.json', res)
})

// 3. home画面取得用户runningaprove/
app.post('/api/workflow/user/runnings', (req, res) => {
  console.log('查询参数：', req.body) // 获取请求参数
  // 读取json文件并送信
  sentResByJson('dataList/approve/runnings.json', res)
})

// 3. home画面取得用户running
app.post('/api/workflow/user/finished', (req, res) => {
  console.log('查询参数：', req.body) // 获取请求参数
  // 读取json文件并送信
  sentResByJson('dataList/approve/finished.json', res)
})

// 4. 预算模板的取得api/wfdemo/list
app.post('/api/wfdemo/list', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/demodata/wfdemo.json', res)
})

// 5 admin组织取得/listOrgs
app.post('/api/org/listOrgs', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/admin/listOrgs.json', res)
})

// 6 admin组织及人员取得/listOrgs
app.post('/api/org/getAllOrgAndUserTree/:test', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/admin/allOrgAndUserTree.json', res)
})

app.post('/api/org/getAllOrgTree', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/admin/allOrgTree.json', res)
})

app.post('/api/org/orgUserEdit/:account', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/admin/userinfo.json', res)
})

// 取得业务信息信息
app.get('/api/wfdemo/info', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/demodata/onedata.json', res)
})

// 取得审批的详细信息
app.post('/api/workflow/admin/processInstInfo/:processInstId', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/approve/processdetail.json', res)
})
app.get('/api/workflow/user/process/trace/:taskid', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/approve/trace.json', res)
})

app.get('/api/workflow/user/showPic/:taskid', (req, res) => {
  // 读取json文件并送信
  const filePath = path.join(__dirname, 'dataList/approve/workflow.png')

  res.sendFile(filePath)
})
app.get('/api/workflow/user/getBackActivity', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/approve/backActivityList.json', res)
})

// 预实查看--预实一览
app.post('/api/baf/list', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/bud/baf/bafList.json', res)
})
app.post('/api/budget/list', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/demodata/budgetList.json', res)
})

// --- 20200514 添加 start  add by ivision-------
// 组织树取得（预实画面，财务预设）
app.post('/api/comm/bdmorglist', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/bud/comm/bdmogList.json', res)
})
// 2-1 预实填写数据
app.post('/api/baf/detail', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/bud/baf/2-1detail.json', res)
})

//  // 禀议查看3-1禀议一览画面
app.post('/api/adr/list', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/bud/adr/3-1adrList.json', res)
})
// 禀议查看3-2-1禀议详情画面(非叶子节点信息)
app.post('/api/adr/departDetails', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/bud/adr/3-2-1adrDepartDetails.json', res)
})
// 禀议查看3-2-2禀议详情画面(叶子节点信息)
app.post('/api/adr/childDetails', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/bud/adr/3-2-2adrChildDetails.json', res)
})
//  禀议查看3-3禀议详情查看.jpg
app.post('/api/apr/detail', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/bud/adr/3-3detail.json', res)
})
//  禀议查看3-4禀议详情查看.jpg
app.post('/api/apr/applylist', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/bud/adr/3-5applyList.json', res)
})
// 3-6禀议通过查看popup.jpg
app.post('/api/apr/expenselist', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/bud/adr/3-6List.json', res)
})

// 禀议申请画面 3-7禀议申请检索.jpg
app.post('/api/apa/list', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/bud/ada/3-7list.json', res)
})
// 禀议申请画面 3-7禀议申请检索.jpg
app.post('/api/apa/info/', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/bud/ada/3-9onedata.json', res)
})

// 7. 科目类API
// 7-1 预算科目一览的取得api/basedata/item/list
app.post('/api/itm/list', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/bud/itm/itemList.json', res)
})

// 7-2 获取系统所有科目组
app.post('/api/itm/allParentItem', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/bud/itm/allParentItem.json', res)
})

// 7-3 获取科目/科目组详细信息
app.post('/api/itm/info/:id', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/bud/itm/itemDetail.json', res)
})

// 8. 通用获取模板年度列表API
app.get('/api/comm/tplyears', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/bud/comm/tplYearList.json', res)
})

// 9. 分页查询模板列表API
app.post('/api/tpl/list', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/bud/tpl/tplList.json', res)
})

// 10. 查询模板信息API
app.get('/api/tpl/info/:id', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/bud/tpl/4-1.json', res)
})

// 11. 查询顶层科目信息列表API
app.get('/api/tpl/item/toplist', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/bud/tpl/4-2.json', res)
})

// 12. popup分页查询科目列表API
app.post('/api/itm/items', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/bud/tpl/4-3.json', res)
})

// 13. 查询科目树形机构信息列表API
app.get('/api/tpl/item/treelist', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/bud/tpl/4-5.json', res)
})

// 14. 合计项编辑popup选中数据回显API
app.get('/api/tpl/itemtotal/list', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/bud/tpl/4-6.json', res)
})

// 15. 财务预设右边表格数据列表API
app.post('/api/tpl/bdmlist', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/bud/tpl/4-9-budList.json', res)
})

// 预算申请检索画面
app.post('/api/bdm/list', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/bud/bdm/bdmList.json', res)
})

// 8. 通用获取模板年度列表API
app.post('/api/comm/budorglist', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/bud/comm/bdmogList.json', res)
})

// --- 20200514 添加 end -------

// --- 20200525 添加 start -----

app.post('/api/tpl/save', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/bud/tpl/4-1.json', res)
})

app.post('/api/tpl/item/save', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/bud/tpl/msg-ok.json', res)
})

app.post('/api/tpl/itemtotal/save', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/bud/tpl/msg-ok.json', res)
})

app.post('/api/tpl/item/sortupdate', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/bud/tpl/msg-ok.json', res)
})
// --- 20200525 添加 end -----

// --- 20200525 变更履历 添加 start -----
// 5-1更新履历.jpg
app.post('/api/baf/updatehistory', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/bud/baf/5-1updateHistory.json', res)
})

// 5-2更新履历.jpg
app.post('/api/baf/itemhistory', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/bud/baf/5-2updateHistoryOneItem.json', res)
})

// --- 20200525 变更履历 添加 end -----

app.post('/api/tpl/reset', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/bud/tpl/msg-ok.json', res)
})

app.post('/api/comm/bdminfo', (req, res) => {
  // 读取json文件并送信
  sentResByJson('dataList/bud/bdm/2-1detail.json', res)
})

function sentResByJson(filePath, res) {
  const file = path.join(__dirname, filePath) // 文件路径，__dirname为当前运行js文件的目录
  fs.readFile(file, 'utf-8', function(err, data1) {
    if (err) {
      console.log('文件读取失败')
      res.send({
        code: 0,
        mes: '程序运行错误'
      })
    } else {
      // eslint-disable-next-line no-undef
      const data = JSON.parse(data1)
      // eslint-disable-next-line no-undef
      // const { jsonstr } = data
      setTimeout(() => {
        res.send(data)
      }, 200)
    }
  })
}
app.listen(port, hostName, function() {
  console.log('服务启动')
  console.log(`监听端口${port}`)
  console.log(`连接地址http://${hostName}:${port}`)
})
