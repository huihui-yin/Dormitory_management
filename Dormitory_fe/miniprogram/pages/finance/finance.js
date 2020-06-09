// pages/finance/finance.js
import * as echarts from '../ec-canvas/echarts';
// 饼状
function initChart(canvas,width,height){
  console.log("initChart");
  // 设置时间
  let dataNow = new Date();
  let month = dataNow.getMonth()+1;
  let nowTime = dataNow.getFullYear() + "/" + month + "/" + dataNow.getDate();
  let oldTime = dataNow.getFullYear() + "/" + dataNow.getMonth() + "/" + dataNow.getDate();
  let dataList =[
    {value:0, name:'寝室外出'},
    {value:0, name:'寝室杂物费'},
    {value:0, name:'寝室电费'},
    {value:0, name:'寝室网费'},
    {value:0, name:'寝室聚餐'}
]
  // 查询最近半年
  console.log("一个月前:", oldTime);
  console.log("现在:", nowTime);
  wx.request({
      url: getApp().globalData.api + '/finance/time',
      header: {
        'Authorization': getApp().globalData.tokenHead + ' '+getApp().globalData.token
      },
      method:'GET',
      data: {
        'pageNo': "1",
        'pageSize': "100",
        'from':oldTime,
        'to':nowTime
      },
      success: (res) => {
        let data = res.data;
        if(data.code == '0000'){
          console.log('最近一个月支出情况',data);
          let length = data.data.records.length;
          let records = data.data.records;
          if(length!=0)
          {
            records.forEach((item, index) => {
              if(item.money < 0){
                if(item.classify == "寝室外出"){
                  dataList[0].value += -item.money;
                }
                else if(item.classify == "寝室杂物费"){
                  dataList[1].value += -item.money;
                }
                else if(item.classify == "寝室电费"){
                  dataList[2].value += -item.money;
                }
                else if(item.classify == "寝室网费"){
                  dataList[3].value += -item.money;
                }
                else if(item.classify == "寝室聚餐"){
                  dataList[4].value += -item.money;
                }
              }
              
            })
          }
          console.log(' dataList', dataList);
        }
      },
      fail: function (err) {
        console.log(err);
      }
  })
  setTimeout(() => {
    // 统计图
    const chart = echarts.init(canvas,null,{
      width:width,
      height:height
    })
    canvas.setChart(chart)
    var option = {
      color:['#023b73','#0576e7','#3f9dfb', "#65b1fc",'#ecf5ff'],
      title: {
        // text: '最近一个月寝室支出情况统计'
      }, 
      tooltip: {},
      // legend: {
      //   data: ['支出']
      // },
      // xAxis: {
      //   data: ["外出", "杂物费", "电费", "网费", "聚餐"]
      // },
      // yAxis: {},
      series: [{
        // name: '支出',
        // type: 'bar',
        // data: dataList
        name: '支出',
        type: 'pie',
        radius: '55%',
        data:dataList
      }]
    };
    console.log(' option.series[0].data', option.series[0].data);
    chart.setOption(option)
    return chart
  }, 1000)
};
// 折线
function initChart3(canvas,width,height){
  console.log("initChart");
  // 设置时间
  // let dataNow = new Date();
  // let month = dataNow.getMonth()+1;
  // let nowTime = dataNow.getFullYear() + "/" + month + "/" + dataNow.getDate();
  // let oldTime = dataNow.getFullYear() + "/" + dataNow.getMonth() + "/" + dataNow.getDate();
  let dataList = [0, 0, 0, 0, 0]
  // 查询最近半年
  // console.log("一个月前:", oldTime);
  // console.log("现在:", nowTime);
  // wx.request({
  //     url: getApp().globalData.api + '/finance/time',
  //     header: {
  //       'Authorization': getApp().globalData.tokenHead + ' '+getApp().globalData.token
  //     },
  //     method:'GET',
  //     data: {
  //       'pageNo': "1",
  //       'pageSize': "100",
  //       'from':oldTime,
  //       'to':nowTime
  //     },
  //     success: (res) => {
  //       let data = res.data;
  //       if(data.code == '0000'){
  //         console.log('最近一个月支出情况',data);
  //         let length = data.data.records.length;
  //         let records = data.data.records;
  //         if(length!=0)
  //         {
  //           records.forEach((item, index) => {
  //             if(item.money < 0){
  //               if(item.classify == "寝室外出"){
  //                 dataList[0] += -item.money;
  //               }
  //               else if(item.classify == "寝室杂物费"){
  //                 dataList[1] += -item.money;
  //               }
  //               else if(item.classify == "寝室电费"){
  //                 dataList[2] += -item.money;
  //               }
  //               else if(item.classify == "寝室网费"){
  //                 dataList[3] += -item.money;
  //               }
  //               else if(item.classify == "寝室聚餐"){
  //                 dataList[4] += -item.money;
  //               }
  //             }
              
  //           })
  //         }
  //         console.log(' dataList', dataList);
  //       }
  //     },
  //     fail: function (err) {
  //       console.log(err);
  //     }
  // })
  // setTimeout(() => {
    // 统计图
    const chart = echarts.init(canvas, null, {
      width:width,
      height: height
    });
    canvas.setChart(chart);
  
    var option = {
    //定义图标的标题和颜色
      title: {
        // text: '今日访问量',
        // left: 'center'
      },
      color: ["#37A2DA"],
      //定义你图标的线的类型种类
      legend: {
      data: ['money'],
      top: 50,
      left: 'center',
      backgroundColor: '#37A2DA',
      z: 100
      },
      grid: {
      containLabel: true
    },
    //当你选中数据时的提示框
      tooltip: {
        show: true,
        trigger: 'axis'
      },
      //	x轴
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['1', '2', '3', '4', '5', '6', '7'],//x轴数据
        // x轴的字体样式
        axisLabel: {
          show: true,
          textStyle: {
            color: '#000',
            fontSize: '14',
          }
        },
        // 控制网格线是否显示
        splitLine: {
          show: true,
          //  改变轴线颜色
          lineStyle: {
            // 使用深浅的间隔色
            color: ['#aaaaaa']
          }
        },
        // x轴的颜色和宽度
        axisLine: {
          lineStyle: {
            color: '#000',
            width: 1,   //这里是坐标轴的宽度,可以去掉
          }
        }
        // show: false //是否显示坐标
      },
      yAxis: {
        x: 'center',
        type: 'value',
        //网格线
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        },
        // show: false
      },
      series: [{
        name: 'A',
        type: 'line',
        smooth: true,
        data: [15, 2, 30, 16, 10, 17, 15]
      }]
    };
    chart.setOption(option);
    return chart;
  // }, 1000)
}
// 柱形
function initChart2(canvas,width,height){
  console.log("initChart");
  // 设置时间
  // let dataNow = new Date();
  // let month = dataNow.getMonth()+1;
  // let nowTime = dataNow.getFullYear() + "/" + month + "/" + dataNow.getDate();
  // let oldTime = dataNow.getFullYear() + "/" + dataNow.getMonth() + "/" + dataNow.getDate();
  let dataList = [15, 2, 30, 16, 10, 17, 15]
  // 查询最近半年
  // console.log("一个月前:", oldTime);
  // console.log("现在:", nowTime);
  // wx.request({
  //     url: getApp().globalData.api + '/finance/time',
  //     header: {
  //       'Authorization': getApp().globalData.tokenHead + ' '+getApp().globalData.token
  //     },
  //     method:'GET',
  //     data: {
  //       'pageNo': "1",
  //       'pageSize': "100",
  //       'from':oldTime,
  //       'to':nowTime
  //     },
  //     success: (res) => {
  //       let data = res.data;
  //       if(data.code == '0000'){
  //         console.log('最近一个月支出情况',data);
  //         let length = data.data.records.length;
  //         let records = data.data.records;
  //         if(length!=0)
  //         {
  //           records.forEach((item, index) => {
  //             if(item.money < 0){
  //               if(item.classify == "寝室外出"){
  //                 dataList[0] += -item.money;
  //               }
  //               else if(item.classify == "寝室杂物费"){
  //                 dataList[1] += -item.money;
  //               }
  //               else if(item.classify == "寝室电费"){
  //                 dataList[2] += -item.money;
  //               }
  //               else if(item.classify == "寝室网费"){
  //                 dataList[3] += -item.money;
  //               }
  //               else if(item.classify == "寝室聚餐"){
  //                 dataList[4] += -item.money;
  //               }
  //             }
              
  //           })
  //         }
  //         console.log(' dataList', dataList);
  //       }
  //     },
  //     fail: function (err) {
  //       console.log(err);
  //     }
  // })
  // setTimeout(() => {
    // 统计图
    const chart = echarts.init(canvas,null,{
      width:width,
      height:height
    })
    canvas.setChart(chart)
    var option = {
      color: ['#3f9dfb'],
      title: {
        // text: '最近一个月寝室支出情况统计'
      }, 
      tooltip: {},
      legend: {
        data: ['支出']
      },
      xAxis: {
        data: ["1", "2", "3", "4", "5", "6", "7"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: dataList
      }]
    };
    console.log(' option.series[0].data', option.series[0].data);
    chart.setOption(option)
    return chart
  // }, 1000)
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomRole:false,
    allfinance: [],
    activeNames:[],
    balance:"",
    deleteId:"",
    isfinance:false,
    fromDate:'',
    toDate:'',
    fromshow:false,
    toshow:false,
    minDate:new Date(2018,8,1).getTime(),
    ec:{onInit:initChart2},
    ec2:{onInit:initChart},
    // tab栏
    activeTab: 0,
  },
  // 切换tab
  tabChange(event) {
    console.log(`切换到标签 ${event.detail.name}`)
    this.setData({
      activeTab:event.detail.name
    })
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
    wx.navigateTo({
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
              balance:data.data.records[0].balance,
              isfinance:true
            })
            console.log(data.data.records[0].balance);
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
    this.setData({
      fromDate:'',
      toDate:''
    })
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