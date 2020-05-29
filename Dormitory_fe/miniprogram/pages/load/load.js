// pages/load/load.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false
  },
  // 跳转主页面
  next: function(e) {
    console.log("userInfo", getApp().globalData.userInfo)
    wx.redirectTo({
      url: '/pages/group/group'
    })
  },
  // 跳转登陆页面
  login: function(){
    wx.redirectTo({
      url: '/pages/login/login'
    })
  },
  // 用户微信登录接口
  wxlogin(){
    console.log('hhh');
    var that = this;
    wx.request({
      url:getApp().globalData.api + '/user/codeLogin',
      method:'POST',
      header: {
        'content-type':'multipart/form-data; boundary=XXX'
      },
      data:'\r\n--XXX' +
        '\r\nContent-Disposition: form-data; name="code"' +
        '\r\n' +
        '\r\n' +getApp().globalData.code+
        '\r\n--XXX' +
        '\r\nContent-Disposition: form-data; name="avatarUrl"' +
        '\r\n' +
        '\r\n' +getApp().globalData.userInfo.avatarUrl+
        '\r\n--XXX' ,
        success: (res) => {
          let data = res.data;
          console.log('res.data', data);
          // 未注册，跳转注册页面
          // if(data.code == '1008'){
          //   wx.redirectTo({
          //     url: '/pages/sigin/sigin'
          //   })
          // }
          // 已注册，直接登录即可
          // else if(data.code == '0000'){
            //console.log('已注册hh');
            // 修改全局数据
            getApp().globalData.token = data.data.token;
            getApp().globalData.tokenHead = data.data.tokenHead;
            //console.log('token', getApp().globalData.token);
            //console.log('tokenHead', getApp().globalData.tokenHead);
            that.next();
          // }
        },
        fail:  (err) => {
          console.log('接口失败', err);
        },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 查看是否授权
    wx.getSetting({
        success: function(res) {
            if (res.authSetting['scope.userInfo']) {
                wx.getUserInfo({
                    success: function(res) {
                        console.log("用户的userInfo:" , res.userInfo);
                        getApp().globalData.userInfo = res.userInfo;
                        console.log("用户的头像:" , getApp().globalData.userInfo.avatarUrl);
                        // 调用接口获取登陆凭证code
                        wx.login({
                          success: res => {
                              // 获取到用户的 code 之后：res.code
                              console.log("用户的code:" , res.code);
                              // 保存到全局变量
                              getApp().globalData.code = res.code;
                              // 登录进入系统
                               that.wxlogin();
                          }
                        });
                        // that.next();
                    }
                });
            } else {
                // 用户没有授权
                // 改变 isHide 的值，显示授权页面
                that.setData({
                    isHide: true
                });
            }
        }
    });
  },
  // 用户点击授权被调用
  bindGetUserInfo (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      // 修改全局数据
      getApp().globalData.userInfo = e.detail.userInfo;
      // 调用接口获取登陆凭证
      wx.login({
        success: res => {
            // 获取到用户的 code 之后：res.code
            console.log("点击授权获取的用户的code:" , res.code);
            getApp().globalData.code = res.code;
            // 判断用户是否注册，已注册直接跳转主页面，未注册跳转到注册页面
            console.log("全局code:" ,  getApp().globalData.code);
            that.wxlogin();
        }
      });
    } else {
      //用户点了拒绝授权
      wx.showModal({
          title: '警告',
          content: '必须授权才能进入小程序',
          showCancel: false,
          confirmText: '返回授权',
          success: function(res) {
              // 用户没有授权成功，不需要改变 isHide 的值
              if (res.confirm) {
                  console.log('用户点击了“返回授权”');
              }
          }
      });
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})