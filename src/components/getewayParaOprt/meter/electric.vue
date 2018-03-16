<!-- 电表 -->
<template>
	<div v-loading="loading" element-loading-text="拼命加载中">
		<div class="condition">
			<div class="right">
				<div @click="ctrlMeterToTiaoZ">
					<i class="el-icon-edit-outline"></i>
					<span>拉闸</span>
				</div>
				<div @click="ctrlMeterToHeZ">
					<i class="el-icon-edit-outline"></i>
					<span>合闸</span>
				</div>
				<div>
					<i class="el-icon-edit-outline"></i>
					<span>保电</span>
				</div>
				<div>
					<i class="el-icon-edit-outline"></i>
					<span>取消保电</span>
				</div>
				<div @click="readMeterCurrentPower">
					<i class="el-icon-edit-outline"></i>
					<span>读电量</span>
				</div>
				<div>
					<i class="el-icon-edit-outline"></i>
					<span>读状态</span>
				</div>
			</div>
		</div>
		<el-table
			ref="multipleTable"
		    :data="showTableData"
		    :header-cell-class-name="tableheaderClassName"
		    :cell-class-name="tableCellName"
		    stripe
		    style="width: 100%"
		    @selection-change="handleSelectionChange">
		    <el-table-column
		      type="selection"
		      width="30">
		    </el-table-column>		    
		    <el-table-column
		    v-for="item in tableHead"
		      :label="item.label"
		      :prop="item.id"
		      >
		    </el-table-column>

		  </el-table>

		  <div class="block pagination">
		    <!-- <span class="demonstration">显示总数</span> -->
		    <el-pagination
		      @current-change="handleCurrentChange"
			  :current-page.sync="currentPage"
		      :page-size="10"
		      layout="total, prev, pager, next,jumper"
		      :total="partOfTableData.length">
		    </el-pagination>
	  	</div>

	</div>
