import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login'
import NotFound from '@/views/404'
// import store from '@/store/index'
// import {getToken, getUserInfo} from '@/utils/storage'

Vue.use(Router)
const createRouter = () => new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          name: '/Dashboard',
          component: () => import('@/views/dashboard/Dashboard.vue')
        },
        {
          path: '/summary',
          name: '预算汇总',
          component: () => import('@/views/bud/Summary.vue')
        },
        {
          path: '/summary1',
          name: '预算汇总1',
          component: () => import('@/views/bud/Summary1.vue')
        },
        {
          path: '/quotation/apply',
          name: '报价新建',
          component: () => import('@/views/bud/quo/Apply.vue')
        },
        {
          path: '/quotation/edit',
          name: '报价编辑',
          component: () => import('@/views/bud/quo/Edit.vue')
        },
        {
          path: '/quotation/detail',
          name: '报价详细',
          component: () => import('@/views/bud/quo/Detail.vue')
        },
        {
          path: '/apply',
          name: '',
          component: () => import('@/views/bud/Apply.vue')
        },
        {
          path: '/detail',
          name: '预算详细',
          component: () => import('@/views/bud/Detail.vue')
        },
        {
          path: '/advices',
          name: '',
          component: () => import('@/views/bud/Advice.vue')
        },
        {
          path: '/tableDemo',
          name: '',
          component: () => import('@/views/bud/Table.vue')
        },
        {
          path: '/demo',
          name: '',
          component: () => import('@/views/bud/Demo.vue')
        },
        {
          path: '/btnDemo',
          name: '',
          component: () => import('@/views/bud/BtnDemo.vue')
        }
        ,
        {
          path: '/edit',
          name: '',
          component: () => import('@/views/bud/edit.vue')
        }
      ]
    },

    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/changePassword',
      name: 'ChangePassword',
      component: () => import('@/views/ChangePassword.vue')
    },
    {
      path: '/retrievePassword',
      name: 'RetrievePassword',
      component: () => import('@/views/RetrievePassword.vue')
    },
    {
      path: '/404',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // the relevant part
}

/**
* 加载动态菜单和路由
*/
export function addDynamicMenuAndRoutes(menus) {
  // 添加动态路由
  // 添加动态路由前，重置默认路由，防止登出后路由不清空
  resetRouter()
  const dynamicRoutes = addDynamicRoutes(menus)
  dynamicRoutes.push({
    path: '*',
    redirect: '/404'
  })
  // 动态路由添加到第一个路由的子路由中
  router.options.routes[0].children = dynamicRoutes
  router.addRoutes(router.options.routes)
}

/**
* 添加动态(菜单)路由
* @param {*} menuList 菜单列表
* @param {*} routes 递归创建的动态(菜单)路由
*/
export function addDynamicRoutes(menuList = [], routes = []) {
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].children && menuList[i].children.length >= 1) {
      temp = temp.concat(menuList[i].children)
    } else if (menuList[i].resUrl && /\S/.test(menuList[i].resUrl)) {
      menuList[i].resUrl = menuList[i].resUrl.replace(/^\//, '')
      // 创建路由配置
      var route = {
        path: menuList[i].resUrl,
        component: null,
        name: menuList[i].resName,
        meta: {
          icon: menuList[i].icon,
          index: menuList[i].id
        }
      }
      try {
        // 根据菜单URL动态加载vue组件
        let filePath = menuList[i].resFile
        if (filePath && /\S/.test(filePath)) { filePath = filePath.replace(/^\//, '') }
        route['component'] = resolve => require([`@/${filePath}`], resolve)
      } catch (e) { console.log(e) }
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    addDynamicRoutes(temp, routes)
  } else {
    console.log('动态路由加载...')
    console.log(routes)
    console.log('动态路由加载完成.')
  }
  return routes
}

export default router
