// pages/message/message.js
var fetch = require('../../common/script/fetch')
var util = require('../../utils/util')
var config = require('../../common/script/config')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    chatData: [],
    inputValue: "在吗在吗",
    start: 0,
    showNoData: false,
    showLoading: true,
    urlUid:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {



  },

  refreshData(start, refreshType = "refresh", cb) {
    let that = this;
    fetch._get.call(that, config.apiList.getChats, {
      start,
      count: 10
    }, function (res) {
      console.log("数据请求成功", res.subjects);
      for (let item of res.subjects) {
        if (item.toUid == config.openID) {
          item.toUid = item.uid;
          item.toAvatarUrl = item.nowAvatarUrl;
          item.toNickName = item.nowNickName;
        }
      }
      that.setData({
        chatData: res.subjects,
        showLoading: false
      })
      
      console.log()
    }
    )
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
    let that = this;
    // 获取用户信息
    if (config.openID) {
      that.refreshData(0);
    } else {
      util.getUserSet(function (userInfo) {
        console.log("登录成功", userInfo);
        that.refreshData(0);
      }, function () {
        console.log("获取用户数据失败");
      });

    }


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
    console.log("页面卸载");
    // this.closeConnect();
  },
  // inputTyping(e) {
  //   let that = this;
  //   that.setData({
  //     inputValue: e.detail.value
  //   });
  // },
  // connect() {
  //   let that = this;
  //   util.sentMsg({
  //     toUid: 'o2GCt4iaAWOlVDzD3XX1nxc-KYKY',
  //     message: that.data.inputValue
  //   });
  // },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  closeConnect() {
    wx.onSocketClose(function (res) {
      console.log('WebSocket 已关闭！')
    })
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