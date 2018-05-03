// pages/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: ["请选择","校内问答", "经验分享", "悬赏求助","失物招领", "二手市场"],
    typesIndex: 0,
    countryCodes: ["人民币", "积分"],
    countryCodeIndex: 0,
  },
  bindTypesChange: function (e) {
    // console.log('picker country 发生选择改变，携带值为', e.detail.value);

    this.setData({
      typesIndex: e.detail.value
    })
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