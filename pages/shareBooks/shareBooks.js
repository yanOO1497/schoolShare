// pages/shareBooks/shareBooks.js
var fetch = require('../../common/script/fetch')
var util = require('../../utils/util')
var config = require('../../common/script/config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowFixBar: true,
    showLoading: false,
    scrollTop: 0,
    floorstatus: false,
    navtab: {
      list: [{
        id: 'ebook',
        title: '电子书'
      }, {
        id: 'book',
        title: '实体书'
      }
      ],
      selectedId: 'ebook',
      scroll: true,
      height: 45
    },
    bookData: {
      ebook: [],
      book: []
    },
    bookType: 0,
    showBottomPopup:false
  },
  tabchange(e) {
    var that = this;
    that.data.navtab.selectedId = e.detail;
    // console.log(e.detail);
    if (e.detail == 'book'){
      that.data.bookType = 1;
    }else{
      that.data.bookType = 0;
    }
    // console.log(that.data.bookType);
    that.setData({
      navtab: that.data.navtab,
      bookType: that.data.bookType
    });
    this.refreshData(0);
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
    this.refreshData(0);
  },

  refreshData(start, refreshType = "refresh") {
    let that = this;
    let bookType = that.data.bookType;
    
    fetch._get.call(that,config.apiList.loadBookList, {
      start,
      bookType,
      count: 20
    }, function (res) {
      console.log("图书数据获取成功");
      if (bookType === 0) {//电子书
        that.data.bookData.ebook = res.subjects;
      } else {
        that.data.bookData.book = res.subjects;
      }
      that.setData({
        bookData: that.data.bookData
      })
    })
  },
  
  toPublish(){
    let that = this;
    let bookType = that.data.bookType;
    that.setData({
      showBottomPopup:true
    })
    // console.log(bookType);
    // wx.navigateTo({
    //   url: `../publish/publish?publishType=book&typeIndex=${bookType}`
    // })
  },
  scroll(e) {
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
  toggleBottomPopup(e){
    var that = this;
    // console.log(e);
    that.setData({
      showBottomPopup: false
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