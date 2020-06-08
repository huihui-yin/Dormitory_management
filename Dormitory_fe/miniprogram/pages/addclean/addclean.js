// pages/addclean/addclean.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    users: [],
    // 周选择器
    columns: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    timeDisplay: false,
    // 输入的打扫时间
    cleanTime: '',
    cleanValue: '',
    // 选择的寝室用户
    userIndex: -1,
    cleaner: '',
  },
  // 输入打扫时间
  timeInput () {
    this.setData({
      timeDisplay: true
    });
  },
  onConfirm(event) {
    const { picker, value, index } = event.detail;
    console.log(`当前值：${value}, 当前索引：${index}`);
    this.setData({
      timeDisplay: false,
      cleanValue: value,
      cleanTime: index+1
    });
    console.log("cleanTime:",this.data.cleanTime);
  },
  onCancel() {
    this.setData({
      timeDisplay: false
    });
  },
  // 点击寝室成员头像
  userDetail(e){
    var that = this;
    console.log('点击寝室成员头像index:', e.currentTarget.dataset['index']);
    let index = e.currentTarget.dataset['index'];
    this.setData({
      userIndex: index,
      cleaner: this.data.users[index].username
    });
  },
  // 点击发布
  Submit () {
    var that = this;
    console.log('选择的成员:', that.data.cleaner);
    console.log('cleanTime: ', this.data.cleanTime);
    if (that.data.cleanTime == '') {
      wx.showModal({
        title: '提示！',
        content: '请输入打扫时间！',
        showCancel: false,
        success(res) {}
      })
    } else if (that.data.cleaner == '') {
      wx.showModal({
        title: '提示！',
        content: '请选择打扫成员！',
        showCancel: false,
        success(res) {}
      })
    }else {
      wx.request({
        url:getApp().globalData.api + '/clean/insert',
        method:'POST',
        header: {
          'content-type':'multipart/form-data; boundary=XXX',
          'Authorization': getApp().globalData.tokenHead + ' '+getApp().globalData.token
        },
        data:'\r\n--XXX' +
          '\r\nContent-Disposition: form-data; name="cleanTime"' +
          '\r\n' +
          '\r\n' +that.data.cleanValue+
          '\r\n--XXX' +
          '\r\nContent-Disposition: form-data; name="cleaner"' +
          '\r\n' +
          '\r\n' + that.data.cleaner +
          '\r\n--XXX' +
          '\r\nContent-Disposition: form-data; name="roomId"' +
          '\r\n' +
          '\r\n' + getApp().globalData.dormitoryInfo.id+
          '\r\n--XXX' ,
          success: (res) => {
            let data = res.data;
            console.log('res.data', data);
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
    // this.DorInfo();
    this.setData({
      users: getApp().globalData.dormitoryChum
    })
    //console.log("寝室成员：",this.data.users)
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