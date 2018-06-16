// pages/courseware/courseware.js

var util = require('../../utils/util')
var fetch = require('../../common/script/fetch')
var config = require('../../common/script/config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    course:[],
    noNetWork:false,
    showLoading:true,
    hasMore:true,
    page:1,
    key:""
    // isCanSearch:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData("search");
  },

  getData(getType,cb){
    let that = this,prames ={};
    let { key, page } = that.data;
    fetch._get.call(that, config.apiList.textbookSearch, {
      page,
      key
    }, function (res) {
      res.data = JSON.parse(res.data).data;
      console.log(res.data);   
      if (getType === "loadMore"){
        that.data.course = that.data.course.concat(res.data.list);
      }else{
        that.data.course = res.data.list;
      }
      that.setData({
        course: that.data.course,
        showLoading:false,
        total: res.data.total,
        current_page: res.data.current_page,
        last_page: res.data.last_page
      })
    })
  },
  inputTyping(e){
    // console.log("子组件输入", e.detail.value);
    let that = this;
    that.data.key = e.detail.value;
    that.data.page = 1;
    that.getData("search");
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
    // console.log("daodi la ");
    let that = this;
    let { current_page, last_page ,page} = that.data;
    if (current_page < last_page){
      that.data.page = page + 1;
      that.getData("loadMore");
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})