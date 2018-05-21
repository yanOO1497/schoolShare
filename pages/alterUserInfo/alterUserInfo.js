// pages/alterUserInfo/alterUserInfo.js
var fetch = require('../../common/script/fetch')
var config = require('../../common/script/config')
var util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    fetch._get.call(that, config.apiList.loadUserInfoDetails, { uid: config.openID },       function (res) {
      that.setData({
        userInfo: res.result
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

  submitData(e){
    let that = this;
    console.log("提交表单",e.detail.value);
    fetch._get.call(that, config.apiList.setUserInfo,
     { ...e.detail.value},function(res){
        if(res.code === 100){
          util.showText("更新成功");
        }else{
          util.showText(res.msg);
        }
    });
  },

  chooseSex(e){
    let that = this;
    wx.showActionSheet({
      itemList: ['女', '男'],
      success: function (res) {
        console.log(res.tapIndex)
        if (res.tapIndex === 0){
         
          that.data.userInfo.sex = 2;
        }else{
          that.data.userInfo.sex = 1;
        }
        that.setData({
          useInfo: that.data.userInfo
        })
         console.log(that.data.userInfo);
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
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