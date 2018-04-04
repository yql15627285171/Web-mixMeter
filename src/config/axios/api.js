export default {
	/* 下面的设置都是相对路径*/
	
	/**
	*基本路径
	*/
   // 申特
	// baseUrl:'https://www.trjiot.com/webiot.asmx',

   // 泰瑞捷
   baseUrl:'http://api.smart.trjiot.com/webiot.asmx',

	

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
   *获取个人信息： 名称、电话、地址
   *UserId             用户名
   *time               时间格式与以前相同 不用加密
   **返回参数**           
   *MobilePhone        电话
   *UserName           姓名
   *CustomerAddress    地址
   */
   QueryUserInfoByID:'/QueryUserInfoByID',

   /**
   *修改个人密码
   *UserPwdOld         原密码
   *UserPwd            密码
   *UserId             用户名
   *time               时间格式与以前相同 不用加密
   */
   UpdateUserPassWord:'/UpdateUserPassWord',

   /**
   *修改个人信息： 名称、电话、地址
   *MobilePhone        电话
   *UserId             用户名
   *UserName           姓名
   *CustomerAddress    地址
   *time               时间格式与以前相同 不用加密
   */
   UpdateUserInfo:'/UpdateUserInfo',


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
   *MeasureId 		测量点
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
   *读取当前值
   *UserId             微信openid
   *HouseRegionCode    房间编号     
   *ctrlType           指令类型：1当前电量，2剩余金额，3当前状态
   */
   ReadEMCurrentPara:'/ReadEMCurrentPara',

   /**
   *费控接口 用于电表拉合闸、报警、保电
   *UserId             用户号
   *HouseRegionCode    房间编号     
   *ctrlType           指令类型：1拉闸，2合闸，3报警，4报警解除，5保电，6保电解除
   */
   CtrlEMRelayStatu:'/CtrlEMRelayStatu',

   /**
   *读当电表当前状态值
   *UserId             用户号
   *RegionCode         区域码：可填写ALL、四级区域码、六级区域码
   *MeterKindId        电表类别：1、2、3、4
   *evalue             加密参数
   */
   QureyMeterCurrentStatusByRegionCode:'/QureyMeterCurrentStatusByRegionCode',

   /**
   *查看审核的房间
   *FourthRegionCode   社区区域编码
   *AdminId            管理员账号
   *ApplyStatus        状态："":空值标识获取全部信息，"0"：申请状态待审核，"1"：审核通过的
   *time               时间格式与以前相同 不用加密
   */
   QureyHouseApplyInfo:'/QureyHouseApplyInfo',

   /**
   *审核房间的绑定信息
   *HouseRegionCode    房间编码
   *AdminId            管理员账号
   *UserId             用户名
   *time               时间格式与以前相同 不用加密
   */
   ReviewAccessHouseInfo:'/ReviewAccessHouseInfo',


   /**
   *取消申请审核房间信息
   *HouseRegionCode         房间编码
   *UserId             用户名
   *time               时间格式与以前相同 不用加密
   */
   ApplyForRemoveHouseInfo:'/ApplyForRemoveHouseInfo',

   /**
   *日冻结数据
   *FourthRegionCode       四级code
   *TimeStart              起始时间（无格式要求）
   *TimeEnd                截止时间（无格式要求）
   *time        时间
   **返回参数**           
   */
   QureyEFDayData:'/QureyEFDayData',

   /**
   *月冻结数据
   *FourthRegionCode       四级code
   *TimeStart              起始时间（无格式要求）
   *TimeEnd                截止时间（无格式要求）
   *time        时间
   **返回参数**           
      **FifthRegionCode  5级区域码
      **HouseRegionCode  6级区域码 
      **FifthRegionCodeName  房间名      
      **LogicAddr    集中器地址（下拉显示）
      **MeterAddr    表计地址（下拉显示）
      **FreezeMonth  月结时标
      **FreezeDate   结算日时标
      **FreezeTotal  结算日总值
      **Freeze1      结算日值_尖（下拉显示）
      **Freeze2      结算日值_峰（下拉显示）
      **Freeze3      结算日值_平（下拉显示）
      **Freeze4      结算日值_谷（下拉显示）
      **LastFreezeDate  上结算日时标
      **LastFreezeTotal 上结算日总值 
      **LastFreeze1     结算日值_尖（下拉显示）
      **LastFreeze2     结算日值_峰（下拉显示）
      **LastFreeze3     结算日值_平（下拉显示）
      **LastFreeze4     结算日值_谷（下拉显示）
      **MonthPowerTotal 月用电总量
      **MonthPower1     月用电量_尖（下拉显示）
      **MonthPower2     月用电量_峰（下拉显示）
      **MonthPower3     月用电量_平（下拉显示）
      **MonthPower4     月用电量_谷（下拉显示）
      **UpdateTime       数据更新时间
   */
   QureyMonthData:'/QureyMonthData'

}













