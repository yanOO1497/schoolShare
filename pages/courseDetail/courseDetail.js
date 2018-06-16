// pages/courseDetail/courseDetail.js
var fetch = require('../../common/script/fetch');
var config = require('../../common/script/config');
let wxparse = require("../../wxParse/wxParse.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dkcontent:"",
    showLoading:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("进入", options)
    let that = this;
    fetch._get.call(that, config.apiList.chapterDetail,{
      id: options.id
    },function(res){
      res.data = JSON.parse(res.data).data;
      that.data.dkcontent = res.data.content;
      that.setData({
        showLoading:false
      })
      wxparse.wxParse('dkcontent', 'html', that.data.dkcontent, that, 5);  
      wx.setNavigationBarTitle({
        title: res.data.title//页面标题为路由参数
      })
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