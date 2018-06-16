var config = require('../common/script/config')
var fetch = require('../common/script/fetch')

let socketOpen = false;
let socketMsgQueue = [];
let socketTask;
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function getUserSet(cb, fail_cb) {
  wx.getSetting({
    success: res => {
      if (res.authSetting['scope.userInfo']) {
        console.log("已授权");
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          success: res => {
            config.userInfo = res.userInfo;
            // 可以将 res 发送给后台解码出 unionId
            var openID = wx.getStorageSync(res.userInfo.nickName + "openID");
            if (openID) {//openID存在
              config.openID = openID;
              typeof cb == 'function' && cb(res.userInfo)
              // return res.userInfo;
            } else {//openID不存在，重新登录获取，
              getUserInfo(cb, fail_cb);
            }
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          }
        })
      } else {//未授权，引导用户授权
        console.log("未授权");
        wx.navigateTo({
          url: '../../pages/login/login'
        })
        // getUserInfo(cb, fail_cb);
      }
    },
    fail: res => {
      console.log("进入fail");
      // wx.navigateTo({
      //   url: '../../pages/login/login'
      // })
      getUserInfo(cb, fail_cb);
    }
  })
}

function getUserInfo(cb) {
  wx.login({
    success: res => {
      var code = res.code;
      if (code) {
        wx.getUserInfo({
          success: function (res) {
            console.log("success", res);
            config.userInfo = res.userInfo;
            getOpenID(code, cb);
            // typeof cb == "function" && cb(config.userInfo)
          }
        })
      } else {
        console.log('获取用户登录失败！' + res.errMsg)
      }
    },
    fail: res => {
      console.log('获取用户登录失败！' + res)
      typeof fail_cb == 'function' && fail_cb()
    }
  })
}
function openSocket(cb, fail_cb) {
  console.log("正在连接websocket", config.openID);
  let url = 'ws://192.168.1.102:8082/school_share/websocket/' + config.openID
  socketTask = wx.connectSocket({
    url: url,
    success: function (res) {
      console.log("WebSocket连接连接成功", res.socketTaskId);
    }
  })
  wx.onSocketOpen(function (res) {
    console.log('WebSocket连接已打开！')
    socketOpen = true;
    typeof cb == 'function' && cb()
  })
  wx.onSocketError(function (res) {
    console.log('WebSocket连接打开失败，请检查！');
    typeof fail_cb == 'function' && fail_cb()
  })


}

function sentMsg(data) {
  let { message, toUid } = data;
  message = message + "|" + toUid;//将要发送的信息和内容拼起来，以便于服务端知道消息要发给谁
  if (socketOpen) {
    socketTask.sent({
      data: message
    })
    console.log("soket发送", message);
  } else {
    openSocket("soket发送" + function (res) {
      console.log(res);
      socketTask.sent({
        data
      })
    }, function () {
      socketMsgQueue.push(data);
    });
  }
}

function onSocketMessage(cb){
  wx.onSocketMessage(function (res) {
    console.log('收到服务器内容：' + res.data)
    typeof cb == 'function' && cb(res.data)
  })
}

function closeSocket() {
  socketTask.close();
}

function getOpenID(code, cb) {
  wx.request({
    url: config.apiList.getOpenID,
    data: {
      js_code: code
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      // console.log(res); 
      res.data = JSON.parse(res.data.data);
      
      // console.log("success", config.userInfo.nickName, "openID", res.data.openid);
      // var openid = res.data.openid //返回openid
      config.openID = res.data.openid;
      wx.setStorageSync(config.userInfo.nickName + "openID", config.openID);
      typeof cb == "function" && cb(config.userInfo)
    }
  })
  
}
function showToastSu(str) {
  wx.showToast({
    title: str,
    icon: 'success',
    duration: 1000
  });
}
function showConfirmModal(str, cb, cancel_cb) {
  /**
   * prames:
   * title:'提示'
   * content:'文本内容'
  */
  wx.showModal({
    content: str,
    success: function (res) {
      if (res.confirm) {
        typeof cb == 'function' && cb()
      } else if (res.cancel) {
        typeof cancel_cb == 'function' && cancel_cb()
      }
    }
  })
}
function showToastSu(str) {
  wx.showToast({
    title: str,
    icon: 'success',
    duration: 1000
  });
}
function showText(str) {
  wx.showToast({
    title: str,
    icon: 'none',
    duration: 1000
  });
}
function showImg(url) {
  let urlArr = [];
  urlArr.push(url);
  wx.previewImage({
    current: '',
    urls: urlArr,
    success: function (res) { },
    fail: function (res) { },
    complete: function (res) { },
  })
}
module.exports = {
  formatTime,
  getUserInfo,
  getUserSet,
  showText,
  showToastSu,
  showConfirmModal,
  showImg,
  sentMsg,
  openSocket,
  onSocketMessage
}
