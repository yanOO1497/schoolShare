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
    isLogin: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    color: "#99CC33",
    points: "55",
    broadcast: "最新消息最新消息",
    gridList: [
      {
        name: "我的发布",
        urlName: "myPublish",
        iconClass: "icon-wenda"
      },
      {
        name: "我的收藏",
        urlName: "myCollect",
        iconClass: "icon-shoucang"
      },
      {
        name: "我的分享",
        urlName: "myShare",
        iconClass: "icon-fenxiang"
      },
      {
        name: "我的上传",
        urlName: "myUpload",
        iconClass: "icon-online"
      },
      {
        name: "意见反馈",
        urlName: "feedback",
        iconClass: "icon-yijianfankui"
      },
      {
        name: "我的设置",
        urlName: "setting",
        iconClass: "icon-shezhi"
      },
    ],
    showLoading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (config.openID !== 0) {
      fetch._get.call(that, config.apiList.loadUserInfoDetails, { uid: config.openID }, function (res) {
        that.setData({
          userInfo: res.result,
          isLogin: true,
          showLoading: false
        })
      })

    } else {
      util.getUserSet(function () {

        that.setData({
          userInfo: config.userInfo,
          isLogin: true
        })
      })
    }
  },
  scan: function () {
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },
  getUserInfo: function () {
    util.getUserInfo();
  },
  jumpCheck: function (e) {
    let that = this;

    if (that.data.isLogin) {
      let index = e.currentTarget.dataset.index;
      let urlName = that.data.gridList[index].urlName;
      wx.navigateTo({
        url: `/pages/${urlName}/${urlName}`
      })
    } else {

      util.showText("请先登录！");
      wx.navigateTo({
        url: '/pages/login/login'
      })
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
    let that = this;
    if (that.data.isLogin) {
      fetch._get.call(that, config.apiList.loadUserInfoDetails, { uid: config.openID }, function (res) {
        that.setData({
          userInfo: res.result,
          isLogin: true,
          showLoading: false
        })
      })
    }else{

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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },


})