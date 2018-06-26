import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main'
import Login from '@/components/login'
import Register from '@/components/register'
import FirstPage from '@/components/FirstPage'

// import RemoteControl from '@/components/control/remoteControl'
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
import MeterParameter from '@/components/getewayParaOprt/MeterParameter'

// 费用管理
import RechargeFeeRefund from '@/components/costManagement/RechargeFeeRefund'
import BillingReport from '@/components/costManagement/BillingReport'
import AccoundReconciliation from '@/components/costManagement/AccoundReconciliation'
import monthElectric from '@/components/costManagement/time/monthElectric'
import RemoteRecharge from '@/components/costManagement/RemoteRecharge'

// 日志管理
import LoadLog from '@/components/logManagement/LoadLog'
import OprtLog from '@/components/logManagement/OprtLog'

// 历史数据
import QueryDayFreezingData from '@/components/queryHistoryData/QueryDayFreezingData'
import QueryMeterAlarmEvent from '@/components/queryHistoryData/QueryMeterAlarmEvent'
import QueryPrepaymentMoney from '@/components/queryHistoryData/QueryPrepaymentMoney'
import dayFreezing from '@/components/queryHistoryData/electricityMeter/day'
import monthFreezing from '@/components/queryHistoryData/electricityMeter/month'

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
      path:'/main',
      name:'main',
      redirect:'/main/FirstPage',
      meta:{
        requireAuth:true
      },
      component:Main,
      children:[ 
       {
        // 首页
        path:'FirstPage',
        name:'FirstPage',
        meta:{
        requireAuth:true
        },
        component:FirstPage
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
        // 管理员审核
        path:'SuperAdminInfo',
        name:'SuperAdminInfo',
        meta:{
        requireAuth:true
        },
        component:SuperAdminInfo
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
        // 区域管理
        path:'firstRegion',
        name:'firstRegion',
        meta:{
        requireAuth:true
        },
        component:firstRegion
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
        path:'MeterParameter',
        name:'MeterParameter',
        meta:{
            requireAuth:true
          },
        component:MeterParameter
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
        // 远程充值RemoteRecharge
        path:'RemoteRecharge',
        name:'RemoteRecharge',
        meta:{
            requireAuth:true
          },
        component:RemoteRecharge
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
      },
      {
        // 登录日志
        path:'LoadLog',
        name:'LoadLog',
        meta:{
            requireAuth:true
          },
        component:LoadLog
      },
      {
        // 操作日志
        path:'OprtLog',
        name:'OprtLog',
        meta:{
            requireAuth:true
          },
        component:OprtLog
      },
      {
        // 电表冻结数据
        path:'QueryDayFreezingData',
        name:'QueryDayFreezingData',
        meta:{
            requireAuth:true
          },
        component:QueryDayFreezingData,
        children:[
        // 电表日冻结
        {
          path:'dayFreezing',
          name:'dayFreezing',
          meta:{
            requireAuth:true
          },
          component:dayFreezing,
        },
        // 电表月冻结
        {
          path:'monthFreezing',
          name:'monthFreezing',
          meta:{
            requireAuth:true
          },
          component:monthFreezing,
        }]
      },
      {
        path:'QueryMeterAlarmEvent',
        name:'QueryMeterAlarmEvent',
        meta:{
            requireAuth:true
          },
        component:QueryMeterAlarmEvent
      },
      {
        path:'QueryPrepaymentMoney',
        name:'QueryPrepaymentMoney',
        meta:{
            requireAuth:true
          },
        component:QueryPrepaymentMoney
      }]
    },

  ]
})



export default router