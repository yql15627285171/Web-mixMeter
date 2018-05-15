<!-- 计量表档案管理 -->
<template>
	<div v-loading="allLoading" :element-loading-text="loadingTitle">
		<div class="condition">
			
			<div class="right">
				<input id="upload" type="file" @change="importExcel($event)"  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" style="display:none" />
				<el-button type="primary" @click="singleImportBtnClick">单个添加</el-button>
				<el-button type="primary" @click="choseFile">一键添加</el-button>
				<el-button type="primary" @click="setFileToGW">档案下发</el-button>
			</div>
			
		</div>
		
		<!-- excel表格导入对话框 -->
		<el-dialog  :visible.sync="excelVisible" class='excelDialog'>
			<div style="overflow:hidden">
				<el-button type="primary" style="float:right" @click="sureUpload">上传</el-button>
			</div>
			
			
				<el-table 
				:data="excelData"
				:header-cell-class-name="tableheaderClassName"
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
		
		<!-- 修改对话框 -->
		<el-dialog :title='changeTitle' :visible.sync="changeDialogVisible">
		  <el-form :model="changeForm">
			<el-form-item label="大类号" :label-width="formLabelWidth">
		      <el-input v-model="changeForm.BigClassNo" auto-complete="off" placeholder="大类号"></el-input>
			</el-form-item>
			<el-form-item label="小类号" :label-width="formLabelWidth">
		      <el-input v-model="changeForm.SmallClassNo" auto-complete="off" placeholder="小类号"></el-input>
			</el-form-item>
			<el-form-item label="运行状态" :label-width="formLabelWidth">
		      <el-switch v-model="changeForm.RunStatus">
			  </el-switch>
			</el-form-item>
		

		  </el-form>
	      <div slot="footer" class="dialog-footer">
		    <el-button @click="changeDialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="sureChangeInfo">确 定</el-button>
	  	  </div>
		</el-dialog>

		<!-- 单个导入 -->
		<el-dialog title="导入/修改 表计" :visible.sync="singleImportDialogVisible" label-position='right' >
	      <el-form :model="singleImportForm"  class="demo-ruleForm">
			

	        <el-form-item label="资产编号" prop="MeterAssetsCode" label-width='90px'>
	        	<el-input 	v-model.trim="singleImportForm.MeterAssetsCode"
	        				placeholder="请输入内容"
	        				style='width:70%'
	        				:disabled='noChangeMeterAssetsCode'
	        	></el-input>
		       
	          
	        </el-form-item>
	        <el-form-item label="区域"  prop="FifthRegionName" label-width='90px'>
	        	<el-autocomplete
				  v-model.lazy.trim="singleImportForm.FifthRegionName"
				  :fetch-suggestions="queryFifthRegionName"
				  placeholder="请输入内容"
				  style='width:70%'
				  @select="handleSelect">	
				</el-autocomplete>
	        </el-form-item>
	        <el-form-item label="房间"  prop="HouseRegionName" label-width='90px'>
	        	<el-autocomplete
				  v-model.trim="singleImportForm.HouseRegionName"
				  :fetch-suggestions="queryHouseRegionName"
				  placeholder="请输入内容"
				  style='width:70%'>	
				</el-autocomplete>
	        </el-form-item>
	        <el-form-item label="集中器地址"  prop="LogicAddr" label-width='90px'>
	        	<el-autocomplete
				  v-model.trim="singleImportForm.LogicAddr"
				  :fetch-suggestions="queryLogicAddr"
				  placeholder="请输入内容"
				  style='width:70%'>	
				</el-autocomplete>
	        </el-form-item>

			<el-form-item label="安装地址" prop="InstallAddr" label-width='90px'>
	        	<el-input 	v-model.trim="singleImportForm.InstallAddr"
	        				placeholder="请输入内容"
	        				style='width:70%'
	        	></el-input>
		       
	          
	        </el-form-item>


	      </el-form>

		 	
	      <div slot="footer" class="dialog-footer">
	        <el-button @click="singleImportDialogVisible = false">取 消</el-button>
	        <el-button type="primary" @click="AddMeterInfoSingle">确认</el-button>
	      </div>

	    </el-dialog>


		<!-- 表格 -->
			<el-table			
		    :data="showTableData"
		    :header-cell-class-name="tableheaderClassName"
		    :cell-class-name="tableCellName"
		    stripe
		    style="width: 100%">
		   
		    <el-table-column type="expand">
		      <template slot-scope="props">
		        <el-form label-position="left" inline class="demo-table-expand" >
		          <el-form-item  v-for="(item,index) in tableHead" v-if="index >=6" :label="item.label" >
		            <span>{{ props.row[item.id] }}</span>
		          </el-form-item>
		     
		        </el-form>
		      </template>
		    </el-table-column>
		    <el-table-column
		      v-for="(item,index) in tableHead"
		      v-if="index <= 5"
		      :label="item.label"
		      :prop="item.id"
		      :width="item.width"
		      >
		    </el-table-column>

		   <!--   <el-table-column label="运行状态">	
				<template slot-scope="scope">
	       			<span v-if="scope.row.RunStatus == '0'" style="color:red">停用</span>
	       			<span v-if="scope.row.RunStatus == '1'" style="color:green">运行</span>
     			</template>
	    	 </el-table-column>
 -->	  <el-table-column label="操作">	
				<template slot-scope="scope" >
					<div>
						<el-button

							@click="changeClick(scope.row)" 
							type="text" 
							size="small">修改</el-button>
	        			<el-button type="text" size="small" @click="DeleteMeterInfo(scope.row)">删除</el-button>
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
		      :total="partOfTableData.length">
		    </el-pagination>
	  	</div>

	</div>
