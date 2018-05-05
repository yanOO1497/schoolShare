// component/list-1/list-1.js
var fetch = require('../../common/script/fetch')
var config = require('../../common/script/config')
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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
   
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _toUserDetail: function () {
      // console.log("enterIMG");
    },
    enterDetail: function (e) {
      var that = this;
      var _uid = e.currentTarget.dataset.uid;
      var name = e.target.dataset.name;
      var _url = "../../pages/listDetail/listDetail?uid=" + _uid;
      var _avaterUrl = "../../pages/personal/personal?uid=" + _uid;

      // 判断当前点击对象
      switch (name) {
        case "avater-img":
          wx.navigateTo({
            url: _avaterUrl
          });
          break;
        case "more":
          wx.showActionSheet({
            itemList: ['收藏', '举报'],
            success: function (res) {
              if (!res.cancel) {
                switch (res.tapIndex) {
                  case 0:
                    that.toggleCollect(_uid);
                    break;//收藏
                  case 1:
                    that.toggleReport(_uid);
                    break;//举报
                }
              }
            }
          });
          break;
        default:
          wx.navigateTo({
            url: _url
          });
          break;
      }
      // console.log(name);
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
      // console.log(e);
      switch (name) {
        case "useless":
          that.toggleDisagree(data);
          break;
        case "useful":
          that.toggleAgree(data);
          break;
      }

    },
    toggleCollect: function (mid) {//切换收藏
      that.showToastSu("收藏成功！");
    },
    toggleReport: function (mid) {//切换收藏
      that.showToastSu("举报成功！");
    },
    toggleDisagree: function ( data) {
      var that = this;
      if (disAgreeClickFlag){
        disAgreeClickFlag = false;
        var nowFlag = that.properties.list[data.index].disagreeFlag;
        that.properties.list[data.index].disagreeFlag = nowFlag == 0 ? 1 : 0;
        that.setData({
          list: that.properties.list
        })
      }
    },
    toggleAgree: function (dataArr) {   
      if (agreeClickFlag){
        var that = this;
        agreeClickFlag = false;
        let typeIndex = config.typeList.indexOf(that.data.listType);
        let nowFlag = that.data.list[dataArr.index].agreeFlag;
        fetch._get.call(that, api.setAgree, {
          ...dataArr,
          type: typeIndex,
          agreeFlag: nowFlag
        },function (){
          that.data.list[dataArr.index].agreeFlag = nowFlag == 0 ? 1 : 0;
          that.setData({
            list: that.data.list
          })
          agreeClickFlag = true;
        },function (){
          console.log("toggleAgree fail");
        })
        
      }else{
        
      }
    }
  }
})
