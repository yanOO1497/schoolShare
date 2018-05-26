// pages/setting/setting.js
var fetch = require('../../common/script/fetch')
var util = require('../../utils/util')
var config = require('../../common/script/config')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    asyncWechat: {
      checked: true,
      loading: true
    },
    asyncQQ: {
      checked: true,
      loading: true
    },
    showLoading:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    fetch._get.call(that, config.apiList.loadUserInfoDetails,{
      uid:config.openID
    },function(res){
      let { showQQ, showWechat } = res.result;   
      showQQ = showQQ === 1 ? true : false;
      showWechat = showWechat === 1 ? true : false;
      console.log(showQQ, showWechat);
      that.setData({
        'asyncQQ.checked': showQQ,
        'asyncWechat.checked': showWechat,
        'asyncQQ.loading': false,
        'asyncWechat.loading': false,
        showLoading:false
      })
    })
  },
  asyncChangeWechat({ detail }) {
    let that = this, flag = 0;
    // console.log("点击切换", detail);
    if (detail.checked) {
      flag = 1;
    }
    this.setData({
      'async.loading': true
    });
    fetch._get.call(that, config.apiList.toggleShowWechat, {
      flag
    }, function (res) {
      that.setData({
        'asyncWechat.loading': false,
        'asyncWechat.checked': detail.checked
      });
    })

    // setTimeout(() => {
    //   this.setData({
    //     'async.loading': false,
    //     'async.checked': detail.checked
    //   });
    // }, 500);
  },
  asyncChangeQQ({ detail }) {
    let that = this, flag = 0;
    console.log("点击切换成", detail.checked);
    if (detail.checked) {
      flag = 1;
    }
    this.setData({
      'async.loading': true
    });
    fetch._get.call(that, config.apiList.toggleShowQQ, {
      flag
    }, function (res) {
      that.setData({
        'asyncQQ.loading': false,
        'asyncQQ.checked': detail.checked
      });
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