export default {
	/* 下面的设置都是相对路径*/
	
	/**
	*基本路径
	*/
	baseUrl:'http://iot.trj-china.com/WebIOT.asmx',


	gdzc:'https://www.stsidea.com/weixin.asmx/HelloWorld',
	/**
	*登录接口
	*三个参数
	*	①userNo ：用户名
	*	②userPw ：密码   
	*	③evalue ：加密
	*/
	login:'/UserLoad',

	/**
	*获取用户具有的菜单功能选项
	*两个参数
	*userID 用户编号
	*evalue 加密参数
	*/
	menus:'/GetMenusByUserID'
}
