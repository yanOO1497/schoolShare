// pages/listDetail/listDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: {
      "22": {
        type: "wenda",
        title: "福大东门怎么走？",
        comment: "4",
        love: "3",
        uid: "22",
        isLove: true,
        time: "2017年6月5号",
      },
      "23": {
        type: "wenda",
        nickName: "萌新萌新",
        avatarUrl: "https://pic.qqtn.com/up/2018-4/15241053731750196.jpg",
        title: "谁有高数下的历年卷？",
        // desc: "摘要摘要",
        comment: "33",
        love: "3",
        uid: "23",
        isLove: true,
        time: "2018年1月3号",
      }},
    listDetail: {
      type: "wenda",
      title: "福大东门怎么走？",
      comment: "4",
      love: "3",
      uid: "22",
      isLove: true,
      time: "2017年6月5号",
      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData=({
      listDetail: this.data.listData[options.listId],
    })
    console.log(this.data.listData[options.listId]);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("this.data.listDetail");
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