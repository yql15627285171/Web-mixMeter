<!--财务对账  -->
<template>
	<div>
		<div class="condition">
			<el-select v-model.lazy="name1" placeholder="支付方式" clearable>
			    <el-option
			      v-for="item in tableData"
			      v-if="item.name3 != '' "
			      :label="item.name3"
			      :value="item.name3">
			    </el-option>
			</el-select>
			<el-select v-model.lazy="name2" placeholder="审核状态" clearable>
			    <el-option
			      v-for="item in tableData"
			      v-if="item.name6 != '' "
			      :label="item.name6"
			      :value="item.name6">
			    </el-option>
			</el-select>
			<el-select v-model.lazy="name3" placeholder="缴费类型" clearable>
			    <el-option
			      v-for="item in tableData"
			      v-if="item.name2 != '' "
			      :label="item.name2"
			      :value="item.name2">
			    </el-option>
			</el-select>
			<el-button type="primary">查询</el-button>
			<div class="right">
				<el-button type="primary">导出表格</el-button>
			</div>
		</div>
		<el-table
		    :data="showTableData"
		    :header-cell-class-name="tableheaderClassName"
		    :cell-class-name='tableCellName'
		    style="width: 100%">
		    <el-table-column type="expand">
		      <template slot-scope="props">
		        <el-form label-position="left" inline class="demo-table-expand" >
		          <el-form-item  v-for="(item,index) in tableHead" v-if="index > 7" :label="item.label" >
		            <span>{{ props.row[item.id] }}</span>
		          </el-form-item>
		     
		        </el-form>
		      </template>
		    </el-table-column>

		    <el-table-column
		      v-for="(item,index) in tableHead"
		      v-if='index < 7'
		      :label="item.label"
		      :prop="item.id"
		      :width="item.width"
		      >
		    </el-table-column>

		     <el-table-column 
		    	label="操作">	
				<template slot-scope="scope">
	       			<el-button @click="changeAdminInfo(scope.row)" type="text" size="small">审核</el-button>
     			</template>
		    </el-table-column>

		  </el-table>

		  <div class="block pagination">
		    <el-pagination
		      @current-change="handleCurrentChange"
		      :current-page.sync="currentPage"
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
			currentPage:1,
			name1:'',
			name2:'',
			name3:'',
			tableData:[
			{
				index:'1',
				name1:'',
				name2:'充值',
				name3:'现金',
				name4:'',
				name5:'',
				name6:'未审核',
				name7:'',
				name8:'',
				name9:'',
				name10:''
		
			},
			{
				index:'2',
				name1:'',
				name2:'退费',
				name3:'网络支付',
				name4:'',
				name5:'',
				name6:'审核',
				name7:'',
				name8:'',
				name9:'',
				name10:''
			}],//所有数据源
			areaTableData:[],//通过楼层筛选过后的数据
			partOfTableData:[],//通过条件筛选过后的数据
			showTableData:[],//显示的数据
			tableHead:[
			{
				label:'序号',
				id:'index',
				width:50
			},
			{
				label:'房间',
				id:'name1',
			},
			{
				label:'缴费类型',
				id:'name2',
			},
			{
				label:'支付方式',
				id:'name3',
			},
			{
				label:'金额',
				id:'name4',
			},
			{
				label:'到账金额',
				id:'name5',
			},
			{
				label:'审核状态',
				id:'name6',
			},
			{
				label:'订单信息',
				id:'name6',
			},
			{
				label:'缴费单号',
				id:'name7',
			},
			{
				label:'缴费时间',
				id:'name8',
			},
			{
				label:'审核人',
				id:'name9'
			},
			{
				label:'审核时间',
				id:'name10'
			}
			],
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
			if (columnIndex == 7) {
				var status = this.showTableData[rowIndex][column.property]
				if (status == '未审核') {
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
        	console.log(`当前页: ${val}`);
        	this.showTableData = this.partOfTableData.slice((val-1)*10, val *10)
      	},

	},
	mounted(){
		this.partOfTableData = this.tableData
		this.showTableData = this.partOfTableData.slice(0,10)
	}
}	
</script>
<style scoped>
.right{
	display: inline-block;
	float: right;
}
.el-table{
	margin-top: 10px;
}
.condition{
	overflow: hidden;
}
.el-select{
	width: 130px;
}
</style>