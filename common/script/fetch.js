var config = require('./config.js')
// var qiniu = require('./qiniu.js')
// 获取
function _get(url, prames, cb, fail_cb) {
  var that = this;
  that.setData({
    showLoading:true,
    message:[]
  })
  wx.request({
    url: url,
    data: {
      ...prames,
      nowUid:config.openID
    },
    method: 'GET',
    header: {
      "content-Type": "application/json,application/json"
    },
    success: function (res) {
      typeof cb == 'function' && cb(res.data)
    },
    fail: function (res) {
      that.setData({
        showLoading: false,
        message:{
          content: '网络开小差了',
          icon: 'offline',
          duration: 3000,
          visiable:true
        }
      })
      console.log("fail");
      typeof fail_cb == 'function' && fail_cb()
    }
  })
}


/**
 * prames
 * url: constant.SERVER_URL + "/FileUploadServlet"
 * filePath: path[0]
 * name: 'file'
*/
function _uploadFile(prames,cb,fail_cb){
  wx.showToast({
    icon: "loading",
    title: "正在上传"
  }),
    wx.uploadFile({
    ...prames,
      header: { "Content-Type": "multipart/form-data" },
      // formData: {
      //   //和服务器约定的token, 一般也可以放在header中
      //   'session_token': '',
      //   'uid': 1,
      //   'type': 1
      // },
      success: function (res) {
        // console.log(res);
        // if (res.statusCode != 100) {
        //   wx.showModal({
        //     title: '提示',
        //     content: '上传失败',
        //     showCancel: false
        //   })
        //   return;
        // }
        typeof cb == 'function' && cb(res)
      
      },
      fail: function (e) {
        wx.showModal({
          title: '提示',
          content: '上传失败',
          showCancel: false
        })
        typeof fail_cb == 'function' && fail_cb(res)
      },
      complete: function () {
        wx.hideToast();  //隐藏Toast
      }
    })
}
module.exports = {
  _get: _get,
  _uploadFile: _uploadFile
  
}