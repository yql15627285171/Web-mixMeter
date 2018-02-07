<template>
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
	       			<el-button @click="handleClick(scope.row)" type="text" size="small">合闸</el-button>
	        		<el-button type="text" size="small">拉闸</el-button>
     			</template>
		    </el-table-column>
		   
		</el-table>
		<div class="block pagination">
		    <!-- <span class="demonstration">显示总数</span> -->
		    <el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page.sync="currentPage"
		      :page-size="100"
		      layout="total, prev, pager, next,jumper"
		      :total="1000">
		    </el-pagination>
	  	</div>
		
	</div>
</template>
<script>
export default{
	data(){
		return{
			tableHead:[
			{
				label:'序号',
				
				id:'num'
			},
			{
				label:'房间信息',
				
				id:'room'
			},
			{
				label:'表地址',
				
				id:'address'
			},
			{
				label:'余额(元)',
				
				id:'money'
			},
			{
				label:'阀门状态',
				
				id:'status'
			}],

			tableData:[
			{
				num:'1',
				room:'201',
				address:'123456789',
				money:'999',
				status:'合闸'
			},
			{
				num:'2',
				room:'301',
				address:'123456789',
				money:'999',
				status:'合闸'
			},
			{
				num:'3',
				room:'301',
				address:'123456789',
				money:'999',
				status:'拉闸'
			}],

			//分页控制器的显示数据
			currentPage:2
		}
	},
	methods:{
		//分页控制器的方法
		handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      	handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
	}
}	
</script>
<style scoped>
.pagination{
	margin-top: 40px
}

</style>












