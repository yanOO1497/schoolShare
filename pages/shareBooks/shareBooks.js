// pages/shareBooks/shareBooks.js
var fetch = require('../../common/script/fetch')
var util = require('../../utils/util')
var config = require('../../common/script/config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    floorstatus: false,
    isShowFixBar:true,
    showLoading:false,
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
    bookData:{
      ebook:[{
        bookName:"Flipped 怦然心动(英文版）",
        bookFace:"http://img3.imgtn.bdimg.com/it/u=1845856417,1610930162&fm=27&gp=0.jpg",
        nickName:"管理员",
        uid:1,
        avatarUrl:"http://p1.music.126.net/nGgD-KATh6k9VlVAxQs8CA==/1389782709815058.jpg?param=50y50",
        dec:"这是一部很不错的译文，用来学习英语很不错",
        createTime:"2018.5.13",
        downloadUrl:""
      },{
          bookName: "Flipped 怦然心动(英文版）",
        bookFace: "http://img3.imgtn.bdimg.com/it/u=1845856417,1610930162&fm=27&gp=0.jpg",
        nickName: "管理员",
        uid: 1,
        avatarUrl: "http://p1.music.126.net/nGgD-KATh6k9VlVAxQs8CA==/1389782709815058.jpg?param=50y50",
        dec: "这是一部很不错的译文，用来学习英语很不错",
        createTime: "2018.5.13",
        downloadUrl: ""
        },{
          bookName: "Flipped 怦然心动(英文版）",
          bookFace: "http://img3.imgtn.bdimg.com/it/u=1845856417,1610930162&fm=27&gp=0.jpg",
          nickName: "管理员",
          uid: 1,
          avatarUrl: "http://p1.music.126.net/nGgD-KATh6k9VlVAxQs8CA==/1389782709815058.jpg?param=50y50",
          dec: "这是一部很不错的译文，用来学习英语很不错",
          createTime: "2018.5.13",
          downloadUrl: ""
      },{
        bookName: "Flipped 怦然心动(英文版）",
        bookFace: "http://img3.imgtn.bdimg.com/it/u=1845856417,1610930162&fm=27&gp=0.jpg",
        nickName: "管理员",
        uid: 1,
        avatarUrl: "http://p1.music.126.net/nGgD-KATh6k9VlVAxQs8CA==/1389782709815058.jpg?param=50y50",
        dec: "这是一部很不错的译文，用来学习英语很不错",
        createTime: "2018.5.13",
        downloadUrl: ""
      }],
      book: [{
        bookName: "Flipped 怦然心动(英文版）",
        bookFace: "http://img3.imgtn.bdimg.com/it/u=1845856417,1610930162&fm=27&gp=0.jpg",
        nickName: "管理员",
        uid: 1,
        avatarUrl: "http://p1.music.126.net/nGgD-KATh6k9VlVAxQs8CA==/1389782709815058.jpg?param=50y50",
        dec: "这是一部很不错的译文，用来学习英语很不错",
        createTime: "2018.5.13",
        downloadUrl: ""
      }, {
        bookName: "Flipped 怦然心动(英文版）",
        bookFace: "http://img3.imgtn.bdimg.com/it/u=1845856417,1610930162&fm=27&gp=0.jpg",
        nickName: "管理员",
        uid: 1,
        avatarUrl: "http://p1.music.126.net/nGgD-KATh6k9VlVAxQs8CA==/1389782709815058.jpg?param=50y50",
        dec: "这是一部很不错的译文，用来学习英语很不错",
        createTime: "2018.5.13",
        downloadUrl: ""
      }, {
        bookName: "Flipped 怦然心动(英文版）",
        bookFace: "http://img3.imgtn.bdimg.com/it/u=1845856417,1610930162&fm=27&gp=0.jpg",
        nickName: "管理员",
        uid: 1,
        avatarUrl: "http://p1.music.126.net/nGgD-KATh6k9VlVAxQs8CA==/1389782709815058.jpg?param=50y50",
        dec: "这是一部很不错的译文，用来学习英语很不错",
        createTime: "2018.5.13",
        downloadUrl: ""
      }, {
        bookName: "Flipped 怦然心动(英文版）",
        bookFace: "http://img3.imgtn.bdimg.com/it/u=1845856417,1610930162&fm=27&gp=0.jpg",
        nickName: "管理员",
        uid: 1,
        avatarUrl: "http://p1.music.126.net/nGgD-KATh6k9VlVAxQs8CA==/1389782709815058.jpg?param=50y50",
        dec: "这是一部很不错的译文，用来学习英语很不错",
        createTime: "2018.5.13",
        downloadUrl: ""
      }]
    },
    bookType:0

  },
  tabchange(e) {
    var that = this;
    that.data.navtab.selectedId = e.detail;
    that.setData({
      navtab: that.data.navtab
    });
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
 
  refreshData(start, refreshType = "refresh"){
    let that = this;
    let bookType = that.data.bookType;
   fetch._get(config.apiList.loadBookList,{
     start,
     bookType,
     count:20 
   },function(res){
     console.log("图书数据获取成功");
     if (bookType === 0){//电子书
       that.data.bookData.ebook = res.subjects;
     }else{
       that.data.bookData.book = res.subjects; 
     }
    that.setData({
      bookData: that.data.bookData
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