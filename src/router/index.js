import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main'
import Login from '@/components/login'
import Register from '@/components/register'
import RemoteControl from '@/components/control/remoteControl'
// 权限管理
import UserInfo from '@/components/authority/userInfo'
import UserGroup from '@/components/authority/userGroup'
import SuperAdminInfo from '@/components/authority/SuperAdminInfo'
// 系统参数定义
import TierPrice from '@/components/systemconfig/tierPrice'
import MultiRate from '@/components/systemconfig/multiRate'
import ChargeWays from '@/components/systemconfig/chargeWays'
// 区域档案管理
import firstRegion from '@/components/region/firstRegion'
import customerInfo from '@/components/region/customerInfo'
import gateway from '@/components/region/gateway'
import meterFiles from '@/components/region/meterFiles'

Vue.use(Router)

export default new Router({
  model:'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register	
    },
    {
    	path:'/main/',
    	name:'main',
      redirect:'/main/userGroup',
    	component:Main,
      children:[
      {
        // 远程操控
        path:'remoteControl',
        name:'remoteControl',
        component:RemoteControl
      },
      {
        // 管理员审核
        path:'SuperAdminInfo',
        name:'SuperAdminInfo',
        component:SuperAdminInfo
      },
      {
        // 用户组信息
        path:'userGroup',
        name:'userGroup',
        component:UserGroup
      },
      {
        // 客户审核
        path:'userInfo',
        name:'userInfo',
        component:UserInfo
      },
      {
        // 梯度价格参数配置
        path:'tierPrice',
        name:'tierPrice',
        component:TierPrice
      },
      {
        // 费率价格配置
        path:'multiRate',
        name:'multiRate',
        component:MultiRate
      },
      {
        // 客户类计费方式配置
        path:'chargeWays',
        name:'chargeWays',
        component:ChargeWays
      },
      {
        // 区域管理
        path:'firstRegion',
        name:'firstRegion',
        component:firstRegion
      },
      {
        // 网关资产管理
        path:'gateway',
        name:'gateway',
        component:gateway
      },
      {
        // 计量表档案管理
        path:'meterFiles',
        name:'meterFiles',
        component:meterFiles
      },
      {
        // 客户信息管理
        path:'customerInfo',
        name:'customerInfo',
        component:customerInfo
      }]
    },

  ]
})
