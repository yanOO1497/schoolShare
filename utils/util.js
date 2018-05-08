var config = require('../common/script/config')
var fetch = require('../common/script/fetch')
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
function getUserSet(cb, fail_cb){
  wx.getSetting({
    success: res => {
      if (res.authSetting['scope.userInfo']) {
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
              getUserInfo(cb,fail_cb);
            }
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          }
        })
      } else {//未授权，引导用户授权
        getUserInfo(cb, fail_cb);
      }
    },
    fail: res => {
      console.log("进入fail");
      getUserInfo(cb, fail_cb);
    }
  })
}

function getUserInfo (cb){
    wx.login({
      success: res =>{
        var code = res.code;
        if (code) {
          wx.getUserInfo({
            success: function (res) {
              console.log("success", res);
              config.userInfo = res.userInfo;
              getOpenID(code);
              typeof cb == "function" && cb(config.userInfo)
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

function getOpenID(code) {
  wx.request({
    url: 'https://api.weixin.qq.com/sns/jscode2session',
    data: {
      appid: config.APP_ID,
      secret: config.APP_SECRET,
      js_code: code,
      grant_type: 'authorization_code'
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      console.log("success", config.userInfo.nickName , "openID" , res.data.openid);
      // var openid = res.data.openid //返回openid
      config.openID = res.data.openid;
      wx.setStorageSync(config.userInfo.nickName + "openID", config.openID);
      fetch._get( config.apiList.saveUserInfo,{
        ...config.userInfo,
        sex: config.userInfo.gender,
        uid: config.openID
      },function(){
        console.log("用户信息录入成功");
      },function(){
        console.log("用户信息录入失败");
      })
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
function showConfirmModal(str,cb,cancel_cb){
  /**
   * prames:
   * title:'提示'
   * content:'文本内容'
  */
  wx.showModal({
    content:str,
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
function showText (str){
  wx.showToast({
    title: str,
    icon: 'none',
    duration: 1000
  });
}
module.exports = {
  formatTime: formatTime,
  getUserInfo: getUserInfo,
  getUserSet: getUserSet,
  showText: showText,
  showToastSu: showToastSu,
  showConfirmModal
 
}
