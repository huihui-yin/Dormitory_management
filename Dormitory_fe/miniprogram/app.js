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
    dormitoryChum: {},
    // 在寝室的角色
    roomRole: '',
    // 跳转页面（寝室详情页面/新增寝室页面：1）
    page: 0
  },
  onLaunch: function () {
    
  

    //this.globalData = {}
  }
})
