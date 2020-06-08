// pages/newDor/newDor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomName: '',
    roomLocation: '',
    roomSize: '',
    roomNumber: '',
    // 选项
    // listData:['太阳', '月亮', '星星'],
    // index: 0,
    hiddenSelect: false,
    areaList: {
      province_list: {
        110000: '德馨苑',
        120000: '临江苑',
        130000: '锦地苑',
        140000: '舍'
      },
      city_list: {
        110100: '德馨1栋',
        110200: '德馨2栋',
        110300: '德馨3栋',
        110400: '德馨4栋',
        110500: '德馨5栋',
        110600: '德馨6栋',
        110700: '德馨7栋',
        110800: '德馨8栋',
        110900: '德馨9栋',
        120100: '临江1栋',
        120200: '临江2栋',
        120300: '临江3栋',
        120400: '临江4栋',
        120500: '临江5栋',
        120600: '临江6栋',
        120700: '临江7栋',
        120800: '临江8栋',
        120900: '临江9栋',
        121000: '临江10栋',
        130100: '锦地1栋',
        130200: '锦地2栋',
        130300: '锦地3栋',
        130400: '锦地4栋',
        130500: '锦地5栋',
        130600: '锦地6栋',
        130700: '锦地7栋',
        130800: '锦地8栋',
        140100: '1舍',
        140200: '2舍',
        140300: '3舍',
        140400: '4舍',
        140500: '5舍',
        140600: '6舍',
        140700: '7舍',
      },
    }
  },
  // 输入的input数据
  nameInput(e){
    this.setData({
      roomName: e.detail
    })
  },
  sizeInput(e){
    this.setData({
      roomSize: e.detail
    })
  },
  numberInput(e){
    this.setData({
      roomNumber: e.detail
    })
  },
  // 控制选择寝室位置显示
  selectDisply () {
    //console.log('控制选择寝室位置显示');
    this.setData({
      hiddenSelect:!this.data.hiddenSelect
    })
    //console.log('hiddenSelect',this.data.hiddenSelect);
  },
  // 选择确认
  selectSumbit (e) {
    //console.log('e.detail.values', e.detail.values);
    this.setData({
      roomLocation: e.detail.values[1].name
    })
    //console.log('roomLocation', this.data.roomLocation);
    this.selectDisply();
  },
  // 确认创建
  newDorSubmit(){
    var that = this;
    //console.log('roomName',this.data.roomName);
    //console.log('roomSize',this.data.roomSize);
    //console.log('roomNumber',this.data.roomNumber);
    //console.log('roomLocation',this.data.roomLocation);
    if(this.data.roomName == ''){
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '请输入寝室名！',
        success: function (res) { }
      })
    }
    else if(this.data.roomSize == ''){
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '请输入寝室人数！',
        success: function (res) { }
      })
    }
    else if(this.data.roomLocation == ''){
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '请选择寝室位置！',
        success: function (res) { }
      })
    }
    else if(this.data.roomNumber == ''){
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '请输入寝室号！',
        success: function (res) { }
      })
    }
    else{
      // 调创建接口
      wx.request({
        url:getApp().globalData.api + '/room',
        method:'POST',
        header: {
          'Authorization': getApp().globalData.tokenHead + ' '+getApp().globalData.token,
          'content-type':'multipart/form-data; boundary=XXX'
        },
        data:'\r\n--XXX' +
          '\r\nContent-Disposition: form-data; name="roomLocation"' +
          '\r\n' +
          '\r\n' +that.data.roomLocation+ '-' +that.data.roomNumber+
          '\r\n--XXX' +
          '\r\nContent-Disposition: form-data; name="roomName"' +
          '\r\n' +
          '\r\n' + that.data.roomName +
          '\r\n--XXX' +
          '\r\nContent-Disposition: form-data; name="roomSize"' +
          '\r\n' +
          '\r\n' + that.data.roomSize +
          '\r\n--XXX' ,
          success: (res) => {
            let data = res.data;
            console.log('res.data', data);
            // 登录成功
            if(data.code == '0000'){
              //console.log('创建寝室成功');
              wx.showToast({
                title: '创建寝室成功',
                icon: 'success',
                duration: 1000
              })
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                 })
              }, 1000)
            }
            else{
              wx.showModal({
                content: data.msg,
                showCancel: false,
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
    console.log('hiddenSelect',this.data.hiddenSelect);
    getApp().globalData.page = 1;
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