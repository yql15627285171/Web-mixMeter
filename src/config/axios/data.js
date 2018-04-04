// 在多个页面可能会用到的网络请求的接口
// 
import api from './api'
import http from './http'
import myAES from '../AES/myAES'

function getTreeData(obj){
	  console.log('请求树')     
        var params = { 
          RegionCode:window.sessionStorage.getItem('RegionCode'),
          evalue:myAES.encrypt()
        }

        console.log(api.baseUrl+api.QureyAllHouseInfoForFile)
        console.log(params)
        http.post(api.baseUrl+api.QureyAllHouseInfoForFile,params)
        .then(result=>{
          // console.log(res.data)       
          // var result= JSON.parse(res.data.replace(/<[^>]+>/g, "").replace(/[' '\r\n]/g, ""))
           console.log(result )
          if (result.status=="成功") {
            obj.succeed(result) 
          }else{
          	obj.failed(result)
          }        
        })
}


export default{
  getTreeData: getTreeData,
}
