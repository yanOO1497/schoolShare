var fetch = require('../../common/script/fetch')
var util = require('../../utils/util')
var config = require('../../common/script/config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    showLoading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getTableList.call(that, 0, function (res) {
      console.log(res.subjects);
      that.setData({
        listData: res.subjects,
        showLoading: false
      })
    });
  },
  getTableList: function (start, cb) {
    var that = this;
    fetch._get.call(that, config.apiList.loadCollectList, {
      start: start,
      count: 20
    }, function (res) {
      res.subjects.map((item, key, arr) => {
        if (item.picUrl !== "" && item.picUrl) {
          item.picUrl = item.picUrl.split(",");
        }
      })
      typeof cb == 'function' && cb(res)
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