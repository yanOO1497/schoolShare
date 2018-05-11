// pages/feedback/feedback.js
var fetch = require('../../common/script/fetch')
var config = require('../../common/script/config')
var util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    textareaValue: '',
    pageNum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  textChange: function (event) {
    var that = this;
    that.setData({
      textareaValue: event.detail.value
    })
  },
  submit() {
    var that = this;
    if (that.data.textareaValue !== '') {
      //添加请求代码
      fetch._get(config.apiList.addToFeedback,
        {
          uid: config.openID,
          content: that.data.textareaValue
        },function (){
          that.setData({
            pageNum:1
          })
          setTimeout(function () {
            wx.navigateBack();
          }, 1000);
        }

      );

    } else {
      util.showText("请先输入反馈信息!");
    }
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