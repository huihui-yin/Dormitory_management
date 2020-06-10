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
        120000: '寝室外出',
        130000: '寝室网费',
        140000:'寝室聚餐',
        15000:'寝室电费',
        16000:'寝室杂物费',
        16000:'室费',
      }
    },
    // 0：收入，1：支出
    moneyStatus: 1,
    radioSelects:[
      {value: 0, name: '收入'},
      {value: 1, name: '支出', checked: 'true'},
    ],
    hiddenSelect: false
  },
  // 选择支出/收入
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    const items = this.data.radioSelects
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }
    this.setData({
      moneyStatus: e.detail.value,
    });
    console.log("moneyStatus:", this.data.moneyStatus);
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
  // 收支金额
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
      if(this.data.moneyStatus == 1){
        this.setData({
          money: -this.data.money
        })
      }
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