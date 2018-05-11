var util = require('../../utils/util')
var config = require('../../common/script/config')
var fetch = require('../../common/script/fetch')
const qiniuUploader = require("../../utils/qiniuUploader");
//index.js


//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: ["请选择", "校内问答", "经验分享", "悬赏求助", "失物招领", "二手市场"],
    typesIndex: 0,
    countryCodes: ["人民币", "积分"],
    countryCodeIndex: 0,
    textareaArea: '',
    files: [],//
    uploadImgList:[],//用户选择发送的时候，图片的上传进度,存储上传成功的七牛云图片存储地址
    tempImgList: [],//有上传成功的list，本地，不一定上传成功
    chooseImgFlag:[],//是否点击了选择图片
    showImgLoad: [true, true, true, true, true, true, true, true, true],
    showWarn: [false, false, false, false, false,false, false, false, false]//图片是否上传成功结果存储
  },
  bindTypesChange: function (e) {
    this.setData({
      typesIndex: e.detail.value
    })
  },
  bindValue : function (e){
    this.data.textareaArea = e.detail.value; 
  },
  formSubmit: function (event) {
    var that = this;
    console.log("点击发送")
    let { typesIndex, textareaArea } = that.data;
    if (typesIndex !== 0 && textareaArea !== '') {
      console.log(textareaArea, "submit");
      that.publishData(1);

    } else if (typesIndex !== 0 && textareaArea === '') {
      util.showText("请先输入想要发布的信息");
    } else if (typesIndex === 0 && textareaArea !== '') {
      util.showText("请先选择发布模块");
    } else {
      util.showText("请先填写相关信息");
    }

  },
  chooseImage: function (e) {
    var that = this;
    if (that.data.typesIndex !== 0){
      wx.chooseImage({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        count: 2,
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          let index = that.data.files.length;
          if (index > 6) {
            until.showText("最多选择6张图哦~");
          } else {
            that.setData({
              files: that.data.files.concat(res.tempFilePaths)
            });
           
            let formData= {
              'uid': config.openID,
              'type': that.data.typesIndex
            }
            console.log(formData);
            fetch._uploadFile.call(that,{
              url: config.apiList.uploadPic,
              filePath: res.tempFilePaths[0],
              name: 'image',
              formData: formData,
            },function(res){
              let index = that.data.files.length;
              console.log(JSON.parse(res.data),index);
              that.data.uploadImgList.push(JSON.parse(res.data).picUrl);
                that.data.showImgLoad[index-1] = false;
                that.data.showWarn[index - 1] = false;
                that.setData({
                  showImgLoad: that.data.showImgLoad,
                  showWarn: that.data.showWarn,
                  uploadImgList: that.data.uploadImgList
                })
                console.log("上传成功" + that.data.uploadImgList);
            },function(){
              that.data.showImgLoad[index - 1] = false;
              that.data.showWarn[index - 1] = true;
              that.setData({
                showImgLoad: that.data.showImgLoad,
                showWarn: that.data.showWarn
              })
            });
          }
        }
      })
    }else{
      util.showText("请先选择发布模块");
    }
    
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  publishData: function (option){
    var that = this;
    let prams = {};
    console.log("发布地方"+that.data.uploadImgList);
    if (that.data.uploadImgList.length > 0){
      if (option === 1) {
        prams.successUrl = that.data.uploadImgList
      } else {
        prams.cancelUrl = that.data.uploadImgList
      }
    }
    console.log(that.data.textareaArea, prams, that.data.typesIndex, option);
    fetch._get(config.apiList.publish,{
      uid:config.openID,
      content: that.data.textareaArea,
      ...prams,
      type: that.data.typesIndex,
      flag:option
      
    },function(res){
      console.log("发布成功",res);
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
    if (this.data.uploadImgList.length > 0){
      this.publishData(0);
    }else{
      console.log("无图片内容");
    }
    
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
