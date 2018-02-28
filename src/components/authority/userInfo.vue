<!-- 这是客户信息维护 -->
<template>
	<div>
		<div>
			<span>状态选择</span>
			<el-select v-model="status" placeholder="请选择审核状态">
			    <el-option
			      v-for="item in statusSelect"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			</el-select>
			<el-button type="primary">查询</el-button>
		</div>
		<el-table
		    :data="tableData"
		    style="width: 100%">
		    <el-table-column type="expand">
		      <template slot-scope="props">
		        <el-form label-position="left" inline	 class="demo-table-expand" >
		          <el-form-item label="序号">
		            <span>{{ props.row.ID }}</span>
		          </el-form-item>
		          <el-form-item label="用户编号">
		            <span>{{ props.row.UserId }}</span>
		          </el-form-item>
		          <el-form-item label="用户名">
		            <span>{{ props.row.UserName }}</span>
		          </el-form-item>
		          <el-form-item label="姓名">
		            <span>{{ props.row.Name }}</span>
		          </el-form-item>

		          <el-form-item label="审核状态">
		            <span>{{ props.row.CheckFlg }}</span>
		          </el-form-item>
		          <el-form-item label="所属区域">
		            <span>{{ props.row.RegionLevel }}</span>
		          </el-form-item>
		          <el-form-item label="微信号">
		            <span>{{ props.row.WeiXinNo }}</span>
		          </el-form-item>
		          <el-form-item label="身份证号">
		            <span>{{ props.row.IdNum }}</span>
		       	  </el-form-item>
		          <el-form-item label="性别">
		            <span>{{ props.row.Sex }}</span>
		          </el-form-item>
		          <el-form-item label="固定电话">
		            <span>{{ props.row.Telephone }}</span>
		          </el-form-item>
		          <el-form-item label="手机号">
		            <span>{{ props.row.MobilePhone }}</span>
		          </el-form-item>
		          <el-form-item label="固定电话">
		            <span>{{ props.row.address }}</span>
		          </el-form-item>
		          <el-form-item label="联系地址">
		            <span>{{ props.row.Address }}</span>
		          </el-form-item><el-form-item label="客户类别">
		            <span>{{ props.row.CustomerTypeId }}</span>
		          </el-form-item>
		          <el-form-item label="银行卡号">
		            <span>{{ props.row.BankCardNum }}</span>
		          </el-form-item>
		          <el-form-item label="是否扣款用户">
		            <span>{{ props.row.ChargebackFlag }}</span>
		          </el-form-item>
		        </el-form>
		      </template>
		    </el-table-column>
		    <el-table-column
		      label="序号"
		      prop="ID">
		    </el-table-column>
		    <el-table-column
		      label="姓名"
		      prop="Name">
		    </el-table-column>
		    <el-table-column
		      label="绑定房间"
		      prop="RegionLevel">
		    </el-table-column>
		     <el-table-column label="审核状态">	
				<template slot-scope="scope">
	       			<span v-if="scope.row.CheckFlg == '0'">未审核</span>
	       			<span v-if="scope.row.CheckFlg == '1'">已审核</span>
     			</template>
	    	 </el-table-column>
	         <el-table-column label="操作">	
				<template slot-scope="scope" >
					<div v-if="scope.row.CheckFlg == '0'">
						<el-button @click="handleClick(scope.row)" type="text" size="small">审核</el-button>
	        			<el-button type="text" size="small">取消</el-button>
					</div>
					<div v-else>
						<el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
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
			// 状态选择列表
			statusSelect:[
			{
				label:'已审核',
				value:'已审核'
			},
			{
				label:'未审核',
				value:'未审核'
			},],
			status:'',
			// 表格信息
			tableData:[
			{
				ID:'1',//编号
				UserId:'111',//用户编号
				UserName:'kkk',//用户名
				Name:'大boss',//姓名
				CheckFlg:'1',//审核状态
				RegionLevel:'莲塘枫景/1栋/201',//所属管理区
				WeiXinNo:'',//微信号
				IdNum:'',//身份证编号
				Sex:'男',//性别
				Telephone:'070222222',//固定电话
				MobilePhone:'12345678900',//手机号
				Address:'XXXXX',//联系地址
				CustomerTypeId:'一般用户',//客户类别
				BankCardNum:'8888888888',//银行卡号
				ChargebackFlag:'否',//是否扣款用户
			},
			{
				ID:'2',//编号
				UserId:'111',//用户编号
				UserName:'kkk',//用户名
				Name:'大boss',//姓名
				CheckFlg:'0',//审核状态
				RegionLevel:'莲塘枫景/1栋/202',//所属管理区
				WeiXinNo:'',//微信号
				IdNum:'',//身份证编号
				Sex:'男',//性别
				Telephone:'070222222',//固定电话
				MobilePhone:'12345678900',//手机号
				Address:'XXXXX',//联系地址
				CustomerTypeId:'一般用户',//客户类别
				BankCardNum:'8888888888',//银行卡号
				ChargebackFlag:'否',//是否扣款用户
			}
			]
		}
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








