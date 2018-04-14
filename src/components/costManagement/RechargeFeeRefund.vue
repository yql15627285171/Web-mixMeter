<!-- 充值退费 -->
<template>
    <div>
       <object id="MWRFATL" style="width:0px;height:0px" classid="CLSID:856964B5-F42F-447B-A37D-ED07E8973ED2" codebase="trjCab.CAB#version=1,0,0,1">
        </object>
        <div>
             <el-button type="primary" @click='initAndJudge'>读卡</el-button> 
         
            <el-button type="warning" @click='GetFrameOpenAccountByPANForRF' :disabled='disabled1'>开户</el-button> 
            <el-button type="warning" :disabled='disabled2'>售电</el-button> 
            <el-button type="warning" :disabled='disabled3'>销户</el-button> 
            <el-button type="warning" :disabled='disabled4'>销户退费</el-button>
            <el-button type="warning" :disabled='disabled5'>异常卡</el-button>

        </div>

       <!-- 开户 -->
        <div v-if='false'>
            <div style="width:500px;margin:100px 0 0 120px">
              <el-form :model="openUserForm"  label-width="100px" class="demo-ruleForm" >
               
                  <el-form-item label="栋" prop="FifthRegionName">
                    <el-input v-model.trim="openUserForm.FifthRegionName"  disabled></el-input>
                  </el-form-item>
               
                  <el-form-item label="房间" prop="HouseName">
                    <el-input  v-model.trim="openUserForm.HouseName" disabled></el-input>
                  </el-form-item>

                  <el-form-item label="类型" prop="type">
                    <el-select v-model="openUserForm.type" placeholder="请选择交易类型" clearable style="width:400px;">
                        <el-option v-for="item in TransactionMethod"
                        :label="item.label" :value="item.value" >
                        </el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="金额" prop="Amount">
                    <el-input  v-model.trim="openUserForm.Amount"></el-input>
                  </el-form-item>

              </el-form>
              <div style="text-align:center">
                  <el-button type="primary" style="width:200px;" @click="GetFrameOpenAccountByPANForRF">确定开户</el-button>
              </div>
              
            </div>
        </div>
        
        <!-- 充值 -->
        <div v-if="false">
            <div style="width:500px;margin:100px 0 0 120px">
              <el-form :model="topUpForm"  label-width="100px" class="demo-ruleForm" >

                  <el-form-item label="类型" prop="type">
                    <el-select v-model="topUpForm.type" placeholder="请选择交易类型" clearable style="width:400px;">
                        <el-option v-for="item in TransactionMethod"
                        :label="item.label" :value="item.value" >
                        </el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="金额" prop="Amount">
                    <el-input  v-model.trim="topUpForm.Amount"></el-input>
                  </el-form-item>

              </el-form>
              <div style="text-align:center">
                  <el-button type="primary" style="width:200px;" @click="GetFrameRechargeByPANForRF">充值</el-button>
              </div>
              
            </div>
        </div>
    </div>
    

