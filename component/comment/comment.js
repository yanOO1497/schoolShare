// component/comment/comment.js
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
   commentNum:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    reply:function(){
      
    }
  }
})
