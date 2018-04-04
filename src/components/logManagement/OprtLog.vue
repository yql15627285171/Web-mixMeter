<!-- 操作日志分类查看 -->
<template>
	<div>
			<el-table
		    :data="showTableData"
		    :header-cell-class-name="tableheaderClassName"
		    :cell-class-name='tableCellName'
		    style="width: 100%">

		    <el-table-column
		      v-for="(item,index) in tableHead"
		      :label="item.label"
		      :prop="item.id"
		      :width="item.width"
		      >
		    </el-table-column>


		  </el-table>

		  <div class="block pagination">
		    <el-pagination
		      @current-change="handleCurrentChange"
		      :current-page.sync="currentPage"
		      :page-size="10"
		      layout="total, prev, pager, next,jumper"
		      :total="tableData.length">
		    </el-pagination>
	  	  </div>
	</div>
</template>
<script>
export default{
	data(){
		return{
			loading:false,
			currentPage:1,
			tableHead:[
			{
				label:'序号',
				id:'index',
				width:70
			},
			{
				label:'房间',
				id:'houseName',
			},
			{
				label:'用户号',
				id:'UserId'
			},
			{
				label:'手机号',
				id:'MobilePhone'
			},
			{
				label:'时间',
				id:'Time'
			},
			{
				label:'操作',
				id:'Operation'
			}],
			tableData:[
			{
				index:'1',
				houseName:'彭兴花园>101',
				UserId:'Sun',
				MobilePhone:'129********',
				Time:'2018-03-08 12:00:00',
				Operation:'拉闸'
			}],
			areaTableData:[],
			partOfTableData:[],
			showTableData:[],

		}
	},
	methods:{
		/**
		*为表格的各部分命名
		*/
		 tableheaderClassName({ row, rowIndex }) {
          return "table-head-th";
        },

        tableCellName({row, column, rowIndex, columnIndex}){
			if (columnIndex == 4) {
				return 'normal'
			}else if (columnIndex == 5) {
				return 'error'
			}
	
		},

		/**
		*分页控制器的方法
		*/
      	handleCurrentChange(val) {
        	console.log(`当前页: ${val}`);
        	this.showTableData = this.partOfTableData.slice((val-1)*10, val *10)
      	},

	},
	mounted(){
		this.areaTableData = this.tableData,
		this.partOfTableData = this.areaTableData,
		this.showTableData = this.partOfTableData.slice(0,10)
	}
}
</script>
<style>
	
</style>
