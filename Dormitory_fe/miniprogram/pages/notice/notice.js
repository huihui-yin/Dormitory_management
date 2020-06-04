// pages/notice/notice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomRole: false,
    // 是否有公告
    isnotice: false,
    // 所有的公布
    records:[],
    // 删除的公告id
    deleteId: ''
  },
  // 返回所有的公告信息
  noticeAll () {
    var that = this;
    that.setData({
      isnotice: false
    })
    wx.request({
      url:getApp().globalData.api + '/notice/all',
      method:'GET',
      header: {
        'Authorization': getApp().globalData.tokenHead + ' '+getApp().globalData.token
      },
      data: {
        pageNo: "1",
        pageSize: "100",
        roomId: getApp().globalData.dormitoryInfo.id
      },
        success: (res) => {
          let data = res.data;
          let length = data.data.records.length;
         // console.log('data.data.records.length', data.data.records.length);
          if(data.code == '0000'){
            if(length != 0){
              console.log('有数据的');
              that.setData({
                records: data.data.records,
                isnotice: true
              })
             // console.log('records', that.data.records);
            }
            else{
              that.setData({
                isnotice: false
              })
            }
            console.log('isnotice', that.data.isnotice);
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
  },
  // 新增按钮
  addnotice () {
    wx.navigateTo({
      url: '/pages/addnotice/addnotice'
    })
  },
  // 删除按钮
  deleteNot (e) {
    var that=this;
    console.log(e);
    this.setData({
      deleteId:e.currentTarget.dataset['index']
    });
    wx.showModal({
      title: '提示',
        content: '确认删除该条公告？',
        success (res) {
          if (res.confirm) {
            // 删除公告
            wx.request({
              url:getApp().globalData.api + '/notice/delete/' + that.data.deleteId,
              method:'DELETE',
              header: {
                'Authorization': getApp().globalData.tokenHead + ' '+getApp().globalData.token,
              },
                success: (res) => {
                  let data = res.data;
                  //console.log('res.data', data);
                  if(data.code == '0000'){
                    wx.showToast({
                      title: '已删除',
                      icon: 'success',
                      duration: 1000
                    })
                    // 重新查询寝室刷新寝室成员
                    that.noticeAll();
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
          } else if (res.cancel) {
          }
        }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      roomRole: false
    })
    // 判断用户是不是室长
    if(getApp().globalData.roomRole == 'leader'){
      this.setData({
        roomRole: true
      })
    }
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
    // 返回所有的公告信息
    this.noticeAll();
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