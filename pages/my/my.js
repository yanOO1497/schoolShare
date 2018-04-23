// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color:"#99CC33",
    points:"55",
    broadcast: "最新消息最新消息",
    list:[
      {
        name:"每日签到",
        url:"./message/message",
        iconClass:"icon-qiandao"
      },
      {
        name: "我的问答",
        url: "./message/message",
        iconClass: "icon-wenda"
      },
      {
        name: "我的分享",
        url: "./message/message",
        iconClass: "icon-fenxiang"
      },
      {
        name: "我的收藏",
        url: "./message/message",
        iconClass: "icon-shoucang"
      },
      {
        name: "意见反馈",
        url: "./message/message",
        iconClass: "icon-yijianfankui"
      },
      {
        name: "我的设置",
        url: "./message/message",
        iconClass: "icon-shezhi"
      },
    ]
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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