</template>
<script>
export default{
	data(){
		return{

			loading:false,//菊花

			tableHead:[
			{
				label:'序号',
				id:'index',
				// width:50
			},
			{
				label:'表地址',
				id:'MeterAddr'
			},
			{
				label:'所属楼层',
				id:'FifthRegionName',
			},
			{
				label:'所属房间',
				id:'HouseRegionName',
			},
			{
				label:'安装地址',
				id:'InstallAddr'
			},
			{
				label:'当前电量',
				id:'CurrentPowerTotal',
			},
			{
				label:'剩余金额',
				id:'Balance'
			},
			{
				label:'余额状态',
				id:'BalanceStatus',
			},
			{
				label:'阀控状态',
				id:'RelayStatus'
			}],
			tableData:[],

			partOfTableData:[],

			showTableData:[],

			currentPage:1,//当前页数

			selectionData:{},
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
			if (columnIndex == 8) {
				var status = this.showTableData[rowIndex][column.property]
				if (status == '报警') {
					return 'warning'
				}else if (status == '欠费') {
					return 'error'
				}else{
					return 'normal'
				}				
			}
			if (columnIndex == 9) {
				var status = this.showTableData[rowIndex][column.property]
				if (status == '拉闸') {
					return 'error'
				}else{
					return 'normal'
				}				
			}
		},

		/**
		*分页控制器的方法
		*/
      	handleCurrentChange(val) {
        	this.showTableData = this.partOfTableData.slice((val-1)*10, val *10)
      	},

		/**
		*表格选中的行发生改变
		*/
		handleSelectionChange(val){
		
			if (val.length > 2 || (val.length == 2 && this.tableData.length ==2)) {
				alert('不能全选')
				this.$refs.multipleTable.clearSelection();
				return
			}

			if (val.length == 2 && this.tableData.length !=2) {
				this.$refs.multipleTable.clearSelection();
				this.$refs.multipleTable.toggleRowSelection(val[1]);

				this.selectionData = val[1]

				return
			}

			this.selectionData = val[0]
		},

		/**
		*查询表计状态（非实时，实时操作需要点抄）
		*/
		qureyMeterCurrentStatusByRegionCode(){
			this.loading = true

			var params = {
				UserId: window.sessionStorage.getItem('id'),
				RegionCode :window.sessionStorage.getItem('RegionCode'),
				MeterKindId:'1',	
          		evalue:this.$encrypt()
        	}
          console.log(this.api.baseUrl+this.api.QureyMeterCurrentStatusByRegionCode)
        	this.http.post(this.api.baseUrl+this.api.QureyMeterCurrentStatusByRegionCode,params)
	        .then(res=>{
	          this.loading = false
	          var result= JSON.parse(res.data.replace(/<[^>]+>/g, "").replace(/[' '\r\n]/g, ""))
	          console.log('表计信息')
	           console.log(result)
	          if (result.status=="成功") {
	          	this.tableData = result.data
	    		this.partOfTableData = this.tableData
	    		console.log(this.partOfTableData)
	          	this.showTableData = this.tableData.slice(0, 10)

	          	this.currentPage = 1

	          	

	          }else{
	        	
	        	this.$message({
          			showClose: true,
          			message: '读取失败，请刷新',
          			type: 'error'
        		});
	          }
	          
	        })
		},

		/**
		*读取当前电量
		*/
		readMeterCurrentPower(){
			this.loading = true

			var params = {
				UserId: window.sessionStorage.getItem('id'),
				HouseRegionCode:this.selectionData.HouseRegionCode,	
          		evalue:this.$encrypt()
        	}

        	console.log(params)
        
        	this.http.post(this.api.baseUrl+this.api.ReadMeterCurrentPower,params)
	        .then(res=>{
	          this.loading = false
	          var result= JSON.parse(res.data.replace(/<[^>]+>/g, "").replace(/[' '\r\n]/g, ""))
	          console.log('合闸')
	           console.log(result)
	          if (result.status=="成功") {
	          	

	          	this.$message({
            			type: 'success',
           			 	message: '操作成功!'
         			 });



	          }else{
	        	
	        	this.$message({
          			showClose: true,
          			message: '操作失败',
          			type: 'error'
        		});
	          }
	          
	        })
		},

		/**
		*拉闸操作
		*/
		ctrlMeterToTiaoZ(){
			this.loading = true

			var params = {
				UserId: window.sessionStorage.getItem('id'),
  		 		HouseRegionCode:this.selectionData.HouseRegionCode,	
  		 		MeterKindId:'1',
  		 				
          		evalue:this.$encrypt()
        	}
        	console.log(params)
        	console.log(this.api.baseUrl+this.api.CtrlMeterToTiaoZ);
        
        	this.http.post(this.api.baseUrl+this.api.CtrlMeterToTiaoZ,params)

	        .then(res=>{
	          this.loading = false
	          var result= JSON.parse(res.data.replace(/<[^>]+>/g, "").replace(/[' '\r\n]/g, ""))
	          console.log('跳闸')
	           console.log(result)
	          if (result.status=="成功") {
	          	

	          	this.$message({
            			type: 'success',
           			 	message: '操作成功!'
         			 });

	          }else{
	        	
	        	this.$message({
          			showClose: true,
          			message: '操作失败',
          			type: 'error'
        		});
	          }
	          
	        })
		},

		/**
		*合闸操作
		*/

		 ctrlMeterToHeZ(){
		 	this.loading = true

			var params = {
				UserId: window.sessionStorage.getItem('id'),
  		 		HouseRegionCode:this.selectionData.HouseRegionCode,	
  		 		MeterKindId:'1',
          		evalue:this.$encrypt()
        	}
        	console.log(params)
        	this.http.post(this.api.baseUrl+this.api.CtrlMeterToHeZ,params)
	        .then(res=>{
	          this.loading = false
	          var result= JSON.parse(res.data.replace(/<[^>]+>/g, "").replace(/[' '\r\n]/g, ""))
	          console.log('合闸')
	           console.log(result)
	          if (result.status=="成功") {

	          	this.$message({
            			type: 'success',
           			 	message: '操作成功!'
         			 });

	          }else{
	        	
	        	this.$message({
          			showClose: true,
          			message: '操作失败',
          			type: 'error'
        		});
	          }
	          
	        })
		 },

		 /**
      	*数据源条件筛选
      	*/
      	filterTableData(node){
			if (window.sessionStorage.getItem('menuName') == 'MeterReadAndSet') {
      
      			if(node.level == "4"){
      				this.partOfTableData = this.tableData.filter(element=> {
      					return (element.FourthRegionCode == node.code)
      				});
      			}else if (node.level == "5") {
      				this.partOfTableData = this.tableData.filter(element=> {
      					return (element.FifthRegionCode == node.code)
      				});
      			}else if (node.level == "6") {
      				
      				this.partOfTableData = this.tableData.filter(element=> {
      					return (element.HouseRegionCode == node.code)
      				});

      			} else if(node.level == "GW"){
      				
      				this.partOfTableData = this.tableData.filter(element=>{
      					return (element.LogicAddr == node.label)
      				})
      			}

      			for (var i = 0; i < this.partOfTableData.length; i++) {
      				this.partOfTableData[i].index = (i+1).toString()
      			}


      			
      			this.showTableData = this.partOfTableData.slice(0, 10)
      			
      		}
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
			that.qureyMeterCurrentStatusByRegionCode()
		},500)
		
	}
}
</script>
<style scoped>
.right{
	float: right;
}

.right div{
	margin-left: 20px;
	font-size: 14px;
	cursor: pointer;
	display: inline-block
}



.condition{
	overflow: hidden
}

.el-table{
	margin-top: 10px;
}


	
</style>