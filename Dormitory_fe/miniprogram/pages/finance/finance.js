// pages/finance/finance.js
import * as echarts from '../ec-canvas/echarts';
/*图表的相关配置
let chart = null;
function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: 'ECharts 入门示例'
    },
    tooltip: {},
    series: [{
      name: '销量',
      type: 'pie',
      radius:'50%',
      data: [{value:235, name:'视频广告'},
      {value:274, name:'联盟广告'},
      {value:310, name:'邮件营销'},
      {value:335, name:'直接访问'},
      {value:400, name:'搜索引擎'}]
    }]
  };

  chart.setOption(option);
  return chart;
}*/
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomRole:false,
    allfinance: [],
    activeNames:[],
    deleteId:"",
    isfinance:false,
    fromDate:'',
    toDate:'',
    fromshow:false,
    toshow:false,
    minDate:new Date(2018,8,1).getTime(),
    /*ec: {
      onInit: initChart
    }*/
  },
  toDisplay() {
    this.setData({ toshow: true });
  },
  fromDisplay() {
    this.setData({ fromshow: true });
  },
  toClose() {
    this.setData({ toshow: false });
  },
  fromClose() {
    this.setData({ fromshow: false });
  },
  toConfirm(e) {
    this.setData({
      toDate: this.formatDate(e.detail),
      toshow: false,
    });
    console.log(this.data.toDate);
  },
  fromConfirm(e) {
    this.setData({
      fromDate: this.formatfromDate(e.detail),
      fromshow: false,
    });
    console.log(this.data.fromDate);
  },
  formatDate(toDate) {
    toDate = new Date(toDate);
    return `${toDate.getYear()+1900}/${toDate.getMonth() + 1}/${toDate.getDate()}`;
  },
  formatfromDate(fromDate) {
    fromDate = new Date(fromDate);
    return `${fromDate.getYear()+1900}/${fromDate.getMonth() + 1}/${fromDate.getDate()}`;
  },
  isRoomid: function (e)
  {
     this.data.editroomid=e.datail;
     //console.log('roomId', this.data.roomId);
  },
  getReson: function (e)
  {
    this.setData({
      editreason: e.detail
    })
  },
  isMoney: function (e)
  {
    this.setData({
      editmoney: e.detail
    })
     //console.log('roomId', this.data.roomId);
  },
  onChange(e) {
    this.setData({
      activeNames: e.detail,
    });
  },
  //新增收支情况
  addfinance(){
    wx.redirectTo({
      url: '/pages/addfinance/addfinance'
    })
  },
  //获取所有的收支信息
  getallfinance(){
    var that=this;
    wx.request({
      url: getApp().globalData.api + '/finance/all',
      header: {
        'Authorization': getApp().globalData.tokenHead + ' '+getApp().globalData.token
      },
      method:'GET',
      data: {
        pageNo: "1",
        pageSize: "100",
        roomId: getApp().globalData.dormitoryInfo.id
      },
      success: (res) => {
        let data = res.data;
        if(data.code == '0000'){
          let length = data.data.records.length;
          //console.log('hhh');
          if(length!=0)
          {
            that.setData({
              allfinance:data.data.records,
              isfinance:true
            })
          }
          else{
            that.setData({
              isfinance:false
            })
          }
        }
      },
      fail: function (err) {
        console.log(err);
      }
    })
  },
  //删除收支信息
  deleteFinance(e){
    var that=this;
    this.setData({
      deleteId:e.currentTarget.dataset['index']
    });
    console.log(this.data.deleteId);
    wx.showModal({
      title: '提示',
      content: '确认删除该收支信息？',
      success (res){
        if(res.confirm) {
          wx.request({
            url: getApp().globalData.api + '/finance/delete/'+that.data.deleteId,
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
                  // 重新查询寝室刷新收支情况
                  that.getallfinance();
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
  //按日期查询
  dateSearch(){
    var that=this;
    wx.request({
      url: getApp().globalData.api + '/finance/time',
      header: {
        'Authorization': getApp().globalData.tokenHead + ' '+getApp().globalData.token
      },
      method:'GET',
      data: {
        'pageNo': "1",
        'pageSize': "100",
        'from':this.data.fromDate,
        'to':this.data.toDate
      },
      success: (res) => {
        let data = res.data;
        if(data.code == '0000'){
          let length = data.data.records.length;
          //console.log('hhh');
          if(length!=0)
          {
            that.setData({
              allfinance:data.data.records,
              isfinance:true,
              fromDate:'',
              toDate:''
            })
          }
          else{
            that.setData({
              isfinance:false
            })
          }
        }
      },
      fail: function (err) {
        console.log(err);
      }
    })
  },
  //查询所有信息
  searchAll(){
    this.getallfinance();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断用户是不是室长
    if(getApp().globalData.roomRole == 'leader'){
      this.setData({
        roomRole: true
      })
    }
    this.getallfinance();
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