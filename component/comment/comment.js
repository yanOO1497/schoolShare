// component/comment/comment.js
var fetch = require('../../common/script/fetch')
var config = require('../../common/script/config')
var util = require('../../utils/util')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    commentData:{
      type:Array,
      value:[]
    },
    typeIndex:{
      type:Number,
      value:0
    },
    mid: {
      type: Number,
      value: 0
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
   commentNum:0,
   sentMessage:"",
   isFocus:false,
   isShow:false,
   fatherId:0,
   input_placeholder:"评论"
  },


  /**
   * 组件的方法列表
   */
  methods: {
    sentMsg:function(e){
      var that = this;
      // console.log(this.data.sentMessage, e);
      let { mid, fatherId, typeIndex, sentMessage } = that.data;
      console.log(mid, fatherId, typeIndex, sentMessage)
      fetch._get(config.apiList.addToComment,{
        uid:config.openID,
        type: typeIndex,
        content: sentMessage,
        fatherId: fatherId,
        mid: mid,
      },function(res){
        console.log(res);
        that.refreshData();
      })
      // var that = this;
      // var myEventDetail = { 
      //   sentMessage: thatdata.sentMessage,
      //   typeIndex: that.data.typeIndex
      //  } // detail对象，提供给事件监听函数
      // that.triggerEvent('observeReply', myEventDetail)
    },
    setSentData:function(e){
      this.data.sentMessage = e.detail.value;
    },
    setFocus:function(e){
      let { fatherid, name } = e.currentTarget.dataset;
      if (name){
        name = "回复" + name;
      }else{
        name = "评论" ;
        fatherid = 0
      }
      
      console.log('focus', fatherid, name);
      this.setData({
        isFocus:true,
        isShow:true,
        input_placeholder: name,
        fatherId: fatherid
      })
    },
    refreshData:function (start){
      var that = this;
      fetch._get(config.apiList.getComment,{
        type:this.data.typeIndex,
        mid: that.data.mid
      },function(res){
          console.log("马上");
          that.setData({
            commentData: res.result
          })
      })
    },
    hideInput:function(){
      this.setData({
        isShow: false
      })
    }
  }
})
