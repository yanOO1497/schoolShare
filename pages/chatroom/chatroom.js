// pages/chateRoom/chatroom.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData: {
      userId: "id",
      nickname: "名字",
      avaterUrl: "avater-holder.jpg"
    },
    chatData: [{"0":"这里是你发的消息"},
      { "1": "这里是我发的消息" },
      { "0": "这里是你发的消息" },
      { "0": "这里是你发的消息" },
      { "0": "这里是你发的消息" },
      { "1": "这里是我发的消息" },
      { "0": "这里是你发的消息" },
      { "0": "这里是你发的消息" },
      { "0": "这里是你发的消息" },
      { "1": "这里是我发的消息" },
      { "0": "这里是你发的消息" },
      { "0": "这里是你发的消息" },  
    ],
    myAvaterUrl: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      userData: options,
      myAvaterUrl: app.globalData.userInfo.avatarUrl
    })
    
    wx.setNavigationBarTitle({
      title: options.nickname//页面标题为路由参数
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