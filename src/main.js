// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './config/root'
import store from './store/store'

// 限制登录
router.beforeEach((to, from, next) => {
  // console.log('XXXX'+JSON.stringify(to))
    
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (window.sessionStorage.getItem("isLogin")) {  // 通过vuex state获取当前的token是否存在
        	// console.log('已登录')
            next();
        }
        else {
        	// console.log('未登录')
            next({
                path: '/',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
})



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
