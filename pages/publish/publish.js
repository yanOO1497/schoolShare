var util = require('../../utils/util')
const qiniuUploader = require("../../utils/qiniuUploader");
//index.js


//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: ["请选择","校内问答", "经验分享", "悬赏求助","失物招领", "二手市场"],
    typesIndex: 0,
    countryCodes: ["人民币", "积分"],
    countryCodeIndex: 0,
    textareaArea:'',
    files: []
  },
  bindTypesChange: function (e) {
    this.setData({
      typesIndex: e.detail.value
    })
  },
  formSubmit:function (event){
    var that = this;
    let { typesIndex, textareaArea}=that.data;
    if (typesIndex !== 0 && textareaArea !== ''){
      console.log(textareaArea, "submit");
    } else if (typesIndex !== 0 && textareaArea === ''){
      util.showText("请先输入想要发布的信息");
    } else if (typesIndex === 0 && textareaArea !== ''){
      util.showText("请先选择发布模块");
    }else{
      util.showText("请先填写相关信息");
    }
    
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      count:2,
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let index=that.data.files.lenght;
        if (index > 1){
          until.showText("最多选择6张图哦~");
        }else{
          that.setData({
            files: that.data.files.concat(res.tempFilePaths)
          });
          // until._uploadFile({
        //   url:'',
        //   filePath: res.tempFilePaths[index],
        //   name:'file'
        // });
        }
        
        
        console.log(res.tempFilePaths[0]);
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  onShareAppMessage: function () {
  
  }
})

function didPressChooesImage(that) {
  initQiniu();
  // 微信 API 选文件
  wx.chooseImage({
    count: 1,
    success: function (res) {
      var filePath = res.tempFilePaths[0];
      // 交给七牛上传
      qiniuUploader.upload(filePath, (res) => {
        that.setData({
          'imageObject': res
        });
      }, (error) => {
        console.error('error: ' + JSON.stringify(error));
      },
        {
          region: 'SCN', // 华南区
          domain: 'p8a5jm7as.bkt.clouddn.com',//七牛云存储地址
          uploadURL: 'https://up-z2.qbox.me',
          shouldUseQiniuFileName: true,
          // key: 'testKeyNameLSAKDKASJDHKAS',
          uptokenURL: 'https://get.qiniutoken.com/minibx/geo_f/gain_qn_toke'
        },
        // null,// 可以使用上述参数，或者使用 null 作为参数占位符
        (progress) => {
          console.log('上传进度', progress.progress)
          console.log('已经上传的数据长度', progress.totalBytesSent)
          console.log('预期需要上传的数据总长度', progress.totalBytesExpectedToSend)
        }, cancelTask => that.setData({ cancelTask })
      );
    }
  })
}