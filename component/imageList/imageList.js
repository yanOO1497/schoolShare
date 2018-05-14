// component/imageList/imageList.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    },
    listType: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    file:[],
    defaultImg:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526298449318&di=28837bc5d16b513b360a2ada1fe3b9ed&imgtype=jpg&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D3994969733%2C336727888%26fm%3D214%26gp%3D0.jpg'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    downloadFile(e) {
      var that = this;
      console.log("下载");
      let {url,bid}= e.currentTarget.dataset;
      that.download(url,function(resUrl){
        that.save(resUrl,function(res){
          that.data.file[bid] = res.savedFilePath;
          console.log("保存成功", that.data.file[bid]);
          
        })
      })
    },
    openFile(url,bid){
      let that = this;
      if(that.data.file[bid]){//已经下载过文件
        that.open(that.data.file[bid],function(){
          console.log("打开文件成功");
        })
      }else{//未下载文件
        that.download(url, function (resUrl) {
          that.save(resUrl, function (res) {
            that.data.file[bid] = res.savedFilePath;
            console.log("保存成功", that.data.file[bid]);
            that.open(that.data.file[bid], function () {
              console.log("打开文件成功");
            })
          })
        })
      }
    },
    download(url,cb){
      wx.downloadFile({
        url: url, //仅为示例，并非真实的资源
        success: function (res) {
          console.log("下载响应", res);
          if (res.statusCode === 200) {
            wx.playVoice({
              filePath: res.tempFilePath
            })
            var filePath = res.tempFilePath;
            // var tempFilePaths = res.tempFilePaths
            typeof cb == 'function' && cb(res.tempFilePath)

          }
        }
      })
    },
    save(url,cb){
      wx.saveFile({
        tempFilePath: url,
        success: function (res) {
          typeof cb == 'function' && cb(res)
        }
      })
    },
    open(url,cb){

      wx.openDocument({
        filePath: url,
        success: function (res) {
          // console.log('打开文档成功');
          typeof cb == 'function' && cb(res)
        }
      })
    },
    enterUserDetail(e) {
      let uid = e.currentTarget.dataset.uid;
      wx.navigateTo({
        url: `../../pages/personal/personal?uid=${uid}`
      })
    },
    showMoreChoose(e) {
      var that = this;
      let {bid,uid,url} = e.currentTarget.dataset;
      let itemList,bookFlag = false;
      if (that.data.listType === "ebook"){
        itemList = ['在线打开', '反馈：资源不能下载', '私信提供用户', '举报'];
        bookFlag = true;
      }else{
        itemList = ['私信提供用户', '举报'];
      }
      wx.showActionSheet({
        itemList,
        success(res) {
          if (bookFlag){
            switch (res.tapIndex) {
              case 0:
                that.openFile(url, bid);
                break;
              case 1:
                console.log("通知上传用户调整资源");
                break;
              case 2:
                that.enterUserDetail(e);
                break;
              case 3:
                console.log("举报资源");
                break;
            }
          }else{
            switch (res.tapIndex) {
              case 0:
                console.log("通知上传用户调整资源");
                break;
              case 1:
                console.log("举报资源");
                break;
            }
          }
        }
      })
    }
  }
})
