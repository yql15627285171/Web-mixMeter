<!-- 表计抄读 -->
<template>
	<div >
		<!-- 表计标签选择 -->
		<el-tabs v-model="activeName" @tab-click="meterSelect">
		    <el-tab-pane label="电表" name="first"></el-tab-pane>
		    <el-tab-pane label="水表" name="second"></el-tab-pane>
		    <el-tab-pane label="气表" name="third"></el-tab-pane>
		    <el-tab-pane label="热表" name="fourth"></el-tab-pane>
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
			
			activeName:'first',
		}
	},
	methods:{
		/**
		*选择表计，跳转到不同的页面
		*/
		meterSelect(tab, event) {
        	console.log(tab.$options.propsData);
        	if (tab.$options.propsData.name == 'first') {
        		// 跳转到电的页面
        		this.$router.push({name:'electric'})	
        	}else if(tab.$options.propsData.name == 'second'){
        		// 跳转到水的界面
        	}else if(tab.$options.propsData.name == 'third'){
        		// 跳转到气的界面
        	}else{
        		// 跳转到热的界面
        	}
      	}
	}
}
</script>
<style>
	
</style>