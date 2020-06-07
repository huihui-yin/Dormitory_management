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
    // birthday: '',
    // 日期弹出框
    // show: false,
    currentDate: new Date().getTime() + 1,
    minDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
  },
  // 切换底部导航
  onChange(event) {
    this.setData({ active: event.detail });
    console.log('active', this.data.active);
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
                console.log('用户本人信息：', data)
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
      console.log("邮箱：",this.data.email);
    },
    // 日期弹窗
    // showPopup() {
    //   console.log('111')
    //   this.setData({ show: true });
    // },
  
    // onClose() {
    //   this.setData({ show: false });
    // },
    // 日期格式转换函数
    formatDate (now) {     
      var   year=now.getFullYear();     
      var   month=now.getMonth()+1;     
      var   date=now.getDate();     
      var   hour=now.getHours();     
      var   minute=now.getMinutes();     
      var   second=now.getSeconds();     
      return   year+"-"+month+"-"+date+"   "+hour+":"+minute+":"+second;     
    },
    // 选择日期
    // onInput(event) {
    //   console.log('event', event);
    //   var d = this.formatDate(event.detail)
    //   this.setData({
    //     currentDate: d,
    //   });
    //   console.log('currentDate', this.data.currentDate);
    // },
    // 确认修改
    Submit () {
      var that = this;
      //console.log("username: ",that.data.username);
      //console.log("usernew: ",that.data.usernew);
      //console.log("tel: ", that.data.tel);
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
                console.log('res.data', data);
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
                console.log('res.data', data);
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