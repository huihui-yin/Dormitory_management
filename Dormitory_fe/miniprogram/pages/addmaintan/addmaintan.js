// pages/addmaintan/addmaintan.js.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    description:"",
    item:"",
    roomId:"",
    areaList:{
      province_list: {
        110000: '电器',
        120000: '家具',
        130000:'洗漱台'
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
      item: e.detail.values[0].name
    })
    //console.log('item', this.data.item);
    this.selectDisply();
  },
  maindes: function (e) {
    this.data.description = e.detail;
  },
  isRoomid: function (e)
  {
     this.data.roomId=e.datail;
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
    else if (that.data.description == '') {
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '请输入保修描述！',
        success: function (res) { }
      })
    }
    else
    {
      console.log(this.data.roomId);
      console.log(this.data.description);
      console.log(this.data.item);
      wx.request({
        url: getApp().globalData.api + '/maintan',
        header: {
          'Authorization': getApp().globalData.tokenHead + ' '+getApp().globalData.token,
          'content-type':'multipart/form-data; boundary=XXX'
        },
        method: "post",
        data:'\r\n--XXX' +
        '\r\nContent-Disposition: form-data; name="description"' +
        '\r\n' +
        '\r\n' +that.data.description+
        '\r\n--XXX' +
        '\r\nContent-Disposition: form-data; name="roomId"' +
        '\r\n' +
        '\r\n' + that.data.roomId +
        '\r\n--XXX' +
        '\r\nContent-Disposition: form-data; name="item"' +
        '\r\n' +
        '\r\n' + that.data.item +
        '\r\n--XXX' +
        '\r\nContent-Disposition: form-data; name="code"' +
        '\r\n' +
        '\r\n' + getApp().globalData.code +
        '\r\n--XXX' ,
          success: (res) => {
            let data = res.data;
            console.log('res.data', data);
            // 登录成功
            if(data.code == '0000'){
               wx.showModal({
                showCancel: false,
                content: '提交成功',
                showCancel: false,
                success: function (res) { }
              })
               setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                })
              }, 1000)
              wx.redirectTo({
                url: '/pages/group/group'
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