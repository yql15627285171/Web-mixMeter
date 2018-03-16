<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',

}
</script>

<style>

.warning{
  color: #E6A23C;
}

.error{
  color: #F56C6C
}

.normal{
  color: #67C23A
}


/*element-UI需要修改的全局css*/
.el-table .table-head-th{
	line-height:40px;
	height: 40px;
	padding: 0;
	text-align: center;
  font-size: 14px;
}



.el-table tr{
	text-align: center;
  font-size: 13px;
  line-height:40px;
  height: 40px;

}

/*表格箭头下的标签*/
  .demo-table-expand {
    font-size: 0;
    display: flex;
    flex-wrap: wrap;
  }
  .demo-table-expand label {
    width: 130px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 45%;
    text-align: left;
  }
  
  
  /*分页控制器*/
  .pagination{
    margin-top: 20px;
    text-align: center;
  }

</style>
