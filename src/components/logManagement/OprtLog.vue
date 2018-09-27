<!-- 操作日志分类查看 -->
<template>
	<div v-loading="loading" element-loading-text="拼命加载中">

		<div class="condition">

			<div class="block left">
			    <el-date-picker
			      v-model="startDate"
			      type="datetime"
			      placeholder="开始日期"
			      format='yyyy-MM-dd HH:mm:ss'>
			    </el-date-picker>

			    <span>至</span>

			    <el-date-picker
			      v-model="endDate"
			      type="datetime"
			      placeholder="结束日期"
			      format='yyyy-MM-dd HH:mm:ss'>
			    </el-date-picker>
	  		</div>
			<el-button type="primary" @click='QueryOprtcord()'>查询</el-button>
		</div>

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
			startDate:'',
			endDate:'',
			tableHead:[
			{
				label:'序号',
				id:'index',
				width:70
			},
			{
				label:'操作时间',
				id:'OprtTime',
				width:160
			},
			{
				label:'操作项目',
				id:'OprtMenu'
			},
			{
				label:'操作类容',
				id:'OprtConstant',
				// width:400
			},
			{
				label:'操作结果',
				id:'Memo',

			}],
			tableData:[],
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
				var status = this.showTableData[rowIndex][column.property]
				if (status == '成功') {
					return 'normal'
				}else {
					return 'error'
				}			
			}
	
		},

		/**
		*分页控制器的方法
		*/
      	handleCurrentChange(val) {
        	console.log(`当前页: ${val}`);
        	this.showTableData = this.partOfTableData.slice((val-1)*10, val *10)
      	},

      	/**
      	*查询操作日志
      	*/
      	QueryOprtcord(){
      		if (this.startDate > this.endDate) {
				this.$message({
                  type: 'warning',
                  message: '请确保时间范围的正确'
               });
				return
			}

      		this.loading = true
      		var params = {     
      			UserId:window.sessionStorage.getItem('id'),
      			TimeStart:this.dataUtil.formatTime1(this.startDate),
      			TimeEnd:this.dataUtil.formatTime1(this.endDate),
      			time:this.dataUtil.formatTime1(new Date()) 
      		}

      		  console.log(params);
          
	          var encryptParams = {
	            evalue:this.$encrypt(JSON.stringify(params))
	          }

	          console.log(this.$encrypt(JSON.stringify(params)))

	          this.http.post(this.api.baseUrl+this.api.QueryOprtcord,encryptParams)
	          .then(result=>{
	            this.loading = false
	            console.log(result)
	            if (result.status == '成功') {
	            	
	                this.$message({
	                  type: 'success',
	                  message: '查询成功!'
	               });

	                this.tableData = result.data
	                this.partOfTableData = this.tableData.slice(0)
	                this.showTableData = this.partOfTableData.slice(0, 10)

	            }else{

	              this.$message({
	                  type: 'error',
	                  message: result.data
	               });

	            }
	            
	            
	                    
	          })
      	}

	},
	mounted(){
		var date = new Date()
		
		this.startDate = new Date(date.getTime()-2*24*60*60*1000)

		this.endDate = new Date()
		this.loading = true
		setTimeout(()=>{
			this.QueryOprtcord()
		},2000)
	}
}
</script>
<style scoped>
.left{
	float: left;
	margin-right: 20px;
}
.el-table{
	margin-top: 10px;
}
.condition{
	overflow: hidden;
}
</style>
