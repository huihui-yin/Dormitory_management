// pages/maintan/maintan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 是否有报修
    ismaintain: false,
    allmaintan:[],
    deleteId:""
  },
  //新增报修信息
  addmaintan(){
    wx.navigateTo({
      url: '/pages/addmaintan/addmaintan'
    })
  },
  //删除保修信息
  deletemaintan(e){
    var that=this;
    this.setData({
      // show: true
      deleteId:e.currentTarget.dataset['index']
    });
    wx.showModal({
      title: '提示',
        content: '是否删除该条保修信息！',
        success (res) {
          if (res.confirm) {
            // 删除报修信息
            wx.request({
              url:getApp().globalData.api + '/maintan',
              method:'DELETE',
              header: {
                'Authorization': getApp().globalData.tokenHead + ' '+getApp().globalData.token,
                'content-type':'multipart/form-data; boundary=XXX'
              },
              data:'\r\n--XXX' +
                '\r\nContent-Disposition: form-data; name="id"' +
                '\r\n' +
                '\r\n' +that.data.deleteId+
                '\r\n--XXX' ,
                success: (res) => {
                  let data = res.data;
                  //console.log('res.data', data);
                  // 修改成功
                  if(data.code == '0000'){
                    wx.showToast({
                      title: '移除成功',
                      icon: 'success',
                      duration: 1000
                    })
                    // 重新查询寝室刷新寝室成员
                    that.getallmaintan();
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
            //console.log('用户点击取消')
          }
        }
    })
    //console.log(that.data.deleteId)

  },
  //获取所有的报修信息
  getallmaintan(){
    var that=this;
    wx.request({
      url: getApp().globalData.api + '/maintan',
      header: {
        'Authorization': getApp().globalData.tokenHead + ' '+getApp().globalData.token
      },
      method:'GET',
      success: function (res) {
        let data = res.data;
        // if(data.data !== null){
        //   //console.log('hhh');
        //   that.setData({
        //     allmaintan:data.data.records
        //   })
        // }
        let length = data.data.records.length;
        // console.log('data.data.records.length', data.data.records.length);
        if(length != 0){
          console.log('有数据的');
          that.setData({
            allmaintan: data.data.records,
            ismaintain: true
          })
         // console.log('records', that.data.records);
        }
        else{
          that.setData({
            ismaintain: false
          })
        }
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
    this.getallmaintan();
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