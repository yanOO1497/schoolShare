// pages/dataBase/dataBase.js
var fetch = require('../../common/script/fetch')
var util = require('../../utils/util')
var config = require('../../common/script/config')
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
    ],
    carousel:[],
    scrollTop:0
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
  toUpload(){
    
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
    this.getCarousel();
  },
  
  getCarousel(){
    let that = this;
    fetch._get.call(that, config.apiList.getCarousel,{
      count:10
    },function(res){
      console.log("获取轮播图成功 ",res);
      that.setData({
        carousel:res.subjects
      })
    })
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})