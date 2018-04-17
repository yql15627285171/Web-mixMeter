<!-- 充值退费 -->
<template>
    <div v-loading="loading" element-loading-text="拼命加载中">
       <object id="MWRFATL" style="width:0px;height:0px" classid="CLSID:856964B5-F42F-447B-A37D-ED07E8973ED2" codebase="trjCab.CAB#version=1,0,0,1">
        </object>
        <div>
             <el-button type="primary" @click='initAndJudge'>读卡</el-button> 
         
            <el-button type="warning" @click='button1Click' :disabled='disabled1'>开户</el-button> 
            <el-button type="warning" @click='button2Click' :disabled='disabled2'>售电</el-button> 
            <el-button type="warning" @click='GetFrameCancelAccountByPANForRF' :disabled='disabled3'>销户</el-button> 
            <el-button type="warning" @click='SettlementAndCancelAccountByPANForRF' :disabled='disabled4'>销户退费</el-button>
            <!-- <el-button type="warning" @click='SettlementAndClearCard' :disabled='disabled5'>异常结算</el-button> -->

        </div>

       <!-- 开户 -->
        <div v-if="show1">
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
        <div v-if="show2">
            <div style="width:500px;margin:100px 0 0 120px">
              <div style="text-align:center;margin-bottom:20px">{{this.CustomerInfo}}</div>
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
            loading:false,

            disabled1:true,//开户按钮
    
            disabled2:true,//售电按钮
        
            disabled3:true,//销户按钮
          
            disabled4:true,//销户退费按钮
         
            // disabled5:true,//异常卡按钮

            show1:false,//显示开户界面

            show2:false,//显示售电界面



     


            blockData:[],//存储IC卡块的数据

            CustomerInfo:'',//IC卡绑定的房间与用户的信息

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
                this.$alert('找不到IC卡','提示')
                // this.ICCard.readerBeep()
               this.ICCard.readerClose()
                return false
            }else{
                console.log('打开IC卡')
                return true
            }
        },

        /**
        *清空数据区
        */
        clearDataBlock(block){
            if (this.ICCard.cardDirVerifyPassword(0,block,"201803191500")) {
                this.ICCard.cardWriteHex(block,"0000000000000000"+"0000000000000000")
                return true
   
            }else{
                console.log('验证密码错误')
                return false
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
      
        },

        resetShow(){
            this.show1 = false
            this.show2 = false

      
        },

        /**
        *点击开户按钮，显示开户界面
        */
        button1Click(){
            this.resetShow(),
            this.show1 = true
        },
         button2Click(){
            this.resetShow(),
            this.show2 = true
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
        *卡验证
        *返回值
        *1 只能开户
        *2 售电与销户
        *4 销户退费卡
        *5 异常卡
        */
        async readCard(deliver){
           
            try {
            //已经初始过密码，读卡机会点开，需要重连 
            if (!this.initCard()) {
              
                if (!this.linkMachine()) {
                    deliver(false) 
                    return
                }
             
                if(!this.findCard()){
                    deliver(false) 
                    return
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
                    deliver(false)
                    
                } 
            }

            // 判断PAN
            if (this.hasData(0)) {
                // 有PAN
                // 网络请求验证卡
                var PAN = this.blockData[0]
                var FrameRF = this.blockData[1]+this.blockData[2]+','+this.blockData[3]+this.blockData[4]+','+this.blockData[5]+this.blockData[6]+','+this.blockData[7]+this.blockData[8]

                // 同步请求等待访问结果


                var result = await new Promise((resolve) => {
                  this.QueryRFCodeStatus(PAN,FrameRF,resolve)
                })

                
                console.log(JSON.stringify(result) )
                console.log('完成验证卡');
                if (result.status == '成功') {

                    this.CustomerInfo = result.CustomerInfo

                    if (result.CardType == '充值卡') {
                        // 清空数据区
                        this.clearDataBlock(4)
                        this.clearDataBlock(5)
                        this.clearDataBlock(8)
                        this.clearDataBlock(9)
                        this.clearDataBlock(12)
                        this.clearDataBlock(13)
                        this.clearDataBlock(16)
                        this.clearDataBlock(17)

                        this.disabled2 = false 
                        this.disabled3 = false
                        deliver(2)
                        
                    }else if (result.CardType == '销户退费卡') {
                        this.disabled4 = false
                        deliver(4)
                        
                    }else if (result.CardType == '未交易卡' || result.CardType == '异常卡') {

                        var opera = await new Promise(resolve=>{
                             this.$confirm(`${result.CardInfo}，需要进行异常结算吗？`, result.CardType, {
                              confirmButtonText: '确定',
                              cancelButtonText: '取消',
                              type: 'warning'
                            }).then(() => {
                              // 网络请求
                              resolve(true)
                            }).catch(()=>{
                               resolve(false)
                            })
                        })

                        if (opera) {
                            // 进行异常结算
                            await this.SettlementAndClearCard()
                            deliver(5)
                          
                        }else{
                            this.ICCard.readerClose()
                            deliver(false)
                            
                        }
                         
                    }
                        
                }else{
                    this.CustomerInfo = ''

                    this.$message({
                        type: 'error',
                        message: result.data
                    });
                    this.ICCard.readerClose()
                    deliver(false)
                    
                }
               
               

            }else{
                // 无PAN
                 if (this.hasData(1)||this.hasData(2)||this.hasData(3)||this.hasData(4)||this.hasData(5)||this.hasData(6)||this.hasData(7)||this.hasData(8)) {
                    // 存在数据，异常卡
                    this.disabled5 = false
                    deliver(5) 
                    

                }else{
                    // 不存在数据,没开户，新卡
                    this.disabled1 = false
                    deliver(1) 
                    
                }

            }
            } catch(e) {
                // statements
                this.ICCard.readerClose()
            }
           

        },


        // 初始化并且识别该卡有什么功能
        async initAndJudge(){
          var result =  await new Promise(resolve=>{
                this.readCard(resolve)
            })
            if(result){
                // 断开读卡器
                console.log('********')
                this.ICCard.readerClose()
            }
            
        },


        /**
        *开户
        */
        async GetFrameOpenAccountByPANForRF(){
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
            
            var num = await new Promise(resolve=>{
                this.readCard(resolve)
            })
            console.log(num)

            if ( num != 1 ) {
                alert("此卡没有该功能")
                this.resetShow()
                this.resetDisabled()
                this.ICCard.readerClose()
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

              console.log(JSON.stringify(params));
          
              var encryptParams = {
                evalue:this.$encrypt(JSON.stringify(params))
              }

              console.log(this.$encrypt(JSON.stringify(params)))

              this.http.post(this.api.baseUrl+this.api.GetFrameOpenAccountByPANForRF,encryptParams)
              .then(result=>{
                this.loading = false
                console.log(JSON.stringify(result))
                if (result.status == '成功') {
                    
                    // 秘钥报文
                    var EK = this.rightPadding(result.EK)
                    // 开户
                    var OAF = this.rightPadding(result.OAF)
                    // PAN值
                    var PAN = this.rightPadding(result.PAN)

                   

                   var fontEK = EK.substring(0,32)
                   var afterEK = EK.substring(32,64)
                  

                   var fontOAF = OAF.substring(0,32)
                   var afterOAF = OAF.substring(32,64)


                    // 把数据写进ICCard
                    var writeBlock = [1,4,5,12,13]
                    var writeBlockData = [PAN,fontEK,afterEK,fontOAF,afterOAF]
                    for (var i = 0; i < writeBlock.length; i++) {

                        if (this.ICCard.cardDirVerifyPassword(0,writeBlock[i],"201803191500")) {
                            this.ICCard.cardWriteHex(writeBlock[i],writeBlockData[i])
                        }else{
                            console.log('验证密码错误')
                            
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
                // 无论成功失败都关闭读卡器
                this.ICCard.readerClose()
                this.resetDisabled()
                this.resetShow()
                        
              })
        },

        /**
        *网络请求卡验证
        *PAN PAN值
        *FrameRF 数据区的值
        */
       QueryRFCodeStatus(PAN,FrameRF,resolve){

            this.loading = true
            var params = {
                UserId:window.sessionStorage.getItem('id'),
                RegionCode:window.sessionStorage.getItem('RegionCode'),
                PAN:PAN,
                FrameRF:FrameRF,   
                time:this.dataUtil.formatTime1(new Date()) 
            }

              console.log(JSON.stringify(params));
          
              var encryptParams = {
                evalue:this.$encrypt(JSON.stringify(params))
              }

              console.log(this.$encrypt(JSON.stringify(params)))

           
            this.http.post(this.api.baseUrl+this.api.QueryRFCodeStatus,encryptParams)
            .then(result=>{
                this.loading = false
                resolve(result)                       
            })
     

             
        },

        /**
        *充值
        */
        async GetFrameRechargeByPANForRF(){
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

            // 判断该卡是否有充值功能
          
            
            var num = await new Promise(resolve=>{
                this.readCard(resolve)
            })

            if ( num != 2 ) {
                alert("此卡没有该功能")
                this.resetShow()
                this.resetDisabled()
                this.ICCard.readerClose()
                return
            }


            this.$confirm(`确定要充值${this.topUpForm.Amount}元吗？`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {

              // 网络请求
              this.loading = true

                var params = {
                    PAN:this.blockData[0],
                    Amount:this.topUpForm.Amount ,
                    UserId:window.sessionStorage.getItem('id'),                                       
                    RegionCode:window.sessionStorage.getItem('RegionCode'),                   
                    TransactionType:'0',//充值
                    TransactionMode:'0',//视频卡
                    TransactionMethod:this.openUserForm.type,
                    time:this.dataUtil.formatTime1(new Date()) 
                }

                  console.log(JSON.stringify(params));
              
                  var encryptParams = {
                    evalue:this.$encrypt(JSON.stringify(params))
                  }

                  console.log(this.$encrypt(JSON.stringify(params)))

                  this.http.post(this.api.baseUrl+this.api.GetFrameRechargeByPANForRF,encryptParams)
                  .then(result=>{
                    this.loading = false
                    console.log(JSON.stringify(result))
                    if (result.status == '成功') {
                        
                        // 秘钥报文
                        var EK = this.rightPadding(result.EK)
                        // 开户
                        var RC = this.rightPadding(result.RC)

                       var fontEK = EK.substring(0,32)
                       var afterEK = EK.substring(32,64)
               
                       var fontRC = RC.substring(0,32)
                       var afterRC = RC.substring(32,64)


                        // 把数据写进ICCard
                        var writeBlock = [4,5,12,13]
                        var writeBlockData = [fontEK,afterEK,fontRC,afterRC]
                        console.log('开始充值')
                        for (var i = 0; i < writeBlock.length; i++) {

                            if (this.ICCard.cardDirVerifyPassword(0,writeBlock[i],"201803191500")) {
                                this.ICCard.cardWriteHex(writeBlock[i],writeBlockData[i])
                            }else{
                                console.log('验证密码错误')
                                return false
                            } 
                        }


                        this.$message({
                          type: 'success',
                          message: '充值成功!'
                       });    

                    }else{

                      this.$message({
                          type: 'error',
                          message: result.data
                       });
                      
                    }

                    // 无论成功失败都关闭读卡器
                    this.ICCard.readerClose()
                    this.resetDisabled()
                    this.resetShow()                           
                  })

            }).catch();
        },


        /**
        *异常卡结算
        */
        async SettlementAndClearCard(){
             // 网络请求
              this.loading = true
              var FrameRF = this.blockData[1]+this.blockData[2]+','+this.blockData[3]+this.blockData[4]+','+this.blockData[5]+this.blockData[6]+','+this.blockData[7]+this.blockData[8]
                var params = {
                    PAN:this.blockData[0],
                    UserId:window.sessionStorage.getItem('id'),                                       
                    RegionCode:window.sessionStorage.getItem('RegionCode'),                   
                    FrameRF:FrameRF,
                    time:this.dataUtil.formatTime1(new Date()) 
                }

                  console.log(JSON.stringify(params));
              
                  var encryptParams = {
                    evalue:this.$encrypt(JSON.stringify(params))
                  }

                  console.log(this.$encrypt(JSON.stringify(params)))

                 await this.http.post(this.api.baseUrl+this.api.SettlementAndClearCard,encryptParams)
                  .then(result=>{
                    this.loading = false
                    console.log(JSON.stringify(result))
                    if (result.status == '成功') {
                            
                        // 清空数据
                        if (result.ClearPAN.toUpperCase() == "TRUE") {
                            this.clearDataBlock(1)
                        }                    
                       this.clearDataBlock(4)
                       this.clearDataBlock(5)
                       this.clearDataBlock(8)
                       this.clearDataBlock(9)
                       this.clearDataBlock(12)
                       this.clearDataBlock(13)
                       this.clearDataBlock(16)
                       this.clearDataBlock(17)

                       var title = '异常结算成功'
                       var message = '退回金额' +result.Money +'元' 
                       this.$alert(message,title)

                          

                    }else{

                      this.$message({
                          type: 'error',
                          message: result.data
                       });
                      
                    }
                          
                  })
        },

        /**
        *销户
        */
        async GetFrameCancelAccountByPANForRF(){
            // 判断该卡是否有充值功能            
            var num = await new Promise(resolve=>{
                this.readCard(resolve)
            })

            if ( num != 2 ) {
                alert("此卡没有该功能")
                this.resetShow()
                this.resetDisabled()
                this.ICCard.readerClose()
                return
            }

             // 网络请求
              this.loading = true

                var params = {
                    PAN:this.blockData[0],
                    UserId:window.sessionStorage.getItem('id'),        
                    RegionCode:window.sessionStorage.getItem('RegionCode'),
                    time:this.dataUtil.formatTime1(new Date()) 
                }

                  console.log(JSON.stringify(params));
              
                  var encryptParams = {
                    evalue:this.$encrypt(JSON.stringify(params))
                  }

                  console.log(this.$encrypt(JSON.stringify(params)))

                  this.http.post(this.api.baseUrl+this.api.GetFrameCancelAccountByPANForRF,encryptParams)
                  .then(result=>{
                    this.loading = false
                    console.log(JSON.stringify(result))
                    if (result.status == '成功') {
                        // 要写入卡的数据
                        var CA = this.rightPadding(result.CA)


                       var fontCA = CA.substring(0,32)
                       var afterCA = CA.substring(32,64)
               



                        // 把数据写进ICCard
                        var writeBlock = [12,13]
                        var writeBlockData = [fontCA,afterCA]
                        console.log('开始充值')
                        for (var i = 0; i < writeBlock.length; i++) {

                            if (this.ICCard.cardDirVerifyPassword(0,writeBlock[i],"201803191500")) {
                                this.ICCard.cardWriteHex(writeBlock[i],writeBlockData[i])
                            }else{
                                console.log('验证密码错误')
                                return false
                            } 
                        }


                        this.$alert('销户成功,请进行刷表操作之后再进行销户退费','成功')
                       //  this.$message({
                       //    type: 'success',
                       //    message: '销户成功!'
                       // });    

                    }else{

                      this.$message({
                          type: 'error',
                          message: result.data
                       });
                      
                    }

                    // 无论成功失败都关闭读卡器
                    this.ICCard.readerClose()
                    this.resetDisabled()
                    this.resetShow()                           
                  })

        },

        /**
        *销户退费
        */
        async SettlementAndCancelAccountByPANForRF(){
             // 判断该卡是否有充值功能            
            var num = await new Promise(resolve=>{
                this.readCard(resolve)
            })

            if ( num != 4 ) {
                alert("此卡没有该功能")
                this.resetShow()
                this.resetDisabled()
                this.ICCard.readerClose()
                return
            }

             // 网络请求
              this.loading = true

              var FrameRF = this.blockData[1]+this.blockData[2]+','+this.blockData[3]+this.blockData[4]+','+this.blockData[5]+this.blockData[6]+','+this.blockData[7]+this.blockData[8]

                var params = {
                    PAN:this.blockData[0],
                    UserId:window.sessionStorage.getItem('id'),        
                    RegionCode:window.sessionStorage.getItem('RegionCode'),
                    FrameRF:FrameRF,
                    time:this.dataUtil.formatTime1(new Date()) 
                }

                  console.log(JSON.stringify(params));
              
                  var encryptParams = {
                    evalue:this.$encrypt(JSON.stringify(params))
                  }

                  console.log(this.$encrypt(JSON.stringify(params)))

                  this.http.post(this.api.baseUrl+this.api.SettlementAndCancelAccountByPANForRF,encryptParams)
                  .then(result=>{
                    this.loading = false
                    console.log(JSON.stringify(result))
                    if (result.status == '成功') {
                        // 清空所有PAN和数据区

                       this.clearDataBlock(1)
                       this.clearDataBlock(4)
                       this.clearDataBlock(5)
                       this.clearDataBlock(8)
                       this.clearDataBlock(9)
                       this.clearDataBlock(12)
                       this.clearDataBlock(13)
                       this.clearDataBlock(16)
                       this.clearDataBlock(17)

                       this.$alert(`退款金额${result.Money}元`,"销户退费成功")
                            

                    }else{

                      this.$message({
                          type: 'error',
                          message: result.data
                       });
                      
                    }

                    // 无论成功失败都关闭读卡器
                    this.ICCard.readerClose()
                    this.resetDisabled()
                    this.resetShow()                           
                  })
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