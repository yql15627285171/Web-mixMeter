<!-- 这是用于管理员管理区域信息的页面 -->
<template>
	<div>
		<div class="add">
			<el-button type="primary" @click="dialogVisible = true">批量添加</el-button>
			<el-button type="primary">导出</el-button>
		</div>
		<!-- 对话框 -->
		<el-dialog title="添加区域信息" :visible.sync="dialogVisible">
		  <el-form :model="form">
		    <el-form-item label="栋数区间" :label-width="formLabelWidth" required>
		      <el-input v-model="form.startArea" auto-complete="off" placeholder="1/A" class="area"></el-input>
		      <span> - </span>
		      <el-input v-model="form.endArea" auto-complete="off" placeholder="9/Z" class="area"></el-input>
		    </el-form-item>
		    <el-form-item label="备注" :label-width="formLabelWidth">
		      <el-input v-model="form.comments" auto-complete="off" placeholder="请输入备注信息"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="addAdminstor">确 定</el-button>
		  </div>
		</el-dialog>


		<div>
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
	</div>
	
</template>
<script>
export default{
	data(){
		return{
			// 对话框
			dialogVisible:false,
			formLabelWidth:'120px',
			form:{
				startArea:'',
				endArea:'',
				comments:''
			},
		
			// 表格内容
			tableHead:[
			{
				label:'序号',
				id:'index',
			},
			{
				label:'区域信息',
				id:'regionInformation',
			},
			{
				label:'添加时间',
				id:'addTime',
			},
			{
				label:'备注',
				id:'comments'
			}],
			tableData:[
			{
				index:'1',//序号
				regionInformation:'鹏兴花园>1栋',//区域信息
				addTime:'2018/02/28',//添加时间
				comments:'最多户数',//备注
		
			},
			{
				index:'2',//序号
				regionInformation:'鹏兴花园>12栋',//区域信息
				addTime:'2018/02/22',//添加时间
				comments:'最少户数',//备注
			}]
		}
	},
	methods:{
		// 表格的操作方法
		handleClick(row) {
        	console.log(row);
      	},
	}
}
</script>
<style scoped>
.el-table{
	margin-top: 10px;
}
.area{
	width: 100px;
}
</style>