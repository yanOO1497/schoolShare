/*
备注
city: 城市（在程序载入时获取一次）
count: 返回结果数量
baiduAK: 百度地图AK
apiList: api列表
hotKeyword: 搜索页热门关键词关键词
hotTag: 搜索页热门类型
bannerList: 首页（热映页）轮播图列表列表
skinList: “我的”页面背景列表
shakeSound: 摇一摇音效地址（带url表示远程地址）
shakeWelcomeImg: 摇一摇欢迎图片
*/
var url = 'http://192.168.1.103:8082/school_share/share'
module.exports = {
  APP_ID:'wx15734a2373afa7a8',
  APP_SECRET:'10c27dc6070ef03f708ccdbe3c072e21',
  SESSION_KEY:'',
  city: '',
  count: 20,
  openID: 0,
  userInfo:{},
  baiduAK: 'k28S8L69VGKML5GG2X6VBOKIFdhBQ6Bi',
  typeList: ["","question","share"],
  apiList: {
    questionList: url + '/loadQuestionList.do',
    loadUserInfoDetails: url + '/loadUserInfoDetails.do',
    setAgree: url + '/setAgree.do',
    saveUserInfo: url + '/saveUserInfo.do',
    setBioByUid: url + '/setBioByUid.do',
    addToQuestion: url + '/addToQuestion.do',
    
    personDetail: 'https://api.douban.com/v2/movie/celebrity/',
    baiduMap: 'https://api.map.baidu.com/geocoder/v2/'
  },
  shakeWelcomeImg: url + '/images/shake_welcome.png'
}