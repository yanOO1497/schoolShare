var util = require('../../utils/util')
var config = require('../../common/script/config')
var fetch = require('../../common/script/fetch')
const app = getApp();
console.log(app.globalData);
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    color:"#99CC33",
    points:"55",
    broadcast: "最新消息最新消息",
    list:[
      {
        name:"每日签到",
        url:"../setting/setting",
        iconClass:"icon-qiandao"
      },
      {
        name: "我的问答",
        url: "../setting/setting",
        iconClass: "icon-wenda"
      },
      {
        name: "我的分享",
        url: "../setting/setting",
        iconClass: "icon-fenxiang"
      },
      {
        name: "我的收藏",
        url: "../setting/setting",
        iconClass: "icon-shoucang"
      },
      {
        name: "意见反馈",
        url: "../feedback/feedback",
        iconClass: "icon-yijianfankui"
      },
      {
        name: "我的设置",
        url: "../setting/setting",
        iconClass: "icon-shezhi"
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (config.openID !== 0) {
      fetch._get.call(that, config.apiList.loadUserInfoDetails, { uid: config.openID }, function (res) {
        console.log(res.result);
        that.setData({
          userInfo: res.result,
          hasUserInfo: true
        })
      })
      
    } else {
      util.getUserSet(function(){

        that.setData({
          userInfo: config.userInfo,
          hasUserInfo: true
        })
      })
    }
  },
  scan:function(){
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },
  getUserInfo:function(){
    util.getUserInfo();
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