</template>
<script>
export default{
	data(){
		return{
			isSuper:"0",
			// 菊花
			allLoading:false,
			loadingTitle:'',//加载的标题
			logicAddr:'',
			// 对话框表格信息
			excelHead:null,
			excelData:null,
			excelVisible:false,

			// 修改对话框
			changeDialogVisible:false,
			formLabelWidth:'120px',
			changeTitle:'',
			changeForm:{
				BigClassNo:'',//大类号
				SmallClassNo:'',//小类号
				RunStatus:false,//运行状态

			},

			singleImportDialogVisible:false,//单个导入
			singleImportForm:{
				MeterAssetsCode:'',//资产编号
				FifthRegionName:'',//栋数
				HouseRegionName:'',//房间名
				LogicAddr:'',//集中器逻辑地址
				MeasureId:'',//测量点号：新增表：0，修改表传当前测量点 
				InstallAddr:'',//安装地址 
			},
			noChangeMeterAssetsCode:false,//资产编号能否进行编辑

			changeRow:{},//要修改的行的信息
			// 表格信息
			tableHead:[
			{
				label:'序号',
				id:'index',
				width:70
			},
			{
				label:'表地址',
				id:'MeterAddr'
			},
			{
				label:'所属区域',
				id:'FifthRegionName'
			},
			{
				label:'所属房间',
				id:'HouseRegionName'
			},
			{
				label:'所属集中器',
				id:'LogicAddr'
			},
			{
				label:'运行状态',
				id:'RunStatus'
			},
			{
				// 1 电表 2 水表 3 气表 4 热表
				label:'表计类型',
				id:'MeterKindId'
			},
			
			{
				label:'资产编号',
				id:'MeterAssetsCode'
			},
			{
				label:'表装置序号',
				id:'Seq',
			},
			{
				label:'测量点符号',
				id:'MeasureId',
			},
			
			{
				label:'波特率',
				id:'BaudRate',
			},
			{
				label:'端口号',
				id:'CommPort'
			},
			{
				label:'协议',
				id:'CommProtocol'
			},
			{
				label:'通信密码',
				id:'CommPwd'
			},
			{
				label:'费率数',
				id:'RateNum'
			},
			// {
			// 	label:'阶梯单价个数',
			// 	id:'LadderNum'
			// },
			{
				label:'示数整数位个数',
				id:'IntegerNum'
			},
			{
				label:'示数整数位个数',
				id:'IntegerNum'
			},
			{
				label:'采集器地址',
				id:'CollectorAddr'
			},
			{
				label:'用户大类号',
				id:'BigClassNo'
			},
			{
				label:'用户小类号',
				id:'SmallClassNo'
			},
			{
				label:'付费类型',
				id:'PayType'
			},
			// {
			// 	label:'是否总表',
			// 	id:'GateMeterFlg',
			// },
			// {
			// 	label:'总表所属区域级别',
			// 	id:'RegionLevel'
			// },
			// {
			// 	label:'总表所属区域编码',
			// 	id:'RegionCode'
			// },
			{
				label:'软件版本',
				id:'SoftVer'
			},
			{
				label:'硬件版本',
				id:'HardVer'
			},
			{
				label:'安装地址',
				id:'InstallAddr'
			},
			{
				label:'安装时间',
				id:'InstallTime'
			},
			{
				label:'备注',
				id:'Memo'
			}],
			tableData:[],
			partOfTableData:[],//筛选完条件之后的数据源
			showTableData:[],//显示在页面的数据源
			currentPage:1,//当前页数

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
			if (columnIndex == 6) {
				var status = this.showTableData[rowIndex][column.property]
				if (status == '运行') {
					return 'normal'
				}else if (status == '停用') {
					return 'error'
				}else{
					return 'warning'
				}				
			}
	
		},

		//输入框筛选内容-----栋
		queryFifthRegionName(queryString, cb) {


			var Commmunity = this.$store.state.treeData.Commmunity[0]


			if (Commmunity == null) {
				cb([])
				return
			}

			var restaurants = []

			for (var i = 0; i < Commmunity.children.length; i++) {
				var item = {"value":Commmunity.children[i].label}
				restaurants.push(item)
			}

			if (restaurants.length == 0) {
				cb([])
				return
			}
        	
        	var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

          	cb(results);
       
        },

        // 房间筛选
        queryHouseRegionName(queryString, cb) {
		


			var Commmunity = this.$store.state.treeData.Commmunity[0]

			var houseName = Commmunity.children.filter(element=> {
			return	(element.label == this.singleImportForm.FifthRegionName)
			})[0];
			
			if (houseName == null) {
				cb([])
				return
			}

			var restaurants = []

			for (var i = 0; i < houseName.children.length; i++) {
				var item = {"value":houseName.children[i].label}
				restaurants.push(item)
			}

			if (restaurants.length == 0) {
				cb([])
				return
			}

        	
        	var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

      

          	cb(results);
       
        },

        // 集中器
        queryLogicAddr(queryString, cb) {


			var GWList = this.$store.state.treeData.GWList[0]

			if (GWList == null) {
				cb([])
				return
			}

			var restaurants = []

			for (var i = 0; i < GWList.children.length; i++) {
				var item = {"value":GWList.children[i].label}
				restaurants.push(item)
			}

        	if (restaurants.length == 0) {
				cb([])
				return
			}
        	var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

          	cb(results);
       
        },


      	createStateFilter(queryString) {
        	return (state) => {
          		return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) != -1);
        	};
      	},
      	handleSelect(item) {
      		console.log(item.value)
        	if (item.value != this.singleImportForm.FifthRegionName) {
        		console.log('gaibian1')
        		this.singleImportForm.HouseRegionName = ''
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
      	*点击修改按钮
      	*/
      	changeClick(row){
      		if (this.isSuper == '1') {
      			this.changeDialogVisible = true,

	      		this.changeRow = row

	      		this.changeForm.BigClassNo = row.BigClassNo

	      		this.changeForm.SmallClassNo = row.SmallClassNo

	      		row.RunStatus ? this.changeForm.RunStatus = true : this.changeForm.RunStatus = false
      		}else{
      			this.singleImportDialogVisible = true
      			this.noChangeMeterAssetsCode = true //修改时资产编号不能进行编辑

      			this.singleImportForm.MeterAssetsCode = row.MeterAssetsCode
      			this.singleImportForm.FifthRegionName = row.FifthRegionName
      			this.singleImportForm.HouseRegionName = row.HouseRegionName
      			this.singleImportForm.LogicAddr = row.LogicAddr
      			this.singleImportForm.MeasureId = row.MeasureId
      			this.singleImportForm.InstallAddr = row.InstallAddr

      		}
      		
      	},

      	// 点击单个导入按钮
      	singleImportBtnClick(){
      		this.singleImportDialogVisible = true
      		this.noChangeMeterAssetsCode = false //添加时资产编号能进行编辑
      		this.singleImportForm.MeterAssetsCode = ''
  			this.singleImportForm.FifthRegionName = ''
  			this.singleImportForm.HouseRegionName = ''
  			this.singleImportForm.LogicAddr = ''
  			this.singleImportForm.InstallAddr = ''
  			this.singleImportForm.MeasureId = '0'
      	},
      	/**
      	*确定上传修改
      	*超级管理员的修改
      	*/
      	sureChangeInfo(){
      		this.changeDialogVisible = false,

      		this.changeRow.BigClassNo = this.changeForm.BigClassNo
      		this.changeRow.SmallClassNo = this.changeForm.SmallClassNo

      		this.changeForm.RunStatus ? this.changeRow.RunStatus = '1' : this.changeRow.RunStatus = '0'

      		this.updateInfo([this.changeRow])

      	},
      	/**
      	*确定上传导入/修改
      	*管理员的修改
      	*/
      	AddMeterInfoSingle(){

      		if (this.singleImportForm.MeterAssetsCode.length !=12) {
      			this.$message({
	            	type: 'warning',
	           		message: '资产编号必须是12位长度'
	         	});
	         	return
      		}

      		this.singleImportDialogVisible = false
      		
      		this.allLoading = true
      		 var params = {
      		 	FifthRegionName:this.singleImportForm.FifthRegionName,
      		 	HouseRegionName:this.singleImportForm.HouseRegionName,
      		 	LogicAddr:this.singleImportForm.LogicAddr,
      		 	MeterAssetsCode:this.singleImportForm.MeterAssetsCode,
      		 	MeasureId:this.singleImportForm.MeasureId,
      		 	InstallAddr:this.singleImportForm.InstallAddr,
                UserId:window.sessionStorage.getItem('id'),
                RegionCode:window.sessionStorage.getItem('RegionCode'),
                time:this.dataUtil.formatTime1(new Date()) 
            }

              console.log(JSON.stringify(params));
          
              var encryptParams = {
                evalue:this.$encrypt(JSON.stringify(params))
              }

              console.log(this.$encrypt(JSON.stringify(params)))

              this.http.post(this.api.baseUrl+this.api.AddMeterInfoSingle,encryptParams)
              .then(result=>{

              	  this.allLoading = false			       
		          console.log(result)
		          if (result.status=="成功") {
		          	
		          	this.$message({
	            		type: 'success',
	           			message: '操作成功!'
	         		});

		          	this.queryMeterInfo()

		          }else{

		          	this.$message({
	            		type: 'error',
	           			message: result.data
	         		});

		          }

              })
      	},


		/**
		*表格选中的行发生改变
		*/
		handleSelectionChange(val){
			console.log(val)
			this.singleImportForm.HouseRegionName = ''
		},

		// 选择文件
      	choseFile(){
      		document.getElementById("upload").click()
      	},

      	importExcel(event){
      		var file = event.currentTarget.files[0]

			this.excel.readExcel(file,(result,head,all)=>{
				this.excelHead = head
				this.excelData = all
				console.log(JSON.stringify(all))
				this.excelVisible = true
				document.getElementById("upload").value=''

      		})
		},
		/**
		*确定上传
		*/
		sureUpload(){
			this.excelVisible = false
			this.updateInfo(this.excelData)	
		},

		/**
		*更新信息
		*/
		updateInfo(jsonVal){

			this.allLoading = true
			this.loadingTitle="拼命加载中"
			var that = this
      	
  			var params = { 
  				UserId:window.sessionStorage.getItem('id'),
  				RegionCode:window.sessionStorage.getItem('RegionCode'),
  				jsonValue:JSON.stringify(jsonVal),
          		evalue:this.$encrypt()
        	}

        	console.log(params)
        	console.log(JSON.stringify(jsonVal))
        	console.log(this.api.baseUrl+this.api.InputMeterInfo)
        	this.http.post(this.api.baseUrl+this.api.InputMeterInfo,params)
	        .then(result=>{
	          this.allLoading = false
	          
	          
	           console.log(result)
	          if (result.status=="成功") {

	          	this.$message({
            		type: 'success',
           			message: '操作成功!'
         		});
	           
	
	            this.queryMeterInfo()

	          }else{

	          	this.$message({
            		type: 'error',
           			message: JSON.stringify(result.data)
         		});

	          }
	        })
		},

		/**
		*查询表计信息
		*/
		queryMeterInfo(){

			this.allLoading = true
			this.loadingTitle="拼命加载中"
			var that = this
      	
  			var params = { 
  				// RegionCode:'ALL',
  				RegionCode:window.sessionStorage.getItem('RegionCode'),
          		evalue:this.$encrypt()
        	}

        	console.log(params)
        	
        	this.http.post(this.api.baseUrl+this.api.QureyAllMeterInfoByRegionCode,params)
	        .then(result=>{
	          this.allLoading = false
	       
	          console.log('查询表计')
	           console.log(result)
	          if (result.status=="成功") {
	          	this.tableData = result.data
	          	this.partOfTableData = this.tableData
	          	this.showTableData = this.partOfTableData.slice(0,10)

	          	this.currentPage = 1
	          }
	        }) 
		},

		/**
		*删除表计信息
		*/
		DeleteMeterInfo(row){
			this.$confirm('确定要删除该表吗', '警告', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(()=>{
            	this.allLoading = true
				this.loadingTitle="拼命加载中"
				var that = this
	      	
	  			var params = {
	  				UserId:window.sessionStorage.getItem("id"),
	  				LogicAddr:row.LogicAddr,
	  				MeasureId:row.MeasureId,
	          		evalue:this.$encrypt()
	        	}

	        	console.log(this.api.baseUrl+this.api.DeleteMeterInfo)
	        	
	        	this.http.post(this.api.baseUrl+this.api.DeleteMeterInfo,params)
		        .then(result=>{
		          this.allLoading = false
		     
		          console.log('删除表计')
		           console.log(result)
		          if (result.status=="成功") {

		          	this.$message({
	            		type: 'success',
	           			message: '操作成功!'
	         		});

		          	this.queryMeterInfo()
		          }
		        }) 
            }).catch();
			
		},

		/**
		*下发档案
		*/
		setFileToGW(){
			this.allLoading = true
			var that = this
      	
  			var params = {
  				UserId:window.sessionStorage.getItem("id"),
  				RegionCode:window.sessionStorage.getItem("RegionCode"),
          		evalue:this.$encrypt()
        	}

        	console.log(this.api.baseUrl+this.api.SetMeterFilesByDataBaseToGW)
        	
        	this.http.post(this.api.baseUrl+this.api.SetMeterFilesByDataBaseToGW,params)
	        .then(result=>{
	       

	          	this.loadingTitle=`下发档案中,总数${result.Total},剩余${result.Last}`
	           if (result.Last != '0') {
	           		setTimeout(function(){
	           			//递归请求
	           			that.setFileToGW()
	           		},3000)

	           }else{
	           	// 完成下发
	           		this.allLoading = false

	           		this.$message({
            		type: 'success',
           			message: '档案已全部下发!'
         			});

	           		var failResult = result.fail
	           		if (typeof(failResult) != "undefined") {
	          			for (var i = 0; i < failResult.length; i++) {
	          				
	          				this.$notify({
				          		title: failResult[i].LogicAddr,
				          		message: failResult[i].Exception,
				          		type: 'error'
				       		})
	          			}

	          		}


	           }
	   

	           
	        }) 
		},

		/**
		*过滤显示的表格信息
		*/
		filterTableData(node){
			if (window.sessionStorage.getItem('menuName') == 'meterFiles') {
      			
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
		},
		// copyFifthRegionName(){
		// 	return this.singleImportForm.FifthRegionName
		// }
	},
	watch:{
		// 观察点击的树的内容发生改变
		treeNode(newVal){
			this.filterTableData(newVal)
		},
		// copyFifthRegionName(newVal){
		// 	console.log('aaa')
		// 	this.singleImportForm.HouseRegionName = ''
		// }
	},

	mounted(){
		var that = this

		this.isSuper = window.sessionStorage.getItem('isSuper')

		setTimeout(function(){
			that.queryMeterInfo()
		},500)
	}
}
</script>
<style scoped>
.el-table{
	margin-top: 10px;
}
.right{
	float: right;
}
.condition{
	overflow: hidden
}


</style>