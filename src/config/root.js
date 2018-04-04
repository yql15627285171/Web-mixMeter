/**
*这是一个将需要导入到main.js的全局引用文件
*/

import Vue from 'vue'

/**
*全局变量，指令，方法
*/
import index from './global'
Vue.use(index)

/**
*导入css的重置文件
*/
import './style/reset.css'


/**
*导入element-ui框架
*/
import './Element-UI/element'


/**
*导入AES加密文件
*/
import Encrypt from './AES/myAES'
Vue.use(Encrypt)

/**
*axios的配置
*/
import http from './axios/http'
Vue.prototype.http = http

import api from './axios/api'
Vue.prototype.api = api

import data from './axios/data'
Vue.prototype.data = data
/**
*excel导出导入配置
*/
import excel from './Excel/excel'
Vue.prototype.excel = excel

/**
*格式化时间
*/
import dataUtil from './AES/Date'
Vue.prototype.dataUtil = dataUtil












