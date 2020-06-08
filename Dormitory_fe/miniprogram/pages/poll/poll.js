// pages/poll/poll.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomRole:false
  },
  addpoll(){
    wx.redirectTo({
      url: '/pages/addpoll/addpoll'
    })
  },
  getAllPoll(){
    var that=this;
    wx.request({
      url: getApp().globalData.api + '/poll/getTheme',
      header: {
        'Authorization': getApp().globalData.tokenHead + ' '+getApp().globalData.token
      },
      method:'GET',
      data: {
        roomId: getApp().globalData.dormitoryInfo.id
      },
      success: (res) => {
        let data = res.data;
        if(data.code == '0000'){
            console.log(data.data);
          }
        }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(getApp().globalData.roomRole == 'leader'){
      this.setData({
        roomRole: true
      })
    }
    this.getAllPoll();
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