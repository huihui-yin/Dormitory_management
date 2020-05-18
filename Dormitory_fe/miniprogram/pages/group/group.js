// pages/group/group.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // firco: "#000000",
    // secco: "#979797",
    // 是否有寝室
    dor:true,
    // 当前底部导航栏显示
    current: 'homepage',
    barFixed: true,
    // 搜索的寝室号
    dorIdSearch: '',
    dor: {
      dorId: '1104',
      dorName: '这是一个宿舍名'
    }
  },
  handleChange ({ detail }) {
    this.setData({
        current: detail.key
    });
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