<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/*element-UI需要修改的全局css*/
.el-table th{
	line-height:40px;
	height: 40px;
	padding: 0;
	text-align: center;
}
.el-table tr{
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

</style>
