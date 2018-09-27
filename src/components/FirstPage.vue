<!-- 首页 -->
<template>
	<div v-loading="loading" element-loading-text="拼命加载中">

		<el-row :gutter="20">
		  <el-col :xs='20' :sm='12' :md='12' :lg='8'>
		  	<div class="area" style='min-width:300px'>
		  		<div class="title">小区总用能</div>
		  		<div class="items">
		  			<img src="../assets/gateway.png" class="myIcon">
		  			<div class="info">
		  				<span style="color:red">{{GW.OnLine}}</span>
		  				<span>/</span>
		  				<span>{{GW.Total}}</span>
		  			</div>
		  			<div class="info">
		  				<span>网关在线数</span>
		  				<span>/</span>
		  				<span>总数</span>
		  			</div>
		  		</div>
		  		<div class="items">
		  			<img src="../assets/meter.png" class="myIcon">
		  			<div class="info">
		  				<span style="color:red">{{MT.OnLine}}</span>
		  				<span>/</span>
		  				<span>{{MT.Total}}</span>
		  			</div>
		  			<div class="info">
		  				<span>抄表成功数</span>
		  				<span>/</span>
		  				<span>总数</span>
		  			</div>
		  		</div>
		  	</div>
		  </el-col>
		  <el-col :xs='20' :sm='12' :md='12' :lg='8'>
		  	<div class="area" style='min-width:300px'>
		  		<div class="title moneyTitle">
		  			<div>营收比</div>	
					<div>
						<el-button round size='mini' :class="{'actived':active1}" @click="choseDate(1)">日</el-button>
		  				<el-button round size='mini' :class="{'actived':active2}" @click="choseDate(2)">周</el-button>
		  				<el-button round size='mini' :class="{'actived':active3}" @click="choseDate(3)">月</el-button>
					</div>
		  			
		  		</div>
		  		<div id="Pie" style="width:100%; height:230px; margin-top:10px" >
		  			没有相关内容
		  		</div>
		  	</div>
		  </el-col>
		   <el-col :xs='20' :sm='12' :md='12' :lg='8'>
		  	<div class="area" style='min-width:300px'>
		  		<div class="title">运行预警</div>
		  		<el-tabs v-model="activeName" style='padding: 0px 0 0px 20px;font-size:12px;' @tab-click="userSelect">
				    <el-tab-pane label="跳闸用户" name="first"></el-tab-pane>
				    <el-tab-pane label="报警用户" name="second"></el-tab-pane>
				    <el-tab-pane label="保电用户" name="third"></el-tab-pane>
				</el-tabs>
				<div class="showUser" style='width:100%;overflow-y: auto;height:180px'>
					<div class="userItem" v-for="(item,index) in warnUser">
						<span>{{index + 1}}</span>
						<span>{{item}}</span>
					</div>
				</div>
		  	</div>
		  </el-col>

			

		</el-row>



		<el-row :gutter="20">
			
			<el-col :xs='24' :sm='18' :md='12' :lg='12'>
				<div class="area" style="height:350px;min-width:400px">

					<div class="title moneyTitle">
		  				<div>用电量折线图（kwh）</div>	
						<div>
							<el-button round size='mini' :class="{'actived':active4}" @click="choseDate(4)">日</el-button>
			  				<el-button round size='mini' :class="{'actived':active5}" @click="choseDate(5)">月</el-button>
			  				<el-button round size='mini' :class="{'actived':active6}" @click="choseDate(6)">年</el-button>
						</div>
		  			
		  			</div>

					<div id="line" style="width:100%; height:300px"></div>
				</div>
			</el-col>

			<el-col :xs='24' :sm='18' :md='12' :lg='12'>
				<div class="area" style="height:350px;min-width:400px">

					<div class="title moneyTitle">
		  				<div>用电量柱形图（kwh）</div>	
					<div>
						<el-button round size='mini' :class="{'actived':active7}" @click="choseDate(7)">日</el-button>
		  				<el-button round size='mini' :class="{'actived':active8}" @click="choseDate(8)">月</el-button>
		  				<el-button round size='mini' :class="{'actived':active9}" @click="choseDate(9)">年</el-button>
					</div>
			  			
			  		</div>

					<div id="bar" style="width:100%; height:300px"></div>
				</div>
			</el-col>
			
		</el-row>
	</div>
