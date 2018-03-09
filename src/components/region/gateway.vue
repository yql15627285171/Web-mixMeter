<!-- 网关集中器资产管理 -->
<template>
	<div v-loading="allLoading" element-loading-text="拼命加载中">
		<div class="condition">
			
			<!-- <el-select v-model="logicAddr" placeholder="请选择逻辑地址">
			    <el-option
			      v-for="item in tableData"
			      :key="item.LogicAddr"
			      :label="item.LogicAddr"
			      :value="item.LogicAddr">
			    </el-option>
			</el-select>
			<el-button type="primary">查询</el-button> -->

			<div class="right">
				<input id="upload" type="file" @change="importExcel($event)"  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" style="display:none" />
				<el-button type="primary" @click="choseFile">一键添加</el-button>
				<!-- <el-button type="primary">导出</el-button> -->
			</div>
			
		</div>

		<!-- 弹出框,显示excel表格的内容 -->
		<el-dialog  :visible.sync="excelVisible">
			<div style="overflow:hidden">
				<span>要上传的excel表格的信息</span>
				<el-button type="primary" style="float:right" @click='sureUploadExcel'>上传</el-button>
			</div>
			<el-table 
				:data="excelData"
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

		<!-- 修改信息界面 -->
		<el-dialog title="修改信息" :visible.sync="changeDialogVisible">
			<el-form :model="changeForm">
		    <el-form-item label="SIM卡" :label-width="formLabelWidth">
		      <el-input v-model="changeForm.SIM" auto-complete="off" placeholder="SIM卡号"></el-input>
		    </el-form-item>
		    <el-form-item label="安装地址" :label-width="formLabelWidth">
		      <el-input v-model="changeForm.InstallAddr" auto-complete="off" placeholder="请输入安装地址"></el-input>
		    </el-form-item>
		    <el-form-item label="备注" :label-width="formLabelWidth">
		      <el-input v-model="changeForm.Memo" auto-complete="off" placeholder="请输入备注"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="changeDialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="sureChangeGateInfo">确 定</el-button>
		  </div>
		</el-dialog>


		<el-table
		    :data="showTableData"
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
	       			<span v-if="scope.row.UseStatus == '0'" style="color:red;">停用</span>
	       			<span v-if="scope.row.UseStatus == '1'" style="color:green;">运行</span>
     			</template>
	    	 </el-table-column>
	    	<!--  <el-table-column
		      	label="最后在线时间"
		      	prop="LastTime">
		   	 </el-table-column> -->
	         <el-table-column label="操作">	
				<template slot-scope="scope" >
					<div>
						<el-button @click="changeGateInfo(scope.row)" type="text" size="small">修改</el-button>
	        			<el-button type="text" size="small" @click="delGateInfo(scope.row)">删除</el-button>
					</div>	
     			</template>
	    	 </el-table-column>
		  </el-table>
		  <div class="block pagination">
		    <!-- <span class="demonstration">显示总数</span> -->
		    <el-pagination
		      @current-change="handleCurrentChange"
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
			// 菊花
			allLoading:false,

			// 修改框
			changeDialogVisible:false,
			formLabelWidth:'120px',
			changeForm:{
				SIM:'',
				InstallAddr:'',
				Memo:''
			},
			// 对话框是否显示
			excelVisible:false,
			excelHead:null,
			excelData:null,
			// 选择的逻辑地址
			logicAddr:'',
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
			tableData:[],//数据源
			showTableData:[],//显示在页面的数据

			changeRow:[],//记录点击要修改的行的所有信息
		}
	},
	methods:{
		/**
		*分页控制器的方法
		*/
      	handleCurrentChange(val) {
        	console.log(`当前页: ${val}`);
        	this.showTableData = this.tableData.slice((val-1)*10, val *10)
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
				this.excelVisible = true
				document.getElementById("upload").value=''

      		})
		},

		/**
		*获取社区网关信息
		*/
		getAllGWInfo(){
			this.allLoading = true
			var params = { 
  				RegionCode:window.sessionStorage.getItem('RegionCode'), 				
          		evalue:this.$encrypt()
        	}
        	console.log(this.api.baseUrl+this.api.QureyAllGWInfoByRegionCode)
        	console.log(params);
        	this.http.post(this.api.baseUrl+this.api.QureyAllGWInfoByRegionCode,params)
	        .then(res=>{
	          this.allLoading = false
	          var result= JSON.parse(res.data.replace(/<[^>]+>/g, "").replace(/[' '\r\n]/g, ""))
	          console.log('获取网关信息')
	           console.log(result)
	          if (result.status=="成功") {
	          	this.tableData = result.data
	          	this.showTableData = this.tableData.slice(0, 10)
	          }
	        }) 
		},

		/**
		*上传或者修改网关信息
		*/
		undateGateInfo(jsonVal){
			var that = this
			this.excelVisible = false
			this.changeDialogVisible =false
			this.allLoading = true
			var params = {
				UserId: window.sessionStorage.getItem('id'),
  				RegionCode:window.sessionStorage.getItem('RegionCode'),
  				jsonValue:JSON.stringify(jsonVal),
          		evalue:this.$encrypt()
        	}

        	console.log(this.api.baseUrl+this.api.InputGWInfo)
        	this.http.post(this.api.baseUrl+this.api.InputGWInfo,params)
	        .then(res=>{
	          this.allLoading = false
	          var result= JSON.parse(res.data.replace(/<[^>]+>/g, "").replace(/[' '\r\n]/g, ""))
	          console.log('上传文件')
	           console.log(result)
	          if (result.status=="成功") {
	          	this.updateTreeData()
	          	setTimeout(function(){
					that.getAllGWInfo()
				}, 500)
	          }
	        }) 
		},

		/**
		*确定上传
		*/
		sureUploadExcel(){
			console.log('确定上传')
			this.undateGateInfo(this.excelData)
		},

		/**
		*删除网关信息
		*/
		delGateInfo(row){
			console.log('开始删除')
			var that = this
			this.allLoading = true
			var params = {
				UserId: window.sessionStorage.getItem('id'),
  				LogicAddr:row.LogicAddr,
          		evalue:this.$encrypt()
        	}

        	console.log(this.api.baseUrl+this.api.DeleteGWInfo)
        	this.http.post(this.api.baseUrl+this.api.DeleteGWInfo,params)
	        .then(res=>{
	          this.allLoading = false
	          var result= JSON.parse(res.data.replace(/<[^>]+>/g, "").replace(/[' '\r\n]/g, ""))
	          console.log('删除成功')
	           console.log(result)
	          if (result.status=="成功") {
	          	this.updateTreeData()
	          	setTimeout(function(){
					that.getAllGWInfo()
				}, 500)
	          }else{
	          	alert(result.data)
	          }
	        })
		},

		// 弹出修改网关信息窗口
		changeGateInfo(row) {
        	this.changeDialogVisible = true

        	this.changeForm.SIM = row.SIM
        	this.changeForm.InstallAddr = row.InstallAddr
        	this.changeForm.Memo = row.Memo

        	this.changeRow = row
      	},

      	//确定修改网关信息
      	sureChangeGateInfo(){
      		
      		this.changeRow.SIM = this.changeForm.SIM
      		this.changeRow.InstallAddr = this.changeForm.InstallAddr
      		this.changeRow.Memo = this.changeForm.Memo
      		

      		this.undateGateInfo([this.changeRow])
      	},
		/**
		*更新树
		*/
		updateTreeData(){
			var that = this
			this.data.getTreeData({
	          succeed(res){
	            that.$store.dispatch('reloadTreeData',res)
	          }
	        })

		},

	},
	mounted(){
		var that = this
		setTimeout(function(){
			that.getAllGWInfo()
		}, 500)
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