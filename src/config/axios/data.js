// 在多个页面可能会用到的网络请求的接口
// 
import api from './api'
import http from './http'
import myAES from '../AES/myAES'
import dataUtil from '../AES/Date'

// var requestTreeAgain = true

function getTreeData(obj){
	  console.log('请求树')     
        var params = { 
          RegionCode:window.sessionStorage.getItem('RegionCode'),
          time:dataUtil.formatTime1(new Date()) 
        }
        
        var encryptParams = {
          evalue:myAES.encrypt(JSON.stringify(params))
        }

        console.log(myAES.encrypt(JSON.stringify(params)))
       
        http.post(api.baseUrl+api.QureyAllHouseInfoForFile,encryptParams)
        .then(result=>{
          // console.log(res.data)       
          // var result= JSON.parse(res.data.replace(/<[^>]+>/g, "").replace(/[' '\r\n]/g, ""))
           console.log('树')
           console.log(result )
          if (result.status=="成功") {
            obj.succeed(result) 
          }else{
            // 回调错误
              obj.failed(result)
            // if (requestTreeAgain) {
            //   requestTreeAgain = false
            //   // 二次请求书
            //   console.log('再次请求树')
            //   setTimeout(()=>{
            //     getTreeData(obj)
            //   },500)
            // }else{
              
            // }
          	
          }        
        })
}


export default{
  getTreeData: getTreeData,
}
