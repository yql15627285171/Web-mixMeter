<template>
	<div class="login" v-loading="loading" element-loading-text="拼命加载中">
		<div class="form">
			<h1 class="title">
				社区服务管理系统登录
			</h1>
			<el-input v-model="name" placeholder="请输入姓名"></el-input>
			<el-input v-model="password" placeholder="请输入密码"></el-input>
			<div class="event">
				<!-- <span class="span1" @click="toRegister">注册账号</span> -->
				<!-- <span class="span2">忘记密码</span> -->
			</div>
	
			 <el-button type="primary" size="large" @click="login">登 录</el-button>
			 
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
			name:'trj01',
			// 密码
			password:'123',
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
			
			var params = {
				userId:this.name,
				userPwd:this.password,
				evalue:this.$encrypt()
			}
			// console.log(params)

			this.loading = true

			this.http.post(this.api.baseUrl+this.api.login,params).then(res=>{
				this.loading = false
				var result= JSON.parse(res.data.replace(/<[^>]+>/g, "").replace(/[' '\r\n]/g, "")) 
				console.log(result)
				if (result.status == '成功') {

					var flg = parseInt(result.Flg)
					// 超级用户：10-19，目前是只用10
					// 社区用户：20-29，目前是只用20
					// 普通用户：30-39，目前是只用30

					if (flg >= 30 && flg <= 39) {
						// statement
						alert('用户网页版功能还没开通，请使用公众号进行业务查询')
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
			
			// this.importfxx()
			
			// console.log(this.excel.excelData)

			// var params = {
			// 	jsonValue:JSON.stringify(arr),
			// 	evalue:this.$encrypt()
			// }
			// console.log(this.api.baseUrl+this.api.test)
			// this.http.post(this.api.baseUrl+this.api.test,params).then(res=>{
			// 	// this.loading = false
			// 	console.log(res.data)
			// 	var result= JSON.parse(res.data.replace(/<[^>]+>/g, "").replace(/[' '\r\n]/g, "")) 
			// 	console.log(result)
				
			// })
		},

		/**
		*导入excel文件
		*/
		// choseFile(event){
		// 	this.file = event.currentTarget.files[0]
		// },

		// importfxx(event) { 
 
		// 	this.file = event.currentTarget.files[0]
		// 	this.excel.readExcel(this.file,this.keys,result=>{
		// 		console.log(result)
		// 	})
	     	   
  // 		}

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

.form{
	width: 300px;
	height: 400px;
	margin: 100px auto;
	text-align: center
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
	margin-top: 10px;
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

</style>