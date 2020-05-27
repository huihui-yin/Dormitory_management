//app.js
App({
  // 全局变量（用户名+头像）
  globalData: {
    // 请求根接口
    api: 'https://room.sherlockouo.com/api',
    userInfo: {},
    code: '',
    token: '',
    tokenHead: '',
    // 是否有寝室
    dorSta: false,
    // 用户id
    id: '',
    // 用户的寝室信息
    dormitoryInfo: {},
    // 用户寝室所有室友信息
    dormitoryChum: {}
  },
  onLaunch: function () {
    
  

    //this.globalData = {}
  }
})
