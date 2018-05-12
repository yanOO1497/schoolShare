// pages/home/home.js
// import list from "../../templates/list/list.js";
var fetch = require('../../common/script/fetch')
var util = require('../../utils/util')
var config = require('../../common/script/config')
const app = getApp();
const typeArr = ["", "question", "share", "rewardhelp", "activity","secondarymarket"];
const apiList = config.apiList;
let api ={
  question:apiList.questionList, 
  share:apiList.loadExperienceList,

};
Page({

  /**
   * 页面的初始数据
   */

  data: {
    motto: '欢迎进入！',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    scrollTop: 0,
    floorstatus: false,
  
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    hasMore:true,
    start: 0,
    showLoading:true,
    //最新消息列表
    listData:{
      share: [],
      question: [],
      lectures: []

    },
    navtab: {
      list: [{
        id: 'question',
        title: '校内问答'
      }, {
        id: 'share',
        title: '经验分享'
      }, 
      {
        id: 'rewardhelp',
        title: '悬赏求助'
      }, 
      {
        id: 'activity',
        title: '校内活动'
      }, 
       {
         id: 'secondarymarket',
        title: '二手市场'
      }
      ],
      selectedId: 'question',
      scroll: true,
      height: 45
    }
  },//data
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showNavigationBarLoading();
    // 获取用户信息
    util.getUserSet(function (userInfo) {
      console.log("登录成功", userInfo);
      
    },function(){
      console.log("获取用户数据失败");
    });

  },
  enterDetail:function(){
    console.log("enter");
  },
  tabchange: function (e) {
    var that = this;
    that.data.navtab.selectedId = e.detail;
    that.setData({
      navtab: that.data.navtab
    });
    that.refreshData(0);
  },
  refreshData: function (start, refreshType = "refresh"){ 
    var that = this;
    let select = that.data.navtab.selectedId;
    fetch._get.call(that, apiList.loadTableList, {
      tableType: typeArr.indexOf(select),
      start: that.data.start,
      count: 20
    }, function (res) {
      wx.hideNavigationBarLoading();
      res.subjects.map((item,key,arr)=>{
        if (item.picUrl !== "" && item.picUrl){
          item.picUrl = item.picUrl.split(",");
        }
      }) 
      if (refreshType == "refresh"){
        that.data.listData[select] = res.subjects;
      }else{
        that.data.listData[select] = that.data.listData[select].concat(res.subjects);
      }
      console.log("页面刷新", select, that.data.listData[select]);
      that.setData({
        listData: that.data.listData,
        showLoading: false
      });
    }, function (res) {
      console.log("home get questionList fail");
    });
  },

  scroll:function (e){
    if (e.detail.scrollTop > 500) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },
  toTop:function(){
    console.log("返回顶部");
    this.setData({
      scrollTop: 0
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
    console.log("home显示");
    this.refreshData(0);
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

  },
  
})