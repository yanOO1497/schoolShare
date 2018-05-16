// pages/dataBase/dataBase.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gridList: [
      {
        name: "问答分享",
        urlName: "quesAndShare",
        iconClass: "icon-online"
      },
      {
        name: "课件资料",
        urlName: "courseware",
        iconClass: "icon-wenjian"
      },
      {
        name: "共享图书",
        urlName: "shareBooks",
        iconClass: "icon-zhishi"
      }
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
  jumpCheck: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    let urlName = that.data.gridList[index].urlName;
    wx.navigateTo({
      url: `/pages/${urlName}/${urlName}`
    })
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