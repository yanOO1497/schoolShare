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
    myUserInfo:{},
    message:"",
    socketTaskId:0,
    isConnect:false,
    nowUid:""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.data.myUserInfo = config.userInfo;
    // that.data.nowUid = config.openID;
    console.log("你好我是", options.uid, config.openID);
    that.connectSocket();
    fetch._get.call(that, config.apiList.getChatLogDetails,{
      toUid: options.uid,
      start:0,
      count:10
    },function(res){
      console.log("聊天记录获取成功",res);
      that.setData({
        chatData: res.subjects,
        nowUid: config.openID
      })
      console.log(that.data.chatData, that.data.myUserInfo);
    })
  },
  sentMessage(e){
    let that = this;
    if (that.data.message !== "" && that.data.message){
      
      that.data.chatData.push({
        "1": that.data.message
      })
      // util.sentMsg({
      //   toUid: 'o2GCt4iaAWOlVDzD3XX1nxc-KYKY',
      //   message: that.data.message
      // });
      let message = that.data.message + "|" + that.data.userData.uid;//将要发送的信息和内容拼起来，以便于服务端知道消息要发给谁

      console.log("点击发送", that.data.userData.uid, that.data.message);
      if (that.data.isConnect){
        SocketTask.send({
          data: message,
          success:function(res){
            console.log("数据发送成功",res);
            that.setData({
              message: "",
              chatData: that.data.chatData
            });
          }
        })
        
      }
      
      console.log(that.data.chatData);
    }
  },
  connectSocket(cb){
    let that = this;
    let url = 'ws://192.168.1.102:8082/school_share/websocket/' + config.openID;
    SocketTask = wx.connectSocket({
      url: url,
      success: function (res) {
        console.log("WebSocket连接连接成功", res.socketTaskId);
        that.setData({
          socketTaskId: res.socketTaskId,
          isConnect:true
        })
        typeof cb == 'function' && cb(res)
      }
    })
  },
  inputTyping(e) {
    let that = this;
    that.setData({
      message: e.detail.value
    });
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