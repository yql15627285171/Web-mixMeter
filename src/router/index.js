import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main'
import Login from '@/components/login'
import Register from '@/components/register'
import RemoteControl from '@/components/control/remoteControl'
// 权限管理
// import UserInfo from '@/components/authority/userInfo'
import UserGroup from '@/components/authority/userGroup'
import SuperAdminInfo from '@/components/authority/SuperAdminInfo'

// 区域档案管理
import firstRegion from '@/components/region/firstRegion'
import customerInfo from '@/components/region/customerInfo'
import gateway from '@/components/region/gateway'
import meterFiles from '@/components/region/meterFiles'

// 终端操作
import GateWayControl from '@/components/getewayParaOprt/GateWayControl'
import MeterReadAndSet from '@/components/getewayParaOprt/MeterReadAndSet'
import electric from '@/components/getewayParaOprt/meter/electric'

// 费用管理
import RechargeFeeRefund from '@/components/costManagement/RechargeFeeRefund'
import BillingReport from '@/components/costManagement/BillingReport'
import AccoundReconciliation from '@/components/costManagement/AccoundReconciliation'
import monthElectric from '@/components/costManagement/time/monthElectric'

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
      redirect:'/main/userGroup',
      component:Main,
      children:[ 
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
        // 管理员审核
        path:'SuperAdminInfo',
        name:'SuperAdminInfo',
        meta:{
        requireAuth:true
        },
        component:SuperAdminInfo
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
      },
      {
        // 网关控制
        path:'GateWayControl',
        name:'GateWayControl',
        meta:{
        requireAuth:true
        },
        component:GateWayControl
      },
      {
        // 表计抄设
        path:'MeterReadAndSet',
        name:'MeterReadAndSet',
        redirect:'/main/MeterReadAndSet/electric',
        meta:{
        requireAuth:true
        },
        component:MeterReadAndSet,
        children:[
        {
          // 电
          path:'electric',
          name:'electric',
          meta:{
            requireAuth:true
          },
          component:electric
        }]
      },
      {
        // 充值退费
        path:'RechargeFeeRefund',
        name:'RechargeFeeRefund',
        meta:{
            requireAuth:true
          },
        component:RechargeFeeRefund
      },
      {
        // 结算报表
        path:'BillingReport',
        name:'BillingReport',
        redirect:'/main/BillingReport/monthElectric',
        meta:{
            requireAuth:true
          },
        component:BillingReport,
        children:[
        {
          // 月度
          path:'monthElectric',
          name:'monthElectric',
          meta:{
            requireAuth:true
          },
          component:monthElectric
        }]
      },
      {
        // 财务对账
        path:'AccoundReconciliation',
        name:'AccoundReconciliation',
        meta:{
            requireAuth:true
          },
        component:AccoundReconciliation
      }]
    },

  ]
})



export default router