 //打开读写器
function readerOpen() {
    try{
        var version = MWRFATL.openReader(1, 9600);
        if (MWRFATL.LastRet != 0) {
            return false;
        }
        else {
            console.log(version)
            return true
        }
    }catch(e){
        console.log('连接读卡器异常')
        console.log(e)
        readerClose()
    }
    

}

//关闭读写器
function readerClose() {

    try {
        var result = MWRFATL.closeReader();
        if (MWRFATL.LastRet != 0) {
            return false
        }
        else {
            console.log('关闭读写器')
            return true
        }
    } catch(e) {
        // statements
        console.log('关闭读卡器异常')
        console.log(e);
    }
    
    
}

//读写器鸣响
function readerBeep() {
    try {
        MWRFATL.readerBeep(30);
        if (MWRFATL.LastRet != 0) {
            return false
        }else {
           return true 
        }
    } catch(e) {
        // statements
        console.log('鸣响异常')
        console.log(e);
        readerClose()

    }
    
 
}

//M1卡操作

/* 打开卡片
*openMode 0表示单次寻卡 1表示多次寻卡
*cardMode 10表示十进制  16表示16进制
*/
function openCard(openMode = 0 ,cardMode = 16){
    try {
      var result =  MWRFATL.openCard(openMode, cardMode);
        if (MWRFATL.LastRet != 0) {
            return false
        }
        else {
           return result
        }
    } catch(e) {
        console.log('打开卡片异常')
        console.log(e);
        readerClose()
    }
    
}


/**
*校验密码
*keyMode    0---验证 A 密码 4---验证 B 密码 
*block       要验证的块号
*key        密码
*/
function cardDirVerifyPassword(keyMode,block,key){
    try {
         MWRFATL.cardDirVerifyPassword(keyMode,block,key); 
        if (MWRFATL.LastRet != 0) {
           // console.log("校验失败")
            return false
        }
        else {
            // console.log("校验成功")
            return true
        }
    } catch(e) {
        // statements
        console.log('校验密码异常')
        console.log(e);
        readerClose()
    }
   
}

/**
*写数据,引函数只能写入16进制字符串,且长度必须为32位
*block: 要写入数据的块号
*data: 要写入的数据
*/
function cardWriteHex(block,data){
    try {
        for (var i = 0; i < 3; i++) {

            MWRFATL.cardWriteHex(block,data); 
            if (MWRFATL.LastRet != 0) {
                console.log('写入失败')
            }
            else {
                console.log('写入成功')
                return true
            }             

        }

        return false
        
    } catch(e) {
        // statements
        console.log('写数据异常')
        console.log(e);
        readerClose()
    }

    
}

/**
*以 16 进制字符串格式读数据
*block: 要读取数据的块号
*/
function cardReadHex(block){
    try {
            
        var result = MWRFATL.cardReadHex(block);
        if (MWRFATL.LastRet != 0) {
            return false
        }
        else {
            return result
        }

    } catch(e) {
        // statements
        console.log(e);
    }
    // try {
    //     var psd = "201803191500ff078069ffffffffffff"
    //     console.log(psd)
    //     if (cardDirVerifyPassword(0,block,psd)) {
    //         result = MWRFATL.cardReadHex(block);
    //         if (MWRFATL.LastRet != 0) {
    //             return false
    //         }
    //         else {
    //             console.log("数据"+result)
    //             return result
    //         }
    //     }else{
           
    //         console.log('密码校验失败')
    //         return false
    //     }
    // } catch(e) {
    //     // statements
    //     console.log('读数据异常')
    //     console.log(e);
    //     readerClose()

    // }
     
}





export default{
	readerOpen:readerOpen,
    readerClose:readerClose,
    openCard:openCard,
    cardDirVerifyPassword:cardDirVerifyPassword,
    cardWriteHex:cardWriteHex,
    cardReadHex:cardReadHex,


}

















