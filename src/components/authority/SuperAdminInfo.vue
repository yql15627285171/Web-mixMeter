<!-- 管理员信息维护 -->
<template>
	<div v-loading="loading" element-loading-text="拼命加载中">
		<div class="condition">

			<el-select v-model.lazy="status" placeholder="请选择状态" @change="selectChange">
			    <el-option
			      v-for="item in statusSelect"
			      :key="item.value"
			      :label="item.label"
			      :value="item.label">
			    </el-option>
			</el-select>
			<el-button type="primary">查询</el-button>
			<div class="add">
				<el-button type="primary" @click="addDialogVisible = true">添加管理员</el-button>
			</div>

		</div>

		<!-- 添加管理员对话框 -->
		<el-dialog title="添加管理员" :visible.sync="addDialogVisible" >

		  <el-form :model="addForm" :rules="addFormRules" ref="addForm" label-width="100px" class="demo-ruleForm" >
			<!-- 用户名 -->
			  <el-form-item label="用户名" prop="userId">
			    <el-input v-model.trim="addForm.userId" placeholder="请输入用户名"></el-input>
			  </el-form-item>
			  <!-- 密码 -->
			  <el-form-item label="密码" prop="psd">
			    <el-input type="password" v-model.trim="addForm.psd"></el-input>
			  </el-form-item>
			  <el-form-item label="确认密码" prop="checkPsd">
			    <el-input type="password" v-model.trim="addForm.checkPsd"></el-input>
			  </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="addDialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="addAdminstor">确 定</el-button>
		  </div>
		</el-dialog>


		<!-- 修改管理员对话框 -->
		<el-dialog :title='changeTitle' :visible.sync="changeDialogVisible">
		  <el-form :model="changeForm">
			<el-form-item label="省" :label-width="formLabelWidth">
		      <!--<el-select v-model="changeForm.FirstRegionName" placeholder="请选择省份">-->
		        <!--<el-option v-for="item in FirstRegion"-->
		        <!--:label="item.name" :value="item.name"></el-option>-->
		      <!--</el-select>-->
        <el-input v-model.trim="changeForm.FirstRegionName" placeholder="请输入"></el-input>
			</el-form-item>
			<el-form-item label="市" :label-width="formLabelWidth">
		      <!--<el-select v-model="changeForm.SecondRegionName" placeholder="请选择市">-->
		        <!--<el-option v-for="item in SecondRegion"-->
		        <!--:label="item.name" :value="item.name"></el-option>-->
		      <!--</el-select>-->
        <el-input v-model.trim="changeForm.SecondRegionName" placeholder="请输入"></el-input>
		  	</el-form-item>
			<el-form-item label="区/县" :label-width="formLabelWidth">
		      <!--<el-select v-model="changeForm.ThirdRegionName" placeholder="请选择区/县">-->
		        <!--<el-option v-for="item in ThirdRegion"-->
		        <!--:label="item.name" :value="item.name"></el-option>-->
		      <!--</el-select>-->
        <el-input v-model.trim="changeForm.ThirdRegionName" placeholder="请输入"></el-input>
			</el-form-item>
			  <el-form-item label="所在社区" :label-width="formLabelWidth">
		      <el-input v-model="changeForm.FourthRegionName" placeholder="请输入社区名字"></el-input>
		    </el-form-item>

			  <el-form-item label="组名" :label-width="formLabelWidth">
		      <el-input v-model="changeForm.GroupId" placeholder="请输入组名编号"></el-input>
		    </el-form-item>

			  <el-form-item label="区域级别" :label-width="formLabelWidth">
		      <el-input v-model="changeForm.RegionLevel" placeholder="请输入区域级别"></el-input>
		    </el-form-item>

		    <el-form-item label="有效性" :label-width="formLabelWidth">
			    <el-switch v-model="changeForm.Effective">
			    </el-switch>
		    </el-form-item>

		  </el-form>
	      <div slot="footer" class="dialog-footer">
		    <el-button @click="changeDialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="sureChangeAdminInfo">确 定</el-button>
	  	  </div>
		</el-dialog>



		 <el-table
		    :data="showTableData"
		    :header-cell-class-name="tableheaderClassName"
		    :cell-class-name='tableCellName'
		    stripe
		    style="width: 100%;">
		    <el-table-column type="expand">
		      <template slot-scope="props">
		        <el-form label-position="left" inline class="demo-table-expand" >
		          <el-form-item  v-for="(item,index) in tableHead" v-if="index >=5" :label="item.label" >
		            <span>{{ props.row[item.id] }}</span>
		          </el-form-item>

		        </el-form>
		      </template>
		    </el-table-column>
		    <el-table-column
		    	v-for="(item,index) in tableHead"
		    	v-if="index <= 4"
		    	:prop="item.id"
		    	:label="item.label"
		    	:width='item.width'
		    	>
		    </el-table-column>

		     <!-- <el-table-column label="状态">
				<template slot-scope="scope">
	       			<span v-if="scope.row.ValidFlg == '1'" style="color:green;">有效</span>
	       			<span v-else style="color:red;">无效</span>
     			</template>
	    	 </el-table-column> --> -->

		     <el-table-column
		    	label="操作">
				<template slot-scope="scope">
	       			<el-button @click="changeAdminInfo(scope.row)" type="text" size="small">修改</el-button>
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
		var validatePass = (rule, value, callback) => {
			// value = value.trim()
			if (value === '') {
			  callback(new Error('请再次输入密码'));
			} else if (value !== this.addForm.psd) {
			  callback(new Error('两次输入密码不一致!'));
			} else {
			  callback();
			}
		};

		return{
			// 转圈
			loading:false,
			// 状态
			statusSelect:[
			{
				label:'全部',
				value:'全部'
			},
			{
				label:'有效',
				value:'有效'
			},
			{
				label:'无效',
				value:'无效'
			},],
			status:'全部',
			// 对话框的显示
			addDialogVisible:false,
			changeDialogVisible:false,
			changeTitle:'',//修改框的标题

			formLabelWidth:'120px',
			FirstRegion:[],//省
			SecondRegion:[],//市
			ThirdRegion:[],//区
			addForm:{
				userId:'',//用户编号
				psd:'',//密码
				checkPsd:'',//确认密码
			},
			addFormRules:{
				userId:[{ required: true, message: '用户名不能为空', trigger: 'blur' }],
	         	psd:[{required: true, message: '密码不能为空', trigger: 'blur'}],
	         	checkPsd: [{required:true, validator: validatePass, trigger: 'blur' }],
			},

			changeForm:{
				UserId:'',
				FirstRegionName:'',//一级菜单名
				SecondRegionName:'',//二级菜单名
				ThirdRegionName:'',//三级
				FourthRegionName:'',//四级
				GroupId:'',//用户组
				RegionLevel:'',//区域级别
				Effective:false,//是否有效
			},
			tableHead:[
			{
				label:'序号',
				id:'index',
				width:70
			},
			{
				label:'用户编号',
				id:'UserId',
			},
			{
				label:'联系电话',
				id:'MobilePhone'
			},
			{
				label:'所属社区',
				id:'FourthRegionName'
			},
			{
				label:'状态',
				id:'ValidFlg'
			},
			{
				label:'省',
				id:'FirstRegionName',
			},
			{
				label:'市',
				id:'SecondRegionName',
			},
			{
				label:'区/县',
				id:'ThirdRegionName'
			},
			{
				label:'组编号',
				id:'GroupId'
			},
			{
				label:'区域级别',
				id:'RegionLevel'
			},
			],
			tableData:[],//所有数据源

			partOfTableData:[],//可以显示的数据

			showTableData:[],//显示在当前页的数据

			currentPage:1,//分页控制器的当前页
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
			if (columnIndex == 5) {
				var status = this.showTableData[rowIndex][column.property]
				if (status == '有效' || status == '1') {
					return 'normal'
				}else if (status == '无效' || status == '0') {
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
      	*选择改变
      	*/
      	selectChange(val){

      		if (val == "全部") {
      			this.partOfTableData = this.tableData
      		}else if (val == "有效") {

      			this.partOfTableData = this.tableData.filter(element=>{
      				return (element.ValidFlg == "1" || element.ValidFlg == "有效")
      			});
      		}else if(val == "无效"){
      			this.partOfTableData = this.tableData.filter(element=>{
      				return (element.ValidFlg == "0" || element.ValidFlg == null ||element.ValidFlg == "无效")
      			});
      		}

      		for (var i = 0; i < this.partOfTableData.length; i++) {
      				this.partOfTableData[i].index = (i+1).toString()
      			}
      			this.showTableData = this.partOfTableData.slice(0, 10)

      	},
      	/**
      	*省名请求
      	*/
      	FirstRegionRequest(){
      		var params = {
				parentid:0,

			}

			this.http.get(this.api.remote_area_url,params).then(res=>{
				console.log('省')
				this.FirstRegion = res.data.result
			})
      	},
      	/**
      	*市名请求
      	*/
      	SecondRegionRequest(id){
      		var params = {
				parentid:id,
			}

			this.http.get(this.api.remote_area_url,params).then(res=>{
				this.SecondRegion = res.data.result
			})
      	},
      	/**
      	*区名请求
      	*/
      	ThirdRegionRequest(id){
      		var params = {
				parentid:id,
			}

			this.http.get(this.api.remote_area_url,params).then(res=>{
				this.ThirdRegion = res.data.result
			})
      	},

      	/**
      	*添加管理员
      	*/
      	addAdminstor(){

      		this.loading = true
      		this.addDialogVisible = false
      		if (this.addForm.userId !=''&&this.addForm.psd !=''&&this.addForm.psd==this.addForm.checkPsd) {
      			var params = {
      				UserId:this.addForm.userId,
      				UserPwd:this.$encryptPsd(this.addForm.psd),
	          		time:this.dataUtil.formatTime1(new Date())
				}

			var encryptParams = {
                evalue:this.$encrypt(JSON.stringify(params))
              }

            console.log(this.$encrypt(JSON.stringify(params)))
	        this.http.post(this.api.baseUrl+this.api.AddNewCommmunity,encryptParams)
		    .then(result=>{
		        console.log('添加管理员')
		         this.loading = false

	           console.log(result)
	           if (result.status=="成功") {

	          	this.$message({
        			type: 'success',
       			 	message: '操作成功!'
     			 });

	            this.getAllAdminInfo()
	          }else{
	          	alert(result.data)
	          }
	        })

      		}


      	},


      	/**
      	*修改管理员信息
      	*/
      	changeAdminInfo(row){

      		this.changeDialogVisible = true
      		var that = this
      		// console.log(row);
      		this.changeForm.UserId = row.UserId
        	this.changeForm.FirstRegionName = row.FirstRegionName
        	setTimeout(function(){that.changeForm.SecondRegionName = row.SecondRegionName},'100')
        	setTimeout(function(){that.changeForm.ThirdRegionName = row.ThirdRegionName},'100')
        	setTimeout(function(){that.changeForm.FourthRegionName = row.FourthRegionName},'100')


        	this.changeForm.GroupId = row.GroupId
        	this.changeForm.RegionLevel = row.RegionLevel
        	if (row.ValidFlg == '1' || row.ValidFlg=='有效') {
        		// statement
        		this.changeForm.Effective = true
        	}else {
        		this.changeForm.Effective = false
        	}

      	},

      	sureChangeAdminInfo(){
      		console.log('开始修改')
      		this.changeDialogVisible = false
        	this.loading = true
        	var that= this
	      	var params = {
	      		AdminId:window.sessionStorage.getItem("id"),
	      		UserId:this.changeForm.UserId,
	      		FirstRegionName:this.changeForm.FirstRegionName,
	      		SecondRegionName:this.changeForm.SecondRegionName,
	      		ThirdRegionName:this.changeForm.ThirdRegionName,
	      		FourthRegionName:this.changeForm.FourthRegionName,
	      		GroupId:this.changeForm.GroupId,
	      		RegionLevel:this.changeForm.RegionLevel,
	      		ValidFlg:this.changeForm.Effective ? '1':'0',
	        	time:this.dataUtil.formatTime1(new Date())
				}

			var encryptParams = {
                evalue:this.$encrypt(JSON.stringify(params))
              }

            console.log(this.$encrypt(JSON.stringify(params)))


	        this.http.post(this.api.baseUrl+this.api.UpdateCommmunity,encryptParams)
	        .then(result=>{
	          this.loading = false

	           console.log(result)
	          if (result.status=="成功") {

            	this.$message({
        			type: 'success',
       			 	message: '操作成功!'
     			 });

	            setTimeout(function(){
					that.getAllAdminInfo()
				}, 500)
	            this.updateTreeData()
	          }else{
	          	alert(result.data)
	          }
	        })
      	},
      	/**
      	*获取所有社区管理员信息
      	*/
      	getAllAdminInfo(){
      		console.log('请求管理员信息')
      		this.loading = true
	      	var params = {
	          time:this.dataUtil.formatTime1(new Date())
	        }

	        var encryptParams = {
	          evalue:this.$encrypt(JSON.stringify(params))
	        }

	        console.log(this.$encrypt(JSON.stringify(params)))


	        this.http.post(this.api.baseUrl+this.api.QureyAllAdminInfo,encryptParams)
	        .then(result=>{
	          this.loading = false

	           console.log(result)
	          if (result.status=="成功") {
	            this.tableData = result.data
	            this.partOfTableData = this.tableData
	            // 显示当前页的数据
	            this.showTableData = this.partOfTableData.slice(0, 10)

	            this.status = '全部'

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

		}
	},
	computed:{
		// province:function(){
		// 	this.SecondRegion = []
		// 	this.ThirdRegion = []
		// 	this.changeForm.SecondRegionName = ""
		// 	this.changeForm.ThirdRegionName = ""
		// 	this.changeForm.FourthRegionName = ""
		// 	return this.changeForm.FirstRegionName
		// },
		// city:function(){
		// 	this.ThirdRegion = []
		// 	this.changeForm.ThirdRegionName = ""
		// 	this.changeForm.FourthRegionName = ""
		// 	return this.changeForm.SecondRegionName
		// },
		// town:function(){
		// 	this.changeForm.FourthRegionName = ""
		// 	return this.changeForm.ThirdRegionName
		// }
	},
	watch:{
		// province:function(newvalue){
		// 	// 清空子列表
        //
		// 	var specialArea = false
        //
		// 	if (newvalue == "北京" || newvalue == "上海" || newvalue == "天津" || newvalue == "重庆") {
		// 		this.changeForm.SecondRegionName = newvalue
		// 		var tempPro = {
		// 			name:newvalue
		// 		}
		// 		this.SecondRegion.push(tempPro)
		// 		specialArea = true
		// 	}
        //
		// 	for (var i = 0; i < this.FirstRegion.length; i++) {
		// 		if (newvalue == this.FirstRegion[i].name) {
		// 			if (specialArea) {
		// 				this.ThirdRegionRequest(this.FirstRegion[i].id)
		// 			}else {
		// 				this.SecondRegionRequest(this.FirstRegion[i].id)
		// 			}
        //
		// 			return
		// 		}
		// 	}
		// },
		// city:function(newvalue){
        //
		// 	if (newvalue == "北京" || newvalue == "上海" || newvalue == "天津" || newvalue == "重庆") {
		// 		return
		// 	}
		// 	for (var i = 0; i < this.SecondRegion.length; i++) {
		// 		if (newvalue == this.SecondRegion[i].name) {
		// 			// statement
		// 			this.ThirdRegionRequest(this.SecondRegion[i].id)
		// 			return
		// 		}
		// 	}
		// },
		// town:function(newvalue){},
	},
	mounted(){
		console.log('请求省')
		if (this.FirstRegion.length==0) {
			// setTimeout(()=>{
				// this.FirstRegionRequest()
			// },1000)
		}
		// 获取所有社区管理员信息

		var that = this
		// setTimeout(function(){
			that.getAllAdminInfo()
		// }, 500)
	}
}
</script>
<style scoped>
.el-table{
	margin-top: 10px;
}
.add{
	float: right;
}
.condition{
	overflow: hidden
}


</style>



