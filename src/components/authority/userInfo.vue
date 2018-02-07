<!-- 管理员信息维护 -->
<template>
	<div>
		<div class="add">
			<el-button type="primary" class='add'  @click="dialogVisible = true">添加管理员</el-button>
		</div>
		<!-- 对话框 -->
		<el-dialog title="添加管理员" :visible.sync="dialogVisible">
		  <el-form :model="form">
		    <el-form-item label="用户编号" :label-width="formLabelWidth">
		      <el-input v-model="form.userId" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="用户名" :label-width="formLabelWidth">
		      <el-input v-model="form.user" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="密码" :label-width="formLabelWidth">
		      <el-input v-model="form.psd" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="确认密码" :label-width="formLabelWidth">
		      <el-input v-model="form.checkPsd" auto-complete="off"></el-input>
		    </el-form-item>
		      <el-form-item label="所属区域" :label-width="formLabelWidth">
			      <el-select v-model="form.community" placeholder="请选择区域">
			        <el-option label="莲塘" value="莲塘"></el-option>
			        <el-option label="鹏基" value="鹏基"></el-option>
			      </el-select>
			  </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
			form:{
				userId:'',//用户编号
				user:'',//用户名
				psd:'',//密码
				checkPsd:'',//确认密码
				community:'',//所属社区
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
      	}
	}
}	
</script>
<style scoped>
.el-table{
	margin-top: 10px;
}
</style>