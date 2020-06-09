// pages/poll/poll.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomRole:false,
    activeNames:[],
    choice:'',
    allnewpoll:[],
    choices:[],
    roomId:"",
    voters:[],
    ispoll:"投票"
  },
  addpoll(){
    wx.navigateTo({
      url: '/pages/addpoll/addpoll'
    })
  },
  onChange(e){
    this.setData({
      activeNames:e.detail
    })
    this.getoldPoll();
  },
  radioChange(e){
    this.setData({
      choice:e.detail
    })
  },
  //获取某个已经投票主题的数据:
  getoldPoll(){
    var that=this;
    wx.request({
      url: getApp().globalData.api + '/poll/getThemePoll',
      header: {
        'Authorization': getApp().globalData.tokenHead + ' '+getApp().globalData.token
      },
      method:'GET',
      data: {
        theme: that.data.activeNames[0]
      },
      success: (res) => {
        let data = res.data;
        if(data.code == '0000'){
          let length=res.data.data.length;
          this.setData({
            voters:res.data.data.reverse()
          })
        }
        }
    })
  },
  //获取未投票的数据
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
            this.setData({
              allnewpoll:data.data,
            })
          }
        }
    })
  },
  //投票
  pollChoice(e){
    var that=this;
    this.setData({
      theme:e.currentTarget.dataset['index']
    });
    console.log(this.data.theme);
    console.log(this.data.choice);
    console.log(getApp().globalData.username);
    if(that.data.choice==""){
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '请选择选项',
        success: function (res) { }
      })
    }
    else{
      wx.request({
        url: getApp().globalData.api + '/poll/insertPoll',
        header: {
          'Authorization': getApp().globalData.tokenHead + ' '+getApp().globalData.token,
          'content-type':'multipart/form-data; boundary=XXX'
        },
        method: "post",
        data:'\r\n--XXX' +
        '\r\nContent-Disposition: form-data; name="roomId"' +
        '\r\n' +
        '\r\n' +getApp().globalData.dormitoryInfo.id+
        '\r\n--XXX' +
        '\r\nContent-Disposition: form-data; name="theme"' +
        '\r\n' +
        '\r\n' + that.data.theme +
        '\r\n--XXX' +
        '\r\nContent-Disposition: form-data; name="voteId"' +
        '\r\n' +
        '\r\n' + that.data.choice +
        '\r\n--XXX' +
        '\r\nContent-Disposition: form-data; name="voter"' +
        '\r\n' +
        '\r\n' + getApp().globalData.username +
        '\r\n--XXX' +
        '\r\nContent-Disposition: form-data; name="code"' +
        '\r\n' +
        '\r\n' + getApp().globalData.code +
        '\r\n--XXX' ,
        success: (res) => {
          let data = res.data;
          console.log('res.data', data);
          if(data.code == '0000'){
              wx.showModal({
               showCancel: false,
               content: '投票成功',
               showCancel: false,
               success: function (res) { }
             })
             this.setData({
               choice:""
             })
            this.getAllPoll();
          }
          else{
            wx.showModal({
              showCancel: false,
               content: '已经投票',
              success: function (res) {
              }
            })
            this.setData({
              choice:""
            })
          }
        },
          fail:  (err) => {
            console.log(err);
          },
      })
    }
  },
  //删除投票
  deletepoll(e){
    var that=this;
    this.setData({
      theme:e.currentTarget.dataset['index']
    });
    console.log(this.data.theme);
    wx.showModal({
      title: '提示',
      content: '确认删除投票信息？',
      success (res){
        if(res.confirm) {
          wx.request({
            url: getApp().globalData.api + '/poll/deleteTheme',
            method:'DELETE',
              header: {
                'Authorization': getApp().globalData.tokenHead + ' '+getApp().globalData.token,
                'content-type':'multipart/form-data; boundary=XXX'
              },
              data:'\r\n--XXX' +
                '\r\nContent-Disposition: form-data; name="theme"' +
                '\r\n' +
                '\r\n' +that.data.theme+
                '\r\n--XXX' ,
              success: (res) => {
                let data = res.data;
                //console.log('res.data', data);
                if(data.code == '0000'){
                  wx.showToast({
                    title: '已删除',
                    icon: 'success',
                    duration: 1000
                  })
                  // 重新查询寝室刷新收支情况
                  that.getAllPoll();
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
          },
        });
      }else if (res.cancel) {
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