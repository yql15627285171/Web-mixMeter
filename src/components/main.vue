<template>
  <div class="main">
    <el-container>
      <!-- 头部 -->
      <el-header>
        <el-row type="flex" justify='space-between'>
          <el-col :span="12">
            <div class="system-name">社区服务管理系统</div>
          </el-col>
          <el-col :span="12">
            <div class="system-setting">
              <!-- <router-link :to="{name:'main'}" class="set">个人中心</router-link> -->
              <span class="set" @click="informationDialogVisible=true">个人中心</span>
              <span class="set" @click="psdDialogVisible = true">密码设置</span>
              <router-link :to="{name:'login'}" class="set">退出登录</router-link>
            </div>
          </el-col>
        </el-row>
      </el-header>


    <!-- 修改个人信息弹出框 -->
    <el-dialog title="个人信息" :visible.sync="informationDialogVisible">
      <el-form :model="informationForm">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="informationForm.name" auto-complete="off" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="informationForm.mobilePhone" auto-complete="off" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="社区地址" :label-width="formLabelWidth">
          <el-input v-model="informationForm.address" auto-complete="off" placeholder="请确定社区地址"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeInformation">修改</el-button>
      </div>
    </el-dialog>
  <!-- 修改密码弹出框 -->
    <el-dialog title="修改密码" :visible.sync="psdDialogVisible">
      <el-form :model="informationForm">
        <el-form-item label="旧的密码" :label-width="formLabelWidth">
          <el-input v-model="psdForm.oldPsd" auto-complete="off" placeholder="旧密码"></el-input>
        </el-form-item>
        <el-form-item label="新的密码" :label-width="formLabelWidth">
          <el-input v-model="psdForm.newPsd" auto-complete="off" placeholder="新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input v-model="psdForm.againPsd" auto-complete="off" placeholder="确定密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeInformation">修改</el-button>
      </div>
    </el-dialog>


      <!-- body内容 -->
       <el-container v-loading="loading" element-loading-text="拼命加载中">
          <el-aside width='200px' class='content-menus'>
            <!-- 功能菜单栏 -->
            <el-menu 
            :default-active="defaultActive" 
            class="el-menu-vertical-demo" 
            :collapse="isCollapse"
            @open="handleOpen" 
            @close="handleClose"
            v-if="menus.length>0"
            unique-opened>
            
              <el-submenu v-for="item in menus" :index="item.index">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{item.name}}</span>
                </template>
                <router-link 
                  v-for='child in item.child' 
                  :to="{name:child.index}"
                  @click.native="recordIndex(child.index)">
                  <el-menu-item :index="child.index" style="padding-left:50px;">
                    {{child.name}}
                  </el-menu-item>
                </router-link>
                
              </el-submenu>
            </el-menu>

          </el-aside>
          <!-- 社区房间选择 -->
          <el-aside width='200px'>
            
            <div class="selectTree" v-if="showSelect">
              <img :src="houseImg" @click='houseClick'>
              <img :src="gateImg" @click='gateClick'>
            </div>

            <el-input
            style="margin-top:15px"
              placeholder="输入关键字进行搜索"
              v-model="filterText">
            </el-input>
            <!-- 房间号选择 -->
            <el-tree  :data="showTreeData" 
                      :props="defaultProps" 
                      @node-click="handleNodeClick"
                      accordion
                      :filter-node-method="filterNode"
                      ref="tree">
                        
            </el-tree>
          </el-aside>
          <el-main>
            <keep-alive>
              <router-view ></router-view>
            </keep-alive>
          </el-main>
       </el-container>
      <!-- 脚部 -->
      <el-footer>
      
        
          <span>CopyRight © 2018 深圳市航天泰瑞捷电子有限公司 版权所有</span>
          <a href="http://www.miitbeian.gov.cn/" style="color:#fff">|粤ICP备17141636号-1</a>
          <a href="http://www.miitbeian.gov.cn/" >
          <img src="@/assets/ba.png" class="gongan"></a>
      
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      filterText:'',//搜索的关键字
     
      houseImg:require('../assets/house.png'), // 小图标路径
      gateImg:require('../assets/gate_unselect.png'),
      selectHouse:true,
      // 菜单栏默认展开的栏目
      defaultActive:"",
      // 个人中心弹出框
      informationDialogVisible:false,
      informationForm:{
        name:'',
        mobilePhone:'',
        address:''
      },
      formLabelWidth:'120px',
      psdDialogVisible:false,
      psdForm:{
        oldPsd:'',
        newPsd:'',
        againPsd:''
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
      LogicAddr:[
      {
        label:'123'
      },
      {
        label:'234'
      }],
      // 社区地址的显示
      // community:[],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      selectedArea:[],
    }
  },
  methods:{
      // 菜单栏事件
      handleOpen(key, keyPath) {
        console.log(keyPath);
      },
      handleClose(key, keyPath) {
        console.log(keyPath);
      },
      // 树的事件
      handleNodeClick(data) {
        console.log(data)
        this.$store.dispatch('setClickTreeData',data)
        
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
        .then(res=>{
          this.loading = false
          var result= JSON.parse(res.data.replace(/<[^>]+>/g, "").replace(/[' '\r\n]/g, ""))
           console.log(result)
          if (result.status=="成功") {
            // statement
            this.menus = result.menus

            this.defaultActive = window.sessionStorage.getItem('menuName') ? window.sessionStorage.getItem('menuName') : this.menus[0].child[0].index
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
      *修改个人信息
      */
      changeInformation(){
        // window.sessionStorage.setItem('isLogin',false)
      },

      /**
      *记录点击的子菜单的名字
      *页面刷新也调用此方法
      */
      recordIndex(name){
        // console.log(name)
        window.sessionStorage.setItem('menuName',name)

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

      },

      changeChildren(){
        this.community[0].children = this.LogicAddr
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

.el-header, .el-footer {
  background-color: #363636;
  color: #fff;
  text-align: center;
  line-height: 60px;
}
  
.el-aside {
  background-color: #fff;
  color: #333;
  text-align: center
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  /*text-align: center;*/
  /*line-height: 160px;*/
}

.system-name{
  text-align: left;
  font-size: 20px;
}

.system-setting{
  text-align: right;
}

.set{
  margin-left: 10px;
  color: #fff;
  cursor: pointer;
}

 .el-menu-vertical-demo:not(.el-menu--collapse) {
    /*width: px;*/
    min-height: 800px;
  }
  
  .el-submenu{
    text-align: left;
  }

.el-menu-item{
  text-align: left;
}

.el-tree{
  margin-top: 10px;
  min-height: 800px;

  min-height:250px;
  overflow-y:auto;
  max-height:600px;
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

</style>
