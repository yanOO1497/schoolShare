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
        console.log("用户信息录入成功");
        typeof cb == 'function' && cb()
      }, function () {
        console.log("用户信息录入失败");
      })
      wx.navigateBack({
        delta: 1,
      })
    });
   
  },
  onLoad: function (options) {
  
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