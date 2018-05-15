<!-- 这是用于管理员管理区域信息的页面 -->
<template>
	<div v-loading="allLoading" element-loading-text="拼命加载中">
		<div class="condition">
			<div class="add">
				<input id="upload" type="file" @change="importExcel($event)"  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" style="display:none" />
				<el-button type="primary" @click="singleImportDialog">单个添加</el-button>
				<el-button type="primary" @click="choseFile">批量添加</el-button>
				<!-- <el-button type="primary" @click='doPrint'>打印</el-button> -->
			</div>
		</div>
		
		<!-- 弹出框,显示excel表格的内容 -->
		<el-dialog  :visible.sync="excelVisible" >
			<div style="overflow:hidden">
				<span>要上传的excel表格的信息</span>
				<el-button type="primary" style="float:right" @click='sureUploadExcel'>上传</el-button>
			</div>
			
			<el-table 
				:data="excelData"
				:header-cell-class-name="tableheaderClassName"
				:cell-class-name="tableCellName"
				style="width: 100%;"
				height="350"
				stripe
				>

				<el-table-column 
		    	v-for="(item,index) in excelHead"
		    	:prop="item"
		    	:label="item"
		    	width='150'
		    	>		
		   		</el-table-column>
				
			</el-table>
			
			
		</el-dialog>
		<!-- 单个导入弹出框 -->
		
		<el-dialog title="导入/修改 房间信息" :visible.sync="singleImportDialogVisible">
	      <el-form :model="singleImportForm"  class="demo-ruleForm">
			

	        <el-form-item label="区域" prop="FifthRegionName" style='margin-left:30px'>
		        <el-input
				  v-model.trim="singleImportForm.FifthRegionName"
				  placeholder="请输入内容"
				  style='width:70%'
				  :disabled='cannotabled'>	
				</el-input>
	          
	        </el-form-item>
	        <el-form-item label="房间"  prop="HouseRegionName" style='margin-left:30px'>
	        	<el-input
				  v-model.trim="singleImportForm.HouseRegionName"
				  placeholder="请输入内容"
				  style='width:70%'>	
				</el-input>
	        </el-form-item>
	        <el-form-item label="面积"  prop="HouseAera" style='margin-left:30px'>
	        	<el-input
				  v-model.trim="singleImportForm.HouseAera"
				  placeholder="请输入内容"
				  style='width:70%'
				  :disabled='cannotabled'>	
				</el-input>
	        </el-form-item>
	      </el-form>
	      <div slot="footer" class="dialog-footer">
	        <el-button @click="singleImportDialogVisible = false">取 消</el-button>
	        <el-button type="primary" @click='sureAddOrUpdate'>确 认</el-button>
	      </div>
	    </el-dialog>


		<div>
		<el-table
			id='table'
		    :data="showTableData"
		    :header-cell-class-name="tableheaderClassName"
		    stripe
		 
		    >
		    <el-table-column 
		    	v-for="item in tableHead"
		    	:prop="item.id"
		    	:label="item.label"
		    	:width='item.width'

		    	>		
		    </el-table-column>


		     <el-table-column
				width='150'
		    	label="操作">	
				<template slot-scope="scope">
					<el-button @click="UpdateHouse(scope.row)" type="text" size="small">修改</el-button>
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

			singleImportDialogVisible:false,//单个导入框是否显示
			
			singleImportForm:{
				FifthRegionName:'',//栋数
				HouseRegionName:'',//房间
				HouseAera:'',//面积
			},//单个导入表格
			formLabelWidth:120,

			cannotabled:false,
			updateItem:null,//要修改的房间

			// 表格内容
			tableHead:[
			{
				label:'序号',
				id:'index',
				width:70,
			},
			{
				label:'区域',
				id:'FifthRegionName',
			
			},
			{
				label:'房间',
				id:'HouseRegionName',
			
			},
			{
				label:'面积(㎡)',
				id:'HouseAera',
				
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

         tableCellName({row, column, rowIndex, columnIndex}){
			return 'tableRow'
		},

		/**
		*分页控制器的方法
		*/
      	handleCurrentChange(val) {
        	console.log(`当前页: ${val}`);
        	this.showTableData = this.partOfTableData.slice((val-1)*10, val *10)
      	},

      	/**
      	*打印
      	*/
      	doPrint(){
      		this.showTableData = this.partOfTableData

      		setTimeout(function(){
      			var table_print = document.getElementById('table')
      		var newstr = table_print.innerHTML
      		var oldstr = document.body.innerHTML
      		document.body.innerHTML = newstr
      		window.print();
      
      		window.location.reload()
      	}, 50)
      		
      		
      
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
	        .then(result=>{
	          this.allLoading = false
	      
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

	          }else{

	          	this.$message({
            		type: 'error',
           			message: JSON.stringify(result.data)
         		});

	          }
	        }) 			
		},

		/**
		*单个添加房间
		*/
		AddHouseInfoSingle(){
			this.singleImportDialogVisible = false
      		
      		this.allLoading = true
      		 var params = {
      		 	FifthRegionName:this.singleImportForm.FifthRegionName,
      		 	HouseRegionName:this.singleImportForm.HouseRegionName,
      		 	HouseAera:this.singleImportForm.HouseAera,
                UserId:window.sessionStorage.getItem('id'),
                RegionCode:window.sessionStorage.getItem('RegionCode'),
                time:this.dataUtil.formatTime1(new Date()) 
            }

              console.log(JSON.stringify(params));
          
              var encryptParams = {
                evalue:this.$encrypt(JSON.stringify(params))
              }

              console.log(this.$encrypt(JSON.stringify(params)))

              this.http.post(this.api.baseUrl+this.api.AddHouseInfoSingle,encryptParams)
              .then(result=>{

              	  this.allLoading = false			       
		          console.log(result)
		          if (result.status=="成功") {
		          	
		          	this.$message({
	            		type: 'success',
	           			message: '操作成功!'
	         		});

		          	setTimeout(()=>{
		          		this.getRoomInfo()
		          	}, 500)

		            // 更新树
		            this.updateTreeData()


		          }else{

		          	this.$message({
	            		type: 'error',
	           			message: result.data
	         		});

		          }

              })
		},

		/**
      	*添加房间名字弹出框显示
      	*/
		singleImportDialog(){
			this.singleImportDialogVisible = true
			this.cannotabled = false
		},


		/**
      	*修改房间名字弹出框显示
      	*/
      	UpdateHouse(row){
      		this.cannotabled = true
      		this.singleImportDialogVisible = true
      		this.updateItem = row
      		this.singleImportForm.FifthRegionName = row.FifthRegionName
      		this.singleImportForm.HouseRegionName = row.HouseRegionName
      		this.singleImportForm.HouseAera = row.HouseAera
      	},

      	/**
      	*修改房间名字
      	*/
      	UpdateHouseRegionName(){
      		this.singleImportDialogVisible = false
      		
      		this.allLoading = true
      		 var params = {
      		 	NewHouseName:this.singleImportForm.HouseRegionName,
      		 	HouseRegionName:this.updateItem.HouseRegionName,//旧名
      		 	HouseRegionCode:this.updateItem.HouseRegionCode,//修改的房间码
                UserId:window.sessionStorage.getItem('id'),
                RegionCode:window.sessionStorage.getItem('RegionCode'),
                time:this.dataUtil.formatTime1(new Date()) 
            }

              console.log(JSON.stringify(params));
          
              var encryptParams = {
                evalue:this.$encrypt(JSON.stringify(params))
              }

              console.log(this.$encrypt(JSON.stringify(params)))

              this.http.post(this.api.baseUrl+this.api.UpdateHouseRegionName,encryptParams)
              .then(result=>{

              	  this.allLoading = false			       
		          console.log(result)
		          if (result.status=="成功") {
		          	
		          	this.$message({
	            		type: 'success',
	           			message: '操作成功!'
	         		});

		          	setTimeout(()=>{
		          		this.getRoomInfo()
		          	}, 500)

		            // 更新树
		            this.updateTreeData()


		          }else{

		          	this.$message({
	            		type: 'error',
	           			message: result.data
	         		});

		          }

              })
      	},

      	/**
      	*确定修改或更新
      	*/
      	sureAddOrUpdate(){
      		if (this.cannotabled) {
      			this.UpdateHouseRegionName()
      		}else{
      			this.AddHouseInfoSingle()
      		}
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
	        .then(result=>{
	          this.allLoading = false
	        
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

	        this.$confirm('确定要删除该房间吗', '警告', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(()=> {


	                var that = this
		        	this.allLoading = true
		        	var params = {
		        		UserId:window.sessionStorage.getItem('id'),
		        		HouseRegionCode:row.HouseRegionCode,
		        		evalue:this.$encrypt()
		        	}

		        	this.http.post(this.api.baseUrl+this.api.DeleteHouseInfo,params)
			        .then(result=>{
			          this.allLoading = false
			         
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
	         })
	        .catch(()=> {});
      	
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
	margin: 10px auto;
	/*width: 850px;*/
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









