<!-- 用户组信息维护 -->
<template>
	<div>
		<div class="add">
			<el-button type="primary" class='add'  @click="dialogVisible = true">添加组</el-button>
		</div>
		<!-- 对话框 -->
		<el-dialog title="组信息添加/修改" :visible.sync="dialogVisible">
			<label for="groupName">组名</label>
		  	<el-input v-model.trim="groupName" placeholder="请输入组名" id='groupName' style="width:200px"></el-input>
		  	<div class="authoritySetting">权限配置</div>
		  	<el-tree
			  :data="treeData"
			  show-checkbox
			  accordion
			  node-key="id"
			  ref="tree"
			  highlight-current
			  :props="defaultProps">
			</el-tree>

		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		  </div>
		</el-dialog>
		

		<el-table
		    :data="tableData"
		    stripe
		    border	
		    style="width: 100%;"
		    @row-click="changeAuthority">
		    <el-table-column 
		    	prop="id"
		    	label="用户组编号"
		    	>		
		    </el-table-column>
			<el-table-column 
		    	prop="name"
		    	label="组名"
		    	>		
		    </el-table-column>
		     <el-table-column 
		    	label="操作">	
				<template slot-scope="scope">
	       			<el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
     			</template>
		    </el-table-column>
		</el-table>
	</div>
</template>
<script>
export default{
	data(){
		return{
			tableData:[
			{
				name:'区域管理者',
				id:'G001'
			},
			{
				name:'社区管理者',
				id:'G002'
			}],
			// 是否显示对话框
			dialogVisible:false,
			// dialog的组名
			groupName:'',
			// 树的相关配置
			treeData:[
			{
				name:'系统参数定义配置',
				children:[
				{
					name:'客户分类定义'
				},
				{
					name:'阶梯价格参数配置'
				},
				{
					name:'费率价格配置'
				},
				{
					name:'客户类计费方式'
				}
				]
			},
			{
				name:'区域档案管理',
				children:[
				{
					name:'一级区域管理'
				},
				{
					name:'二级区域管理'
				},
				{
					name:'三级区域管理'
				},
				{
					name:'四级区域管理'
				},]
			}],
		  defaultProps: {
	          children: 'children',
	          label: 'name'
	        }
		}
	},
	methods:{
		/**
		*修改权限
		*/
		changeAuthority(row){
			console.log(row)
			this.groupName = row.name
			this.dialogVisible = true
		}
	}
}
</script>
<style scoped>
.el-table{
	margin-top: 10px;
}
.add{
	/*text-align: right;*/
	margin-right: 10px;
}
.authoritySetting{
	margin-top: 20px;
}	
</style>






