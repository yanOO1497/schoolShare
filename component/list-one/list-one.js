// component/list-1/list-1.js
var fetch = require('../../common/script/fetch')
var config = require('../../common/script/config')
var util = require('../../utils/util')
const app = getApp();
var api = config.apiList,
  disAgreeClickFlag = true,
  agreeClickFlag = true,
  listTypeIndex = 0;

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
    },
    isShowDelete:{
      type: String,
      value: ""
    },
    isDetail:{
      type:Boolean,
      value:false
    },
    isQuesAndShare: {
      type: Boolean,
      value: false
    },
    listOBJ:{
        type:Object,
        value:{}
    }
  
  },

  /**
   * 组件的初始数据
   */
  data: {
    listTypeArr: config.typeList
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _toUserDetail: function () {
      // console.log("enterIMG");
    },
    enterDetail:function(index){
      var that = this;
      // let typeIndex ;
      let { id, type} = that.data.list[index];
    
      console.log(that.data.list[index], type)
      let _url = `../../pages/listDetail/listDetail?mid=${id}&typeIndex=${type}`;
      wx.navigateTo({
        url: _url
      });
    },
    checkEnter: function (e) {
      // console.log("进入detail",e);
      var that = this;
      let { mid, index } = e.currentTarget.dataset;
      let { name, uid ,url} = e.target.dataset;
      var _avaterUrl = "../../pages/personal/personal?uid=" + uid;
      // 判断当前点击对象
      switch (name) {
        case "avater-img":
          wx.navigateTo({
            url: _avaterUrl
          });
          break;
        case "more":
          wx.showActionSheet({
            itemList: [ '举报'],
            success: function (res) {
              if (!res.cancel) {
                switch (res.tapIndex) {
                  case 0:
                    that.report(mid, index);
                    break;//举报
                }
              }
            }
          });
          break;
        case "previewImg":
          if (!that.data.isDetail) {
            that.enterDetail(index);
          } else{
            console.log("previewImg");

            wx.previewImage({
              current: url, // 当前显示图片的http链接
              urls: that.data.listOBJ.picUrl // 需要预览的图片http链接列表
            })
          }
          
        break;
        default:
        if(!that.data.isDetail){
          that.enterDetail(index);
        } 
          break;
      }
    },
    enterPersonal: function (e) {
      var that = this;
      var _uid = e.currentTarget.dataset.uid;
      wx.navigateTo({
        url: _avaterUrl
      });
    },
    showToastSu: function (arr) {
      wx.showToast({
        title: arr,
        icon: 'success',
        duration: 1000
      });
    },
    changeAct: function (e) {
      let that = this;
      let data = e.currentTarget.dataset;
      let name = e.target.dataset.name;
      switch (name) {
        case "useful":
          that.toggleAgree(data);
          break;
        case "delete":
          that.deleteByUid(data);
        break;
        case "comment":
          that.enterDetail(data.index);
        break;
        case "share":
          that.onShareAppMessage(data);
        break;
        case "collect":
          that.toggleCollect(data);
        break;
      }

    },
    deleteByUid(dataArr){
      var that = this;
      util.showConfirmModal.call(that,"确定要删除该条消息？！",function(){
        var myEventDetail = { deleteFlag: true,...dataArr} // detail对象，提供给事件监听函数
        var myEventOption = {} // 触发事件的选项
        that.triggerEvent('observeDelete', myEventDetail, myEventOption)
      })
    },
    toggleCollect: function (data) {//切换收藏
      var that = this;
      let {mid,index} = data;
      let nowFlag = that.data.list[index].collectFlag;
      let typeIndex = that.data.list[index].type;
      fetch._get.call(that, api.setCollect, {
        type: typeIndex,
        ...data,
        uid: config.openID,
        collectFlag: nowFlag
      }, function (res) {
        that.data.list[index].collectFlag = nowFlag == 0 ? 1 : 0;
        that.data.list[index].collectNum = res.result.collectNum;
        that.setData({
          list: that.data.list
        })
        if (nowFlag === 0) {
          util.showText("收藏成功！");
        } else {
          util.showText("取消收藏成功！");
        }
      }, function () {

        console.log("toggleAgree fail");
      })

    },
    report: function (mid, index) {//举报
    let that = this ;
      let nowFlag = that.data.list[index].reportFlag;
      let typeIndex = config.typeList.indexOf(that.data.listType);
      if (nowFlag === 0) {
        fetch._get.call(that, api.setCollect, {
          type: typeIndex,
          mid: mid,
          uid: config.openID,
          collectFlag: nowFlag
        }, function () {
          that.data.list[index].reportFlag = 1;
          that.setData({
            list: that.data.list
          })
          that.showToastSu("举报成功！");
        }, function () {

          console.log("toggleAgree fail");
        })
      } else {
        that.showToastSu("已经举报过了！");
      }

    },
    toggleShare: function (dataArr) {
      if (disAgreeClickFlag) {
        disAgreeClickFlag = false;
        var that = this;
        let typeIndex = config.typeList.indexOf(that.data.listType);
        fetch._get.call(that, api.setDisagree, {
          ...dataArr,
          uid: config.openID,
          type: typeIndex
        }, function (res) {
          that.data.list[dataArr.index].shareNum = res.result.shareNum;
          that.data.list[dataArr.index].shareNum = res.result.shareNum;
          that.setData({
            list: that.properties.list
          })
          disAgreeClickFlag = true;
        }, function () {
          console.log("setShare fail");
        })

      }
    },
    toggleAgree: function (dataArr) {
      if (agreeClickFlag) {
        var that = this;
        agreeClickFlag = false;
        let typeIndex = config.typeList.indexOf(that.data.listType);
        let nowFlag ;
        if (!that.data.isDetail){
          nowFlag = that.data.list[dataArr.index].agreeFlag;
        }else{
          nowFlag = that.data.listOBJ.agreeFlag;
        }
        console.log(that.data.listOBJ,nowFlag);
        fetch._get.call(that, api.setAgree, {
          ...dataArr,
          type: typeIndex,
          uid: config.openID,
          agreeFlag: nowFlag
        }, function (res) {
          if (!that.data.isDetail){
            that.data.list[dataArr.index].agreeFlag = res.result.agreeFlag;
            that.data.list[dataArr.index].agreeNum = res.result.agreeNum;
            that.setData({
              list: that.data.list
            })
          }else{
            that.data.listOBJ.agreeFlag = res.result.agreeFlag;
            that.data.listOBJ.agreeNum = res.result.agreeNum;
            that.setData({
              listOBJ: that.data.listOBJ
            })
          }
          
          agreeClickFlag = true;
        }, function () {
          console.log("toggleAgree fail");
        })
      } else {

      }
    },
    onShareAppMessage (data){
      var that = this;
      let typeIndex = config.typeList.indexOf(that.data.listType);
      var myEventDetail = { mid:data.mid,typeIndex } // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      that.triggerEvent('onShareAppMessage', myEventDetail, myEventOption)
    }
  }
})
