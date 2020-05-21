// pages/sigin/sigin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    phonenumber: "",
    password: ""
  },
  // 跳转登录
  login: function(){
    wx.redirectTo({
      url: '/pages/login/login'
    })
  },
  // 获取数据
  usernameInput: function(e) {
    this.data.username = e.detail.value
  },
  phonenumberInput: function(e) {
    this.data.phonenumber = e.detail.value
  },
  passwordInput: function(e) {
    this.data.password = e.detail.value
  },
  // 注册
  regist: function(e) {
    var that = this;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (that.data.username == '') {
      wx.showModal({
        title: '提示！',
        content: '请输入用户名！',
        showCancel: false,
        success(res) {}
      })
    } else if (that.data.phonenumber == '') {
      wx.showModal({
        title: '提示！',
        content: '请输入手机号！',
        showCancel: false,
        success(res) {}
      })
    }  else if (!myreg.test(that.data.phonenumber)) {
      wx.showModal({
        title: '提示！',
        content: '请输入正确的手机号码！',
        showCancel: false,
        success(res) {}
      })
    } else if (that.data.password == '') {
      wx.showModal({
        title: '提示！',
        content: '请输入密码！',
        showCancel: false,
        success(res) {}
      })
    } else {
      console.log("usernam: ",that.data.username);
      console.log("phonenumber: ", that.data.phonenumber);
      console.log("password: ", that.data.password);
      console.log("头像地址: ", getApp().globalData.userInfo.avatarUrl);
      // 调用注册接口
      wx.request({
        url:getApp().globalData.api + '/user/register',
        method:'POST',
        header: {
          'content-type':'multipart/form-data; boundary=XXX'
        },
        data:'\r\n--XXX' +
          '\r\nContent-Disposition: form-data; name="username"' +
          '\r\n' +
          '\r\n' +that.data.username+
          '\r\n--XXX' +
          '\r\nContent-Disposition: form-data; name="avatarUrl"' +
          '\r\n' +
          '\r\n' + getApp().globalData.userInfo.avatarUrl +
          '\r\n--XXX' +
          '\r\nContent-Disposition: form-data; name="tel"' +
          '\r\n' +
          '\r\n' + that.data.phonenumber +
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
            // 注册成功
            if(data.code == '0000'){
              //console.log('注册成功');
              wx.showModal({
                content: '注册成功',
                success: function (res) {
                }
              });
              // 用户微信登录接口
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
                    '\r\n--XXX' ,
                    success: (res) => {
                      let data = res.data;
                      console.log('res.data', data);
                      // 未注册，跳转注册页面
                      if(data.code == '1008'){
                        wx.redirectTo({
                          url: '/pages/sigin/sigin'
                        })
                      }
                      // 已注册，直接登录即可
                      else if(data.code == '0000'){
                        // 修改全局数据
                        getApp().globalData.token = data.data.token;
                        getApp().globalData.tokenHead = data.data.tokenHead;
                        // 跳转主页
                        setTimeout (() => {
                          //要延时执行的代码
                          wx.redirectTo({
                            url: '/pages/group/group'
                          })
                        }, 1000) 
                      }
                    },
                    fail:  (err) => {
                      console.log('接口失败', err);
                    },
                });
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