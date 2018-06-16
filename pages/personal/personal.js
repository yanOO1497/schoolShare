// pages/personal/personal.js
var fetch = require('../../common/script/fetch')
var config = require('../../common/script/config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      uid: "222",
      nickName: "这里是名字",
      avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/NxZsHXwemD7L0cvJjYeRK3GWUApuXMeOSTdn6RrUCxEbYiaXzbLcKNIIJOLVQ0DqMYXIoGibT4pcVZz6ojehdUdw/0",
      points: 22,
      bio: "个性签名",
      school: "福州大学",
      sex:2
    },
    isUser:false,
    listData:[],
    showLoading:true

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (options.uid == config.openID) {
      that.data.isUser = true;
    }
    fetch._get.call(that, config.apiList.loadUserInfoDetails, { uid: options.uid }, function (res) {
      that.setData({
        userInfo:res.result,
        isUser: that.data.isUser,
        listData: res.subjects,
        showLoading:false
      })
      
    })
    // that.getRencentList(options.uid);
  },

  getRencentList:function(uid){
    let that = this;
    fetch._get.call(that, config.apiList.loadTableListByUid, { uid,start:0, count:5 }, function (res) {
      that.setData({
        listData: res.result
      })

    })
  },

  tabchange: function (e) {
    var that = this;
    that.data.navtab.selectedId = e.detail;
    that.setData({
      navtab: that.data.navtab
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 页面滚动触发事件的处理函数
  onPageScroll: function (e) {
    var that = this;
    // console.log(e.scrollTop);
    if (e.scrollTop > 221) {
      that.setData({
        navScroll: true
      })
    } else {
      that.setData({
        navScroll: false
      })
    }
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
  onPullDownRefresh: function (e) {

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