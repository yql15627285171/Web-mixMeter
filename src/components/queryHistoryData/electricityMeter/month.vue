<!-- 月冻结 -->
<template>
	<div v-loading="loading" element-loading-text="拼命加载中">
		<div class="condition">
			<div class="block left month">
			    <el-date-picker
			      v-model="startMonth"
			      type="month"
			      placeholder="开始月份"
			      value-format='yyyy-MM'>
			    </el-date-picker>

			    <span>至</span>

			    <el-date-picker
			      v-model="endMonth"
			      type="month"
			      placeholder="结束月份"
			      value-format='yyyy-MM'>
			    </el-date-picker>
	  		</div>

	  		<el-button type="primary" style="margin-left:20px;" @click='checkFreezingData'>查询</el-button>
		</div>

		<div class="monthTable">
			<el-table
		    :data="showTableData"
		    :header-cell-class-name="tableheaderClassName"
		    stripe
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
		    v-if="index <= 7"
		      :label="item.label"
		      :prop="item.id"
		      :width="item.width"
		      >
		    </el-table-column>

		  </el-table>
		</div>



		  <div class="block pagination">
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
			loading:false,
			currentPage:1,
			startMonth:this.dataUtil.lastMonth(),
			endMonth:this.dataUtil.thisMonth(),
			tableHead:[
			{
				label:'序号',
				id:'index',
				width:70
			},
			{
				label:'房间信息',
				id:'FifthHouseRegionName',
			},
			{
				label:'月结时间',
				id:'FreezeMonth',
			},
			{
				label:'月用电总量',
				id:'MonthPowerTotal',
			},
			{
				label:'结算日时间',
				id:'FreezeDate',
			},
			{
				label:'结算日总值',
				id:'FreezeTotal',
			},
			{
				label:'结算日时间',
				id:'LastFreezeDate',
			},
			{
				label:'上结算日总值',
				id:'LastFreezeTotal',
			},
			{
				label:'集中器地址',
				id:'LogicAddr',
			},
			{
				label:'表计地址',
				id:'MeterAddr',
			},
			{
				label:'结算日值_尖',
				id:'Freeze1',
			},
			{
				label:'结算日值_峰',
				id:'Freeze2',
			},
			{
				label:'结算日值_平',
				id:'Freeze3',
			},
			{
				label:'结算日值_谷',
				id:'Freeze4',
			},
			{
				label:'上结算日值_尖',
				id:'LastFreeze1',
			},
			{
				label:'上结算日值_峰',
				id:'LastFreeze2',
			},
			{
				label:'上结算日值_平',
				id:'LastFreeze3',
			},
			{
				label:'上结算日值_谷',
				id:'LastFreeze4',
			},
			{
				label:'月用电量_尖',
				id:'MonthPower1',
			},
			{
				label:'月用电量_峰',
				id:'MonthPower2',
			},
			{
				label:'月用电量_平',
				id:'MonthPower3',
			},
			{
				label:'月用电量_谷',
				id:'MonthPower4',
			},],

			tableData:[],
			partOfTableData:[],
			showTableData:[],
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
		*分页控制器的方法
		*/
      	handleCurrentChange(val) {
        	this.showTableData = this.partOfTableData.slice((val-1)*10, val *10)
      	},

      	// 查询冻结数据
		checkFreezingData(){

			if (this.startMonth>this.endMonth) {
				this.$message({
                  type: 'warning',
                  message: '请确保月份范围的正确'
               });
				return
			}

			this.loading = true

          var params = {
       		FourthRegionCode :window.sessionStorage.getItem('RegionCode'),
       		TimeStart:this.startMonth,
       		TimeEnd:this.endMonth,
       		time:this.dataUtil.formatTime1(new Date())
          }

          console.log(params);

          var encryptParams = {
            evalue:this.$encrypt(JSON.stringify(params))
          }

          console.log(this.$encrypt(JSON.stringify(params)))

          this.http.post(this.api.baseUrl+this.api.QureyMonthData,encryptParams)
          .then(result=>{
            this.loading = false
            console.log(result)
            if (result.status == '成功') {

                this.$message({
                  type: 'success',
                  message: '查询成功!'
               });
                this.tableData = result.data
                this.partOfTableData = this.tableData
                this.showTableData = this.partOfTableData.slice(0, 10)

            }else{

              this.$message({
                  type: 'error',
                  message: result.data
               });

            }



          })
		},

		// 筛选数据
		filterTableData(node){
      		if (window.sessionStorage.getItem('menuName') == 'QueryDayFreezingData') {

      			if(node.level == "4"){
      				this.partOfTableData = this.tableData;
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

		window.sessionStorage.setItem('freezingData','month')

		this.loading = true
		// setTimeout(()=>{
			this.checkFreezingData()
		// }, 2000)
	}
}
</script>
<style scoped>

.condition{
	overflow: hidden;
}

.left{
	float: left;
}

.el-date-picker{
	width: 90px;
}

.el-table{
	margin-top: 10px;
}



</style>
