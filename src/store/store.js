/**
*状态管理
*/
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
	state:{
		clickTreeData:null,//点击数的节点
		treeData:[],
	},
	getters:{
		getClickTreeData(state){
			return state.clickTreeData
		},
		getTreeData(state){
			return state.treeData
		}
	},
	mutations:{
		
		setClickTreeData(state,value){
			state.clickTreeData = null
			state.clickTreeData = value
		},	

		reloadTreeData(state,value){
			state.treeData = value
		}
	},
	actions:{
		setClickTreeData(context,value){
			// console.log(value)
			context.commit('setClickTreeData',value)
		},
		// 更新数的数据
		reloadTreeData(context,value){
			context.commit('reloadTreeData',value)
		}

	}
})

/**
*设置值时
*this.$store.dispatch('setUserNum',value)
*/