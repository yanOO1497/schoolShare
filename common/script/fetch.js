var config = require('./config.js')
var message = require('../../component/message/message')

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

module.exports = {
  _get: _get
}