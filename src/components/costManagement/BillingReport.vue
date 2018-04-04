<!-- 结算报表 -->
<template>
	<div >

			<el-tabs v-model="activeName1" @tab-click="timeSelect" >
			    <el-tab-pane label="月度" name="month"></el-tab-pane>
			    <el-tab-pane label="季度" name="season"></el-tab-pane>
			    <el-tab-pane label="年度" name="year"></el-tab-pane>
			</el-tabs>
			

		<el-tabs v-model="activeName2" @tab-click="typeSelect">
		    <el-tab-pane label="电费" name="electric"></el-tab-pane>
		    <el-tab-pane label="水费" name="water"></el-tab-pane>
		    <el-tab-pane label="气费" name="gas"></el-tab-pane>
		    <el-tab-pane label="热费" name="heat"></el-tab-pane>
		</el-tabs>

		<div>
			<keep-alive>
        		<router-view ></router-view>
        	</keep-alive>
		</div>
		
	</div>
</template>
<script>
export default{
	data(){
		return{
			
			activeName1:'month',
			activeName2:'electric',
		}
	},
	methods:{
		/**
		*跳转页面
		*/
		changeShowPage(){

			if (this.activeName1 == 'month' && this.activeName2 == 'electric') {
        		// 月电
        		this.$router.push({name:'monthElectric'})	
        	}else if(this.activeName1 == 'month' && this.activeName2 == 'water'){
        		// 月水
        	}else if(this.activeName1 == 'month' && this.activeName2 == 'gas'){
        		// 月气
        	}else if(this.activeName1 == 'month' && this.activeName2 == 'heat'){
        		// 月热
        	}else if(this.activeName1 == 'season' && this.activeName2 == 'electric') {
        		// 季度电
        	
        	}else if(this.activeName1 == 'season' && this.activeName2 == 'water'){
        		// 季度水
        	}else if(this.activeName1 == 'season' && this.activeName2 == 'gas'){
        		// 季度气
        	}else if(this.activeName1 == 'season' && this.activeName2 == 'heat'){
        		// 季度热
        	}else if(this.activeName1 == 'year' && this.activeName2 == 'electric') {
        		// 年度电	
        	}else if(this.activeName1 == 'year' && this.activeName2 == 'water'){
        		// 年度水
        	}else if(this.activeName1 == 'year' && this.activeName2 == 'gas'){
        		// 年度气
        	}else if(this.activeName1 == 'year' && this.activeName2 == 'heat'){
        		// 年度热
        	}
		},
		/**
		*选择时间，跳转到不同的页面
		*/

		timeSelect(tab, event) {
        	
			this.changeShowPage()
      	},

      	/**
		*选择表类，跳转到不同的页面
		*/
		typeSelect(tab, event) {
        	this.changeShowPage()
      	}
	}
}
</script>
<style>
	
</style>