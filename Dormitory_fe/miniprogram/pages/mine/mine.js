// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 底部导航栏
    active: 'mine',
    // 用户信息
    username: '',
    tel: '',
    email: '',
    // 修改后的用户名
    usernew: '',
    // 是否有寝室
    dorSta: false,
    // 寝室信息
    room: {},
    // 是否室长
    isleader: '',
  },
  // 切换底部导航
  onChange(event) {
    this.setData({ active: event.detail });
    if(event.detail == 'home'){
      wx.redirectTo({
        url: '/pages/group/group'
      });
    }
  },
    // 查看个人信息接口
    findSelf () {
      var that = this;
      // 调用查看本人信息接口
         wx.request({
              url: getApp().globalData.api + '/user',
              header: {
                'Authorization': getApp().globalData.tokenHead + ' '+getApp().globalData.token
              },
              method: "GET",
              success: function (res) {
                let data = res.data.data;
                that.setData({
                  username: data.username,
                  tel: data.tel,
                  email: data.email
                  // birthday: data.birthday,
                  // birthday: data.birthday==null?'(暂无生日信息)':data.birthday,
                })
              },
              fail: function (err) {
                console.log(err);
              }
            })
    },
    // 点击input确认
    nameInput (e) {
      this.setData({
        usernew: e.detail
      })
    },
    telInput (e) {
      this.setData({
        tel: e.detail
      })
    },
    emailInput (e) {
      this.setData({
        email: e.detail
      })
    },
    // 确认修改
    Submit () {
      var that = this;
      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      if (that.data.username == '') {
        wx.showModal({
          title: '提示！',
          content: '请输入用户名！',
          showCancel: false,
          success(res) {}
        })
      } else if (that.data.tel == '' || that.data.tel == null) {
        wx.showModal({
          title: '提示！',
          content: '请输入手机号！',
          showCancel: false,
          success(res) {}
        })
      }  else if (!myreg.test(that.data.tel)) {
        wx.showModal({
          title: '提示！',
          content: '请输入正确的手机号码！',
          showCancel: false,
          success(res) {}
        })
      }else if (that.data.email == '' || that.data.email == null) {
        wx.showModal({
          title: '提示！',
          content: '请输入个人邮箱！',
          showCancel: false,
          success(res) {}
        })
      } else {
        // 用户名修改
        if(that.data.usernew != that.data.username && that.data.usernew != ''){
         // console.log('用户名修改');
          wx.request({
            url:getApp().globalData.api + '/user',
            method:'PUT',
            header: {
              'content-type':'multipart/form-data; boundary=XXX',
              'Authorization': getApp().globalData.tokenHead + ' '+getApp().globalData.token
            },
            data:'\r\n--XXX' +
              '\r\nContent-Disposition: form-data; name="tel"' +
              '\r\n' +
              '\r\n' +that.data.tel+
              '\r\n--XXX' +
              '\r\nContent-Disposition: form-data; name="email"' +
              '\r\n' +
              '\r\n' +that.data.email+
              '\r\n--XXX' +
              '\r\nContent-Disposition: form-data; name="username"' +
              '\r\n' +
              '\r\n' + that.data.usernew +
              '\r\n--XXX' ,
              success: (res) => {
                let data = res.data;
                //console.log('res.data', data);
                if(data.code == '0000'){
                  wx.showToast({
                    title: '修改成功',
                    icon: 'success',
                    duration: 1000
                  });
                  that.setData({
                    username: that.data.usernew
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
        // 用户名没修改
        else{
          //console.log('用户名没修改');
          wx.request({
            url:getApp().globalData.api + '/user',
            method:'PUT',
            header: {
              'content-type':'multipart/form-data; boundary=XXX',
              'Authorization': getApp().globalData.tokenHead + ' '+getApp().globalData.token
            },
            data:'\r\n--XXX' +
              '\r\nContent-Disposition: form-data; name="email"' +
              '\r\n' +
              '\r\n' +that.data.email+
              '\r\n--XXX' +
              '\r\nContent-Disposition: form-data; name="tel"' +
              '\r\n' +
              '\r\n' +that.data.tel+
              '\r\n--XXX' ,
              success: (res) => {
                let data = res.data;
                if(data.code == '0000'){
                  wx.showToast({
                    title: '修改成功',
                    icon: 'success',
                    duration: 1000
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
      }
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.findSelf();
    if(getApp().globalData.dorSta){
      this.setData({
        dorSta:getApp().globalData.dorSta,
        room: getApp().globalData.dormitoryInfo,
        isleader:getApp().globalData.roomRole == "leader"?"是":"否"
      })
    }
    console.log('dorSta',this.data.dorSta);
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