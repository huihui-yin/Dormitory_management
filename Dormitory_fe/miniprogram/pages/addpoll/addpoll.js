// pages/addpull/addpull.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomId:"",
    theme:"",
    onechoice:"",
    twochoice:"",
    threechoice:"",
    allchoices:""
  },
  gettheme(e){
    this.setData({
      theme:e.detail
    })
  },
  getChoiceone(e){
    this.setData({
      onechoice:e.detail
    })
  },
  getChoicetwo(e){
    this.setData({
      twochoice:e.detail
    })
  },
  getChoicethree(e){
    this.setData({
      threechoice:e.detail
    })
  },
  submit(){
    var that=this;
    if(that.data.theme==""){
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '请输入投票主题！',
        success: function (res) { }
      })
    }
    else if(that.data.twochoice==""){
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '至少输入两个选项!',
        success: function (res) { }
      })
    }
    else{
      console.log(this.data.theme);
      console.log(this.data.onechoice);
      console.log(this.data.twochoice);
      console.log(this.data.threechoice);
      this.setData({
        allchoices:this.data.onechoice+" "+this.data.twochoice+" "+this.data.threechoice
      });
      console.log(this.data.allchoices);
      wx.request({
        url:  getApp().globalData.api + '/poll/insertTheme',
        header: {
          'Authorization': getApp().globalData.tokenHead + ' '+getApp().globalData.token,
          'content-type':'multipart/form-data; boundary=XXX'
        },
        method:"post",
        data:'\r\n--XXX' +
        '\r\nContent-Disposition: form-data; name="choices"' +
        '\r\n' +
        '\r\n' +that.data.allchoices+
        '\r\n--XXX' +
        '\r\nContent-Disposition: form-data; name="theme"' +
        '\r\n' +
        '\r\n' + that.data.theme +
        '\r\n--XXX' +
        '\r\nContent-Disposition: form-data; name="code"' +
        '\r\n' +
        '\r\n' + getApp().globalData.code +
        '\r\n--XXX' ,
        success: (res) => {
          let data = res.data;
          console.log('res.data', data);
          if(data.code == '0000'){
            wx.navigateBack({
              delta: 1
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
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      roomId: getApp().globalData.dormitoryInfo.id
    })
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