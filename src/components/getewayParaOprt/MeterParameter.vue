<!-- 表计参数 -->
<template>
	<div v-loading="loading" element-loading-text="拼命加载中">
		<div style="font-size:16px;display:flex;align-items: center; margin-bottom:30px;">
			<span>房间信息:&nbsp;</span>
			<el-breadcrumb separator-class="el-icon-arrow-right" style="display:inline-block;font-size:16px">

                <el-breadcrumb-item>{{FifthRegionName}}</el-breadcrumb-item>
                <el-breadcrumb-item >{{HouseName}}</el-breadcrumb-item>
            </el-breadcrumb>
		</div>

		<div>
			<h1 class='title'>变比信息</h1>
			<div @click="ReadEMValuePTAndCT" class="ope-btn first">
				<i class="el-icon-edit-outline"></i>
				<span>抄读变比</span>
			</div>
			<div @click="SetEMValuePTAndCT" class="ope-btn">
				<i class="el-icon-edit-outline"></i>
				<span>设置变比</span>
			</div>

		</div>
		<div class="content">

			<el-form :model="dataForm"  label-width="100px" class="demo-ruleForm" >
		        <el-form-item label="CT" prop="CT">
		           <el-input v-model.trim="dataForm.CT"></el-input>
		        </el-form-item>

		        <el-form-item label="PT" prop="PT">
		           <el-input v-model.trim="dataForm.PT"></el-input>
		        </el-form-item>
        	</el-form>

		</div>

		<div>
			<h1 class='title'>电价信息</h1>
			<div  class="ope-btn first" @click="ReadEMValueRatesPrice">
				<i class="el-icon-edit-outline"></i>
				<span>抄读电价</span>
			</div>
			<div  class="ope-btn" @click='SetEMValueRatesPrice'>
				<i class="el-icon-edit-outline"></i>
				<span>设置电价</span>
			</div>

		</div>
		<div class="content">

			<el-form :model="rateForm"  label-width="100px" class="demo-ruleForm" >
		        <el-form-item label="电价费率1" prop="RPrice1">
		           <el-input v-model.trim="rateForm.RPrice1"></el-input>
		        </el-form-item>

		        <el-form-item label="电价费率2" prop="RPrice2">
		           <el-input v-model.trim="rateForm.RPrice2"></el-input>
		        </el-form-item>

		        <el-form-item label="电价费率3" prop="RPrice3">
		           <el-input v-model.trim="rateForm.RPrice3"></el-input>
		        </el-form-item>

		        <el-form-item label="电价费率4" prop="RPrice4">
		           <el-input v-model.trim="rateForm.RPrice4"></el-input>
		        </el-form-item>
        	</el-form>

		</div>

	</div>
