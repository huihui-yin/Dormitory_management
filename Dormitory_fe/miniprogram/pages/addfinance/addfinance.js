// pages/addfinance/addfinance.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moneyReson:"",
    classify:"",
    roomId:"",
    money:"",
    areaList:{
      province_list: {
        110000: '寝室电费',
        120000: '寝室网费',
        130000:'寝室聚餐',
        14000:'寝室外出'
      }
    },
    hiddenSelect: false
  },
  selectDisply () {
    //console.log('控制选择保修项目');
    this.setData({
      hiddenSelect:!this.data.hiddenSelect
    })
    //console.log('hiddenSelect',this.data.hiddenSelect);
  },
  // 选择确认
  selectSumbit (e) {
    //console.log('e.detail.values', e.detail.values);
    this.setData({
      classify: e.detail.values[0].name
    })
    //console.log('item', this.data.item);
    this.selectDisply();
  },
  isRoomid: function (e)
  {
     this.data.roomId=e.datail;
     //console.log('roomId', this.data.roomId);
  },
  getReson: function (e)
  {
    this.setData({
      moneyReson: e.detail
    })
  },
  isMoney: function (e)
  {
    this.setData({
      money: e.detail
    })
     //console.log('roomId', this.data.roomId);
  },
  submit(){
    var that = this;
    if (that.data.roomId == '') {
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '请输入寝室id！',
        success: function (res) { }
      })
    }
    else if (that.data.moneyReson == '') {
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '请输入收支原因',
        success: function (res) { }
      })
    }
    else if (that.data.money == '') {
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '请输入收支金额',
        success: function (res) { }
      })
    }
    else if (that.data.classify == '') {
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '请选择收支分类',
        success: function (res) { }
      })
    }
    else{
      wx.request({
        url: getApp().globalData.api + '/finance/insert',
        header: {
          'Authorization': getApp().globalData.tokenHead + ' '+getApp().globalData.token,
          'content-type':'multipart/form-data; boundary=XXX'
        },
        method: "post",
        data:'\r\n--XXX' +
        '\r\nContent-Disposition: form-data; name="moneyReason"' +
        '\r\n' +
        '\r\n' +that.data.moneyReson+
        '\r\n--XXX' +
        '\r\nContent-Disposition: form-data; name="roomId"' +
        '\r\n' +
        '\r\n' + that.data.roomId +
        '\r\n--XXX' +
        '\r\nContent-Disposition: form-data; name="classify"' +
        '\r\n' +
        '\r\n' + that.data.classify +
        '\r\n--XXX' +
        '\r\nContent-Disposition: form-data; name="money"' +
        '\r\n' +
        '\r\n' + that.data.money +
        '\r\n--XXX' +
        '\r\nContent-Disposition: form-data; name="code"' +
        '\r\n' +
        '\r\n' + getApp().globalData.code +
        '\r\n--XXX' ,
        success: (res) => {
          let data = res.data;
          console.log('res.data', data);
          if(data.code == '0000'){
            //  wx.showModal({
            //   showCancel: false,
            //   content: '提交成功',
            //   showCancel: false,
            //   success: function (res) { }
            // })
            wx.redirectTo({
              url: '/pages/finance/finance'
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