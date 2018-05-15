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
      this.setData({
        inputVal: "",
        inputShowed: false
      });
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
      // console.log("输入信息", e.detail.value);
      // if (that.data.isCanSearch){
      //   var myEventDetail = { value: e.detail.value } // detail对象，提供给事件监听函数
      //   that.triggerEvent('inputTyping', myEventDetail, {})
      //   that.data.isCanSearch = false;
      //   setTimeout(function(){
      //     that.data.isCanSearch = true;
      //   },1000)
      // } 

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
