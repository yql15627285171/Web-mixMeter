<template>
  <div class="main" >
    <div>
      <el-container>
      <!-- 头部 -->
      <el-header >
        <el-row type="flex" justify='space-between'>
          <el-col :span="12" style="text-align:left">
            <span class="system-name">社区服务系统</span>
            
          </el-col>
          <el-col :span="12">
            <div class="system-setting">
              <!-- <router-link :to="{name:'main'}" class="set">个人中心</router-link> -->
              
              <!-- <div class="set"> -->
                <el-tooltip class="item set" effect="light" content="修改个人信息" placement="bottom" >
                  <img src="../assets/edit.png" style="width:20px;height:20px;outline: none"  @click="getInfo">
                </el-tooltip>
              <!-- </div> -->

              <!-- <span class="set" > -->
                <el-tooltip class="item set" effect="light" content="修改密码" placement="bottom" >
                  <img src="../assets/psd.png" style="width:20px;height:20px;outline: none"@click="psdDialogVisible = true">
                </el-tooltip>
                
              <!-- </span> -->
              <!-- <span class="set" @click="logout"> -->
                <el-tooltip class="item set" effect="light" content="退出登录" placement="bottom">
                  <img src="../assets/logout.png" style="width:20px;height:20px;outline: none" @click="logout">
                </el-tooltip>
              <!-- </span> -->
                <el-tooltip class="item set" effect="light" content="更新日志" placement="bottom">
                  <i class="el-icon-question" style="font-size:20px;outline: none" @click="showUpdateLog"></i>
                </el-tooltip>

              <div style="display:inline-block">
              <div class="account">
                <img src="../assets/account.png" style='padding:0 5px 0 20px;'>
              <span >{{account}}</span>
              </div>
              
            </div>
            
            </div>
          </el-col>
        </el-row>
      </el-header>

      <el-main class='contentMain'>
        <el-header class="headerMenus">
          
          <el-row>
            <!-- <el-col :offset="1" :span="2">
              <div style="font-size:14px; cursor: pointer;" @click="fistPageClick">首页</div>
            </el-col> -->
            <el-col :offset="1":span="23">
              
                <el-menu
                  menu-trigger='hover'
                  :default-active="defaultActive" 
                  mode="horizontal"
                  v-if="menus.length>0"
                  background-color="#909399"
                  text-color="#fff"
                  active-text-color="#ffd04b"  
                  @select="handleSelect">
                 
                    <el-submenu v-for="(subitem,subIndex) in menus" :index="subitem.index" >
                      <template slot="title">
                        <div @click='fistPageClick(subitem.index)'>{{subitem.name}}</div>
                      </template>
                      <router-link 
                        v-for='child in subitem.child'
                        :to="{name:child.index}"
                        @click.native="recordIndex(child.index,subIndex)">
                        <el-menu-item :index="child.index">
                          {{child.name}}
                        </el-menu-item>
                      </router-link>
                      
                    </el-submenu>
                </el-menu>  
            </el-col>
          </el-row>
          
          
        </el-header>

        
        <el-container >

      
          <el-aside width='200px'>
            <div style='text-align:left'>
              <i class="el-icon-location" style="margin-left: 10px;color:#409EFF"></i>
              <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top:20px;font-size: 12px; display: inline-block;text-align:left">

                <el-breadcrumb-item>{{fatherName}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{childName}}</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            

            <div class="selectTree" v-if="showSelect">
              <img :src="houseImg" @click='houseClick'>
              <img :src="gateImg" @click='gateClick'>
            </div>

            <el-input
            style="margin-top:15px"
              placeholder="输入关键字进行搜索"
              v-model="filterText">
            </el-input>
        
            <el-tree  :data="showTreeData" 
                      :props="defaultProps" 
                      @node-click="handleNodeClick"
                      accordion
                      :filter-node-method="filterNode"
                      ref="tree"
                      >
                        
            </el-tree>
          </el-aside>
          <el-main class='contentTable'>
            <keep-alive>
              <router-view ></router-view>
            </keep-alive>
          </el-main>
          


        </el-container>
      </el-main>





  
      <!-- 脚部 -->
      <el-footer>      
        
          <span>CopyRight © 2018 深圳市航天泰瑞捷电子有限公司 版权所有</span>
          <a href="http://www.miitbeian.gov.cn/" style="color:#fff">|粤ICP备17141636号-2</a>
          <a href="http://www.miitbeian.gov.cn/" >
          <img src="@/assets/ba.png" class="gongan"></a>
      
      </el-footer>
    </el-container>
    </div>
    

    <!-- 修改个人信息弹出框 -->
    <el-dialog title="个人信息" :visible.sync="informationDialogVisible">
      <el-form :model="informationForm" :rules="infoRules" ref="informationForm" class="demo-ruleForm">

        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model.trim="informationForm.name"  placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth" prop="mobilePhone">
          <el-input v-model.trim="informationForm.mobilePhone"  placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="社区地址" :label-width="formLabelWidth">
          <el-input v-model.trim="informationForm.address"  placeholder="请确定社区地址"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="informationDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeInformation">修改</el-button>
      </div>
    </el-dialog>
  <!-- 修改密码弹出框 -->
    <el-dialog title="修改密码" :visible.sync="psdDialogVisible">

      <el-form :model="psdForm" :rules="psdRules" ref="psdForm" class="demo-ruleForm">

        <el-form-item label="旧的密码" :label-width="formLabelWidth" prop="oldPsd">
          <el-input v-model.trim="psdForm.oldPsd"  placeholder="旧密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新的密码" :label-width="formLabelWidth" prop="newPsd">
          <el-input v-model.trim="psdForm.newPsd"  placeholder="新密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth" prop="againPsd">
          <el-input v-model.trim="psdForm.againPsd"  placeholder="确定密码" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="psdDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePsd">修改</el-button>
      </div>
    </el-dialog>

    <!-- 更新日志 -->
    <el-dialog title="日志更新" :visible.sync="updateLogDialogVisible">
        <div style="height: 300px;overflow-y: auto;" v-if="versions.length > 0">
          <el-steps direction="vertical" :active="1">
            <el-step :title="versions[0].Ver" icon="el-icon-refresh" :description="versions[0].Info"></el-step>
            <el-step v-for="(item,index) in versions" v-if="index > 0" :title="item.Ver" icon="el-icon-time" :description="versions[0].Info"></el-step>
          </el-steps>
        </div>
  
    </el-dialog>

  </div>
