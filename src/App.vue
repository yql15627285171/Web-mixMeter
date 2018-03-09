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
/*element-UI需要修改的全局css*/
.el-table th{
	line-height:40px;
	height: 40px;
	padding: 0;
	text-align: center;
  /*color: red;*/
  /*background-color: blue*/
}
.el-table tr,
.el-table thead td{
	text-align: center
}
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 100px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
    text-align: left;
  }
  /*表格箭头下的标签*/
  label.el-form-item__label{
      width: 130px;
  } 
  form.el-form.demo-table-expand.el-form--label-left.el-form--inline{
    text-align: left;
  }

  /*分页控制器*/
  /*分页控制器*/
  .pagination{
    margin-top: 20px;
    text-align: center;
  }

</style>
