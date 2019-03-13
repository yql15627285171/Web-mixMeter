<template>
	<div class="login" v-loading="loading" element-loading-text="拼命加载中">
    <div>
      <div class="logoPart">
        <img src="../assets/logo.png" style="height: 40px">
        <img src="../assets/logo1.png" style="height: 40px">
      </div>
      <div class="wrapForm">
        <div class="form">
          <!--<div class="logo title">-->
            <!--<img src="../assets/logo.png" style="height: 120px">-->
          <!--</div>-->
          <h1 class="title">园区智能物联平台</h1>
          <el-input v-model.trim="name" placeholder="请输入姓名"></el-input>
          <el-input v-model.trim="password" placeholder="请输入密码" type='password'></el-input>

          <div class="event">
            <el-input v-model.trim="verifyCode" placeholder="请输入验证码" ></el-input>

            <el-button  id="code" @click="createCode" size="medium">{{checkCode}}</el-button>
            <!-- <span class="span1" @click="toRegister">注册账号</span> -->
          </div>
          <div style="float:right;margin-top:10px;">
            <input type="radio" name="" @click='propCheck' :checked="checking">
            <span style="color:#fff">记住账号密码</span>
          </div>

          <el-button type="primary" size="large" @click="login" >登 录</el-button>

        </div>
      </div>
    </div>

	</div>
</template>
<script>

