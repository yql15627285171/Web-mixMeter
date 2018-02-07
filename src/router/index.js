import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main'
import Login from '@/components/login'
import Register from '@/components/register'
import RemoteControl from '@/components/control/remoteControl'

import UserInfo from '@/components/authority/userInfo'
import UserGroup from '@/components/authority/userGroup'
import CustomerCheck from '@/components/authority/customerCheck'

import TierPrice from '@/components/systemconfig/tierPrice'
import MultiRate from '@/components/systemconfig/multiRate'
import ChargeWays from '@/components/systemconfig/chargeWays'

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
        name:'RemoteControl',
        component:RemoteControl
      },
      {
        // 管理员审核
        path:'userInfo',
        name:'userInfo',
        component:UserInfo
      },
      {
        // 用户组信息
        path:'userGroup',
        name:'userGroup',
        component:CustomerCheck
      },
      {
        // 客户审核
        path:'customerCheck',
        name:'customerCheck',
        component:CustomerCheck
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
      }]
    },

  ]
})
