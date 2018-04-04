<!-- 网关控制 -->
<!-- 电表 -->
<template>
	<div v-loading="loading" element-loading-text="拼命加载中" style="padding-left:100px">
		<div class="info">
			<h1 class="title">基本信息</h1>
			<div class="infoContent">
				<span>逻辑地址：{{gateInfo.LogicAddr}}</span>
				<span>资产编号：{{gateInfo.ConAssetsCode}}</span>
				<span>安装地址：{{gateInfo.InstallAddr}}</span>
				<span>安装时间：{{gateInfo.InstallTime}}</span>
				<span>软件版本：{{gateInfo.SoftVer}}</span>
				<span>硬件版本：{{gateInfo.HardVer}}</span>
				<span>厂家名称：{{gateInfo.FactoryName}}</span>
				<span>备注信息：{{gateInfo.Memo}}</span>
			</div>
		</div>
		<div class="status">
			<h1 class="title">基本状态：</h1>
			<div class="statusContent">
				<div>
					<span>时钟：</span>
				 	<!-- <el-date-picker
				      v-model.trim="clock"
				      type="datetime"
				      placeholder="时钟设置">
				    </el-date-picker> -->
				    <el-input v-model.trim="clock" auto-complete="off"></el-input>
				</div>
				<div>
					<span>心跳：</span>
					<el-input v-model.trim="heartTime" auto-complete="off"></el-input>
				</div>
				
			</div>
		</div>
		<div class="operation">
			<h1 class="title">基本操作：</h1>
			<div class="operationContent">
				<div class="ope">
					<span>时间操作：</span>
					<div @click="getGWTime">
						<i class="el-icon-edit-outline"></i>
						<span>抄时钟</span>
					</div>
					<div @click="setGWTime">
						<i class="el-icon-edit-outline"></i>
						<span>设时钟</span>
					</div>
					
				</div>
				<div class="ope">
					<span>心跳操作：</span>
					<div @click="getWGHeartTime">
						<i class="el-icon-edit-outline"></i>
						<span>读心跳</span>
					</div>
					<div @click="setWGHeartTime">
						<i class="el-icon-edit-outline"></i>
						<span>设心跳</span>
					</div>
					
				</div>
				<div class="ope special">
					<span>复位操作：</span>
					<div @click="resetGW('F1')">
						<i class="el-icon-edit-outline"></i>
						<span>硬件初始化</span>
					</div>
					
					<div @click="resetGW('F2')">
						<i class="el-icon-edit-outline"></i>
						<span>数据区初始化</span>
					</div>
					
					<div @click="resetGW('F4')">
						<i class="el-icon-edit-outline"></i>
						<span>参数及数据区初始化</span>
					</div>
					
					<div @click="resetGW('F3')">
						<i class="el-icon-edit-outline"></i>
						<span>恢复至出厂</span>
					</div>
					
				</div>
				<div class="ope">
					<span>档案操作：</span>
					<div>
						<i class="el-icon-edit-outline"></i>
						<span>清除</span>
					</div>
						
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default{
	data(){
		return{
			
			loading:false,//菊花

			dataSource:[],//数据源

			gateInfo:{},//要显示的网关的信息

			clock:'',//时钟

			heartTime:'',//心跳

		}
	},
	methods:{
		/**
		*为表格的各部分命名
		*/
		 tableheaderClassName({ row, rowIndex }) {
          return "table-head-th";
        },

        
		/**
		*获取网关信息作为数据源
		*/
		getGateInfo(){
			this.loading = true
			var params = { 
  				RegionCode:window.sessionStorage.getItem('RegionCode'), 				
          		evalue:this.$encrypt()
        	}
        	console.log(this.api.baseUrl+this.api.QureyAllGWInfoByRegionCode)
        	console.log(params);
        	this.http.post(this.api.baseUrl+this.api.QureyAllGWInfoByRegionCode,params)
	        .then(result=>{

	          this.loading = false


	          console.log('获取网关信息')
	           console.log(result)
	          if (result.status=="成功") {
	          		if (result.data.length !=0) {
	          			this.dataSource = result.data 
	          			this.gateInfo = result.data[0] 
	          		}
	          			
	          	
	          	
	          }
	        }) 
		},

		/**
      	*数据源条件筛选
      	*/
      	filterTableData(node){
      		if (window.sessionStorage.getItem('menuName') == 'GateWayControl') {
      			if (node.level == 'GW') {
      				
      				var temp = this.dataSource.filter(element=>{
      					return (element.LogicAddr == node.label)
      				});
      				 this.gateInfo = temp[0]
      			}
      			
      			
      		}
      	},

      	/**
      	*集中器复位
      	*/
      	resetGW(type){
      		// console.log(type)
      		 this.$confirm('此操作有风险, 是否继续?', '提示', {
	          	confirmButtonText: '确定',
	          	cancelButtonText: '取消',
	          	type: 'warning'
	         }).then(() => {
	          	this.loading = true
				var params = {
					UserId: window.sessionStorage.getItem('id'),
	  		 		LogicAddr:this.gateInfo.LogicAddr, 	
	  				// LogicAddr:'01010876',
	  				resetType:type,			
	          		evalue:this.$encrypt()
	        	}
	        	console.log(this.api.baseUrl+this.api.ResetGW)
	        	console.log(params);
	        	this.http.post(this.api.baseUrl+this.api.ResetGW,params)
		        .then(result=>{
		          this.loading = false
		 
		          console.log('复位')
		           console.log(result)
		          if (result.status=="成功") {
		          	// this.clock = result.data
		          	
		          	this.$message({
            			type: 'success',
           			 	message: '复位成功!'
         			 });
		          }else{
		          	this.$message({
	          			showClose: true,
	          			message: result.data,
	          			type: 'error'
        			});
		          }

		        })
	         }).catch(() => {
	          	this.$message({
	            	type: 'info',
	            	message: '已取取消操作'
	          	});          
	         });

  
      	},

		
      	/**
      	*抄时钟
      	*/
      	getGWTime(){
      		this.loading = true
      		
			var params = {
				UserId: window.sessionStorage.getItem('id'),
  		 		LogicAddr:this.gateInfo.LogicAddr, 	
  				// LogicAddr:'01010876',			
          		evalue:this.$encrypt()
        	}
        	console.log(this.api.baseUrl+this.api.GetGWTime)
        	console.log(params);
        	this.http.post(this.api.baseUrl+this.api.GetGWTime,params)
	        .then(result=>{
	          this.loading = false
	         
	          console.log('获取时钟')
	           console.log(result)
	          if (result.status=="成功") {

	          	this.clock = result.data

	          	this.$message({
            			type: 'success',
           			 	message: '获取成功!'
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
      	*设置时钟
      	*/
      	setGWTime(){
      		this.loading = true
			var params = {
				UserId: window.sessionStorage.getItem('id'),
  				LogicAddr:this.gateInfo.LogicAddr, 	
  				// LogicAddr:'01010876',			
          		evalue:this.$encrypt()
        	}
        	console.log(this.api.baseUrl+this.api.SetGWTime)
        	this.http.post(this.api.baseUrl+this.api.SetGWTime,params)
	        .then(result=>{
	          this.loading = false
	      
	          console.log('设置时钟')
	           console.log(result)
	          if (result.status=="成功") {
	          	

	          	this.$message({
            			type: 'success',
           			 	message: '设置成功!'
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
      	*读心跳时间
      	*/
      	getWGHeartTime(){
      		this.loading = true
			var params = {
				UserId: window.sessionStorage.getItem('id'),
  				LogicAddr:this.gateInfo.LogicAddr, 	
  				// LogicAddr:'01010876',			
          		evalue:this.$encrypt()
        	}
        	
        
        	this.http.post(this.api.baseUrl+this.api.GetGWHeartTime,params)
	        .then(result=>{
	          this.loading = false
	         
	          console.log('获取心跳')
	           console.log(result)
	          if (result.status=="成功") {
	          	this.heartTime = result.data

	          	this.$message({
            			type: 'success',
           			 	message: '读取成功!'
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
      	*设心跳时间
      	*/
      	setWGHeartTime(){
      		this.loading = true
			var params = {
				UserId: window.sessionStorage.getItem('id'),
  				LogicAddr:this.gateInfo.LogicAddr, 	
  				// LogicAddr:'01010876',
  				time:this.heartTime,			
          		evalue:this.$encrypt()
        	}
        	
        	this.http.post(this.api.baseUrl+this.api.SetGWHeartTime,params)
	        .then(result=>{
	          this.loading = false
	          // var result= JSON.parse(res.data.replace(/<[^>]+>/g, ""))
	          console.log('设置心跳')
	           console.log(result)
	          if (result.status=="成功") {
	          	

	          	this.$message({
            			type: 'success',
           			 	message: '设置成功!'
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
	mounted(){
		var that = this
		// 获取社区网关信息
		setTimeout(function(){
			that.getGateInfo()
		},500) 
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
	}
}
</script>
<style scoped>
.title{
	color:#409EFF;
	font-size: 16px;
}

/*基本信息样式*/
.infoContent{
	display: flex;
	flex-wrap: wrap;
	padding-left: 30px;
	margin: 20px 0;

}

.infoContent span{
	width: 40%;
	padding: 10px 0;
}

/*基本状态*/
.statusContent{
	padding-left: 30px;
	margin: 20px 0;
}
.statusContent div{
	display:inline-block;
	width: 60%;
	padding: 10px 0;
	color: red;
}

.el-input{
	width: 200px;
}

/*基本操作*/
.operationContent{
	padding-left: 30px;
	margin: 20px 0;
}

.special div{
	margin-right: 15px;
}


.ope{
	padding-top: 10px;
}

.ope div{
	display: inline-block;
	cursor: pointer;
	min-width: 80px;
}

</style>










