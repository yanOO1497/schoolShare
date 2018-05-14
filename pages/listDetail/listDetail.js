
var fetch = require('../../common/script/fetch')
var util = require('../../utils/util')
var config = require('../../common/script/config')
let listTypeArr = config.typeList;
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
    commentData: [],
    typeIndex: 0,
    mid:1,
    listTypeArr,
    isDetail:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options);
    let { typeIndex, mid } = options;
    fetch._get.call(that,config.apiList.getMessageByMidAndType, { 'type': typeIndex, mid }, function (res) {
      if (res.result.picUrl !== "" && res.result.picUrl) {
        res.result.picUrl = res.result.picUrl.split(",");
        console.log(res.result.picUrl);
      }

      that.setData({
        commentData: res.subjects,
        listDetail: res.result,
        typeIndex,
        mid
      })
      console.log("进入进入",that.data.listTypeArr[that.data.typeIndex]);
    })
  },
  observeReply: function () {
    console.log("发送");
  },
  previewImg: function (e) {
    util.showImg(e.currentTarget.dataset.url);
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target);

    }
    let {mid , typeIndex} = this.data;
    return {
      title: '这里有个问题话题不错你要不要看看',
      path: `pages/listDetail/listDetail?mid=${mid}&typeIndex=${typeIndex}`,
      success: function (res) {
        // 转发成功
        util.showText("转发成功！");
      },
      fail: function (res) {
        // 转发失败
        util.showText("转发失败！");
      }
    }
  }
})