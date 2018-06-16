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
   isShow:true,
   fatherId:0,
   input_placeholder:"说点什么吧~",
   isDisable:true
  },


  /**
   * 组件的方法列表
   */
  methods: {

    sentMsg:function(e){
      console.log("发送消息",e);
      var that = this;
      console.log(e.detail.value.textarea);
      let { mid, fatherId, typeIndex} = that.data;
      // console.log(mid, fatherId, typeIndex);
      fetch._get.call(that,config.apiList.addToComment,{
        uid:config.openID,
        type: typeIndex,
        content: e.detail.value.textarea,
        fatherId: fatherId,
        mid: mid,
      },function(res){
        console.log(res);
        that.refreshData();
      })

    },
    //发送消息
    setSentData:function(e){
      // console.log("有文字");
      this.data.sentMessage = e.detail.value;
      
    },
    checkMsg:function (e){
      if (e.detail.value != "") {
        console.log("有文字");
        this.setData({
          isDisable: false
        })
      } else {
        this.setData({
          isDisable: true
        })
        console.log("meiweni");
      }
    },
    setFocus:function(e){
      let { fatherid, name } = e.currentTarget.dataset;
      let prames = {};
      if (name){
        prames.input_placeholder = "回复" + name;
        prames.fatherId = fatherid;
      }else{
        prames.input_placeholder = "评论";
      }
      this.setData({
        isFocus:true,
        ...prames
      })
    },
    refreshData:function (start){
      var that = this;
      fetch._get.call(that,config.apiList.getComment,{
        type:this.data.typeIndex,
        mid: that.data.mid
      },function(res){
          console.log("马上刷新");
          that.setData({
            commentData: res.result
          })
      })
    }

  }
})