</template>
<script>
export default{
	data(){
		return{
			loading:false,
			dataForm:{
				CT:'',
				PT:'',
			},
			HouseRegionCode:'',//房间号
			FifthRegionName:'',
			HouseName:'',

			rateForm:{
				RPrice1:'',
				RPrice2:'',
				RPrice3:'',
				RPrice4:'',
			}
		}
	},
	methods:{
		/**
		*设置变比
		*/
		SetEMValuePTAndCT(){

		  if ( !this.dataForm.CT || !this.dataForm.PT) {

        this.$message({
          type: 'warning',
          message: '参数不能为空'
        });

        return
      }

      this.$confirm(`确定设置变比吗`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_=>{
        this.loading = true

        var params = {
          UserId:window.sessionStorage.getItem('id'),
          HouseRegionCode:this.HouseRegionCode,
          CT:this.dataForm.CT,
          PT:this.dataForm.PT,
          time:this.dataUtil.formatTime1(new Date())
        }

        console.log(JSON.stringify(params));

        var encryptParams = {
          evalue:this.$encrypt(JSON.stringify(params))
        }

        console.log(this.$encrypt(JSON.stringify(params)))


        this.http.post(this.api.baseUrl+this.api.SetEMValuePTAndCT,encryptParams)
          .then(result=>{
            console.log(result)
            this.loading = false
            if (result.status == '成功') {
              this.$message({
                type: 'success',
                message: '设置成功'
              });
            }else{
              this.$message({
                type: 'error',
                message: result.data
              });

              this.dataForm.CT = ''
              this.dataForm.PT = ''

            }
          })
      }).catch(_=>{

      })


		},

		/**
		*抄读变比
		*/
		ReadEMValuePTAndCT(){
			this.loading = true
			var params = {
				UserId:window.sessionStorage.getItem('id'),
				HouseRegionCode:this.HouseRegionCode,
				time:this.dataUtil.formatTime1(new Date())
			}

			console.log(JSON.stringify(params));

              var encryptParams = {
                evalue:this.$encrypt(JSON.stringify(params))
              }

              console.log(this.$encrypt(JSON.stringify(params)))


            this.http.post(this.api.baseUrl+this.api.ReadEMValuePTAndCT,encryptParams)
            .then(result=>{
            	this.loading = false
            	console.log(result)
            	if (result.status == '成功') {
            		this.$message({
                        type: 'success',
                        message: '抄读成功'
                    });
                    this.dataForm.CT = result.CT
                    this.dataForm.PT = result.PT
            	}else{
            		this.$message({
                        type: 'error',
                        message: result.data
                    });



            	}
            })
		},

		/**
		*设置电价
		*/
		SetEMValueRatesPrice(){
			var RPrice1 = this.rateForm.RPrice1
			var RPrice2 = this.rateForm.RPrice2
			var RPrice3 = this.rateForm.RPrice3
			var RPrice4 = this.rateForm.RPrice4

			if (RPrice1 == 0 || RPrice2 == 0 ||RPrice3 == 0 || RPrice4 == 0) {

				this.$message({
                        type: 'warning',
                        message: '请填写好大于0的费率参数'
                    });
				return

			}else if (parseFloat(RPrice1) < 0 || parseFloat(RPrice2) < 0 || parseFloat(RPrice3) < 0 || parseFloat(RPrice4) < 0 ) {

				this.$message({
                        type: 'warning',
                        message: '费率参数必须大于0'
                    });
				return
			}else if (isNaN(RPrice1) || isNaN(RPrice2) || isNaN(RPrice3)|| isNaN(RPrice4)) {

				this.$message({
                        type: 'warning',
                        message: '费率参数必须是一个数字'
                    });
				return
			}

      this.$confirm(`确定设置变比吗`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_=>{
        this.loading = true
        var params = {
          UserId:window.sessionStorage.getItem('id'),
          HouseRegionCode:this.HouseRegionCode,
          RPrice1:RPrice1,
          RPrice2:RPrice2,
          RPrice3:RPrice3,
          RPrice4:RPrice4,
          time:this.dataUtil.formatTime1(new Date())
        }

        console.log(JSON.stringify(params));

        var encryptParams = {
          evalue:this.$encrypt(JSON.stringify(params))
        }

        console.log(this.$encrypt(JSON.stringify(params)))


        this.http.post(this.api.baseUrl+this.api.SetEMValueRatesPrice,encryptParams)
          .then(result=>{
            this.loading = false
            console.log(result)
            if (result.status == '成功') {
              this.$message({
                type: 'success',
                message: '读取成功'
              });

            }else{
              this.$message({
                type: 'error',
                message: result.data
              });

              this.rateForm.RPrice1 = ''
              this.rateForm.RPrice2 = ''
              this.rateForm.RPrice3 = ''
              this.rateForm.RPrice4 = ''
            }
          })
      }).catch(_=>{

      })


		},

		/**
		*读取电价
		*/
		ReadEMValueRatesPrice(){
			this.loading = true
			var params = {
				UserId:window.sessionStorage.getItem('id'),
				HouseRegionCode:this.HouseRegionCode,
				time:this.dataUtil.formatTime1(new Date())
			}

			console.log(JSON.stringify(params));

              var encryptParams = {
                evalue:this.$encrypt(JSON.stringify(params))
              }

              console.log(this.$encrypt(JSON.stringify(params)))


            this.http.post(this.api.baseUrl+this.api.ReadEMValueRatesPrice,encryptParams)
            .then(result=>{
            	this.loading = false
            	console.log(result)
            	if (result.status == '成功') {
            		this.$message({
                        type: 'success',
                        message: '读取成功'
                    });
                    this.rateForm.RPrice1  = result.RPrice1
                    this.rateForm.RPrice2  = result.RPrice2
                    this.rateForm.RPrice3  = result.RPrice3
                    this.rateForm.RPrice4  = result.RPrice4
            	}else{
            		this.$message({
                        type: 'error',
                        message: result.data
                    });



            	}
            })
		},

		/**
      	*数据源条件筛选
      	*/
      	filterTableData(node){
      		if (window.sessionStorage.getItem('menuName') == 'MeterParameter') {
      			 if (node.level == '6') {
      				this.HouseName = node.label
      				this.HouseRegionCode = node.code
      				console.log(this.HouseRegionCode)
      			}

      		}
      	},

      	// 根据6级名寻找五级名
      	findFifthRegionNameByHouseName(){
      		var obj = this.$store.state.treeData.Commmunity
      		for (var i = 0; i < obj.length; i++) {
      			// console.log('一级循环')
      			var fifthNames = obj[i].children
      			for (var j = 0; j < fifthNames.length; j++) {
      				// console.log('二级循环')
      				var houses = fifthNames[j].children
      				for (var k = 0; k < houses.length; k++) {
      					// console.log('遍历'+houses[K].code)
      					if (houses[k].code == this.HouseRegionCode) {
      						console.log('匹配到')
      						return fifthNames[j].label
      					}

      				}
      			}
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
		},
		HouseRegionCode(newVal){
			this.FifthRegionName = this.findFifthRegionNameByHouseName()
			console.log('五级名'+this.FifthRegionName)
		}
	},
	activated(){

		// setTimeout(()=>{
		// 	var obj = this.$store.state.treeData.Commmunity
		// 	this.HouseName = obj[0].children[0].children[0].label
		// 	this.HouseRegionCode = obj[0].children[0].children[0].code
		// },1000)


	}
}
</script>
<style scoped>
.content{
	width:400px;
	margin-left: 60px
}

.title{
	color:#409EFF;
	font-size: 16px;
	padding-left: 30px
}

.ope-btn{
	display: inline-block;
	margin-left: 20px;
	cursor: pointer;
}

.first{
	margin:20px 0 20px 100px;
}
</style>
















