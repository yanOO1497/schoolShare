// pages/quesAndShare/quesAndSHare.js
var fetch = require('../../common/script/fetch');
var util = require('../../utils/util');
var config = require('../../common/script/config');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[],
    searchName:"",
    hasMore:true,
    count:20,
    start:0
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
    this.getData(0);
  },

  getData(start,getType="refresh"){
    let that = this;
    
      fetch._get.call(that, config.apiList.loadQuesAndShareList, {
        start: start,
        count: that.data.count,
        searchName: that.data.searchName
      }, function (res) {
        res.subjects.map((item, key, arr) => {
          if (item.picUrl !== "" && item.picUrl) {
            item.picUrl = item.picUrl.split(",");
          }
        })

        if (getType == "refresh") {
          that.data.listData = res.subjects;
        } else {
          that.data.listData = that.data.listData.concat(res.subjects);
        }
        if (res.subjects.length < that.data.count) {
          that.data.hasMore = false;
        } else {
          that.data.hasMore = true;
        }
        that.setData({
          listData: res.subjects,
          hasMore: that.data.hasMore
        })
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
    console.log("下拉刷新");
    let that = this;
    that.getData(0);
  },
  inputTyping(e) {
    console.log("子组件输入", e.detail.value);
    let that = this;
    that.setData({
      searchName: e.detail.value
    })
    this.getData(0, "refresh");
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("加载");
    let that = this;
    if (that.data.hasMore) {
      that.data.start = that.data.start + that.data.count; 
      that.refreshData(that.data.start);
    }else{
      console.log("已经到底部了");
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})