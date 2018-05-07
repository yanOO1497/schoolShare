var config = require('./config.js')
var message = require('../../component/message/message')
// var qiniu = require('./qiniu.js')
// 获取
function _get(url, prames, cb, fail_cb) {
  var that = this;
  
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
function _uploadFile(prames){
  wx.showToast({
    icon: "loading",
    title: "正在上传"
  }),
    wx.uploadFile({
    ...prames,
      header: { "Content-Type": "multipart/form-data" },
      formData: {
        //和服务器约定的token, 一般也可以放在header中
        'session_token': ''
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode != 200) {
          wx.showModal({
            title: '提示',
            content: '上传失败',
            showCancel: false
          })
          return;
        }
        // typeof cb == 'function' && cb(res.data)
        var data = res.data
        page.setData({  //上传成功修改显示头像
          src: path[0]
        })
      },
      fail: function (e) {
        wx.showModal({
          title: '提示',
          content: '上传失败',
          showCancel: false
        })
        // typeof cb == 'function' && cb(res)
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