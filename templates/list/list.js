function list() {
  var that = this;
  //header中相应的数据
  that.setData({
   
  });

  //header中相应的 操作
  that.enterDetail = function (event) {
    console.log("detail");
  };

  that.enterUser = function (event) {

  }

  that.c = function (event) {

  }
};
module.exports = {
  list: list
};