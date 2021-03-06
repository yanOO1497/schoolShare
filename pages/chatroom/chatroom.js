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
    otherUserInfo: {},
    hasMore:true,
    count:10,
    uid:"",
    start:0,
    isDisable:true,
    isFocus:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    config.userInfo.uid = config.openID;
    that.data.myUserInfo = config.userInfo;
    that.data.uid = options.toUid;
    console.log("你好我是", options);
    that.connectSocket();
    that.getChatLogDetails(0 , options);
  },
  getChatLogDetails(start,options,loadType = "load"){
    let that = this;
    fetch._get.call(that, config.apiList.getChatLogDetails, {
      toUid: options.uid,
      start: start,
      count: that.data.count
    }, function (res) {
      res.subjects.reverse();
      if (!that.data.otherUserInfo.avatarUrl && res.subjects.length !== 0) {
        for (let item of res.subjects) {
          if (item.toUid == config.openID) {
            let { nowAvatarUrl, nowNickName, uid } = item;
            that.data.otherUserInfo = {
              toAvatarUrl: nowAvatarUrl,
              toNickName: nowNickName,
              toUid: uid
            }

          } else {
            let { toAvatarUrl, toNickName, toUid } = item;
            that.data.otherUserInfo = {
              toAvatarUrl,
              toNickName,
              toUid
            }
          }
        }
        if (res.subjects.length < that.data.count){
          that.data.hasMore = false;
        }
        if(loadType === "loadMore"){
          res.subjects = that.data.chatData.concat(res.subjects);
          that.setData({
            chatData: res.subjects,
            nowUid: config.openID,
            otherUserInfo: that.data.otherUserInfo,
            myUserInfo: that.data.myUserInfo
          })
        }else{     
          that.setData({
            chatData: res.subjects,
            nowUid: config.openID,
            otherUserInfo: that.data.otherUserInfo,
            myUserInfo: that.data.myUserInfo
          })
          that.runToBottom();
        }
        
        wx.setNavigationBarTitle({
          title: "私信" + that.data.otherUserInfo.toNickName//页面标题为路由参数
        })
        
      } else if (res.subjects.length == 0) {
        that.setData({
          chatData: res.subjects,
          nowUid: config.openID,
          otherUserInfo: options,
          myUserInfo: that.data.myUserInfo
        })
        wx.setNavigationBarTitle({
          title: "私信" + that.data.otherUserInfo.nickName//页面标题为路由参数
        })
      } 
      console.log(that.data.otherUserInfo);
    })
  },
  sentMessage(e) {
    let that = this;
    console.log()
    let msg = e.detail.value.message;
      that.data.chatData.push({
        content: msg,
        uid: config.openID
      })
      let message = msg + "|" + that.data.otherUserInfo.toUid;//将要发送的信息和内容拼起来，以便于服务端知道消息要发给谁
      console.log("点击发送", that.data.otherUserInfo.toUid, that.data.message);
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

  },
  runToBottom(){
    let len = this.data.chatData.length;
    // console.log("当前数组长度", this.data.chatData);
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
  loadMore(){
    let that = this;
    let { start, count, hasMore } = that.data;
    that.data.start = start + count;
    if(hasMore){
      // that.getChatLogDetails(start,"loadMore");
      fetch._get.call(that,config.apiList.getChatLogDetails, {
        toUid: that.data.otherUserInfo.toUid,
        start: that.data.start,
        count: that.data.count
      }, function (res) {
        console.log(res.subjects);
        that.data.chatData = res.subjects.concat(that.data.chatData);
            if (res.subjects.length < count){
              that.data.hasMore = false;
            }
            that.setData({
              hasMore: that.data.hasMore,
              chatData: that.data.chatData
            })
      })
    }
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
    // let that = this;
    // that.setData({
    //   message: e.detail.value
    // });

    if (e.detail.value != "") {
      console.log("有文字");
      this.setData({
        isDisable: false
      })
    } else {
      this.setData({
        isDisable: true
      })
      console.log("meiweni");
    }
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