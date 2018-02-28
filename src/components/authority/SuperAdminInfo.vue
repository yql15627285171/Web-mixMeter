<!-- 管理员信息维护 -->
<template>
	<div>
		<div class="add">
			<el-button type="primary" class='add'  @click="dialogVisible = true">添加管理员</el-button>
		</div>
		<!-- 对话框 -->
		<el-dialog title="添加管理员" :visible.sync="dialogVisible">
		  <el-form :model="form">
		    <el-form-item label="用户名" :label-width="formLabelWidth">
		      <el-input v-model="form.userId" auto-complete="off" placeholder="请输入用户名"></el-input>
		    </el-form-item>
		    <el-form-item label="密码" :label-width="formLabelWidth">
		      <el-input v-model="form.psd" auto-complete="off" placeholder="请输入密码"></el-input>
		    </el-form-item>
		    <el-form-item label="确认密码" :label-width="formLabelWidth">
		      <el-input v-model="form.checkPsd" auto-complete="off" placeholder="请确定密码"></el-input>
		    </el-form-item>
		      <el-form-item label="省" :label-width="formLabelWidth">
			      <el-select v-model="form.FirstRegionName" placeholder="请选择省份">
			        <el-option v-for="item in FirstRegion"
			        :label="item.name" :value="item.name"></el-option>
			      </el-select>
			  </el-form-item>
			  <el-form-item label="市" :label-width="formLabelWidth">
			      <el-select v-model="form.SecondRegionName" placeholder="请选择市">
			        <el-option v-for="item in SecondRegion"
			        :label="item.name" :value="item.name"></el-option>
			      </el-select>
			  </el-form-item>
			  <el-form-item label="区/县" :label-width="formLabelWidth">
			      <el-select v-model="form.ThirdRegionName" placeholder="请选择区/县">
			        <el-option v-for="item in ThirdRegion"
			        :label="item.name" :value="item.name"></el-option>
			      </el-select>
			  </el-form-item>
				  <el-form-item label="所在社区" :label-width="formLabelWidth">
			      <el-input v-model="form.FourthRegionName" placeholder="请输入社区名字"></el-input>
		      </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="addAdminstor">确 定</el-button>
		  </div>
		</el-dialog>

	

		 <el-table
		    :data="tableData"
		    stripe
		    border	
		    style="width: 100%;">
		    <el-table-column 
		    	v-for="item in tableHead"
		    	:prop="item.id"
		    	:label="item.label"
		    	>		
		    </el-table-column>

		     <el-table-column 
		    	label="操作">	
				<template slot-scope="scope">
	       			<el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
	        		<el-button type="text" size="small">删除</el-button>
     			</template>
		    </el-table-column>
		   
		</el-table>
	</div>
</template>
<script>
export default{
	data(){
		return{
			// 对话框的显示
			dialogVisible:false,
			formLabelWidth:'120px',
			FirstRegion:[],//省
			SecondRegion:[],//市
			ThirdRegion:[],//区
			form:{
				userId:'',//用户编号
				psd:'',//密码
				checkPsd:'',//确认密码
				FirstRegionName:'',//一级菜单名
				SecondRegionName:'',//二级菜单名
				ThirdRegionName:'',//三级
				FourthRegionName:'',//四级

			},
			tableHead:[
			{
				label:'序号',
				id:'index',
			},
			{
				label:'用户编号',
				id:'userId',
			},
			{
				label:'用户名',
				id:'user',
			},
			{
				label:'密码',
				id:'psd'
			},
			{
				label:'所属社区',
				id:'community'
			}],
			tableData:[
			{
				index:'1',//序号
				userId:'123',//用户编号
				user:'小王',//用户名
				psd:'666666',//密码
				community:'莲塘枫景',//所属社区
			},
			{
				index:'2',//序号
				userId:'124',//用户编号
				user:'小张',//用户名
				psd:'666666',//密码
				community:'鹏基工业区',//所属社区
			}]
		}

	},
	methods:{
		handleClick(row) {
        	console.log(row);
      	},
      	/**
      	*省名请求
      	*/
      	FirstRegionRequest(){
      		var params = {
				parentid:0,
			}

			this.http.get(this.api.remote_area_url,params).then(res=>{
				this.FirstRegion = res.data.result
			})
      	},
      	/**
      	*市名请求
      	*/
      	SecondRegionRequest(id){
      		var params = {
				parentid:id,
			}
		
			this.http.get(this.api.remote_area_url,params).then(res=>{
				this.SecondRegion = res.data.result
			})
      	},
      	/**
      	*区名请求
      	*/
      	ThirdRegionRequest(id){
      		var params = {
				parentid:id,
			}

			this.http.get(this.api.remote_area_url,params).then(res=>{
				this.ThirdRegion = res.data.result
			})
      	},
      	/**
      	*添加管理员
      	*/
      	addAdminstor(){
      		console.log(this.form.ThirdRegionName)
      		this.dialogVisible = false
      	}

	},
	computed:{
		province:function(){
			this.SecondRegion = [],
			this.ThirdRegion = [],
			this.form.SecondRegionName = ""
			this.form.ThirdRegionName = ""
			this.form.FourthRegionName = ""
			return this.form.FirstRegionName
		},
		city:function(){
			this.ThirdRegion = [],
			this.form.ThirdRegionName = ""
			this.form.FourthRegionName = ""
			return this.form.SecondRegionName
		},
		town:function(){
			this.form.FourthRegionName = ""
			return this.form.ThirdRegionName
		}
	},
	watch:{
		province:function(newvalue){
			// 清空子列表
			
			var specialArea = false

			if (newvalue == "北京" || newvalue == "上海" || newvalue == "天津" || newvalue == "重庆") {
				this.form.SecondRegionName = newvalue
				var tempPro = {
					name:newvalue
				}
				this.SecondRegion.push(tempPro)
				specialArea = true
			}

			for (var i = 0; i < this.FirstRegion.length; i++) {
				if (newvalue == this.FirstRegion[i].name) {
					if (specialArea) {
						this.ThirdRegionRequest(this.FirstRegion[i].id)
					}else {
						this.SecondRegionRequest(this.FirstRegion[i].id)
					}
					
					return
				}
			}
		},
		city:function(newvalue){
			
			if (newvalue == "北京" || newvalue == "上海" || newvalue == "天津" || newvalue == "重庆") {
				return
			}
			for (var i = 0; i < this.SecondRegion.length; i++) {
				if (newvalue == this.SecondRegion[i].name) {
					// statement
					this.ThirdRegionRequest(this.SecondRegion[i].id)
					return
				}
			}
		},
		town:function(newvalue){},
	},
	mounted(){
		if (this.FirstRegion.length==0) {
			this.FirstRegionRequest()
		}
	}	
}	
</script>
<style scoped>
.el-table{
	margin-top: 10px;
}
</style>