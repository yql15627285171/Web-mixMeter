export default {
	/* 下面的设置都是相对路径*/
	
	/**
	*基本路径
	*/
   // 申特
	// baseUrl:'https://www.trjiot.com/webiot.asmx',

   //  自己测试
   // baseUrl:'http://172.0.0.116/webiot.asmx',

   //1楼测试
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
   *增加房间信息_单个
   *FifthRegionName     五级区域名称（栋）
   *HouseRegionName     六级区域名称（房间）
   *UserId              操作者ID
   *RegionCode  四级区域码
   *HouseAera           面积
   **返回参数** 
   *成功或失败信息          
   */
   AddHouseInfoSingle:'/AddHouseInfoSingle',


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
   *修改房间名称
   *NewHouseName        房间新名称
   *HouseRegionName     六级区域名称（房间旧名称）
   *UserId              操作者ID
   *HouseRegionCode 六级区域码
   *RegionCode  四级区域码
   **返回参数**           
   *成功或失败信息
   */
   UpdateHouseRegionName:'/UpdateHouseRegionName',

   /**
   *导入网关  修改信息
   *UserId 		用户名
   *RegionCode 	区域编码
   *jsonValue 	表格内容
   *evalue 		加密参数
   */
   InputGWInfo:'/InputGWInfo',


   /**
   *增加集中器信息_单个
   *ConAssetsCode       集中器资产编码（12长度）
   *InstallAddr         安装地址
   *UserId              操作者ID
   *RegionCode  四级区域码
   *SIM                 SIM卡号
   *Memo                备注
   **返回参数** 
   *成功或失败信息          
   */
   AddInputGWInfoSingle:'/AddInputGWInfoSingle',

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
   *增加电表信息_单个
   *LogicAddr           集中器名称
   *FifthRegionName     五级区域名称（栋）
   *HouseRegionName     六级区域名称（房间）
   *UserId              操作者ID
   *RegionCode  四级区域码
   *MeterAssetsCode     电表资产号
   *MeasureId             测量点号：新增表：0，修改表传当前测量点
   **返回参数**
   *成功或失败信息           
   */
   AddMeterInfoSingle:'/AddMeterInfoSingle',

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
   *重新下发表档案
   *UserId       用户ID
   *RegionCode   四级区域码
   *LogicAddr    集中器地址
   *time        时间
   **返回参数**
     成功或失败原因
   */
   ReSetMeterFilesByData:'/ReSetMeterFilesByData',


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
   *time                   时间
   */
   QureyMonthData:'/QureyMonthData',

   /**
   *对账查询
   *RegionCode             四级或五级或六级code
   *UserId                 操作者ID
   *TimeStart              起始时间（无格式要求）
   *TimeEnd                截止时间（无格式要求）
   *time                   时间
   */
   QureyTransactionFile:'/QureyTransactionFile',

   /**
   *交易订单审核
   *TransactionOrder       交易订单号
   *UserId                 操作者ID
   */
   AuditTransaction:'/AuditTransaction',

   /**
   *登录日志查询
   *UserId       用户ID
   *TimeStart              起始时间（到秒）默认请求前48小时
   *TimeEnd                截止时间（到秒）默认请求时刻
   *time        时间
   **返回参数**           
   */
   QueryLoginInfo:'/QueryLoginInfo',

/**
   *操作日志查询
   *UserId       用户ID
   *TimeStart              起始时间（到秒）默认请求前48小时
   *TimeEnd                截止时间（到秒）默认请求时刻
   *time        时间
   **返回参数**           
   */
   QueryOprtcord:'/QueryOprtcord',


   /**
   *开户
   *HouseRegionCode 房间编号
   *Amount          充值金额 单位元
   *UserId          操作者ID
   *RegionCode      社区码
   *TransactionType  0充值1退费
   *TransactionMode  0 射频卡，1蓝牙，2 远程
   *TransactionMethod 0现金、1、微信2、支付宝3：银联4：其它
   *time               当前时间
   **返回参数**    
   *PAN               PAN
   *EK               密钥报文未分割
   *OAF              开户报文未分割       
   */
   GetFrameOpenAccountByPANForRF:'/GetFrameOpenAccountByPANForRF',

   /**
   *卡验证
   *UserId          操作者ID
   *RegionCode      社区码
   *PAN         PAN值
   *FrameRF         RF卡内容
   *time               当前时间
   **返回参数**    
   *CustomerInfo       用户信息    （成功失败均返回用户信息，可能为空） 
   *CardInfo           卡当前的状态 （成功失败均返回
   *data                失败信息，失败是传回
   */
   QueryRFCodeStatus:'/QueryRFCodeStatus',


   /**
   *充值
   *PAN         PAN值
   *Amount          充值金额 单位元
   *UserId          操作者ID
   *RegionCode      社区码
   *TransactionType  0充值1退费
   *TransactionMode  0 射频卡，1蓝牙，2 远程
   *TransactionMethod 0现金、1、微信2、支付宝3：银联4：其它
   *time               当前时间
   **返回参数**    
   *EK               密钥报文未分割
   *RC               充值报文未分割       
   */
   GetFrameRechargeByPANForRF:'/GetFrameRechargeByPANForRF',


   /**
   *异常清卡结算
   *UserId          操作者ID
   *RegionCode      社区码
   *PAN         PAN值
   *FrameRF         RF卡内容
   *time               当前时间
   **返回参数**    
   *CustomerInfo       用户信息    （成功失败均返回用户信息，可能为空） 
   *Money              退款金额 元（成功时返回
   *data                失败信息，失败是传回
   */
   SettlementAndClearCard:'/SettlementAndClearCard',

   /**
   *销户
   *PAN         PAN值
   *UserId          操作者ID
   *RegionCode      社区码
   *time               当前时间
   **返回参数**    
   *CA               销户报文未分割       
   */
   GetFrameCancelAccountByPANForRF:'/GetFrameCancelAccountByPANForRF',

   /**
   *销户退费
   *UserId          操作者ID
   *RegionCode      社区码
   *PAN         PAN值
   *FrameRF         RF卡内容
   *time               当前时间
   **返回参数**    
   *Money              退款金额 元（成功时返回
   *data                失败信息，失败是传回
   */
    SettlementAndCancelAccountByPANForRF:'/SettlementAndCancelAccountByPANForRF',


    /**
   *补卡（新卡）
   *UserId          操作者ID
   *RegionCode      社区码
   *HouseRegionCode 房间码
   *time               当前时间
   **返回参数**    
   *EK               密钥报文未分割
   *OAF              操作报文   
   *cardInfo         补卡的业务信息
   *data                失败信息，失败是传回
   */
    NewRFCardByHouseRegionCode:'/NewRFCardByHouseRegionCode',

/**
   *重写卡（验证卡返回‘重新卡’时执行）
   *UserId          操作者ID
   *RegionCode      社区码
   *PAN      PAN值
   *time               当前时间
   **返回参数**    
   *EK               密钥报文未分割
   *OAF              操作报文   
   *cardInfo         补卡的业务信息
   *data                失败信息，失败是传回
   */
    ReWriteRFCodeByPAN:'/ReWriteRFCodeByPAN',


   /**
   *设置变比
   *UserId       用户ID
   *CT           电流互感器变比
   *PT           电压互感器变比
   *HouseRegionCode 房间号
   *time        时间
   **返回参数**
   成功或失败+异常信息           
   */
   SetEMValuePTAndCT:'/SetEMValuePTAndCT',

   /**
   *抄读变比
   *UserId       用户ID
   *HouseRegionCode 房间号
   *time        时间
   **返回参数**   
   *date
   **CT           电流互感器变比
   **PT           电压互感器变比
   */
   ReadEMValuePTAndCT:'/ReadEMValuePTAndCT',
   

   /**
   *读取软件版本说明
   *UserId          操作者ID
   *time               当前时间
   **返回参数**    
   *data               软件版本信息说明内容
   */
    VersionDescription:'/VersionDescription',

    /**
   *设置电价
   *HouseRegionCode     房间名称
   *UserId              操作者ID
   *RPrice1     费率电价1
   *RPrice2     费率电价2
   *RPrice3 费率电价3
   *RPrice4     费率电价4
   **返回参数**
   *成功或失败信息           
   */
   SetEMValueRatesPrice:'/SetEMValueRatesPrice',


/**
   *读取电价
   *HouseRegionCode     房间名称
   *UserId              操作者ID
   **返回参数**           
   *成功返回电价或失败信息
   *RPrice1     费率电价1
   *RPrice2     费率电价2
   *RPrice3 费率电价3
   *RPrice4     费率电价4
   */
   ReadEMValueRatesPrice:'/ReadEMValueRatesPrice',

   /**
   *远程开户
   *HouseRegionCode 房间编号
   *Amount          充值金额 单位元
   *UserId          操作者ID
   *RegionCode      社区码
   *TransactionType    0充值1退费
   *TransactionMode    0射频卡，1蓝牙，【2 远程】
   *TransactionMethod  按最新文档说明
   *time               当前时间
   **返回参数**    
  *LastRecord          最后一次记录（成功时返回，定义不变
    */
   GetFrameOpenAccountyByHouseCode:'/GetFrameOpenAccountyByHouseCode',

   /**
   *远程充值
   *HouseRegionCode 房间编号
   *Amount          充值金额 单位元
   *UserId          操作者ID
   *RegionCode      社区码
   *TransactionType    0充值1退费
   *TransactionMode    0射频卡，1蓝牙，【2 远程】
   *TransactionMethod  按最新文档说明
   *time               当前时间
   **返回参数**    
  *LastRecord          最后一次记录（成功时返回，定义不变
     */
   GetFrameRechargeByHouseCode:'/GetFrameRechargeByHouseCode',

   /**
   *重新操作（类似卡重写）
   *UserId          操作者ID
   *RegionCode      社区码
   *HouseRegionCode 房间编号
   *time               当前时间
   **返回参数**    
   *LastRecord          最后一次记录（成功时返回，定义不变
   *CardType            卡当前的状态 （成功时返回，开户卡、充值卡、重写卡、销户退费卡（页面暂时不支持））
   *data                失败信息，失败时返回
   */
   ReOprtByHouseCode:'/ReOprtByHouseCode',

   /**
   *查看用户状态（类似卡验证）
   *UserId          操作者ID
   *RegionCode      社区码
   *HouseRegionCode 房间编号
   *time               当前时间
   **返回参数**    
   *LastRecord          最后一次记录（成功时返回，定义不变
   *CardType            卡当前的状态 （成功时返回，开户卡、充值卡、重写卡、销户退费卡（页面暂时不支持））
   *CustomerInfo       用户信息    （成功失败均返回用户信息，可能为空） 
   *data                失败信息，失败时返回
   */
   QueryEMSTSStatus:'/QueryEMSTSStatus',


   /**
   *查询告警事件
   *UserId       用户ID
   *TimeStart              起始时间（到秒）默认请求前48小时
   *TimeEnd                截止时间（到秒）默认请求时刻
   *time        时间
   **返回参数**
      **FifthRegionCode  5级区域码
      **HouseRegionCode  6级区域码 
      **FifthRegionCodeName  房间名      
      **MeterAddr    表计地址（下拉显示）  
      **RunStatus    运行状态字（下拉显示）  
      **ShowStatus   运行状态  
      **ReadDataTime   抄读时间 
      **UpdateTime   更新时间（下拉显示）  
   */
   QureyERStatus:'/QureyERStatus',

   /**
   *查询预付费表日抄读数据
   *UserId       用户ID
   *TimeStart              起始时间（到秒）默认请求前48小时
   *TimeEnd                截止时间（到秒）默认请求时刻
   *time        时间
   **返回参数**
      **FifthRegionCode  5级区域码
      **HouseRegionCode  6级区域码 
      **FifthRegionCodeName  房间名      
      **MeterAddr    表计地址（下拉显示）  
      **FreezeDate    冻结日期  
      **PowerPurchaseTimes   购电次数 
      **RemainAmount   剩余金额 
      **TotalPurchaseAmount  累计购电金额 
      **OverdraftAmount   透支金额
      **ReadDataTime   抄读时间 （下拉显示）
      **UpdateTime   更新时间（下拉显示）  
   */
   QureyPEDayData:'/QureyPEDayData',

   /**
   *获取手机验证码
   *mobile             手机号
   *time               当前时间
   **返回参数**    
    *成功或失败及信息
   */
  VerificationCode:'/VerificationCode',

  /**
   *首页内容
   *RegionCode      社区码
   *time        时间
   **返回参数**
      **status  成功或失败
      **data    数据
       *** DevOnline  在线数据
        ****GW 网关在线信息
         *****OnLine 在线数量
         *****Total 总数
        ****MT 电表在线信息（抄表成功率）
         *****OnLine 在线数量
         *****Total 总数
       *** EData  电能数据
        ****EYear 年电能（10年）
         *****FreezeDate 时标
         *****TotalPow 总量
        ****EMonth 月电能（12月）
         *****FreezeDate 时标
         *****TotalPow 总量
        ****EDay 日电能（30天）
         *****FreezeDate 时标
         *****TotalPow 总量
       *** MData  充值数据
        ****MWeek 本周充值
         *****TransactionMethod 充值方式
         *****TotalTransactionAmount 充值金额
        ****MMonth 本月充值
         *****TransactionMethod 充值方式
         *****TotalTransactionAmount 充值金额
        ****MDay 当天充值
         *****TransactionMethod 充值方式
         *****TotalTransactionAmount 充值金额
   */
   QueryHomePageData:'/QueryHomePageData',

}













