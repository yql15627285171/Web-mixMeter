<!-- 计量表档案管理 -->
<template>
	<div v-loading="allLoading" :element-loading-text="loadingTitle">
		<div class="condition">
			
			<div class="right">
				<input id="upload" type="file" @change="importExcel($event)"  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" style="display:none" />
				<el-button type="primary" @click="choseFile">一键添加</el-button>
				<el-button type="primary" @click="setFileToGW">档案下发</el-button>
			</div>
			
		</div>
		
		<!-- excel表格导入对话框 -->
		<el-dialog  :visible.sync="excelVisible">
			<div style="overflow:hidden">
				<el-button type="primary" style="float:right" @click="sureUpload">上传</el-button>
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
		    	width='100'
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
 -->	         <el-table-column label="操作">	
				<template slot-scope="scope" >
					<div>
						<el-button
							v-if= "isSuper == '1' "
							@click="changeClick(scope.row)" 
							type="text" 
							size="small">修改</el-button>
	        			<el-button type="text" size="small" @click="deleteGateInfo(scope.row)">删除</el-button>
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
			changeRow:{},//要修改的行的信息
			// 表格信息
			tableHead:[
			{
				label:'序号',
				id:'index',
				width:50
			},
			{
				label:'表地址',
				id:'MeterAddr'
			},
			{
				label:'所属栋数',
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
      		this.changeDialogVisible = true,

      		this.changeRow = row

      		this.changeForm.BigClassNo = row.BigClassNo

      		this.changeForm.SmallClassNo = row.SmallClassNo

      		row.RunStatus ? this.changeForm.RunStatus = true : this.changeForm.RunStatus = false

      	},

      	/**
      	*确定上传修改
      	*/
      	sureChangeInfo(){
      		this.changeDialogVisible = false,

      		this.changeRow.BigClassNo = this.changeForm.BigClassNo
      		this.changeRow.SmallClassNo = this.changeForm.SmallClassNo

      		this.changeForm.RunStatus ? this.changeRow.RunStatus = '1' : this.changeRow.RunStatus = '0'

      		this.updateInfo([this.changeRow])

      	},

		/**
		*表格选中的行发生改变
		*/
		// handleSelectionChange(val){
		// 	console.log(val)
		// },

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
	        .then(res=>{
	          this.allLoading = false
	          var result= JSON.parse(res.data.replace(/<[^>]+>/g, "").replace(/[' '\r\n]/g, ""))
	          
	           console.log(result)
	          if (result.status=="成功") {

	          	this.$message({
            		type: 'success',
           			message: '操作成功!'
         		});
	           
	
	            this.queryMeterInfo()

	          }else{

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
	        .then(res=>{
	          this.allLoading = false
	          var result= JSON.parse(res.data.replace(/<[^>]+>/g, "").replace(/[' '\r\n]/g, ""))
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
		*删除网关信息
		*/
		deleteGateInfo(row){
			this.allLoading = true
			this.loadingTitle="拼命加载中"
			var that = this
      	
  			var params = {
  				UserId:window.sessionStorage.getItem("id"),
  				LogicAddr:row.LogicAddr,
  				MeterAddr:row.MeterAddr, 
  				Seq:row.Seq,
          		evalue:this.$encrypt()
        	}

        	console.log(this.api.baseUrl+this.api.DeleteMeterInfo)
        	
        	this.http.post(this.api.baseUrl+this.api.DeleteMeterInfo,params)
	        .then(res=>{
	          this.allLoading = false
	          var result= JSON.parse(res.data.replace(/<[^>]+>/g, "").replace(/[' '\r\n]/g, ""))
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
	        .then(res=>{
	       
	          var result= JSON.parse(res.data.replace(/<[^>]+>/g, "").replace(/[' '\r\n]/g, ""))     
	           console.log(result)
	          

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
		}
	},
	watch:{
		// 观察点击的树的内容发生改变
		treeNode(newVal){
			this.filterTableData(newVal)
		}
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