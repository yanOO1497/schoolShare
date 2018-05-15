var util = require('../../utils/util')
var config = require('../../common/script/config')
var fetch = require('../../common/script/fetch')
//index.js

//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: ["请选择发布模块","校内百事通", "师哥师姐说", "悬赏求助", "校内活动", "二手市场"],
    typesIndex: 0,
    countryCodes: ["人民币", "积分"],
    countryCodeIndex: 0,
    textareaArea: '',
    files: [],//
    uploadImgList:[],//用户选择发送的时候，图片的上传进度,存储上传成功的七牛云图片存储地址
    tempImgList: [],//有上传成功的list，本地，不一定上传成功
    chooseImgFlag:[],//是否点击了选择图片
    showImgLoad: [true, true, true, true, true, true, true, true, true],
    showWarn: [false, false, false, false, false,false, false, false, false],//图片是否上传成功结果存储
    isPublish:false,
    publish_result :["", "发完求助记得也去看看其他小伙伴有没有需要帮助的，互帮互助可以为你积攒人品哦~", "字斟句酌处，亦是与心推敲时，记录学到的知识也是梳理整合的一个过程，感谢你为其他同学带来的宝贵经验！", "必要的付费有时候是获得解决方案的最快途径~", "多去参加活动和朋友互动吧，宅在宿舍是会发霉的哦~", "清掉不再适合自己的物品，人生就不会有那么多烦恼~"],
    publish_placeholder: ["请先选择模块进行发布", "嘿，在学校遇到什么疑惑困难了吗？可以说出来让大家一起帮你哦~", "分享一下自己成长过程中的经验吧，同学们非常需要你的分享！", "必要的付费有时候是获得解决方案的最快途径~", "学校附近有什么有趣的活动当然是你最清楚啦，快来告诉大家一起玩耍~", "清掉不再适合自己的物品，人生就不会有那么多烦恼~"],
    publishType:"square",
    reward:"",
    shoulRefresh:false
  },
  bindTypesChange: function (e) {
    this.setData({
      typesIndex: e.detail.value
    })
  },
  bindValue : function (e){
    this.data.textareaArea = e.detail.value; 
  },
  bindReward(e){
    this.data.reward = e.detail.value; 
    // if()
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
              'session_token': '',
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
    if (that.data.typesIndex == 3){//
      prams.reward = that.data.reward;
    }
    console.log(that.data.textareaArea, prams, that.data.typesIndex, option);
    fetch._get.call(that,config.apiList.publish,{
      uid:config.openID,
      content: that.data.textareaArea,
      ...prams,
      type: that.data.typesIndex,
      flag:option
      
    },function(res){
      console.log("发布成功",res);
      that.setData({
        isPublish:true
      })
      setTimeout(function(){
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];
        console.log(pages, prevPage)
        prevPage.setData({
          shouldRefresh: true
        })
        wx.navigateBack({
          delta: 1,
        })
       
      },2000)
      
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.publishType === "book"){
      this.setData({
        typesIndex: options.typeIndex,
        publishType: options.publishType
      })
    } else if (options.typeIndex){
      this.setData({
        typesIndex: options.typeIndex
      })
    }
    if (options.refresh){
      this.refreshData(1);
    }
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


})