</template>

<script>
export default {
  data () {
    // 密码的变量
    var validatePass2 = (rule, value, callback) => {
      // value = value.trim()
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.psdForm.newPsd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      if (value.length != 11) {
        callback(new Error('必须是11位数'));
      }else if(isNaN(parseInt(value))) {
        callback(new Error('必须数字'));
      }else {
        callback();
      }
    };
    return {
      account:window.sessionStorage.getItem('id'),
      fatherName:'',//功能路径名
      childName:'',//功能路径名
      filterText:'',//搜索的关键字
     
      houseImg:require('../assets/house.png'), // 小图标路径
     
      gateImg:require('../assets/gate_unselect.png'),
      
      selectHouse:true,
      
      defaultActive:"",// 菜单栏默认展开的栏目
      
      informationDialogVisible:false,// 个人中心弹出框

      updateLogDialogVisible:false,//更新日志

      dialogLoading:false,//转圈

      versions:[],//版本号

      informationForm:{
        name:'',
        mobilePhone:'',
        address:''
      },

      infoRules:{
        mobilePhone:[
          {validator: validatePhone},
   
        ],

      },

      formLabelWidth:'120px',
      psdDialogVisible:false,
      psdForm:{
        oldPsd:'',
        newPsd:'',
        againPsd:''
      },
      psdRules:{
        oldPsd:[{required: true, message: '密码不能为空', trigger: 'blur'}],
        newPsd:[{required: true, message: '密码不能为空', trigger: 'blur'}],
        againPsd:[{required:true, validator: validatePass2, trigger: 'blur' }],
      },
      // 加载县显示
      loading:false,
      // 菜单是否收起来
      isCollapse:false,
      // 菜单栏显示
      menus:[],
      // 显示的树的信息
      showTreeData:[],
      showSelect:false,
      //集中器列表
      LogicAddr:[],
      // 社区地址的显示
      // community:[],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      selectedArea:[],

      treeclickNum:0,//树节点点击次数
      oldtime:'',//第一次点击时间
      newtime:'',//第二次点击时间
      oldCode:'',//第一次点击的几点code
      newCode:'',//第二次点击的code
    }
  },
  methods:{
 
      // 菜单栏事件

      handleSelect(key, keyPath) {
          console.log(keyPath);
          var selectFatherItem = this.menus.filter(element=> {
            return (element.index == keyPath[0]);
          });
          this.fatherName = selectFatherItem[0].name

          var selectChildItem = selectFatherItem[0].child.filter(element=> {
            return (element.index == keyPath[1]);
          });

          this.childName = selectChildItem[0].name
        
          window.sessionStorage.setItem('fatherName',this.fatherName)
          window.sessionStorage.setItem('childName',this.childName)
          this.defaultActive = keyPath[1]
      },

      // 点击首页按钮
      fistPageClick(index){



        if (index == 'FirstPage') {
          this.$router.push({name:'FirstPage'})
          window.sessionStorage.setItem('fatherName','首页')
          this.fatherName = '首页'
          window.sessionStorage.setItem('childName','首页')
          this.childName = ''
          window.sessionStorage.setItem('menuName','FirstPage')
          this.defaultActive = null

        }
        

      },

      // 树的事件
      handleNodeClick(data) {
        console.log(data)
        this.$store.dispatch('setClickTreeData',data)

        // 双击弹框事件
        // this.treeclickNum ++ 
        // if(this.treeclickNum == 1){

        //   this.oldtime = new Date()
        //   this.oldCode = data.code
        //   console.log(this.oldCode)

        // }else if (this.treeclickNum == 2) {

    
        //   this.newtime = new Date()
        //   this.newCode = data.code
        //   console.log(this.newCode)
        //   // 点击的是同一个节点
        //   if (this.oldCode == this.newCode) {

        //     console.log(this.newtime - this.oldtime)
        //     if (this.newtime - this.oldtime < 500) {
        //       // 进行修改
        //       this.treeclickNum = 0
        //       alert(1)

        //     }else{
        //       this.treeclickNum = 1
        //       this.oldtime = new Date()
        //       this.oldCode = data.code
        //     }

        //   }else{
        //     console.log('不同节点')
        //     this.treeclickNum = 1
        //     this.oldtime = new Date()
        //     this.oldCode = data.code
        //   }

          
        // }


        
        
      },
      // 树的搜索框
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },

      // 级联选择器事件
       handleChange(value) {
        console.log(value);
      },

      /**
      *点击小图标
      */
      houseClick(){
       
          this.houseImg = require('../assets/house.png')
          this.gateImg= require('../assets/gate_unselect.png')
          this.showTreeData = this.treeData.Commmunity
      
      },
      gateClick(){
        this.houseImg = require('../assets/house_unselect.png')
        this.gateImg= require('../assets/gate.png')
        this.showTreeData = this.treeData.GWList
      },

      /**
      *每次刷新页面页面都做的网络请求
      *获取菜单信息
      */
      getMenus(){


        console.log('请求menus')
        this.loading = true
        var params = { 
          UserID:window.sessionStorage.getItem('id'),
          evalue:this.$encrypt()
        }
        // console.log(params)
        this.http.post(this.api.baseUrl+this.api.menus,params)
        .then(result=>{
          this.loading = false
          // var result= JSON.parse(res.data.replace(/<[^>]+>/g, "").replace(/[' '\r\n]/g, ""))
           console.log(result)
          if (result.status=="成功") {
            // statement
            this.menus = result.menus

            if (window.sessionStorage.getItem('menuName')!= null && window.sessionStorage.getItem('menuName') != 'FirstPage') {
              this.defaultActive =   window.sessionStorage.getItem('menuName')
            }else{
             
              // this.defaultActive = this.menus[0].child[0].index
              this.defaultActive = null
            }
            

            // 取路径
            if (window.sessionStorage.getItem('fatherName') != null) {
              this.fatherName = window.sessionStorage.getItem('fatherName')
              if (this.fatherName != '首页') {
                this.childName = window.sessionStorage.getItem('childName')
              }
              
            }else{
              this.fatherName = this.menus[0].name

              this.$router.push({name:'FirstPage'})

              // this.childName = this.menus[0].child[0].name
            }
          }
         
        })
      },

      /**
      *每次刷新页面页面都做的网络请求
      *获取树的信息
      */

      getTreeInfo(){
        
        // this.community = this.$store.getters.getTreeData

        var that = this
        this.data.getTreeData({
          succeed(res){
            that.$store.dispatch('reloadTreeData',res)

            // 当刷新的时候也要判断该记录的页面
            that.recordIndex(window.sessionStorage.getItem('menuName'))
          }
        })
       
      },

      /**
      *获取个人信息
      */
      getInfo(){

        this.informationDialogVisible=true
        var params = {
          UserId:window.sessionStorage.getItem('id'),
          time:this.dataUtil.formatTime1(new Date())
        }
        console.log(params)

        var encryptParams = {
            evalue:this.$encrypt(JSON.stringify(params))
          }

        console.log(this.$encrypt(JSON.stringify(params)))

        this.http.post(this.api.baseUrl + this.api.QueryUserInfoByID,encryptParams)
        .then(result=>{
          console.log(result)
          if (result.status == '成功') {
            this.informationForm.name = result.data[0].UserName 
            this.informationForm.mobilePhone = result.data[0].MobilePhone 
            this.informationForm.address = result.data[0].CustomerAddress
          }else{
            this.$message({
                  type: 'error',
                  message: result.data
               });
          }
        })

      },

      /**
      *修改个人信息
      */
      changeInformation(){
        // window.sessionStorage.setItem('isLogin',false)
        this.informationDialogVisible = false
          this.loading = true
          var params = {
            MobilePhone:this.informationForm.mobilePhone,
            UserId :window.sessionStorage.getItem('id'),
            UserName:this.informationForm.name,
            CustomerAddress:this.informationForm.address,
            time:this.dataUtil.formatTime1(new Date())
          }

          console.log(params);
          
          var encryptParams = {
            evalue:this.$encrypt(JSON.stringify(params))
          }

          console.log(this.$encrypt(JSON.stringify(params)))

          this.http.post(this.api.baseUrl+this.api.UpdateUserInfo,encryptParams)
          .then(result=>{
            this.loading = false
            console.log(result)
            if (result.status == '成功') {
                this.$message({
                  type: 'success',
                  message: '操作成功!'
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
      *显示版本更新信息
      */

      showUpdateLog(){
        // 网络请求
        this.dialogLoading = true

        var params = {
          UserID:window.sessionStorage.getItem('id'),
          time:this.dataUtil.formatTime1(new Date()) 
        }

        console.log(JSON.stringify(params));
          
        var encryptParams = {
          evalue:this.$encrypt(JSON.stringify(params))
        }

        console.log(this.$encrypt(JSON.stringify(params)))
        console.log(this.api.baseUrl+this.api.VersionDescription)
        this.http.post(this.api.baseUrl+this.api.VersionDescription,encryptParams)
            .then(result=>{
              console.log('jjj')
              this.dialogLoading = false

              if (result.status == "成功") {
                
               this.dialogLoading = false

                this.updateLogDialogVisible = true   

                this.versions = result.data

                console.log(result.data)
              }else{
                this.dialogLoading = false
                this.$message({

                  type: 'error',
                  message:result.data             
                });
              }
                                
            })

        
      },

      /**
      *记录点击的子菜单的名字
      *页面刷新也调用此方法
      */
      recordIndex(name,index){
       
        // console.log(name)
        window.sessionStorage.setItem('menuName',name)

        // 解决ie上点击后菜单栏子菜单不消失的问题
        var father = document.getElementsByClassName("el-submenu")

        if (typeof(father[index]) != 'undefined') {

          father[index].lastChild.style.display = "none"
        }

        
        
      

        // 在区域档案->计量表档案管理 和 终端操作的->表计控制的时候 ，数列表可选
        if (name == 'meterFiles' || name == 'MeterReadAndSet') {
          this.showSelect = true
          // 重新进入的时候都默认选择房间
          this.houseImg = require('../assets/house.png')
          this.gateImg= require('../assets/gate_unselect.png')
        }else {
          this.showSelect = false
        }

        if (name == "GateWayControl") {
          console.log('网关数')
          this.showTreeData = this.$store.state.treeData.GWList
        }else{
          this.showTreeData = this.$store.state.treeData.Commmunity
        }
        
        
        // 在终端操作 网关控制的时候，数列表只显示集中器，其他地方树列表显示房屋

      },
      /**
      *修改账号密码
      */
      changePsd(){

        if (this.psdForm.oldPsd == '' || this.psdForm.newPsd != this.psdForm.againPsd || this.psdForm.newPsd == '') {
                this.$message({
                  type: 'warning',
                  message: '请填写好信息!'
               });
            return
        }

        this.psdDialogVisible = false
          this.loading = true
          var params = {
            UserPwdOld:this.$encryptPsd(this.psdForm.oldPsd),
            UserPwd:this.$encryptPsd(this.psdForm.newPsd),
            UserId :window.sessionStorage.getItem('id'),
            time:this.dataUtil.formatTime1(new Date())
          }

          console.log(params);
          
          var encryptParams = {
            evalue:this.$encrypt(JSON.stringify(params))
          }

          console.log(this.$encrypt(JSON.stringify(params)))

          this.http.post(this.api.baseUrl+this.api.UpdateUserPassWord,encryptParams)
          .then(result=>{
            this.loading = false
            console.log(result)
            if (result.status == '成功') {
                this.$message({
                  type: 'success',
                  message: '操作成功!'
               });

            }else{

              this.$message({
                  type: 'error',
                  message: result.data
               });

            }
            
            
                    
          })
      },

      changeChildren(){
        this.community[0].children = this.LogicAddr
      },

      /**
      *退出登录
      */
      logout(){
        this.$router.push({name:'login'})
        window.sessionStorage.clear();

        // document.getElementById('menu').open(1)
      }



  },
  mounted(){
    
     if (window.sessionStorage.getItem('menuName') == 'meterFiles') {
      this.showSelect = true
    }



    this.getMenus()

    var that = this
    setTimeout(function(){
      that.getTreeInfo()
    },200) 

    
    
  },
  computed:{
    treeData(){
      console.log('treedata改变')
      return this.$store.state.treeData
    }
  },
  watch:{
    treeData(newValue){
      if (window.sessionStorage.getItem("menuName") == "GateWayControl") {
        this.showTreeData = newValue.GWList
      }else{
        this.showTreeData = newValue.Commmunity
      }
      
    },
    // 搜索框搜索
    filterText(val) {
        this.$refs.tree.filter(val);
      }

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .el-container{
    position: relative
  }

.el-header, .el-footer {
  background-color: #363636;
  color: #fff;
  text-align: center;
  line-height: 60px;
}

.el-header div{
  height: 60px;
}

/* .el-footer{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
} */

  
.el-aside {
  background-color: #fff;
  color: #333;
  text-align: center;
  min-height: 800px;
}

.contentTable {
  background-color: #E9EEF3;
  color: #333;
  min-height: 800px;
}

.contentMain{
  padding: 0;
  min-height: 860px;
}
.system-name{
  text-align: left;
  font-size: 20px;

  text-shadow: 2px 2px 10px red;
}

.system-setting{
  height: 100%;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  align-items: center;

}

.set{
  margin-left: 10px;
  color: #fff;
  cursor: pointer;
  /*display: inline-block;*/

}


 .headerMenus{
    background:#909399;

  }
  li.el-menu-item{
    text-align: left;

  }
  
 

.el-tree{
  padding-left: 10px;
  margin-top: 10px;
  min-height: 800px;

  min-height:250px;
  overflow-y:auto;
  max-height:600px;
  /*background-color: #A6BA9B;*/
}

.block{
  margin-bottom: 20px
}
.el-cascader{
  font-size: 12px;

  margin-top: 10px;
}

.demonstration{
  text-align: left;
}

/*选择数的内容的两个图标*/
.selectTree{
  text-align: left;
  margin-left: 16px;
}

.selectTree img{
  width: 25px;
  margin: 10px 30px 0 10px;
}

/*头像*/
.account{
  display: flex;
  align-items: center;

}

</style>
