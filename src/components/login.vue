<template>
	<div class="login" v-loading="loading" element-loading-text="拼命加载中">
		<div class="wrapForm">
			<div class="form">
				<h1 class="title">
					社区服务管理系统登录
				</h1>
				<el-input v-model.trim="name" placeholder="请输入姓名"></el-input>
				<el-input v-model.trim="password" placeholder="请输入密码" type='password'></el-input>
				
				<div class="event">
					<el-input v-model.trim="verifyCode" placeholder="请输入验证码" ></el-input>
				
					<el-button  id="code" @click="createCode" size="medium">{{checkCode}}</el-button>
					<!-- <span class="span1" @click="toRegister">注册账号</span> -->
					<!-- <span class="span2">忘记密码</span> -->
				</div>
				
				 <el-button type="primary" size="large" @click="login">登 录</el-button>
			 
			</div>
		</div>
		
	</div>
</template>
<script>


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

			//excel文件的数据
			// excelData:null,
			// keys:['序号','集中器地址','测量点号','波特率','通信端口号','通信规约','通讯地址','通讯密码','电表费率数','整数位','小数位','采集器地址','用户大类号','用户小类号'],
			// file:null,
		}
	},
	methods:{
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
				userId:this.name,
				userPwd:this.$encryptPsd(this.password),
				evalue:this.$encrypt()
			}
			console.log(params)

			this.loading = true

			this.http.post(this.api.baseUrl+this.api.login,params).then(result=>{
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
 						this.$router.push("main/firstRegion")
 					}
 					

					// console.log(result.RegionCode)
					// this.$store.dispatch('setIsLogin',true)
			
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
				evalue:''
			}
			console.log(this.api.baseUrl+'/HelloWorld');
			this.http.post(this.api.baseUrl+'/HelloWorld',params)
		      .then(res=>{
		        var result= JSON.parse(res.data.replace(/<[^>]+>/g, ""))
		          console.log(result);
		      })
		},

		 // 图片验证码
	    createCode(){
          var code = "";    
          var codeLength = 4;//验证码的长度   
          var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');//随机数   
          for(var i = 0; i < codeLength; i++) {//循环操作   
              var index = Math.floor(Math.random()*61);//取得随机数的索引（0~61）   
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
	    }

	},
	mounted(){
		// this.test()
		this.createCode()
	}
}
</script>
<style scoped>
.login{
	background: url('../assets/log_bg.jpg') no-repeat 0 0;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}	

.wrapForm{
	width: 600px;
	/*background-color: #EFE8E5;*/
	margin: 100px auto;
}

.form{
	width: 300px;
	height: 400px;
	margin: 100px auto;
	padding-top: 30px;
	text-align: center;
}

.title{
	font-size: 24px;
	color: #fff;
	margin-bottom: 10px;
}

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

</style>