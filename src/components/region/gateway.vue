<!-- 网关集中器资产管理 -->
<template>
	<div>
		<el-table
		    :data="tableData"
		    style="width: 100%">
		    <el-table-column type="expand">
		      <template slot-scope="props">
		        <el-form label-position="left" inline class="demo-table-expand" >
		          <el-form-item label="SIM卡号">
		            <span>{{ props.row.SIM }}</span>
		          </el-form-item>
		          <el-form-item label="安装时间">
		            <span>{{ props.row.InstallTime }}</span>
		          </el-form-item>
		          <el-form-item label="软件版本">
		            <span>{{ props.row.SoftVer }}</span>
		          </el-form-item>
		          <el-form-item label="硬件版本">
		            <span>{{ props.row.HardVer }}</span>
		          </el-form-item>
		          <el-form-item label="厂家名">
		            <span>{{ props.row.FactoryName }}</span>
		          </el-form-item>
		          <el-form-item label="备注">
		            <span>{{ props.row.Memo }}</span>
		          </el-form-item>

		        </el-form>
		      </template>
		    </el-table-column>
		    <el-table-column
		      label="序号"
		      prop="index"
		      width='50'>
		    </el-table-column>
		    <el-table-column
		      label="资产编号"
		      prop="ConAssetsCode">
		    </el-table-column>
		    <el-table-column
		      label="逻辑地址"
		      prop="LogicAddr">
		    </el-table-column>
		    <el-table-column
		      label="安装地址"
		      prop="InstallAddr">
		    </el-table-column>
		     <el-table-column label="状态">	
				<template slot-scope="scope">
	       			<span v-if="scope.row.UseStatus == '0'" style="color:red;">离线</span>
	       			<span v-if="scope.row.UseStatus == '1'" style="color:green;">在线</span>
     			</template>
	    	 </el-table-column>
	    	 <el-table-column
		      	label="最后在线时间"
		      	prop="LastTime">
		   	 </el-table-column>
	         <el-table-column label="操作">	
				<template slot-scope="scope" >
					<div>
						<el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
	        			<el-button type="text" size="small">删除</el-button>
					</div>	
     			</template>
	    	 </el-table-column>
		  </el-table>
	</div>
</template>
<script>
export default{
	data(){
		return{

			// 表格内容
			tableHead:[
			{
				label:'序号',
				id:'index',
			},
			{
				label:'资产编号',
				id:'ConAssetsCode',
			},
			{
				label:'逻辑地址',
				id:'LogicAddr',
			},
			{
				label:'状态',
				id:'UseStatus'
			},
			{
				label:'安装地址',
				id:'InstallAddr'
			},
			{
				label:'最后在线时间',
				id:'LastTime',
			},
			{
				label:'安装时间',
				id:'InstallTime'
			},
			{
				label:"SIM卡号",
				id:'SIM'
			},
			{
				label:'厂家名',
				id:'FactoryName',
			},
			{
				label:'软件版本',
				id:'SoftVer',
			},
			{
				label:'硬件版本',
				id:'HardVer',
			},
			{
				label:'备注',
				id:'Memo'
			}],
			tableData:[
			{
				index:'1',//序号
				ConAssetsCode:'001',
				LogicAddr:'192.168.0.1',
				UseStatus:'0',
				InstallAddr:'鹏兴花园>1栋',
				LastTime:'2018-02-15 00:00:00',
				InstallTime:'2017-12-19 11:00:00',
				SIM:'123456789',
				FactoryName:'泰瑞捷',
				SoftVer:'v1.2',
				HardVer:'v2.0',
				Memo:'普通'
			},
			{
				index:'2',//序号
				ConAssetsCode:'002',
				LogicAddr:'192.168.0.2',
				UseStatus:'1',
				InstallAddr:'鹏兴花园>2栋',
				LastTime:'2018-02-15 00:00:00',
				InstallTime:'2017-12-19 11:00:00',
				SIM:'123456789',
				FactoryName:'泰瑞捷',
				SoftVer:'v1.2',
				HardVer:'v2.0',
				Memo:'普通'
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
	
</style>