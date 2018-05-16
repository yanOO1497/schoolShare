// component/searchBar/searchBar.js
// let isCanSearch = true;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // inputShowed:{
    //   type:Boolean,
    //   value:false
    // },
    // inputVal: {
    //   type:String,
    //   value:""
    // }
  },

  /**
   * 组件的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    isCanSearch:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showInput: function () {
      this.setData({
        inputShowed: true
      });
    },
    hideInput: function () {
      let that = this;
      that.setData({
        inputVal: "",
        inputShowed: false
      });
      var myEventDetail = { value: "" } // detail对象，提供给事件监听函数
      that.triggerEvent('inputTyping', myEventDetail, {})
    },
    clearInput: function () {
      this.setData({
        inputVal: ""
      });
    },
    inputTyping: function (e) {
      let that = this;
      that.setData({
        inputVal: e.detail.value
      });
      var myEventDetail = { value: e.detail.value } // detail对象，提供给事件监听函数
      that.triggerEvent('inputTyping', myEventDetail, {})
    },
    sentInput(){
      let that = this;
      console.log("点击发送", that.data.inputVal);
      var myEventDetail = { value: that.data.inputVal } // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      that.triggerEvent('sentInput', myEventDetail, myEventOption)
    }
  }
})
