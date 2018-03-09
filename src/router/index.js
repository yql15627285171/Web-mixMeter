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

// 区域档案管理
import firstRegion from '@/components/region/firstRegion'
import customerInfo from '@/components/region/customerInfo'
import gateway from '@/components/region/gateway'
import meterFiles from '@/components/region/meterFiles'

// 


Vue.use(Router)



const router = new Router({
  model:'history',
  routes: [
    {
      path: '/',
      name: 'login',
      meta:{
        requireAuth:false
      },
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      meta:{
        requireAuth:false
      },
      component: Register 
    },
    {
      path:'/main/',
      name:'main',
      meta:{
        requireAuth:true
      },
      redirect:'/main/SuperAdminInfo',
      component:Main,
      children:[
      {
        // 远程操控
        path:'remoteControl',
        name:'remoteControl',
        meta:{
        requireAuth:true
        },
        component:RemoteControl
      },
      {
        // 管理员审核
        path:'SuperAdminInfo',
        name:'SuperAdminInfo',
        meta:{
        requireAuth:true
        },
        component:SuperAdminInfo
      },
      {
        // 用户组信息
        path:'userGroup',
        name:'userGroup',
        meta:{
        requireAuth:true
        },
        component:UserGroup
      },
      {
        // 客户审核
        path:'userInfo',
        name:'userInfo',
        meta:{
        requireAuth:true
        },
        component:UserInfo
      },
      {
        // 区域管理
        path:'firstRegion',
        name:'firstRegion',
        meta:{
        requireAuth:true
        },
        component:firstRegion
      },
      {
        // 网关资产管理
        path:'gateway',
        name:'gateway',
        meta:{
        requireAuth:true
        },
        component:gateway
      },
      {
        // 计量表档案管理
        path:'meterFiles',
        name:'meterFiles',
        meta:{
        requireAuth:true
        },
        component:meterFiles
      },
      {
        // 客户信息管理
        path:'customerInfo',
        name:'customerInfo',
        meta:{
        requireAuth:true
        },
        component:customerInfo
      }]
    },

  ]
})



export default router