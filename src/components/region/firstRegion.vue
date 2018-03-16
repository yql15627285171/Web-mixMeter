<!-- 这是用于管理员管理区域信息的页面 -->
<template>
	<div v-loading="allLoading" element-loading-text="拼命加载中">
		<div class="condition">
			<div class="add">
				<input id="upload" type="file" @change="importExcel($event)"  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" style="display:none" />
				<el-button type="primary" @click="choseFile">批量添加</el-button>
				<!-- <el-button type="primary">导出</el-button> -->
			</div>
		</div>
		
		<!-- 弹出框,显示excel表格的内容 -->
		<el-dialog  :visible.sync="excelVisible" v-loading="dialogLoading" element-loading-text="拼命加载中">
			<div style="overflow:hidden">
				<span>要上传的excel表格的信息</span>
				<el-button type="primary" style="float:right" @click='sureUploadExcel'>上传</el-button>
			</div>
			<el-table 
				:data="excelData"
				:header-cell-class-name="tableheaderClassName"
				style="width: 100%;"
				stripe
				>

				<el-table-column 
		    	v-for="item in excelHead"
		    	:prop="item"
		    	:label="item"
		    	width='150'
		    	>		
		    </el-table-column>
				
			</el-table>
		</el-dialog>


		<div>
		<el-table
		    :data="showTableData"
		    :header-cell-class-name="tableheaderClassName"
		    stripe
		    style="width: 100%;">
		    <el-table-column 
		    	v-for="item in tableHead"
		    	:prop="item.id"
		    	:label="item.label"
		    	:width='item.width'
		    	>		
		    </el-table-column>

		     <el-table-column 
		    	label="操作">	
				<template slot-scope="scope">
	       			<el-button @click="deleteHouse(scope.row)" type="text" size="small">删除</el-button>
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
		      :total="partOfTableData.length">
		    </el-pagination>
	  	</div>
		</div>
	</div>
	
</template>
<script>
export default{
	data(){
		return{
			isSuper:'0',
			//菊花 
			allLoading:false,
			dialogLoading:false,
			// 对话框
			excelVisible:false,
			excelHead:null,
			excelData:null,

			// formLabelWidth:'120px',
			// form:{
			// 	startArea:'',
			// 	endArea:'',
			// 	comments:''
			// },
		
			// 表格内容
			tableHead:[
			{
				label:'序号',
				id:'index',
				width:50
			},
			{
				label:'栋',
				id:'FifthRegionName',
			},
			{
				label:'房间',
				id:'HouseRegionName'
			},
			{
				label:'面积(㎡)',
				id:'HouseAera'
			}],
			tableData:[],
			partOfTableData:[],//筛选完条件之后的数据源
			showTableData:[],//显示在页面的数据源

			currentPage:1,
		}
	},
	methods:{

		tableheaderClassName({row, column, rowIndex, columnIndex}) {

          return "table-head-th";
        },



		/**
		*分页控制器的方法
		*/
      	handleCurrentChange(val) {
        	console.log(`当前页: ${val}`);
        	this.showTableData = this.partOfTableData.slice((val-1)*10, val *10)
      	},

      	/**
      	*选择excel文件
      	*/
      	// 选择文件
      	choseFile(){
      		document.getElementById("upload").click()
      	},
      	importExcel(event){
      		var file = event.currentTarget.files[0]

			this.excel.readExcel(file,(result,head,all)=>{
				this.excelHead = head
				this.excelData = all //没有过滤过的所有数据
				console.log(JSON.stringify(all))
			
				// console.log(typeof(JSON.stringify(all)))
			
				this.excelVisible = true
				document.getElementById("upload").value=''

      		})
		},

		/**
		*确认上传表格内容
		*/
		sureUploadExcel(){
			this.excelVisible = false
			this.allLoading = true
			var that = this
      	
  			var params = { 
  				UserId:window.sessionStorage.getItem('id'),
  				RegionCode:window.sessionStorage.getItem('RegionCode'),
  				jsonValue:JSON.stringify(this.excelData),
          		evalue:this.$encrypt()
        	}

        	// console.log(params)
        	
        	this.http.post(this.api.baseUrl+this.api.AddHouseInfo,params)
	        .then(res=>{
	          this.allLoading = false
	          var result= JSON.parse(res.data.replace(/<[^>]+>/g, "").replace(/[' '\r\n]/g, ""))
	          console.log('添加房间')
	           console.log(result)
	          if (result.status=="成功") {
	          	
	          	this.$message({
            		type: 'success',
           			message: '操作成功!'
         		});

	          	setTimeout(function(){
	          		that.getRoomInfo()
	          	}, 500)

	            // 更新树
	            this.updateTreeData()
	          }
	        }) 			
		},

		/**
		*获取房间信息
		*/
		getRoomInfo(){
			this.allLoading = true
			var params = { 
				// RegionCode:"ALL",
  				RegionCode:window.sessionStorage.getItem('RegionCode'), 				
          		evalue:this.$encrypt()
        	}
        	console.log(this.api.baseUrl+this.api.QureyAllHouseInfoForForm)
        	console.log(params);

        	this.http.post(this.api.baseUrl+this.api.QureyAllHouseInfoForForm,params)
	        .then(res=>{
	          this.allLoading = false
	          var result= JSON.parse(res.data.replace(/<[^>]+>/g, "").replace(/[' '\r\n]/g, ""))
	           console.log(result)
	          if (result.status=="成功") {
	          	this.tableData = result.Commmunity
	          	this.partOfTableData = this.tableData
	          	this.showTableData = this.tableData.slice(0, 10)

	          	this.currentPage = 1
	          }
	        }) 
		},

		/*
		*更新树的数据
		*/
		updateTreeData(){
			var that = this
			this.data.getTreeData({
	          succeed(res){
	            that.$store.dispatch('reloadTreeData',res)
	          }
	        })

		},

		/**
		*删除房间
		*/
		deleteHouse(row) {
        	// console.log(row);
        	var that = this
        	this.allLoading = true
        	var params = {
        		UserId:window.sessionStorage.getItem('id'),
        		HouseRegionCode:row.HouseRegionCode,
        		evalue:this.$encrypt()
        	}

        	this.http.post(this.api.baseUrl+this.api.DeleteHouseInfo,params)
	        .then(res=>{
	          this.allLoading = false
	          var result= JSON.parse(res.data.replace(/<[^>]+>/g, "").replace(/[' '\r\n]/g, ""))
	           console.log(result)
	          if (result.status=="成功") {
	          	this.$message({
            			type: 'success',
           			 	message: '操作成功!'
         			 });
	            
	            this.updateTreeData()
	            setTimeout(function(){
					that.getRoomInfo()
				},500)              	          
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
      		if (window.sessionStorage.getItem('menuName') == 'firstRegion') {
      			
      			if(node.level == "4"){
      				this.partOfTableData = this.tableData.filter(element=>{
      					return (element.FourthRegionCode == node.code)
      				});
      			}else if(node.level == "5"){
      				
      				this.partOfTableData = this.tableData.filter(element=>{
      					return (element.FifthRegionCode == node.code)
      				})
      			}else if(node.level == "6"){
      				this.partOfTableData = this.tableData.filter(element=>{
      					return (element.HouseRegionCode == node.code)
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

		this.isSuper = window.sessionStorage.getItem('isSuper')

		var that = this
		setTimeout(function(){
			that.getRoomInfo()
		},500)
		
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
.add{
	float: right;
}
.condition{
	overflow: hidden;
}



</style>