</template>
<script>
var echarts = require('echarts')
export default{
	data(){

		return{
			activeName:"first",
			loading:false,//是否显示加载

			GW:{
				Total:'',
				OnLine:'',
			},//网关

			MT:{
				Total:'',
				OnLine:'',
			},//抄表


			MData:{},//营收比数据

			EData:{},//用电量数据

			pie:null,//扇形对象
			line:null,//折线图对象
			bar:null,//柱形图对象

			active1:true,
			active2:false,
			active3:false,

			active4:true,
			active5:false,
			active6:false,

			active7:true,
			active8:false,
			active9:false,

			bd:[],//保电用户

			bj:[],//报警用户、

			tz:[],//报警用户
			warnUser:[],//显示的预警客户

			// 多次请求的时候，发生数据错误的时候是否再请求一次
			requestAgian:true


		}
	},
	methods:{
		



		dayPie(){
			this.pie.setOption({
				
				legend: {
                    // right: 'center',
                    // bottom: 0,
                    orient: 'horizontal'
                },

				tooltip : {
                	trigger: 'item',
                	formatter: "{a} <br/>{b} : {c} ({d}%)"
            	},

	            series: {
	            	// name:'营收比',
	            	type: 'pie',
	            	radius: '60%',
	            	center: ['50%','60%'], 
	                data: [
	                    // {name: '现金', value: 5000},
	                    // {name: '微信', value: 3000},
	                    // {name: '支付宝', value: 3000},
	                    // {name: '其他', value: 1000},
	                ],
	                
	            }

	      });
		},

		electricityLine(){
			this.line.setOption({
		     
		        xAxis: {
		            data: []
		        },
		        tooltip: {},//鼠标移动过的时候的提示
		        yAxis: {},
		        series: [{
		            name: '用电量',
		            type: 'line',
		            data: []
		        }]
	        });
		},

		electricityBar(){
			this.bar.setOption({
		        xAxis: {
		            data: []
		        },
		        tooltip: {},//鼠标移动过的时候的提示
		        yAxis: {},
		        series: [{
		            name: '用电量',
		            type: 'bar',
		            data: [],
		            // 此系列自己的调色盘。
			        // color: ['#dd6b66'],
				}]
	        });
		},

		/**
		*选择日期
		*/
		choseDate(index){
			switch (index) {
				case 1:
					// statements_1
					this.active1 = true
					this.active2 = false
					this.active3 = false
					this.setPie('day')
					break;

				case 2:
					// statements_1
					this.active2 = true
					this.active1 = false
					this.active3 = false
					this.setPie('week')
					break;

				case 3:
					// statements_1
					this.active3 = true
					this.active2 = false
					this.active1 = false
					this.setPie('month')
					break;
					
				case 4:
					// statements_1
					this.active4 = true
					this.active5 = false
					this.active6 = false
					this.setLine('day')
					break;

				case 5:
					// statements_1
					this.active5 = true
					this.active4 = false
					this.active6 = false
					this.setLine('month')
					break;

				case 6:
					// statements_1
					this.active6 = true
					this.active5 = false
					this.active4 = false
					this.setLine('year')
					break;
					
				case 7:
					// statements_1
					this.active7 = true
					this.active8 = false
					this.active9 = false
					this.setBar('day')
					break;

				case 8:
					// statements_1
					this.active8 = true
					this.active9 = false
					this.active7 = false
					this.setBar('month')
					break;

				case 9:
					// statements_1
					this.active9 = true
					this.active8 = false
					this.active7 = false
					this.setBar('year')
					break;
				default:
					// statements_def
					break;
			}
		},

		/**
		*查询主页的相关内容
		*/
		QueryHomePageData(){
			this.loading = true
			var params = {
				RegionCode:window.sessionStorage.getItem('RegionCode'),
				time:this.dataUtil.formatTime1(new Date()) 
			}

			var encryptParams = {
                evalue:this.$encrypt(JSON.stringify(params))
              }

            console.log(this.$encrypt(JSON.stringify(params)))

            this.http.post(this.api.baseUrl+this.api.QueryHomePageData,encryptParams)
            .then(result=>{
            	this.loading = false
            	console.log(result)
            	if (result.status == '成功') {
            		var data = result.data[0]
            		// 小区总用能数据
            		this.GW = data.DevOnline.GW
            		this.MT = data.DevOnline.MT

            		// 营收比例
            		this.MData = data.MData
            		this.setPie('day')

            		// 用电量
            		this.EData = data.EData

            		this.setLine('day')

            		this.setBar('day')

            		this.bd = data.warn.bd
            		this.tz = data.warn.tz
            		this.bj = data.warn.bj

            		this.warnUser = this.tz

            	}else{
            		
            		if (this.requestAgian) {
            			console.log('再请求主页')
            			this.requestAgian = false
            			setTimeout(()=>{
	            			this.QueryHomePageData()
	            		},1000)
            		}
            		
            		
            	}
            })
		},

		/**
		*异步之后设置营收比的饼形图数据
		*/
		setPie(time){
			if (time == 'day') {
				this.pie.setOption({
        			series:{
        				name:this.MData.MDay.length > 0 ? '营收比' : '',
        				data: this.MData.MDay,
        			}
            	})
			}else if (time == 'week') {
				this.pie.setOption({
        			series:{
        				name:this.MData.MWeek.length > 0 ? '营收比' : '',
        				data: this.MData.MWeek,
        			}
        		})

			}else if (time == 'month') {
				this.pie.setOption({
        			series:{
        				name:this.MData.MMonth.length > 0 ? '营收比' : '',
        				data: this.MData.MMonth,
        			}
        		})

			}
		},

		/**
		*用电量的图形数据设置
		*/
		setLine(time){
			if (time == 'day') {
				this.line.setOption({
					xAxis: {
		            	data: this.EData.EDay.Date
		        	},
		        	series:[{
		        		data:this.EData.EDay.Pow
		        	}]
				})
			}else if (time == 'month') {
				this.line.setOption({
					xAxis: {
		            	data: this.EData.EMonth.Date
		        	},
		        	series:[{
		        		data:this.EData.EMonth.Pow
		        	}]
				})
			}else if (time == 'year') {
				this.line.setOption({
					xAxis: {
		            	data: this.EData.EYear.Date
		        	},
		        	series:[{
		        		data:this.EData.EYear.Pow
		        	}]
				})
			}
		},

		setBar(time){
			if (time == 'day') {
				this.bar.setOption({
					xAxis: {
		            	data: this.EData.EDay.Date
		        	},
		        	series:[{
		        		data:this.EData.EDay.Pow
		        	}]
				})
			}else if (time == 'month') {
				this.bar.setOption({
					xAxis: {
		            	data: this.EData.EMonth.Date
		        	},
		        	series:[{
		        		data:this.EData.EMonth.Pow
		        	}]
				})
			}else if (time == 'year') {
				this.bar.setOption({
					xAxis: {
		            	data: this.EData.EYear.Date
		        	},
		        	series:[{
		        		data:this.EData.EYear.Pow
		        	}]
				})
			}
		},

		/**
		*运行预警的
		*/
		userSelect(tab, event){
			if (tab.$options.propsData.name == 'first') {
        		this.warnUser = this.tz
        	}else if(tab.$options.propsData.name == 'second'){
        		this.warnUser = this.bj

        	}else if(tab.$options.propsData.name == 'third'){
        		this.warnUser = this.bd
        	}
		},

	},
	mounted(){
		this.pie = echarts.init(document.getElementById('Pie'))
		this.line = echarts.init(document.getElementById('line'))
		this.bar = echarts.init(document.getElementById('bar'))

		this.dayPie()
		this.electricityLine()
		this.electricityBar()
		this.loading = true
		setTimeout(()=>{
          this.QueryHomePageData()
		},2000)
	}
}	
</script>
<style scoped>
.area{
	border: 1px solid #bbb;
	height: 300px;	
	margin-bottom: 20px;
}

.myIcon{
	width: 34px;
	height: 34px;
}

.items{
	display: flex;
	align-content: center;
	padding: 10px 0 10px 20px;
	border-bottom: 1px dashed silver;	

}

.info{
	line-height: 34px;
	margin-left: 20px;
	
}


.title{
	padding: 20px 0 10px 10px;
	border-bottom: 1px dashed silver;
	font-size: 18px;
}

.moneyTitle{
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 51px;
}

.actived
{
	background: #e9f5fe;
	color: rgba(54, 138, 233, 1.0);
	border-color:rgba(76, 144, 232, 1.0);


}

.userItem{
	border-bottom: 1px solid #ccc;
}

.userItem span{
	display: inline-block;
	height: 30px;
	line-height: 30px;
	font-size: 12px
	
}

.userItem span:first-child{
	margin-left: 30px;

	width: 30px;

	text-align: left;
}

.userItem span:last-child{
	margin-left: 30px;

	text-align: left;
}

</style>





