
var fetch = require('../../common/script/fetch')
var util = require('../../utils/util')
var config = require('../../common/script/config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listDetail: {
      selectedId: "wenda",
      avatarUrl: "https://pic.qqtn.com/up/2018-4/15241053731750196.jpg",
      nickName: "holy俊辉",
      title: "福大东门怎么走？",
      comment: "4",
      love: "3",
      isLove: true,
      time: "2017年6月5号",
      },
      commentData:[],
      typeIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(options);
    let { typeIndex,mid} = options;
      fetch._get(config.apiList.getMessageByMidAndType, { 'type': typeIndex,mid},function(res){
      that.setData({
        commentData: res.subjects,
        listDetail: res.result,
        typeIndex
      })
    })
  },
  observeReply:function (){
    console.log("发送");
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