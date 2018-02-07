/**
*状态管理
*/
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		userNum:'',//用户编号，每次登录时都存在的一个id
	},
	getters:{
		getUserNum(state){
			return state.userNum
		}
	},
	mutations:{
		setUserNum(state,value){
			state.userNum = value
		}
	},
	actions:{
		setUserNum(context,value){
			console.log(value)
			context.commit('setUserNum',value)
		}
	}
})

/**
*设置值时
*this.$store.dispatch('setUserNum',value)
*/