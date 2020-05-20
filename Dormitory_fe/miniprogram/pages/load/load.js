// pages/load/load.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false
  },
  // 跳转页面函数
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
                        // that.next();
                        that.login();
                        //console.log(" getApp().globalData.userInfo:" ,  getApp().globalData.userInfo);
                        // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
                        // 根据自己的需求有其他操作再补充
                        // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
                        wx.login({
                            success: res => {
                                // 获取到用户的 code 之后：res.code
                                console.log("用户的code:" , res.code);
                                // 可以传给后台，再经过解析获取用户的 openid
                                // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
                                // wx.request({
                                //     // 自行补上自己的 APPID 和 SECRET
                                //     url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx7eebcf243e7916cb&secret=5e89812be0c810fc21f2a9e4f8611721&js_code=' + res.code + '&grant_type=authorization_code',
                                //     success: res => {
                                //         // 获取到用户的 openid
                                //         console.log("用户的openid:" + res.data.openid);
                                //     }
                                // });
                            }
                        });
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
      getApp().globalData.userInfo = e.detail.userInfo;
      //授权成功后,隐藏授权
      that.setData({
          isHide: false
      });
      // 跳转注册页面
      wx.redirectTo({
        url: '/pages/sigin/sigin'
      })
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