import axios from 'axios'
export default{
	data(){
		return{
			// 菊花的显示
			loading:false,

			// 用户名
			name:'',
			// 密码
			password:'',

			verifyCode:'',//验证码

			checkCode:'',//随机生成的验证码

			checking:false,

		}
	},
	methods:{

		propCheck(){
			console.log('hello');
			this.checking ? this.checking = false : this.checking = true
		},

		/**
		*登录
		*/
		login(){

			if(this.name == "" || this.password == ''){
				this.$message({
            		type: 'error',
           			message: '账号密码不能为空'
           		  });
				return
			}else if (!this.matchCode()) {
				this.createCode()
				this.$message({
            		type: 'error',
           			message: '验证码不正确'
           		  });

				return
			}

			var params = {
				UserId:this.name,
				UserPwd:this.$encryptPsd(this.password),
				// IP:returnCitySN.cip,
				time:this.dataUtil.formatTime1(new Date())

			}
			console.log(params)

			var encryptParams = {
                evalue:this.$encrypt(JSON.stringify(params))
              }

            console.log(this.$encrypt(JSON.stringify(params)))

			this.loading = true

			console.log(this.api.baseUrl+this.api.login)
			this.http.post(this.api.baseUrl+this.api.login,encryptParams).then(result=>{
				this.loading = false
				// var result= res
				console.log(result)
				if (result.status == '成功') {

					var flg = parseInt(result.Flg)
					// 超级用户：10-19，目前是只用10
					// 社区用户：20-29，目前是只用20
					// 普通用户：30-39，目前是只用30

					if (flg >= 30 && flg <= 39) {
						// statement
						this.$message({
		            		type: 'warning',
		           			message: '用户网页版功能还没开通，请使用公众号进行业务查询'
		           		  });
						this.createCode();
					}else {
						// 记录登录的用户名
					window.sessionStorage.setItem('id',this.name)
					// 记录是否登录
					window.sessionStorage.setItem('isLogin',true)
					// 记录区域编码
					window.sessionStorage.setItem('RegionCode',result.RegionCode)

 					// 清空menuName的记录
 					window.sessionStorage.removeItem("menuName")



 					// 记录是否超级管理员
 					if (flg >= 10 && flg <= 19) {
 						window.sessionStorage.setItem('isSuper',"1")
 						this.$router.push('main')
 					}else{
 						window.sessionStorage.setItem('isSuper',"0")
 						this.$router.push("main")
 					}


					//记录是否记录账号密码
					if (this.checking) {
						window.localStorage.setItem('checking','1')
						window.localStorage.setItem('user',this.name)
						window.localStorage.setItem('psd',this.password)
					}else{
						window.localStorage.setItem('checking','0')
						window.localStorage.setItem('user','')
						window.localStorage.setItem('psd','')
					}

					}

				}else{
					this.createCode()
					this.$message({
            		type: 'error',
           			message: result.data
           		  });

				}

			})

		},
		/**
		*跳转到注册页面
		*/
		toRegister(){
			this.$router.push('register')
		},

		/**
		*测试接口
		*/
		test(){
			var params = {
				mobile:'18025391303',
				time:this.dataUtil.formatTime1(new Date())

			}
			console.log(params)

			var encryptParams = {
                evalue:this.$encrypt(JSON.stringify(params))
              }

              console.log(this.$encrypt(JSON.stringify(params)))

			this.http.post(this.api.baseUrl+this.api.VerificationCode,encryptParams)
			.then(result=>{
				console.log(result)
			})


			// axios.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx79b555e9247591b2&secret=f769b386bf040225eafe3a0c17c72410')
			//  .then(function (response) {
			//     console.log(response);
			//  })
			//  .catch(function (error) {
			//     console.log(error);
			//  });



			// var access_token="9_VcliCjBsNWqlYHLfZEmCUv3Gn6S2giIaQzTjngdtqSD2zvR8hvs98HQ8Mi_-JnlcH3Q_A-WQhz5bDlspvjOssyWq4d68w6Li8e-72PU_L3opRWgZtceQ61hNOL4GDeX1OHFtPJFMan_2cb-EUNBdAIAJCQ"
			// var deviceId = "gh_e56aefbb322b_e52e4a14014fdb64"
			// var  mac = "1123456";
			// var params = {
			//     device_num:"1",
			//     device_list:[
			//     {
			// 	    id:deviceId,
			// 	    mac:mac,
			// 	    connect_protocol:"3",
			// 	    auth_key:"",
			// 	    close_strategy:"1",
			// 	    conn_strategy:"1",
			// 	    crypt_method:"0",
			// 	   	auth_ver:"0",
			// 	    manu_mac_pos:"-1",
			// 	    ser_mac_pos:"-2",
			// 	   ble_simple_protocol: "0"
			// 	}
			// 	],
			// 	op_type:"1"
			// }

			// this.http.post("https://api.weixin.qq.com/device/authorize_device?access_token="+access_token+"&product_id=46912",JSON.stringify(params))
			// .then(result=>{
			// 	console.log(result)
			// })

		},

		 // 图片验证码
	    createCode(){
          var code = "";
          var codeLength = 4;//验证码的长度
          var random = new Array(1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','p','q','r','s','t','u','v','w','x','y','z');//随机数
          for(var i = 0; i < codeLength; i++) {//循环操作
              var index = Math.floor(Math.random()*58);//取得随机数的索引（0~61）
              code += random[index];//根据索引取得随机数加到code上
          }
              this.checkCode = code;//把code值赋给验证码

	    },

	    // 判断验证码
	    matchCode(){
	    	if(this.verifyCode.toUpperCase() != this.checkCode.toUpperCase()){
	    		return false
	    	}

	    	return true
	    },
	},
	mounted(){
		// this.test()
		this.createCode()
		// this.getLocalIP()
		// console.log(returnCitySN.cip)

		if (window.localStorage.getItem('checking') == '1') {
			this.checking = true
		}

		this.name = window.localStorage.getItem('user')

		this.password = window.localStorage.getItem('psd')

	}
}
</script>
<style scoped>
.login{
	/*background: url('../assets/log_bg.jpg') no-repeat 0 0;*/
  background: url('../assets/logo3.jpeg') no-repeat;
  background-size: 100% 100%;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}

.wrapForm{
	width: 600px;
	margin: 10% auto;
}

.form{
	width: 300px;
	height: 400px;
	margin: 0 auto;
	padding-top: 30px;
	text-align: center;
}

.logoPart{
  position: absolute;
  top: 30px;
  right: 20px;
}

.title{
  color: #ffffff;
  font-size: 26px;
  margin-bottom: 30px;
}

/*.logo{*/
  /*height: 120px;*/
  /*text-align: center;*/
  /*margin-top: 5%;*/
/*}*/

.el-input{
	margin-top: 20px;
	/*height: 30px;*/
}

.event{
	display: flex;
	justify-content: space-between;
	/*margin-top: 10px;*/
}

.span1{
	color: #009;
	cursor: pointer;
}

.span2{
	color: #f33;
	cursor: pointer;
}

.el-button{
	width: 100%;
	margin-top: 20px;
}

#code{
    font-size: 16px;
    letter-spacing:4px;
    color: #EB5413;
    background: #f2f2f5;
    margin-left: 10px;
    width: 140px;
}


input[type=radio] {

    display: inline-block;

    vertical-align: middle;

    width: 16px;

    height: 16px;

    -webkit-appearance: none;

    background-color: transparent;

    border: 0;

    outline: 0 !important;

    line-height: 16px;

    color: #d8d8d8;

}

input[type=radio]:after {

    content: "";

    display:block;

    width: 16px;

    height: 16px;



    text-align: center;

    line-height: 16px;

    font-size: 16px;

    color: #fff;

    border: 1px solid #ddd;

    background-color: #fff;

    box-sizing:border-box;

}

input[type=radio]:checked:after {

    content: "*";

    border-color: #099414;

    background-color: #099414;

}


</style>
