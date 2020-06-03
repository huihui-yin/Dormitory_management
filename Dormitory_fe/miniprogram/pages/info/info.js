// pages/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    room: {},
    users: [],
    // 是否是寝室长
    roomLeader: false,
    // 修改的寝室名
    roomName: '',
    // 修改的寝室位置
    roomLocal: '',
    // 修改的寝室容量
    roomSize: '',
    // 点击头像的寝室成员信息
    userIndex: {},
    // 弹窗
    //show: false,
    visible1: false,
    actions1: [{name: '转让室长'},{name: '移除成员',}],
  },
  // 寝室名字修改
  nameInput(e) {
    //console.log('修改的名字',e.detail);
    this.setData({
      roomName: e.detail
    })
  },
  // 寝室位置修改
  localInput(e) {
    //console.log('修改的寝室位置',e.detail);
    this.setData({
      roomLocal: e.detail
    })
  },
  // 寝室容量修改
  sizeInput(e) {
    //console.log('修改的寝室容量',e.detail);
    this.setData({
      roomSize: e.detail
    })
  },
  // 确认修改寝室信息
  modSure () {
    //console.log('确认修改hh');
    var that = this;
    if(this.data.roomName == ''){
      wx.showToast({
        title: '请输入寝室名字！',
        icon: 'none',
        duration: 1000
      })
    }
    else if(this.data.roomSize == ''){
      wx.showToast({
        title: '请输入寝室容量！',
        icon: 'none',
        duration: 1000
      })
    }
    else if(this.data.roomLocal == ''){
      wx.showToast({
        title: '请输入寝室位置！',
        icon: 'none',
        duration: 1000
      })
    }
    else{
      // 调修改寝室信息接口
      wx.request({
        url:getApp().globalData.api + '/room',
        method:'PUT',
        header: {
          'Authorization': getApp().globalData.tokenHead + ' '+getApp().globalData.token,
          'content-type':'multipart/form-data; boundary=XXX'
        },
        data:'\r\n--XXX' +
          '\r\nContent-Disposition: form-data; name="roomLocation"' +
          '\r\n' +
          '\r\n' +that.data.roomLocal+
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
            //console.log('res.data', data);
            // 修改成功
            if(data.code == '0000'){
              wx.showToast({
                title: '修改成功',
                icon: 'success',
                duration: 1000
              })
              // 重新查询寝室刷新寝室成员
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
    }
  },
  // 退出寝室
  exitDor () {
    wx.showModal({
      title: '提示',
      content: '如果室长退出寝室将直接解散该寝室！',
      success (res) {
        if (res.confirm) {
          //console.log('用户点击确定');
          // 调转让室长接口
          wx.request({
            url:getApp().globalData.api + '/room/quit',
            method:'DELETE',
            header: {
              'Authorization': getApp().globalData.tokenHead + ' '+getApp().globalData.token,
              'content-type':'multipart/form-data; boundary=XXX'
            },
              success: (res) => {
                let data = res.data;
                //console.log('res.data', data);
                // 修改成功
                if(data.code == '0000'){
                  wx.showToast({
                    title: '成功退出寝室',
                    icon: 'success',
                    duration: 1000
                  })
                  // 返回上一级
                  wx.navigateBack({
                    delta: 1
                  })
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
        } else if (res.cancel) {
          //console.log('用户点击取消')
        }
      }
    })
  },
  // 显示和隐藏弹窗
  handleOpen1 () {
    this.setData({
        visible1: true
    });
  },
  handleCancel1 () {
      this.setData({
          visible1: false
      });
  },
  // 点击寝室成员头像
  userDetail(e){
    var that = this;
    //console.log('点击寝室成员头像', e.currentTarget.dataset['index']);
    this.setData({
      // show: true
      userIndex:e.currentTarget.dataset['index']
    });
   // 判断用户是否是室长并且是否点击了自己
   if( getApp().globalData.roomRole == 'leader' && that.data.userIndex.id != getApp().globalData.id){
     this.handleOpen1();
   }
  },
  // 点击弹窗中选项
  handleClickItem1 ({ detail }) {
    var that = this;
    const index = detail.index;
    //console.log('点击的' , index);
    if(index == 0){
      wx.showModal({
        title: '提示',
        content: '转让室长后您将无法继续管理寝室！',
        success (res) {
          if (res.confirm) {
            //console.log('用户点击确定');
            // 调转让室长接口
            wx.request({
              url:getApp().globalData.api + '/room/transfer',
              method:'POST',
              header: {
                'Authorization': getApp().globalData.tokenHead + ' '+getApp().globalData.token,
                'content-type':'multipart/form-data; boundary=XXX'
              },
              data:'\r\n--XXX' +
                '\r\nContent-Disposition: form-data; name="userId"' +
                '\r\n' +
                '\r\n' +that.data.userIndex.id+
                '\r\n--XXX' ,
                success: (res) => {
                  let data = res.data;
                  //console.log('res.data', data);
                  // 修改成功
                  if(data.code == '0000'){
                    wx.showToast({
                      title: '转让成功',
                      icon: 'success',
                      duration: 1000
                    })
                    that.setData({
                      roomLeader:false
                    })
                    getApp().globalData.roomRole = 'member';
                    that.handleCancel1();
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
          } else if (res.cancel) {
            //console.log('用户点击取消')
          }
        }
      })
    }
    else if(index == 1){
      wx.showModal({
        title: '提示',
        content: '是否移除该寝室成员！',
        success (res) {
          if (res.confirm) {
            // 调移除室员接口
            wx.request({
              url:getApp().globalData.api + '/room/kick',
              method:'DELETE',
              header: {
                'Authorization': getApp().globalData.tokenHead + ' '+getApp().globalData.token,
                'content-type':'multipart/form-data; boundary=XXX'
              },
              data:'\r\n--XXX' +
                '\r\nContent-Disposition: form-data; name="userId"' +
                '\r\n' +
                '\r\n' +that.data.userIndex.id+
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
                    that.DorInfo();
                    that.handleCancel1()
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
    }
  },
  // 寝室信息接口
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
              //console.log('请求宿舍时返回的data',data);
              // 有寝室将dorStatus改为true并把寝室数据存入全局数据
              if(data.data !== null){
                //console.log('hhh');
                getApp().globalData.dormitoryInfo = data.data.room;
                getApp().globalData.dormitoryChum = data.data.user;
                that.setData({
                  room: data.data.room,
                  users: data.data.user
                })
              }
              // 无寝室返回上一级
              else{
                wx.navigateBack({
                  delta: 1
                 })
              }
              //console.log('dorStatus',that.data.dorStatus);
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
    var that = this;
    getApp().globalData.page = 1;
    this.setData({
      room: getApp().globalData.dormitoryInfo,
      users: getApp().globalData.dormitoryChum
    })
    // 寝室长
    if(getApp().globalData.roomRole == 'leader'){
      this.setData({
        roomLeader: true,
        roomName: that.data.room.roomName,
        roomLocal: that.data.room.roomLocation,
        roomSize: that.data.room.roomSize
      })
    }
    console.log('room',this.data.room);
    console.log('users',this.data.users);
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