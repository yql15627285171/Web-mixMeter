<!-- 客户信息管理 -->
<template>
	<div v-loading="loading" element-loading-text="拼命加载中">
		<!-- <div>
			<el-select v-model="status" placeholder="请选择审核状态">
			    <el-option
			      v-for="item in statusSelect"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			</el-select>
			<el-button type="primary">查询</el-button>
		</div> -->
		<el-table
		    :data="showTableData"
		    :header-cell-class-name="tableheaderClassName"
		    :cell-class-name="tableCellName"
		    style="width: 100%">

		    <el-table-column 
		      v-for="item in tableHead"
		      :label="item.label"
		      :prop="item.id"
		      :width='item.width'>
		    </el-table-column>

	         <el-table-column label="操作">	
				<template slot-scope="scope" >
					<div v-if="scope.row.Memo == '0'">
						<el-button @click="ReviewAccessHouseInfo(scope.row)" type="text" size="small">审核</el-button>
	        			<el-button type="text" size="small" @click="ApplyForRemoveHouseInfo(scope.row)">取消</el-button>
					</div>	
     			</template>
	    	 </el-table-column>
		  </el-table>

		  <div class="block pagination">
		    <!-- <span class="demonstration">显示总数</span> -->
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
			currentPage:1,//当前页
		
			// 表格信息
			tableHead:[
			{
				label:'序号',
				id:'index',
				width:70
			},
			{
				label:'房间信息',
				id:'HouseName',
			},
			{
				label:'姓名',
				id:'UserName'
			},
			{
				label:'电话',
				id:'MobilePhone'
			},
			{
				label:'审核状态',
				id:'Memo'
			}],
			tableData:[],//总数据源
			areaTableData:[],
			partOfTableData:[],
			showTableData:[],//显示在页面的数据源
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
				if (status == '1') {
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
      	*数据源条件筛选
      	*/
      	filterTableData(node){
      		if (window.sessionStorage.getItem('menuName') == 'customerInfo') {
      			
      			if(node.level == "4"){
      				this.areaTableData = this.tableData.filter(element=>{
      					return (element.FourthRegionCode == node.code)
      				});
      			}else if(node.level == "5"){
      				
      				this.areaTableData = this.tableData.filter(element=>{
      					return (element.FifthRegionCode == node.code)
      				})
      			}else if(node.level == "6"){
      				this.areaTableData = this.tableData.filter(element=>{
      					return (element.HouseRegionCode == node.code)
      				})
      			}

      			this.partOfTableData = this.areaTableData

      			for (var i = 0; i < this.partOfTableData.length; i++) {
      				this.partOfTableData[i].index = (i+1).toString()
      			}
      			this.showTableData = this.partOfTableData.slice(0, 10)
      			
      		}
      	},

      	/**
      	*获取房间审核信息
      	*/
      	QureyHouseApplyInfo(){
      		this.loading = true
		      var params = {
		        FourthRegionCode:window.sessionStorage.getItem('RegionCode'),
		        AdminId:window.sessionStorage.getItem('id'),
		        ApplyStatus:'',
		        time:this.dataUtil.formatTime1(new Date())
		      }

		      console.log(params);
		      
		      var encryptParams = {
		        evalue:this.$encrypt(JSON.stringify(params))
		      }

		      console.log(this.$encrypt(JSON.stringify(params)))

		      this.http.post(this.api.baseUrl+this.api.QureyHouseApplyInfo,encryptParams)
		      .then(result=>{
		      	this.loading = false
		      	console.log(result)
		      	if (result.status == '成功') {
		      		this.tableData = result.data
		      		this.areaTableData = this.tableData
		      		this.partOfTableData = this.areaTableData
		      		this.showTableData = this.partOfTableData.slice(0,10)
		      		this.currentPage = 1
		      	}
		        
		        
		                
		      })
      	},

      	/**
      	*进行审核
      	*/
      	ReviewAccessHouseInfo(row){
      		this.loading = true
		      var params = {
		        HouseRegionCode:row.HouseRegionCode,
		        AdminId:window.sessionStorage.getItem('id'),
		        UserId:row.UserId,
		        time:this.dataUtil.formatTime1(new Date())
		      }

		      console.log(params);
		      
		      var encryptParams = {
		        evalue:this.$encrypt(JSON.stringify(params))
		      }

		      console.log(this.$encrypt(JSON.stringify(params)))

		      this.http.post(this.api.baseUrl+this.api.ReviewAccessHouseInfo,encryptParams)
		      .then(result=>{
		      	this.loading = false
		      	console.log(result)
		      	if (result.status == '成功') {
		      		this.QureyHouseApplyInfo()

		      		this.$message({
            			type: 'success',
           			 	message: '审核成功!'
         			 });

		      	}else{

		      		this.$message({
	          			showClose: true,
	          			message: result.data,
	          			type: 'error'
	        		});
		      	}		        
		                
		      })
      	},

      	/**
      	*取消审核
      	*/
      	ApplyForRemoveHouseInfo(row){
      		this.loading = true
		      var params = {
		        HouseRegionCode:row.HouseRegionCode,
		        UserId:row.UserId,
		        time:this.dataUtil.formatTime1(new Date())
		      }

		      console.log('取消审核')
		      console.log(params);
		      
		      var encryptParams = {
		        evalue:this.$encrypt(JSON.stringify(params))
		      }

		      console.log(this.$encrypt(JSON.stringify(params)))

		      this.http.post(this.api.baseUrl+this.api.ApplyForRemoveHouseInfo,encryptParams)
		      .then(result=>{
		      	this.loading = false
		      	console.log(result)
		      	if (result.status == '成功') {
		      		this.QureyHouseApplyInfo()

		      		this.$message({
            			type: 'success',
           			 	message: '取消成功!'
         			 });

		      	}else{

		      		this.$message({
	          			showClose: true,
	          			message: result.data,
	          			type: 'error'
	        		});
		      	}		        
		                
		      })
      	},

	},

	

	computed:{
		treeNode(){
			return this.$store.state.clickTreeData
		}
	},
	watch:{
		treeNode(newVal){
			this.filterTableData(newVal)
		}
	},
	mounted(){
		var that = this 
		setTimeout(function(){
			that.QureyHouseApplyInfo()
		},500)
	}
}	
</script>
<style scoped>

.el-table{
	margin-top: 10px;
}

.el-select{
	margin: 0 10px;
}

</style>








