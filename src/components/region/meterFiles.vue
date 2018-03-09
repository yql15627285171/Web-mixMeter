<!-- 计量表档案管理 -->
<template>
	<div v-loading="allLoading" element-loading-text="拼命加载中">
		<div class="condition">
			
			<!-- <el-select v-model="logicAddr" placeholder="集中器地址">
			    <el-option
			      v-for="item in tableData"
			      :label="item.LogicAddr"
			      :value="item.LogicAddr">
			    </el-option>
			</el-select>
			<el-button type="primary">查询</el-button> -->
			
			<div class="right">
				<input id="upload" type="file" @change="importExcel($event)"  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" style="display:none" />
				<el-button type="primary" @click="choseFile">一键添加</el-button>
				<el-button type="primary">档案下发</el-button>
			</div>
			
		</div>
		
		<!-- 对话框 -->
		<el-dialog  :visible.sync="excelVisible">
			<div style="overflow:hidden">
				<el-button type="primary" style="float:right" @click="sureUpload">上传</el-button>
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
		    	width='100'
		    	>		
		    </el-table-column>
				
			</el-table>
		</el-dialog>
		<!-- 表格 -->
			<el-table
			
		    :data="tableData"
		    stripe
		    style="width: 100%"
		    @selection-change="handleSelectionChange">
		    <el-table-column
		      type="selection"
		      width="55">
		    </el-table-column>
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
		      label="序号"
		      prop="index"
		      width="50">
		    </el-table-column>
		    <el-table-column
		      label="表地址"
		      prop="MeterAddr">
		    </el-table-column>
		    <el-table-column
		      label="所属房间"
		      prop="HouseRegioCode">
		    </el-table-column>
		    <el-table-column label="电表类型">	
				<template slot-scope="scope">
	       			<span v-if="scope.row.MeterKindId == '1'" >电表</span>
	       			<span v-if="scope.row.MeterKindId == '2'" >水表</span>
	       			<span v-if="scope.row.MeterKindId == '3'" >气表</span>
	       			<span v-if="scope.row.MeterKindId == '4'" >热表</span>
     			</template>
	    	 </el-table-column>
		     <el-table-column label="运行状态">	
				<template slot-scope="scope">
	       			<span v-if="scope.row.RunStatus == '0'" style="color:red">停用</span>
	       			<span v-if="scope.row.RunStatus == '1'" style="color:green">运行</span>
     			</template>
	    	 </el-table-column>
	         <el-table-column label="操作">	
				<template slot-scope="scope" >
					<div>
						<el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
	        			<el-button type="text" size="small">删除</el-button>
					</div>	
     			</template>
	    	 </el-table-column>
		  </el-table>
	</div>
</template>
<script>
export default{
	data(){
		return{
			// 菊花
			allLoading:false,
			logicAddr:'',
			// 对话框表格信息
			excelHead:null,
			excelData:null,
			excelVisible:false,
			// 表格信息
			tableHead:[
			{
				label:'序号',
				id:'index'
			},
			{
				label:'表地址',
				id:'MeterAddr'
			},
			{
				label:'所属房间',
				id:'HouseRegioCode'
			},
			{
				label:'所属集中器',
				id:'LogicAddr'
			},
			{
				// 1 电表 2 水表 3 气表 4 热表
				label:'表计类型',
				id:'MeterKindId'
			},
			{
				label:'运行状态',
				id:'RunStatus'
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
			{
				label:'阶梯单价个数',
				id:'LadderNum'
			},
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
			{
				label:'是否总表',
				id:'GateMeterFlg',
			},
			{
				label:'总表所属区域级别',
				id:'RegionLevel'
			},
			{
				label:'总表所属区域编码',
				id:'RegionCode'
			},
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
			tableData:[
			{
				index:'1',
				MeterAddr:'23344',
				HouseRegioCode:'XXXXXX',
				LogicAddr:'192.169.0.1',
				RunStatus:'1',
				MeterKindId:'1'
			},
			{
				index:'2',
				MeterAddr:'66644',
				HouseRegioCode:'XXXXXX',
				LogicAddr:'192.169.0.2',
				RunStatus:'0',
				MeterKindId:'1'
			}]
		}
	},
	methods:{
		/**
		*表格选中的行发生改变
		*/
		handleSelectionChange(val){
			console.log(val)
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
	          console.log('添加表计')
	           console.log(result)
	          if (result.status=="成功") {
	          	alert('添加成功')
	            // 更新树
	            this.updateTreeData()
	          }
	        }) 	
		},

		/**
		*查询表计信息
		*/
		queryMeterInfo(){

			this.allLoading = true
			var that = this
      	
  			var params = { 
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
	          
	          }
	        }) 
		}
	},
	mounted(){
		var that = this
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