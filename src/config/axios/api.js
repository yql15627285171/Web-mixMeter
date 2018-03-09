export default {
	/* 下面的设置都是相对路径*/
	
	/**
	*基本路径
	*/
	baseUrl:'http://iot.trj-china.com/WebIOT.asmx',


	// gdzc:'https://www.stsidea.com/weixin.asmx/HelloWorld',

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
	*serID 用户编号
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
}













