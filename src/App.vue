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
}

.el-table td, .el-table th{
  padding: 8px 0;
  height: 40px;
}

.monthTable .el-table td,.monthTable .el-table th{
  height: 48px;
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

  div.el-dialog{
    max-height: 800px;
    overflow-y: auto;
  }

  /*日期选择*/
  .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{
    width: 250px;
  }

  .month .el-date-editor.el-input{
    width: 120px;
  }

  .day .el-date-editor .el-range-input{
    width: 90px;
}

  .day .el-date-editor .el-range-separator{
  width: 26px;
}

</style>
