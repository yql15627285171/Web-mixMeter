import CryptoJS from './AES'
import dataUtil from './Date'

function encrypt(data){
	 var key = CryptoJS.enc.Latin1.parse('j>s%T.m8#2*6J\"t%r#a2#0*6');
	    var iv = CryptoJS.enc.Latin1.parse('s@ma<_2ro.T^&t\"j');

	    var ADEData
	    if(data == null){
	      ADEData = dataUtil.formatTime1(new Date())
	      // ADEData = '2017-10-31 15:31:02'
	    }else{
	      ADEData = data
	    }
	    // console.log(ADEData)
	    return CryptoJS.AES.encrypt(ADEData, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding }).toString();
}

export default{
  encrypt:encrypt,
  install(Vue,options){
     Vue.prototype.$encrypt =  function(data) {

	    var key = CryptoJS.enc.Latin1.parse('j>s%T.m8#2*6J\"t%r#a2#0*6');
	    var iv = CryptoJS.enc.Latin1.parse('s@ma<_2ro.T^&t\"j');

	    var ADEData
	    if(data == null){
	      ADEData = dataUtil.formatTime1(new Date())
	      // ADEData = '2017-10-31 15:31:02'
	    }else{
	      ADEData = data
	    }
	    // console.log(ADEData)
	    return CryptoJS.AES.encrypt(ADEData, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding }).toString();
		},


		Vue.prototype.$encryptPsd =  function(data) {

	    var key = CryptoJS.enc.Latin1.parse('j>r%T.w8#8*8J\"t%i#o8#8*8');
	    var iv = CryptoJS.enc.Latin1.parse('T@Rj<_2sb.T^&t\"j');


	    return CryptoJS.AES.encrypt(data, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding }).toString();
		}





	 }

}
