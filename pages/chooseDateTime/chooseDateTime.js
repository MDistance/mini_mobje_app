// pages/chooseDateTime/chooseDateTime.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pickup_time:'',
    return_time:'',
    startDate: '',
    endDate: '',
    show: true,
    index:0,
    indexBack:0,
    allDays:'',
    formatter(day) {
      if (day.type === 'start') {
        day.bottomInfo = '取车';
      } else if (day.type === 'end') {
        day.bottomInfo = '还车';
      }
      return day;
    },
    pickerHourTextArr: ['8:00','8:30','9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30'], //小时数组  08
    backerHourTextArr: ['8:00','8:30','9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30'], //分钟数组  24
  },

  // 取车时间
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  // 还车时间
  bindBackerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexBack: e.detail.value
    })
  },
  onDisplay() {
    this.setData({ show: true });
  },
  // onClose() {
  //   this.setData({ show: false });
  // },
  formatDate(date) {
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  },
  onConfirm(event) {
    const [start, end] = event.detail;
    this.setData({
      show: false,
      startDate: `${this.formatDate(start)}`,
      endDate: `${this.formatDate(end)}`
    });
    console.log(start,end)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    const now =  wx.getStorageSync('startDate');
    const next = wx.getStorageSync('endDate');
    console.log(now,next);
    this.setData({
      startDate: `${this.formatDate(now)}`,
      endDate: `${this.formatDate(next)}`,
      pickup_time:this.data.pickerHourTextArr[this.data.index],
      return_time:this.data.backerHourTextArr[this.data.indexBack]
    });
   
  },
  // 返回主页
  okBtn:function(e){
    // var dateTime= e.currentTarget.dataset.data
    this.getOpenerEventChannel().emit('getDate', {start:this.data.startDate,end: this.data.endDate,pickup_time:this.data.pickerHourTextArr[this.data.index], return_time:this.data.backerHourTextArr[this.data.indexBack]});
    wx.switchTab({
          url: '/pages/index/index',
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