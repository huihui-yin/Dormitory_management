// pages/group/group.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 是否有寝室
    dorStatus: false,
    active: 'home',
    // 搜索输入的寝室号
    dorIdSearch: ' ',
    // 搜索结果 
    serchRes: false,
    noRes: false,
    // 寝室信息
    dorId: '',
    dorName: '',
    dorRoomLocation: '',
    // 搜索到的寝室信息
    id: '',
    roomLocation: '',
    roomName: ''
  },
  // 跳转到寝室详情页面
  next () {
    wx.navigateTo({
      url: '/pages/info/info'
    })
  },
  // 切换底部导航
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
    console.log('获取寝室信息');
    var that = this;
    that.setData({
      dorStatus: false
    })
    //console.log('dorStatus1',that.data.dorStatus);
    // 此处获取宿舍信息如果为空说明未加入任何寝室，显示新增/搜索寝室；不为空显示寝室操作
       wx.request({
            url: getApp().globalData.api + '/room',
            header: {
              'Authorization': getApp().globalData.tokenHead + ' '+getApp().globalData.token
            },
            method: "GET",
            success: function (res) {
              let data = res.data;
              //console.log('请求宿舍时返回的data',data);
              // 有寝室将dorStatus改为true并把寝室数据存入全局数据
              if(data.data !== null){
                console.log('有寝室！');
                that.setData({
                  dorStatus: true,
                  dorId: data.data.room.id,
                  dorName: data.data.room.roomName,
                  dorRoomLocation: data.data.room.roomLocation,
                })
                getApp().globalData.dormitoryInfo = data.data.room;
                getApp().globalData.dormitoryChum = data.data.user;
                console.log('getApp().globalData.dormitoryInfo',getApp().globalData.dormitoryInfo);
                console.log('getApp().globalData.dormitoryChum',getApp().globalData.dormitoryChum);
              }
             // console.log('dorStatus2',that.data.dorStatus);
            },
            fail: function (err) {
              console.log(err);
            }
       })
      //console.log('dorStatus3',that.data.dorStatus);
  },
  // 搜索寝室号
  // 用户点击键盘搜索按钮或回车
  onSearch (e) {
    var that = this;
    console.log('用户搜索的寝室号：',e.detail);
    that.data.dorIdSearch = e.detail
    // 调用搜索寝室号接口
    wx.request({
      url:getApp().globalData.api + '/room/' + that.data.dorIdSearch,
      method:'Get',
      header: {
        'Authorization': getApp().globalData.tokenHead + ' '+getApp().globalData.token
      },
        success: (res) => {
          let data = res.data;
          console.log('res.data', data);
          // 没有搜索结果,页面显示无数据
          if(data.data == null){
            this.setData({
              noRes:true,
              serchRes:false
            })
          }
          // 显示搜素结果
          else{
            // 修改数据
            this.setData({
              serchRes:true,
              noRes:false,
              id: data.data.id,
              roomLocation: data.data.roomLocation,
              roomName: data.data.roomName,
            })
          }
        },
        fail:  (err) => {
          console.log('接口失败', err);
        },
    });
  },
  // 取消搜索
  onCancel () {
    console.log('用户取消搜索寝室号');
    this.setData({
      noRes:false,
      serchRes:false
    })
  },
  // 
  // 查看个人信息接口
  findSelf () {
    var that = this;
    // 调用查看本人信息接口
       wx.request({
            url: getApp().globalData.api + '/user',
            header: {
              'Authorization': getApp().globalData.tokenHead + ' '+getApp().globalData.token
            },
            method: "GET",
            success: function (res) {
              let data = res.data;
              getApp().globalData.id = data.data.id;
              getApp().globalData.roomRole = data.data.roles[0].name;
              console.log('全局id', getApp().globalData.id);
              console.log('用户角色：', getApp().globalData.roomRole);
            },
            fail: function (err) {
              console.log(err);
            }
          })
  },
  // 用户点击加入按钮
  joinDor () {
    var that = this;
    console.log('加入寝室！');
    // 调加入寝室接口
    wx.request({
      url:getApp().globalData.api + '/room/join',
      method:'POST',
      header: {
        'Authorization': getApp().globalData.tokenHead + ' '+getApp().globalData.token,
        'content-type':'multipart/form-data; boundary=XXX'
      },
      data:'\r\n--XXX' +
        '\r\nContent-Disposition: form-data; name="roomId"' +
        '\r\n' +
        '\r\n' +that.data.id+
        '\r\n--XXX' ,
        success: (res) => {
          let data = res.data;
          console.log('res.data', data);
          // 登录成功
          if(data.code == '0000'){
            console.log('加入寝室成功');
            wx.showToast({
              title: '加入成功',
              icon: 'success',
              duration: 1000
            })
            that.data.dorStatus = true;
            that.DorInfo();
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.DorInfo();
    this.findSelf();
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
    if(getApp().globalData.page == '1'){
      console.log('hh');
      this.DorInfo();
   }
   getApp().globalData.page = 0;
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