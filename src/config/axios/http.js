'use strict'

import axios from 'axios'
import qs from 'qs'

/*
  请求拦截器
*/
axios.interceptors.request.use(config => {
  // 这里可以加一些动作，例如转菊花
  return config
}, error => {
  /*
    reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected
    并将异步操作的结果，作为参数传递出去；
  */
  return Promise.reject(error)
})

/*
  响应拦截器
*/
axios.interceptors.response.use(response => {
  // console.log("response"+response)
  return response
}, error => {
  /*
    矫正错误信息，后面就可以不用写catch
    resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved）
    并将异步操作的结果，作为参数传递出去；
  */
  console.log("error"+error)
  return Promise.resolve(error.response)
})



function checkStatus (response) {
  // console.log("response"+response)
  // 这里可以做一些动作，例如结束菊花

  /*
  没有响应数据的时候为空
  */

  if (response == null) {
    // statement
    alert("无法连接到服务器,请联系管理员")
    return{
      status:-404,
      msg:'无法连接到服务器',
      data:'无法连接到服务器'
    }
  }

  // console.log(response.data)

  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    if (response.data.msg=='ok') {
      return response
    }else{
      console.log(response.data)
      return JSON.parse(response.data.replace(/<[^>]+>/g, "").replace(/[\r\n]/g,""))
    }
        // 如果不需要除了data之外的数据，可以直接 return response.data
  }else {

    // 异常状态下，把错误信息返回去
    // 因为前面我们把错误扶正了，不然像404 500 这样的错误走不到这里
    return {
      status: -404,
      msg: response.statusText,
      data:response.statusText

    }
  }

}

function checkCode (res) {
  // console.log(res.data)
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    console.log('error'+res.msg)
  }
  return res
}

export default {

  post (url, data) {
    return axios({
      method: 'post',
      url:url,
      data: qs.stringify(data),
      timeout: 110000,
      headers: {
        // 'X-Requested-With': 'XMLHttpRequest',
        // "Access-Control-Allow-Origin":"*",
        'content-type': 'application/x-www-form-urlencoded',


      }
    }).then(checkStatus).then(checkCode)
  },

  get (url, params) {
    return axios({
      method: 'get',
      url:url,
      // baseURL: 'https://www.stsidea.com/weixin.asmx',
      params, // get 请求时带的参数
      timeout: 10000,
      headers: {
        // 'X-Requested-With': 'XMLHttpRequest',
        "Content-Type":"text/html; charset=UTF8",
        "Authorization":"APPCODE 459866317d8f4c48b62eb53c3e5d63bd"

      }
    }).then(checkStatus).then(checkCode)
  }
}
