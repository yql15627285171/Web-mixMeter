export default {
	/* 下面的设置都是相对路径*/
	
	/**
	*基本路径
	*/
	baseUrl:'http://iot.trj-china.com/WebIOT.asmx',


	

	/**
	*测试接口
	*/
	test:'/HelloWorld',
	/**
	*登录接口
	*三个参数
	*	①userId ：用户名
	*	②userPwd ：密码   
	*	③evalue ：加密
	*/
	login:'/UserLoad',

	/**
	*获取用户具有的菜单功能选项
	*两个参数
	*UserID 用户编号
	*evalue 加密参数
	*/
	menus:'/GetMenusByUserID',

	/**
	*树列表数据的请求
	*RegionCode 	区域编码
	*evalue			加密参数
	*/
	QureyAllHouseInfoForFile:'/QureyAllHouseInfoForFile',

	/**
	*阿里云的全国省市区的接口
	*/
	remote_area_url:'http://jisuarea.market.alicloudapi.com/area/query',

   /**
   *搜狐接口 获取本机ip地址
   */
   localIP:'http://pv.sohu.com/cityjson',
	/**
	*获取所有社区管理员信息
	*evalue 加密参数
	*/
	QureyAllAdminInfo:'/QureyAllAdminInfo',

	/**
	*增加社区管理员
	*UserId 	用户名
	*UserPwd	密码
	*evalue 	加密参数
	*/
	AddNewCommmunity:'/AddNewCommmunity',


   /**
	*修改社区管理员信息
   *AdminId          超级管理员的ID
	*UserId  			用户号
	*FirstRegionName	一级区域
	*SecondRegionName 	二级区域
	*ThirdRegionName	三级区域
	*FourthRegionName   四级区域
	*GroupId 			组编号
	*RegionLevel 		区域级别	
	*evalue 			加密参数
	*/
	UpdateCommmunity:'/UpdateCommmunity',

	/**
	*导入excel表格更新房间信息
	*UserId 		登录的用户名
	*RegionCode 	区域编码
	*jsonValue 		表格内容的json格式
	*evalue			加密参数
	*/
	AddHouseInfo:'/AddHouseInfo',

	/**
	*区域管理的房间信息
	*RegionCode 	区域编码
	*evalue			加密参数
	*/

	QureyAllHouseInfoForForm:'/QureyAllHouseInfoForForm',

	/**
	*删除房间
	*UserId 			登录的用户名
	*HouseRegionCode  	房间编码
	*evalue				加密参数
	*/
   DeleteHouseInfo:'/DeleteHouseInfo',

   /**
   *导入网关  修改信息
   *UserId 		用户名
   *RegionCode 	区域编码
   *jsonValue 	表格内容
   *evalue 		加密参数
   */
   InputGWInfo:'/InputGWInfo',

   /**
   *获取社区网关信息
   *RegionCode 	区域编码
   *evalue 		加密参数
   */
   QureyAllGWInfoByRegionCode:'/QureyAllGWInfoByRegionCode',

   /**
   *删除网关信息
   *UserId 		用户名
   *LogicAddr 	集中器逻辑地址
   *evalue 		加密参数
   */
   DeleteGWInfo:'/DeleteGWInfo',

   /**
   *导入、修改表计档案
   *UserId 		用户号
   *RegionCode 	区域编码
   *jsonValue 	表格内容
   *evalue 		加密参数
   */
   InputMeterInfo:'/InputMeterInfo',

   /**
   *查询表计信息
   *RegionCode 	区域编码
   *evalue 		加密参数
   */
   QureyAllMeterInfoByRegionCode:'/QureyAllMeterInfoByRegionCode',

   /**
   *删除表计档案
   *UserId 		用户号
   *LogicAddr 	集中器逻辑地址
   *MeterAddr 	表计逻辑地址
   *Seq 		测量点
   *evalue 		加密参数
   */

   DeleteMeterInfo:'/DeleteMeterInfo',


   /**
   *设置表档案
   *UserId              用户号
   *RegionCode          四级区域码 
   *evalue              加密参数
   */

   SetMeterFilesByDataBaseToGW:'/SetMeterFilesByDataBaseToGW',


   /*集中器复位
   *UserId   	用户号
   *LogicAddr  	集中器逻辑地址
   *resetType  	复位列表：F1、F2、F3、F4
   *evalue   	加密参数
   */

   ResetGW:'/ResetGW',

   /**
   *设置集中器的心跳时间
   *UserId   	用户号
   *LogicAddr  	集中器逻辑地址
   *time  		心跳间隔 十进制数
   *evalue   	加密参数
   */

   SetGWHeartTime:'/SetGWHeartTime',

   /**
   *获取集中器的心跳时间
   *UserId   	用户号
   *LogicAddr  	集中器逻辑地址
   *evalue   	加密参数
   */

   GetGWHeartTime:'/GetGWHeartTime',


   /**
   *获取集中器的时间
   *UserId   	用户号
   *LogicAddr  	集中器逻辑地址
   *evalue   	加密参数
   */

   GetGWTime:'/GetGWTime',

   /**
   *设置集中器的时间
   *UserId   	用户号
   *LogicAddr  	集中器逻辑地址
   *evalue   	加密参数
   */

   SetGWTime:'/SetGWTime',


   /**
   *读取电表参数--通用方法
   *UserId   		用户号
   *LogicAddr    	集中器逻辑地址
   *MeterAddr     	通信地址
   *Code         	标识编码
   *readPara     	带参抄读
   *CommPort      	通信端口号
   *BaudRate      	通信波特率
   *evalue   		加密参数
   */

   ReadMeterValueByCode:'/ReadMeterValueByCode',

   /**
   *读当前有功总电量
   *UserId   用户号
   *HouseRegionCode    房间编号
   *evalue   加密参数
   */
   ReadMeterCurrentPower:'/ReadMeterCurrentPower',

   /**
   *远程跳闸指令
   *UserId   			用户号
   *HouseRegionCode    	房间编号
   *MeterKindId     	电表类别：1、2、3、4
   *evalue   			加密参数
   */

   CtrlMeterToTiaoZ:'/CtrlMeterToTiaoZ',

   /**
   *远程合闸指令
   *UserId   			用户号
   *HouseRegionCode    	房间编号
   *MeterKindId     	电表类别：1、2、3、4
   *evalue   			加密参数
   */
   CtrlMeterToHeZ:'/CtrlMeterToHeZ',

   /**
   *读当电表当前状态值
   *UserId             用户号
   *RegionCode         区域码：可填写ALL、四级区域码、六级区域码
   *MeterKindId        电表类别：1、2、3、4
   *evalue             加密参数
   */
   QureyMeterCurrentStatusByRegionCode:'/QureyMeterCurrentStatusByRegionCode',

}













