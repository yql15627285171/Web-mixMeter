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
              <router-link :to="{name:'main'}" class="set">个人中心</router-link>
              <router-link :to="{name:'main'}" class="set">系统设置</router-link>
              <router-link :to="{name:'main'}" class="set">退出登录</router-link>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <!-- body内容 -->
       <el-container v-loading="loading" element-loading-text="拼命加载中">
          <el-aside width='200px' class='content-menus'>
            <!-- 功能菜单栏 -->
            <el-menu 
            :default-active="menus[0].child[0].index" 
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
                <router-link v-for='child in item.child' :to="{name:child.index}">
                  <el-menu-item :index="child.index" style="padding-left:50px;">
                    {{child.name}}
                  </el-menu-item>
                </router-link>
                
              </el-submenu>
            </el-menu>

          </el-aside>
          <!-- 社区房间选择 -->
          <el-aside width='200px'>
            <!-- 地区选择 -->
            <div class="block">
              <!-- <span class="demonstration">请选择省市区</span> -->
              <el-cascader
                expand-trigger="hover"
                :options="areaData"
                v-model="selectedArea"
                @change="handleChange"
                placeholder="请选择省市区">
              </el-cascader>
            </div>
            <!-- 房间号选择 -->
            <el-tree :data="community" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
          </el-aside>
          <el-main>
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </el-main>
       </el-container>
      <!-- 脚部 -->
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 加载县显示
      loading:false,
      // 菜单是否收起来
      isCollapse:false,
      // 菜单栏显示
      menus:[],
      // 社区地址的显示
      community:[
      {
        label: '鹏兴花园',
          children: [
          {
            label: '1栋',
            children: [
              {
                label: '101'
              },
              {
                label:'201'
              },
              {
                label:'301'
              },
            ]
          },
          {
            label: '12栋',
            children: [
              {
                label: '301'
              },
              {
                label:'401'
              },
              {
                label:'501'
              },
            ]
          }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
      ,
      // 省市区级联选择变量
      areaData:[
      {
        value:'广东省',
        label:'广东省',
        children:[
        {
          value:'深圳市',
          label:'深圳市',
          children:[
          {
            value:'罗湖区',
            label:'罗湖区',
          },
          {
            value:'南山区',
            label:'南山区',
          }
          ]
        },
        {
          value:'广州市',
          label:'广州市',
          children:[
          {
            value:'白云区',
            label:'白云区',
          },
          {
            value:'天河区',
            label:'天河区',
          }
          ]

        }]
      }],
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
        if (!data.children) {
          console.log(data.label)
        }
      },
      // 级联选择器事件
       handleChange(value) {
        console.log(value);
      },
      /**
      *每次刷新页面页面都做的网络请求
      *获取菜单信息
      */
      getMenus(){
        this.loading = true
        var params = { 
          userID:window.localStorage.getItem('id'),
          evalue:this.$encrypt()
        }
        console.log(params)
        this.http.post(this.api.baseUrl+this.api.menus,params)
        .then(res=>{
          this.loading = false
          var result= JSON.parse(res.data.replace(/<[^>]+>/g, "").replace(/[' '\r\n]/g, ""))
           console.log(result)
          if (result.status=="成功") {
            // statement
            this.menus = result.menus
          }
         
        })
      }

  },
  mounted(){
    // console.log(this.$store.getters.getUserNum)
    // console.log(window.localStorage.ge  tItem('id'))
    this.getMenus() 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
  
.el-aside {
  background-color: #fff;
  color: #333;
  text-align: center;
  /*line-height: 200px;*/
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
  min-height: 800px;
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


</style>
