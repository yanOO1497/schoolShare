// pages/chateRoom/chatroom.js
var fetch = require('../../common/script/fetch')
var util = require('../../utils/util')
var config = require('../../common/script/config')
let SocketTask;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chatData: [],
    myUserInfo: {},
    message: "",
    socketTaskId: 0,
    isConnect: false,
    nowUid: "",
    otherUserInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    config.userInfo.uid = config.openID;
    that.data.myUserInfo = config.userInfo;
    console.log("你好我是", that.data.myUserInfo);
    that.connectSocket();
    fetch._get.call(that, config.apiList.getChatLogDetails, {
      toUid: options.uid,
      start: 0,
      count: 10
    }, function (res) {
      if (!that.data.otherUserInfo.avatarUrl) {
        for (let item of res.subjects) {
          if (item.toUid == config.openID) {
            let { nowAvatarUrl, nowNickName, uid } = item;

            that.data.otherUserInfo = {
              nowAvatarUrl,
              nowNickName,
              uid
            }

          }
        }
      }
      that.setData({
        chatData: res.subjects,
        nowUid: config.openID,
        otherUserInfo: that.data.otherUserInfo,
        myUserInfo: that.data.myUserInfo
      })
      that.runToBottom();
      // console.log(that.data.chatData, that.data.myUserInfo, that.data.otherUserInfo);
    })
  },
  sentMessage(e) {
    let that = this;
    if (that.data.message !== "" && that.data.message) {

      that.data.chatData.push({
        content: that.data.message,
        uid: config.openID
      })

      let message = that.data.message + "|" + that.data.otherUserInfo.uid;//将要发送的信息和内容拼起来，以便于服务端知道消息要发给谁

      console.log("点击发送", that.data.otherUserInfo.uid, that.data.message);
      if (that.data.isConnect) {
        SocketTask.send({
          data: message,
          success: function (res) {
            console.log("数据发送成功", res);
            that.setData({
              message: "",
              chatData: that.data.chatData
            });
            that.runToBottom();
          }
        })

      }

     
    }
  },
  runToBottom(){
    let len = this.data.chatData.length;
    console.log("当前数组长度", len);
    this.setData({
      scrollTop:1000 * len
    })
  },
  connectSocket(cb) {
    let that = this;
    let url = config.apiList.webSocket + config.openID;
    SocketTask = wx.connectSocket({
      url: url,
      success: function (res) {
        console.log("WebSocket连接连接成功", res.socketTaskId);
        that.setData({
          socketTaskId: res.socketTaskId,
          isConnect: true
        })

        typeof cb == 'function' && cb(res)
      }
    })
    SocketTask.onMessage(function (res) {
      console.log("监听服务器发来的消息");
      that.getMessage(res.data);
    })


  },

  pageScrollToBottom: function () {
    wx.createSelectorQuery().select('#chatWrap').boundingClientRect(function (rect) {
      // 使页面滚动到底部
      wx.pageScrollTo({
        scrollTop: rect.bottom
      })
    }).exec()

  },
  inputTyping(e) {
    let that = this;
    that.setData({
      message: e.detail.value
    });
  },

  getMessage(str) {
    let that = this;
    console.log('收到服务器内容：', str);
    let msgsArr = str.split("|");
    let time = msgsArr.pop();
    that.data.chatData.push({
      content: msgsArr,
      uid: that.data.otherUserInfo.uid,
      createTime:time
    })

    that.setData({
      chatData: that.data.chatData
    })

    that.runToBottom();

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
    console.log("聊天室页面卸载");
    SocketTask.close(function (res) {
      console.log("聊天室页面断开链接成功", res);
    });
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