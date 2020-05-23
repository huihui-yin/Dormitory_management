// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 底部导航栏
    // current: 'mine',
    // barFixed: true,
    active: 'mine',
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
  // handleChange ({ detail }) {
  //   console.log(this.data.current);
  //   this.setData({
  //       current: detail.key
  //   });
  //   if(detail.key == 'homepage'){
  //     wx.redirectTo({
  //       url: '/pages/group/group'
  //     });
  //   }
  // },
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