/**
*读取excel的数据
*file:读取的文件
*keys:表头
*getData:回调函数
*/
function readExcel(file,getData){
	// let _this = this;  


	var rABS = false; //是否将文件读取为二进制字符串  
	var f = file;  

	var reader = new FileReader();  



	  var binary = "";  
	  var rABS = false; //是否将文件读取为二进制字符串    
	  var wb; //读取完成的数据  
	  var outdata;  
	  var reader = new FileReader();  
	  reader.onload = function(e) {  
	      var bytes = new Uint8Array(reader.result);  
	      var length = bytes.byteLength;  
	      for(var i = 0; i < length; i++) {  
	      binary += String.fromCharCode(bytes[i]);  
	      }  
	      var XLSX = require('xlsx');  
	      if(rABS) {  
	      wb = XLSX.read(btoa(fixdata(binary)), { //手动转化  
	      type: 'base64'  
	      });  
	      } else {  
	      wb = XLSX.read(binary, {  
	      type: 'binary'  
	      });  
	      }  
	      outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);//outdata就是你想要的东西 
	      var head = []
	      for(let p in outdata[0]){
	      	head.push(p)
	      }
	      // console.log(head)
	   	 	
	   	 	// console.log(outdata)
	   	 	getData(outdata.map(v=>head.map(j=>v[j])),head,outdata)
	   	 	// getData(outdata,head)

		 }  


	reader.readAsArrayBuffer(f);
}


/**
*生成excel表格
*tHeader:表格的中文头
*filterVal:表头的英文key
*list:表格每一行的数据
*name:生成excel的名字
*/
function export2Excel(tHeader,filterVal,list,name) { 
　　　　　　require.ensure([], () => { 
　　　　　　　　const { export_json_to_excel } = require('@/vendor/Export2Excel'); 
// 　　　　　　　　const tHeader = ['序号', 'IMSI', ‘MSISDN’, ‘证件号码’, ‘姓名’]; 
// 　　　　　　　　const filterVal = [‘ID’, ‘imsi’, ‘msisdn’, ‘address’, ‘name’]; 
// 　　　　　　　　const list = this.tableData; 
　　　　　　　　const data = formatJson(filterVal, list); 
　　　　　　　　export_json_to_excel(tHeader, data, name); 
　　　　　　}) 
　　　　}

function formatJson(filterVal, jsonData) { 
　　return jsonData.map(v => filterVal.map(j => v[j])) 
}

export default{
	readExcel:readExcel,
	export2Excel:export2Excel
}














