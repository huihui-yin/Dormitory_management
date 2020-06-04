// pages/addnotice/addnotice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    content: '',
  },
  // 点击input框
  nameInput (e) {
    this.setData({
      name:  e.detail
    })
    //console.log('标题：', this.data.name);
  },
  contentInput (e) {
    this.setData({
      content:  e.detail
    })
    //console.log('标题：', this.data.content);
  },
  // 按钮
  Submit () {
    var that = this;
    //console.log("name: ",that.data.name);
    //console.log("content: ",that.data.content);
    if (that.data.name == '') {
      wx.showModal({
        title: '提示！',
        content: '请输入公告标题！',
        showCancel: false,
        success(res) {}
      })
    } else if (that.data.content == '') {
      wx.showModal({
        title: '提示！',
        content: '请输入公告内容！',
        showCancel: false,
        success(res) {}
      })
    }else {
      wx.request({
        url:getApp().globalData.api + '/notice/insert',
        method:'POST',
        header: {
          'content-type':'multipart/form-data; boundary=XXX',
          'Authorization': getApp().globalData.tokenHead + ' '+getApp().globalData.token
        },
        data:'\r\n--XXX' +
          '\r\nContent-Disposition: form-data; name="content"' +
          '\r\n' +
          '\r\n' +that.data.content+
          '\r\n--XXX' +
          '\r\nContent-Disposition: form-data; name="name"' +
          '\r\n' +
          '\r\n' + that.data.name +
          '\r\n--XXX' +
          '\r\nContent-Disposition: form-data; name="roomId"' +
          '\r\n' +
          '\r\n' + getApp().globalData.dormitoryInfo.id+
          '\r\n--XXX' ,
          success: (res) => {
            let data = res.data;
            //console.log('res.data', data);
            if(data.code == '0000'){
              // 返回上一级
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