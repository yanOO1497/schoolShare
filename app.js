//app.js
var config = require('common/script/config')
var util = require('utils/util')
const APP_ID = 'wx15734a2373afa7a8';//输入小程序appid  
const APP_SECRET = '10c27dc6070ef03f708ccdbe3c072e21';//输入小程序app_secret  
var OPEN_ID = ''//储存获取到openid  
var SESSION_KEY = ''//储存获取到session_key  
App({
  onLaunch: function () {
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    // 获取用户信息
    util.getUserSet(function(){
      console.log("suceess",config.openID);
    });
    
  },
  getUserInfo: function () {
    // util.getUserInfo();
  },
  
  globalData: {
    userInfo: null,
    tempUserInfo:null
  }
})