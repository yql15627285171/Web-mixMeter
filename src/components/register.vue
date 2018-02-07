<template>
	<div class="wrap">
		<el-form :model="registerData" :rules="rules" ref="registerData" label-width="100px" class="demo-ruleForm" >
			<!-- 姓名 -->
		  <el-form-item label="姓名" prop="name">
		    <el-input v-model.trim="registerData.name" placeholder="请输入姓名"></el-input>
		  </el-form-item>
		  <!-- 密码 -->
		  <el-form-item label="密码" prop="pass">
		    <el-input type="password" v-model.trim="registerData.pass"></el-input>
		  </el-form-item>
		  <el-form-item label="确认密码" prop="checkPass">
		    <el-input type="password" v-model.trim="registerData.checkPass"></el-input>

		  </el-form-item>
		  <!-- 电话号码 -->
		  <el-form-item label="电话号码" prop="phone">
		    <el-input v-model.lazy.trim="registerData.phone" placeholder="请输入电话号码"></el-input>
		  </el-form-item>
			<!-- 省 -->
		  <el-form-item label="省份" prop="province">
		    <el-select v-model.trim="registerData.province" clearable placeholder="请选择">
			    <el-option
			      v-for="item in provinceArr"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			 </el-select>
		  </el-form-item>
		  <el-form-item label="市" prop="city">
		    <el-select v-model.trim="registerData.city" clearable placeholder="请选择">
			    <el-option
			      v-for="item in cityArr"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			 </el-select>
		  </el-form-item>
		  <el-form-item label="区/县" prop="noun">
		    <el-select v-model.trim="registerData.noun" clearable placeholder="请选择">
			    <el-option
			      v-for="item in nounArr"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			 </el-select>
		  </el-form-item>
		  <el-form-item label="社区" prop="community">
		    <el-select v-model.trim="registerData.community" clearable placeholder="请选择">
			    <el-option
			      v-for="item in communityArr"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			 </el-select>
		  </el-form-item>
		  <el-form-item label="栋数" prop="building">
		    <el-select v-model.trim="registerData.building" clearable placeholder="请选择">
			    <el-option
			      v-for="item in buildingArr"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			 </el-select>
		  </el-form-item>
		  <el-form-item label="房间" prop="room">
		    <el-select v-model.trim="registerData.room" clearable placeholder="请选择">
			    <el-option
			      v-for="item in roomArr"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			 </el-select>
		  </el-form-item>
		  <el-form-item label="证件类型" prop="credentials">
		    <el-select v-model.trim="registerData.credentials" clearable placeholder="请选择">
			    <el-option
			      v-for="item in credentialsArr"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			 </el-select>
		  </el-form-item>
		  <el-form-item label="证件号" prop="credentialsNun">
		    <el-input v-model.trim="registerData.credentialsNun" placeholder="请输入证件号码"></el-input>
		  </el-form-item>
		  <el-form-item label="性别" prop="sex">
		   	<el-radio-group v-model="registerData.sex">
			    <el-radio :label="0">男</el-radio>
			    <el-radio :label="1">女</el-radio>
			</el-radio-group>
		  </el-form-item>
		  <el-form-item label="固定电话" prop="fixPhone">
		    <el-input v-model.trim="registerData.fixPhone" placeholder="请输入固定电话"></el-input>
		  </el-form-item>
		  <el-form-item label="联系地址" prop="address">
		    <el-input v-model.trim="registerData.address" placeholder="请输入联系地址"></el-input>
		  </el-form-item>
		  <el-form-item label="邮政编码" prop="postalCode">
		    <el-input v-model.trim="registerData.postalCode" placeholder="请输入邮政编码"></el-input>
		  </el-form-item>
		  <el-form-item label="银行卡号" prop="bankID">
		    <el-input v-model.trim="registerData.bankID" placeholder="请输入银行卡号"></el-input>
		  </el-form-item>
		  <el-form-item label="是否扣款账户" prop="isCount">
		     <el-radio-group v-model="registerData.isCount">
			    <el-radio :label="0">否</el-radio>
			    <el-radio :label="1">是</el-radio>
			 </el-radio-group>
		  </el-form-item>
		</el-form>
	</div>
</template>
<script>
export default{
	data(){
		// 密码的变量
		var validatePass = (rule, value, callback) => {
			// value = value.trim()
			if (value === '') {
			  callback(new Error('请输入密码'));
			} else {
			  if (this.registerData.checkPass !== '') {
			    this.$refs.registerData.validateField('checkPass');
			  }
			  callback();
			}
		};
		var validatePass2 = (rule, value, callback) => {
			// value = value.trim()
			if (value === '') {
			  callback(new Error('请再次输入密码'));
			} else if (value !== this.registerData.pass) {
			  callback(new Error('两次输入密码不一致!'));
			} else {
			  callback();
			}
		};
		var validatePhone = (rule, value, callback) => {
			if (value.length != 11) {
			  callback(new Error('必须是11位数'));
			}else if(isNaN(parseInt(value))) {
				callback(new Error('必须数字'));
			}else {
			  callback();
			}
		};
		return{
			provinceArr:[
				{
					value:'广东',
					label:'广东'
				},
				{
					value:'江西',
					label:'江西'
				}],
			cityArr:[{value:'深圳',label:'深圳'}],
			nounArr:[{value:'罗湖',label:'罗湖'}],
			communityArr:[{value:'鹏兴花园',label:'鹏兴花园'}],
			buildingArr:[{value:'1栋',label:'1栋'}],
			roomArr:[{value:'888',label:'888'}],
			credentialsArr:[{value:'身份证',label:'身份证'}],
			sexArr:[{value:'男',label:'男'},{value:'女',label:'女'}],
			registerData:{
				name:'',//姓名
				pass:'',//密码
				checkPass:'',//确认密码
				phone:'',//手机号
				checkNum:'',//验证码
				province:'',//省份
				city:'',//市
				noun:'',//区
				community:'',//社区
				building:'',//栋数
				room:'',//房间号
				areaNum:'',//区域编码
				credentials:'',//证件
				credentialsNum:'',//证件号码
				sex:'',//性别
				fixPhone:'',//固定电话
				address:'',//联系地址
				postalCode:'',//邮政编码
				bankID:'',//银行卡号
				isCount:'',//是否扣款用户
			},
			// 校验规则
			rules:{
				name:[{ required: true, message: '姓名不能为空', trigger: 'blur' }],
	         	pass:[{required: true, message: '密码不能为空', trigger: 'blur'}],
	         	checkPass: [{required:true, validator: validatePass2, trigger: 'blur' }],
	         	phone:[
	         		{required: true, message: '电话号码不能为空'},
	         		// { type: 'number', message: '必须为数字值',trigger: 'blur'},
	         		{validator: validatePhone}
	         	],
	         	province:[{required: true }],
	         	city:[{required: true }],
	         	noun:[{required: true }],
	         	community:[{required: true }],
	         	building:[{required: true }],
	         	room:[{required: true }],
			}

		}
	},
	methods:{

	}

}
</script>
<style scoped>
.el-input,
.el-select{
	width: 300px;
}

.wrap{
	margin-top: 40px;
	margin-left: 20px;
}	

.el-form-item {
	/*text-align: center;*/
}



</style>














