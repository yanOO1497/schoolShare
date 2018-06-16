// pages/login/login.js
var util = require('../../utils/util')
var config = require('../../common/script/config')
var fetch = require('../../common/script/fetch')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getuserinfo(res) {
    var that = this;
    config.userInfo = res.detail.userInfo;
    util.getUserInfo(function(res){
      fetch._get.call(that,config.apiList.saveUserInfo, {
        ...config.userInfo,
        sex: config.userInfo.gender,
        uid: config.openID
      }, function (res) {
        util.showText("用户信息录入成功"); 
        that.navBack();  
      }, function () {
        util.showText("用户信息录入失败");  
      })
    });
   
  },
  onLoad: function (options) {
  
  },
  navBack(){
    wx.navigateBack({
      delta:2
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})