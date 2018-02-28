<template>
	<div class="login" v-loading="loading" element-loading-text="拼命加载中">
		<div class="form">
			<h1 class="title">
				社区服务管理系统登录
			</h1>
			<el-input v-model="name" placeholder="请输入姓名"></el-input>
			<el-input v-model="password" placeholder="请输入密码"></el-input>
			<div class="event">
				<span class="span1" @click="toRegister">注册账号</span>
				<span class="span2">忘记密码</span>
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
			name:'Sun',
			// 密码
			password:'123',
		}
	},
	methods:{
		/**
		*登录
		*/
		login(){
			// var params = {
			// 	parentid:0,
			// }

			// this.http.get(this.api.remote_area_url,params).then(res=>{
			// 	console.log(res)
			// })
		
			var params = {
				userNo:this.name,
				userPw:this.password,
				evalue:this.$encrypt()
			}
			console.log(params)

			this.loading = true

			this.http.post(this.api.baseUrl+this.api.login,params).then(res=>{
				this.loading = false
				var result= JSON.parse(res.data.replace(/<[^>]+>/g, "").replace(/[' '\r\n]/g, "")) 
				console.log(result)
				if (result.status == '成功') {
					window.localStorage.setItem('id',this.name)
					this.$router.push('main')
				}
				
			})
			
		},
		/**
		*跳转到注册页面
		*/
		toRegister(){
			this.$router.push('register')
		}
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