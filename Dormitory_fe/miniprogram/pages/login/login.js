// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_disabled: false,
    username: "",
    password: ""
  },
  // 跳转注册页面
  signup: function () {
    wx.redirectTo({
      url: '/pages/sigin/sigin'
    })
  },
  usernameInput: function (e) {
    this.data.username = e.detail.value
  },

  passwordInput: function (e) {
    this.data.password = e.detail.value
  },
  // 登录
  login: function () {
    var that = this
    if (that.data.username == '') {
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '请输入用户名！',
        success: function (res) { }
      })
    }
    else if (that.data.password == '') {
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '请输入密码！',
        success: function (res) { }
      })
    }
    else {
      // 调用登录接口
      wx.request({
        url:getApp().globalData.api + '/user/login',
        method:'POST',
        header: {
          'content-type':'multipart/form-data; boundary=XXX'
        },
        data:'\r\n--XXX' +
          '\r\nContent-Disposition: form-data; name="username"' +
          '\r\n' +
          '\r\n' +that.data.username+
          '\r\n--XXX' +
          '\r\nContent-Disposition: form-data; name="password"' +
          '\r\n' +
          '\r\n' + that.data.password +
          '\r\n--XXX' +
          '\r\nContent-Disposition: form-data; name="code"' +
          '\r\n' +
          '\r\n' + getApp().globalData.code +
          '\r\n--XXX' ,
          success: (res) => {
            let data = res.data;
            console.log('res.data', data);
            // 登录成功
            if(data.code == '0000'){
              //console.log('登录成功');
              // 修改全局数据
              getApp().globalData.token = data.data.token;
              getApp().globalData.tokenHead = data.data.tokenHead;
              wx.redirectTo({
                url: "/pages/group/group"
              })
            }
            else{
              wx.showModal({
                content: data.msg,
                success: function (res) {
                }
              })
            }
          },
          fail:  (err) => {
            console.log(err);
          },
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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