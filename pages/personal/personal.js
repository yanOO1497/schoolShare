// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      nickName: "这里是名字",
      avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/NxZsHXwemD7L0cvJjYeRK3GWUApuXMeOSTdn6RrUCxEbYiaXzbLcKNIIJOLVQ0DqMYXIoGibT4pcVZz6ojehdUdw/0",
      points: 22,
      bio: "面朝大海，春暖花开"
    },
    navtab: {
      list: [{
        id: 'index',
        title: '他的动态'
      },
      {
        id: 'collect',
        title: '他的收藏'
      }],
      selectedId: 'index'
    },
    publishList: [{
      type: "share",
      nickName: "这里是名字",
      avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/NxZsHXwemD7L0cvJjYeRK3GWUApuXMeOSTdn6RrUCxEbYiaXzbLcKNIIJOLVQ0DqMYXIoGibT4pcVZz6ojehdUdw/0",
      content: "英语四六级和普通的日常英语不一样，毕竟是考试，要求的是笔试和听力，并没有口语，所以提升起来也可以相对的快一些。所以呢，我觉得只要有一点点的英语基础，加上自己的重视，过4，6级其实并不难。",
      comment: "33",
      love: "3",
      uid: "11",
      time:"2018.05.02"
    }, {
      type: "share",
      nickName: "这里是名字",
      avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/NxZsHXwemD7L0cvJjYeRK3GWUApuXMeOSTdn6RrUCxEbYiaXzbLcKNIIJOLVQ0DqMYXIoGibT4pcVZz6ojehdUdw/0",
      content: "英语四六级和普通的日常英语不一样，毕竟是考试，要求的是笔试和听力，并没有口语，所以提升起来也可以相对的快一些。所以呢，我觉得只要有一点点的英语基础，加上自己的重视，过4，6级其实并不难。",
      comment: "33",
      love: "3",
      uid: "11",
      time: "2018.05.02"
      }, {
        type: "share",
        nickName: "这里是名字",
        avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/NxZsHXwemD7L0cvJjYeRK3GWUApuXMeOSTdn6RrUCxEbYiaXzbLcKNIIJOLVQ0DqMYXIoGibT4pcVZz6ojehdUdw/0",
        content: "英语四六级和普通的日常英语不一样，毕竟是考试，要求的是笔试和听力，并没有口语，所以提升起来也可以相对的快一些。所以呢，我觉得只要有一点点的英语基础，加上自己的重视，过4，6级其实并不难。",
        comment: "33",
        love: "3",
        uid: "11",
        time: "2018.05.02"
      }],
    collectList: [{
      type: "share",
      nickName: "别人的名字",
      avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/NxZsHXwemD7L0cvJjYeRK3GWUApuXMeOSTdn6RrUCxEbYiaXzbLcKNIIJOLVQ0DqMYXIoGibT4pcVZz6ojehdUdw/0",
      content: "这里是收藏别人的",
      comment: "33",
      love: "3",
      uid: "11",
      time: "2018.02.02"
    }],
    navScroll:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var uid = options.uid;

  },
  tabchange: function (e) {
    var that = this;
    that.data.navtab.selectedId = e.detail;
    that.setData({
      navtab: that.data.navtab
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 页面滚动触发事件的处理函数
  onPageScroll: function (e){
    var that=this;
    // console.log(e.scrollTop);
    if(e.scrollTop > 221){
      that.setData({
        navScroll:true
      })
    }else{
      that.setData({
        navScroll: false
      })
    }
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
  onPullDownRefresh: function (e) {
  
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