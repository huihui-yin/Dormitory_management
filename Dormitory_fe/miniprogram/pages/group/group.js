// pages/group/group.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // firco: "#000000",
    // secco: "#979797",
    // 是否有寝室
    dorStatus: false,
    // 底部导航栏
    // current: 'homepage',
    // barFixed: true,
    active: 'home',
    // 搜索的寝室号
    dorIdSearch: ' ',
    // 搜索结果 
    serchRes: false,
    noRes: false,
    // 寝室信息
    dor: {
      dorId: '1104',
      dorName: '这是一个宿舍名'
    }
  },
  // 切换底部导航
  // handleChange ({ detail }) {
  //   // var that = this;
  //   console.log(this.data.current);
  //   this.setData({
  //       current: detail.key
  //   });
  //   //console.log(detail.key);
  //   //console.log(this.data.current);
  //   if(detail.key == 'mine'){
  //     wx.redirectTo({
  //       url: '/pages/mine/mine'
  //     });
  //   }
  // },
  onChange(event) {
    this.setData({ active: event.detail });
    console.log('active', this.data.active);
    if(event.detail == 'mine'){
          wx.redirectTo({
            url: '/pages/mine/mine'
          });
    }
  },
  // 新建寝室
  newDor () {
    wx.navigateTo({
      url: '/pages/newDor/newDor'
    })
  },
  // 获取寝室信息
  DorInfo(){
    var that = this;
    // 此处获取宿舍信息如果为空说明未加入任何寝室，显示新增/搜索寝室；不为空显示寝室操作
       wx.request({
            url: getApp().globalData.api + '/room',
            header: {
              'Authorization': getApp().globalData.tokenHead + ' '+getApp().globalData.token
            },
            method: "GET",
            success: function (res) {
              let data = res.data;
              // 有寝室将dorStatus改为true
              if(data.data !== null){
                console.log('hhh');
                that.setData({
                  dorStatus: true
                })
              }
              console.log('dorStatus',that.data.dorStatus);
            },
            fail: function (err) {
              console.log(err);
            }
          })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.DorInfo();
  },
  // 搜索寝室号
  serachId (e){
    console.log('this.data.serachId',e.detail.detail.value);
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
    this.DorInfo();
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