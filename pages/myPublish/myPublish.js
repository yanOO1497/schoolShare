// pages/myQuestion/myQuestion.js

var fetch = require('../../common/script/fetch')
var util = require('../../utils/util')
var config = require('../../common/script/config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    showLoading:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    that.getTableList.call(that,0, function (res){
      console.log(res.subjects);
      that.setData({
        listData: res.subjects,
        showLoading:false
      })
    });
  },
  //监听组件的删除函数
  observeDelete(e) {
    let that = this;
    let detail = e.detail; // 自定义组件触发事件时提供的detail对象
    console.log(detail);
    if (detail.deleteFlag) {
      fetch._get.call(that, config.apiList.deleteTableByMidAndType, {
        ...detail
      }, function () {
        util.showText("消息删除成功!");
        that.onLoad();
      })
    }
  },
  getTableList:function (start,cb){
    var that = this;
    fetch._get.call(that, config.apiList.loadTableListByUid, {
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