</template>
<script>
export default{
    data(){
        return{
            disabled1:true,
    
            disabled2:true,
        
            disabled3:true,
          
            disabled4:true,
         
            disabled5:true,

            blockData:[],//存储IC卡块的数据

            TransactionMethod:[
            {
                label:'现金',
                value:'0'
            },
            {
                label:'微信',
                value:'1'
            },
            {
                label:'支付宝',
                value:'2'
            },
            {
                label:'银联',
                value:'3'
            },
            {
                label:'其他',
                value:'4'
            },],//交易方式

            openUserForm:{
                FifthRegionName:'',
                HouseName:'',
                HouseCode:'',
                type:'',
                Amount:0,//金额
            },

            topUpForm:{
                type:'',
                Amount:0,//金额
            }

        }
    },

	methods:{
        // 右补0方法
        rightPadding(str){
            while (str.length < 64) {
                // statement
                str += "0"
            }

            return str
        },

        linkMachine(){
            // 连接读卡器
            if (!this.ICCard.readerOpen()) {
                this.$message({
                    type: 'error',
                    message: "连接读卡器失败"                
                });
                // 响声

                // this.ICCard.readerBeep()
                this.ICCard.readerClose()
                return false
            }else{
                console.log('读卡器连接成功')
                return true
            }
        },

        findCard(){
             if (!this.ICCard.openCard()) {
                this.$message({
                    type: 'error',
                    message: "找不到IC卡"                
                });
                // this.ICCard.readerBeep()
               this.ICCard.readerClose()
                return false
            }else{
                console.log('打开IC卡')
                return true
            }
        },

    
        // 判断指定块有无data
        hasData(index){
            var originData = '0000000000000000'+'0000000000000000'
            if (this.blockData[index] == originData) {
                return false
            }else{
                return true
            }
        },

        // 重置disable
        resetDisabled(){
            this.disabled1 = true
            this.disabled2 = true
            this.disabled3 = true
            this.disabled4 = true
            this.disabled5 = true
        },
		// 初始化卡
        initCard(){
            // 连接读卡器
            if (!this.linkMachine()) {
                return false
            }
            // 寻卡
           if(!this.findCard()){
                return false
           }               
            //初始化 
            for (var i = 0; i <= 4; i++) {
                var block = 3 + 4*i
                console.log(block)
                if (this.ICCard.cardDirVerifyPassword(0,block,"ffffffffffff")) {
                    console.log('正在初始密码')
                    this.ICCard.cardWriteHex(block,"201803191500ff078069ffffffffffff")

                }else {
                    // 不需要初始化
                    console.log('IC卡已经初始过密码')
                    this.ICCard.readerClose()
                    return false
                }
            }

            return true
            

        },

        /**
        *判断卡的功能
        *返回值
        *1 只能开户
        *2 售电与销户
        */
        readCard(){
           

            if (!this.initCard()) {
                
                // 连接
                if (!this.linkMachine()) {
                    return false
                }
                // 寻卡
                if(!this.findCard()){
                    return false
                }

            }

            var blockArr = [1,4,5,8,9,12,13,16,17]
            // 清空数组
            this.blockData.splice(0, this.blockData.length)

            for (var i = 0; i < blockArr.length; i++) {

               if (this.ICCard.cardDirVerifyPassword(0,blockArr[i],"201803191500")) {
                    var block = this.ICCard.cardReadHex(blockArr[i])
                    this.blockData.push(block)
                    console.log("block"+blockArr[i]+":" +block)
                }else{
                    console.log('验证密码错误')
                    this.ICCard.readerClose()
                    return false
                } 
            }

            // 判断PAN
            if (this.hasData(0)) {
                // 有PAN
                if (this.hasData(1)||this.hasData(2)||this.hasData(3)||this.hasData(4)||this.hasData(5)||this.hasData(6)||this.hasData(7)||this.hasData(8)) {
                    // 存在数据,网络请求
                }else{
                    // 不存在数据,已开户，没数据
                    this.disabled1 = false
                    this.disabled2 = false

                    return 2
                }

            }else{
                // 无PAN
                 if (this.hasData(1)||this.hasData(2)||this.hasData(3)||this.hasData(4)||this.hasData(5)||this.hasData(6)||this.hasData(7)||this.hasData(8)) {
                    // 存在数据，异常卡
                }else{
                    // 不存在数据,没开户，新卡
                    this.disabled1 = false
                    return 1
                }

            }

        },


        // 初始化并且识别该卡有什么功能
        initAndJudge(){

            if(this.readCard()){
                // 断开读卡器
                this.ICCard.readerClose()
            }
            
        },


        /**
        *开户
        */
        GetFrameOpenAccountByPANForRF(){
            // 判断是否填写信息
            if (this.openUserForm.FifthRegionName.length == 0 || this.openUserForm.HouseName.length == 0 || this.openUserForm.type.length == 0 || this.openUserForm.Amountlength == 0) {
                this.$message({
                  type: 'warning',
                  message: '请选择好信息'
               });
                return
            }else if (isNaN(this.openUserForm.Amount)) {
                this.$message({
                  type: 'warning',
                  message: '金额必须为数字'
               });
                return
            }

            // 判断该卡是否有开户功能
            if (this.readCard() != 1) {
                alert("此卡没有该功能")
                this.resetDisabled()
                return
            }


            this.loading = true
            var params = {
                HouseRegionCode:this.openUserForm.HouseCode,
                Amount:this.openUserForm.Amount ,     
                UserId:window.sessionStorage.getItem('id'),
                RegionCode:window.sessionStorage.getItem('RegionCode'),
               
                TransactionType:'0',//充值
                TransactionMode:'0',//视频卡
                TransactionMethod:this.openUserForm.type,
                time:this.dataUtil.formatTime1(new Date()) 
            }

              console.log(params);
          
              var encryptParams = {
                evalue:this.$encrypt(JSON.stringify(params))
              }

              console.log(this.$encrypt(JSON.stringify(params)))

              this.http.post(this.api.baseUrl+this.api.GetFrameOpenAccountByPANForRF,encryptParams)
              .then(result=>{
                this.loading = false
                console.log(result)
                if (result.status == '成功') {
                    
                    // 秘钥报文
                    var EK = this.rightPadding(result.EK) 
                    var OAF = this.rightPadding(result.OAF)

                    console.log("EK"+ek.length) 

                    fontEK = EK.substring(0,32)
                    afterEK = EK.substring(32,64)
                    console.log("fontEK"+fontEK.length) 

                    fontOAF = OAF.substring(0,32)
                    afterOAF = OAF.substring(32,64)

                    // 把数据写进ICCard
                    var writeBlock = [4,5,12,13]
                    var writeBlockData = [fontEK,afterEK,fontOAF,afterOAF]
                    for (var i = 0; i < writeBlock.length; i++) {

                        if (this.ICCard.cardDirVerifyPassword(0,writeBlock[i],"201803191500")) {
                            this.ICCard.cardWriteHex(writeBlock[i],writeBlockData[i])
                        }else{
                            console.log('验证密码错误')
                            this.ICCard.readerClose()
                            return false
                        } 
                    }


                    this.$message({
                      type: 'success',
                      message: '开户成功!'
                   });



                    

                }else{

                  this.$message({
                      type: 'error',
                      message: result.data
                   });

                }
                
                
                        
              })
        },


        /**
        *充值
        */
        GetFrameRechargeByPANForRF(){
            // 判断是否填写信息
            if ( this.topUpForm.type.length == 0 || this.topUpForm.Amountlength == 0) {
                this.$message({
                  type: 'warning',
                  message: '请选择好信息'
               });
                return
            }else if (isNaN(this.topUpForm.Amount)) {
                this.$message({
                  type: 'warning',
                  message: '金额必须为数字'
               });
                return
            }

            // 判断该卡是否有开户功能
            if (this.readCard() != 2) {
                alert("此卡没有该功能")
                this.resetDisabled()
                return
            }

            this.$confirm(`确定要充值${this.topUpForm.Amount}元吗？`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              // 网络请求

            }).catch();
        },
        /**
        *选择房间
        */
        selectHouse(node){
            if (window.sessionStorage.getItem('menuName') == 'RechargeFeeRefund') {
                if (node.level == "5") {
                    this.openUserForm.FifthRegionName = node.label
                    this.openUserForm.HouseName = ''
                    this.openUserForm.HpuseCode = ''
                }else if (node.level == "6") {
                    this.openUserForm.HouseName = node.label
                    this.openUserForm.HouseCode = node.code
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
        // 观察点击的树的内容发生改变
        treeNode(newVal){
            this.selectHouse(newVal)
        },

    },
}
</script>
<style>
	
</style>