// pages/home/home.js
// import list from "../../templates/list/list.js";
var fetch = require('../../common/script/fetch')
var util = require('../../utils/util')
var config = require('../../common/script/config')
const app = getApp();
const typeArr = config.typeList;
const apiList = config.apiList;
let api = {
  question: apiList.questionList,
  share: apiList.loadExperienceList,

};
Page({

  /**
   * 页面的初始数据
   */

  data: {
    userInfo: {},
    hasUserInfo: false,
    shouldRefresh: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    scrollTop: 0,
    floorstatus: false,
    count: 5,//每次加载的数据量
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    hasMore: { "question": true, 'share': true, 'rewardhelp': true, 'activity': true, 'secondarymarket': true },
    start: { "question": 0, 'share': 0, 'rewardhelp': 0, 'activity': 0, 'secondarymarket': 0 },
    showLoading: true,

    isShowFixBar: true,
    //最新消息列表
    listData: {

    },
    navtab: {
      list: [{
        id: 'question',
        title: '校内百事通'
      }, {
        id: 'share',
        title: '师哥师姐说'
      },
      {
        id: 'rewardhelp',
        title: '悬赏求助'
      },
      {
        id: 'activity',
        title: '校内活动'
      },
      {
        id: 'secondarymarket',
        title: '二手市场'
      }
      ],
      selectedId: 'question',
      scroll: true,
      height: 45,
      message: {}
    },

  },//data
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("ߘ 表情？？")
    var that = this;
    wx.showNavigationBarLoading();
    // 获取用户信息
    util.getUserSet(function (userInfo) {
      console.log("登录成功", userInfo);
      that.refreshData(0);
    }, function () {
      console.log("获取用户数据失败");
    });

  },
  enterDetail: function () {
    console.log("enter");
  },
  tabchange(e) {
    var that = this;
    that.data.navtab.selectedId = e.detail;
    that.setData({
      navtab: that.data.navtab
    });
    if (!that.data.listData[e.detail]) {
      console.log("进入刷新");
      that.refreshData(0);
    }
  },
  refreshData: function (start, refreshType = "refresh", cb) {
    var that = this;
    let select = that.data.navtab.selectedId;
    let count = that.data.count;
    fetch._get.call(that, apiList.loadTableList, {
      tableType: typeArr.indexOf(select),
      start,
      count
    }, function (res) {
      wx.hideNavigationBarLoading();
      res.subjects.map((item, key, arr) => {
        if (item.picUrl !== "" && item.picUrl) {
          item.picUrl = item.picUrl.split(",");
        }
      })
      
      if (refreshType == "refresh") {
        that.data.start[select]= 0;
        that.data.listData[select] = res.subjects;
      } else {
        that.data.listData[select] = that.data.listData[select].concat(res.subjects);
      }
      console.log(refreshType, select, that.data.listData[select], res.subjects);
      let hasMore = that.data.hasMore;
      
      if (res.subjects.length < count) {
        hasMore[select] = false;
      } else {
        hasMore[select] = true;
      }
      that.setData({
        hasMore,
        listData: that.data.listData,
        showLoading: false
      });
      typeof cb == 'function' && cb(res)//刷新数据后的回调
    }, function (res) {
      console.log("home get questionList fail");
    });
  },
  toPublish(e) {
    var that = this;
    let select = that.data.navtab.selectedId;
    let url = `../publish/publish?typeIndex=${typeArr.indexOf(select)}`;
    wx.navigateTo({
      url: url
    })
  },
  toggleFixBar() {
    var that = this;
    this.setData({
      isShowFixBar: !that.data.isShowFixBar
    })
  },
  scroll(e) {
    if (e.detail.scrollTop > 500) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },
  toTop: function () {
    console.log("返回顶部");
    this.setData({
      scrollTop: 0
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log("页面是否刷新", this.data.shouldRefresh);
    this.refreshData(0);
    // if (this.data.shouldRefresh) {
    //   this.refreshData(0);
    //   this.setData({
    //     shouldRefresh: false
    //   })
    // }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    var that = this;
    // that.refreshData(0);
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    var that = this;
    let { hasMore, count, } = that.data;
    let selectedId = that.data.navtab.selectedId;
    if (hasMore[selectedId]) {
      that.data.start[selectedId] = that.data.start[selectedId] + 5;
      console.log(that.data.start[selectedId]);
      that.refreshData(that.data.start[selectedId], "load");
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from) {//默认分享
      return {
        title: '同学可以帮忙看看吗',
        path: `pages/home/home`,
        success: function (res) {
          // 转发成功
          util.showText("转发成功！");
        },
        fail: function (res) {
          // 转发失败
          util.showText("转发失败！");
        }
      }
    } else {
      let { mid, typeIndex } = res.detail;


      console.log("从组件的分享", res);
      return {
        title: '同学可以帮忙看看吗',
        path: `pages/listDetail/listDetail?mid=${mid}&typeIndex=${typeIndex}`,
        success: function (res) {
          // 转发成功
          util.showText("转发成功！");
        },
        fail: function (res) {
          // 转发失败
          util.showText("转发失败！");
        }
      }
    }

  }

})