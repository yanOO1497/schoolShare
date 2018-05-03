// component/list-1/list-1.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

    list: {
      type: Array,
      value: []
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
      console.log(_uid);
      // 判断当前点击对象
      switch (name) {
        case "avater-img":

          break;
        case "love":

          break;
        case "more":
          wx.showActionSheet({
            itemList: ['收藏', '举报'],
            success: function (res) {
              if (!res.cancel) {
                console.log(res.tapIndex);
                switch (res.tapIndex) {
                  case 0:
                    that.showToastSu("收藏成功！");
                    break;//收藏
                  case 1:
                    that.showToastSu("举报成功！");
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
    showToastSu: function(arr){
      wx.showToast({
        title: arr,
        icon: 'success',
        duration: 1000
      });
    }

  }
})
