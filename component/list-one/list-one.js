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
      var that=this;
      var uid = e.currentTarget.dataset.uid;
      var name = e.target.dataset.name;
     
      console.log(e);
      // 判断当前点击对象
      switch(name){
        case "avater-img":
          
        break;
        case "love":
         
          break;
          default:
          wx.navigateTo({
            url: "../../pages/listDetail/listDetail?uid=uid"
          });
          break;
      }
      // console.log(name);
    }
      
  }
})
