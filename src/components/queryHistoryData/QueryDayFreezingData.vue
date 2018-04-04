<!-- 电表冻结数据 -->
<template>
	<div>
		<el-tabs v-model="activeName" @tab-click="dateSelect">
		    <el-tab-pane label="日冻结" name="day"></el-tab-pane>
		    <el-tab-pane label="月冻结" name="month"></el-tab-pane>
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
			
			activeName:'day',
		}
	},
	methods:{
		/**
		*选择表计，跳转到不同的页面
		*/
		dateSelect(tab, event) {
        
        	if (this.activeName == 'day') {
        		// 跳转到日冻结
        		this.$router.push({name:'dayFreezing'})	
        	}else if(this.activeName == 'month'){
        		// 跳转到月冻结
        		this.$router.push({name:'monthFreezing'})	
        	}	
      	},

	},
	activated(){

		if (window.sessionStorage.getItem('freezingData') == 'month') {
			this.$router.push({name:'monthFreezing'})
			this.activeName = 'month'	
		}else{
			this.$router.push({name:'dayFreezing'})	
			this.activeName = 'day'
		}

	}
}
</script>
<style>
	
</style>