// pages/courseware/courseware.js
var fetch = require('../../common/script/fetch')
var util = require('../../utils/util')
var config = require('../../common/script/config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    course:[
      {
      courseName:"大物下历年卷大物下历年卷大物下历年卷大物下历年卷大物下历年卷大物下历年卷大物下历年卷",
      uid:"1",
      nickName:"花菜真好吃",
      avatarUrl:"http://qlogo4.store.qq.com/qzone/834728267/834728267/30",
      dec:"这里是课件描述信息这里是课件描述信息这里是课件描述信息这里是课件描述信息这里是课件描述信息",
      creatTime:"2017.12.4",
      downloadUrl:""
      }, {
        courseName: "大物下历年卷大物下历年卷大物下历年卷大物下历年卷大物下历年卷大物下历年卷大物下历年卷",
        uid: "1",
        nickName: "花菜真好吃",
        avatarUrl: "http://qlogo4.store.qq.com/qzone/834728267/834728267/30",
        dec: "这里是课件描述信息这里是课件描述信息这里是课件描述信息这里是课件描述信息这里是课件描述信息",
        creatTime: "2017.12.4",
        downloadUrl: ""
      },
    ],
    // isCanSearch:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },

  getData(getType, searchName,cb){
    let that = this,prames ={};
    if (getType === "search"){
      prames.searchName = searchName
    }
    fetch._get.call(that, config.apiList.searchCoursewareList,{
      start:0,
      count:5,
      ...prames
    },function(res){
      that.setData({
        course:res.subjects
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  inputTyping(e){
    console.log("子组件输入", e.detail.value);
    this.getData("search", e.detail.value);
  },
  searchData(e){
    // console.log("父组件接收到",e.detail.value);
    // this.getData("search", e.detail.value);
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